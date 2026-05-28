---
name: onboarding-sequencer
description: Use this skill to design a 5-7 touchpoint onboarding email / message sequence for new customers — designed to get them to the "aha" moment fast, prevent early churn, and convert first-time buyers into repeat buyers. Triggers on phrases like "build an onboarding sequence for [product]", "draft welcome emails for new customers", "first-time-buyer email flow", "post-purchase email sequence", "new user onboarding messages", "customer journey emails for [business]". Returns: a sequenced flow with timing, channel, message draft, and the specific success metric each touchpoint is designed to move. Tuned to the difference between SaaS (where activation is critical) and e-commerce (where second-purchase is critical).
---

# Onboarding Sequencer

You're building the first 30 days of a new customer's experience. The first 30 days disproportionately determine whether the customer becomes a repeat customer, a churn statistic, or a vocal detractor. Each touchpoint has a job.

## Two patterns by business model

### SaaS / subscription onboarding
- **Goal:** Time-to-first-value. Every day a customer hasn't gotten the "aha" is a day closer to cancellation.
- **Channel mix:** In-app messages + email
- **Cadence:** Front-loaded (Days 0-7 are critical)
- **Success metric:** Activation rate (% of new users who complete the key action) → retention rate at 30/60/90 days

### E-commerce / product onboarding
- **Goal:** Make the buyer love the product, then drive the second purchase
- **Channel mix:** Email + SMS (use sparingly)
- **Cadence:** Distributed (first email immediate, then weekly for 30 days)
- **Success metric:** 30-day repeat purchase rate

The skill works for both — input the model and the sequence calibrates.

## What you need from the user

- **Business type** — SaaS / e-com / physical product / service / mixed
- **What was purchased / signed up for** — specific product/plan
- **The "aha" moment** — what action / experience should the customer have that proves the value (this is the single most important input)
- **Brand voice** — formal / warm / casual / playful
- **Available channels** — email only / email + SMS / email + SMS + in-app
- **Edge data**: when do most new customers churn or stop engaging? (informs where to put the high-leverage touches)
- **Your name + role** for signature

## How to design the sequence

### For SaaS / subscription

5-7 touches across Days 0-14, then a check-in at Day 21 and Day 30. Standard arc:

| Touch | When | Channel | Job |
|---|---|---|---|
| 1 | Immediately on signup | Email + in-app | Welcome + ONE concrete action to take in the next 5 minutes |
| 2 | Day 1 (24h after) | Email | If they haven't done the Day 1 action: nudge. If they have: introduce the next |
| 3 | Day 3 | Email or in-app | Showcase a non-obvious feature most users discover too late |
| 4 | Day 7 | Email | Check-in: "how's it going" with one specific question they can answer in 30 sec |
| 5 | Day 14 | Email | Pro tip or use case from another customer (different industry, same problem) |
| 6 | Day 21 | Email | Soft NPS / "are you getting what you came for" |
| 7 | Day 30 | Email | Plan / cadence-locking: "you're past the riskiest period — here's what regular users do" |

### For e-com / physical product

5 touches across 30 days. Standard arc:

| Touch | When | Channel | Job |
|---|---|---|---|
| 1 | Immediately on order | Email | Order confirmation + thanks + setting expectations on delivery |
| 2 | On dispatch | Email | Tracking + a piece of pre-receipt context (story / how-to-use guide) |
| 3 | 3-5 days after delivery | Email | "How's it going" — short, single question. Designed to surface returns / issues early |
| 4 | Day 14 | Email | Education (how to use, what to combine with, common mistakes) — NOT a sales pitch |
| 5 | Day 25-30 | Email or SMS | Soft second-purchase nudge — calibrated to product usage cycle |

## Tone discipline

- **Don't write welcome emails that say "Welcome to the [business name] family"** — universally cringed at
- **Don't include "follow us on social!" in every touchpoint** — feels needy
- **Don't introduce 5 features in the first email.** ONE action at a time
- **Don't pitch the upsell before delivering the original purchase value**
- **Don't ignore mobile.** Most opens are on mobile, design for scrollable thumb readability
- **Do use the customer's first name** — but not in every paragraph (gets weird)
- **Do sign each one from a real human** — not "[Brand] Team"

## Output format

```
# Onboarding Sequence — [Business] · [Product/Plan] · [SaaS or E-com]
**Aha moment:** [the specific user experience that proves value]
**Sequence goal:** [Activation / Second purchase / Retention to milestone]

---

## Touch 1 — [When] · [Channel]
**Subject** (email only): [line]
**Job:** [the one specific thing this touch is doing]

**Body:**
[the message]

— [Rep name]

---

## Touch 2 — [When] · [Channel]
...
```

End with:

```
**Success metric to track:**
[what you'll measure to know the sequence is working]

**Where to A/B test:**
[the 1-2 subject lines / CTAs most worth experimenting with]

**When to revisit this sequence:**
[trigger event that should prompt a redesign — drop in activation rate, etc.]
```

## Worked example — SaaS

**User input:**
> "Build me an onboarding sequence for new signups to a project management SaaS called Tidetrack. It's $29/mo, used mostly by 5-15-person small agency teams. The 'aha' moment is when a team has created their first project, invited at least 2 teammates, and assigned 3+ tasks across them. Most churn happens between Day 4 and Day 10 — new users who haven't activated by Day 4 rarely activate at all. Brand voice: warm but no-fluff. Channels: email + in-app messages. I'm Jordan."

**Good output:**

# Onboarding Sequence — Tidetrack · $29/mo plan · SaaS
**Aha moment:** First project created + 2+ teammates invited + 3+ tasks assigned across them
**Sequence goal:** Activation by Day 4 (the critical churn cliff)

---

## Touch 1 — Immediately on signup · Email + in-app
**Subject:** Your first 5 minutes with Tidetrack
**Job:** Get them to create one project and assign one task — the absolute minimum first-value action

**Body:**

> Alex,
>
> Welcome — really glad you're here.
>
> Most teams get value out of Tidetrack the moment they put their first project in. Want to do that now? Two clicks:
>
> 1. **Create your first project** → [direct link to "new project" with the user's account in context]
> 2. **Add one task** to it — anything you're working on this week
>
> That's it for now. We'll show you the team-invite step in tomorrow's email — for today, just get one project + one task in.
>
> — Jordan, Founder

**(In-app version, on first dashboard load):**

> "Welcome — let's get one project in. Click 'New Project' to start. Should take 60 seconds."

---

## Touch 2 — Day 1 (24h after signup) · Email
**Subject:** [If activated] You're set — here's the next layer  /  [If not] Quick prompt: your first project?
**Job:** Branch based on activation status. Move active users forward, re-engage stalled users.

**Body (if Touch 1 action completed):**

> Alex,
>
> Saw you got your first project in — nice. The next thing most teams find shifts how they use Tidetrack: inviting your team.
>
> Tidetrack is built for shared work, not solo. Invite 2 teammates in the next 24 hours and you'll start seeing the activity stream populate (the bit our users say keeps them logging in).
>
> Invite teammates → [link]
>
> — Jordan

**Body (if Touch 1 action NOT completed):**

> Alex,
>
> Quick check — was anything blocking you from creating your first project yesterday? Confusing UI, missing feature, or just busy?
>
> If it's the first two, I want to know. If it's the third, no worries — when you've got 60 seconds, just one project to start. Even a junk project to test the interface counts.
>
> → [direct link to create first project]
>
> — Jordan

---

## Touch 3 — Day 3 · In-app
**Job:** Surface the non-obvious feature most new users discover too late: keyboard shortcuts + bulk task creation.

**(In-app notification triggered on next dashboard load after Day 3):**

> "Quick tip from a 5-person team using Tidetrack daily: select multiple tasks (cmd-click or shift-click), then press 'A' to bulk-assign. Saves about 30 seconds per planning session. Press '?' anywhere in Tidetrack to see all shortcuts."

---

## Touch 4 — Day 7 · Email
**Subject:** One week in — how's it landing?
**Job:** Diagnose. Get honest signal on what's working and what isn't.

**Body:**

> Alex,
>
> One week in — how's Tidetrack actually working for you and the team?
>
> Asking honestly. Reply with even half a sentence:
>
> - "Great, sticking with it" → I'll leave you alone
> - "Frustrated by X" → tell me what X is and I'll see what I can do
> - "Not for us" → also fine, want to hear why
>
> No survey, no scoring system. Just a reply.
>
> — Jordan, Founder

---

## Touch 5 — Day 14 · Email
**Subject:** How [different small agency] uses Tidetrack
**Job:** Show a real customer use case from a similar-sized team — concrete pattern they might steal.

**Body:**

> Alex,
>
> Two weeks in. Wanted to share how one of our customers — Hue & Vista, a 7-person design agency in Sydney — uses Tidetrack day-to-day.
>
> Their pattern:
> - Monday standup: one shared "Week of [date]" project; each person adds 2-3 tasks
> - Tasks tagged by client (so the dashboard filters by client cleanly)
> - End-of-week review pulled directly from the "Done this week" filter
>
> Takes them about 6 hours/week of admin off the table.
>
> Not saying you need to copy their setup — most teams find their own pattern — but if you haven't landed on yours yet, the "tag by client" pattern is worth trying. Most teams I've seen miss it.
>
> — Jordan

---

## Touch 6 — Day 21 · Email
**Subject:** Honest question — is Tidetrack pulling its weight?
**Job:** Soft NPS check disguised as a personal question.

**Body:**

> Alex,
>
> Honest question — three weeks in, is Tidetrack pulling its weight at $29/mo, or are you on the fence?
>
> If on the fence, just reply "on the fence" and I'll send a quick option list:
> 1. The one thing most teams who stay long-term started doing in week 4
> 2. The Pro features that unlock if you're feeling capped
> 3. The honest "maybe this isn't right for you" conversation
>
> If it's working well, no need to reply — I'll leave you alone to do the work.
>
> — Jordan

---

## Touch 7 — Day 30 · Email
**Subject:** Past the riskiest stretch — here's what regular users do
**Job:** Lock in cadence. Provide the "graduation" framing that signals they're a real customer now.

**Body:**

> Alex,
>
> 30 days in.
>
> The first 30 days are when most new SaaS tools either click or get abandoned. You've made it through. The teams who stick long-term tend to have these three habits by month 2:
>
> 1. **Weekly review ritual** — 15-min Friday review of "what shipped, what's stuck, what's next"
> 2. **One automation set up** — even something small, like an integration with Slack for task reminders
> 3. **Templates** — recurring project types saved as templates so new projects spin up in 30 seconds
>
> All three are 10-minute setups. Worth doing? Genuinely — measurable difference in long-term retention.
>
> Either way, glad you're here. Reply any time.
>
> — Jordan, Founder

---

**Success metric to track:** % of new signups who hit the "aha" criteria (1 project + 2+ teammates + 3+ tasks) by Day 4. Target: 60%+ for a healthy onboarding.

**Where to A/B test:**
- Touch 1 subject line ("Your first 5 minutes" vs "Welcome to Tidetrack — start here") — clarity-vs-warmth tradeoff
- Touch 4 length (current = short, alternative = even shorter; both vs longer "what features are you using?" version)

**When to revisit this sequence:**
- Activation rate drops below 50%
- Product changes meaningfully (new flagship feature, pricing change, repositioning)
- Quarterly minimum, even if metrics are healthy

---

## Worked example — E-commerce

(Same shape, condensed for brevity)

**User input:**
> "Onboarding for Birchwood Organic — new first-time customer of Bloom Serum. Brand voice warm/knowledgeable, no medical claims, no fluff. Channels email only. I'm Alex."

**Touch 1 — Immediately on order — Email**
**Subject:** Thanks — and here's what's coming next
**Body:**
> Mira, thanks for the Bloom Serum order. Quick rundown of what happens next:
> - Tracking link will land in your inbox the moment we dispatch (usually within 24h)
> - Delivery: 2-3 business days metro, 3-5 regional
> - Before you start using it: I'll send a quick "how to actually use this" note when it ships — vitamin C serums work best with a specific routine
>
> Excited for you to try it. Any questions before it arrives, just reply.
>
> — Alex, Birchwood

**Touch 2 — On dispatch — Email**
**Subject:** On its way + how to use it on day one
**Body:** [Brief usage instructions + ingredient context + what NOT to mix it with]

**Touch 3 — 4 days after delivery — Email**
**Subject:** First impressions?
**Body:** Short. One question. "How's it landing? Any questions or any thoughts on the texture / scent / how it feels on the skin?" — diagnostic for early issues.

**Touch 4 — Day 14 — Email**
**Subject:** Two weeks in — what to look for now
**Body:** Set realistic expectations. "Vitamin C serums take 4-6 weeks for full glow — you might be noticing small differences by now (brightness, even tone). The bigger shift comes in weeks 3-4. Stick with it."

**Touch 5 — Day 28 — Email**
**Subject:** Bottle almost done?
**Body:** "A 30ml Bloom Serum lasts about 30-35 days with daily use. If you're running low and want to reorder, here's a one-click reorder link — same address, same payment. No code, no nudge, just easy: [link]"

---

## Common edge cases

- **Customer abandoned during signup** — don't send the full sequence. Send a single "you started signing up but didn't finish — anything blocking you?" email
- **Customer ordered as a gift for someone else** — split: short note to the purchaser, the rest of the sequence to the recipient
- **Customer is reordering a product they've bought before** — skip the onboarding sequence entirely. They know how to use it
- **Customer signed up but never engaged in the first 7 days** — sequence pauses at Touch 4 and switches to "are you still interested?" reactivation
- **B2B customer with multiple seats / accounts** — sequence targets the admin / champion, not every seat

## What NOT to do

- **Don't send all 7 emails regardless of engagement.** Adapt based on user behaviour
- **Don't pitch the upsell in the first 3 touches** for e-com, first 5 for SaaS
- **Don't put the unsubscribe link as the only CTA in the footer.** Make it visible but not the only call
- **Don't send touches at 3am their local time.** Use the signup timezone if known
- **Don't write welcome emails that read like marketing flyers.** Plain, signed by a real human
- **Don't promise features you don't have yet** to get them through onboarding — they'll churn when they discover the gap
