#!/usr/bin/env node
// LOADOUT — Growth Autopilot · workflow generator (source of truth)
// Emits importable n8n workflow JSON, one file per department, under workflows/.
// Deterministic UUIDs => stable git diffs. Run: `node workflows/_build.mjs`
// Each department file is an ARRAY of workflows (one per "worker") so every worker
// imports as its own n8n workflow and can be enabled/disabled independently.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { id, CRED } from "./_ids.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));

const ERR_HANDLER_ID = id("wf/LOADOUT — Error Handler");

// node factory. `extra.onError` = onError mode (e.g. "continueErrorOutput")
function N(wf, name, type, typeVersion, parameters = {}, x = 0, y = 300, extra = {}) {
  const n = { parameters, id: id(`${wf}/${name}`), name, type, typeVersion, position: [x, y] };
  if (extra.credentials) n.credentials = extra.credentials;
  if (extra.onError) n.onError = extra.onError;
  if (extra.retryOnFail) n.retryOnFail = true;
  if (extra.webhookId) n.webhookId = id(`${wf}/${name}/webhook`);
  return n;
}

// build main-chain connections from an ordered list of node names, plus branches.
function connect(chain, extra = []) {
  const c = {};
  const add = (from, to, type = "main", index = 0, outputIndex = 0) => {
    c[from] = c[from] || {};
    c[from][type] = c[from][type] || [];
    while (c[from][type].length <= outputIndex) c[from][type].push([]);
    c[from][type][outputIndex].push({ node: to, type, index });
  };
  for (let i = 0; i < chain.length - 1; i++) add(chain[i], chain[i + 1]);
  for (const e of extra) add(e.from, e.to, e.type || "main", e.index || 0, e.outputIndex || 0);
  return c;
}

function workflow(name, nodes, connections, { active = false, errorWf = true } = {}) {
  const settings = { executionOrder: "v1" };
  if (errorWf && name !== "LOADOUT — Error Handler") settings.errorWorkflow = ERR_HANDLER_ID;
  return { id: id(`wf/${name}`), name, nodes, connections, settings, active };
}

const MODEL = "claude-sonnet-4-5-20250929"; // installer may swap; must be a valid Anthropic model id

// ---- reusable node builders ------------------------------------------------
// Claude AI Agent + Anthropic model pair. Returns {nodes, agentName, modelConn}
function aiAgent(wf, x, y, systemMessage, text) {
  const agentName = "AI Agent";
  const modelName = "Claude (Anthropic)";
  const agent = N(wf, agentName, "@n8n/n8n-nodes-langchain.agent", 1.7,
    { promptType: "define", text, options: { systemMessage } }, x, y,
    { onError: "continueErrorOutput" });
  const model = N(wf, modelName, "@n8n/n8n-nodes-langchain.lmChatAnthropic", 1.2,
    { model: { __rl: true, mode: "list", value: MODEL }, options: {} }, x - 40, y + 180,
    { credentials: CRED.anthropic });
  const modelConn = { [modelName]: { ai_languageModel: [[{ node: agentName, type: "ai_languageModel", index: 0 }]] } };
  return { nodes: [agent, model], agentName, modelConn };
}

// standard "log this run" node (also doubles as error sink)
function logRun(wf, x, y) {
  return N(wf, "Log Run", "n8n-nodes-base.googleSheets", 4.5, {
    operation: "append",
    documentId: { __rl: true, value: "={{$env.LOADOUT_LOG_SHEET_ID}}", mode: "id" },
    sheetName: { __rl: true, value: "Runs", mode: "name" },
    columns: { mappingMode: "autoMapInputData", value: {} },
    options: {},
  }, x, y, { credentials: CRED.sheets, onError: "continueRegularOutput" });
}

function notifyOwnerEmail(wf, name, x, y, subject, message) {
  return N(wf, name, "n8n-nodes-base.gmail", 2.1,
    { sendTo: "={{$env.OWNER_EMAIL}}", subject, message, options: {} },
    x, y, { credentials: CRED.gmail, onError: "continueRegularOutput" });
}

function merge(out) {
  return out.reduce((acc, m) => {
    for (const k of Object.keys(m)) {
      acc[k] = acc[k] || {};
      for (const t of Object.keys(m[k])) acc[k][t] = (acc[k][t] || []).concat(m[k][t]);
    }
    return acc;
  }, {});
}

// ============================================================================
// INFRA — shared plumbing (Error Handler, Cost Tracker, Health Digest, Kill-Switch)
// ============================================================================
function buildInfra() {
  const wfs = [];

  // --- Error Handler: global catch. n8n routes failed executions here. -------
  {
    const wf = "infra/error-handler";
    const trig = N(wf, "On Workflow Error", "n8n-nodes-base.errorTrigger", 1, {}, 260, 300);
    const fmt = N(wf, "Format Error", "n8n-nodes-base.set", 3.4, {
      assignments: { assignments: [
        { id: id(wf + "/a1"), name: "workflow", value: "={{$json.workflow?.name || 'unknown'}}", type: "string" },
        { id: id(wf + "/a2"), name: "error", value: "={{$json.execution?.error?.message || $json.error?.message || 'unknown'}}", type: "string" },
        { id: id(wf + "/a3"), name: "time", value: "={{$now.toISO()}}", type: "string" },
      ] }, options: {},
    }, 480, 300);
    const slack = N(wf, "Alert Owner (Slack)", "n8n-nodes-base.slack", 2.3, {
      resource: "message", operation: "post",
      select: "channel", channelId: { __rl: true, value: "={{$env.SLACK_ALERT_CHANNEL}}", mode: "id" },
      text: "=:rotating_light: *LOADOUT error* in *{{$json.workflow}}*\n{{$json.error}}\n_{{$json.time}}_", otherOptions: {},
    }, 700, 220, { credentials: CRED.slack, onError: "continueRegularOutput" });
    const sheet = N(wf, "Log Error", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "append",
      documentId: { __rl: true, value: "={{$env.LOADOUT_LOG_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Errors", mode: "name" },
      columns: { mappingMode: "autoMapInputData", value: {} }, options: {},
    }, 700, 380, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const conn = connect([], [
      { from: "On Workflow Error", to: "Format Error" },
      { from: "Format Error", to: "Alert Owner (Slack)" },
      { from: "Format Error", to: "Log Error" },
    ]);
    wfs.push(workflow("LOADOUT — Error Handler", [trig, fmt, slack, sheet], conn, { errorWf: false }));
  }

  // --- Cost & Usage Tracker: nightly roll-up of the Runs log -> owner digest --
  {
    const wf = "infra/cost-tracker";
    const trig = N(wf, "Nightly 11pm", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "hours", triggerAtHour: 23 }] } }, 260, 300);
    const read = N(wf, "Read Runs", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "read",
      documentId: { __rl: true, value: "={{$env.LOADOUT_LOG_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Runs", mode: "name" }, options: {},
    }, 480, 300, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const calc = N(wf, "Estimate Cost", "n8n-nodes-base.code", 2, {
      jsCode:
        "// rough daily roll-up. AI cost ~ tokens; here we count AI runs * avg cents.\n" +
        "const rows = items.map(i => i.json);\n" +
        "const today = new Date().toISOString().slice(0,10);\n" +
        "const todays = rows.filter(r => (r.time||'').slice(0,10) === today);\n" +
        "const aiRuns = todays.filter(r => (r.kind||'').includes('ai')).length;\n" +
        "const estUsd = (aiRuns * 0.03).toFixed(2); // ~3c per AI run, adjust to taste\n" +
        "return [{ json: { date: today, totalRuns: todays.length, aiRuns, estUsd } }];",
    }, 700, 300);
    const mail = notifyOwnerEmail(wf, "Email Cost Digest", 920, 300,
      "=LOADOUT cost estimate — {{$json.date}}",
      "=Runs today: {{$json.totalRuns}} (AI: {{$json.aiRuns}})\nEstimated AI spend today: ~${{$json.estUsd}}\n\nThis is an estimate from your run log. Your real bill is on console.anthropic.com.");
    wfs.push(workflow("LOADOUT — Cost & Usage Tracker",
      [trig, read, calc, mail],
      connect(["Nightly 11pm", "Read Runs", "Estimate Cost", "Email Cost Digest"])));
  }

  // --- Daily Health Digest: are workers alive? simple morning ping -----------
  {
    const wf = "infra/health-digest";
    const trig = N(wf, "Daily 7am", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "hours", triggerAtHour: 7 }] } }, 260, 300);
    const list = N(wf, "List Workflows", "n8n-nodes-base.httpRequest", 4.2, {
      method: "GET", url: "={{$env.N8N_API_URL}}/api/v1/workflows?active=true",
      sendHeaders: true, headerParameters: { parameters: [{ name: "X-N8N-API-KEY", value: "={{$env.N8N_API_KEY}}" }] },
      options: {},
    }, 480, 300, { onError: "continueRegularOutput" });
    const fmt = N(wf, "Summarize", "n8n-nodes-base.code", 2, {
      jsCode:
        "const data = $input.first().json.data || [];\n" +
        "return [{ json: { activeCount: data.length, names: data.map(w => w.name).join(', ') || 'none' } }];",
    }, 700, 300);
    const mail = notifyOwnerEmail(wf, "Email Health", 920, 300,
      "=LOADOUT health — {{$json.activeCount}} workers active",
      "=Good morning. {{$json.activeCount}} LOADOUT workers are active and running.\n\nActive: {{$json.names}}");
    wfs.push(workflow("LOADOUT — Daily Health Digest",
      [trig, list, fmt, mail],
      connect(["Daily 7am", "List Workflows", "Summarize", "Email Health"])));
  }

  // --- Master Kill-Switch: webhook that deactivates every active workflow ----
  {
    const wf = "infra/kill-switch";
    const trig = N(wf, "Kill Switch Webhook", "n8n-nodes-base.webhook", 2,
      { httpMethod: "POST", path: "loadout-kill-switch", responseMode: "lastNode" }, 260, 300, { webhookId: true });
    const list = N(wf, "List Active", "n8n-nodes-base.httpRequest", 4.2, {
      method: "GET", url: "={{$env.N8N_API_URL}}/api/v1/workflows?active=true",
      sendHeaders: true, headerParameters: { parameters: [{ name: "X-N8N-API-KEY", value: "={{$env.N8N_API_KEY}}" }] },
      options: {},
    }, 480, 300, { onError: "continueRegularOutput" });
    const split = N(wf, "Each Workflow", "n8n-nodes-base.code", 2, {
      jsCode: "return ($input.first().json.data || []).map(w => ({ json: { id: w.id, name: w.name } }));",
    }, 700, 300);
    const deact = N(wf, "Deactivate", "n8n-nodes-base.httpRequest", 4.2, {
      method: "POST", url: "={{$env.N8N_API_URL}}/api/v1/workflows/{{$json.id}}/deactivate",
      sendHeaders: true, headerParameters: { parameters: [{ name: "X-N8N-API-KEY", value: "={{$env.N8N_API_KEY}}" }] },
      options: {},
    }, 920, 300, { onError: "continueRegularOutput" });
    wfs.push(workflow("LOADOUT — Master Kill-Switch",
      [trig, list, split, deact],
      connect(["Kill Switch Webhook", "List Active", "Each Workflow", "Deactivate"])));
  }

  return wfs;
}

// ============================================================================
// DEPT A — Lead Generation & Sales (7)
// ============================================================================
function buildLeadGen() {
  const wfs = [];

  // A1 — Lead Capture & CRM Router
  {
    const wf = "a/lead-capture";
    const trig = N(wf, "New Lead (Webhook)", "n8n-nodes-base.webhook", 2,
      { httpMethod: "POST", path: "loadout-lead-capture", responseMode: "lastNode" }, 240, 300, { webhookId: true });
    const norm = N(wf, "Normalize Fields", "n8n-nodes-base.set", 3.4, {
      assignments: { assignments: [
        { id: id(wf + "/n"), name: "name", value: "={{$json.body.name || $json.name || ''}}", type: "string" },
        { id: id(wf + "/e"), name: "email", value: "={{$json.body.email || $json.email || ''}}", type: "string" },
        { id: id(wf + "/p"), name: "phone", value: "={{$json.body.phone || $json.phone || ''}}", type: "string" },
        { id: id(wf + "/s"), name: "source", value: "={{$json.body.source || 'web'}}", type: "string" },
        { id: id(wf + "/t"), name: "time", value: "={{$now.toISO()}}", type: "string" },
      ] }, options: {},
    }, 460, 300);
    const crm = N(wf, "Add to CRM Sheet", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "append",
      documentId: { __rl: true, value: "={{$env.CRM_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Leads", mode: "name" },
      columns: { mappingMode: "autoMapInputData", value: {} }, options: {},
    }, 680, 300, { credentials: CRED.sheets, onError: "continueErrorOutput" });
    const notify = notifyOwnerEmail(wf, "Notify Owner", 900, 220,
      "=New lead: {{$json.name || 'unknown'}}",
      "=New {{$json.source}} lead just came in:\n\nName: {{$json.name}}\nEmail: {{$json.email}}\nPhone: {{$json.phone}}\nTime: {{$json.time}}");
    const errlog = notifyOwnerEmail(wf, "CRM Error Alert", 900, 400,
      "LOADOUT: lead-capture could not write to CRM",
      "=A lead came in but the CRM write failed. Lead: {{$json.name}} / {{$json.email}}. Check your Google Sheets connection.");
    const conn = connect(["New Lead (Webhook)", "Normalize Fields", "Add to CRM Sheet"], [
      { from: "Add to CRM Sheet", to: "Notify Owner", outputIndex: 0 },
      { from: "Add to CRM Sheet", to: "CRM Error Alert", outputIndex: 1 },
    ]);
    wfs.push(workflow("A1 — Lead Capture & CRM Router", [trig, norm, crm, notify, errlog], conn));
  }

  // A2 — Instant Lead Responder (AI)
  {
    const wf = "a/instant-responder";
    const trig = N(wf, "New Lead (Webhook)", "n8n-nodes-base.webhook", 2,
      { httpMethod: "POST", path: "loadout-instant-responder", responseMode: "lastNode" }, 220, 300, { webhookId: true });
    const ai = aiAgent(wf, 460, 300,
      "=You are the friendly first responder for {{$env.BUSINESS_NAME}}. Qualify the lead in one short, warm email under 120 words. Acknowledge their enquiry, ask 1-2 qualifying questions, and invite them to book using this link: {{$env.BOOKING_LINK}}. Sign off as the {{$env.BUSINESS_NAME}} team. Output ONLY the email body.",
      "=A new lead just enquired. Details:\nName: {{$json.body.name}}\nMessage: {{$json.body.message}}\nWrite their reply now.");
    const send = N(wf, "Email the Lead", "n8n-nodes-base.gmail", 2.1, {
      sendTo: "={{$('New Lead (Webhook)').item.json.body.email}}",
      subject: "=Thanks for reaching out to {{$env.BUSINESS_NAME}}",
      message: "={{$json.output}}", options: {},
    }, 760, 220, { credentials: CRED.gmail, onError: "continueRegularOutput" });
    const log = logRun(wf, 980, 220);
    const conn = merge([
      connect(["New Lead (Webhook)", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Email the Lead", "Log Run"]),
    ]);
    wfs.push(workflow("A2 — Instant Lead Responder (AI)", [trig, ...ai.nodes, send, log], conn));
  }

  // A3 — Missed-Call Text-Back
  {
    const wf = "a/missed-call";
    const trig = N(wf, "Missed Call (Webhook)", "n8n-nodes-base.webhook", 2,
      { httpMethod: "POST", path: "loadout-missed-call", responseMode: "lastNode" }, 240, 300, { webhookId: true });
    const gate = N(wf, "Is Missed?", "n8n-nodes-base.if", 2, {
      conditions: { options: { caseSensitive: true, version: 2 }, combinator: "and", conditions: [
        { id: id(wf + "/c"), leftValue: "={{$json.body.status}}", rightValue: "no-answer", operator: { type: "string", operation: "equals" } },
      ] },
    }, 460, 300);
    const sms = N(wf, "Text Back", "n8n-nodes-base.twilio", 1, {
      operation: "send", from: "={{$env.TWILIO_FROM}}", to: "={{$json.body.from}}",
      message: "=Sorry we missed your call to {{$env.BUSINESS_NAME}}! Reply here and we'll help right away.",
    }, 700, 220, { credentials: CRED.twilio, onError: "continueRegularOutput" });
    const log = logRun(wf, 920, 220);
    const conn = connect([], [
      { from: "Missed Call (Webhook)", to: "Is Missed?" },
      { from: "Is Missed?", to: "Text Back", outputIndex: 0 },
      { from: "Text Back", to: "Log Run" },
    ]);
    wfs.push(workflow("A3 — Missed-Call Text-Back", [trig, gate, sms, log], conn));
  }

  // A4 — Quote & Proposal Generator (AI)
  {
    const wf = "a/quote-generator";
    const trig = N(wf, "Quote Request (Form)", "n8n-nodes-base.formTrigger", 2.2, {
      formTitle: "Request a Quote", path: "loadout-quote",
      formFields: { values: [
        { fieldLabel: "Your name", requiredField: true },
        { fieldLabel: "Email", requiredField: true },
        { fieldLabel: "What do you need?", fieldType: "textarea", requiredField: true },
      ] },
    }, 220, 300, { webhookId: true });
    const ai = aiAgent(wf, 460, 300,
      "=You are a quoting assistant for {{$env.BUSINESS_NAME}}. Produce a clean, branded quote/proposal in plain text: a short intro, an itemised scope with indicative pricing where reasonable (clearly marked 'indicative'), and clear next steps. Stay professional and concise. Use {{$env.BUSINESS_NAME}} as the provider.",
      "=Build a quote for this request:\nName: {{$json['Your name']}}\nNeed: {{$json['What do you need?']}}");
    const send = N(wf, "Email Quote", "n8n-nodes-base.gmail", 2.1, {
      sendTo: "={{$('Quote Request (Form)').item.json['Email']}}",
      subject: "=Your quote from {{$env.BUSINESS_NAME}}",
      message: "={{$json.output}}", options: {},
    }, 760, 220, { credentials: CRED.gmail, onError: "continueRegularOutput" });
    const log = logRun(wf, 980, 220);
    const conn = merge([
      connect(["Quote Request (Form)", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Email Quote", "Log Run"]),
    ]);
    wfs.push(workflow("A4 — Quote & Proposal Generator (AI)", [trig, ...ai.nodes, send, log], conn));
  }

  // A5 — Cold Outreach Engine
  {
    const wf = "a/cold-outreach";
    const trig = N(wf, "Daily 9am", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "hours", triggerAtHour: 9 }] } }, 200, 300);
    const find = N(wf, "Find Leads (Apollo)", "n8n-nodes-base.httpRequest", 4.2, {
      method: "POST", url: "https://api.apollo.io/v1/mixed_people/search",
      sendHeaders: true, headerParameters: { parameters: [
        { name: "Content-Type", value: "application/json" },
        { name: "X-Api-Key", value: "={{$env.APOLLO_API_KEY}}" },
      ] },
      sendBody: true, specifyBody: "json",
      jsonBody: "={\n  \"page\": 1,\n  \"per_page\": {{$env.COLD_LEADS_PER_DAY || 10}},\n  \"person_titles\": {{$env.ICP_TITLES_JSON || '[\"owner\"]'}}\n}",
      options: {},
    }, 420, 300, { onError: "continueErrorOutput", retryOnFail: true });
    const pick = N(wf, "Dedupe & Pick", "n8n-nodes-base.code", 2, {
      jsCode:
        "const people = ($input.first().json.people || []).filter(p => p.email);\n" +
        "const seen = new Set();\n" +
        "const out = [];\n" +
        "for (const p of people) { if (seen.has(p.email)) continue; seen.add(p.email);\n" +
        "  out.push({ json: { name: p.first_name||'', email: p.email, title: p.title||'', company: (p.organization&&p.organization.name)||'' } }); }\n" +
        "return out;",
    }, 640, 220);
    const ai = aiAgent(wf, 860, 220,
      "=You write cold outreach for {{$env.BUSINESS_NAME}}. Write a personalised email UNDER 150 words to the prospect. One specific, relevant hook, one clear soft CTA. No spam, no hype. Include an unsubscribe line: 'Reply STOP to opt out.' Output ONLY the email body.",
      "=Prospect:\nName: {{$json.name}}\nTitle: {{$json.title}}\nCompany: {{$json.company}}\nWrite their email.");
    const send = N(wf, "Send Cold Email", "n8n-nodes-base.gmail", 2.1, {
      sendTo: "={{$('Dedupe & Pick').item.json.email}}",
      subject: "=Quick idea for {{$('Dedupe & Pick').item.json.company}}",
      message: "={{$json.output}}", options: {},
    }, 1160, 220, { credentials: CRED.gmail, onError: "continueRegularOutput" });
    const log = logRun(wf, 1380, 220);
    const errlog = notifyOwnerEmail(wf, "Lead Source Error", 640, 420,
      "LOADOUT: cold-outreach lead source failed",
      "=Apollo/Hunter lookup failed today. Check APOLLO_API_KEY. No emails were sent.");
    const conn = merge([
      connect(["Daily 9am", "Find Leads (Apollo)"]),
      connect([], [
        { from: "Find Leads (Apollo)", to: "Dedupe & Pick", outputIndex: 0 },
        { from: "Find Leads (Apollo)", to: "Lead Source Error", outputIndex: 1 },
      ]),
      connect(["Dedupe & Pick", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Send Cold Email", "Log Run"]),
    ]);
    wfs.push(workflow("A5 — Cold Outreach Engine", [trig, find, pick, ...ai.nodes, send, log, errlog], conn));
  }

  // A6 — Lead Nurture Sequencer
  {
    const wf = "a/nurture";
    const trig = N(wf, "Daily 10am", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "hours", triggerAtHour: 10 }] } }, 220, 300);
    const read = N(wf, "Read Open Leads", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "read",
      documentId: { __rl: true, value: "={{$env.CRM_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Leads", mode: "name" },
      options: {},
    }, 440, 300, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const due = N(wf, "Pick Due Steps", "n8n-nodes-base.code", 2, {
      jsCode:
        "const now = Date.now();\n" +
        "const rows = items.map(i => i.json).filter(r => (r.status||'').toLowerCase() !== 'converted');\n" +
        "const out = [];\n" +
        "for (const r of rows) {\n" +
        "  const step = parseInt(r.nurtureStep||'0', 10);\n" +
        "  const last = r.lastTouch ? Date.parse(r.lastTouch) : 0;\n" +
        "  const dueAfter = [0, 2, 5, 9][step] || null; // days between touches\n" +
        "  if (dueAfter === null) continue;\n" +
        "  if (!last || (now - last) / 86400000 >= dueAfter) out.push({ json: { ...r, nextStep: step + 1 } });\n" +
        "}\nreturn out;",
    }, 660, 300);
    const ai = aiAgent(wf, 880, 300,
      "=You nurture un-converted leads for {{$env.BUSINESS_NAME}}. Write a short, helpful follow-up email (under 100 words) appropriate to nurture step {{$json.nextStep}}. Be warm, add one piece of value, soft CTA to reply or book {{$env.BOOKING_LINK}}. Output ONLY the email body.",
      "=Lead: {{$json.name}} ({{$json.email}}). Step: {{$json.nextStep}}. Write the follow-up.");
    const send = N(wf, "Send Follow-up", "n8n-nodes-base.gmail", 2.1, {
      sendTo: "={{$('Pick Due Steps').item.json.email}}",
      subject: "=A quick follow-up from {{$env.BUSINESS_NAME}}",
      message: "={{$json.output}}", options: {},
    }, 1180, 300, { credentials: CRED.gmail, onError: "continueRegularOutput" });
    const log = logRun(wf, 1400, 300);
    const conn = merge([
      connect(["Daily 10am", "Read Open Leads", "Pick Due Steps", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Send Follow-up", "Log Run"]),
    ]);
    wfs.push(workflow("A6 — Lead Nurture Sequencer", [trig, read, due, ...ai.nodes, send, log], conn));
  }

  // A7 — Appointment Booking & Reminders
  {
    const wf = "a/appointments";
    const trig = N(wf, "Hourly", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "hours" }] } }, 220, 300);
    const read = N(wf, "Read Appointments", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "read",
      documentId: { __rl: true, value: "={{$env.CRM_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Appointments", mode: "name" },
      options: {},
    }, 440, 300, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const due = N(wf, "Reminders Due", "n8n-nodes-base.code", 2, {
      jsCode:
        "const now = Date.now();\n" +
        "const out = [];\n" +
        "for (const i of items) { const r = i.json;\n" +
        "  if ((r.status||'') === 'no-show') { out.push({ json: { ...r, action: 'rebook' } }); continue; }\n" +
        "  const start = r.startsAt ? Date.parse(r.startsAt) : 0;\n" +
        "  const hrs = (start - now) / 3600000;\n" +
        "  if (hrs > 23 && hrs <= 24 && r.reminded24 !== 'yes') out.push({ json: { ...r, action: 'remind' } });\n" +
        "}\nreturn out;",
    }, 660, 300);
    const sms = N(wf, "Send Reminder SMS", "n8n-nodes-base.twilio", 1, {
      operation: "send", from: "={{$env.TWILIO_FROM}}", to: "={{$json.phone}}",
      message: "=Reminder: your appointment with {{$env.BUSINESS_NAME}} is {{$json.startsAt}}. Reply to reschedule.",
    }, 880, 220, { credentials: CRED.twilio, onError: "continueRegularOutput" });
    const mail = notifyOwnerEmail(wf, "Email Reminder", 880, 380,
      "=Appointment reminder — {{$json.name}}",
      "=Reminder sent for {{$json.name}} at {{$json.startsAt}} (action: {{$json.action}}).");
    const log = logRun(wf, 1120, 300);
    const conn = connect([], [
      { from: "Hourly", to: "Read Appointments" },
      { from: "Read Appointments", to: "Reminders Due" },
      { from: "Reminders Due", to: "Send Reminder SMS" },
      { from: "Reminders Due", to: "Email Reminder" },
      { from: "Send Reminder SMS", to: "Log Run" },
    ]);
    wfs.push(workflow("A7 — Appointment Booking & Reminders", [trig, read, due, sms, mail, log], conn));
  }

  return wfs;
}

// ============================================================================
// DEPT B — Customer Service (5)
// ============================================================================
function buildCustomerService() {
  const wfs = [];

  // B8 — Website AI Chatbot (RAG-style, owned outright)
  {
    const wf = "b/chatbot";
    const trig = N(wf, "Chat Message (Webhook)", "n8n-nodes-base.webhook", 2,
      { httpMethod: "POST", path: "loadout-chatbot", responseMode: "responseNode" }, 220, 300, { webhookId: true });
    const ai = aiAgent(wf, 460, 300,
      "=You are the website assistant for {{$env.BUSINESS_NAME}}. Answer using the business's own FAQ/knowledge below. If you don't know, say so and offer to take their email so the team can follow up. Be concise and on-brand. Knowledge base:\n\n{{$env.FAQ_TEXT}}",
      "={{$json.body.message}}");
    const capture = N(wf, "Capture Lead (if email)", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "append",
      documentId: { __rl: true, value: "={{$env.CRM_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Leads", mode: "name" },
      columns: { mappingMode: "autoMapInputData", value: {} }, options: {},
    }, 760, 380, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const respond = N(wf, "Reply to Visitor", "n8n-nodes-base.respondToWebhook", 1.1,
      { respondWith: "text", responseBody: "={{$json.output}}" }, 760, 220);
    const conn = merge([
      connect(["Chat Message (Webhook)", ai.agentName]),
      ai.modelConn,
      connect([], [
        { from: ai.agentName, to: "Reply to Visitor" },
        { from: ai.agentName, to: "Capture Lead (if email)" },
      ]),
    ]);
    wfs.push(workflow("B8 — Website AI Chatbot (RAG)", [trig, ...ai.nodes, capture, respond], conn));
  }

  // B9 — Support Inbox Triage (AI)
  {
    const wf = "b/triage";
    const trig = N(wf, "New Support Email", "n8n-nodes-base.gmailTrigger", 1.2,
      { pollTimes: { item: [{ mode: "everyMinute" }] }, simple: true, filters: {} }, 220, 300,
      { credentials: CRED.gmail });
    const ai = aiAgent(wf, 460, 300,
      "=You triage the support inbox for {{$env.BUSINESS_NAME}}. For the message, output JSON with: category (sales|support|billing|spam|other), priority (high|medium|low), and a drafted reply in the brand's friendly voice. Output ONLY valid JSON: {\"category\":\"\",\"priority\":\"\",\"draft\":\"\"}.",
      "=From: {{$json.from}}\nSubject: {{$json.subject}}\nBody: {{$json.snippet || $json.text}}");
    const parse = N(wf, "Parse Triage", "n8n-nodes-base.code", 2, {
      jsCode: "let o={}; try{o=JSON.parse($json.output)}catch(e){o={category:'other',priority:'medium',draft:$json.output}}; return [{json:{...o, from:$('New Support Email').item.json.from, subject:$('New Support Email').item.json.subject}}];",
    }, 760, 300);
    const draft = N(wf, "Save Draft Reply", "n8n-nodes-base.gmail", 2.1, {
      resource: "draft", operation: "create",
      subject: "=Re: {{$json.subject}}", message: "={{$json.draft}}", options: { sendTo: "={{$json.from}}" },
    }, 1000, 220, { credentials: CRED.gmail, onError: "continueRegularOutput" });
    const log = logRun(wf, 1000, 380);
    const conn = merge([
      connect(["New Support Email", ai.agentName]),
      ai.modelConn,
      connect([], [
        { from: ai.agentName, to: "Parse Triage" },
        { from: "Parse Triage", to: "Save Draft Reply" },
        { from: "Parse Triage", to: "Log Run" },
      ]),
    ]);
    wfs.push(workflow("B9 — Support Inbox Triage (AI)", [trig, ...ai.nodes, parse, draft, log], conn));
  }

  // B10 — FAQ Auto-Responder
  {
    const wf = "b/faq";
    const trig = N(wf, "Question (Webhook)", "n8n-nodes-base.webhook", 2,
      { httpMethod: "POST", path: "loadout-faq", responseMode: "responseNode" }, 220, 300, { webhookId: true });
    const ai = aiAgent(wf, 460, 300,
      "=You answer common customer questions for {{$env.BUSINESS_NAME}} in the brand's voice, 24/7. Use the FAQ below. Keep answers short and direct. If it's not covered, say a human will follow up. FAQ:\n\n{{$env.FAQ_TEXT}}",
      "={{$json.body.question}}");
    const respond = N(wf, "Answer", "n8n-nodes-base.respondToWebhook", 1.1,
      { respondWith: "text", responseBody: "={{$json.output}}" }, 760, 300);
    const conn = merge([
      connect(["Question (Webhook)", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Answer"]),
    ]);
    wfs.push(workflow("B10 — FAQ Auto-Responder", [trig, ...ai.nodes, respond], conn));
  }

  // B11 — Order / Job Status Notifier
  {
    const wf = "b/status-notifier";
    const trig = N(wf, "Every 30 min", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "minutes", minutesInterval: 30 }] } }, 220, 300);
    const read = N(wf, "Read Orders", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "read",
      documentId: { __rl: true, value: "={{$env.CRM_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Orders", mode: "name" }, options: {},
    }, 440, 300, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const changed = N(wf, "Status Changed?", "n8n-nodes-base.code", 2, {
      jsCode: "return items.map(i=>i.json).filter(r => r.status && r.notifiedStatus !== r.status && r.email).map(r=>({json:r}));",
    }, 660, 300);
    const mail = N(wf, "Email Customer", "n8n-nodes-base.gmail", 2.1, {
      sendTo: "={{$json.email}}",
      subject: "=Update on your order {{$json.orderId}} — {{$env.BUSINESS_NAME}}",
      message: "=Hi {{$json.name}}, your order {{$json.orderId}} is now: {{$json.status}}.\n\nThanks for choosing {{$env.BUSINESS_NAME}}.",
      options: {},
    }, 880, 300, { credentials: CRED.gmail, onError: "continueRegularOutput" });
    const log = logRun(wf, 1100, 300);
    wfs.push(workflow("B11 — Order / Job Status Notifier",
      [trig, read, changed, mail, log],
      connect(["Every 30 min", "Read Orders", "Status Changed?", "Email Customer", "Log Run"])));
  }

  // B12 — Customer Onboarding Sequencer
  {
    const wf = "b/onboarding";
    const trig = N(wf, "New Customer (Webhook)", "n8n-nodes-base.webhook", 2,
      { httpMethod: "POST", path: "loadout-onboarding", responseMode: "lastNode" }, 220, 300, { webhookId: true });
    const ai = aiAgent(wf, 460, 300,
      "=You write the welcome + first onboarding step for a new customer of {{$env.BUSINESS_NAME}}. Warm welcome, the 2-3 steps to get value fast, and where to get help. Under 150 words. Output ONLY the email body.",
      "=New customer: {{$json.body.name}}. Product/service: {{$json.body.product || 'our service'}}. Write their welcome.");
    const send = N(wf, "Send Welcome", "n8n-nodes-base.gmail", 2.1, {
      sendTo: "={{$('New Customer (Webhook)').item.json.body.email}}",
      subject: "=Welcome to {{$env.BUSINESS_NAME}}!",
      message: "={{$json.output}}", options: {},
    }, 760, 220, { credentials: CRED.gmail, onError: "continueRegularOutput" });
    const log = logRun(wf, 980, 220);
    const conn = merge([
      connect(["New Customer (Webhook)", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Send Welcome", "Log Run"]),
    ]);
    wfs.push(workflow("B12 — Customer Onboarding Sequencer", [trig, ...ai.nodes, send, log], conn));
  }

  return wfs;
}

// ============================================================================
// DEPT C — Reputation & Reviews (3)
// ============================================================================
function buildReputation() {
  const wfs = [];

  // C13 — Review Request Automation
  {
    const wf = "c/review-request";
    const trig = N(wf, "Daily 4pm", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "hours", triggerAtHour: 16 }] } }, 220, 300);
    const read = N(wf, "Read Completed Jobs", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "read",
      documentId: { __rl: true, value: "={{$env.CRM_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Jobs", mode: "name" }, options: {},
    }, 440, 300, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const eligible = N(wf, "Eligible & Happy", "n8n-nodes-base.code", 2, {
      jsCode:
        "const now=Date.now();\n" +
        "return items.map(i=>i.json).filter(r => (r.status||'')==='completed' && r.reviewRequested!=='yes' && r.email && (r.sentiment||'positive')!=='negative' && r.completedAt && (now-Date.parse(r.completedAt))/3600000 >= 2).map(r=>({json:r}));",
    }, 660, 300);
    const mail = N(wf, "Ask for Review", "n8n-nodes-base.gmail", 2.1, {
      sendTo: "={{$json.email}}",
      subject: "=How did we do, {{$json.name}}?",
      message: "=Hi {{$json.name}}, thanks for choosing {{$env.BUSINESS_NAME}}! If you have 30 seconds, a quick review really helps us: {{$env.REVIEW_LINK}}",
      options: {},
    }, 880, 300, { credentials: CRED.gmail, onError: "continueRegularOutput" });
    const log = logRun(wf, 1100, 300);
    wfs.push(workflow("C13 — Review Request Automation",
      [trig, read, eligible, mail, log],
      connect(["Daily 4pm", "Read Completed Jobs", "Eligible & Happy", "Ask for Review", "Log Run"])));
  }

  // C14 — Review Response Agent (AI)
  {
    const wf = "c/review-response";
    const trig = N(wf, "New Review (Webhook)", "n8n-nodes-base.webhook", 2,
      { httpMethod: "POST", path: "loadout-new-review", responseMode: "lastNode" }, 220, 300, { webhookId: true });
    const ai = aiAgent(wf, 460, 300,
      "=You draft public replies to online reviews for {{$env.BUSINESS_NAME}}. Match tone to the rating: warm thanks for positive, calm and solution-focused for negative (never defensive, never share private details). Under 60 words, on-brand. Output ONLY the reply text.",
      "=Rating: {{$json.body.rating}}/5\nReview: {{$json.body.text}}\nPlatform: {{$json.body.platform}}");
    const approve = notifyOwnerEmail(wf, "Send Draft to Owner", 760, 220,
      "=Review reply ready ({{$json.body?.rating || ''}}★) — approve to post",
      "=A new review came in. Suggested public reply (review, edit, then post on the platform):\n\n---\n{{$json.output}}\n---");
    const log = logRun(wf, 980, 220);
    const conn = merge([
      connect(["New Review (Webhook)", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Send Draft to Owner", "Log Run"]),
    ]);
    wfs.push(workflow("C14 — Review Response Agent (AI)", [trig, ...ai.nodes, approve, log], conn));
  }

  // C15 — Complaint De-escalation (AI)
  {
    const wf = "c/complaint";
    const trig = N(wf, "Complaint (Webhook)", "n8n-nodes-base.webhook", 2,
      { httpMethod: "POST", path: "loadout-complaint", responseMode: "lastNode" }, 220, 300, { webhookId: true });
    const ai = aiAgent(wf, 460, 300,
      "=You handle upset customers for {{$env.BUSINESS_NAME}}. Write a calm, empathetic, structured reply: acknowledge, apologise where appropriate, state the concrete next step, and offer to make it right. Never argue. Under 120 words. Output ONLY the reply body.",
      "=Angry message from {{$json.body.name}} ({{$json.body.email}}):\n{{$json.body.message}}");
    const draft = N(wf, "Draft Reply", "n8n-nodes-base.gmail", 2.1, {
      resource: "draft", operation: "create",
      subject: "=Re: your message to {{$env.BUSINESS_NAME}}",
      message: "={{$json.output}}", options: { sendTo: "={{$('Complaint (Webhook)').item.json.body.email}}" },
    }, 760, 220, { credentials: CRED.gmail, onError: "continueRegularOutput" });
    const escalate = N(wf, "Escalate (Slack)", "n8n-nodes-base.slack", 2.3, {
      resource: "message", operation: "post", select: "channel",
      channelId: { __rl: true, value: "={{$env.SLACK_ALERT_CHANNEL}}", mode: "id" },
      text: "=:warning: *Complaint flagged* from {{$('Complaint (Webhook)').item.json.body.name}}. A draft reply is waiting in Gmail for your approval.",
      otherOptions: {},
    }, 760, 380, { credentials: CRED.slack, onError: "continueRegularOutput" });
    const conn = merge([
      connect(["Complaint (Webhook)", ai.agentName]),
      ai.modelConn,
      connect([], [
        { from: ai.agentName, to: "Draft Reply" },
        { from: ai.agentName, to: "Escalate (Slack)" },
      ]),
    ]);
    wfs.push(workflow("C15 — Complaint De-escalation (AI)", [trig, ...ai.nodes, draft, escalate], conn));
  }

  return wfs;
}

// ============================================================================
// DEPT D — Content & Social (5)
// ============================================================================
function buildContentSocial() {
  const wfs = [];

  // D16 — Social Scheduler & Publisher (draft+approval default; auto-publish opt-in)
  {
    const wf = "d/social-publisher";
    const trig = N(wf, "Daily 8am", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "hours", triggerAtHour: 8 }] } }, 200, 300);
    const read = N(wf, "Read Content Queue", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "read",
      documentId: { __rl: true, value: "={{$env.CONTENT_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "ContentQueue", mode: "name" }, options: {},
    }, 420, 300, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const due = N(wf, "Pick Due Post", "n8n-nodes-base.code", 2, {
      jsCode: "const today=new Date().toISOString().slice(0,10); return items.map(i=>i.json).filter(r=>(r.status||'queued')!=='posted' && (r.scheduledFor||'').slice(0,10)<=today).slice(0,1).map(r=>({json:r}));",
    }, 640, 300);
    const gate = N(wf, "Auto-publish on?", "n8n-nodes-base.if", 2, {
      conditions: { options: { caseSensitive: false, version: 2 }, combinator: "and", conditions: [
        { id: id(wf + "/g"), leftValue: "={{$env.SOCIAL_AUTOPUBLISH}}", rightValue: "true", operator: { type: "string", operation: "equals" } },
      ] },
    }, 860, 300);
    const publish = N(wf, "Publish (opt-in)", "n8n-nodes-base.httpRequest", 4.2, {
      method: "POST", url: "={{$env.SOCIAL_PUBLISH_URL}}",
      sendBody: true, specifyBody: "json",
      jsonBody: "={\n  \"text\": {{ JSON.stringify($json.text) }},\n  \"platform\": {{ JSON.stringify($json.platform || 'facebook') }}\n}",
      options: {},
    }, 1100, 220, { onError: "continueRegularOutput" });
    const approve = notifyOwnerEmail(wf, "Send Draft for Approval", 1100, 400,
      "=Post ready to approve — {{$json.platform || 'social'}}",
      "=Today's queued post (auto-publish is OFF, so paste it yourself or flip SOCIAL_AUTOPUBLISH to true):\n\n{{$json.text}}");
    const conn = merge([
      connect(["Daily 8am", "Read Content Queue", "Pick Due Post", "Auto-publish on?"]),
      connect([], [
        { from: "Auto-publish on?", to: "Publish (opt-in)", outputIndex: 0 },
        { from: "Auto-publish on?", to: "Send Draft for Approval", outputIndex: 1 },
      ]),
    ]);
    wfs.push(workflow("D16 — Social Scheduler & Publisher", [trig, read, due, gate, publish, approve], conn));
  }

  // D17 — AI Content Repurposer
  {
    const wf = "d/repurposer";
    const trig = N(wf, "Source Content (Webhook)", "n8n-nodes-base.webhook", 2,
      { httpMethod: "POST", path: "loadout-repurpose", responseMode: "lastNode" }, 220, 300, { webhookId: true });
    const ai = aiAgent(wf, 460, 300,
      "=You repurpose one piece of content for {{$env.BUSINESS_NAME}} into: 3 short social posts, 1 LinkedIn post, 5 captions, 1 short email, and a 5-tweet thread. Keep the brand voice. Label each section clearly. Output plain text.",
      "=Repurpose this:\n{{$json.body.content}}");
    const mail = notifyOwnerEmail(wf, "Email Repurposed Pack", 760, 300,
      "Your content, repurposed",
      "=Here's your content turned into posts, captions, an email and a thread:\n\n{{$json.output}}");
    const log = logRun(wf, 980, 300);
    const conn = merge([
      connect(["Source Content (Webhook)", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Email Repurposed Pack", "Log Run"]),
    ]);
    wfs.push(workflow("D17 — AI Content Repurposer", [trig, ...ai.nodes, mail, log], conn));
  }

  // D18 — Blog / SEO Article Drafter (AI)
  {
    const wf = "d/blog-drafter";
    const trig = N(wf, "Topic (Webhook)", "n8n-nodes-base.webhook", 2,
      { httpMethod: "POST", path: "loadout-blog", responseMode: "lastNode" }, 220, 300, { webhookId: true });
    const ai = aiAgent(wf, 460, 300,
      "=You draft SEO blog articles for {{$env.BUSINESS_NAME}}. From a keyword/topic, produce a ready-to-edit draft: SEO title, meta description, H2/H3 outline, then the full draft (~700 words), and a suggested slug. Natural keyword use, no stuffing. Output markdown.",
      "=Topic/keyword: {{$json.body.topic}}");
    const mail = notifyOwnerEmail(wf, "Email Draft Article", 760, 300,
      "=Draft article: {{$json.body?.topic || 'new post'}}",
      "=Your draft article is ready to edit:\n\n{{$json.output}}");
    const log = logRun(wf, 980, 300);
    const conn = merge([
      connect(["Topic (Webhook)", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Email Draft Article", "Log Run"]),
    ]);
    wfs.push(workflow("D18 — Blog / SEO Article Drafter (AI)", [trig, ...ai.nodes, mail, log], conn));
  }

  // D19 — Newsletter Builder
  {
    const wf = "d/newsletter";
    const trig = N(wf, "Weekly Fri 2pm", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "weeks", triggerAtDay: [5], triggerAtHour: 14 }] } }, 220, 300);
    const read = N(wf, "Read Week's Updates", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "read",
      documentId: { __rl: true, value: "={{$env.CONTENT_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Updates", mode: "name" }, options: {},
    }, 440, 300, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const collect = N(wf, "Collect Items", "n8n-nodes-base.code", 2, {
      jsCode: "const items_=items.map(i=>i.json); return [{json:{digest: items_.map(r=>'- '+(r.title||'')+': '+(r.note||'')).join('\\n') || 'No updates logged this week.'}}];",
    }, 660, 300);
    const ai = aiAgent(wf, 880, 300,
      "=You write the weekly email newsletter for {{$env.BUSINESS_NAME}}. Turn the bullet list of updates into a friendly, scannable newsletter with a subject line, short intro, the highlights, and a sign-off. Output: first line = 'SUBJECT: ...', then the body.",
      "=This week's updates:\n{{$json.digest}}");
    const draft = notifyOwnerEmail(wf, "Email Newsletter Draft", 1180, 300,
      "Weekly newsletter — ready to review/send",
      "=Your newsletter draft (review, then send to your list):\n\n{{$json.output}}");
    const conn = merge([
      connect(["Weekly Fri 2pm", "Read Week's Updates", "Collect Items", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Email Newsletter Draft"]),
    ]);
    wfs.push(workflow("D19 — Newsletter Builder", [trig, read, collect, ...ai.nodes, draft], conn));
  }

  // D20 — Competitor Ad Watcher (AI) — Meta Ads Library, tracks ADS not organic
  {
    const wf = "d/ad-watcher";
    const trig = N(wf, "Daily 6am", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "hours", triggerAtHour: 6 }] } }, 200, 300);
    const fetch = N(wf, "Meta Ads Library", "n8n-nodes-base.httpRequest", 4.2, {
      method: "GET", url: "https://graph.facebook.com/v19.0/ads_archive",
      sendQuery: true, queryParameters: { parameters: [
        { name: "access_token", value: "={{$env.META_ADS_TOKEN}}" },
        { name: "search_page_ids", value: "={{$env.COMPETITOR_PAGE_IDS}}" },
        { name: "ad_reached_countries", value: "={{$env.ADS_COUNTRY || 'AU'}}" },
        { name: "ad_active_status", value: "ACTIVE" },
        { name: "fields", value: "id,ad_creative_bodies,page_name,ad_delivery_start_time" },
        { name: "limit", value: "25" },
      ] },
      options: {},
    }, 420, 300, { onError: "continueErrorOutput", retryOnFail: true });
    const fresh = N(wf, "New Ads Only", "n8n-nodes-base.code", 2, {
      jsCode:
        "const data=($input.first().json.data)||[];\n" +
        "const since=Date.now()-24*3600000;\n" +
        "const recent=data.filter(a=>a.ad_delivery_start_time && Date.parse(a.ad_delivery_start_time)>=since);\n" +
        "if(!recent.length) return [{json:{summary:'No new ad activity from tracked competitors in the last 24h.'}}];\n" +
        "const text=recent.map(a=>`[${a.page_name}] ${(a.ad_creative_bodies||['(no text)']).join(' / ')}`).join('\\n');\n" +
        "return [{json:{ads:text, count:recent.length}}];",
    }, 640, 300);
    const ai = aiAgent(wf, 860, 300,
      "=You watch competitor ADS (not organic posts) for {{$env.BUSINESS_NAME}}. Given new competitor ads, write a tight TL;DR of what they're running and ONE concrete response idea we could test. If the input says no new activity, just relay that. Under 150 words.",
      "={{$json.ads || $json.summary}}");
    const mail = notifyOwnerEmail(wf, "Email Ad Brief", 1160, 300,
      "Competitor ad watch — daily brief",
      "={{$json.output}}");
    const errlog = notifyOwnerEmail(wf, "Ad API Error", 640, 460,
      "LOADOUT: competitor ad watcher couldn't reach Meta",
      "=The Meta Ads Library call failed today. Check META_ADS_TOKEN and COMPETITOR_PAGE_IDS.");
    const conn = merge([
      connect(["Daily 6am", "Meta Ads Library"]),
      connect([], [
        { from: "Meta Ads Library", to: "New Ads Only", outputIndex: 0 },
        { from: "Meta Ads Library", to: "Ad API Error", outputIndex: 1 },
      ]),
      connect(["New Ads Only", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Email Ad Brief"]),
    ]);
    wfs.push(workflow("D20 — Competitor Ad Watcher (AI)", [trig, fetch, fresh, ...ai.nodes, mail, errlog], conn));
  }

  // D21 — Competitor Post Responder (AI) — sees a competitor's public IG post,
  // creates an ORIGINAL on-brand lookalike (image + caption), draft by default.
  {
    const wf = "d/post-responder";
    const trig = N(wf, "Hourly", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "hours" }] } }, 180, 300);
    // fan out the competitor username list (CSV) into one item each
    const split = N(wf, "Each Competitor", "n8n-nodes-base.code", 2, {
      jsCode: "return ($env.COMPETITOR_IG_USERNAMES||'').split(',').map(u=>u.trim()).filter(Boolean).map(u=>({json:{username:u}}));",
    }, 380, 300);
    // official IG Graph business_discovery — public Business/Creator accounts only
    const fetchPosts = N(wf, "Fetch IG Posts", "n8n-nodes-base.httpRequest", 4.2, {
      method: "GET", url: "=https://graph.facebook.com/v19.0/{{$env.IG_BUSINESS_ACCOUNT_ID}}",
      sendQuery: true, queryParameters: { parameters: [
        { name: "fields", value: "=business_discovery.username({{$json.username}}){media.limit(3){id,caption,media_type,media_url,permalink,timestamp}}" },
        { name: "access_token", value: "={{$env.IG_GRAPH_TOKEN}}" },
      ] },
      options: {},
    }, 600, 300, { onError: "continueErrorOutput", retryOnFail: true });
    const fresh = N(wf, "New Posts Only", "n8n-nodes-base.code", 2, {
      jsCode:
        "const bd=$json.business_discovery||{}; const media=(bd.media&&bd.media.data)||[];\n" +
        "const since=Date.now()-3600000;\n" +
        "return media.filter(m=>m.timestamp && Date.parse(m.timestamp)>=since).map(m=>({json:{\n" +
        "  competitor: bd.username, caption: m.caption||'', mediaType: m.media_type,\n" +
        "  refImage: m.media_url||'', permalink: m.permalink||''\n" +
        "}}));",
    }, 820, 300);
    const ai = aiAgent(wf, 1040, 300,
      "=You react to a competitor's social post for {{$env.BUSINESS_NAME}}. Using the competitor's post ONLY as loose inspiration (never copy it — that's their copyright), design an ORIGINAL on-brand post. Output ONLY valid JSON: {\"concept\":\"one line\",\"imagePrompt\":\"a detailed text-to-image prompt for an original branded image, no logos/text of the competitor\",\"caption\":\"the post caption in our brand voice with 3-5 hashtags\"}.",
      "=Competitor: {{$json.competitor}}\nTheir post type: {{$json.mediaType}}\nTheir caption: {{$json.caption}}\nReference link: {{$json.permalink}}");
    const parse = N(wf, "Parse Concept", "n8n-nodes-base.code", 2, {
      jsCode: "let o={}; try{o=JSON.parse($json.output)}catch(e){o={concept:'',imagePrompt:$json.output,caption:''}} return [{json:{...o, competitor:$('New Posts Only').item.json.competitor, ref:$('New Posts Only').item.json.permalink}}];",
    }, 1340, 300);
    // pluggable image engine: buyer points IMAGE_GEN_URL/KEY at OpenAI/Replicate/fal/etc
    const gen = N(wf, "Generate Image", "n8n-nodes-base.httpRequest", 4.2, {
      method: "POST", url: "={{$env.IMAGE_GEN_URL}}",
      sendHeaders: true, headerParameters: { parameters: [
        { name: "Authorization", value: "=Bearer {{$env.IMAGE_GEN_KEY}}" },
        { name: "Content-Type", value: "application/json" },
      ] },
      sendBody: true, specifyBody: "json",
      jsonBody: "={\n  \"prompt\": {{ JSON.stringify($json.imagePrompt) }},\n  \"n\": 1,\n  \"size\": \"1024x1024\"\n}",
      options: {},
    }, 1560, 300, { onError: "continueErrorOutput", retryOnFail: true });
    const pickUrl = N(wf, "Find Image URL", "n8n-nodes-base.code", 2, {
      jsCode:
        "const j=$json;\n" +
        "// support common shapes: OpenAI {data:[{url|b64_json}]}, Replicate {output:[url]}, fal {images:[{url}]}\n" +
        "const url = (j.data&&j.data[0]&&(j.data[0].url||(j.data[0].b64_json?('data:image/png;base64,'+j.data[0].b64_json):'')))\n" +
        "  || (Array.isArray(j.output)?j.output[0]:j.output) || (j.images&&j.images[0]&&j.images[0].url) || '';\n" +
        "const c=$('Parse Concept').item.json;\n" +
        "return [{json:{imageUrl:url, caption:c.caption, concept:c.concept, competitor:c.competitor, ref:c.ref}}];",
    }, 1780, 300);
    const gate = N(wf, "Auto-publish on?", "n8n-nodes-base.if", 2, {
      conditions: { options: { caseSensitive: false, version: 2 }, combinator: "and", conditions: [
        { id: id(wf + "/g"), leftValue: "={{$env.SOCIAL_AUTOPUBLISH}}", rightValue: "true", operator: { type: "string", operation: "equals" } },
      ] },
    }, 2000, 300);
    const publish = N(wf, "Publish (opt-in)", "n8n-nodes-base.httpRequest", 4.2, {
      method: "POST", url: "={{$env.SOCIAL_PUBLISH_URL}}",
      sendBody: true, specifyBody: "json",
      jsonBody: "={\n  \"text\": {{ JSON.stringify($json.caption) }},\n  \"imageUrl\": {{ JSON.stringify($json.imageUrl) }},\n  \"platform\": \"instagram\"\n}",
      options: {},
    }, 2240, 220, { onError: "continueRegularOutput" });
    const approve = notifyOwnerEmail(wf, "Send Draft for Approval", 2240, 400,
      "=New post idea (reacting to {{$json.competitor}}) — approve to publish",
      "=A competitor ({{$json.competitor}}) just posted. Here's an ORIGINAL response we made for you:\n\nConcept: {{$json.concept}}\n\nCaption:\n{{$json.caption}}\n\nGenerated image: {{$json.imageUrl}}\nTheir post (reference): {{$json.ref}}\n\n(Auto-publish is OFF — post it yourself, or set SOCIAL_AUTOPUBLISH=true to let it publish.)");
    const errlog = notifyOwnerEmail(wf, "IG Fetch Error", 600, 460,
      "LOADOUT: competitor post responder couldn't reach Instagram",
      "=The Instagram business_discovery call failed. Check IG_GRAPH_TOKEN, IG_BUSINESS_ACCOUNT_ID, and that the competitor is a PUBLIC Business/Creator account.");
    const conn = merge([
      connect(["Hourly", "Each Competitor"]),
      connect([], [
        { from: "Each Competitor", to: "Fetch IG Posts" },
        { from: "Fetch IG Posts", to: "New Posts Only", outputIndex: 0 },
        { from: "Fetch IG Posts", to: "IG Fetch Error", outputIndex: 1 },
      ]),
      connect(["New Posts Only", ai.agentName]),
      ai.modelConn,
      connect([], [
        { from: ai.agentName, to: "Parse Concept", outputIndex: 0 },
        { from: "Parse Concept", to: "Generate Image" },
        { from: "Generate Image", to: "Find Image URL", outputIndex: 0 },
        { from: "Find Image URL", to: "Auto-publish on?" },
        { from: "Auto-publish on?", to: "Publish (opt-in)", outputIndex: 0 },
        { from: "Auto-publish on?", to: "Send Draft for Approval", outputIndex: 1 },
      ]),
    ]);
    wfs.push(workflow("D21 — Competitor Post Responder (AI)",
      [trig, split, fetchPosts, fresh, ...ai.nodes, parse, gen, pickUrl, gate, publish, approve, errlog], conn));
  }

  // D22 — Google Ad Watcher (AI) — weekly: pull competitors' live Google ads from
  // a transparency source, rank by LONGEVITY (proxy for winners — you can't see
  // their real performance), TL;DR the top ones + draft an original remake idea.
  {
    const wf = "d/google-ad-watcher";
    const trig = N(wf, "Weekly Mon 6am", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "weeks", triggerAtDay: [1], triggerAtHour: 6 }] } }, 180, 300);
    // pluggable transparency source (e.g. SerpApi Google Ads Transparency) — no
    // official Google API exists, so the buyer plugs in their chosen provider.
    const fetch = N(wf, "Fetch Google Ads", "n8n-nodes-base.httpRequest", 4.2, {
      method: "GET", url: "={{$env.ADS_TRANSPARENCY_URL}}",
      sendQuery: true, queryParameters: { parameters: [
        { name: "advertisers", value: "={{$env.GOOGLE_ADS_ADVERTISERS}}" },
        { name: "region", value: "={{$env.ADS_COUNTRY || 'AU'}}" },
        { name: "api_key", value: "={{$env.ADS_TRANSPARENCY_KEY}}" },
      ] },
      options: {},
    }, 400, 300, { onError: "continueErrorOutput", retryOnFail: true });
    const rank = N(wf, "Rank by Longevity", "n8n-nodes-base.code", 2, {
      jsCode:
        "const ads=($input.first().json.ads || $input.first().json.ad_creatives || []);\n" +
        "const now=Date.now();\n" +
        "const withRun=ads.map(a=>{const start=Date.parse(a.first_shown||a.first_seen||a.start_date||0)||now; return {...a, daysRunning:Math.max(0,Math.round((now-start)/86400000))};});\n" +
        "// longest-running = most likely a proven winner (they don't keep losers live)\n" +
        "const sorted=withRun.sort((x,y)=>y.daysRunning-x.daysRunning);\n" +
        "const week=sorted.filter(a=>a.daysRunning>=7).slice(0,5);\n" +
        "const month=sorted.filter(a=>a.daysRunning>=30).slice(0,5);\n" +
        "const fmt=l=>l.map(a=>`[${a.advertiser||a.page_name||'?'}, ${a.daysRunning}d] ${(a.text||a.body||a.creative||'').toString().slice(0,200)}`).join('\\n')||'none';\n" +
        "if(!sorted.length) return [{json:{summary:'No live Google ads found for tracked competitors this week.'}}];\n" +
        "return [{json:{topWeek:fmt(week), topMonth:fmt(month)}}];",
    }, 620, 300);
    const ai = aiAgent(wf, 840, 300,
      "=You analyse competitors' best-performing Google ads for {{$env.BUSINESS_NAME}}. The ads given are ranked by how long they've been running (longest = most likely a proven winner, since advertisers kill losers fast). Write: (1) a TL;DR of the top WEEK and top MONTH long-runners and the angle/offer that makes them work, then (2) ONE original ad concept we could test in response — original copy, never a copy of theirs. Under 200 words. If the input says none found, just relay that.",
      "=TOP THIS WEEK (by days running):\n{{$json.topWeek}}\n\nTOP THIS MONTH:\n{{$json.topMonth}}\n\n{{$json.summary}}");
    const mail = notifyOwnerEmail(wf, "Email Ad Brief", 1140, 300,
      "Google ad watch — weekly + monthly winners + a remake idea",
      "={{$json.output}}");
    const errlog = notifyOwnerEmail(wf, "Ads Source Error", 620, 460,
      "LOADOUT: Google ad watcher couldn't reach the transparency source",
      "=The Google Ads transparency lookup failed. Check ADS_TRANSPARENCY_URL, ADS_TRANSPARENCY_KEY and GOOGLE_ADS_ADVERTISERS.");
    const conn = merge([
      connect(["Weekly Mon 6am", "Fetch Google Ads"]),
      connect([], [
        { from: "Fetch Google Ads", to: "Rank by Longevity", outputIndex: 0 },
        { from: "Fetch Google Ads", to: "Ads Source Error", outputIndex: 1 },
      ]),
      connect(["Rank by Longevity", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Email Ad Brief"]),
    ]);
    wfs.push(workflow("D22 — Google Ad Watcher (AI)", [trig, fetch, rank, ...ai.nodes, mail, errlog], conn));
  }

  return wfs;
}

// ============================================================================
// DEPT E — Operations & Admin (6)
// ============================================================================
function buildOperations() {
  const wfs = [];

  // E21 — Invoice & Receipt Processor (AI)
  {
    const wf = "e/invoice";
    const trig = N(wf, "Invoice In (Webhook)", "n8n-nodes-base.webhook", 2,
      { httpMethod: "POST", path: "loadout-invoice", responseMode: "lastNode" }, 220, 300, { webhookId: true });
    const ai = aiAgent(wf, 460, 300,
      "=You extract structured data from an invoice/receipt. Output ONLY valid JSON: {\"vendor\":\"\",\"date\":\"YYYY-MM-DD\",\"total\":0,\"currency\":\"\",\"category\":\"\",\"invoiceNumber\":\"\"}. If a field is missing, use empty string or 0.",
      "=Invoice text:\n{{$json.body.text}}");
    const parse = N(wf, "Parse JSON", "n8n-nodes-base.code", 2, {
      jsCode: "let o={}; try{o=JSON.parse($json.output)}catch(e){o={vendor:'',date:'',total:0,currency:'',category:'',invoiceNumber:'',raw:$json.output}} return [{json:o}];",
    }, 760, 300);
    const log = N(wf, "Log to Accounting Sheet", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "append",
      documentId: { __rl: true, value: "={{$env.ACCOUNTING_SHEET_ID || $env.LOADOUT_LOG_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Invoices", mode: "name" },
      columns: { mappingMode: "autoMapInputData", value: {} }, options: {},
    }, 1000, 300, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const conn = merge([
      connect(["Invoice In (Webhook)", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Parse JSON", "Log to Accounting Sheet"]),
    ]);
    wfs.push(workflow("E21 — Invoice & Receipt Processor (AI)", [trig, ...ai.nodes, parse, log], conn));
  }

  // E22 — Document & Contract Summarizer (AI)
  {
    const wf = "e/doc-summarizer";
    const trig = N(wf, "Document (Webhook)", "n8n-nodes-base.webhook", 2,
      { httpMethod: "POST", path: "loadout-summarize-doc", responseMode: "lastNode" }, 220, 300, { webhookId: true });
    const ai = aiAgent(wf, 460, 300,
      "=You summarise documents/contracts for a busy owner. Output: a 3-bullet TL;DR, then KEY TERMS (parties, obligations, payment), then IMPORTANT DATES (with the date), then any RISKS to check with a professional. Plain English.",
      "=Document:\n{{$json.body.text}}");
    const mail = notifyOwnerEmail(wf, "Email Summary", 760, 300,
      "Document summary ready",
      "={{$json.output}}\n\n(Not legal advice — check anything important with a professional.)");
    const log = logRun(wf, 980, 300);
    const conn = merge([
      connect(["Document (Webhook)", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Email Summary", "Log Run"]),
    ]);
    wfs.push(workflow("E22 — Document & Contract Summarizer (AI)", [trig, ...ai.nodes, mail, log], conn));
  }

  // E23 — Meeting Notes & Action Items (AI)
  {
    const wf = "e/meeting-notes";
    const trig = N(wf, "Transcript (Webhook)", "n8n-nodes-base.webhook", 2,
      { httpMethod: "POST", path: "loadout-meeting-notes", responseMode: "lastNode" }, 220, 300, { webhookId: true });
    const ai = aiAgent(wf, 460, 300,
      "=You turn a meeting transcript into: a short SUMMARY, DECISIONS made, and ACTION ITEMS as a checklist with owner + due date where stated. Plain English, scannable.",
      "=Transcript:\n{{$json.body.transcript}}");
    const mail = notifyOwnerEmail(wf, "Email Notes", 760, 300,
      "Meeting notes & action items",
      "={{$json.output}}");
    const log = logRun(wf, 980, 300);
    const conn = merge([
      connect(["Transcript (Webhook)", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Email Notes", "Log Run"]),
    ]);
    wfs.push(workflow("E23 — Meeting Notes & Action Items (AI)", [trig, ...ai.nodes, mail, log], conn));
  }

  // E24 — CRM Hygiene Bot
  {
    const wf = "e/crm-hygiene";
    const trig = N(wf, "Nightly 1am", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "hours", triggerAtHour: 1 }] } }, 220, 300);
    const read = N(wf, "Read Leads", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "read",
      documentId: { __rl: true, value: "={{$env.CRM_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Leads", mode: "name" }, options: {},
    }, 440, 300, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const clean = N(wf, "Dedupe & Flag Gaps", "n8n-nodes-base.code", 2, {
      jsCode:
        "const rows=items.map(i=>i.json); const seen=new Set(); let dups=0; const gaps=[];\n" +
        "for(const r of rows){ const key=(r.email||'').toLowerCase(); if(key&&seen.has(key)){dups++;continue;} if(key)seen.add(key);\n" +
        "  if(!r.name||!r.phone) gaps.push(r.email||'(no email)'); }\n" +
        "return [{json:{total:rows.length, duplicates:dups, missingFields:gaps.length, gapList:gaps.slice(0,20).join(', ')}}];",
    }, 660, 300);
    const mail = notifyOwnerEmail(wf, "CRM Hygiene Report", 880, 300,
      "=CRM hygiene — {{$json.duplicates}} dupes, {{$json.missingFields}} gaps",
      "=Nightly CRM check:\nRecords: {{$json.total}}\nDuplicates: {{$json.duplicates}}\nMissing fields: {{$json.missingFields}}\n\nNeeds attention: {{$json.gapList}}");
    wfs.push(workflow("E24 — CRM Hygiene Bot",
      [trig, read, clean, mail],
      connect(["Nightly 1am", "Read Leads", "Dedupe & Flag Gaps", "CRM Hygiene Report"])));
  }

  // E25 — Scheduled Data Backup & Sync
  {
    const wf = "e/backup";
    const trig = N(wf, "Nightly 2am", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "hours", triggerAtHour: 2 }] } }, 220, 300);
    const read = N(wf, "Read Leads", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "read",
      documentId: { __rl: true, value: "={{$env.CRM_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Leads", mode: "name" }, options: {},
    }, 440, 300, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const snap = N(wf, "Build Snapshot", "n8n-nodes-base.code", 2, {
      jsCode: "const rows=items.map(i=>i.json); return rows.map(r=>({json:{...r, backupAt:new Date().toISOString()}}));",
    }, 660, 300);
    const write = N(wf, "Write Backup Tab", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "append",
      documentId: { __rl: true, value: "={{$env.LOADOUT_LOG_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Backup", mode: "name" },
      columns: { mappingMode: "autoMapInputData", value: {} }, options: {},
    }, 880, 300, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    wfs.push(workflow("E25 — Scheduled Data Backup & Sync",
      [trig, read, snap, write],
      connect(["Nightly 2am", "Read Leads", "Build Snapshot", "Write Backup Tab"])));
  }

  // E26 — Internal Approval Router
  {
    const wf = "e/approval-router";
    const trig = N(wf, "Approval Request (Webhook)", "n8n-nodes-base.webhook", 2,
      { httpMethod: "POST", path: "loadout-approval", responseMode: "lastNode" }, 220, 300, { webhookId: true });
    const route = N(wf, "Route by Type", "n8n-nodes-base.code", 2, {
      jsCode:
        "const b=$json.body||{}; const type=(b.type||'other').toLowerCase();\n" +
        "const map={expense:'FINANCE_APPROVER', content:'MARKETING_APPROVER', timeoff:'HR_APPROVER'};\n" +
        "const approverEnv=map[type]||'OWNER_EMAIL';\n" +
        "return [{json:{...b, type, approverEnv}}];",
    }, 460, 300);
    const slack = N(wf, "Notify Approver", "n8n-nodes-base.slack", 2.3, {
      resource: "message", operation: "post", select: "channel",
      channelId: { __rl: true, value: "={{$env.SLACK_ALERT_CHANNEL}}", mode: "id" },
      text: "=:inbox_tray: *Approval needed* ({{$json.type}}) from {{$json.requester}}: {{$json.detail}}\nApprover group: {{$json.approverEnv}}",
      otherOptions: {},
    }, 700, 220, { credentials: CRED.slack, onError: "continueRegularOutput" });
    const log = N(wf, "Log Decision Queue", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "append",
      documentId: { __rl: true, value: "={{$env.LOADOUT_LOG_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Approvals", mode: "name" },
      columns: { mappingMode: "autoMapInputData", value: {} }, options: {},
    }, 700, 380, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const conn = connect([], [
      { from: "Approval Request (Webhook)", to: "Route by Type" },
      { from: "Route by Type", to: "Notify Approver" },
      { from: "Route by Type", to: "Log Decision Queue" },
    ]);
    wfs.push(workflow("E26 — Internal Approval Router", [trig, route, slack, log], conn));
  }

  return wfs;
}

// ============================================================================
// DEPT F — Intelligence & Owner Cockpit (4)
// ============================================================================
function buildIntelligence() {
  const wfs = [];

  // helper: deliver via email OR slack based on $env.REPORT_CHANNEL
  const deliver = (wf, x, y, subject, slackPrefix) => {
    const gate = N(wf, "Email or Slack?", "n8n-nodes-base.if", 2, {
      conditions: { options: { caseSensitive: false, version: 2 }, combinator: "and", conditions: [
        { id: id(wf + "/d"), leftValue: "={{$env.REPORT_CHANNEL}}", rightValue: "slack", operator: { type: "string", operation: "equals" } },
      ] },
    }, x, y);
    const slack = N(wf, "Report (Slack)", "n8n-nodes-base.slack", 2.3, {
      resource: "message", operation: "post", select: "channel",
      channelId: { __rl: true, value: "={{$env.SLACK_ALERT_CHANNEL}}", mode: "id" },
      text: "=" + slackPrefix + "\n{{$json.output || $json.report}}", otherOptions: {},
    }, x + 240, y - 80, { credentials: CRED.slack, onError: "continueRegularOutput" });
    const mail = notifyOwnerEmail(wf, "Report (Email)", x + 240, y + 80, subject, "={{$json.output || $json.report}}");
    return { nodes: [gate, slack, mail], gateName: "Email or Slack?",
      conn: connect([], [
        { from: "Email or Slack?", to: "Report (Slack)", outputIndex: 0 },
        { from: "Email or Slack?", to: "Report (Email)", outputIndex: 1 },
      ]) };
  };

  // F27 — Daily Business Digest
  {
    const wf = "f/daily-digest";
    const trig = N(wf, "Daily 6:30am", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "hours", triggerAtHour: 6 }] } }, 200, 300);
    const read = N(wf, "Read Metrics", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "read",
      documentId: { __rl: true, value: "={{$env.LOADOUT_LOG_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Metrics", mode: "name" }, options: {},
    }, 420, 300, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const gather = N(wf, "Gather Numbers", "n8n-nodes-base.code", 2, {
      jsCode: "const rows=items.map(i=>i.json); const last=rows[rows.length-1]||{}; return [{json:{numbers:JSON.stringify(last)}}];",
    }, 640, 300);
    const ai = aiAgent(wf, 860, 300,
      "=You write the overnight business digest for the owner of {{$env.BUSINESS_NAME}}. Turn the numbers into a short, plain-English morning brief: yesterday's headline numbers, anything notable, and one suggested focus for today. Under 150 words.",
      "=Latest numbers (JSON): {{$json.numbers}}");
    const d = deliver(wf, 1160, 300, "Your morning business digest", ":sunrise: *Morning digest — " + "{{$env.BUSINESS_NAME}}*");
    const conn = merge([
      connect(["Daily 6:30am", "Read Metrics", "Gather Numbers", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, d.gateName]),
      d.conn,
    ]);
    wfs.push(workflow("F27 — Daily Business Digest", [trig, read, gather, ...ai.nodes, ...d.nodes], conn));
  }

  // F28 — Weekly Performance Briefing (Mon 8am)
  {
    const wf = "f/weekly-briefing";
    const trig = N(wf, "Monday 8am", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "weeks", triggerAtDay: [1], triggerAtHour: 8 }] } }, 200, 300);
    const read = N(wf, "Read Metrics", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "read",
      documentId: { __rl: true, value: "={{$env.LOADOUT_LOG_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Metrics", mode: "name" }, options: {},
    }, 420, 300, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const week = N(wf, "Week Window", "n8n-nodes-base.code", 2, {
      jsCode: "const since=Date.now()-7*86400000; const rows=items.map(i=>i.json).filter(r=>r.date && Date.parse(r.date)>=since); return [{json:{week:JSON.stringify(rows)}}];",
    }, 640, 300);
    const ai = aiAgent(wf, 860, 300,
      "=You write the Monday weekly performance briefing for {{$env.BUSINESS_NAME}}: sales, marketing and support. Compare to the prior week if data allows, call out wins and risks, and give 2 recommended actions. Scannable, under 250 words.",
      "=This week's metric rows (JSON): {{$json.week}}");
    const d = deliver(wf, 1160, 300, "Weekly performance briefing", ":bar_chart: *Weekly briefing — " + "{{$env.BUSINESS_NAME}}*");
    const conn = merge([
      connect(["Monday 8am", "Read Metrics", "Week Window", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, d.gateName]),
      d.conn,
    ]);
    wfs.push(workflow("F28 — Weekly Performance Briefing", [trig, read, week, ...ai.nodes, ...d.nodes], conn));
  }

  // F29 — Churn / At-Risk Radar
  {
    const wf = "f/churn-radar";
    const trig = N(wf, "Daily 5am", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "hours", triggerAtHour: 5 }] } }, 200, 300);
    const read = N(wf, "Read Customers", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "read",
      documentId: { __rl: true, value: "={{$env.CRM_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Customers", mode: "name" }, options: {},
    }, 420, 300, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const risk = N(wf, "Detect At-Risk", "n8n-nodes-base.code", 2, {
      jsCode:
        "const now=Date.now(); const days=parseInt($env.CHURN_DORMANT_DAYS||'60',10);\n" +
        "return items.map(i=>i.json).filter(r=>r.lastActivity && r.email && (now-Date.parse(r.lastActivity))/86400000>=days && r.winbackSent!=='yes').map(r=>({json:r}));",
    }, 640, 300);
    const ai = aiAgent(wf, 860, 300,
      "=You write a short win-back email for a lapsing customer of {{$env.BUSINESS_NAME}}. Warm, no guilt, one reason to come back, soft CTA. Under 90 words. Output ONLY the email body.",
      "=Customer {{$json.name}} last active {{$json.lastActivity}}. Write a win-back.");
    const send = N(wf, "Send Win-back", "n8n-nodes-base.gmail", 2.1, {
      sendTo: "={{$('Detect At-Risk').item.json.email}}",
      subject: "=We'd love to see you back at {{$env.BUSINESS_NAME}}",
      message: "={{$json.output}}", options: {},
    }, 1160, 220, { credentials: CRED.gmail, onError: "continueRegularOutput" });
    const log = logRun(wf, 1380, 220);
    const conn = merge([
      connect(["Daily 5am", "Read Customers", "Detect At-Risk", ai.agentName]),
      ai.modelConn,
      connect([ai.agentName, "Send Win-back", "Log Run"]),
    ]);
    wfs.push(workflow("F29 — Churn / At-Risk Radar", [trig, read, risk, ...ai.nodes, send, log], conn));
  }

  // F30 — KPI Watchdog & Alerts
  {
    const wf = "f/kpi-watchdog";
    const trig = N(wf, "Every 2 hours", "n8n-nodes-base.scheduleTrigger", 1.2,
      { rule: { interval: [{ field: "hours", hoursInterval: 2 }] } }, 200, 300);
    const read = N(wf, "Read Metrics", "n8n-nodes-base.googleSheets", 4.5, {
      operation: "read",
      documentId: { __rl: true, value: "={{$env.LOADOUT_LOG_SHEET_ID}}", mode: "id" },
      sheetName: { __rl: true, value: "Metrics", mode: "name" }, options: {},
    }, 420, 300, { credentials: CRED.sheets, onError: "continueRegularOutput" });
    const check = N(wf, "Check Thresholds", "n8n-nodes-base.code", 2, {
      jsCode:
        "const rows=items.map(i=>i.json); const last=rows[rows.length-1]||{};\n" +
        "const alerts=[];\n" +
        "const salesFloor=parseFloat($env.KPI_SALES_FLOOR||'0');\n" +
        "const complaintCeil=parseFloat($env.KPI_COMPLAINT_CEILING||'5');\n" +
        "const spendCeil=parseFloat($env.KPI_SPEND_CEILING||'1000');\n" +
        "if(salesFloor && parseFloat(last.sales||0)<salesFloor) alerts.push(`Sales ${last.sales} below floor ${salesFloor}`);\n" +
        "if(parseFloat(last.complaints||0)>complaintCeil) alerts.push(`Complaints ${last.complaints} above ${complaintCeil}`);\n" +
        "if(parseFloat(last.spend||0)>spendCeil) alerts.push(`Spend ${last.spend} over ${spendCeil}`);\n" +
        "return alerts.length?[{json:{alert:alerts.join('; ')}}]:[];",
    }, 640, 300);
    const slack = N(wf, "KPI Alert (Slack)", "n8n-nodes-base.slack", 2.3, {
      resource: "message", operation: "post", select: "channel",
      channelId: { __rl: true, value: "={{$env.SLACK_ALERT_CHANNEL}}", mode: "id" },
      text: "=:rotating_light: *KPI alert* — {{$json.alert}}", otherOptions: {},
    }, 880, 220, { credentials: CRED.slack, onError: "continueRegularOutput" });
    const mail = notifyOwnerEmail(wf, "KPI Alert (Email)", 880, 380,
      "KPI alert — something moved", "={{$json.alert}}");
    const conn = connect([], [
      { from: "Every 2 hours", to: "Read Metrics" },
      { from: "Read Metrics", to: "Check Thresholds" },
      { from: "Check Thresholds", to: "KPI Alert (Slack)" },
      { from: "Check Thresholds", to: "KPI Alert (Email)" },
    ]);
    wfs.push(workflow("F30 — KPI Watchdog & Alerts", [trig, read, check, slack, mail], conn));
  }

  return wfs;
}

// ---- emit ------------------------------------------------------------------
const FILES = {
  "infra.json": buildInfra(),
  "a_leadgen_sales.json": buildLeadGen(),
  "b_customer_service.json": buildCustomerService(),
  "c_reputation_reviews.json": buildReputation(),
  "d_content_social.json": buildContentSocial(),
  "e_operations_admin.json": buildOperations(),
  "f_intelligence_cockpit.json": buildIntelligence(),
};

let total = 0;
for (const [file, wfs] of Object.entries(FILES)) {
  writeFileSync(join(DIR, file), JSON.stringify(wfs, null, 2) + "\n");
  total += wfs.length;
  console.log(`wrote ${file}  (${wfs.length} workflows)`);
}
console.log(`done — ${total} workflows across ${Object.keys(FILES).length} files`);
