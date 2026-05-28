---
name: vip-customer-manager
description: Use this skill to identify, segment, and personally engage VIP customers — the small percentage of buyers who drive a disproportionate share of revenue, referrals, or strategic value. Triggers on phrases like "VIP customer outreach for [name]", "draft a VIP-tier email", "we should reach out to our top 20 customers — what do I send", "personalised touch for our highest-value customers", "thank-you email to a VIP", "how do I segment my VIPs". Returns: VIP-tier outreach drafts that DON'T feel like marketing automation. Calibrated for revenue-VIPs (high LTV), referral-VIPs (high influence), and strategic-VIPs (logo / case study / partnership value). The goal is making the customer feel seen, not "managed."
---

# VIP Customer Manager

You're handling the small group of customers who matter disproportionately. Three different reasons a customer can be a VIP, and the right outreach is different for each:

- **Revenue VIPs:** Top 5-10% by lifetime value. Treat with proactive personal attention to retain.
- **Referral VIPs:** Have driven others to sign up. Treat with appreciation that converts them into formal advocates.
- **Strategic VIPs:** Logos, influencers, case-study candidates. Treat as a real relationship — light touch but consistent.

The mistake businesses make: lumping these into a generic "loyalty program" with the same emails as everyone else. VIPs notice when they're being treated like everyone else and stop being VIPs.

## What you need from the user

- **Which kind of VIP** — revenue / referral / strategic / mixed
- **Customer details** — name, what they've bought, how long they've been a customer, LTV if known
- **Specific occasion / trigger** — milestone (e.g., 12-month customer anniversary), behavior (e.g., 5th order placed), or proactive (e.g., quarterly check-in)
- **What you can offer / extend** — early access, exclusive access, a real perk (not a 10%-off code), a direct line to leadership
- **Your name + role** for signature

## How to segment VIPs

If the user doesn't already have a VIP list, suggest this segmentation rule:

```
Revenue VIPs = top 5% by lifetime value OR customers with >$1,000 LTV (whichever is more inclusive)
Referral VIPs = customers who have driven 3+ confirmed referrals OR have publicly endorsed (review, social post, podcast mention)
Strategic VIPs = customers whose logo, name, or testimonial would meaningfully move the business — even if their direct revenue is low
```

A single customer can be all three. The outreach pattern varies by which dimension you're activating.

## How to write VIP outreach

### Universal principles

1. **Reference specifics.** A VIP email that doesn't reference what they bought, what they said, or who they are reads as generic — and is worse than no email at all.
2. **Don't ask for anything in the first VIP touch.** Pure appreciation or pure value. Asks come later.
3. **Sign as a real human — ideally a founder or senior leader.** "Care Team" doesn't fly at VIP level.
4. **Match length to the relationship.** Email a 2-year customer with 4 paragraphs is appropriate. Email a 1-month customer with 4 paragraphs reads as effort that hasn't been earned.

### Revenue VIP outreach

The job: make them feel seen for the value they bring. The unlock: they keep buying, and they tell others.

Standard arc:
1. **Acknowledgement touch** — proactively, on an occasion (anniversary, milestone, recent purchase)
2. **Value-add touch** — give them something genuinely useful that non-VIPs don't get (early access, a heads-up, a direct number)
3. **Personal ask touch** — only after relationship is real: feedback, testimonial, beta invite

### Referral VIP outreach

The job: convert appreciation into formalised advocacy. The unlock: they become a repeat referrer.

Standard arc:
1. **Recognition** — name the referrals specifically, thank them
2. **Formalise** — invite them into a (real, valuable) referral program with proper rewards
3. **Provide ammunition** — share-ready content they can use easily

### Strategic VIP outreach

The job: build a real relationship over time. The unlock: they become a public reference, a case study, or a strategic partner.

Standard arc:
1. **Light-touch quarterly check-ins** — no asks, just genuine relationship-building
2. **Selective value** — invite to private events, share roadmap previews, ask for opinion (not a yes)
3. **The Big Ask** when timing is right — case study, joint marketing, advisory role

## Output format

```
**VIP:** [Name + type + key facts]
**Occasion:** [the trigger / milestone for outreach]
**Goal of this touch:** [retention / referral conversion / strategic relationship / appreciation]

---

**Suggested email:**

> [the message, properly formatted]

— [Rep name + role]

---

**Why this works:**
- [the specific moves]
- [what's deliberately not included]

**Next touch if positive response:**
- [the next step in the arc]

**Next touch if no response:**
- [soft follow-up only — no second VIP-touch in the same month]

**Internal note:**
- [anything to log about this VIP for future personalisation]
```

## Worked examples

### Example A — Revenue VIP, 12-month anniversary

**User input:**
> "VIP outreach. Customer Jordan has been with us 12 months as of today. SaaS product, $99/mo plan. They've stayed on plan the entire time, never had a support ticket open beyond 1 day, mentioned us positively on Twitter once 4 months back. Total LTV: $1,188. I'm Alex, the founder."

**VIP:** Jordan · revenue VIP (top tier by tenure + plan) · also light referral VIP (single public mention)
**Occasion:** 12-month customer anniversary today
**Goal of this touch:** Retention + appreciation (no ask)

---

**Suggested email:**

> Jordan,
>
> Quick note — today's your 12-month anniversary with us. Easy to overlook from your side; we don't overlook it from ours.
>
> You're in a group of about [N] customers who've been with us this long and stayed on the [plan] continuously. Practically that means you've been around longer than three of our team and seen us ship [N] product updates. The system runs better because customers like you stuck through the rough patches.
>
> Two things, no asks attached:
>
> 1. I saw the Twitter post from a few months back — wanted to thank you for that directly. Customers writing about us in their own words moves the needle in ways our marketing never will.
> 2. If there's ever something you wish we did differently, my direct email is below. Doesn't have to be feedback that benefits us — sometimes the best signal is what's slightly off but not worth a support ticket.
>
> Glad you're here.
>
> — Alex, Founder
> alex@example.com

---

**Why this works:**
- Named the Twitter post specifically — proves real attention, not automation
- "You're in a group of about N customers" — VIP-tier framing without literal "VIP" language
- TWO things, NO asks — the structure makes the appreciation feel real
- Founder signature with direct email — only deployable to revenue VIPs (founders can't direct-email everyone)
- Doesn't include any product upsell / "would love to chat about your use case" / "are you on the right plan"

**Next touch if positive response:**
- If Jordan replies → reply within the day, treat as the start of a real conversation
- If Jordan mentions something specific to fix or improve → fix it AND let them know it's fixed

**Next touch if no response:**
- None for 90 days. Then a value-add touch (early access to a new feature, or a relevant piece of insight)

**Internal note:** Tag Jordan as "12-mo + public-mention VIP". Add to quarterly founder-touch list. If churn signals appear (downgrade, declining usage, etc.), Alex should personally outreach.

---

### Example B — Referral VIP

**User input:**
> "Reach out to Taylor — they've referred 4 customers in the last 6 months, all signed up and active. They never asked for a referral fee. Brand voice: warm + slightly playful. I'm Jordan, head of growth."

**VIP:** Taylor · referral VIP (4 confirmed referrals, no formal program participation)
**Occasion:** Proactive — they've quietly driven significant new revenue and haven't been thanked
**Goal of this touch:** Recognise and formalise — invite them into the referral structure

---

**Suggested email:**

> Taylor,
>
> Found out yesterday that four of our newer customers signed up after talking to you. Across six months. Quietly, no fanfare from your end.
>
> That's worth saying out loud — thank you, properly.
>
> A couple of things I'd like to do:
>
> 1. Formally credit you in our referral program — that means $X/referral going forward, retroactive on the four you've already done. Comes to a [$Y] credit on your account, or a payout if you'd rather (your call)
> 2. If you've got a few people in your network who'd benefit from us, here's a clean referral link you can share — gives them a discount, gives you the credit automatically: [link]
> 3. Open invite — coffee / call / whatever — if you'd want to chat about what you're seeing in [their industry / role]. I'm always interested in what someone like you finds working
>
> No pressure on the third thing. Genuinely grateful for the first two.
>
> — Jordan, Head of Growth

---

**Why this works:**
- Opens with the specific number (4 referrals in 6 months) — proves you actually know
- "Quietly, no fanfare from your end" — acknowledges they didn't ask for credit, which earns trust
- THREE things — payment, link, conversation — escalating in commitment, so they can engage with whichever feels right
- "If you'd rather a payout" — control given to the customer
- The conversation offer is genuine (founder/leader access) but framed as "no pressure"

**Next touch if positive response:**
- If Taylor opts for payout → process it within 48 hours, no friction
- If Taylor takes the conversation → it's a real founder/growth conversation, not a structured pitch
- If Taylor uses the link → confirm + apply credit automatically when used

**Internal note:** Add Taylor to formal referral program ledger. Document the customer pattern (no formal incentive, organic referrals) — this is the "best case" referral profile, worth studying

---

### Example C — Strategic VIP (logo-value customer)

**User input:**
> "We have a customer — let's call them Coordinated Studio — that's a 12-person design agency in Melbourne. They're on our lowest plan ($29/mo) so not big revenue, but their logo on our 'customers' wall would mean a lot, and they're well-known in our target market. They've been a customer for 5 months. Quiet user — no tickets, moderate usage. Brand voice: professional. I'm Alex, founder."

**VIP:** Coordinated Studio · strategic VIP (logo + market presence) · low revenue VIP
**Occasion:** Proactive quarterly check-in, no specific trigger
**Goal of this touch:** Begin a real relationship — first step in the strategic VIP arc

---

**Suggested email:**

> [Primary contact name],
>
> Alex from [our business] — five months in to your team using us. Wanted to reach out personally rather than letting it stay quietly in the background.
>
> Two reasons, both honest:
>
> First, I'm curious — what's working and what isn't from your side? Coordinated does the kind of work I'd hope our tool quietly helps with rather than gets in the way of, and I genuinely want to know if we're there yet for you.
>
> Second, the [our business] team will be in Melbourne in [month] for [event/reason]. Worth a coffee? No agenda, no pitch — I'm actually trying to spend time with the kinds of teams we want to keep getting better at serving, and yours is on that list.
>
> Either way, glad we get to be part of how Coordinated works.
>
> — Alex, Founder
> alex@example.com

---

**Why this works:**
- "Wanted to reach out personally" — names the rarity of founder outreach explicitly
- TWO honest reasons — the curiosity + the coffee — both legitimate, neither commercial
- "Coordinated does the kind of work I'd hope our tool quietly helps with" — references their work specifically, signals real attention
- The coffee invite has a real reason (in Melbourne anyway) — no fake "I'm coming to Melbourne specifically to see you"
- No ask, no upgrade pitch, no testimonial request

**Next touch if positive response:**
- If they reply with feedback → engage substantively
- If they accept the coffee → it's a real conversation, not a sales call
- The testimonial / case study ask comes 6-12 months in, after relationship is built

**Next touch if no response:**
- 90 days, with a similarly low-pressure note. Maybe tied to a relevant launch / event they'd care about

**Internal note:** Coordinated Studio = strategic-VIP track. Quarterly founder touch. Document their use case quietly so a case study can be assembled when timing is right.

---

## Common edge cases

- **Customer is both revenue + referral + strategic VIP** → ONE touch that combines all three, framed primarily around the most active dimension
- **VIP customer has just had a bad experience** → handle the bad experience FIRST (complaint-handler skill). VIP outreach happens after resolution, sometimes referencing the bounce-back as a moment to acknowledge
- **VIP customer is leaving / churning** → escalate immediately to a save conversation (cancellation-save skill) — don't send a VIP appreciation email to someone about to cancel
- **VIP customer has been quiet for 60+ days** → could be normal (they bought what they needed and don't need ongoing engagement) or could be early churn signal. Send a "still seeing value?" check-in framed as care, not survey
- **Multiple contacts at a B2B VIP account** → the primary contact gets the primary outreach. Secondary contacts can get lighter touches but not from the founder (cheapens the signal)

## What NOT to do

- **Don't use the word "VIP" externally.** Customers find it transactional. "Most loyal customers" / "longest-standing customers" / specific naming beats the corporate label
- **Don't run VIP outreach via marketing automation.** The whole point is it doesn't feel automated. If you're using a tool, customise per customer
- **Don't bundle multiple asks** (testimonial + case study + referral + survey) into a single touch
- **Don't promise leadership access if you can't deliver.** "My direct email is below" only works if the founder actually reads and replies
- **Don't run VIP campaigns to revenue-VIPs at scale** (e.g., "all customers above $1k LTV") unless every email can carry weight. Better to do 20 personalised emails properly than 200 templated ones
- **Don't measure VIP outreach by short-term conversion metrics.** Strategic VIP work pays back in years, not weeks
