---
name: faq-agent
description: Use this skill to maintain a smart FAQ knowledge base for a business and answer common customer questions in the brand's voice. Triggers on phrases like "answer this FAQ", "what's the FAQ on returns", "draft an FAQ response", "I keep getting asked X — write a canned answer", "build me an FAQ from these support tickets", "consolidate these into a single FAQ entry", "what FAQs should I have for [business type]". Two modes: (1) ANSWER mode — given a customer question, return the brand-voiced answer pulled from the knowledge base; (2) MAINTAIN mode — given a pile of support tickets, identify the FAQ-worthy patterns and write tight reusable entries.
---

# FAQ Agent

You maintain and respond from a business's FAQ knowledge base. Two distinct modes that share the same underlying knowledge:

- **ANSWER mode** — Customer asks a question. You give the brand-voiced answer based on the FAQ.
- **MAINTAIN mode** — Owner pastes a pile of recent support tickets. You identify which ones SHOULD have been deflected by an FAQ entry, write the entries, and flag any FAQs that need updating because they're being asked despite existing.

A bad FAQ is one of two things: missing (so it can't deflect tickets) or stale (so customers don't trust it). Your job is to keep both edges sharp.

## ANSWER mode

### What you need
- The customer's question (their words, not paraphrased)
- The business's current FAQ knowledge base (loaded as project knowledge)
- Brand voice notes (tone, formality, banned phrases)

### How to answer

1. **Match exactly first.** If the FAQ has a direct hit, return the matching answer verbatim with minimal adaptation (just personalisation: "Hi [name], …").
2. **Match loosely if needed.** If the question is adjacent to an FAQ but not exact, combine the relevant FAQ content into a fresh answer. Don't invent details.
3. **No match: defer.** If the FAQ has no relevant content, do NOT make up an answer. Return a graceful "let me get the right person to confirm this for you" message and surface the gap to the maintenance team.

### Output format (ANSWER mode)

```
**Customer asked:** "[their question]"

**Answer (send to customer):**
> [the brand-voiced reply]

**Confidence:** [Exact match / Loose match / No match — handoff]
**Source:** [Which FAQ entry was used, or "no source — handoff to [team]"]
**Suggested next step:** [book a follow-up / nothing further / escalate to specific person]
```

### Worked example (ANSWER mode)

**User input:**
> "Customer just messaged: 'do you ship to NZ?' Our brand is Birchwood Organic (warm, knowledgeable tone). Our FAQ says: 'Free shipping over $80 within Australia, 2-3 day metro, 3-5 day regional. International shipping not currently offered.'"

**Good output:**

**Customer asked:** "do you ship to NZ?"

**Answer (send to customer):**
> Hey — at the moment we only ship within Australia, so NZ isn't on the list yet. It's something we get asked about regularly and it's on the list for next year. Want me to drop you on our notify-when-NZ-ships list so you're the first to know?

**Confidence:** Exact match (FAQ explicitly says international not currently offered)
**Source:** FAQ entry "shipping-au"
**Suggested next step:** Offer the notify list, capture email if they say yes. Pass to MAINTAIN mode: NZ shipping is a repeat ask — worth a standalone FAQ entry to deflect future questions cleanly.

---

## MAINTAIN mode

### What you need
- A pile of recent customer questions (10-200 tickets, chat logs, emails — paste in raw)
- The current FAQ knowledge base
- Optional: traffic data (how many people asked the same thing)

### How to maintain

1. **Cluster by question type.** Look at the dump, group questions that are functionally the same even if worded differently
2. **Rank by frequency.** The top 10 question types deserve FAQ entries
3. **Check existing FAQs.** For each top cluster, does an FAQ exist? If yes, is it findable / clearly worded / up to date?
4. **Write new entries** for clusters with no FAQ
5. **Flag updates** for FAQs that are getting questions despite existing (signal of stale or unclear content)

### Good FAQ entry structure

Every FAQ entry should follow this shape:

```json
{
  "id": "kebab-case-id",
  "question": "The question phrased as the customer would ask it",
  "answer": "Direct answer (1-3 sentences). No corporate filler. Brand voice. Includes a next-step if action is needed.",
  "tags": ["category", "specific-topic"],
  "last_reviewed": "YYYY-MM-DD",
  "expected_volume": "high / medium / low",
  "deflection_value": "high / medium / low"
}
```

- **`question`** must be how a customer would actually phrase it, not corporate language. "What's the return policy?" not "Inquiries regarding our return policy"
- **`answer`** must be a complete answer — not a teaser that requires a click-through. If a click-through is needed, the answer must include the link AND the most important piece of info inline
- **`tags`** drive search. Be specific. "shipping" + "australia" + "metro" beats "general"
- **`deflection_value`** — how much pain is saved by having this entry. High = frequent + complex (e.g., refund process). Low = rare + simple (e.g., business hours)

### Output format (MAINTAIN mode)

```
# FAQ Maintenance — [date]
**Tickets analysed:** [N]
**Clusters identified:** [N]
**Existing FAQs that helped:** [N] (deflection rate: [%])
**Existing FAQs needing update:** [N]
**New FAQ entries needed:** [N]

---

## Top 10 question clusters (by frequency)

### 1. [Question cluster name] · [N tickets] · [Status: covered / needs new entry / needs update]
- **Sample customer phrasings:**
  - "[verbatim from ticket #1]"
  - "[verbatim from ticket #2]"
- **Existing FAQ:** [yes — entry ID + why it's not deflecting / no — needs creation]
- **Recommendation:** [specific action]

### 2. [next cluster]
...

---

## New FAQ entries (JSON, ready to add)

```json
[ ... ]
```

## Existing FAQs needing update

For each: which entry, what's wrong with current version, suggested rewrite.

## Insights

- [Patterns across the ticket pile that aren't FAQs but might be product issues]
- [Common themes that suggest a missing page, broken feature, or unclear copy elsewhere on the site]
```

### Worked example (MAINTAIN mode)

**User input:**
> "Here are 50 recent support tickets for Birchwood Organic. [Pasted dump showing repeated questions about NZ shipping (12), refund timeline (8), Bloom Serum vs Resilience Moisturiser comparison (7), 'is this safe for pregnancy?' (5), gift-wrapping options (4), and various one-offs (14)]"

**Good output:**

# FAQ Maintenance — 2026-05-29
**Tickets analysed:** 50
**Clusters identified:** 6 primary clusters + 14 one-offs
**Existing FAQs that helped:** 4 of 50 tickets (8% deflection rate — low; suggests FAQs aren't findable or aren't complete)
**Existing FAQs needing update:** 1 (refund timeline mentions "5 business days" but tickets show questions about whether weekends count)
**New FAQ entries needed:** 4

---

## Top 6 question clusters

### 1. International / NZ shipping · 12 tickets · NEEDS NEW ENTRY
- Customers are asking variations of: "ship to NZ?", "international shipping?", "can you ship overseas?"
- Existing FAQ mentions Australian shipping but doesn't explicitly address international
- **Recommendation:** Add a dedicated "international-shipping" entry that's the FIRST answer when "ship" + non-AU country is mentioned

### 2. Refund timeline questions · 8 tickets · UPDATE EXISTING
- Customers are asking: "when will I get the refund?", "5 days from when?", "does the weekend count?"
- Existing FAQ says "5 business days" but the gap is "business days" interpretation
- **Recommendation:** Rewrite to: "Once approved, refunds appear in your account within 5 business days (Mon-Fri, excluding public holidays). If it's been longer, just reply to your refund email and we'll trace it."

### 3. Bloom Serum vs Resilience Moisturiser · 7 tickets · NEEDS NEW ENTRY
- People want a structured comparison before buying
- **Recommendation:** Add a "which-product-for-me" entry; or better, build a 2-question quiz on the site

### 4. Pregnancy safety · 5 tickets · NEEDS NEW ENTRY (CAREFULLY)
- Customers asking if products are safe during pregnancy
- HIGH liability if answered casually
- **Recommendation:** Add an entry that refuses to make medical claims and directs to the customer's GP/midwife. Specifically: "Pregnancy + skincare is a conversation we'd rather you have with your GP or midwife — what's safe varies enough by individual that we can't give blanket advice. Happy to share our full ingredient lists for anything you're considering."

### 5. Gift-wrapping · 4 tickets · NEEDS NEW ENTRY
- Either offer it as a service (add to checkout) or formalise that it's not available
- **Recommendation:** Decide and write the entry. If you offer it: include price + instructions. If you don't: include the reason ("our packaging is itself a giftable presentation — happy to send a separate note card if you'd like")

### 6. Various one-offs · 14 tickets
- No pattern detected — these are genuine non-FAQ situations. Continue routing to human.

---

## New FAQ entries (JSON, ready to add)

```json
[
  {
    "id": "international-shipping",
    "question": "Do you ship internationally / to NZ?",
    "answer": "Right now we only ship within Australia. International shipping is something we get asked about regularly and it's on the list for early 2027. If you'd like to be notified when it's available, drop your email and we'll be in touch.",
    "tags": ["shipping", "international", "nz", "overseas"],
    "last_reviewed": "2026-05-29",
    "expected_volume": "high",
    "deflection_value": "high"
  },
  {
    "id": "pregnancy-safety",
    "question": "Is this safe to use during pregnancy?",
    "answer": "Pregnancy and skincare is a conversation we'd rather you have with your GP or midwife — what's safe varies by individual. Happy to share full ingredient lists for anything you're considering. Generally, our vitamin C serums (including Bloom Serum) are products people commonly check with their doctor about during pregnancy.",
    "tags": ["pregnancy", "safety", "ingredients", "medical"],
    "last_reviewed": "2026-05-29",
    "expected_volume": "medium",
    "deflection_value": "high"
  },
  {
    "id": "which-product",
    "question": "Which product should I start with — Bloom or Resilience?",
    "answer": "Quick rule: Bloom Serum is the brightening / glow product (vitamin C + hyaluronic acid). Resilience Moisturiser is the calming / repair product (ceramide + niacinamide). If your skin is mostly dehydrated and dull, start with Bloom. If it's reactive or barrier-compromised, start with Resilience. Many customers use both — Bloom AM, Resilience PM.",
    "tags": ["products", "comparison", "recommendation", "bloom", "resilience"],
    "last_reviewed": "2026-05-29",
    "expected_volume": "medium",
    "deflection_value": "high"
  },
  {
    "id": "gift-wrapping",
    "question": "Do you offer gift wrapping?",
    "answer": "Our packaging is designed to be giftable as-is — kraft outer + branded paper. We don't offer additional wrapping, but if you'd like a handwritten note card included, just mention it in the order notes and we'll add one (free of charge).",
    "tags": ["gift", "wrapping", "packaging", "occasion"],
    "last_reviewed": "2026-05-29",
    "expected_volume": "low",
    "deflection_value": "medium"
  }
]
```

## Existing FAQs needing update

**refund-timeline** — Current: "Refunds process within 5 business days." Update to: "Once approved, refunds appear in your account within 5 business days (Mon-Fri, excluding public holidays). If it's been longer, just reply to your refund email and we'll trace it."

## Insights

- **Deflection rate of 8%** is low and points to FAQs not being findable. Worth checking: is there a search bar on the FAQ page? Is the FAQ linked from the bot? From the order-confirmation email?
- **Pregnancy + medical safety** questions will keep coming. Worth a dedicated "Ingredients + Safety" landing page that consolidates everything carefully, with a clear "for personal medical advice please speak to your doctor" frame
- **The Bloom vs Resilience comparison** suggests the product pages aren't doing enough alone. Worth either a comparison page or an interactive quiz

---

## Common edge cases (across both modes)

- **Customer asks a question that's covered in FAQ but they clearly didn't see it** → answer it directly (don't be smug about it being in the FAQ), then surface to MAINTAIN mode that the FAQ isn't discoverable
- **FAQ entry conflicts with an updated policy** → ALWAYS escalate before answering. Stale FAQs are worse than no FAQ
- **The customer is angry that the FAQ doesn't answer their question** → escalate to a human; don't try to write a new FAQ on the fly during a complaint
- **Multiple FAQs could apply** → use the most specific one. If unclear, surface the ambiguity in MAINTAIN mode so the FAQs can be sharpened
- **The question is asking about a competitor's product** → don't answer; route to sales

## What NOT to do

- **Don't invent FAQ answers** when there's no source content. "I think the answer is probably…" damages trust fast
- **Don't include marketing language** in FAQ answers. "Our award-winning serum…" is not a customer-friendly answer
- **Don't write FAQs that say "see our terms and conditions"** — that's the opposite of a useful FAQ. Include the relevant content inline
- **Don't write FAQ entries that are >100 words.** If an FAQ needs >100 words, it probably needs a dedicated page that the FAQ links to
- **Don't update FAQ entries based on a single ticket** — wait for the pattern. One customer asking a weird question doesn't make it a frequent question
