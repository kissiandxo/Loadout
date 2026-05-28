---
name: refund-return-negotiator
description: Use this skill when a customer requests a refund or return — whether the request is in-policy, edge-case, or out-of-policy. Triggers on phrases like "refund request from [name]", "customer wants to return [product]", "is this refund eligible", "draft a refund response", "they want their money back for [reason]", "out-of-policy refund — what do I say". Returns: a decision (approve / partial / decline), the customer-facing response, the financial / retention impact analysis, and any policy-level pattern signals. Balances customer retention with not training the customer base to game the refund policy.
---

# Refund / Return Negotiator

You're handling a refund or return request. The decision has three dimensions you have to balance:

1. **Policy** — what the customer is technically entitled to
2. **Relationship** — what saves the customer for future purchases
3. **Pattern** — what signal this sets for other customers asking the same thing

Cheap refunds destroy retention discipline. Stingy refunds destroy customer trust. The skill is reading the situation and picking the right move.

## What you need from the user

- **The customer's request** (verbatim — refund / return / replacement, reason given)
- **Customer's account history** — order date, product, amount, customer status (new / repeat / VIP), lifetime value if known
- **Current policy** — refund window, return shipping, restocking fees, condition requirements
- **Limits / discretion** — what can the rep authorise without escalation
- **Channel of request** — email / chat / public review (review = higher urgency)
- **Your name + role** for signing off

## How to evaluate a refund request

### Step 1 — Is it in policy?

Check: time window, product condition (if relevant), original purchase channel, anything excluded (sale items, custom orders, etc.).

If **clearly in policy** → approve. Don't argue. The friction you create now costs more than the refund itself in NPS and reviews.

If **clearly out of policy** → not automatic. Move to Step 2.

### Step 2 — If out of policy, evaluate the case

Score across:

| Factor | Lean toward approve | Lean toward decline |
|---|---|---|
| Days past window | <15 days past | >45 days past |
| Customer history | First-timer or repeat customer in good standing | Serial refunder or one-off |
| Reason given | Genuine product issue / shipping issue / changed circumstances | Buyer's remorse with no underlying issue |
| Channel | Private (email / chat) | Public (review threatening removal) |
| Customer tone | Calm + reasonable | Aggressive + entitled |
| Customer LTV | High (>$500 historic) | Low (<$100 historic) |
| Risk of public escalation | High | Low |
| Pattern: same reason from others? | Yes (likely product issue) | No (one-off) |

3+ "lean toward approve" factors → approve, frame it as a one-time goodwill thing.
3+ "lean toward decline" factors → decline carefully, offer alternative (store credit / future discount).
Mixed → use partial refund or replacement-only options.

### Step 3 — Decide the offer

Four levels of generosity:

- **Full refund + no return needed** — Use for: clear product defect with proof, shipping damage, customer service failure
- **Full refund with return** — Use for: standard returns, change of mind within policy
- **Partial refund / store credit** — Use for: edge cases, late returns, partial dissatisfaction
- **Decline + alternative offer** — Use for: clearly out-of-policy, no good faith reason

## How to write the response

### When approving

- Open with the decision. Don't bury it.
- Don't make the customer "earn" the refund with proof / forms / hoops if there's any way to avoid it
- Be specific on timing: "in your account within 5 business days" — not "we'll process shortly"
- Acknowledge what went wrong if it was on you
- Don't include marketing or discount-for-next-time codes (reads as guilt money)

### When partial / store credit

- Explain the reasoning in one sentence (not a paragraph)
- Frame the alternative as a CHOICE, not a consolation prize
- Make it easy for them to escalate if they're not happy

### When declining

- Open with the decision, but not bluntly. Lead with one line of acknowledgement, then the decision, then the reason, then the alternative.
- Never use "as per our policy" — explain in human terms
- Always offer SOMETHING — store credit, future discount, a smaller refund — so the customer isn't walking away empty-handed when the relationship still has value
- Make clear they can ask for review by a manager if they want — don't trap them in your decision

## Output format

```
**Customer:** [Name + history]
**Request:** [what + why + amount]
**Decision:** [Approve full / Approve with return / Partial / Store credit / Decline]
**Reasoning:** [one line — why this decision]

---

**Customer-facing response:**

> [the reply, properly formatted]

— [Rep name]

---

**Financial impact:** $[X] refund + $[Y] in retention value protected (or lost)
**Pattern signal:** [is this a one-off, or should we look at the policy / product / process?]
**Internal action:** [process / policy / product fix if any]
**Follow-up:** [check this customer's status in 30 days? send a personal note? close the file?]
```

## Worked examples

### Example A — In policy, no friction

**User input:**
> "Customer Mira ordered the Bloom Serum 12 days ago. Says it's not working for her and wants to return for refund. Our policy: 60-day money-back. Standard refund window. Her tone: calm and polite. First-time customer. I'm Alex."

**Customer:** Mira · first-time customer · 12 days into 60-day window
**Request:** Refund for Bloom Serum, reason: product not working for her, ~$45
**Decision:** Approve full refund
**Reasoning:** Cleanly in policy. No reason to add friction.

**Customer-facing response:**

> Mira,
>
> All sorted — refund processing today. You'll see it in your account by Friday.
>
> Don't need the bottle back — keep it or bin it, whichever's easier.
>
> If you ever want to try Resilience instead (the moisturiser — different mechanism, faster results), no pressure. Reach me directly at care@example.com if so.
>
> — Alex, Customer Care at Birchwood

**Financial impact:** $45 refund + minimal retention value loss (she's a first-timer with low historic LTV; clean refund preserves future potential)
**Pattern signal:** "Not working" within 12 days is the same pattern as Example C in the Complaint Handler skill — suggests product page should set the 4-6 week expectation more clearly
**Internal action:** None unique to Mira; reinforces the broader product-page expectation pattern
**Follow-up:** None unless she replies

---

### Example B — Out of policy, lean approve

**User input:**
> "Customer Jordan ordered Resilience Moisturiser 75 days ago. Just emailed wanting a refund — says it gave them a rash and they only opened it a week ago. We've been in operation 3 years, this is their 4th order with us ($380 total spend). Policy is 60 days. Their tone is reasonable, slightly apologetic for the delay. They sent a photo, the rash looks real. I'm Taylor."

**Customer:** Jordan · 4th order, $380 LTV, in good standing · 15 days past the 60-day window
**Request:** Refund for Resilience Moisturiser ($55) — adverse skin reaction, only opened recently
**Decision:** Approve full refund + no return needed
**Reasoning:** 4 of 8 "lean toward approve" factors (history good, reason genuine/health-related, calm tone, high-ish LTV). 15 days past window is light. Photo evidence is real. The downside of approving is $55. The downside of declining a long-standing customer with a real skin reaction is reputational. Easy call.

**Customer-facing response:**

> Jordan,
>
> Sorry — that reaction is exactly what we don't want to hear about.
>
> Refund processing today, you'll have it by Friday. I'm waiving the 60-day window — health reactions don't fit cleanly into a calendar.
>
> Don't return the bottle. If you've still got it, I'd actually like to know which batch number is on the bottom (small printed code) for our records — helps us check if anyone else has flagged the same. No pressure if you've already binned it.
>
> If you'd like, I can pull together a couple of our gentler formulations that some folks with similar reactions have moved across to — happy to send the comparison if useful. But no rush, and absolutely no expectation.
>
> — Taylor, Customer Care at Birchwood

**Financial impact:** $55 refund + ~$200 in projected future LTV protected (4-time buyer is worth the goodwill)
**Pattern signal:** WORTH checking if other customers from the same batch reported reactions — request batch number politely as part of the response
**Internal action:** Log the reaction in the product safety tracker; if a second customer reports same batch, escalate to a product review
**Follow-up:** 14 days — quick "how's your skin doing now?" note. If Jordan tries another product, mark VIP-trust internally.

---

### Example C — Out of policy, decline with alternative

**User input:**
> "Customer Riley ordered Bloom Serum 120 days ago. Just emailed: 'I never opened it. Found it in a drawer. Want a refund.' First-time customer, $45 order. Tone is matter-of-fact, no specific reason. Our policy is 60 days. I'm Alex."

**Customer:** Riley · first-time · 60 days past the 60-day window (i.e., 4 months from order date)
**Request:** Refund for unopened Bloom Serum, no reason beyond "found it in a drawer"
**Decision:** Decline refund, offer store credit at a discount
**Reasoning:** 5 of 8 "lean toward decline" factors (way past window, first-timer / low LTV, no underlying issue, calm/dispassionate tone, low public-escalation risk). Approving would set a precedent that "I forgot about it" is a refundable scenario. But declining empty-handed loses any future relationship.

**Customer-facing response:**

> Riley,
>
> Honestly — at 4 months past the order date, this falls outside what we can refund. The 60-day window is generous by industry standards and we hold it firmly because going outside it would mean every customer's drawer is technically a return queue, and the math doesn't work for us at the scale we are.
>
> What I can do: $30 store credit toward a future order — that's the value if you'd ever like to give it (or anything else from us) another go.
>
> If that doesn't suit, I get it — no hard feelings. Either way, thanks for reaching out.
>
> — Alex, Customer Care at Birchwood

**Financial impact:** $0 refund + $30 store credit issued (only used if redeemed). Pattern protection > short-term retention.
**Pattern signal:** Standard "forgot about it" request — confirms the policy boundary is the right one
**Internal action:** None
**Follow-up:** None unless Riley replies. If they push back, the second response stays firm but escalates the offer to $45 store credit (matches order value); third response would be the cap.

---

### Example D — Public review threat

**User input:**
> "Customer Mira (different Mira) bought $200 of products 35 days ago. Now wants to return everything because 'changed my mind about the brand after reading some Reddit thread.' Tone is mildly aggressive. Says she'll leave a 1-star Trustpilot review if we don't refund. First-time customer. I'm Alex. Policy is 60 days, so technically in window — but conditional on products being unopened. Five of the six products she's returning have been opened."

**Customer:** Mira · first-time customer · 35 days · in window timewise · out of policy on condition (5/6 products opened)
**Request:** Full refund for $200 of products, mostly opened
**Decision:** Approve partial refund (full on the unopened one, 50% on the opened five)
**Reasoning:** Public-review threat raises urgency, but capitulating fully trains every future customer that threats unlock refunds. Splitting the difference is honest: unopened = full policy refund. Opened = goodwill-only partial (we'd never resell opened skincare). She'll either accept or escalate to the review — but the response will look reasonable to anyone who reads the resulting review.

**Customer-facing response:**

> Mira,
>
> Here's where I can land:
>
> For the one unopened product, full refund — that's standard within our 60-day policy. Comes to $X.
>
> For the five opened products: we can't resell or restock them, so a full refund isn't possible. What I can offer is a 50% goodwill refund on those five — comes to $Y. Total refund across the lot: $Z.
>
> If that doesn't work for you, the unopened-only refund stands. Either way, I'll process whichever path you choose today.
>
> If you'd like to leave a review afterward, I won't ask you not to — your call. But this is the offer that's fair to both of us.
>
> — Alex, Customer Care at Birchwood

**Financial impact:** ~$X + 50% of ~$Y = significant partial refund. Costs less than a full refund + protects the relationship + signals firmness for any future similar request.
**Pattern signal:** "Changed my mind after a Reddit thread" with mostly-opened products is buyer's remorse + leverage attempt. Note the customer to watch for repeat patterns.
**Internal action:** None. The response handles itself.
**Follow-up:** Monitor Trustpilot for next 30 days. If Mira posts a 1-star, respond per the Review Response Generator skill — calm, factual, refer to the offer made.

---

## Common edge cases

- **Customer ordered for someone else (gift)** → assume the recipient's experience is the relevant one. Apply policy as if the recipient were the customer.
- **Customer returns after using most of the product** → low-bar partial refund if any. "Most of the product consumed" is a tough position to take a full refund on.
- **Subscription cancellation + refund request together** → handle separately. Cancel the sub immediately (no friction). Evaluate the refund on its merits.
- **Customer requests refund + replacement** → unusual. Usually one or the other. Probe: "Want the refund OR the replacement — both wouldn't be fair to either of us."
- **Returns shipping is more expensive than the product** → eat the cost or tell them to keep/destroy. Don't make a customer pay $15 to return a $10 item.
- **Customer bought during a sale** → refund at the sale price (what they paid), not full retail. State this explicitly to avoid confusion.

## What NOT to do

- **Don't make the customer pay for return shipping on a product that was YOUR error.** Wrong product / damaged / defective = our cost.
- **Don't require photos / proof for everything.** Trust-but-verify — proof only on high-value claims or repeated patterns.
- **Don't use "I'll need to check with my manager" as a delay tactic.** If you can't authorise, escalate and say so. Don't pretend.
- **Don't apologise for the policy itself.** Policies exist for a reason. Apologise for the customer's frustration, but stand behind the policy.
- **Don't include a "shop again" CTA in a refund email.** Reads as crass.
- **Don't offer store credit at face value as a "compromise" when you're declining a refund.** It's not a compromise — it's a downgrade. Be honest about that.
