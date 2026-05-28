---
name: knowledge-base-builder
description: Use this skill to build, restructure, or refine a customer-facing knowledge base / help center / docs site. Triggers on phrases like "build me a knowledge base", "structure our help docs", "what should be in our knowledge base", "turn these support tickets into knowledge base articles", "audit our current help center", "I have a pile of docs — make a knowledge base out of them", "organise these for self-service". Returns: a knowledge base structure (categories + article skeletons), individual article drafts in plain English, and signals about which articles will deflect the most tickets. Distinguishes between TUTORIALS (how to do X), REFERENCE (what X is), TROUBLESHOOTING (X is broken — fix it), and CONCEPTUAL (why we do X this way).
---

# Knowledge Base Builder

You're building or fixing a knowledge base. The job: organise content so customers can actually self-serve, reducing ticket volume while improving customer experience. Most knowledge bases fail for the same reasons — bad structure (customers can't find anything), bad writing (corporate jargon instead of plain English), or no maintenance (information goes stale and erodes trust).

A good knowledge base has four article types, each serving a different reader intent:

| Type | Reader's intent | Example |
|---|---|---|
| **Tutorial** | "How do I do X?" | "How to add a teammate to your account" |
| **Reference** | "What is X?" | "What's included in the Pro plan" |
| **Troubleshooting** | "X is broken / not working" | "Fixing 'unable to sync' errors" |
| **Conceptual** | "Why does X work this way?" | "How our shared workspaces are structured" |

Most knowledge bases mix these up — tutorials buried in conceptual essays, troubleshooting articles missing the actual fix. Separation matters.

## What you need from the user

- **Business type** — SaaS / e-commerce / service / mixed
- **Current state** — building from scratch / have docs but they're messy / specific issue to fix
- **Top customer questions** (top 10-20 if known — from support tickets, chat logs, search analytics)
- **Knowledge base platform** — Intercom / HelpScout / Notion / Zendesk / Gitbook / custom / hosted on the site itself
- **Voice/tone** — formal / warm / technical / brand-specific notes
- **Your name + role**

## Two modes

### MODE A — Structure / restructure

Output: a category tree + article skeletons (titles + 1-sentence summary + reader intent type).

Use when: building from scratch, restructuring messy existing content, or auditing.

### MODE B — Write specific articles

Output: full article drafts in plain-English, structured for the reader's intent.

Use when: filling a gap, rewriting a specific bad article, or scaling content production.

## MODE A — Structure output

### Step 1 — Identify top categories

Most knowledge bases need 5-8 top-level categories. More than 8 = too many choices for the customer; fewer than 5 = categories too broad.

Standard category patterns by business type:

**SaaS:**
- Getting Started
- Core Features (subdivided by feature area)
- Account & Billing
- Integrations
- Troubleshooting
- Plan & Pricing
- API / Developer Docs (if applicable)
- Security & Compliance

**E-commerce:**
- Shipping & Delivery
- Returns & Refunds
- Product Care / Usage
- Order Status & Tracking
- Account & Login
- Payment & Promotions
- Contact / Support

**Service businesses:**
- Service Offerings
- Booking & Scheduling
- Pricing & Payment
- During Your Service
- After Your Service
- FAQs / General

### Step 2 — Per category, list articles

For each category, list:
- Article title (phrased as a customer question)
- 1-sentence summary
- Reader intent type (Tutorial / Reference / Troubleshooting / Conceptual)
- Priority (P0 = ship in first batch / P1 = ship next / P2 = nice to have)

### Step 3 — Surface the deflection signal

For each article, estimate the deflection value:
- **High deflection:** Frequently asked, has a clean answer (e.g., "What's your refund policy")
- **Medium deflection:** Asked sometimes, needs a moderately detailed answer
- **Low deflection:** Rarely asked but important for trust (e.g., "Security & compliance")

Prioritise high-deflection articles for P0.

### Step 4 — Flag content gaps

Are there top customer questions with no clean article match? Surface them as "needs new content" so the user knows where to start writing.

## MODE B — Article writing structure

### Tutorial article structure

```
# How to [do specific thing]

## Quick answer
[1-2 sentences for users who already know broadly what to do]

## Step by step
1. [Action with specific UI element / verb]
2. [Action]
3. [Action]

## Screenshot or video
[Embed if helpful]

## If you get stuck
[Common failure points + how to recover]

## Related
- [Link to adjacent article]
- [Link to adjacent article]
```

### Reference article structure

```
# [What thing is]

## The short version
[1-2 sentences — most customers stop reading here]

## Detail
[Sectioned details with clear headings — let customers jump to what they need]

## Common questions
- [Sub-question with one-line answer]
- [Sub-question with one-line answer]

## Related
- [Links]
```

### Troubleshooting article structure

```
# [The error / issue, phrased as customer would describe it]

## What's happening
[1-sentence explanation of the cause, in plain English]

## Try these in order
1. [Most common fix — solves 80% of cases]
2. [Next fix]
3. [Next fix]

## If none of these work
[Specific escalation path — email / form / etc.]
```

### Conceptual article structure

```
# [The concept]

## Why this matters to you
[Lead with reader benefit, not with the abstract concept]

## How it works
[Explanation — analogies welcome, jargon avoided]

## In practice
[A concrete example that makes the concept real]

## Related
- [Links]
```

## Writing principles (for all types)

1. **Customer-facing titles are questions, not noun phrases.** "How do I add a teammate?" not "Teammate Management."
2. **First sentence answers the question.** Not "Welcome to the help center" or "We're glad you're here."
3. **Plain English over corporate language.** "We'll refund you within 5 days" not "Refund processing occurs within a 5-business-day window."
4. **Show steps; don't describe them abstractly.** Numbered lists with verbs ("Click 'Settings'") not paragraphs.
5. **Link to adjacent articles at the end.** Reader who came for X often needs Y next.
6. **Include the failure modes.** "If you don't see the button, your account may be on the Free plan. Upgrade here." Address the common 80%-of-confused-users case in the article itself, before they have to ticket.
7. **Date stamp last-reviewed.** Stale knowledge base content erodes trust faster than missing content.

## Output format

### MODE A

```
# Knowledge Base Structure — [Business name]
**Total categories:** [N]
**Total articles in proposed structure:** [N]
**P0 articles to ship first:** [N]
**Estimated ticket deflection at P0 launch:** [%]

---

## Category 1 — [Name]
- **[Article title (phrased as customer question)]** · [Tutorial/Reference/Troubleshooting/Conceptual] · [P0/P1/P2] · [High/Medium/Low deflection]
  - 1-line summary
- [next article]

## Category 2 — [Name]
...

---

## Content gaps detected
- [Top question with no matching article in current proposal — needs new content]

## Maintenance recommendations
- [Cadence for reviewing articles]
- [How to detect stale articles]
```

### MODE B

```
# [Article title]

[Full article in the appropriate type structure]

---

**Writing notes:**
- [the move you made]
- [what's deliberately not included]

**Suggested related articles to link:**
- [titles]

**Last reviewed:** [date]
```

## Worked example — MODE A (SaaS, building from scratch)

**User input:**
> "Build me a knowledge base structure for Tidetrack — project management SaaS, 5-15 person agency teams. Top customer questions from our last 200 tickets: how to invite teammates (28), how to assign tasks (24), 'sync isn't working' (18), pricing differences between Pro and Team plans (16), how to export data (14), API documentation requests (12), 'how do I cancel' (10), refund policy questions (9), Slack integration setup (8), permissions / roles questions (7). I'm Jordan."

**Good output:**

# Knowledge Base Structure — Tidetrack
**Total categories:** 7
**Total articles in proposed structure:** 38
**P0 articles to ship first:** 14
**Estimated ticket deflection at P0 launch:** ~65% (based on top-10 ticket categories all covered)

---

## Category 1 — Getting Started
- **How do I create my first project?** · Tutorial · P0 · High
- **How do I invite teammates?** · Tutorial · P0 · High (covers #1 ticket)
- **How do I set up my workspace?** · Tutorial · P0 · Medium
- **What can I do in the first 10 minutes of using Tidetrack?** · Conceptual · P1 · Medium

## Category 2 — Tasks & Projects
- **How do I assign a task?** · Tutorial · P0 · High (#2 ticket)
- **How do I use task statuses?** · Reference · P0 · Medium
- **How do I create recurring tasks?** · Tutorial · P1 · Medium
- **How do tasks differ from projects?** · Conceptual · P1 · Low

## Category 3 — Account & Billing
- **What's the difference between Pro and Team plans?** · Reference · P0 · High (#4 ticket)
- **How do I cancel my subscription?** · Tutorial · P0 · High (#7 ticket)
- **What's your refund policy?** · Reference · P0 · High (#8 ticket)
- **How do I update my payment method?** · Tutorial · P1 · Medium
- **How do I download invoices?** · Tutorial · P1 · Low

## Category 4 — Integrations
- **How do I set up the Slack integration?** · Tutorial · P0 · Medium (#9 ticket)
- **How do I set up the Google Calendar integration?** · Tutorial · P1 · Medium
- **Available integrations (list)** · Reference · P1 · Low
- **Troubleshooting integration sync issues** · Troubleshooting · P1 · Medium

## Category 5 — Troubleshooting
- **My data isn't syncing — what should I check?** · Troubleshooting · P0 · High (#3 ticket)
- **I can't log in** · Troubleshooting · P0 · Medium
- **My team can't see a project I shared** · Troubleshooting · P0 · Medium
- **The mobile app is crashing** · Troubleshooting · P1 · Low

## Category 6 — Permissions & Security
- **How do roles and permissions work?** · Conceptual · P0 · Medium (#10 ticket)
- **How do I change a teammate's role?** · Tutorial · P1 · Medium
- **How do I remove someone from my workspace?** · Tutorial · P1 · Medium
- **Where is my data stored and how is it secured?** · Reference · P1 · Low

## Category 7 — Data & Export
- **How do I export my data?** · Tutorial · P0 · Medium (#5 ticket)
- **Can I export to CSV / JSON / specific format?** · Reference · P1 · Medium
- **How do I backup my workspace?** · Tutorial · P1 · Low

---

## Content gaps detected
- **API documentation** (#6 ticket) — currently no API docs exist. This is its own large project; for v1 of the KB, write a single placeholder article "Do you have an API?" that explains current state honestly and points to the waitlist / contact form.

## Maintenance recommendations
- **Cadence:** Review all P0 articles quarterly, P1 semi-annually. Update last-reviewed dates.
- **Stale detection:** If a P0 article has unchanged content for 6+ months, prompt for review (likely missing newer features or screenshots).
- **Pattern detection:** Run support ticket analysis monthly — if 5+ tickets in a month cite the same question, check whether an article exists / is findable / is up to date.
- **Search log review:** What's customers SEARCHING for in the KB? Top searches with no clear matching article = content gaps.

---

## Worked example — MODE B (writing a specific Troubleshooting article)

**User input:**
> "Write the article 'My data isn't syncing — what should I check?' for Tidetrack. Tone: warm, no jargon, walk through what most customers should try."

**Good output:**

# My data isn't syncing — what should I check?

## What's happening
Sync issues in Tidetrack are almost always one of three things: a temporary connection issue, a browser cache issue, or a teammate's offline change that hasn't pushed yet.

## Try these in order

1. **Refresh the page (Cmd+R or Ctrl+R).** About 60% of sync issues resolve here. If you're using the desktop app, quit and reopen.

2. **Check your internet connection.** If you've recently switched networks (e.g., laptop went to sleep then back on), Tidetrack may not have reconnected. Test by loading any other site.

3. **Hard refresh your browser** (Cmd+Shift+R or Ctrl+Shift+F5). This clears the cached version and reloads everything fresh.

4. **Sign out and back in.** Click your avatar (top-right) → Sign out. Then sign back in. This re-establishes your session token.

5. **Check the sync indicator** (top-right of your workspace, next to your avatar). If it's red or amber, hover over it for a specific status message.

## If none of these work

A few possibilities:

- **A teammate has made conflicting changes offline.** Ask them to come online and let their changes sync, then refresh on your side.
- **There's an active incident on our side.** Check our status page at status.tidetrack.example.
- **Your account has been put into read-only mode.** This is rare and only happens for billing issues — check your email for any billing communications.

If none of that explains it, message us at support@tidetrack.example with:
- Your workspace name
- The project you were working in
- The time the sync issue started (best estimate)
- A screenshot of the sync indicator

We'll get into it.

---

**Writing notes:**
- Opens with the cause IN PLAIN ENGLISH — not "synchronization errors can be caused by various factors"
- Numbered fixes ordered by likelihood (refresh first, sign-in fifth) — saves customer time
- Each fix has a SPECIFIC mechanic ("Cmd+R or Ctrl+R", not "refresh")
- "If none of these work" section addresses the 20% of cases not covered by the main fixes
- Closing ticket-template tells customer exactly what to include — speeds up support resolution if they DO have to ticket

**Suggested related articles to link:**
- "I can't log in"
- "My team can't see a project I shared"
- "What does the sync indicator mean?"

**Last reviewed:** 2026-05-29

---

## Common edge cases

- **Customer asks for an article on something we deliberately don't support** → write the article anyway, but frame as "Why we don't currently offer X" — most customers asking are wondering if they missed it. The honest non-answer is better than no article.
- **Article would be longer than 1000 words** → split into multiple articles, link them. Single articles past 1000 words rarely get read.
- **Topic is changing rapidly (new product, evolving feature)** → don't write a full article; write a brief "Coming soon" placeholder + roadmap status. Stale long-form is worse than honest short-form.
- **Article needs screenshots / videos** → write the prose first. Image placeholders are fine for v1. Real screenshots/videos can come later in a sprint.
- **The "right" article doesn't fit any of the four types** → check if it should actually be a landing page, a marketing page, or a blog post — not every customer-facing piece is a KB article.

## What NOT to do

- **Don't write articles in the passive voice.** "Refunds are processed" is harder to parse than "We process refunds."
- **Don't use internal jargon.** If your team calls something "workspace deboarding" but customers call it "removing a teammate," use the customer phrase
- **Don't bury the most important sentence.** First sentence answers the question
- **Don't include legal disclaimers in customer-facing articles** unless legally required. Send them to the T&C
- **Don't write "we" too much.** Half the time, "we" should be "you" — center the customer
- **Don't link to an article that doesn't exist yet.** Cuts customer trust on first click
- **Don't add SEO bloat to KB articles.** They're for existing customers, not Google. Clarity > word count
