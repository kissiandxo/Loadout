#!/usr/bin/env node
// LOADOUT — Growth Autopilot · installer CLI
// The buyer's Claude Code runs these subcommands (see install/INSTALL.md).
// Everything is idempotent and reads secrets only from ../config.env.
//
//   node install/loadout.mjs doctor     # check prerequisites + show running cost
//   node install/loadout.mjs up         # start n8n in Docker
//   node install/loadout.mjs creds      # create API-key creds; list OAuth to connect
//   node install/loadout.mjs import     # import all 30 workers + infra
//   node install/loadout.mjs activate   # turn every worker on
//   node install/loadout.mjs verify     # confirm imported + active
//   node install/loadout.mjs status     # show what's running
//   node install/loadout.mjs kill       # pause everything (deactivate all)

import { execSync, execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, rmSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { CRED_SPEC } from "../workflows/_ids.mjs";

const INSTALL = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(INSTALL);
const COMPOSE = join(INSTALL, "docker-compose.yml");
const RUNTIME = join(INSTALL, "_runtime");
const WF_DIR = join(ROOT, "workflows");
const CONTAINER = "loadout-n8n";

const log = (m) => console.log(m);
const sh = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const shCap = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();
const dexec = (args) => execFileSync("docker", ["exec", CONTAINER, ...args], { encoding: "utf8" });

// --- config.env parsing -----------------------------------------------------
function loadEnv() {
  const p = join(ROOT, "config.env");
  if (!existsSync(p)) {
    log("x config.env not found. Copy the template first:\n    cp config.env.template config.env");
    process.exit(1);
  }
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

// --- commands ---------------------------------------------------------------
function doctor() {
  log("LOADOUT - prerequisite check\n");
  let ok = true;
  try { log("  ok Docker: " + shCap("docker --version")); }
  catch { ok = false; log("  x Docker not found. Install Docker Desktop: https://docker.com/get-started"); }
  try { shCap("docker compose version"); log("  ok docker compose available"); }
  catch { ok = false; log("  x docker compose not available (update Docker Desktop)"); }
  log("  ok Node: " + process.version);

  const env = existsSync(join(ROOT, "config.env")) ? loadEnv() : null;
  if (!env) { log("  x config.env missing - copy config.env.template to config.env and fill it in."); ok = false; }
  else {
    const core = ["BUSINESS_NAME", "OWNER_EMAIL", "ANTHROPIC_API_KEY"];
    log(filled(env, core) ? "  ok core vars set (BUSINESS_NAME, OWNER_EMAIL, ANTHROPIC_API_KEY)"
      : "  x fill core vars: BUSINESS_NAME, OWNER_EMAIL, ANTHROPIC_API_KEY");
    if (!filled(env, core)) ok = false;
  }

  log("\n-- Running costs you will pay directly (LOADOUT itself is one-time) --");
  log("  - Anthropic API (powers every AI worker): PAY-PER-USE, ~cents per run.");
  log("  - Always-on host for n8n: ~$5/mo VPS (or free if you leave this machine on).");
  log("  - Optional paid tools you turn on: Apollo/Hunter (cold outreach), Twilio (SMS).");
  log(ok ? "\nok Ready. Next: node install/loadout.mjs up" : "\nx Fix the items above, then re-run doctor.");
  process.exit(ok ? 0 : 1);
}

function up() {
  log("Starting n8n...");
  sh(`docker compose -f "${COMPOSE}" up -d`);
  log("Waiting for n8n to come online...");
  const deadline = Date.now() + 90_000;
  (async () => {
    while (Date.now() < deadline) {
      try {
        const r = await fetch("http://localhost:5678/healthz");
        if (r.ok) { log("ok n8n is up at http://localhost:5678"); return; }
      } catch {}
      await new Promise((s) => setTimeout(s, 3000));
    }
    log("x n8n didn't respond in 90s. Check: docker compose -f install/docker-compose.yml logs");
    process.exit(1);
  })();
}

function creds() {
  const env = loadEnv();
  if (!existsSync(RUNTIME)) mkdirSync(RUNTIME, { recursive: true });
  const toImport = [];
  const oauthPending = [];
  const skipped = [];
  for (const [, spec] of Object.entries(CRED_SPEC)) {
    if (!filled(env, spec.requires)) { skipped.push(`${spec.name} (missing: ${spec.requires.join(", ")})`); continue; }
    toImport.push({ id: spec.id, name: spec.name, type: spec.type, data: spec.data(env) });
    if (spec.oauth) oauthPending.push(spec.name);
  }
  if (!toImport.length) { log("No credentials have values yet. Fill config.env, then re-run."); return; }

  const file = join(RUNTIME, "creds.json");
  writeFileSync(file, JSON.stringify(toImport, null, 2));
  try {
    log(dexec(["n8n", "import:credentials", "--input=/data/creds.json"]));
    log(`ok Imported ${toImport.length} credential(s).`);
  } finally {
    rmSync(file, { force: true }); // never leave secrets on disk
  }

  if (skipped.length) log("\n  Skipped (no value yet - fine if you're not using them):\n   - " + skipped.join("\n   - "));
  if (oauthPending.length) {
    log("\n-- ONE-TIME CONNECT (do this in your browser) --------------------");
    log("  Open http://localhost:5678 -> Credentials. For each below, click it,");
    log("  press 'Connect my account', and Approve on the provider screen:");
    for (const n of oauthPending) log(`   - ${n}`);
    log("  (Editing keeps the credential's id, so all workers stay linked.)");
  }
}

function importWorkflows() {
  const files = readdirSync(WF_DIR).filter((f) => f.endsWith(".json"));
  for (const f of files) {
    log(`Importing ${f}...`);
    log(dexec(["n8n", "import:workflow", `--input=/workflows/${f}`]));
  }
  log(`ok Imported ${files.length} workflow file(s) (all workers + infra).`);
}

function activate() {
  log(dexec(["n8n", "update:workflow", "--all", "--active=true"]));
  log("ok All workers activated.");
}

function verify() {
  const out = dexec(["n8n", "list:workflow"]);
  const lines = out.split(/\r?\n/).filter((l) => l.trim());
  log(out);
  log(`\nok ${lines.length} workflows present in n8n.`);
  log("  Test a live worker now, e.g. lead capture:");
  log(`    curl -X POST http://localhost:5678/webhook/loadout-lead-capture \\`);
  log(`      -H "Content-Type: application/json" \\`);
  log(`      -d '{"name":"Test Lead","email":"test@example.com","source":"verify"}'`);
  log("  Then check your CRM sheet + owner email. Fix any worker that errors before relying on it.");
}

function status() {
  sh(`docker compose -f "${COMPOSE}" ps`);
  try { log("\n" + dexec(["n8n", "list:workflow"])); } catch {}
}

function kill() {
  log(dexec(["n8n", "update:workflow", "--all", "--active=false"]));
  log("ok Everything paused. Re-run `activate` to resume.");
}

const cmd = process.argv[2];
const table = { doctor, up, creds, import: importWorkflows, activate, verify, status, kill };
if (!table[cmd]) {
  log("Usage: node install/loadout.mjs <doctor|up|creds|import|activate|verify|status|kill>");
  process.exit(1);
}
table[cmd]();
