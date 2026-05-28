# Plugin: Lead Re-Engagement Playbook

A reference for re-engaging cold or dormant leads — customers who enquired months ago and went quiet, customers who bought elsewhere and might be back in market, customers whose finance fell through, etc. Drop this into your project to give Claude the framework for which dormant leads are worth re-engaging and how to do it without sounding desperate.

## When to use this plugin

Pair with:
- **follow-up-sequence** skill — when the dormant lead is >30 days quiet, this plugin shapes the sequence
- **cold-outreach** skill — for leads so old they're effectively cold again
- **sales-email-generator** — when crafting the single re-engagement message

## The re-engagement framework

Not every dormant lead is worth re-engaging. Wasted re-engagement effort damages your reputation with these prospects and burns your time. Triage first.

### Worth re-engaging (high probability of conversion)

1. **Finance-decline leads (3–6 months out):** Bank declined or pre-approval fell through. Their financial position may have changed.
2. **"Wrong timing" leads (6–12 months out):** Customer explicitly said "not now, come back to me." If they gave a real reason (new job, baby coming, end of lease, etc.), the trigger likely happened.
3. **Competitor-purchase leads (24+ months out):** They bought a competitor's car ~2 years ago. They're in the early stages of the next-purchase window.
4. **Service-customer-but-not-bought-from-us leads:** You service them but they bought new from another dealer. They already trust the building.
5. **Trade-in-vehicle-anniversary leads:** Their current car is at the 3–5 year mark. Statistically they're in the upgrade window.

### NOT worth re-engaging (effort wasted, relationship damaged)

1. **Lost deals from <3 months ago:** Too fresh. They remember why they didn't buy. Wait.
2. **"Not interested, please remove me" leads:** Honour the opt-out. Don't be the rep that comes back.
3. **Tire-kicker leads with no buying signals (price-only enquiries, no test drive, no real engagement):** They were never going to buy. Stop spending mental cycles.
4. **Leads who explicitly said why they went elsewhere (price/finance/dealer treatment) and the reason hasn't changed:** Re-engaging without solving the underlying issue is delusion.

## The re-engagement message structure

A re-engagement message is structurally different from a regular follow-up. It needs to:

1. **Acknowledge the time gap honestly** — "It's been a while" beats pretending it hasn't
2. **Reference what the trigger is to reach out NOW** — new stock, market change, vehicle anniversary, finance market shift, EOFY, etc. Don't reach out "just because"
3. **Give them an explicit easy out** — "If you've already bought / decided / moved on, just say and I'll close the file"
4. **Single low-stakes ask** — "Want me to send a quick market update on what your trade would be worth now?" beats "Are you ready to buy?"

## Template messages by trigger

### Trigger: Finance-decline lead, 6 months later

```
Hi [Name],

It's been about 6 months since we spoke about the [vehicle]. The finance market has shifted since then — rates and lender criteria are different now, and I've had a few customers who weren't approvable then come back and get through cleanly.

If you're still interested in a [vehicle/category], happy to quietly run the numbers again — no application, just a feel for whether it'd work today. If you've moved on, no worries at all, just let me know and I'll close the file.

— [Rep first name]
```

### Trigger: "Wrong timing" lead, 12 months later

```
Hi [Name],

You mentioned last [season/year] that the timing wasn't right — [whatever the reason was, in their words]. Wondering if anything's shifted in the meantime.

A [vehicle they enquired about] just arrived in [colour/trim], and I thought of you. Not pushing anything — just thought I'd flag it before it moves.

— [Rep first name]
```

### Trigger: 3-year-old previous purchase anniversary

```
Hi [Name],

Three years on from your [previous vehicle] — hope it's still serving you well. If you're starting to think about what's next, the trade-in value on yours is at a sweet spot right now. Happy to give you a quick number on what we'd offer if you're curious — no obligation.

— [Rep first name]
```

### Trigger: Competitor-purchased lead, ~2 years on

```
Hi [Name],

It's been a while — [year] when you ended up going with the [competitor model]. Hope it's worked out.

Just wanted to flag — the [your model] has had a couple of updates since you last looked. If you're starting to think about what's next, I'd be curious to hear what's worked and what hasn't with the [competitor]. No sales pitch, genuinely useful data either way.

— [Rep first name]
```

## How to use this in Claude.ai

1. Drop this REFERENCE.md into your Sales Loadout project knowledge
2. When you want to re-engage a dormant lead, prompt Claude with the lead's situation: "Re-engagement message for the Patel family — bought a Sorento 26 months ago from us, due for service next week, kids are getting older, might be looking at a 7-seater upgrade."
3. Claude will pull the right pattern from this plugin, apply the deal context, and produce the right message

## What NOT to do

- Don't re-engage at scale ("send this to every lead from 2022"). It's individual outreach, not a mailing list.
- Don't re-engage without a real trigger. "Just thought I'd reach out" reads as desperate.
- Don't reference the original deal in detail ("you came in on Saturday March 15th 2023…") — sounds creepy. "It's been a while since we spoke" is enough.
- Don't try to re-engage a lead more than once if they don't respond. One try is outreach; two tries is harassment.
