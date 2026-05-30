# LOADOUT — Growth Autopilot · Installer Playbook (no Docker)

> **For the AI (Claude Code):** This is your runbook. The buyer already runs n8n
> (n8n Cloud, npm, or their own server). You wire LOADOUT into it over the n8n
> REST API — no Docker, no containers. Talk in plain, friendly English. The buyer
> only pastes a couple of keys and clicks "Approve" for Google. Never echo secrets.

## What you need from the buyer
1. **A running n8n** they can reach by URL (e.g. n8n Cloud `https://xxx.app.n8n.cloud`, or `http://their-server:5678`).
2. **An n8n API key** — in their n8n: **Settings → n8n API → Create an API key.**
3. **An Anthropic API key** (console.anthropic.com) — powers the AI workers. Pay-per-use.
4. Optional accounts for the workers they enable (Google, Slack, Twilio, image gen, etc).

## Steps
```
cp config.env.template config.env          # then fill it in (walk them through it)
node install/loadout.mjs doctor            # checks config + reaches their n8n
node install/loadout.mjs setup             # doctor + creates credentials
#   -> connect Google in the n8n UI when prompted (Credentials -> Connect -> Approve)
node install/loadout.mjs go                # import + activate + verify
```

What each does:
- **doctor** — confirms config.env is filled and the n8n API key works; prints running costs (get a yes).
- **setup** — creates API-key credentials (Anthropic/Slack/Twilio) straight from config.env, then lists the Google (OAuth) credentials to connect once in the browser. The credential ids are captured so every worker auto-links.
- **go** — imports/updates all workers + infra (upsert by name, idempotent — safe to re-run), activates them, and prints a verify summary + a live webhook test.

## Verify by running (don't skip)
After `go`, trigger a worker and read the result:
```
curl -X POST <N8N_API_URL>/webhook/loadout-lead-capture \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Lead","email":"test@example.com","source":"verify"}'
```
Check the CRM sheet got a row and the owner got the email. For each worker the buyer
cares about, fire it once with sample data and fix any error before reporting it live.
A worker whose account isn't connected should be skipped with a plain note, not left broken.

## When live — show the buyer their AI staff
Give a plain-English map of the departments (Lead Gen, Service, Reputation, Content,
Operations, Intelligence) + the infra (error handler, cost tracker, health digest,
kill-switch). Then ask: **"What else would you like to automate?"** and build to the
same standard. Pause everything anytime: `node install/loadout.mjs kill`.

## Website add-on (separate from n8n)
`website-addons/dynamic-discount.html` is a paste-in popup for the buyer's **website**
(exit-intent / returning-visitor discount). It's not an n8n worker — install it on
their site per the comments at the top of that file.

## Safety
- Never request, store, or echo passwords. Google connects via its Approve screen.
- Secrets live only in `config.env` (gitignored). Never print, never commit.
- `install/_runtime/` holds a transient credential-id map; it's gitignored.
- Confirm before destructive actions. Work only inside this kit + their n8n.
