# Plugin: Tone Framework

A practical guide to brand voice in customer engagement contexts — how to keep responses on-brand without sounding scripted. Loaded into your project, this lets every agent in the Customer Engagement Loadout match your business's actual voice.

## When to use this plugin

Pair with every agent in this kit. Especially valuable for:
- **website-chatbot-builder** (sets the voice for every visitor interaction)
- **complaint-handler** (where tone is the difference between de-escalation and worsening)
- **review-response-generator** (public communications carry permanent tone signal)
- **vip-customer-manager** (personal tone vs corporate tone is the entire point)

## The four tone dimensions

Every business communication has tone choices along four axes. Define yours, then apply consistently.

### 1. Formality (1-5)
- **1 — Casual:** "hey", contractions, lowercase, sentence fragments fine
- **2 — Friendly informal:** Hi, contractions, some humour, conversational structure
- **3 — Professional warm:** Proper grammar, friendly without slang, polished but human
- **4 — Formal:** No contractions, "Dear [Name]", traditional structure
- **5 — Highly formal:** Legal-adjacent, careful phrasing, full names + titles

### 2. Warmth (1-5)
- **1 — Distant:** Transactional, no personal touches
- **2 — Polite:** Courteous, helpful, but not personally engaged
- **3 — Warm:** Treats customer as a person, references specifics, acknowledges feelings
- **4 — Personal:** Uses customer's name multiple times, references prior interactions, anticipates needs
- **5 — Intimate:** First-name basis with the founder, references shared context, friend-level tone

### 3. Authority (1-5)
- **1 — Tentative:** "I think we might be able to maybe…"
- **2 — Soft:** "We should be able to help with this…"
- **3 — Confident:** "Here's how we'll handle this…"
- **4 — Decisive:** "I've sorted that for you. Refund processing now."
- **5 — Authoritative:** "That's the policy. I can extend a one-time exception of $X."

### 4. Directness (1-5)
- **1 — Hedged:** Lots of qualifiers, soft language, doesn't commit
- **2 — Diplomatic:** Polite framing, acknowledges multiple sides
- **3 — Clear:** States things plainly without being blunt
- **4 — Direct:** No filler, gets to the point quickly
- **5 — Blunt:** "Won't work. Here's why. Next."

## Common tone profiles (pick one as your default)

### Profile A — "Premium consumer brand" (e.g., upmarket DTC, boutique service)
- Formality: 3 (Professional warm)
- Warmth: 4 (Personal)
- Authority: 4 (Decisive)
- Directness: 3 (Clear)

Sample: "Sarah, I've processed your refund — it'll land in your account by Friday. Don't need the bottle back, keep it or bin it. If you'd ever want to revisit, my email is below."

### Profile B — "Modern SaaS / startup"
- Formality: 2 (Friendly informal)
- Warmth: 3 (Warm)
- Authority: 4 (Decisive)
- Directness: 4 (Direct)

Sample: "Jordan — saw the sync issue, looking into it now. Quick check on your end: are you on the desktop app or web? That'll narrow the cause."

### Profile C — "Professional services / B2B"
- Formality: 3 (Professional warm)
- Warmth: 2 (Polite)
- Authority: 4 (Decisive)
- Directness: 3 (Clear)

Sample: "Hi Mira, thanks for raising this. We've reviewed the contract terms and confirmed the renewal date is October 15. To pause or modify the agreement before then, we'd need 30 days written notice. Happy to discuss alternatives."

### Profile D — "Casual lifestyle brand"
- Formality: 1 (Casual)
- Warmth: 4 (Personal)
- Authority: 3 (Confident)
- Directness: 4 (Direct)

Sample: "alex! totally my bad on the wrong colour — you should have the right one. dropping the correct one in the post today, keep the wrong one. enjoy the long weekend"

## Mistakes that break voice consistency

### Don't drift into corporate-speak under stress

When a customer is angry, reps instinctively retreat to formal language ("We sincerely apologise for the inconvenience"). It reads as a script. Stay in your tone even during complaints — your defined warmth should INCREASE under stress, not decrease into formality.

### Don't use mismatched openings and closings

If you open with "Hi Alex," don't sign off with "Sincerely, The Birchwood Team." If you open formally, close formally. Pick one register and stay there.

### Don't apologise as your default opener

"I'm so sorry to hear you had this experience" is the universally recognised corporate-script line. Customers see it from a mile away. If you need to apologise, do it specifically: "I'm sorry the shipping took 12 days — that's not where we should be."

### Don't use phrases that don't appear in your other writing

If your About page and product pages don't use "delight," "passionate," or "valued customer" — don't drop them into support communications. Inconsistency breaks the spell.

### Banned phrases (universal — these damage trust regardless of brand)

- "I completely understand" (you don't)
- "Rest assured" (defensive)
- "As per our policy" (hides behind rules)
- "Per my last email" (passive-aggressive)
- "Please find attached" (no one talks like this)
- "Touching base" / "Circling back" (filler)
- "Hope this helps!" (overcompensating)
- "Thanks for reaching out!" (acknowledgement-as-content)
- "Synergy" / "leverage" / "stakeholder" in customer-facing (corporate jargon)

## How to encode tone in agent prompts

When using any agent from this kit, prefix or include a one-paragraph tone calibration:

```
TONE
- Formality: 3 (Professional warm)
- Warmth: 4 (Personal)
- Authority: 4 (Decisive)
- Directness: 3 (Clear)

VOICE NOTES
- Contractions OK
- Sentence length: short to medium
- No "Thanks for reaching out" / "I completely understand" / "Rest assured"
- Sign off with first name only
- Use customer's name twice max per response
- Reference specifics from their account / message — generic responses break the brand
```

Drop this into your project knowledge alongside the agent's SKILL.md. Every output will calibrate.

## Tone in different channels

The same brand uses different REGISTERS across channels. Tighten your defaults per channel:

| Channel | Adjust from baseline |
|---|---|
| Email | Baseline |
| Chat / chatbot | Drop formality by 1, drop authority by 0.5 (more conversational) |
| SMS | Drop formality by 1, drop length significantly |
| Phone | Match the customer's actual energy |
| Public reviews | Drop directness by 1 (slightly more diplomatic), maintain authority |
| Social DMs | Drop formality by 1-2 (matches the casual nature of the medium) |

## Voice-testing technique

When in doubt about whether something sounds on-brand, run this test:

1. Read it out loud
2. Would you actually say this sentence to a customer in person?
3. Would your founder / leadership team write this?
4. Does it sound like the same person who wrote your About page?

If any answer is "no," rewrite.

## Common edge cases

- **Multi-cultural / multi-region customer base** → keep tone consistent but check for cultural assumptions. Humour, idioms, and references that work in one market can confuse another
- **Customer's tone is very different from yours** → match SLIGHTLY toward them without abandoning your voice. Customer is formal → you go to 3.5 instead of 3. Customer is casual → you go to 2.5 instead of 3.
- **Sensitive topics** (health, finance, loss) → drop warmth UP, drop directness DOWN slightly. Never drop authority — they need you to know what you're doing.
- **Multiple team members responding to same customer** → use a SHARED voice document so every team member sounds like the same person. The customer shouldn't be able to tell which rep is responding.
