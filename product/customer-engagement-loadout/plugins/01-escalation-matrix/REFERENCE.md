# Plugin: Escalation Matrix

A clear framework for deciding who handles what, when to escalate, and what the customer should hear at each level. Loaded into your customer engagement project, this gives Claude (and your team) consistent escalation discipline.

## When to use this plugin

Pair with:
- **support-ticket-router** — for triage classification + routing decision
- **complaint-handler** — for high-emotion situations
- **cancellation-save** — for retention conversations
- **vip-customer-manager** — for VIP escalations

## The 4-level escalation model

Use this regardless of company size. Adjust who fills each role based on your team.

### Level 1 — Frontline (default)
- **Who:** Support rep / customer service agent / chatbot
- **Handles:** Standard tickets (FAQ-deflectable, basic billing, normal returns, account questions)
- **Authority:** Process documented refunds, exchanges, plan changes; answer documented questions; route to the right team
- **What the customer hears:** "I've got this — let me sort it out for you."
- **When to escalate up:** Customer asks for manager / customer has been escalating in tone / decision falls outside frontline authority / repeat ticket without resolution

### Level 2 — Team Lead / Senior Agent
- **Who:** Team lead / senior CS agent / shift lead
- **Handles:** Out-of-policy goodwill decisions, complex billing disputes, repeat tickets, customer-of-record relationships with named individuals
- **Authority:** Authorise up to $X in goodwill credits/refunds, override standard policy with documentation, write tone-matched responses to angry customers
- **What the customer hears:** "I've taken this over from [name]. Here's what I can do for you specifically."
- **When to escalate up:** Public escalation risk (review threat, social media), legal language, financial harm beyond standard, requests that need manager authority

### Level 3 — Manager / Head of CS
- **Who:** Customer Service Manager / Head of Customer / VP of Customer
- **Handles:** Chargebacks, legal threats, public-facing brand risks, large refund decisions, VIP customer escalations, policy exception decisions
- **Authority:** Full refund/credit authority, policy override, can offer non-standard remedies (custom solutions, direct founder access)
- **What the customer hears:** "I'm [name], [role] at [company]. I've stepped in personally to make this right."
- **When to escalate up:** Active legal action, regulatory issues, PR / press involvement, founder-level relationships, strategic customer at risk

### Level 4 — Founder / Executive
- **Who:** Founder / CEO / executive sponsor
- **Handles:** Existential brand-risk situations, top-tier strategic relationships, customers with influence over the company's market position
- **Authority:** Anything
- **What the customer hears:** Direct founder email, occasionally direct call
- **When to escalate up:** Nowhere — this is the top

## Escalation triggers (in priority order)

If ANY of these signals appear in a ticket, escalate up immediately — don't wait for the customer to ask:

| Trigger | Escalate to |
|---|---|
| Customer mentions legal action / "lawyer" / "lawsuit" / "regulator" | Level 3 |
| Customer mentions chargeback / dispute / "bank" | Level 2 |
| Customer mentions public review specifically (Trustpilot / Yelp / X / news) | Level 2 |
| Customer mentions safety / injury / harm | Level 3 |
| Customer mentions journalist / press | Level 3 |
| Repeat ticket — 3rd contact on same unresolved issue | Level 2 |
| Customer LTV >$5,000 OR strategic account | Level 2 minimum, Level 3 for active risk |
| Customer using slurs, threats, or sustained abusive language | Level 2 (different handling — boundary setting) |
| Self-harm mentions | Level 3 (with safety resources) |

## How to escalate cleanly

When passing UP a level, send the receiving person:

1. **The customer's situation in 3 sentences** — what happened, what they want, what's been done
2. **The last reply you sent them** (paste verbatim — don't paraphrase)
3. **Your read on their emotional state** — calm + angry / escalating / panicking / disengaging
4. **Recommended action** — what you'd do if you had the authority
5. **Time pressure** — when does this need to be handled by?

The receiving person reads the email once, makes a decision, replies to the customer. They don't re-read the entire ticket history unless something doesn't add up.

## How NOT to escalate

- **Don't escalate to make the angry customer go away.** If you can handle it at your level with authority you have, handle it. Escalation that should have been frontline frustrates everyone.
- **Don't escalate without notifying the customer.** "I'm bringing in [name]" beats silent handoff.
- **Don't escalate to a manager who can't actually authorise the decision.** Skip the level if the next person up can't help either.
- **Don't escalate angry customers without a heads-up to the receiving person.** "Heads up — this customer is at 8/10 anger" preps the receiver.

## Internal SLAs on escalation response time

| Level | Internal response time | Customer-facing first response |
|---|---|---|
| L1 → L2 | 30 minutes | 2 hours from original |
| L2 → L3 | 1 hour | 4 hours from original |
| L3 → L4 | 4 hours | 24 hours from original |

If an escalation can't be picked up in this window, the receiving person sends an acknowledgement: "I've got this, working on it, full reply within [window]."

## Common edge cases

- **Customer escalates themselves by emailing the founder directly** → Founder forwards to the appropriate level + replies acknowledging receipt. Don't pass through the same ticket twice.
- **Customer requests "your manager" but the situation doesn't warrant escalation** → Escalate anyway, but L2 should be coached to validate L1's original response rather than reverse it. Customers asking for "the manager" usually want to be HEARD, not overruled.
- **Multiple agents involved in the same ticket** → ONE person owns it. The owner is whoever last responded. Hand-offs documented in the ticket.
- **Escalation across timezones** → Each level has a clear "out of hours" backup or 24-hour SLA. Don't let escalations sit overnight without acknowledgement.

## What NOT to put in writing

When escalating UP, some things should go in the ticket notes but NOT in customer-facing communication:
- Internal frustrations ("this customer is impossible")
- Speculation about customer mental state beyond observable behaviour
- Cost-of-customer calculations
- Any judgment about whether they "deserve" the resolution

The customer can request their data under privacy regulations. Anything you write could be quoted back. Write internal notes as if the customer might read them.
