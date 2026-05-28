---
name: complaint-handler
description: Use this skill when a customer is angry, frustrated, or actively complaining — in email, chat, DM, phone follow-up note, or escalation. Triggers on phrases like "customer is furious about [X]", "complaint about [issue]", "draft a reply to this angry email", "handle this complaint", "how do I respond to this", "customer wants to speak to a manager", "customer is threatening to [chargeback / cancel / review]". Generates a structured response that absorbs the heat without being subservient, takes responsibility for what's real, declines responsibility for what's not, and moves the situation toward resolution. No corporate filler, no fake empathy, no "I understand how frustrating this must be" templates that everyone sees through.
---

# Complaint Handler

You're handling a customer complaint. Three things are simultaneously true and you have to hold all three:

1. The customer is in pain (real or perceived — both feel real to them)
2. The business has limits on what it can / should offer
3. The relationship can usually be recovered if the response is right; usually destroyed if it isn't

Most complaint-response training tells reps to "validate feelings, apologise sincerely, offer a solution." That formula produces responses customers recognise as a script — which makes them angrier. Your job is to do the same WORK without sounding like the script.

## What you need from the user

- **The customer's message** (verbatim — don't paraphrase)
- **The customer's account history** if known — order details, prior tickets, customer status, lifetime value (informs scale of response, not whether to respond)
- **What actually happened** — the back-story even if the customer doesn't have it right
- **Limits on what can be offered** — full refund / partial refund / replacement / store credit / nothing (this is the boundary)
- **Channel of the original complaint** — email / DM / chat / review (affects tone and length)
- **Your name + role** for signing off

## How to read a complaint

Before drafting, parse three things:

### 1. The substance — what actually went wrong
- A specific failure (broken product, late delivery, billing error)
- A perceived failure (customer misunderstood policy)
- A combined failure (real issue made worse by support failure)

### 2. The emotional layer — what they're feeling
- Inconvenienced (mild annoyance, expecting acknowledgement)
- Disrespected (took the issue personally, expects an apology with weight)
- Powerless (couldn't get help previously, expects to be heard)
- Vengeful (threatens chargeback / review / lawsuit — wants damage control)

### 3. The unspoken — what they actually want
- A specific outcome (refund / replacement / fix)
- Validation (acknowledgement they were right to be upset)
- Accountability (someone to own it — not "the system failed you", "we failed you")
- Future protection (assurance this won't happen again, or to others)

The right response addresses all three layers. Most reps respond only to the substance and wonder why the customer doesn't seem satisfied.

## The response structure

In some order, the response should include:

1. **Acknowledge the substance specifically.** Not "your experience" — say what actually happened. "Your serum arrived broken and you waited 4 days for a reply" beats "you had a difficult experience."
2. **Take responsibility for what's real.** If you were wrong, say so. Specifically. "The 4-day silence on our end isn't acceptable." Not "I'm sorry you feel that way."
3. **Don't take responsibility for what's not real.** If the customer is wrong about something, don't pretend they're right. Disagreement done well builds trust. "On the refund — we process within 5 business days, and your request came in Saturday so today (Tuesday) is day 2. It is coming."
4. **Name the resolution.** A specific outcome, with a specific timeline. "Refund processing today, in your account by Friday." Not "we'll look into it."
5. **Sign as a real human.** Named individual, role. Not "Customer Care Team."

## Tone discipline

- **Never start with "I'm so sorry to hear that you…"** — Universally recognised as the corporate-script opener
- **Never use "rest assured"** — Always lands as defensive
- **Never use "as per our policy"** — Hides behind rules instead of addressing the human
- **Never use "I completely understand"** — You don't, and the customer knows it
- **Do use the customer's first name** — In the body, not just the salutation
- **Do use simple sentences** — Long compound sentences in a complaint reply read as evasive
- **Do leave whitespace** — Short paragraphs, line breaks. Walls of text on an angry customer make it worse
- **Do match formality to the original** — Customer wrote casually → reply casually. Customer wrote formally → reply formally

## Output format

```
**Customer complaint:** [one-line summary]
**Their emotional layer:** [what they're feeling]
**What they want underneath:** [the unspoken ask]
**Authority / limit on the offer:** [what we can / can't do]

---

**Suggested response:**

> [the reply — properly formatted with line breaks]

**Why this works:**
- [the move you're making — what's said directly, what's said by implication]
- [what you're declining to engage with publicly]

**Internal action:**
- [process / policy / training fix that prevents this from recurring]
- [any escalation needed up the chain]
- [follow-up checkpoint — when to check this customer is sorted]
```

## Worked examples

### Example A — Justified anger, clear failure

**User input:**
> "Customer Sarah ordered Bloom Serum 3 weeks ago. Took 12 days to arrive (we had a courier issue we didn't communicate). The pump was broken on arrival. She emailed support 4 days ago, no reply. Just sent this: 'Genuinely don't know how you operate. 12 days for delivery, broken product, 4 days of silence. I want a full refund and I will be telling everyone to avoid you.' I'm Alex. We can authorise full refund + replacement (both)."

**Good output:**

**Customer complaint:** Delayed delivery + broken product + no support response (compound failure)
**Their emotional layer:** Powerless, escalating to vengeful
**What they want underneath:** Acknowledgement they were treated badly, refund, and to be heard
**Authority / limit on the offer:** Full refund + replacement both authorised

---

**Suggested response:**

> Sarah,
>
> You're right. Three things went wrong and all three are on us — the 12-day delivery (we had a courier issue we should have flagged proactively and didn't), the broken pump (our QA should have caught it), and four days of silence on support (no excuse).
>
> Full refund is processing today — you'll see it in your account by Friday.
>
> I'm also putting a replacement Bloom Serum in the post tomorrow at our cost. You don't need to send the broken one back — keep it or bin it, your call.
>
> No expectation you'll order again. If you do, my direct email is below — message me and it goes to the top of the queue.
>
> — Alex, Customer Care Lead at Birchwood
> care@birchwood-organic.example

**Why this works:**
- Opens with "You're right" — defuses the anger by removing the need for her to argue
- Names each of the three failures specifically (acknowledges the substance, takes responsibility, doesn't lump it under "your experience")
- Refund AND replacement, no negotiation — over-resolves to make the customer whole
- "No expectation you'll order again" — removes any sales agenda from the response. Sarah hears it as honest. Counter-intuitively, this is the line that most often saves the customer relationship.
- Direct email — signals continued accountability without forcing her to use it
- Doesn't apologise for the "telling everyone to avoid you" threat — would be defensive. Lets the resolution speak.

**Internal action:**
- Audit the courier issue from that delivery week — was it isolated?
- Pump QA review — same batch?
- Support queue review — process failure that allowed 4 days of silence
- Follow up with Sarah in 7 days with a personal note (no sales) to check the refund/replacement landed cleanly

---

### Example B — Customer is partially wrong

**User input:**
> "Customer says we charged him twice for the same subscription. Looking at his account: he upgraded to annual on May 15, but his old monthly subscription wasn't auto-cancelled (bug in our system), so both have charged him this month. He's furious: 'Stop charging me. Cancel everything. I want both refunds and I'm done with you guys.' I'm Jordan. Can offer: full refund of monthly charge (the duplicate), keep the annual or cancel + refund both (his choice)."

**Good output:**

**Customer complaint:** Double-billed due to system bug (annual upgrade didn't cancel the monthly)
**Their emotional layer:** Disrespected (financial harm + system failure)
**What they want underneath:** Acknowledgement, money back, certainty it won't happen again
**Authority / limit on the offer:** Refund the duplicate; he can keep annual or cancel both with refunds

---

**Suggested response:**

> Alex —
>
> You're right that you've been double-billed, and you're right to be annoyed about it. When you upgraded to annual on May 15, the monthly subscription should have auto-cancelled and didn't. That's our bug, not your fault.
>
> Refund of the duplicate monthly charge ($X) is processing now — should be in your account within 5 business days.
>
> Your choice on the annual subscription:
> - **Keep it** — your access stays active until [date], no further charges until renewal in [year]
> - **Cancel it** — full refund of the annual ($X also), prorated for any days you've used? happy to refund the full thing if you'd rather make a clean break
>
> Reply with which you'd prefer and I'll process it today.
>
> The double-billing bug has been logged with engineering and they're patching it this week so no other customer hits it.
>
> — Jordan, Customer Care at [Business]

**Why this works:**
- Doesn't promise to "cancel everything" — surfaces the actual choice rather than letting him make it under stress
- Names the bug as ours, not "the system" — accountability without evasion
- Offers full refund on annual without prorating — signals goodwill beyond the literal duplicate
- Mentions the bug is being patched — addresses the unspoken "what stops this happening again"
- Two simple options, ask him to reply — gives control back

**Internal action:**
- Confirm the engineering bug is real and being patched (not just claimed)
- Audit other customers on annual upgrades from monthly — has this happened to others?
- Process Alex's refund within the hour, not within 5 days as stated (under-promise, over-deliver)

---

### Example C — Customer is wrong (but you can't say it directly)

**User input:**
> "Customer Mira is demanding a refund for Bloom Serum because 'it doesn't work — my skin is the same after 4 days.' Our policy: 60-day money-back, no questions asked. So she's entitled to the refund. But she's also wrong that 4 days is enough to evaluate a vitamin C serum — typically takes 6-8 weeks. She seems frustrated. I'm Alex. Can authorise the refund (it's policy)."

**Good output:**

**Customer complaint:** Product didn't work in 4 days, wants refund
**Their emotional layer:** Inconvenienced + slightly let-down (modest emotional layer)
**What they want underneath:** Refund + maybe also some reassurance she didn't waste her time
**Authority / limit on the offer:** Refund within 60-day policy

---

**Suggested response:**

> Mira,
>
> Refund coming — should be in your account by Friday.
>
> Quick note for next time (with no expectation you'll try us again): vitamin C serums like Bloom take 4-6 weeks to show full results, because what they actually do is slowly build up in the skin to brighten and protect over time. The first week or two often shows nothing. If you'd ever want to give it another go — or try Resilience which works faster and differently — just let me know.
>
> Either way, glad you reached out rather than just dropping us.
>
> — Alex, Customer Care at Birchwood

**Why this works:**
- Refund first — no friction, no "are you sure?"
- "Quick note for next time" — corrects the timing expectation WITHOUT making her feel stupid, framed as "for your benefit"
- Acknowledges she might not come back
- Offers a different product (Resilience) only as one option — doesn't push
- "Glad you reached out rather than just dropping us" — implicit thanks for the feedback, treats her as a partner not a problem

**Internal action:**
- Worth checking: is the "vitamin C takes 4-6 weeks" expectation clear enough on the product page? If 4-day refund-requests are a pattern, the listing could pre-empt
- No further follow-up needed unless she replies — she got the refund cleanly

---

## Common edge cases

- **Customer is verbally abusive (slurs, threats, sustained aggression)** → respond ONCE, briefly, professionally, with the resolution if applicable. Do not continue engagement. Document and add to the do-not-engage list if needed.
- **Customer makes a threat of physical action** → escalate to legal/security, do not respond directly. Brief acknowledgement only.
- **Customer threatens chargeback** → resolve fast and over-deliver. Chargebacks cost $25-50 in fees + count against fraud rates. Resolving early is dramatically cheaper.
- **Customer threatens public review / social media** → resolve fast. Don't reference the threat in your reply. The resolution is what neutralises it.
- **Customer is a VIP or high-LTV** → same response framework, slightly more generous resolution if there's discretion. Don't change the framework, change the size.
- **Customer has complained multiple times before (legitimately)** → time to either deeply resolve or fire the customer. Don't string them along.
- **Customer has complained multiple times before (illegitimately)** → polite reply, firm boundary, no escalation of offer.
- **Repeat / serial complainers ("nothing is ever good enough")** → adjust the offer downward, not upward. Reinforce expectations.
- **B2B complaint from a contact at a client business** → CC the contact's manager only with the contact's awareness, never behind their back

## What NOT to do

- **Don't open with "I'm so sorry to hear that you had this experience."** Every customer service training course uses this. Customers see it from a mile away.
- **Don't blame internal departments to the customer.** "Our shipping team didn't…" — to them, you ARE the company. Take it as the company.
- **Don't offer multiple resolutions and ask them to pick when they're escalated.** "Would you prefer A or B?" works for calm customers. Angry customers want decisiveness — pick the best one for them, frame it as a fait accompli, leave the door open to adjust.
- **Don't apologise more than once in a response.** Multiple apologies feel performative.
- **Don't include marketing in a complaint reply.** No "and check out our 20% off code" lines.
- **Don't respond when you're emotional.** Wait an hour. Reply you'd otherwise regret.
- **Don't promise things you can't deliver.** "I'll personally make sure this never happens again" — you can't. "We're fixing the underlying bug this week" — if you actually are. Specificity matters.
