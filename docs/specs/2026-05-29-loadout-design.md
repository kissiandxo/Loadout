# LOADOUT Auto-Installer — Design (as built)

**Date:** 2026-05-29
**Owner:** Phoenix Jennings
**Status:** Built + verified on Windows; macOS pending real-Mac validation

> Supersedes the earlier draft of this file, which described a heavy n8n bootstrapper. That
> was based on a wrong assumption; see "History" at the bottom.

---

## 1. What this is

LOADOUT is an existing product business (`C:\Users\PhoenixJennings\loadout\`): an Astro sales
site + Claude AI skill **kits** sold via Gumroad. Two kits exist under `product/`:
**sales-loadout** and **customer-engagement-loadout**. Each kit = 12 skills + 12 slash
commands + 8 plugin reference files — **pure Claude artifacts, no runtime/infra**.

This feature adds a **one-command auto-installer bundled inside each kit**, replacing the old
manual ~30-min `SETUP-GUIDE.md`:

> Buyer unzips the kit → opens it in Claude Code → types `/loadout-setup` → Claude installs all
> skills/commands/plugins, verifies them, and reports — in ~2 minutes.

The "done-for-you" is delivered by Claude Code acting as the installer. Scales like a digital
product, feels white-glove.

## 2. Goals / non-goals

**Goals:** near-zero-effort install; Windows + macOS; resilient (staged UX, self-heal,
checkpoint/resume, completion report); manifest-driven so future key-requiring kits slot in;
keep `SETUP-GUIDE.md` as fallback (incl. Claude.ai web path).

**Non-goals:** Node/Docker/n8n bootstrap (that's the separate n8n-pack product); public
marketplace + license server (kit zips are already behind Gumroad's paywall); creating buyers'
third-party accounts.

## 3. How install works

Kit slash commands reference skills by **relative** path (`@skills/NN-name/SKILL.md`).
Therefore:
- **Project install (default):** copy `skills/`, `plugins/`, `.claude/commands/` into the
  buyer's chosen project folder. Relative refs stay valid — no rewriting.
- **Global install (`~/.claude`):** copy to `~/.claude/{skills,commands,loadout-plugins}` and
  rewrite `@skills/...` → absolute paths.

State + logs: `~/loadout/<kit>/.setup-state.json` + `logs/` (enables resume).

## 4. Files added per kit

```
product/<kit>/
├── INSTALL.md                          # the "give this to Claude Code" file
├── install/
│   ├── installer-agent.md              # orchestrator brain (staged UX, self-heal, maintenance)
│   ├── install.ps1                     # Windows installer (deterministic, ASCII-only)
│   ├── install.sh                      # macOS/Linux installer
│   └── manifest.json                   # components, expected counts, sampleCommand, requiredKeys
└── .claude/commands/loadout-setup.md   # /loadout-setup -> runs the installer
```

`pack-product.ps1` `$Include` updated in both kits to ship `INSTALL.md` + `install/` (and the
new command rides along in `.claude/`). The `Scan-PersonalDataLeaks` gate still runs.

## 5. Installer behaviour (manifest-driven, generic)

Scripts read `install/manifest.json`; no kit-specific logic in the scripts. Stages shown to
buyer: `[1/5] Check → [2/5] Choose target → [3/5] Install → [4/5] Keys → [5/5] Verify`.

- **Keys (`requiredKeys`):** `[]` for both current kits → step is a no-op ("runs on the Claude
  you already have"). Future kits declaring keys trigger one-at-a-time manual collection +
  live validation, with an **optional Chrome express** path (extract-or-create via the Claude
  in Chrome extension) that always falls back to manual. *(Not built yet — groundwork only.)*
- **Verify:** counts >= expected, sample command present; writes `verifyOk` + `status`
  (`completed` / `incomplete` / `completed-with-errors`).
- **Self-heal:** missing source → warn + continue (no crash); script emits a machine-readable
  block `[LOADOUT-RESULT]{json}[/LOADOUT-RESULT]` the agent parses for an accurate report.

## 6. Verification status

Verified on Windows:
- Project mode: 12/12/8, `verifyOk:true`, relative refs preserved.
- Global mode: 12 command refs rewritten to absolute.
- Self-heal: missing skills source → `incomplete`, exit 1, no crash.
- End-to-end from shipped `the-sales-loadout-v1.zip`: extract → run bundled installer →
  `/follow-up` present.
- Both packagers re-run clean (leak scan passed); Astro site builds (4 pages) and the updated
  setup section renders.

Pending: run `install.sh` on a real Mac.

## 7. Pricing / distribution (unchanged)

Gumroad: $97 / $144 +Vault / $149 bundle / $497 Done-With-You. Launch steps in
`LAUNCH-CHECKLIST.md`. Upload the **re-packed** zips.

## 8. History (why this doc was rewritten)

The first draft assumed LOADOUT was a from-scratch n8n bootstrapper (install Node/Docker/n8n +
import 30 workflows). On inspecting the repo we found LOADOUT already existed as a near-launch
skill-kit business, and the 30-workflow n8n pack is a *separate* product. Phoenix confirmed the
real intent: buyer buys a kit → gives the file to Claude Code → it sets everything up. The
design was corrected to the kit auto-installer above.
