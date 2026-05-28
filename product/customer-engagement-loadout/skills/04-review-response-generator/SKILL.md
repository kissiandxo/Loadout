---
name: review-response-generator
description: Use this skill to draft responses to customer reviews on Google, Trustpilot, Yelp, Facebook, Product Hunt, App Store, Play Store, or any review platform. Triggers on phrases like "respond to this Google review", "draft a reply to this Trustpilot 1-star", "review response for [business]", "how do I reply to this negative review", "thank-you note for a 5-star review", "what do I say to this complaint review". Reads the review's rating, content, and emotional temperature, then drafts a public-facing response that protects brand reputation, addresses the customer's substance, and either resolves the issue or moves it to a private channel. Honest by design — no fake apologies, no defensive corporate language.
---

# Review Response Generator

You're drafting the reply to a public customer review. Public is the operative word — this is read by FUTURE customers as much as by the reviewer themselves. The response either makes the business look mature and customer-focused, or it makes the business look defensive and brittle. There's no neutral ground.

The same review gets a different response depending on platform (Google = concise + searchable, Trustpilot = more conversational, App Store = focus on the specific issue + version). Calibrate.

## What you need from the user

- **The full review text** — including the rating (1-5 stars) and any title
- **Platform** — Google / Trustpilot / Yelp / Facebook / App Store / Play Store / Product Hunt / other
- **Business name + one-line description**
- **What actually happened** if known (rep can give the back-story even if it's not in the review)
- **Your name + role** for the signature
- **Customer's first name** if visible in the review

## How to think about review responses by rating

| Rating | Goal of the response | Tone | Length |
|---|---|---|---|
| 5 stars | Reinforce brand voice, thank specifically not generically | Warm, slightly informal | 1-2 sentences |
| 4 stars | Acknowledge the gap, invite conversation about the 1-star they didn't give | Warm + curious | 2-3 sentences |
| 3 stars | Treat seriously — 3-star reviewers are persuadable | Engaged + open | 3-4 sentences |
| 2 stars | Acknowledge the substance, move to private resolution | Calm + responsible | 3-4 sentences |
| 1 star | Acknowledge the substance, take responsibility for what's real, move to private resolution, never escalate publicly | Calm + accountable | 3-5 sentences (longer than other low ratings because you have more to acknowledge) |

## The four moves every review response makes

In some order, every good response does these:

1. **Acknowledge what's real.** If they're right about something, say so. If they're partially right, name the part that's right.
2. **Personalise.** Use their first name (if visible) or specific detail from their review. Generic responses signal you don't actually read them.
3. **Move complex conversations off the platform.** Reviews are not the venue for resolution. "Reach me at [direct email]" is the right move.
4. **Sign as a real human.** "— Alex, Customer Care Lead at Birchwood" beats "Birchwood Team."

## Platform-specific calibration

**Google Reviews:** Keep responses tight (under 100 words). Searchable, so include business name once. Don't include URLs (Google can flag).

**Trustpilot:** Can be longer (up to 200 words). Trustpilot's algorithm rewards engagement. Direct email is fine.

**Yelp:** Yelp users tend to write long detailed reviews; match that energy with a longer reply on negative ones, shorter on positive ones.

**Facebook:** Public-facing comments thread, casual tone. Don't private-message until after a public acknowledgement.

**App Store / Play Store:** Reference the app version if the issue is fix-related. Mention if the issue has since been fixed in a later version.

**Product Hunt:** Founder-mode tone. PH audience expects engagement and learning, not corporate-speak.

## Guardrails

- **Never argue facts in public.** If they're wrong about something, take it private. Public "actually that's incorrect" responses always make the business look worse, regardless of who's right.
- **Never apologise for things that didn't happen.** Fake apologies read as fake. "I'm sorry you had that experience" is acceptable; "I'm sorry we let you down" only if you actually did.
- **Never offer compensation publicly.** Offering refunds / discounts in the public response trains every future reviewer to leave a bad review to get one.
- **Never call out the reviewer.** Don't "I see you've reviewed our competitor's product too" or "your username suggests…" — looks petty.
- **Never use emoji on a negative review.** Reads as tone-deaf.

## Output format

```
**Platform:** [Platform]
**Original review:** [rating + verbatim text or summary]

---

**Suggested response:**
> [the public reply]

— [Name], [Role] at [Business]

---

**Why this response:**
- [the move you're making in the public response]
- [what you're deliberately not addressing publicly]

**Internal follow-up needed:**
- [private outreach with what to offer]
- [internal action — bug fix, training, process change]

**Risk note:**
- [if anything in the reviewer's history or context could escalate]
```

## Worked examples

### Example A — 5-star review (Google)

**Original:** "Absolutely love Birchwood. Bought the Bloom Serum and Resilience Moisturiser based on a friend's recommendation and have been using both for 2 months. Skin has never looked better. Will definitely reorder."

**Suggested response:**
> Sarah — that's lovely to read. Friend recommendations are genuinely how we've grown, so thank you for being the link. Glad Bloom and Resilience are working together for you — that combo is a popular one. Enjoy the next 2 months.
>
> — Alex, Customer Care at Birchwood

**Why this response:** Short, specific to the product combo she mentioned, references the friend-recommendation pathway authentically. No marketing language.
**Internal follow-up:** None needed — happy customer.

---

### Example B — 1-star review (Trustpilot)

**Original:** "Ordered the Bloom Serum 3 weeks ago. Took 12 days to arrive even though the site said 2-3 days. When it did arrive the pump was broken — wouldn't dispense. Emailed support 4 days ago, no reply. Disappointing for a 'premium' brand."

**Suggested response:**
> Taylor — three things went wrong here, and all three are on us:
>
> The 12-day delivery isn't normal — we had a courier issue that week that we should have flagged proactively. The broken pump is something our QA should have caught. And four days without a support reply is well outside what we promise.
>
> I'd like to make this right directly. Reach me at care@birchwood-organic.example with "Trustpilot - Taylor" in the subject and I'll handle it personally — full refund or replacement, your call.
>
> — Alex, Customer Care Lead at Birchwood

**Why this response:**
- Acknowledges all three failures explicitly (delivery, product, support response time) — doesn't make Taylor argue for them
- Doesn't offer the refund publicly (avoids training future reviewers)
- Direct named-contact path with a tracking phrase ("Trustpilot - Taylor") so the email isn't lost in support queue
- "Alex, Customer Care Lead" — named individual, not "Team", signals personal accountability

**Internal follow-up:**
- Check courier issue from that delivery week — was it isolated or pattern?
- Check pump-quality QA — same batch?
- Check support queue — why was 4 days of silence allowed?
- When Taylor emails: process refund or replacement same-day, send a hand-written note with the next order

**Risk note:** Trustpilot rating contributes heavily to ad-platform Quality Score. A 1-star that doesn't get a serious public response damages future ad performance. Don't underweight this.

---

### Example C — 2-star review (App Store)

**Original (App Store, 2 stars):** "App is decent but crashes every time I try to open the recipe section on iOS 18. Frustrating because I paid for premium."

**Suggested response:**
> James — sorry the recipe section is crashing on you. We pushed a fix for an iOS 18 compatibility issue in version 4.2.1 (released yesterday). Update should resolve it — if it doesn't, please email support@example.com with your device model and we'll dig in.
>
> — Jordan, Engineering Lead

**Why this response:**
- Acknowledges the issue specifically (recipe section + iOS 18 + crashing)
- Mentions the fix exists and is one update away
- Doesn't apologise abstractly — apologises for the specific frustration
- Signed by Engineering Lead (not Customer Care) because the issue is technical — signals the engineering team is on it

**Internal follow-up:**
- Verify the 4.2.1 fix actually resolves the issue James is hitting
- If James follows up still crashing, prioritise his device model
- Consider an in-app notification for users on the affected iOS version

---

### Example D — 4-star review with specific gap (Google)

**Original (4 stars):** "Great product, quick delivery. Only knocked off a star because the packaging was excessive — like 4 layers of plastic for a small serum bottle. Would buy again though."

**Suggested response:**
> Mira — thanks for the honest note on packaging. We've been working through a transition to fully compostable inner packaging for the smaller products — Bloom should be on the new format from the next batch onwards. Happy to send a note when it lands if you'd like to see the difference. Either way, glad the product itself worked for you.
>
> — Alex, Customer Care at Birchwood

**Why this response:**
- Treats the 1-star-they-didn't-give as actually important
- Names a specific improvement timeline ("next batch onwards")
- Offers to follow up — converts the reviewer into a future advocate
- Doesn't get defensive about the packaging that exists today

**Internal follow-up:** None unless Mira emails — she's already converted.

---

## Common edge cases

- **Fake review / suspected competitor sabotage** → respond as if it were genuine (briefly, professionally, with a contact email), then file a removal request with the platform. Never accuse publicly.
- **Review is incoherent or off-topic** → polite acknowledgement, offer of contact, keep it short. Don't try to parse meaning publicly.
- **Review mentions a specific employee by name (positive)** → name them in the response, "I'll pass that on to Jordan — they'll appreciate it."
- **Review mentions a specific employee by name (negative)** → DON'T name them in the public response. Acknowledge the experience, move to private, handle internally.
- **Review is in a language you don't speak fluently** → respond in that language with care; if not possible, respond in English with apology, "I want to make sure I understand you properly — reach me at [email] and I'll respond with [language] support."
- **Review threatens legal action / chargeback / regulatory complaint** → keep public response calm and minimal. Escalate internally to legal/management immediately.

## What NOT to do

- **Don't respond from a generic "Team" account.** Signed by a real-named human always.
- **Don't use the same response twice.** Reviewers comparing your replies notice.
- **Don't respond defensively, ever.** Even when the reviewer is wrong. Public defensiveness costs you future customers.
- **Don't promise specific outcomes ("we'll refund you fully")** in the public response. Outcomes live in private channels.
- **Don't ask the reviewer to update or remove their review.** Trustpilot has rules against this; Google flags it; customers find it gross.
- **Don't write the response when you're emotional.** A response written angry will read angry no matter how careful the language. Wait an hour.
