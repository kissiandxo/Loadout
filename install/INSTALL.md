# LOADOUT — Growth Autopilot · Installer Playbook

> **For the AI (Claude Code):** This is your step-by-step runbook. Follow it in
> order. Talk to the owner in plain, friendly English. Never ask them to write
> code or live in the n8n UI — you run the terminal; they only click "Approve" a
> few times. Confirm before anything destructive. Never echo secrets.
>
> The source of truth for *what* to build is `../AUTOPILOT-MASTER-PROMPT.md`.
> This file is *how* to install what's already built in `../workflows/`.

---

## What's in the box

- `../workflows/*.json` — the 30 workers (6 departments) + `infra.json` (error
  handler, cost tracker, health digest, kill-switch). Each worker is its own n8n
  workflow, so any one can be turned on/off without breaking the others.
- `../config.env.template` — every credential, plain-English labels.
- `docker-compose.yml` — runs n8n 24/7.
- `loadout.mjs` — the installer commands you'll run below.

## Requirements (state these to the owner FIRST)

1. **Docker Desktop** — runs n8n continuously.
2. **An Anthropic API key** (console.anthropic.com) — powers the AI workers.
   Pay-per-use, NOT a Claude Pro/Max subscription.
3. **An always-on machine** — n8n must keep running. A laptop that sleeps stops
   every automation. A ~$5/mo VPS is ideal; local Docker is fine for testing.
4. Optional paid tools only if the owner turns those workers on (Apollo/Hunter
   for cold outreach, Twilio for SMS).

If any are missing, help the owner get them before continuing.

---

## Steps

### 1. Fill the credential vault
```
cp config.env.template config.env
```
Walk the owner through `config.env` **one section at a time**. They only need
the values for the workers they want on. Required minimum: `BUSINESS_NAME`,
`OWNER_EMAIL`, `ANTHROPIC_API_KEY`, timezone, and the Google Sheet IDs. Never
paste secrets into chat — they edit the file directly.

### 2. Check prerequisites + show cost
```
node install/loadout.mjs doctor
```
This prints what's installed and the **running costs the owner pays directly**.
Read the cost summary out loud and get a yes before going further.

### 3. Start n8n
```
node install/loadout.mjs up
```
Waits until n8n answers at http://localhost:5678.

### 4. Create credentials
```
node install/loadout.mjs creds
```
This creates the API-key credentials (Anthropic, Slack, Twilio) straight from
`config.env`. It then lists the **OAuth** credentials (Gmail, Google Sheets)
that need a one-time browser "Connect -> Approve". Guide the owner through each:
open http://localhost:5678 -> Credentials -> click the credential -> **Connect my
account** -> Approve. (Editing keeps the credential's id, so workers stay linked.)

### 5. Import the workers
```
node install/loadout.mjs import
```
Imports all 30 workers + infra. Because credential ids match, every node links
to the right credential automatically.

### 6. Activate everything
```
node install/loadout.mjs activate
```

### 7. Verify by running (do NOT skip — this is the real test)
```
node install/loadout.mjs verify
```
Then actually exercise a worker and read the result. Example (lead capture):
```
curl -X POST http://localhost:5678/webhook/loadout-lead-capture \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Lead","email":"test@example.com","source":"verify"}'
```
Check the CRM sheet got a row and the owner got the notification email. For each
worker the owner cares about, trigger it once with sample data and **fix any
error before reporting it live.** A worker whose account isn't connected should
be skipped with a plain note, not left broken.

---

## When it's live — show the owner their AI staff

Give them a plain-English map, e.g.:

> **Your LOADOUT staff are on duty.**
> **Lead Gen & Sales** — capture every enquiry, reply in minutes, quote, follow up, book.
> **Customer Service** — chatbot, inbox triage, FAQ, status updates, onboarding.
> **Reputation** — ask happy customers for reviews, draft replies, cool down complaints.
> **Content & Social** — repurpose, draft posts (you approve), newsletter, watch competitor ads.
> **Operations** — read invoices, summarise docs, meeting notes, tidy your CRM, nightly backup, route approvals.
> **Intelligence** — morning digest, Monday briefing, churn radar, KPI alerts.
>
> Pause everything any time: `node install/loadout.mjs kill` (resume with `activate`).

Then ask: **"What else would you like to automate or add?"** and build it to the
same standard (template from n8n.io/workflows where one fits, Claude AI Agent
node as the brain, error handling on every step, credentials in `config.env`).

---

## Safety rules (always)
- Never request, store, or echo passwords. Account connections use the
  provider's Approve screen only.
- Secrets live only in `config.env` (gitignored). Never print them, never commit.
- Confirm before destructive actions (overwriting n8n data, freeing a port, deleting).
- Work only inside this kit and n8n. Touch nothing else on the machine.
