---
name: winback-campaign
description: Use this skill to design a win-back campaign for customers who have churned (cancelled, stopped engaging, didn't reorder). Triggers on phrases like "build a win-back campaign for [segment]", "draft an email to lapsed customers", "we lost a bunch of customers last quarter — what do I send", "re-engagement sequence for dormant users", "win back churned subscribers", "lapsed customer email flow". Returns: a segmented 3-4 touch sequence with messaging tuned to WHY they churned (price, fit, neglect, competitor switch, life circumstance), plus the eligibility criteria for who should receive which path. Honest by design — no fake urgency, no "we miss you" sob-stories.
---

# Win-Back Campaign

You're designing a campaign to re-engage churned customers. Most win-back emails fail for one of two reasons: (1) they treat all churned customers identically when the reasons for churning are different, or (2) they lean on emotional manipulation ("we miss you!") that adults see through.

The good ones segment by WHY the customer left, then speak to the actual barrier.

## What you need from the user

- **Customer segment** — who's the target? (cancelled subscribers / one-time buyers who didn't reorder / inactive accounts / etc.)
- **Time since churn** — when did they stop? (matters: 30-day-churned ≠ 12-month-churned)
- **Churn reason if known** — from exit surveys, support tickets, or signals
- **What's changed since they left** — new product, better pricing, fixed pain point — anything genuine
- **Available offer** — discount / free month / no-commitment trial / nothing (sometimes nothing is the right answer)
- **Brand voice + your name**

If no churn-reason data, recommend running the campaign as a "diagnostic + offer" hybrid that surfaces the reason while making the ask.

## The 5 churn archetypes — each gets a different message

### Archetype 1 — Price churn
**Signal:** Cancelled around a renewal date, mentioned price in exit feedback, or downgraded then cancelled.
**Win-back angle:** Lower-priced tier, or genuine reason the price represents the value.
**Don't:** Drop the price without acknowledging it's a price-driven decision.

### Archetype 2 — Fit churn
**Signal:** Cancelled within 30-60 days of signup, never reached "aha" moment, low usage history.
**Win-back angle:** Different product / use case. They weren't wrong, you weren't wrong, the fit wasn't there.
**Don't:** Pretend they were a power user. They weren't.

### Archetype 3 — Neglect churn
**Signal:** Cancelled after months of declining usage. Was a customer for a while, stopped engaging, eventually cancelled.
**Win-back angle:** Re-engagement around a NEW reason to come back — new feature, new use case, change in their world that makes you relevant again.
**Don't:** "We've missed you" — they didn't miss you back.

### Archetype 4 — Competitor switch churn
**Signal:** Mentioned a competitor in exit feedback, or churned around a known competitor launch / promotion.
**Win-back angle:** Acknowledge the switch openly, ask what they're seeing at the competitor, offer to revisit when timing is right.
**Don't:** Bash the competitor.

### Archetype 5 — Life circumstance churn
**Signal:** Job change, baby, moved, business closed, health, etc. — mentioned in exit feedback or known from prior comms.
**Win-back angle:** Long-arc check-in, no offer attached, just a "if things shift" note.
**Don't:** Push for re-engagement before they're ready.

## The 4-touch campaign structure

Regardless of archetype, the structure is similar:

| Touch | Timing | Channel | Job |
|---|---|---|---|
| 1 | Day 0 of campaign | Email | Open with honesty about the gap, name the archetype-specific reason if known, soft ask |
| 2 | Day 5 | Email | Provide something useful unconditionally (new feature explainer, a relevant insight, a no-strings credit if applicable) |
| 3 | Day 14 | Email | If still no response: the "should I close the file?" graceful exit — gives them dignity |
| 4 | Day 90 | Email | Long-arc check-in. NO sales pitch. Just an honest "wanted to flag" message about something genuinely useful |

## Output format

```
# Win-Back Campaign — [Segment + archetype]
**Eligibility criteria:** [who receives this version]
**Estimated audience size:** [N]
**Churn reason being addressed:** [archetype]
**Campaign goal:** [primary metric — reactivations / replies / NPS lift]

---

## Touch 1 — Day 0 · Email
**Subject:** [line]
**Body:**
[message]

— [Rep name]

---

## Touch 2 — Day 5 · Email
...

(continue through Touch 4)

---

**Don't send to:**
- [exclusion list — customers who cancelled angrily, ongoing legal disputes, opted-out, etc.]

**Success metrics:**
- Open rate (benchmark: 40%+ for win-back)
- Reply rate (benchmark: 5%+ — replies > clicks for win-back)
- Reactivation rate within 30 days (benchmark: 2-5%)

**A/B test priorities:**
- [subject line variant most worth testing]

**Honesty audit (what NOT to do in this campaign):**
- [things you might be tempted to do that would damage trust]
```

## Worked example — Price churn

**User input:**
> "Build me a win-back for SaaS customers who cancelled in the last 90 days and explicitly mentioned price in exit feedback. We launched a $19/mo Lite tier 6 weeks ago. Brand voice: warm but no fluff. I'm Jordan."

# Win-Back Campaign — Price-churned SaaS customers
**Eligibility criteria:** Cancelled within last 90 days + mentioned "price" or "expensive" or "too much" in exit feedback
**Estimated audience size:** [user fills in]
**Churn reason being addressed:** Price (Archetype 1)
**Campaign goal:** Reactivation onto Lite tier or honest "wasn't right at any price"

---

## Touch 1 — Day 0 · Email
**Subject:** That price issue — we did something about it

**Body:**

> Alex,
>
> Quick honest one — you cancelled [N] months ago and mentioned the price. Fair enough — at $49/mo we were positioned for teams that were getting daily value, and if you weren't there yet, the math wasn't going to work.
>
> Six weeks ago we launched a Lite tier at $19/mo. It's the core features minus the team-collaboration stuff (no shared workspaces, no integrations). For solo users or people who didn't need the heavy machinery, it lands closer to where the value/price line should have been for you.
>
> Not asking you to come back today. Just thought you should know it exists, in case the timing's right now.
>
> Lite tier link below if you want to look: [link]. No pressure either way.
>
> — Jordan, Founder

---

## Touch 2 — Day 5 · Email
**Subject:** A quick free thing, whether you come back or not

**Body:**

> Alex,
>
> Whether you check out Lite or not, wanted to send across our solo-user template pack — free, no signup required, useful even if you've switched to a competitor.
>
> [Link to free templates / spreadsheets / whatever is genuinely useful]
>
> Some of these are the patterns we used to teach our power users; they work in spreadsheets too. Steal what's helpful.
>
> — Jordan

---

## Touch 3 — Day 14 · Email
**Subject:** Should I close the file on this one?

**Body:**

> Alex,
>
> Last note from me on this for a while.
>
> If [our product] isn't on the cards any more — for price reasons or otherwise — just reply "all good" and I'll stop following up. No hard feelings.
>
> If you'd like a heads-up when we next do something interesting (new feature, big update, etc.), just reply "keep me posted" and I'll filter to occasional update emails only.
>
> Either way, thanks for trying us. The Lite tier link below if you ever want to revisit: [link]
>
> — Jordan

---

## Touch 4 — Day 90 · Email
**Subject:** Genuinely useful update + no pitch

**Body:**

> Alex,
>
> Wanted to flag — we just shipped [genuinely useful new feature]. Not a sales pitch, just thought you should know.
>
> [One paragraph on what the feature is, in plain language]
>
> If you ever decide to come back, link's below. If not, totally fine — we'll leave you alone going forward.
>
> — Jordan, Founder

---

**Don't send to:**
- Customers who replied to cancellation with negative tone / threats
- Customers who explicitly opted out of marketing
- Customers in active legal / chargeback disputes
- Customers whose accounts were deleted at their request (vs cancelled but kept on file)

**Success metrics:**
- Open rate (benchmark for price-churn win-back: 45-55%)
- Reply rate (benchmark: 5-8% — price-churn audiences engage more than other archetypes)
- Reactivation rate within 30 days (benchmark: 4-6% with a real price option)

**A/B test priorities:**
- Touch 1 subject line: "That price issue — we did something about it" vs "Quick — new $19/mo tier exists" (direct vs framed)
- Touch 3 wording: "Should I close the file" vs softer "Just checking" (try direct — it pulls higher reply rates from cancelled customers)

**Honesty audit:**
- DON'T add an artificial deadline to the Lite tier offer. "Limited time only" on a permanent product reads as manipulation.
- DON'T frame the Lite tier as a "special" for them — it's a public tier, frame it as one.
- DON'T pretend they were a great customer if they weren't — light usage + price-driven churn = honest acknowledgement, not flattery.

---

## Worked example — Neglect churn (different archetype)

(Condensed example)

**User input:**
> "Win-back for e-com customers who haven't ordered in 12+ months. They were good customers — most had 2-3 orders. Probably just forgot about us. I'm Alex at Birchwood Organic."

**Touch 1 — Subject:** "12 months on — wanted to flag something"
**Body opener:** "Mira — quietly noticed it's been just over a year since your last order. No pressure, no 'we miss you' — that's not why I'm writing. Something we shipped recently you might find useful…" [Specific new product or piece of content relevant to their previous purchase pattern]

**Touch 2 — Subject:** "Resilience Moisturiser is back in stock"
**Body:** Reference their previous favorite product directly. Don't push — just inform.

**Touch 3 — Subject:** "Want me to stop emailing?"
**Body:** Graceful exit framing.

**Touch 4 (Day 90) — Subject:** Genuine update, no pitch.

---

## Common edge cases

- **Customer churned 2+ years ago** — extend timing. Touch 1 → 0 days, Touch 2 → 14 days, no Touch 3, Touch 4 → 6 months
- **Customer churned in anger** — don't include in any standard win-back. Bespoke note from a named leader if at all
- **Customer churned multiple times** — they've heard your campaigns before. Either escalate to a personal manual outreach or skip them
- **B2B customer where the buyer changed** — re-research the new buyer before sending; the old contact may not be there
- **Customer's email bounces / unsubscribed** — respect the boundary. No alternative channels.

## What NOT to do

- **Don't use "we miss you"** — universally cringed at
- **Don't use fake urgency** ("limited time win-back offer expires Friday!") — reads as desperate
- **Don't ask "what can we do better?" generically** — they already told you on the way out. Reference it specifically
- **Don't include the unsubscribe link as a single tiny grey link.** Make it visible — opted-out customers are better than annoyed customers
- **Don't run win-back on customers who churned <30 days ago.** Too fresh, you're chasing
- **Don't run win-back more than once per year per customer.** They'll filter you out
