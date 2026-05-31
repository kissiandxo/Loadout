# LOADOUT — Growth Autopilot

**38 automated workers installed into your own n8n in about 15 minutes.**

No code. No subscription. You own it.

---

## What's inside

| Dept | Workers | What they do |
|---|---|---|
| Lead Gen & Sales | 10 | Capture, respond, quote, nurture, book, recover |
| Customer Service | 5 | Chatbot, triage, FAQ, status, onboarding |
| Reputation | 5 | Reviews, replies, complaints, referrals, mentions |
| Content & Social | 7 | Publish, repurpose, blog, newsletter, ad watchers |
| Operations | 7 | Invoices, docs, meetings, CRM, backup, approvals, stock |
| Intelligence | 4 | Daily digest, weekly brief, churn radar, KPI alerts |
| Infra | 4 | Error handler, cost tracker, health digest, kill-switch |

## Setup (~15 min)

1. Have an n8n running (n8n Cloud, or `npx n8n`)
2. `cp config.env.template config.env` then fill in your keys
3. `node install/loadout.mjs setup` — creates credentials
4. Connect Google in your n8n UI (one browser Approve click)
5. `node install/loadout.mjs go` — imports + activates all workers

Full detail: [HANDOVER.md](HANDOVER.md)

## Website add-on

`website-addons/dynamic-discount.html` — paste-in exit-intent discount popup for any site.

## Pricing

- **$149** — full kit, self-hosted, yours forever
- **$497** — Done-With-You setup call included

---

Powered by n8n + Claude (Anthropic API). You supply the running costs (~cents per AI run + your n8n host).
