# Prompt Cheat Sheet — The Sales Loadout

The magic phrases for each of the 12 agents. Use this as a quick reference — keep it open in a tab, print it, or pin it to your project knowledge.

For each agent: the slash command (Claude Code), the trigger phrases (Claude.ai chat), the required inputs, and a copy-paste prompt template.

---

## 01 · Follow-Up Sequence — `/follow-up`

**Trigger phrases (Claude.ai):**
- "Draft a follow-up sequence for [name]"
- "Haven't heard back from [customer] in [N] days"
- "5-touch sequence for the [name] deal"
- "What should I send to [customer]?"

**Required inputs:** Customer first name · Vehicle (model + colour/trim) · Last contact event · Days since last contact · Your first name

**Best prompt template:**
> Need a follow-up sequence for [Customer]. They [last event] on [day], [days] ago. Vehicle: [Year + model + trim + colour]. Last channel: [email/SMS/phone]. I'm [Your name].

---

## 02 · No-Show Recovery — `/recover`

**Trigger phrases:**
- "[Name] didn't show this morning"
- "Had a no-show at [time]"
- "Recovery sequence for missed appointment"

**Required inputs:** Customer first name · What they missed (test drive / finance / handover) · Original appointment time · Vehicle · Your first name

**Best prompt template:**
> [Customer] no-showed their [appointment type] at [time] today. [Vehicle]. They booked [N days] ago. We've [done what? called once / emailed]. I'm [Your name].

---

## 03 · Sales Email Generator — `/email`

**Trigger phrases:**
- "Write an email to [customer] about [topic]"
- "Draft a quote follow-up email"
- "I need a trade-in offer email"

**Required inputs:** Customer first name · Email purpose (quote / trade-in / thank-you / etc.) · Vehicle · One specific thing to mention · Your first name

**Best prompt template:**
> Email to [Customer]. Purpose: [quote follow-up / trade-in offer / thank-you / etc.]. Context: [1–2 sentences — what was quoted, what they said, what happened]. I'm [Your name].

---

## 04 · Objection Handler — `/objection`

**Trigger phrases:**
- "Customer said [exact words]"
- "Objection handler: [the objection]"
- "What do I say when they say [X]?"

**Required inputs:** The exact objection (in their words) · Deal context · Any read on the customer

**Best prompt template:**
> Customer just said: "[exact quote]". Deal stage: [where we're at]. Customer type: [first-time / haggler / fleet / etc.]. Three framings please.

---

## 05 · Objection Prep — `/prep`

**Trigger phrases:**
- "Prep me for the [name] meeting tomorrow"
- "What objections should I expect from [customer]?"
- "Pre-meeting prep — [name] coming back in"

**Required inputs:** Who's coming in · Vehicle interest · Deal stage · What's known about them · Anything they've already said

**Best prompt template:**
> Pre-meeting prep for [Customer], coming back at [time/day]. Vehicle: [vehicle]. Stage: [where we're at]. Background: [2–3 sentences — what they're like, what they've said]. They have a trade-in: [yes/no, details if yes].

---

## 06 · Negotiation Coach — `/negotiate`

**Trigger phrases:**
- "Coach me through this negotiation"
- "They want [X], I'm at [Y], help me close the gap"
- "Negotiation plan for [name]"

**Required inputs:** Customer + vehicle · Current state (last offer / last ask / gap) · What's already been offered · What's available to give · Your authority limits · Time pressure

**Best prompt template:**
> Negotiation map for [Customer]. Vehicle: [vehicle]. Current state: I'm at $[X], they want $[Y], gap of $[Z]. Already offered: [what]. I can authorise up to [$N] on accessories without BM approval. Time pressure: [their deadline / month-end / etc.]. I'm [Your name].

---

## 07 · Pipeline Review — `/pipeline`

**Trigger phrases:**
- "Review my pipeline"
- "Weekly pipeline check"
- "Here's my list of open deals — what should I focus on?"

**Required inputs:** A list of open deals — name, vehicle, stage, days since contact for each (loose paragraph is fine)

**Best prompt template:**
> Pipeline review please. Open deals: [paragraph dump — name + vehicle + stage + days quiet per deal]. Today is [day]. End of month is [N days] away. I'm [Your name].

---

## 08 · Priority List — `/priorities`

**Trigger phrases:**
- "What should I do today?"
- "Priorities for the morning"
- "My plan for this week"

**Required inputs:** Current open deals · Today's calendar · What slipped from yesterday · Any deadlines · Available time today

**Best prompt template:**
> [Day]. Today: [calendar — meetings, test drives, handovers]. Open deals: [brief list]. Slipped from yesterday: [what]. Time today: [full day / half day]. I'm [Your name].

---

## 09 · Proposal Builder — `/proposal`

**Trigger phrases:**
- "Build me a proposal for [customer]"
- "Write up a quote document"
- "Need a deal sheet that looks professional"

**Required inputs:** Customer name(s) + business if fleet · Vehicle full spec · Headline figure · Trade-in (if any) · Inclusions · Validity · Finance status · Your name + dealership

**Best prompt template:**
> Proposal for [Customer]. Vehicle: [year + make + model + trim + colour]. Drive-away: $[X]. Trade-in: [year + make + model] at $[Y]. Inclusions: [list — free first service / mats / racks / etc.]. Finance: [status]. Validity: [N] days. Delivery: [when]. I'm [Your name] at [Dealership].

---

## 10 · Customer Recap — `/recap`

**Trigger phrases:**
- "Recap the [name] meeting"
- "Log this test drive"
- "Just got off a call with [name] — capture it"

**Required inputs:** What happened (rambling paragraph is fine) · Customer name

**Best prompt template:**
> Recap [Customer] interaction. Just finished [test drive / meeting / call]. [Dump everything that happened in any order — verbatim quotes if possible, what was agreed, what's still open]. I'm [Your name].

---

## 11 · Cold Outreach — `/cold`

**Trigger phrases:**
- "Write a cold email to [prospect]"
- "Cold SMS for [prospect]"
- "LinkedIn DM for [name]"

**Required inputs:** Who they're contacting · **WHY specifically** (real trigger) · Channel · What's being offered · Your name + dealership

**Best prompt template:**
> Cold [email / SMS / LinkedIn DM] to [Prospect name + role + business]. Trigger: [the specific reason — "saw their fleet on the road, two have for-sale signs" / "they posted about scaling" / etc.]. Offering: [what — a comparison / a quote / a chat]. I'm [Your name] at [Dealership].

---

## 12 · Test Drive Follow-Up — `/test-drive`

**Trigger phrases:**
- "[Name] just test drove the [model]"
- "Post-test-drive message for [name]"
- "Follow-up for the test drive yesterday"

**Required inputs:** Customer first name · Vehicle (model + trim + colour) · When they drove it · **What they reacted to** during the drive · Concerns raised · Your first name

**Best prompt template:**
> [Customer] test-drove the [vehicle] [when]. They reacted to: [specific thing — boot space, ride feel, the seven-seater third row, etc.]. Concerns raised: [what]. Discussed next steps: [what they said]. I'm [Your name]. Send via [SMS / email].

---

## Universal patterns that level up every agent

### Pattern 1 — Feed Claude the Deal Summary first

Before any agent prompt, drop in the relevant Deal Summary (from the Deal Summary plugin). Output gets dramatically sharper because Claude is working from real context, not your 1-line prompt.

### Pattern 2 — Customer type matters

For any agent that's customer-facing, add a one-line read of the customer type (using the 8 archetypes from the Customer Profile plugin): "First-time solo buyer", "Couple with skeptic partner", "Fleet buyer", "Repeat loyal customer", etc. The agent adjusts tone accordingly.

### Pattern 3 — Tell Claude what NOT to say

Each SKILL.md has a "What NOT to do" section. Reinforce it in your prompt for high-stakes situations: "No corporate filler — no 'just checking in', 'circling back', 'touching base'."

### Pattern 4 — When the output isn't quite right

Don't start over. Tell the agent what to adjust:
- "Shorter — half this length"
- "Less formal — drop the 'Dear', use 'Hi'"
- "More direct — they're a haggler, not a first-timer"
- "Address [Name] specifically, not 'you both'"

The next iteration is usually right.

---

## Print this page

For an even quicker reference, you can print this page (Cmd/Ctrl + P) and pin it next to your screen. Recommended: print only pages 1–3 (the slash command + trigger + template per agent) — leave the universal patterns for screen reading.
