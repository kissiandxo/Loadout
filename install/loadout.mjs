#!/usr/bin/env node
// LOADOUT — Growth Autopilot · installer CLI (API-driven, no Docker)
// Talks to YOUR already-running n8n over its public REST API. You bring an n8n
// (n8n Cloud, npm, or a server you run) + an API key; this wires everything in.
//
//   node install/loadout.mjs doctor     # check config + reach your n8n
//   node install/loadout.mjs creds      # create credentials from config.env
//   node install/loadout.mjs import     # import/upsert all workers + infra
//   node install/loadout.mjs activate   # turn every worker on
//   node install/loadout.mjs verify     # confirm imported + active
//   node install/loadout.mjs setup      # doctor + creds (phase 1)
//   node install/loadout.mjs go         # import + activate + verify (phase 2)
//   node install/loadout.mjs status | kill
//
// SETUP MODEL: API-key creds (Anthropic/Slack/Twilio) are created fully. OAuth
// creds (Google) are created as shells; you click Connect once in the n8n UI —
// the credential id is preserved, so every worker stays linked.

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { CRED_SPEC } from "../workflows/_ids.mjs";

const INSTALL = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(INSTALL);
const RUNTIME = join(INSTALL, "_runtime");
const WF_DIR = join(ROOT, "workflows");
const CREDMAP = join(RUNTIME, "credmap.json");
const log = (m) => console.log(m);

// --- config.env -------------------------------------------------------------
function loadEnv() {
  const p = join(ROOT, "config.env");
  if (!existsSync(p)) { log("x config.env not found. Run: cp config.env.template config.env"); process.exit(1); }
  const env = {};
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    env[m[1]] = v;
  }
  return env;
}
const filled = (env, keys) => keys.every((k) => env[k] && env[k].trim() !== "");

// --- n8n REST helper --------------------------------------------------------
function apiBase(env) {
  if (!filled(env, ["N8N_API_URL", "N8N_API_KEY"])) {
    log("x Set N8N_API_URL and N8N_API_KEY in config.env first.");
    log("  In your n8n: Settings -> n8n API -> Create an API key.");
    process.exit(1);
  }
  return { url: env.N8N_API_URL.replace(/\/$/, ""), key: env.N8N_API_KEY };
}
async function api(env, method, path, body) {
  const { url, key } = apiBase(env);
  const res = await fetch(`${url}/api/v1${path}`, {
    method,
    headers: { "X-N8N-API-KEY": key, "Content-Type": "application/json", accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json; try { json = text ? JSON.parse(text) : {}; } catch { json = { raw: text }; }
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}: ${text.slice(0, 300)}`);
  return json;
}
const loadMap = () => (existsSync(CREDMAP) ? JSON.parse(readFileSync(CREDMAP, "utf8")) : {});
const saveMap = (m) => { if (!existsSync(RUNTIME)) mkdirSync(RUNTIME, { recursive: true }); writeFileSync(CREDMAP, JSON.stringify(m, null, 2)); };

// --- commands ---------------------------------------------------------------
async function doctor() {
  log("LOADOUT — prerequisite check (no Docker; you run n8n)\n");
  log("  ok Node: " + process.version);
  const env = existsSync(join(ROOT, "config.env")) ? loadEnv() : null;
  if (!env) { log("  x config.env missing — cp config.env.template config.env, then fill it."); process.exit(1); }
  const core = ["BUSINESS_NAME", "OWNER_EMAIL", "ANTHROPIC_API_KEY", "N8N_API_URL", "N8N_API_KEY"];
  if (!filled(env, core)) { log("  x fill core vars: " + core.join(", ")); process.exit(1); }
  log("  ok core vars set");
  try { const r = await api(env, "GET", "/workflows?limit=1"); log(`  ok reached your n8n at ${env.N8N_API_URL} (API key valid)`); }
  catch (e) { log("  x could not reach your n8n / API key rejected:\n     " + e.message); process.exit(1); }
  log("\n-- Running costs you pay directly (LOADOUT is one-time) --");
  log("  - Anthropic API: pay-per-use, ~cents per AI run.");
  log("  - Your n8n host (n8n Cloud, a VPS, or a box you keep on).");
  log("  - Optional paid tools you enable (Apollo/Hunter, Twilio, image gen, etc).");
  log("\nok Ready. Next: node install/loadout.mjs setup");
}

async function creds() {
  const env = loadEnv();
  const map = loadMap();
  const oauthPending = [], skipped = [];
  for (const [key, spec] of Object.entries(CRED_SPEC)) {
    if (map[spec.type]) { if (spec.oauth) oauthPending.push(spec.name); continue; } // already created
    if (!filled(env, spec.requires)) { skipped.push(`${spec.name} (missing: ${spec.requires.join(", ")})`); continue; }
    try {
      const created = await api(env, "POST", "/credentials", { name: spec.name, type: spec.type, data: spec.data(env) });
      map[spec.type] = created.id;
      log(`  ok created credential: ${spec.name}`);
      if (spec.oauth) oauthPending.push(spec.name);
    } catch (e) { log(`  x failed to create ${spec.name}: ${e.message}`); }
  }
  saveMap(map);
  if (skipped.length) log("\n  Skipped (no value yet — fine if unused):\n   - " + skipped.join("\n   - "));
  if (oauthPending.length) {
    log("\n-- ONE-TIME CONNECT (in your browser) --------------------------");
    log("  Open your n8n -> Credentials. For each below, open it, click");
    log("  'Connect my account', and Approve. The id is preserved, so workers stay linked:");
    for (const n of oauthPending) log(`   - ${n}`);
  }
  log("\nWhen Google is connected, finish with: node install/loadout.mjs go");
}

async function importWorkflows() {
  const env = loadEnv();
  const map = loadMap();
  if (!Object.keys(map).length) log("  ! no credentials created yet — run `creds` first (workers will import but stay unlinked).");
  const existing = (await api(env, "GET", "/workflows?limit=250")).data || [];
  const byName = new Map(existing.map((w) => [w.name, w.id]));
  const files = readdirSync(WF_DIR).filter((f) => f.endsWith(".json"));
  let count = 0;
  for (const f of files) {
    const wfs = JSON.parse(readFileSync(join(WF_DIR, f), "utf8"));
    for (const w of wfs) {
      // rewrite each node's credential id to the real one this n8n assigned
      for (const node of w.nodes) {
        if (!node.credentials) continue;
        for (const type of Object.keys(node.credentials)) {
          if (map[type]) node.credentials[type] = { id: map[type], name: node.credentials[type].name };
        }
      }
      const payload = { name: w.name, nodes: w.nodes, connections: w.connections, settings: w.settings || { executionOrder: "v1" } };
      try {
        if (byName.has(w.name)) await api(env, "PUT", `/workflows/${byName.get(w.name)}`, payload);
        else { const c = await api(env, "POST", "/workflows", payload); byName.set(w.name, c.id); }
        count++;
      } catch (e) { log(`  x ${w.name}: ${e.message}`); }
    }
    log(`  ok ${f}`);
  }
  log(`ok Imported/updated ${count} workflows (all workers + infra).`);
}

async function activate() {
  const env = loadEnv();
  const list = (await api(env, "GET", "/workflows?limit=250")).data || [];
  let on = 0;
  for (const w of list) {
    if (w.active) { on++; continue; }
    try { await api(env, "POST", `/workflows/${w.id}/activate`); on++; }
    catch (e) { log(`  ! couldn't activate ${w.name}: ${e.message.slice(0, 120)}`); }
  }
  log(`ok ${on}/${list.length} workflows active.`);
}

async function verify() {
  const env = loadEnv();
  const list = (await api(env, "GET", "/workflows?limit=250")).data || [];
  const active = list.filter((w) => w.active).length;
  log(`Workflows in your n8n: ${list.length} (active: ${active})`);
  log("\nTest a live worker (lead capture):");
  log(`  curl -X POST ${env.N8N_API_URL.replace(/\/$/, "")}/webhook/loadout-lead-capture \\`);
  log(`    -H "Content-Type: application/json" \\`);
  log(`    -d '{"name":"Test Lead","email":"test@example.com","source":"verify"}'`);
  log("Then check your CRM sheet + owner email. Fix any worker that errors before relying on it.");
}

async function status() {
  const env = loadEnv();
  const list = (await api(env, "GET", "/workflows?limit=250")).data || [];
  for (const w of list) log(`  [${w.active ? "ON " : "off"}] ${w.name}`);
  log(`\n${list.length} workflows.`);
}

async function kill() {
  const env = loadEnv();
  const list = (await api(env, "GET", "/workflows?limit=250")).data || [];
  for (const w of list) if (w.active) { try { await api(env, "POST", `/workflows/${w.id}/deactivate`); } catch {} }
  log("ok Everything paused. Re-run `activate` to resume.");
}

async function setup() { log("=== LOADOUT setup — phase 1 ===\n"); await doctor(); await creds(); }
async function go() { log("=== LOADOUT setup — phase 2 ===\n"); await importWorkflows(); await activate(); await verify(); log("\nYour AI staff are live. Pause anytime: node install/loadout.mjs kill"); }

const cmd = process.argv[2];
const table = { doctor, creds, import: importWorkflows, activate, verify, setup, go, status, kill };
if (!table[cmd]) { log("Usage: node install/loadout.mjs <doctor|setup|creds|go|import|activate|verify|status|kill>"); process.exit(1); }
table[cmd]().catch((e) => { log("x " + e.message); process.exit(1); });
