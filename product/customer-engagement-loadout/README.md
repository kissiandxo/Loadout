# The Customer Engagement Loadout

12 AI agents + 8 reference plugins for businesses that want owned customer engagement infrastructure — not another SaaS subscription. Includes a complete website chatbot stack (system prompt + embed widget + serverless proxy) that replaces $19-99/month chatbot SaaS.

**Using Claude Code? Skip the manual setup:** open this folder in Claude Code and type **`/loadout-setup`** — Claude installs and verifies everything for you in a couple of minutes. See `INSTALL.md`. (Deploy the live website chatbot afterwards via the Website Chatbot Builder skill.)

---

## What's in this bundle

```
customer-engagement-loadout/
├── README.md                 ← you are here
├── INSTALL.md                 ← fastest start: open in Claude Code, type /loadout-setup
├── install/                   ← the auto-installer (Claude runs this for you)
├── SETUP-GUIDE.md            ← full manual steps (Claude Code + Claude.ai)
├── PROMPT-CHEAT-SHEET.md     ← the magic phrases for each agent
├── VAULT-SCRIPTS.md          ← (Vault tier) 25 battle-tested retention + support scripts
│
├── .claude/                  ← Claude Code install
│   ├── agents/               ← 12 agent definitions
│   └── commands/             ← 12 slash commands
│
├── skills/                   ← Claude.ai Project system prompts
│   ├── 01-website-chatbot-builder/
│   ├── 02-support-ticket-router/
│   ├── 03-faq-agent/
│   ├── 04-review-response-generator/
│   ├── 05-complaint-handler/
│   ├── 06-refund-return-negotiator/
│   ├── 07-nps-csat-followup/
│   ├── 08-onboarding-sequencer/
│   ├── 09-winback-campaign/
│   ├── 10-vip-customer-manager/
│   ├── 11-cancellation-save/
│   └── 12-knowledge-base-builder/
│
├── plugins/                  ← Reference docs (project knowledge)
│   ├── 01-escalation-matrix/
│   ├── 02-tone-framework/
│   ├── 03-retention-psychology/
│   ├── 04-support-sla-framework/
│   ├── 05-review-handling-playbook/
│   ├── 06-churn-signals/
│   ├── 07-onboarding-maps/
│   └── 08-conversation-tagging/
│
└── dfy-templates/            ← 5 done-for-you message templates
```

---

## The 12 agents

| # | Agent | What it does | Slash command |
|---|---|---|---|
| 01 | **Website Chatbot Builder** | Generates a complete chatbot stack: tuned Claude system prompt, embeddable HTML widget, Cloudflare Worker proxy, FAQ ingestion, branding, escalation logic. The headline agent. | `/chatbot` |
| 02 | Support Ticket Router | Classify, prioritise, route, and draft acknowledgement replies for inbound tickets | `/triage` |
| 03 | FAQ Agent | Answer customer questions from your knowledge base OR maintain the FAQ from support ticket patterns | `/faq` |
| 04 | Review Response Generator | Public-facing replies to reviews on Google / Trustpilot / Yelp / App Store / Facebook | `/review` |
| 05 | Complaint Handler | Respond to angry customers without being subservient or defensive | `/complaint` |
| 06 | Refund / Return Negotiator | Evaluate and respond to refund requests — in-policy and edge-case | `/refund` |
| 07 | NPS / CSAT Follow-Up | Tuned follow-ups by segment (Promoter / Passive / Detractor) | `/nps` |
| 08 | Onboarding Sequencer | 5-7 touchpoint onboarding sequence for new customers | `/onboard` |
| 09 | Win-Back Campaign | Re-engage churned customers by churn archetype | `/winback` |
| 10 | VIP Customer Manager | Personal outreach to top customers (revenue / referral / strategic) | `/vip` |
| 11 | Cancellation Save | Handle in-the-act-of-leaving customers with ONE good offer | `/save` |
| 12 | Knowledge Base Builder | Structure or write KB articles by reader intent (Tutorial / Reference / Troubleshooting / Conceptual) | `/kb` |

---

## The 8 plugins (reference docs)

Plugins are knowledge files you load into your Claude project so the agents have richer context. Drop them into your project knowledge.

| Plugin | What it gives Claude |
|---|---|
| Escalation Matrix | 4-level escalation framework + triggers + clean handoff procedure |
| Tone Framework | 4-dimensional voice calibration + 4 brand profile presets + universal banned phrases |
| Retention Psychology | 5 retention drivers, 5 churn drivers, journey moments that matter |
| Support SLA Framework | 4 severity levels, response time targets, public-vs-internal SLA patterns |
| Review Handling Playbook | Platform-specific tactics, soliciting reviews ethically, fake-review handling |
| Churn Signals | S/A/B/C-tier signals + intervention patterns + monitoring system tiers |
| Onboarding Maps | 5 journey templates (SaaS consumer, SaaS B2B, e-com, service, hybrid) |
| Conversation Tagging | 6-dimensional taxonomy + tagging discipline + pattern detection |

---

## The headline feature — Website Chatbot Builder

This is the agent that makes this kit different from anything else.

You input: your business details, top FAQs, brand voice, escalation rules, brand colours.

You get back, ready to deploy:

1. **A tuned Claude system prompt** — captures your voice, knowledge, guardrails
2. **A production-ready embeddable HTML/CSS/JS widget** — floating chat button, expandable panel, mobile-responsive, accessibility built in, ~200 lines of clean code
3. **A 40-line Cloudflare Worker proxy** — keeps your Anthropic API key safe server-side, includes rate limiting
4. **An FAQ JSON ingestion structure** — update once, redeploy the worker, knowledge stays current
5. **CSS branding variables** — change colours, fonts, sizes without touching JavaScript
6. **Platform-specific deployment instructions** — WordPress, Webflow, Squarespace, Shopify, custom HTML
7. **A testing checklist** — 8 scenarios to verify before going live

**Cost comparison** — at typical conversation volume:
- Claude Haiku 4.5 via your API key: ~$1 per 1,000 messages
- Chatbase: $19-99/month
- Tidio: $29-749/month
- Intercom Fin: $0.99 per resolution

At 1,000 chats/month, you save $228-12,000/year vs SaaS — and you own the system, the data, the prompt, and the widget forever.

---

## Start here

1. Read `SETUP-GUIDE.md` (10 min)
2. Install the **Website Chatbot Builder** agent (most setups need this first)
3. Run `/chatbot` with your business info — get back your complete stack
4. Deploy the widget + proxy to your site (15-30 min, instructions included)
5. Add the other 11 agents progressively as you encounter each use case

---

## Pricing tiers (what you bought)

| Tier | Includes |
|---|---|
| **Standard ($97)** | All 12 agents, all 8 plugins, setup guide, prompt cheat sheet, 5 DFY templates |
| **Standard + Vault ($144)** | Everything in Standard + **VAULT-SCRIPTS.md** — 25 additional battle-tested scripts for retention / support / recovery |
| **Done-With-You ($497)** | Everything in Standard + a 60-minute 1-on-1 Zoom call to install + customise the Website Chatbot Builder for your specific business |

If you bought Loadout's Full Bundle ($149), you have BOTH the Sales Loadout and this Customer Engagement Loadout — open both folders, work through both setup guides, install both projects.

---

## License & redistribution

The Standard and Vault tiers are licensed for personal use by one business.

If you want to deploy the Website Chatbot Builder across multiple websites you don't own (agency / consultant work), you need an **Agency licence** — email support to upgrade.

---

## Help + updates

- **Email support** (Standard + Vault + DWY tiers): support@[your-domain]
- **Updates**: you'll get an email when a new version drops
- **30-day refund**: if it doesn't work for you, we'll refund — no hoops

---

Built by people who got tired of paying $99/month for a chatbot that doesn't know their business. Welcome to the kit.
