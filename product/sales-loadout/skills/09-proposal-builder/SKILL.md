---
name: proposal-builder
description: Use this skill whenever a car-dealership sales rep needs a professional proposal, quote document, or deal sheet that goes beyond a one-line price. Triggers on phrases like "build me a proposal for [customer]", "write up a quote document", "I need a deal sheet that looks professional", "draft a fleet proposal", "write the proposal for [vehicle/customer]", "make the quote look proper", "format this deal as a proposal". Generates a clean, on-brand 1–2 page proposal with deal summary, breakdown of figures, inclusions, terms, and a clear acceptance path. The kind of document that makes the rep look like they work somewhere with a marketing department.
---

# Proposal Builder

You're writing the document the rep emails or hands across the desk. It needs to look like a real proposal, not a Word doc the rep banged out between calls. The buyer often shares this with a partner, parent, accountant, or fleet manager — so it has to stand on its own without the rep in the room.

## What you need from the user

If missing, ask:
- **Customer details** — name(s) and any business name (for fleet)
- **Vehicle** — full spec (year, make, model, trim, colour, build/VIN if known)
- **Headline figure** — drive-away price OR price + on-roads OR finance figure (whichever the rep quoted)
- **Trade-in (if any)** — vehicle + agreed valuation
- **Inclusions** — what comes with the deal (free first service, accessories, etc.)
- **Validity** — how long is this proposal good for (default 7 days)
- **Special terms** — finance pre-approval status, delivery date, holds, deposits
- **Rep's first name** and **dealership name** (so the sign-off works)

If the rep gives a paragraph dump with most of this, parse it.

## How to structure the proposal

Standard structure, always in this order:

1. **Header block** — Customer name, prepared for / by, date, validity
2. **Vehicle summary** — Year, make, model, trim, key spec highlights (the rep's brief — 3–5 lines, no full feature dump)
3. **Investment breakdown** — A clear table of: vehicle price, on-roads / dealer delivery / stamp duty / CTP, total drive-away
4. **Trade-in (if applicable)** — Make/model/year, agreed value, net cash-to-find calculation
5. **Inclusions** — Bulleted list of what's included beyond the car (servicing, accessories, warranty, etc.)
6. **Terms** — Validity period, deposit terms, delivery timeline, finance status
7. **Next step** — Single clear acceptance path (sign + return / call to confirm / schedule deposit)
8. **Sign-off** — Rep name, dealership, contact

For fleet proposals (3+ vehicles or business customer), add a "Total fleet cost summary" block after the per-vehicle breakdown.

## Tone & formatting discipline

- **Numbers over adjectives.** A specific weekly payment beats "affordable financing options."
- **Tables for figures, not paragraphs.** Buyers scan figures, don't read about them.
- **No marketing language.** "The exceptional new Outlander PHEV with cutting-edge technology" reads like brochure copy. The buyer's already chosen the car — your job is to make the deal feel solid, not re-sell.
- **One page if possible, two if necessary.** Long proposals get skimmed. Tight proposals get signed.
- **Use markdown structure that renders cleanly in PDF / Word / email.** Headers, simple tables, bullet lists. No images.

## Output format

The proposal itself uses this structure (output it as markdown, the buyer can convert to PDF or print as-is):

```markdown
# Vehicle Proposal — [Customer name]
**Prepared by:** [Rep name], [Dealership]
**Date:** [Today]
**Valid until:** [Today + 7 days]

---

## Your vehicle

**[Year] [Make] [Model] [Trim]** in [Colour]
[2–3 line summary of key spec highlights — not a feature dump]

---

## Investment

| Item | Amount |
|---|---|
| Vehicle price | $XX,XXX |
| On-road costs / stamp duty / CTP | $X,XXX |
| **Total drive-away** | **$XX,XXX** |

[If trade-in:]

## Trade-in

| Item | Amount |
|---|---|
| Your [Year] [Make] [Model] | -$XX,XXX |
| **Net cash to find** | **$XX,XXX** |

---

## Included

- [Inclusion 1]
- [Inclusion 2]
- [Inclusion 3]

---

## Terms

- This proposal is valid until [date] — beyond that, figures may change with market conditions and stock.
- A $[X] deposit secures the vehicle for [N] days.
- Delivery: [timeline]
- Finance: [status — "subject to bank approval" / "pre-approved" / "cash deal"]

---

## Next step

[ONE clear acceptance path — e.g.:]
Reply to this email confirming you'd like to proceed, and I'll send the deposit and paperwork details within the hour.

OR call me on [rep's number] anytime to confirm or discuss.

---

[Rep's first name]
[Rep's role], [Dealership]
[Contact details — phone, email — placeholder for rep to fill]
```

Below the proposal itself, add a brief block to the rep:

```
**Notes for the rep before you send this:**
- [anything to confirm before it goes out]
- [follow-up timing — when to chase if no reply]
- [any common pitfalls in this kind of deal]
```

## Worked example

**User input:**
> "Proposal for Dan & Priya Holland on the Outlander PHEV Aspire 7-seater white, $76k drive-away, trade-in their 2018 Pajero Sport at $24k, free first service + roof racks + all-weather mats included, finance to be sorted via their own bank, delivery by next Friday. I'm Alex at Gateway Mitsubishi."

**Good output:**

# Vehicle Proposal — Dan & Priya Holland
**Prepared by:** Alex, Gateway Mitsubishi
**Date:** [Today's date]
**Valid until:** [Today + 7 days]

---

## Your vehicle

**2024 Mitsubishi Outlander PHEV Aspire 7-Seater** in Snow White

Plug-in hybrid 7-seater built for the school run on electric and the long weekend on combined power. AWD, full safety pack including adaptive cruise and rear cross-traffic, smartphone integration, three-zone climate, and Mitsubishi's 10-year warranty when serviced through the dealer network.

---

## Investment

| Item | Amount |
|---|---|
| Vehicle (2024 Outlander PHEV Aspire 7-Seater, Snow White) | $69,990 |
| On-road costs, stamp duty, CTP, registration | $6,010 |
| **Total drive-away** | **$76,000** |

## Trade-in

| Item | Amount |
|---|---|
| Your 2018 Mitsubishi Pajero Sport | -$24,000 |
| **Net cash to find** | **$52,000** |

---

## Included

- First scheduled service complimentary
- Genuine Mitsubishi roof racks fitted prior to delivery
- All-weather floor mat set (front and rear)
- 10-year warranty when serviced through Mitsubishi's authorised network
- 8-year PHEV battery warranty
- 24/7 roadside assistance for the life of the warranty (when serviced through network)

---

## Terms

- This proposal is valid until [today + 7 days]. Beyond that, figures may change with stock availability and trade-in market conditions.
- A $500 refundable deposit secures the Snow White Aspire while finance is confirmed.
- Delivery: Friday [next Friday's date] — vehicle pre-prepped with racks and mats fitted, full tank on collection.
- Finance: arranged through your own bank — happy to provide any documentation your lender needs.

---

## Next step

Reply to this email confirming you'd like to proceed, or call me on the number below. Once confirmed, I'll send through the deposit details and we'll lock in collection for Friday.

---

Alex
Mitsubishi Sales, Gateway Mitsubishi
[Phone] · [Email]

---

**Notes for the rep before you send this:**
- Double-check the actual on-road cost split — I've estimated the $6,010 figure based on a typical NSW breakdown. Pull the real number from your DMS before sending.
- 7-day validity is the default; consider 10 days if you want extra runway for them to coordinate the bank.
- If their bank hasn't formally approved finance yet, soften the "Friday delivery" — change to "pending finance confirmation, target delivery Friday."
- Send by Tuesday afternoon at latest to give them runway. If they haven't responded by Friday, that's the cue to phone — not re-email.

## Common edge cases

- **Multi-vehicle fleet deal:** Use the same structure but add a "Total fleet investment" summary block at the top, then one vehicle section per car. Cap details per vehicle — long fleet proposals get scanned, not read.
- **Cash buyer, no finance:** Drop the "Finance" line from Terms. Replace with "Payment: cash, bank transfer, or in-house finance available on request."
- **Hold-with-deposit deal:** Add a clear separator block: "Hold terms: $500 refundable if Snow White is unavailable, applied to deposit on proceed."
- **Customer asked for two options (e.g. with/without an accessory pack):** Produce ONE proposal as the main, and a "Variant: with X" section beneath. Don't generate two parallel proposals — they always end up debating which is "real."
- **Customer is a repeat buyer / loyalty customer:** Add a one-line acknowledgement at the top: "As a returning Mitsubishi owner, [whatever the loyalty offer is — e.g., $500 loyalty credit applied]" — and reflect that in the price line.

## What NOT to do

- Don't write marketing copy. Don't describe the car as "exceptional," "cutting-edge," or "the perfect SUV." They've already chosen the car.
- Don't pad the inclusions list with things that aren't real. "Comprehensive safety features" isn't an inclusion, it's a standard feature.
- Don't bury the total drive-away figure in body text. It belongs in the table, bolded.
- Don't put two "Next step" options. One path. If they want to call instead of reply, they will.
- Don't include the rep's full name + title + qualifications + dealer awards in the signature. First name + role + dealer + contact. That's it.
- Don't quote weekly finance figures unless the rep has actually run them. Estimating finance numbers in a written proposal is how dealerships get into trouble.
