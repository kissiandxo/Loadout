# LOADOUT — Handover (Option B: you run n8n, no Docker)

**Status: BUILD COMPLETE.** The only remaining step is *your* setup. Nothing else is owed.

## What this is
LOADOUT installs 38 automated "workers" + 4 infra flows into **your own n8n** over its
REST API. No Docker. One-time product; you bring the running costs (Anthropic key, your
n8n host, any paid tools you switch on).

## Set it up (≈15 min)
1. Have an n8n running (n8n Cloud, npm `npx n8n`, or your server). Create an API key:
   **Settings → n8n API → Create an API key.**
2. In this repo:
   ```
   cp config.env.template config.env
   ```
   Fill in (minimum): `BUSINESS_NAME`, `OWNER_EMAIL`, `ANTHROPIC_API_KEY`,
   `N8N_API_URL`, `N8N_API_KEY`, and `GOOGLE_OAUTH_CLIENT_ID/SECRET` + your Sheet IDs.
   Leave the rest blank — only fill what the workers you want need.
3. Run:
   ```
   node install/loadout.mjs doctor
   node install/loadout.mjs setup     # creates credentials
   # connect "LOADOUT Google ..." creds in your n8n UI (Connect -> Approve)
   node install/loadout.mjs go         # import + activate + verify
   ```
4. Test one worker (see INSTALL.md), confirm it works, you're live.

Full detail: `install/INSTALL.md`. Pause everything: `node install/loadout.mjs kill`.

## The 38 workers
- **A Lead Gen & Sales (10):** capture, instant responder, missed-call text-back, quote,
  cold outreach, nurture, appointments, abandoned-cart recovery, upsell, smart calendar.
- **B Service (5):** chatbot, inbox triage, FAQ, status notifier, onboarding.
- **C Reputation (5):** review request, review reply, complaint, referral, brand-mention monitor.
- **D Content (7):** publisher, repurposer, blog, newsletter, Meta ad watcher, IG post
  responder, Google ad watcher.
- **E Operations (7):** invoice, doc summary, meeting notes, CRM hygiene, backup, approvals,
  stock alert.
- **F Intelligence (4):** daily digest, weekly briefing, churn radar, KPI watchdog.
- **Infra (4):** error handler, cost tracker, health digest, kill-switch.

## Website add-on (separate)
`website-addons/dynamic-discount.html` — paste-in exit-intent/returning-visitor discount
popup for your site. Not an n8n worker; install per the file's header comments.

## Defaults chosen for you (no decisions needed)
- Social + competitor + brand-reply workers = **draft/approval by default** (safe). Flip
  `SOCIAL_AUTOPUBLISH=true` to auto-post.
- Image generation, brand-mention feed, Google-ads source, stock source = **pluggable**
  (point the `*_URL`/`*_KEY` envs at your provider). Defaults documented in config.env.template.
- Reporting channel = email (set `REPORT_CHANNEL=slack` to switch).

## Couldn't fully automate (needs you, by nature)
- **Connecting Google** (Gmail/Sheets/Calendar) — OAuth requires your one-time browser Approve.
- **Dynamic-discount popup placement** — depends on your website platform; the snippet is
  ready, but where it pastes differs per site (instructions in the file).
- **Which inventory/source provider** for stock/image/ads — you supply the account + key.

## Known next-session work (not blocking setup)
- Rotate the leaked Lemon Squeezy API key.
- Retire the old car-dealership kits in `product/` + fix storefront refs.
- (Strategic) hosted/MRR tier + automatic setup via Claude cowork.
