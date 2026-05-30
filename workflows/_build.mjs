#!/usr/bin/env node
// LOADOUT — Growth Autopilot · workflow generator (source of truth)
// Emits importable n8n workflow JSON, one file per department, under workflows/.
// Deterministic UUIDs => stable git diffs. Run: `node workflows/_build.mjs`
// Each department file is an ARRAY of workflows (one per "worker") so every worker
// imports as its own n8n workflow and can be enabled/disabled independently.

import { writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DIR = dirname(fileURLToPath(import.meta.url));

// ---- helpers ---------------------------------------------------------------
const id = (seed) => {
  const h = createHash("sha1").update(seed).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`;
};

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

// credential refs (installer creates these from config.env, matching by name)
const CRED = {
  anthropic: { anthropicApi: { id: id("cred/anthropic"), name: "LOADOUT Anthropic" } },
  gmail: { gmailOAuth2: { id: id("cred/gmail"), name: "LOADOUT Gmail" } },
  sheets: { googleSheetsOAuth2Api: { id: id("cred/sheets"), name: "LOADOUT Google Sheets" } },
  slack: { slackApi: { id: id("cred/slack"), name: "LOADOUT Slack" } },
  twilio: { twilioApi: { id: id("cred/twilio"), name: "LOADOUT Twilio" } },
};

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

// ---- emit ------------------------------------------------------------------
const FILES = {
  "infra.json": buildInfra(),
  "a_leadgen_sales.json": buildLeadGen(),
};

let total = 0;
for (const [file, wfs] of Object.entries(FILES)) {
  writeFileSync(join(DIR, file), JSON.stringify(wfs, null, 2) + "\n");
  total += wfs.length;
  console.log(`wrote ${file}  (${wfs.length} workflows)`);
}
console.log(`done — ${total} workflows across ${Object.keys(FILES).length} files`);
