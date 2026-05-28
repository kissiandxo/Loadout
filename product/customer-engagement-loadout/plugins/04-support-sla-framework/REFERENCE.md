# Plugin: Support SLA Framework

A practical framework for defining and meeting customer support response time commitments. Establishes severity levels, response targets, and the difference between "first response" and "resolution" — both of which matter.

## When to use this plugin

Pair with:
- **support-ticket-router** (priority assignment + SLA on each ticket)
- **complaint-handler** (SLA awareness while writing the response)
- **escalation-matrix** (response time at each escalation level)

## The four severity levels

### S0 — Critical
- **Definition:** Customer is actively blocked from using the product OR facing financial harm OR a safety/security issue is present
- **Examples:** Payment failed and locked out of account, security breach affecting customer's data, accessibility issue blocking use, urgent legal matter
- **First response SLA:** 1 hour (business hours), 4 hours (off-hours)
- **Resolution target:** Same business day where possible
- **Channel options:** Phone available, chat priority, email within hour

### S1 — High
- **Definition:** Customer can use the product but a meaningful feature is broken / paid customer facing a real problem / publicly visible escalation risk
- **Examples:** Specific feature crashing for paid customer, billing issue affecting service, customer threatening public review
- **First response SLA:** 4 business hours
- **Resolution target:** Within 24 business hours
- **Channel options:** Chat available, email priority

### S2 — Medium (default)
- **Definition:** Normal support requests — questions, help, standard issues
- **Examples:** How-to questions, account changes, standard returns, FAQ-adjacent queries
- **First response SLA:** 24 business hours
- **Resolution target:** Within 48 business hours
- **Channel options:** Email standard, chat available

### S3 — Low
- **Definition:** Informational, FAQ-deflectable, no time-sensitivity
- **Examples:** Future-state questions, feedback, general inquiries, FAQs the customer didn't find
- **First response SLA:** 48 business hours
- **Resolution target:** Within 5 business days OR via FAQ link
- **Channel options:** Email only, or auto-response with FAQ link

## "First response" vs "Resolution"

These are different metrics and both matter.

**First response time:** From when the customer's message arrives to when a real human (or genuinely useful automation) acknowledges it. This is what customers feel most acutely.

**Resolution time:** From when the customer's message arrives to when their issue is fully resolved. This can be much longer than first response, and that's okay IF the customer is kept informed.

The biggest customer experience win: tight first response + transparent communication during longer resolutions.

Bad pattern: Tight first response that says "we'll get back to you" with no specific information, followed by silence.

Good pattern: Tight first response that says specifically what's being investigated + when the next update will arrive, even if resolution takes days.

## SLA-violation handling

When you can't meet an SLA, the response matters more than the miss.

**Do:** Send an acknowledgement BEFORE the SLA expires, with a specific revised timeline. "Reaching out before your 24-hour mark — we're still investigating, expecting to have an answer by [specific time]."

**Don't:** Let the SLA expire silently. Customer experience degrades exponentially after the expected response time passes.

## Communicating SLAs to customers

Some businesses publish SLAs publicly (B2B SaaS often does); most consumer brands don't. Three patterns:

### Pattern A — Public SLA commitment (B2B)
On your support page: "Standard support: 24-hour response. Priority support: 4-hour response. Critical issues: 1-hour response."

Benefits: Sets expectations, signals professionalism, can support sales conversations.

### Pattern B — Implicit SLA via auto-acknowledgement (most common)
Customer emails support → auto-reply confirms receipt + sets expectation ("Hi [Name], we've received your message. Most queries are answered within 24 hours, complex ones within 48").

Benefits: Sets expectations without commitment, easier to maintain operationally.

### Pattern C — No public SLA, internal targets only
Internal team has SLA targets, customer doesn't see them. Service is delivered fast as a quiet quality signal.

Benefits: Maximum flexibility, no commitment liability.

Choose based on your customer expectations and operational maturity.

## Business hours vs 24/7

Different businesses set different "support hours" expectations. Be explicit.

**Common patterns:**
- **B2B SaaS:** Business hours Mon-Fri in primary timezone. Critical issues sometimes 24/7 via separate phone/email.
- **E-commerce:** Often Mon-Fri 9-5, occasionally Sat morning for holiday peaks.
- **Consumer services:** Increasingly 7-day support including evening hours for chat.

Communicate your hours clearly on the support page. Customers tolerate "we're closed weekends" if they know it in advance. They don't tolerate silence after they send a Saturday email.

## After-hours auto-response template

```
Hi [Name],

Thanks for reaching out — we've received your message.

Our support hours are Mon-Fri, 9am-6pm [timezone]. Your message is in the queue and we'll be in touch within [first business hour, e.g., "9am tomorrow"] with either a full response or an update on timing.

If this is urgent (security, safety, or critical financial issue), please reply with "URGENT" in the subject and we'll surface it to on-call.

[For known long-resolution issues: For [common issue], here's our guide that may help in the meantime: [link]]

Speak soon,
[Auto-signature]
```

## SLA tracking — what to measure

For internal team management:

| Metric | Why it matters |
|---|---|
| **First response time (median + P90)** | Customer experience signal — P90 reveals outliers |
| **Resolution time (median + P90)** | Operational efficiency signal |
| **SLA compliance rate per tier** | How often you meet the commitment |
| **Re-open rate** | Quality signal — did the resolution actually resolve? |
| **First-contact resolution rate** | % of tickets resolved without back-and-forth |
| **Customer satisfaction (CSAT) per ticket** | Closes the loop — was the experience actually good? |

P90 (90th percentile) is usually a more useful metric than average — it tells you about the worst 10% of customer experiences.

## When NOT to apply SLAs rigidly

- **Emotional complaints** — sometimes a 30-minute delay to compose the right response is better than a fast bad one
- **Complex billing disputes** — investigation time matters more than first-response speed
- **Long-form support conversations** — customer-facing turn-around vs internal investigation are different metrics

For these, communicate to the customer that you're prioritising getting it RIGHT over getting it FAST.

## Common edge cases

- **Customer floods support with multiple tickets on same issue** → consolidate into one, respond to all once. Don't make each ticket compete for SLA time.
- **Customer is in a different timezone and your "24 hour response" is overnight on their side** → adjust SLA messaging to reference business hours, not absolute time
- **Customer's first contact escalates while in queue** → re-prioritise immediately even mid-cycle. Don't make them wait their original SLA if the situation has changed
- **Holiday / public holiday queue** → publish holiday support windows in advance ("Limited support Dec 24-Jan 2, urgent issues only via [channel]")
- **Major incident affecting many customers** → status page + proactive comms beat individual SLA responses. Don't try to first-respond to 500 tickets — send a broadcast update.

## What NOT to do

- **Don't set SLAs you can't meet.** Internal targets you miss occasionally are fine; public commitments you miss damage trust.
- **Don't use SLA as the only quality measure.** Fast bad responses are worse than slow good ones.
- **Don't make SLAs identical across customer tiers.** Free users and enterprise customers can fairly have different commitments.
- **Don't auto-close tickets without resolution to hit SLA stats.** Common abuse, easily detected by customers.
- **Don't measure team performance on SLA alone.** Pair with CSAT and re-open rates so reps don't game the metric.
