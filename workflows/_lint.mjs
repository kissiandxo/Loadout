#!/usr/bin/env node
// Structural linter for generated n8n workflow JSON. Catches the mistakes that
// make n8n reject an import: dup node names/ids, dangling connection targets,
// AI Agent nodes with no language model wired. Run: `node workflows/_lint.mjs`
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DIR = dirname(fileURLToPath(import.meta.url));
const files = readdirSync(DIR).filter((f) => f.endsWith(".json"));
let errs = 0;
const fail = (m) => { console.log("  x " + m); errs++; };

for (const f of files) {
  const wfs = JSON.parse(readFileSync(join(DIR, f), "utf8"));
  if (!Array.isArray(wfs)) { fail(`${f}: top level is not an array`); continue; }
  for (const w of wfs) {
    if (!w.name || !w.nodes || !w.connections) { fail(`${f}: workflow missing name/nodes/connections`); continue; }
    const names = new Set(w.nodes.map((n) => n.name));
    if (names.size !== w.nodes.length) fail(`${w.name}: duplicate node name`);
    const ids = w.nodes.map((n) => n.id);
    if (new Set(ids).size !== ids.length) fail(`${w.name}: duplicate node id`);
    for (const src of Object.keys(w.connections)) {
      if (!names.has(src)) fail(`${w.name}: connection source missing node "${src}"`);
      for (const t of Object.keys(w.connections[src]))
        for (const arr of w.connections[src][t])
          for (const c of arr)
            if (!names.has(c.node)) fail(`${w.name}: connection target missing node "${c.node}"`);
    }
    for (const n of w.nodes)
      if (n.type.endsWith("langchain.agent")) {
        const fed = Object.values(w.connections).some((o) =>
          (o.ai_languageModel || []).some((a) => a.some((c) => c.node === n.name)));
        if (!fed) fail(`${w.name}: AI Agent "${n.name}" has no language model wired`);
      }
  }
  console.log(`checked ${f} (${wfs.length} workflows)`);
}
console.log(errs ? `\nFAIL - ${errs} issue(s)` : "\nPASS - all n8n structural invariants hold");
process.exit(errs ? 1 : 0);
