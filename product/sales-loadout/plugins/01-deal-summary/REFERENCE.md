# Plugin: Deal Summary

A structured fill-in template that gives Claude the deal context it needs to produce sharper output across every other skill. Think of it as the "deal sheet" you mentally carry into every customer conversation — except now Claude can read it.

## When to use this plugin

Drag this file into your Claude.ai Project at the start of any deal. Update the values as the deal progresses. Then every skill in the Sales Loadout gets sharper output because Claude is working from real context, not your one-line prompt.

Especially valuable for:
- The **objection-prep** skill (Claude knows the customer profile)
- The **follow-up-sequence** skill (Claude knows what's been tried)
- The **proposal-builder** skill (Claude has the figures and the inclusions)
- The **customer-recap** skill (Claude has prior context to compare against)

---

## The template

Copy the block below into the Project's knowledge or paste it into a chat the first time you discuss a new deal. Update the fields as the deal progresses.

```
# Deal: [Customer first name(s) / Family name / Business name]

## Customer
- **Primary contact:** [first name + how they communicate — "Sarah, prefers SMS"]
- **Second decision-maker:** [partner / parent / business co-owner, if any]
- **Buyer type:** [first-time buyer / repeat customer / fleet / cash buyer / financed buyer]
- **What they said they want:** [their own words]
- **What they actually want, my read:** [your interpretation — often different]
- **Concerns or sensitivities raised:** [price / running cost / family resistance / etc.]

## Vehicle
- **Model + trim + colour:** [e.g., 2024 Outlander PHEV Aspire 7-seater, Snow White]
- **VIN / build / stock number:** [if known]
- **Why this model:** [the trigger — "their kid starts school next year, needed seats"]

## Numbers
- **List / advertised price:** $XX,XXX
- **Drive-away figure quoted:** $XX,XXX
- **Trade-in vehicle (if any):** [year / make / model / VIN]
- **Trade-in valuation:** $XX,XXX (status: estimated / inspected / confirmed)
- **Net cash to find:** $XX,XXX
- **Finance status:** [cash / own bank / dealer finance pre-approved / in application / declined]

## Deal stage
- **Current stage:** [enquiry / test drove / quoted / negotiating / verbal yes / signed]
- **Days in current stage:** [N]
- **Last contact event:** [test drive Sat / quote Sun / phone call Tue / etc.]
- **Last contact channel:** [email / SMS / phone / in-person]
- **Last contact outcome:** [response received / silence / specific question / "I'll think about it"]

## Timeline pressure
- **Customer deadline:** [Friday road trip / before school holidays / "no rush" / etc.]
- **Your deadline:** [end of month / stock running out / finance offer expiring]

## What's been tried / promised
- **Inclusions offered:** [free first service / mats / racks / extended warranty / etc.]
- **Discounts authorised:** [headline price / trade-in bump / finance kicker]
- **Things I promised but haven't done yet:** [send charging plan / get parts quote / etc.]

## Notes / colour
[Anything else — observations from interactions, things their kids said, references to other vehicles they own, partner dynamics, etc.]
```

---

## Worked example — filled in

```
# Deal: Holland family (Dan & Priya + 3 kids)

## Customer
- **Primary contact:** Priya (the gatekeeper — handles finance decisions). Dan is the emotional buyer.
- **Second decision-maker:** Dan, husband. Loves the car, defers to Priya on numbers.
- **Buyer type:** Repeat Mitsubishi family — currently in a 2018 Pajero Sport
- **What they said they want:** A 7-seater for the school run and weekend trips, with electric option for cost
- **What they actually want, my read:** A status step-up from the Pajero Sport. PHEV is the rationale for the upgrade. Priya needs the numbers to make sense; Dan needs to feel like he made a smart choice.
- **Concerns or sensitivities raised:** Charging on long road trips (Priya); running cost premium vs regular Outlander (Priya)

## Vehicle
- **Model + trim + colour:** 2024 Outlander PHEV Aspire 7-seater, Snow White
- **VIN / build / stock number:** [stock VAB-2024-0883]
- **Why this model:** 3 kids, weekend road trips, want to reduce fuel costs on weekday school runs

## Numbers
- **List / advertised price:** $76,990
- **Drive-away figure quoted:** $76,000
- **Trade-in vehicle:** 2018 Mitsubishi Pajero Sport GLX (75,000km, full service history pending)
- **Trade-in valuation:** $24,000 estimated, pending formal inspection
- **Net cash to find:** $52,000
- **Finance status:** through their own bank, pre-approval in progress

## Deal stage
- **Current stage:** Negotiating (second-look meeting tomorrow 10am)
- **Days in current stage:** Day 8 since first visit
- **Last contact event:** Customer texted yesterday wanting to come back in
- **Last contact channel:** SMS (Priya's number)
- **Last contact outcome:** Booked second meeting for tomorrow 10am

## Timeline pressure
- **Customer deadline:** Road trip starts next Friday — need vehicle ready by Thursday
- **Your deadline:** End of month is 11 days away, EOFY bonus on PHEV expires in 4 days

## What's been tried / promised
- **Inclusions offered:** Free first service (offered Saturday)
- **Discounts authorised:** None yet — quote is at full retail
- **Things I promised but haven't done yet:** Charging route plan for Sydney → Cairns (must send before tomorrow's meeting)

## Notes / colour
- Priya is an accountant. Numbers-first conversations work; "trust me" conversations don't.
- Dan keeps mentioning his mate's RAV4 hybrid — likely a soft anchor.
- Kids are 7, 9, 12 — middle one specifically asked about the third-row legroom on the test drive (genuine driver of the 7-seater requirement, not optional).
- They've been a Gateway family since 2018 — this is the third Mitsubishi in their household.
```

---

## How to use this in Claude.ai

1. Open your **Sales Loadout** Project (or whichever skill's project you're about to use)
2. Click **Project knowledge** → **Add file**
3. Either upload this filled-in template as a `.md` file, OR paste the content directly into a project knowledge note
4. Now when you invoke any skill, Claude already has the full deal picture — your prompts can be shorter
5. Update the template as the deal progresses (new objections raised → add them, valuation comes in → update it)

**Pro tip:** Keep one of these per active deal, named `deal-holland.md`, `deal-tom-cerato.md`, etc. Drop the relevant one into the project at the start of any session about that deal. Drop a different one in for the next deal.

## What NOT to do

- Don't fill in fields with guesses if you don't know — leave blank. Claude will treat blank fields differently from filled-but-wrong ones.
- Don't include sensitive personal info that isn't necessary for the sales work (full addresses, full financial details, IDs). Use first names + suburbs + ranges.
- Don't paste this template into shared spaces (Slack channels, team chats) — these are individual deal notes.
