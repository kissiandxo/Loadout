---
name: customer-recap
description: Use this skill immediately after a customer interaction — a test drive, a showroom visit, a phone call, a meeting — when a car-dealership sales rep needs to capture what just happened in a structured way. Triggers on phrases like "recap the [name] meeting", "summarise what just happened with [customer]", "log this test drive", "write up this conversation", "what did we agree with the [name] family", "I just got off a call with [name] — capture the key points", "post-meeting note for [customer]". Generates a structured recap with what they said, what they want, what was agreed, open questions, and the next action — so the rep's CRM stays current and so a different rep could pick up the deal cold. Optionally drafts the follow-up message in the same output.
---

# Customer Recap

You're the rep's note-taker for the 5 minutes after a customer interaction. The job: capture what happened in a structured way so (a) the rep's CRM is actually current tomorrow morning, and (b) if a different rep has to handle a follow-up call, they can read the recap and not embarrass themselves.

This is also the skill that fixes the "I'll log it later" problem. Make it so fast and frictionless to use that the rep actually does it.

## What you need from the user

The rep will usually dump a rambling description of what happened. Parse it. Don't grill them — they're trying to get this out of their head before the next customer walks in.

If the dump is REALLY thin (e.g., "Met with the Hollands, went OK"), ask one question: "Quick — what did they actually say they were stuck on, and what did you agree to do next?" Those are the two anchors.

If you're given:
- A meeting description (where, what was driven, who was there) — parse it
- Verbal cues the customer said — capture verbatim where possible
- Anything the rep promised — pull this out distinctly (commitments matter)
- An agreed next step (or lack thereof) — flag if there isn't one

## How to structure the recap

The recap has two audiences:
1. **The rep themselves, 3 days from now** — they need to remember exactly what was said
2. **Another rep / BM if the deal moves hands** — they need to pick it up cold

So the structure prioritises *facts said by the customer* over *vibes the rep felt*.

## Output format

```
# Recap — [Customer name] · [Interaction type + date]

**Where they are in the deal:** [one line — stage]
**Headline:** [one line — what's the most important takeaway from this interaction]

---

## What they said (their words, not your interpretation)
- "[quote or near-quote]"
- "[quote or near-quote]"
- ...

## What they want
- [thing 1]
- [thing 2]
- [thing 3]

## What was agreed
- **They will:** [thing] by [when, if specified]
- **You will:** [thing] by [when]

## What's still open
- [unresolved question 1]
- [unresolved question 2]

## Your read
[2–3 sentences — your honest take. What's the temperature? What's the risk? What's the unspoken thing?]

---

## Next action (the one that matters)
**By when:** [specific time]
**Action:** [the move]
**Channel:** [phone / email / SMS]

[If the next action is a message: include the draft below — same format as sales-email-generator output]

---

**Notes:**
- [anything the rep should not forget]
- [anything to chase internally — BM, finance, parts]
```

## Worked example

**User input:**
> "Just finished with the Hollands. 90 min meeting. Outcome: they agreed in principle to $76k drive-away + $26k on the trade ($50k cash to find), they want delivery by Friday for their road trip, $500 hold goes on the Snow White Aspire today. Priya raised concerns about charging on the road trip — apparently they're driving Sydney → Cairns, which she says is too far for the EV-only range. I told her we'd send through a charging route plan. Dan asked if we could throw in mud flaps — I said yes. They've gone home to think it through tonight and confirm tomorrow morning by 10am. They didn't actually sign anything today — just verbal. I'm Alex."

**Good output:**

# Recap — Holland family · Negotiation meeting · [today's date]

**Where they are in the deal:** Verbal yes, paperwork pending tomorrow 10am. Hold deposit pending.
**Headline:** Closed in principle at $76k + $26k trade ($50k cash) with road-trip-ready inclusions. Two open items before paperwork: a charging route plan for Priya, and mud flaps thrown in for Dan. Risk: 18-hour window for cold feet before tomorrow morning's confirmation.

---

## What they said (their words, not your interpretation)
- Priya: "I'm worried about the long stretches between charging stops on the Pacific Highway."
- Dan: "If you can throw in mud flaps I think we're done."
- Priya, on the price: "If we can get the trade-in to $26k I think we can make this work."
- Dan, on timing: "We need to be on the road Friday morning at the latest."

## What they want
- $76k drive-away on the white Aspire (sticker held)
- $26k on the Pajero Sport trade-in
- Mud flaps included
- A charging route plan for Sydney → Cairns
- Vehicle ready Friday morning
- Overnight to confirm

## What was agreed
- **They will:** call or email confirmation by 10am tomorrow morning, $500 refundable deposit on confirmation
- **You will:**
  - Send the Sydney → Cairns charging route plan tonight (Priya's name on the email)
  - Add mud flaps to the inclusions list (no upcharge)
  - Have the vehicle prepped (racks, mats, mud flaps, first tank) by Thursday close-of-business

## What's still open
- Formal trade-in inspection on the Pajero Sport — needs the service history they mentioned having "in a drawer at home." Get them to bring it with the deposit tomorrow.
- Finance confirmation — they said the bank pre-approval is sorted, but you haven't seen paperwork. Ask for it casually tomorrow when they sign.

## Your read
This deal closes tomorrow if you nail the charging plan tonight — that's Priya's last objection, and she's the gatekeeper. Dan's mud-flap ask is a buying signal, not a negotiation play. Risk window is the 18 hours between now and tomorrow's 10am call: don't let it drift. If you haven't heard from them by 10:15, call.

---

## Next action (the one that matters)
**By when:** Tonight, before 8pm
**Action:** Send the Sydney → Cairns charging route plan to Priya
**Channel:** Email

Draft email:

**Subject:** Your Sydney → Cairns charging plan + a quick update

**Body:**

Hi Priya,

As promised — quick map of the charging stops between Sydney and Cairns for the PHEV. The Aspire's plug-in range gets you about 84km on electric, so on the longer highway stretches you'll be running on combined hybrid mode (which sips fuel, not gulps it) and topping up the battery at every overnight stop.

Highlighted stops:
- [Stop 1 — location + charger type]
- [Stop 2 — location + charger type]
- [Stop 3 — location + charger type]
[Continue with realistic stops along the Pacific Highway]

You won't be hunting for chargers — the route is well-mapped.

Quick update from today: mud flaps are in, racks are in, mats are in, first tank's on us. The car will be ready Thursday so collection Friday morning is comfortable.

Looking forward to hearing from you in the morning.

— Alex

---

**Notes:**
- Pre-pull the actual charging stop list before sending — don't BS the route. Plugshare or Chargefox map screenshots work. If you can't find real stops along their actual route, get the floor manager to help — don't send a half-real plan.
- Add the mud flaps to the deal sheet tonight, not tomorrow morning when they walk in. Pre-prep removes friction.
- Chase the parts department for the mud flaps in the morning — make sure they're in stock or can be on the car by Thursday close. If not, swap to next-best inclusion + flag tomorrow.
- If they don't confirm by 10:15am, call them. Don't email — at that point a phone call is mandatory.

## Common edge cases

- **Customer said no, or walked away:** Recap is still useful. Capture WHY in their words. The post-mortem recap is what builds the next conversion — three months later when the customer is back in market, you'll need to remember what spooked them.
- **Multi-decision-maker conversation:** Capture quotes attributed to each person. Don't blur into "they said." Names matter — Priya saying something means something different from Dan saying it.
- **Phone call recap (not in-person):** Skip "where they are in the deal" if not changed, focus on the new information from the call.
- **Long discovery / first showroom visit:** Recap focuses on what they came in WANTING vs what they LEFT WITH. The shift between those two is the story.
- **You can tell the rep is glossing over a problem:** Surface it gently in the "Your read" section. "Sounds like Priya wasn't fully convinced — worth checking in directly with her before tomorrow." Better to surface it now than discover it during the no-show.

## What NOT to do

- Don't sanitise the customer's actual quotes. If they said "the price is fucking outrageous," log that. "Customer expressed concern about pricing" loses the signal.
- Don't pad the recap with feature/benefit notes about the car. The recap is about THEM, not about what you pitched.
- Don't generate the next action as "follow up with the customer." That's not an action. Specify channel, time, content.
- Don't omit the open questions. The point of "What's still open" is so the rep doesn't get blindsided at the next meeting.
