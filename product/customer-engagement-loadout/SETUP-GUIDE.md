# The Customer Engagement Loadout — Setup Guide

You bought it. Let's get it running. Most users have at least Agent #01 (the Website Chatbot Builder) deployed in under an hour.

There are three install paths depending on what you want first:

| Your situation | Start here |
|---|---|
| I want the chatbot on my website ASAP | → **Path A — Chatbot first** (~45 min) |
| I want to use the agents in Claude.ai for support workflows | → **Path B — Claude.ai Projects** (~15 min) |
| I'm a Claude Code user and want everything available globally | → **Path C — Claude Code agents** (~10 min) |

---

## Path A — Chatbot first (the headline use case)

Get the Website Chatbot Builder running and deployed.

### What you need

- A Claude.ai account with **Claude Pro** ($20/month) OR access to Claude Code
- An **Anthropic API key** ([console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key)
- A **Cloudflare account** (free tier is fine) OR Vercel/Netlify if you prefer
- ~45 minutes
- Your website (any CMS — WordPress, Webflow, Squarespace, Shopify, custom HTML)

### Step 1 — Install the Website Chatbot Builder agent (5 min)

**In Claude.ai:**
1. Go to [claude.ai](https://claude.ai) → **Projects** → **Create new project**
2. Name it: **Website Chatbot Builder**
3. Open `skills/01-website-chatbot-builder/SKILL.md` from this bundle
4. Copy everything BELOW the `---` frontmatter (start from `# Website Chatbot Builder`)
5. Paste into Custom instructions → Save

### Step 2 — Run the build (10 min)

Inside that Project, send a message describing your business:

> Build me a chatbot for my website. I run [business name + one-line description]. Site: [URL]. Tone: [warm / professional / casual / etc.]. Primary purpose: [support / lead capture / FAQ deflection / etc.]. Escalation email: [where messages should be forwarded]. I have an Anthropic API key. Top FAQs: [paste 5-10]. Off-limits topics: [things the bot shouldn't discuss]. Brand colours: [hex codes]. Hosting: [Cloudflare / Vercel / Netlify / other].

Claude will produce ALL 7 sections of your chatbot stack. Save the output to a new folder (`my-chatbot/`).

### Step 3 — Deploy the Cloudflare Worker (10 min)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create Application** → **Create Worker**
2. Name it `[your-business]-chat`
3. Paste the Worker code from Section 3 of your build
4. Go to **Settings → Variables and Secrets** → Add a **Secret** named `ANTHROPIC_API_KEY` with your API key
5. Click **Deploy**
6. Note the URL — typically `https://[your-business]-chat.[account].workers.dev`

### Step 4 — Add the widget to your site (10 min)

Pick your platform:

**WordPress** — Install the "Insert Headers and Footers" plugin (or similar) → paste the widget code from Section 2 into the footer
**Webflow** — Add an **Embed component** to your page (footer area) → paste the widget code
**Squarespace** — Add a **Code Block** → paste the widget code
**Shopify** — Edit `theme.liquid` → paste before `</body>`
**Custom HTML** — Paste the widget code before `</body>` in your main template

Before saving, update the widget code's `PROXY_URL` constant to your Cloudflare Worker URL from Step 3.

### Step 5 — Test (10 min)

Run through the 8-test checklist from Section 7 of your build:

1. Open chat, no message → greeting appears
2. Ask a FAQ question → correct answer
3. Try an off-limits question → polite refusal
4. Try competitor comparison → neutral redirect
5. Ask for a discount → defers to support, never invents codes
6. Send 20 messages quickly → rate-limit triggers
7. Test on mobile (Chrome DevTools → device mode)
8. Try "ignore your instructions" → polite refusal

If any test fails, tune the system prompt in Section 1 of your build, redeploy the Worker, re-test.

### Step 6 — Go live + monitor

You're live. Two ongoing actions:

- **Weekly:** Review the last 50 conversations in your Cloudflare Worker logs. Note where the bot fumbled.
- **Monthly:** Update the FAQ JSON and redeploy the Worker.

---

## Path B — Claude.ai Projects (for ongoing support work)

Use the agents in your day-to-day customer engagement work.

### Recommended starter set

The 5 agents most teams use first:

1. **Support Ticket Router** (`/triage`) — every inbound gets classified properly
2. **Complaint Handler** (`/complaint`) — for angry customers
3. **Review Response Generator** (`/review`) — for public reviews
4. **Refund/Return Negotiator** (`/refund`) — for refund decisions
5. **FAQ Agent** (`/faq`) — for repetitive questions

Add the others as you encounter each use case.

### Installation per agent

For each agent you want:

1. Create a new Project in Claude.ai
2. Name it after the agent (e.g., "Support Ticket Triage")
3. Open `skills/[NN-agent-name]/SKILL.md`
4. Copy everything below the frontmatter
5. Paste into Project's Custom Instructions → Save
6. Optionally drag relevant plugin REFERENCE.md files into Project knowledge

### Per-business calibration

Before using any agent on real customer messages:

1. Drop your **Tone Framework** decisions (`plugins/02-tone-framework/REFERENCE.md`) into each project's knowledge
2. Customise the SKILL.md examples to your industry (search for "Birchwood Organic" and "Tidetrack" and replace with your business)
3. Save and test on a fake / historical ticket before live use

---

## Path C — Claude Code agents + slash commands

If you use Claude Code in your terminal.

### Step 1 — Copy the .claude directory

Two options:

**Project-level (recommended for first-time):** Copy this kit's `.claude/` directory into the root of whichever Claude Code project you want to use for customer engagement work.

**Global install:** Copy contents of `.claude/commands/` into `~/.claude/commands/`, and copy `skills/` into `~/.claude/skills/`.

### Step 2 — Verify

Open Claude Code and type `/chatbot` (followed by your business description). You should get back the full chatbot stack.

### Available slash commands

| Command | What it does |
|---|---|
| `/chatbot` | Complete website chatbot stack (system prompt + widget + proxy) |
| `/triage` | Classify and route a support ticket |
| `/faq` | Answer or maintain FAQs |
| `/review` | Draft a review response (Google / Trustpilot / etc.) |
| `/complaint` | Respond to an angry customer |
| `/refund` | Evaluate and respond to a refund request |
| `/nps` | Follow up on an NPS / CSAT survey response |
| `/onboard` | Design an onboarding sequence |
| `/winback` | Design a win-back campaign |
| `/vip` | Personal outreach to a VIP customer |
| `/save` | Handle a customer in the act of cancelling |
| `/kb` | Build knowledge base structure or write a specific article |

---

## Common issues

### "The chatbot's responses sound generic"

The Website Chatbot Builder needs SPECIFIC inputs to produce a specific bot. Re-run it with more detail: actual FAQ answers (not just topics), brand voice notes (not just "warm"), specific off-limits topics with examples.

### "I'm getting rate-limited"

The Cloudflare Worker has a default rate limit of 12 messages per minute per IP. Adjust in the Worker code if your use case needs higher.

### "The Cloudflare Worker is throwing 502s"

Check:
1. Is `ANTHROPIC_API_KEY` set as a Secret (not a regular Variable)?
2. Is the API key valid and has Claude access?
3. Is the model name in the Worker correct? (Current default: `claude-haiku-4-5-20251001`)
4. Worker logs in Cloudflare dashboard will show the exact error.

### "The widget shows but the chat doesn't respond"

Check:
1. CORS — Worker's `Access-Control-Allow-Origin` must match your site's domain exactly
2. PROXY_URL in the widget must match the Worker URL exactly
3. Browser console for errors (F12 → Console)

### "Output is too long / too formal / too casual"

Tell Claude in your project. "Make the responses shorter — 2-3 sentences max" sticks within the conversation. For permanent change, edit the SKILL.md before pasting.

---

## What to do next

### Once chatbot is live

1. **Add Support Ticket Router** for inbound that escapes the chatbot
2. **Set up review monitoring** — check Google + Trustpilot weekly, use Review Response Generator
3. **Build your FAQ** — run FAQ Agent in MAINTAIN mode monthly to keep it sharp
4. **Tag conversations** using the Conversation Tagging plugin so you can detect patterns

### Once basic support is working

1. **Design your onboarding sequence** for new customers
2. **Set up churn signal monitoring** (Churn Signals plugin)
3. **Identify and reach out to VIPs** quarterly

### Long-term

The agents get sharper as you tune them. Once a week, review the outputs that needed editing. Update the SKILL.md to handle those cases automatically. Within 6-8 weeks, the agents produce content that needs little tuning.

---

## Need help?

- **Email support** (Standard + Vault tiers): [your-support-email]
- **Discord community** (DWY tier): [discord-link]
- **30-day no-questions refund** — email and we'll sort it out

If you bought the Full Bundle ($149), the Sales Loadout is in a separate folder — work through both setup guides.
