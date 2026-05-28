# Plugin: Review Handling Playbook

A practical reference for monitoring, responding to, and learning from customer reviews across platforms. Goes beyond "respond to reviews" — covers the whole review lifecycle from soliciting to surfacing patterns.

## When to use this plugin

Pair with:
- **review-response-generator** (drafting specific responses)
- **support-ticket-router** (when complaints come via reviews, not support)
- **vip-customer-manager** (when promoters are also reviewers)

## The platforms that matter (and the differences)

Each platform has different mechanics. Tune approach accordingly.

### Google Business Profile
- **Volume:** Highest for local businesses
- **SEO impact:** Direct — feeds Google Maps + Search visibility
- **Tone:** Public + searchable forever
- **Response window:** Within 48 hours ideal
- **Removal:** Limited — only TOS violations get removed
- **Strategy:** Tight responses (<100 words), no URLs

### Trustpilot
- **Volume:** Heavy for e-commerce + SaaS
- **SEO impact:** Indirect — affects ad quality scores
- **Tone:** Conversational, longer responses welcome
- **Response window:** Within 24 hours preferred
- **Removal:** Moderated — fake/abusive reviews can be challenged
- **Strategy:** Show the resolution process publicly without offering specific compensation

### Yelp
- **Volume:** Heavy for hospitality + local services
- **SEO impact:** Local SEO + brand trust
- **Tone:** Yelp users often write longer narratives — match
- **Response window:** Within 48 hours
- **Removal:** Strict policies on filtered reviews — algorithm-based
- **Strategy:** Don't argue facts publicly, take complex situations private

### App Store / Play Store
- **Volume:** Constant for app businesses
- **SEO impact:** Direct — affects discoverability + conversion
- **Tone:** Often short complaints about specific features/bugs
- **Response window:** Within 7 days
- **Removal:** Almost impossible
- **Strategy:** Reference app versions, mention fixes shipped

### Product Hunt
- **Volume:** Burst on launch days
- **SEO impact:** Brand reputation, founder reputation
- **Tone:** Tech-savvy audience, founder-mode tone expected
- **Response window:** Within 24 hours
- **Removal:** Limited
- **Strategy:** Engagement matters more than rebuttal

### Facebook Reviews / Recommendations
- **Volume:** Variable by industry
- **SEO impact:** Social proof + Facebook ads
- **Tone:** Casual
- **Response window:** Within 48 hours
- **Strategy:** Keep public response brief, move to private message for resolution

### Industry-specific (G2 / Capterra / TripAdvisor / etc.)
- **Strategy:** Each has its own conventions — study top responses in your category before establishing your voice

## Review response patterns by rating

(See the `review-response-generator` skill for full templates per platform; this is the strategic overview.)

**5-star reviews:** Most under-handled. Quick personal thank reinforces brand voice and converts the reviewer into a stronger advocate. The opportunity: ask permission to use the quote elsewhere.

**4-star reviews:** Highest leverage. They're satisfied but withholding one star — the gap is usually a single specific issue you can address. Mining 4-star reviews is the fastest path to systematic improvement.

**3-star reviews:** Persuadable. Treat as a real conversation. Often the most useful feedback because the reviewer is balanced.

**2-star reviews:** Take seriously but don't over-engage publicly. Move to private channel for resolution.

**1-star reviews:** Most consequential. Single review can damage conversion materially. Calm public acknowledgement + private resolution is the pattern.

## Soliciting reviews — the right way

Most businesses ask for reviews badly (or not at all).

### When to ask

- **After a clearly positive moment** — after a successful resolution, after the customer reports back positively, after a milestone
- **NOT after a purchase** — too early, customer doesn't have an opinion yet
- **NOT after a complaint** — even one that resolved well in your eyes, the customer may not feel that way

### How to ask

Direct, specific, no friction. Example pattern:

> Hi [Name],
>
> Glad that worked out. If it's not weird to ask — would you mind dropping us a quick review on Google? Takes 30 seconds, link below. No pressure if not.
>
> [direct review link]
>
> — [Name]

### What NOT to do when soliciting

- Don't gate the review (only ask happy customers) — Trustpilot specifically prohibits this and customers find ways to surface it
- Don't offer incentives for reviews — most platforms prohibit and customers find it manipulative
- Don't follow up multiple times asking for a review
- Don't ask in bulk emails to all customers — feels generic

## Negative review prevention — surface complaints before they go public

The best way to handle negative reviews is to catch complaints before they reach the public channel.

### Mechanism: post-purchase / post-service follow-up
A short message 7-14 days after the purchase / service:

> Hi [Name], quick check — anything not quite right with [product/service]? Easier to fix here than for either of us to find out later.

This catches ~80% of disappointments before they crystallise into a public review.

### Mechanism: cancellation diagnostic
When a customer cancels, the cancel-flow surfaces the reason. If the reason suggests dissatisfaction (not just life circumstance), proactively reach out to resolve before they leave a review.

## Review monitoring cadence

| Frequency | What to do |
|---|---|
| Daily | Quick check of all platforms (5 min) — anything new requires action? |
| Weekly | Read every review from the week in detail — look for patterns |
| Monthly | Tag and analyse all reviews — what's the recurring theme? |
| Quarterly | Roll up monthly themes into strategic decisions — product changes, training, process changes |

## What to do with the signal

Reviews are user research. Reading them as marketing data misses 80% of the value.

### Patterns to look for

- **Same complaint from 3+ reviewers in a quarter** → product / process issue worth fixing
- **Same employee name in 3+ positive reviews** → publicly recognise + private development opportunity
- **Same employee name in 3+ negative reviews** → training conversation
- **Specific feature requested in multiple reviews** → roadmap conversation
- **Same competitor mentioned in multiple negative reviews** → strategic positioning question

### Closing the loop publicly

When a pattern is identified and addressed, sometimes worth saying so publicly. After fixing a common issue, a future review reply can reference it:

> Hi [Name], thanks for the feedback. Coincidentally, we shipped a fix for exactly this issue last week — should be smoother for new customers from now on. If you'd like to come back, happy to give you a fresh look.

## The fake / unfair review playbook

Fake reviews (competitor sabotage, ex-employee revenge, customer extortion) and unfair reviews (factually wrong) need different handling than legitimate negative reviews.

### How to spot
- No purchase / interaction record matching the reviewer's claim
- Generic complaint language ("worst service ever, don't use them") with no specifics
- Sudden cluster of similar reviews from new accounts
- Reviewer's profile shows only negative reviews

### How to respond
- **Public:** Calm, professional, brief. "We don't have a record of this interaction — please email [contact] with your order details so we can look into it." Tells future readers something might be off.
- **Platform reporting:** File a removal request with the platform. Provide evidence (no matching order, etc.). Be patient — takes weeks.
- **Never accuse publicly.** Even if you're certain it's fake. The future reader doesn't know that and it makes you look paranoid.

### When the customer is extorting
"Refund me or I leave a 1-star review" → polite refusal of the extortion, document the threat in writing, proceed with normal complaint handling. If they leave the review, respond per the normal playbook (calm, factual). Most platforms have provisions for removing review-extortion attempts; document the exchange in case you need it.

## Common edge cases

- **Review mentions a specific bug that's been fixed** → reply mentioning the fix + ask if they'd consider trying again
- **Review mentions an issue that hasn't been fixed but is on the roadmap** → don't promise specific dates; acknowledge the issue is real and being worked on
- **Reviewer is themselves a well-known figure (journalist, influencer)** → escalate to Level 3 (manager / head). Different stakes
- **Multi-language reviews** → respond in the original language if possible. Generic "translated" responses read poorly
- **Review is from an account that doesn't match any customer record** → polite acknowledgement, gentle request for order details to look up

## What NOT to do

- **Don't argue facts in public.** Even when you're right. Public victory at the customer's expense looks small.
- **Don't ask reviewers to remove or change negative reviews.** Trustpilot prohibits; Google flags; customers find it gross.
- **Don't ignore negative reviews and only respond to positive ones.** Future readers notice.
- **Don't respond from "Support Team" — always a named individual.**
- **Don't include marketing in review responses.** Reviewer didn't sign up for it.
- **Don't take feedback personally even when it's personal.** Reviews are about the business / product, not you. Respond from a calm professional place or wait until you can.
