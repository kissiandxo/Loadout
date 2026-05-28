---
name: objection-prep
description: Use this skill BEFORE a customer meeting / call / negotiation, when a car-dealership sales rep wants to anticipate the objections they're likely to face. Triggers on phrases like "what objections should I prep for", "the [name] family is coming in tomorrow — what should I expect", "I've got a negotiation in an hour, get me ready", "prep me for this customer", "customer profile is [X] — what'll they push back on". Generates the 5 most likely objections for that specific customer profile + a one-liner response ready for each. This is the proactive prep skill — for in-the-moment objection responses use objection-handler instead.
---

# Objection Prep

You're prepping a car-dealership rep for a customer encounter they haven't had yet. The job: predict the 5 objections this specific customer is most likely to raise, given their profile, and arm the rep with a one-liner response for each so they're not flat-footed.

This is proactive. If the rep is already in the conversation and stuck on a specific objection, redirect to the `objection-handler` skill — that one's reactive.

## What you need from the user

If missing, ask:
- **Who's coming in / who you're calling** — name, role if known (decision-maker, partner, parent helping kid, fleet buyer)
- **What they've shown interest in** — model, trim, anything specific
- **Deal stage** — first visit, came back for a second look, finance appointment, handover negotiation
- **What you know about them** — first-time buyer / sceptic / loyal previous customer / has a trade-in / financing through their bank / cash buyer / has explicitly said budget is tight / has already shopped two other dealers
- **Anything they've said already** — "looking around", "want best deal", "checking inventory"

Be willing to run with partial information — flag what you're assuming.

## How to think about predicting objections

Different customer profiles raise different objections. The skill should think about *which* objections are likely, not just dump every possible one:

| Customer profile | Most likely objections |
|---|---|
| First-time buyer, solo | Price, "let me think about it", "I want to talk to my [parent/partner]" |
| Couple, one enthusiastic + one skeptical | The skeptic's specific concern (often running costs / depreciation / "do we really need this") |
| Has a trade-in already | The trade-in valuation, the timing of selling their current car |
| Repeat customer | Why this model is better than what they had, loyalty discount expectations |
| Shopped two other dealers | Price match expectations, "the other guy quoted me cheaper" |
| Fleet buyer | Long-term running costs, residual values, warranty terms |
| Cash buyer with a budget | The "stretch" — when you're asking them to go above their stated number |
| Came back for second visit | Often something specific they went home to check — they'll raise THAT |

## Output format

```
# Objection prep — [Customer first name] · [Vehicle interest] · [Meeting context]
**Customer read:** [2–3 sentences on what kind of customer this is and what they'll likely push on]

---

## Most likely 5 objections (ranked by probability)

### 1. "[predicted objection in their likely words]"
**Why they'll say it:** [one line]
**Your one-liner:** "[short, deployable response]"
**Underlying:** [what's really going on under the surface]

### 2. "[predicted objection]"
...

(continue for 5)

---

**The one objection you can defuse before they raise it:**
> "[the move that removes one of the above from the table before they even bring it up]"

**Notes for the rep:**
- [the order to address things]
- [what NOT to lead with]
- [the highest-risk moment in the meeting]
```

## Worked example

**User input:**
> "Tomorrow at 10am, Dan and Priya Holland coming back for a second look at the white Outlander PHEV Aspire 7-seater. First visit was last Saturday — they test-drove, Dan loved it, Priya had finance questions. I emailed them the quote ($76k drive-away) on Sunday, no reply for 6 days, then they texted yesterday wanting to come back in. They have a 2018 Pajero Sport to trade. I'm Alex."

**Good output:**

# Objection prep — Dan & Priya Holland · Outlander PHEV Aspire 7-seater (white) · Second-look meeting tomorrow 10am
**Customer read:** Two decision-makers with a clear split — Dan is sold, Priya is the gatekeeper, and the 6-day silence after your quote tells you Priya was the bottleneck. The fact that they texted (not Dan calling) to come back in suggests Priya has had her concerns addressed by something — possibly running cost research, possibly partner conversations. Don't assume she's coming in ready to sign; she's coming in for a second answer to her first concern.

---

## Most likely 5 objections (ranked by probability)

### 1. "We need to think about the running costs vs the regular Outlander."
**Why they'll say it:** Priya's the gatekeeper, the PHEV premium is the obvious sticking point, 6 days of silence is enough time to have done her own homework.
**Your one-liner:** "Totally fair. Real numbers on your daily commute — the PHEV runs about [X] cheaper per week on electric, but the breakeven on the price premium is about 3–4 years. Want me to model it for your actual k's?"
**Underlying:** She wants a payback number. Have it ready.

### 2. "The trade-in number on the Pajero Sport — what are we looking at?"
**Why they'll say it:** The trade-in is the biggest single variable that hasn't been quoted yet. They've had 6 days to look up Redbook themselves, so they'll have a number in mind.
**Your one-liner:** "Let me grab a real number on it before we sit down — give me 5 minutes." [Then get the actual valuation done in real-time, don't ballpark]
**Underlying:** They're checking if you've done the work. Don't fake it — get the BM or do the trade-in tool live.

### 3. "We saw a similar PHEV at [other dealer] for less."
**Why they'll say it:** Six days of silence almost always includes at least one comparison shop. Likely the RAV4 PHEV or the Sorento PHEV.
**Your one-liner:** "Happy to compare the two on like-for-like spec — usually it's a feature gap, sometimes a delivery-timing gap, occasionally a real price diff we can match. Which one did you see?"
**Underlying:** Ask which dealer/model BEFORE responding. Most "I saw it cheaper" claims are different specs.

### 4. "Can you do anything on the price?"
**Why they'll say it:** Standard second-visit move. Comes more from Dan than Priya — he's emotionally committed, sees price negotiation as the closing move.
**Your one-liner:** "There's not much in the headline number, but there's room to play in finance terms, trade-in, and the accessories pack. Where would moving the dial actually help you most?"
**Underlying:** Redirect from price-haggling to structure. Don't drop dollars in the first ask.

### 5. "Can we hold the colour while we sort the finance?"
**Why they'll say it:** Halfway-commitment ask. They want to lock the car without locking themselves.
**Your one-liner:** "Yes — I can put a $500 refundable hold on the Snow White Aspire for 7 days. That gets you the time. Want me to write that up while we talk finance?"
**Underlying:** This is a buying signal. Treat it as such, not as another stall.

---

**The one objection you can defuse before they raise it:**
> "Open the meeting with: 'Before we get into anything else — Priya, last time you had a couple of questions on running costs that I didn't have great numbers for on the spot. I've put together a side-by-side for your actual driving patterns — want to look at that first?' Defuses #1 before it's even said, and signals you listened. Massive trust move."

**Notes for the rep:**
- Open with Priya, not Dan. She's the decision-maker, and treating her as such is a 10-second move that reframes the whole meeting.
- DON'T lead with price. They've had the quote for 6 days. If they wanted to negotiate price you'd have heard from them sooner.
- The highest-risk moment is when you reveal the trade-in number on the Pajero Sport. If it's lower than they're expecting, that's where you lose the deal. Have a margin-of-error explanation ready before you say the number.
- If the meeting goes past 45 minutes without a structural commitment (deposit, finance app, deal sheet signed), you're losing. Pull the meeting back with: "Where are you both at right now — comfortable enough to do the paperwork today, or want to take it home overnight?"

## Common edge cases

- **You know almost nothing about the customer:** Run the skill with whatever you have. Output the 5 most universal objections for the deal stage, and flag that you're working blind.
- **Customer has come in 3+ times:** They're not actually shopping any more, they're avoiding the decision. Top objection to prep for is "let me think about it." Your prep should focus on closing techniques (deadline, deposit hold), not feature/benefit work.
- **Fleet/B2B customer:** Objections shift to running costs / tax / residual values / fleet manager approval. Re-run the skill noting "this is a fleet buyer" and the predicted set will shift accordingly.
- **They've explicitly said "best price wins":** Don't waste time predicting other objections. Skill should focus entirely on price-negotiation prep. Tell the rep this and recommend they switch to the `negotiation-coach` skill instead.

## What NOT to do

- Don't list more than 5 objections. Prep that's too broad is unrehearsable.
- Don't write long one-liners. If the rep can't say it in one breath, they won't.
- Don't predict the same objection twice with different wording.
- Don't include objections that don't fit the profile (e.g., don't predict trade-in concerns if the customer doesn't have a trade-in).
