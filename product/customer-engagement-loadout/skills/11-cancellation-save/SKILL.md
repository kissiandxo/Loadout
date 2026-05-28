---
name: cancellation-save
description: Use this skill in real-time when a customer is in the act of cancelling — they've hit the cancel flow, asked to cancel, or are mid-conversation about leaving. Triggers on phrases like "customer wants to cancel", "save script for cancellation", "draft a save offer", "they hit the cancel button", "how do I respond when they say they're leaving", "retention conversation for [name]". Returns: a calibrated save response that takes the cancellation seriously without being grovelling, asks the right diagnostic question, and provides ONE good offer if appropriate. Never two offers. Never escalation through multiple offer tiers. Either the save works or the customer leaves with dignity — both outcomes are fine.
---

# Cancellation Save

You're handling a customer in the act of leaving. The window to save is small — often a single message exchange. The customer's mental model has already shifted from "active customer" to "former customer." Your job is either to genuinely shift it back, or to let them go cleanly.

The honest reality: most cancellation save campaigns are awful. They escalate through 4-5 increasingly desperate offers ("wait, 30% off! wait, 50% off! wait, free month!"), which teaches every future customer that they can extract concessions by threatening to cancel. The good ones do the opposite: take the cancellation seriously, diagnose carefully, offer ONCE if appropriate, and accept the outcome.

## What you need from the user

- **Customer's stated reason for cancelling** (in their words)
- **Customer context** — name, plan, LTV, tenure, recent usage trajectory
- **What can be offered** — pause / downgrade / discount / nothing
- **Channel of cancellation** — email / live chat / cancel-flow form / phone
- **Your name + role**

## The diagnostic ladder

The cancellation reason determines whether saving makes sense AND what to offer. Use this ladder:

### Layer 1 — Surface reason
What they said (price, time, fit, switching, life event, etc.).

### Layer 2 — Underlying reason
What's actually behind the surface reason. Probe gently in your save response.

### Layer 3 — Reversibility
Is the underlying reason something you can change? Honestly?

| Surface reason | Underlying often is | Reversible? |
|---|---|---|
| "Too expensive" | Not getting enough value to justify the cost | Maybe — depends if there's untapped value |
| "I don't use it enough" | Habit never formed; activation never completed | Sometimes — depends on whether re-onboarding could help |
| "I found another tool" | Competitor solved a specific pain better, OR they're shopping | Rarely directly; can offer one comparison conversation |
| "Going through a tough time financially" | Real | Often — pause subscription, generous handling |
| "Business closing" | Real, terminal | No. Don't try. |
| "Not what I expected" | Mismatch between marketing + reality | Sometimes — depends on whether the gap is real |
| "Customer service was bad" | Real grievance | Sometimes — if the grievance can be specifically addressed |

## The single-offer rule

You get ONE offer. Pick the right one for the specific cancellation reason.

| If the underlying reason is... | The right offer is... | Don't offer... |
|---|---|---|
| Value-gap (not enough usage) | A guided re-onboarding session OR a pause | A discount (treats symptom not cause) |
| Price | A genuinely lower tier OR a pause | A one-time discount (returns the customer at the same point in 3 months) |
| Switching to competitor | A specific feature/use comparison + 30 more days free to evaluate | A price match (race to the bottom) |
| Life circumstance | A pause / freeze / downgrade | Anything that requires payment |
| Bad service | A direct line to the founder + reset of recent charges | A discount (doesn't address the experience) |
| "Wrong fit" | Nothing — let them go cleanly | Anything — desperation visible |

## How to write the save response

### Structure

1. **Acknowledge the cancellation as a real thing.** Don't pretend it isn't happening.
2. **Diagnose with ONE question.** The right question reveals the underlying reason.
3. **If the underlying reason is reversible, offer ONCE.** Specific, concrete, no escalation pressure.
4. **If not, process the cancellation cleanly.** Don't make them say "no" three times.
5. **Leave the door open without begging.** "If anything changes" beats "please come back."

### Tone

- **Calm, not desperate.** Customers can smell desperation
- **Acknowledging the customer's autonomy.** They're allowed to leave. Honour that
- **Specific.** Generic save attempts read as automated and convert poorly
- **Briefer is better.** A 4-sentence response often outperforms a 4-paragraph one
- **Real human signature.** Named individual, role. Not "Retention Team"

## Output format

```
**Customer:** [Name + tenure + plan + LTV]
**Stated reason:** [verbatim if given]
**Probable underlying reason:** [your read]
**Save likelihood:** [Realistic / Hard / Don't try]
**Right offer:** [pause / downgrade / re-onboarding / nothing / etc.]

---

**Suggested response:**

> [the reply, properly formatted]

— [Rep name]

---

**Why this works (or honest assessment of why a save isn't likely):**
- [the move]

**If they take the offer:**
- [next step]

**If they decline / cancel anyway:**
- [process cancellation cleanly, what to do]

**Internal note:**
- [pattern detection if this is the Nth similar cancellation]
- [process improvement if applicable]
```

## Worked examples

### Example A — Price-driven cancellation, salvageable

**User input:**
> "Customer Alex submitted cancel request. Reason given: 'It's just too expensive for what I'm using it for.' Customer for 8 months on the $79/mo plan. Usage trajectory: was heavy first 3 months, dropped off the last 4. We have a $29/mo Lite plan that has 70% of the features. I'm Jordan."

**Customer:** Alex · 8-month customer · $79/mo plan · ~$632 LTV · usage tailed off in last 4 months
**Stated reason:** "Too expensive for what I'm using it for"
**Probable underlying reason:** Value-gap. Plan stayed at $79/mo while usage dropped — the cost looks worse in retrospect than the value provided
**Save likelihood:** Realistic — a Lite plan probably matches their actual usage and lets them stay
**Right offer:** Downgrade to Lite ($29/mo)

---

**Suggested response:**

> Alex,
>
> Fair — $79/mo only makes sense if you're getting that much value, and looking at your usage the last few months, you weren't. That's on us for not flagging the option to downgrade earlier.
>
> Quick question before I process the cancellation: would the $29/mo Lite plan work for you? It's the core features minus the team-collaboration stuff (no shared workspaces, no integrations) — looking at how you've been using us, you'd have most of what you actually need.
>
> If yes, I'll move you across now and refund the difference on this month. If you'd rather just leave, that's fine — I'll process the cancellation immediately, no more emails. Your call.
>
> — Jordan

---

**Why this works:**
- Opens with "Fair" — doesn't argue the cancellation
- Specifically acknowledges that the plan was wrong for actual usage — takes responsibility for the mismatch
- ONE clear offer: the downgrade. Not "10% off!" or "free month!"
- Two-paths option (downgrade OR cancel) gives Alex control
- "I'll process the cancellation immediately, no more emails" — promises the clean exit if they choose it. This builds enough trust that they're more likely to consider the offer.

**If they take the offer:** Process the downgrade same-day. Refund the prorated difference. Send a brief follow-up "moved you across, here's what's different on Lite, message me if you find a gap."

**If they decline / cancel anyway:** Process the cancellation immediately. Send ONE final message: "All done. No further charges. If you ever come back, your old account stays in place for 90 days." Then leave them alone.

**Internal note:** Pattern signal — 8 months at $79/mo with usage dropping is a foreseeable cancellation. Worth a proactive process: when a customer's usage drops below X% of plan tier for 60 days, surface the downgrade option voluntarily. Loses some revenue short-term, preserves customer long-term.

---

### Example B — Switching to competitor, harder save

**User input:**
> "Customer Mira wants to cancel. Reason: 'We're switching to [Competitor X] — their workflow features are a better match for our use case.' Customer for 5 months on the $49/mo plan. Usage was steady. They're a small marketing agency. I'm Alex."

**Customer:** Mira · 5-month customer · $49/mo plan · ~$245 LTV · steady usage
**Stated reason:** Competitor X has better workflow features
**Probable underlying reason:** Specific feature gap. They probably evaluated both and our workflow really doesn't fit their use case.
**Save likelihood:** Hard. They've already decided. Save isn't the right framing — it's a one-shot honest conversation.
**Right offer:** A specific feature comparison + maybe 30 days extension to ensure the switch actually solves what they think it solves. Don't beg.

---

**Suggested response:**

> Mira,
>
> Honest one — if Competitor X's workflow features genuinely fit your use case better, you're making the right call. I'd rather you ship great work with the right tool than stay with us out of friction.
>
> Two things before you go, both no-pressure:
>
> 1. I'd love to know specifically which workflow feature swung it — partly for my own learning, partly because if there's a gap on our side we should fix, your specific feedback would be gold
> 2. If you want, I'll leave your account active for an extra 30 days at no charge — sometimes when you actually switch, things don't fit the way you expected, and the transition isn't worth it. If that happens, we're still here. If not, all good
>
> Either way, I'll process the cancellation now so there's no further charge. Genuinely good luck with the switch.
>
> — Alex

---

**Why this works:**
- "If Competitor X genuinely fits better, you're making the right call" — disarms the customer's expectation of being pitched against. Counterintuitively, this is the move most likely to make them reconsider OR give honest feedback
- The 30-day extension is offered but not as bait — it's framed as "in case the switch doesn't work out" which is sometimes literally true
- Asks for feedback as the FIRST thing of the two — signals you're listening more than selling
- "Genuinely good luck with the switch" — the cancellation is treated as final, not as a negotiation

**If Mira responds with feedback:** Reply with substantive engagement. Don't pitch back. If the feedback is fixable, mention what you'll do without overpromising.

**If Mira takes the 30-day extension:** Note in CRM. Don't email her during the extension. If she comes back at end of 30 days, that's worth a personal note.

**If Mira just cancels:** Process cleanly. Single final message confirming the cancellation. No further emails.

**Internal note:** Add Competitor X to monitoring list — if 3+ customers cite specific workflow features in cancellation reasons, it's worth a roadmap conversation about closing the gap.

---

### Example C — Life circumstance, no save attempt

**User input:**
> "Customer Sarah just submitted a cancel request with a long message: 'I'm so sorry to do this — my partner lost their job and we're cutting every non-essential expense. We've loved using [product], but $29/mo has to go for now. Hope to come back when things stabilise.' Customer for 14 months. I'm Jordan."

**Customer:** Sarah · 14-month customer · $29/mo plan · solid LTV · genuinely difficult life circumstance
**Stated reason:** Job loss in household, cutting non-essential expenses
**Probable underlying reason:** Real. No mystery. This is not a save situation.
**Save likelihood:** Don't try. Trying to save reads as predatory in this context.
**Right offer:** Genuine ease + an open door

---

**Suggested response:**

> Sarah,
>
> Don't be sorry. Sorting your finances at a moment like this is exactly the right thing to do. We'll be here when you're ready.
>
> Done a couple of things on your account:
>
> 1. Cancelled immediately — no further charges as of today
> 2. Paused your account data rather than deleting it — so when you come back (whenever that is), your projects and settings are exactly where you left them. No "start over" required
> 3. Refunded this month's payment — felt like the right thing
>
> No timeline expected and no follow-up emails from us. Reach out when life is calmer.
>
> Wishing you and your partner well.
>
> — Jordan

---

**Why this works:**
- "Don't be sorry" — directly addresses the customer's framing of having to apologise. Removes the social weight.
- Doesn't try to save. The save attempt in this situation would be tone-deaf.
- Three concrete actions, two of which exceed what most companies would do (pause vs delete, refund this month's payment)
- "No timeline expected and no follow-up emails" — gives them dignity. Many of these customers come back of their own accord; predatory follow-up sequences are the fastest way to lose them.

**If Sarah replies (likely with deep gratitude):** A short "really, no worries, just be well" response. Don't escalate the conversation.

**If she doesn't reply:** Don't follow up. She's said what she said.

**Internal note:** Mark account as "paused — Life Event 2026". Set a 12-month gentle re-engagement reminder (NOT 30 days). Goodwill processing fees from this kind of decision generate the strongest long-term loyalty in the customer base — often referenced years later.

---

### Example D — Wrong fit, no save

**User input:**
> "Customer Riley cancelled — reason: 'I bought this thinking it would do X but it actually does Y. My mistake.' Customer for 2 weeks. $49/mo. I'm Alex."

**Customer:** Riley · 2-week customer · cancellation within return-window
**Stated reason:** Mismatch between expectation and actual product
**Probable underlying reason:** Marketing/messaging gap — they expected something we don't do
**Save likelihood:** Don't try. This is a refund situation, not a save situation.

---

**Suggested response:**

> Riley,
>
> No drama — sounds like the fit isn't right, which happens. Refund the two weeks too, since you didn't really get what you came for.
>
> Quick question if you've got a sec, no pressure: what gave you the impression we did X? Genuinely useful — if our marketing's misleading we should fix it.
>
> Either way, all sorted. No further charges.
>
> — Alex

---

**Why this works:**
- Refund offered proactively — solves the customer's actual problem
- Asks the diagnostic question (what gave the wrong impression?) — but as low-pressure aside, not as a precondition
- No save attempt. Wouldn't work, would damage trust.

**If Riley replies with where the misleading messaging was:** Fix it. Send a brief confirmation that the messaging is being updated.

**If Riley doesn't reply:** No follow-up.

**Internal note:** If 3+ recent cancellations cite expectations of "X" that we don't do, run an audit of all marketing surfaces for the misleading promise.

---

## Common edge cases

- **Customer changes mind mid-cancel-flow** ("actually wait — what if I downgrade?") → process happily, no friction, no "see, I told you" energy
- **Customer cancels then re-subscribes within 7 days** → welcome back simply. Don't make a big deal. Some customers cycle.
- **Customer cancels via chargeback (not cancel flow)** → handle separately as a billing dispute. Save attempts are inappropriate
- **Customer cancels after a clear complaint they reported earlier that didn't get resolved** → save attempt only if you're truly addressing the complaint properly NOW. Otherwise it reads as gross.
- **Customer cancels a free trial** → light touch. Trial cancellations are often "I'm not ready to pay yet" — not "this product is wrong." A "what would have moved you to upgrade?" question, sent post-cancel, gets useful signal
- **Customer cancels multiple times across multiple subscriptions** → adjust treatment downward. They've heard your save responses before.

## What NOT to do

- **Don't escalate offers.** "10% off!"... "no? 25% off!"... is the most desperate move in retention
- **Don't make them justify the cancellation.** "Are you sure? Can you tell us why? Have you tried X feature?" loops infuriate customers
- **Don't survey them at the moment of cancellation.** The cancel-flow survey is fine if it's ONE question. Multi-question surveys at cancel-time get garbage data because the customer is just clicking through
- **Don't promise improvements you can't deliver** ("we're building exactly what you need next month!") — empty promises burn the goodwill the save attempt was trying to build
- **Don't follow up after a clean cancellation more than once.** The "we still miss you" email 7 days later is universally hated
- **Don't share the customer's cancellation publicly** (no "lost this customer, sad" social posts). Always private.
