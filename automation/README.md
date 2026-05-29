# LOADOUT — Automation

## What's here
- **`loadout-daily-post.n8n.json`** — importable n8n workflow. Every morning (8am) it picks the
  day's post from a built-in 30-item bank and **emails it to you to review + post**. No API key,
  no AI cost, can't hallucinate. Ships **inactive** — it does nothing until you import + connect
  Gmail + activate.
- **`content-bank.md`** — the 30 posts in readable form (post by hand or load into a scheduler).
- **`_wf03-social-poster.json`** — only present if pulled; you already own n8n workflow
  **"03 - AI Social Media Poster"** (id `3SxKl4bojg69yK1a`) for true auto-posting later.

> Built as a file because n8n (localhost:5678) was offline. Import it when n8n is running.

## Import + activate (5 min, at the PC)
1. Start n8n (`npx n8n start` or the CLICK-TO-START bat).
2. n8n → **Workflows → Import from File** → pick `loadout-daily-post.n8n.json`.
3. Open the **"Email me the post"** (Gmail) node → connect your Gmail (or swap for an
   **Email Send/SMTP** or **Telegram** node if you prefer).
4. (Optional) change the time in **"Daily 8am"**.
5. Toggle the workflow **Active**. Done — you'll get a post in your inbox each morning.

## Safety
Routes posts **to you for review** — it does NOT auto-publish to Facebook/Instagram. That's
deliberate: nothing goes public without your tap.

## Upgrade to true auto-post (later)
When you want hands-off posting, add a publish step after the Code node:
- **Easiest:** Buffer / Postiz node → schedules to FB + IG.
- **Direct:** Meta Graph API (HTTP Request) → needs a Facebook Page token + IG Business account.
- Or adapt the existing **"03 - AI Social Media Poster"** workflow you already have.
Keep a review step until you trust the output.

## Make posts AI-generated instead of a fixed bank (optional)
Replace the Code node with an HTTP Request to the Anthropic API (or n8n's AI node) using a prompt
seeded from `content-bank.md` angles — so posts are fresh, not rotating. Do this in a fresh
session; keep the email-review step.
