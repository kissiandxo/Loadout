---
name: follow-up-sequence
description: Use this skill whenever a car-dealership sales rep needs a multi-touch follow-up plan for a stalled or quiet deal. Triggers on phrases like "draft a follow-up for [name]", "what should I send to [customer]", "haven't heard back from [lead]", "give me a sequence for [deal stage]", "the [customer name] deal has gone quiet", or whenever the rep describes a customer who's gone silent, didn't reply after a quote, didn't book a test drive after enquiring, or has been ghosted post-showroom-visit. Generates a 5–7 touchpoint sequence with channel, timing, and ready-to-send message drafts that reference the specific deal context — not generic spam-grade "just checking in" filler.
---

# Follow-Up Sequence

You're helping a car-dealership sales rep run a multi-touch follow-up on a customer who's gone quiet. The job of every message is to get a real reply — not just "stay in touch." A follow-up that doesn't move the deal isn't worth sending.

## What you need from the user

If any of these are missing from the prompt, ask for them before producing the sequence. Don't guess.

- **Customer first name**
- **Vehicle of interest** — model + trim/colour if known
- **Last contact event** — test drive, quote sent, showroom visit, online enquiry
- **Days since last contact**
- **Channel preference** they've responded on before (email / SMS / phone)
- **Rep's first name** — so you can sign off correctly

If the rep gives you a paragraph with most of this, extract it and start. If they give you only the name, ask.

## How to structure the sequence

Typical sequence: 5 touchpoints across 21 days, mixing channels. The dropout points where customers reply most are touches 1 and 4 — design for those.

- **Touch 1 (24–48h after last contact):** Short, low-pressure check-in. References the specific thing (the test drive, the quote, the model they sat in). One question. Pick the channel they last responded on.
- **Touch 2 (Day 5–7):** Add value or new information — finance offer ending, similar inventory arriving, brief vehicle highlight that addresses something they asked. Not a re-pitch.
- **Touch 3 (Day 10–12):** Switch channel. If you've been emailing, send an SMS. Shorter than touch 2.
- **Touch 4 (Day 14–16):** The "is now still the right time?" message. Gives them an easy out, which paradoxically lifts reply rates because it removes the pressure of "I have to commit."
- **Touch 5 (Day 21):** Permission-based close-out. "Would you like me to stop following up, or check back later in the year?" Frames silence as a choice they can opt into.

Optional Touch 6–7: only if a real event (price drop, new arrival in their colour, finance terms change) gives a genuine reason. Don't fabricate triggers.

## Tone discipline

- **Specific over generic.** "About the Sportage SX you test-drove on Saturday" beats "About your enquiry."
- **Short.** 2–3 sentences per touch. Sales reps reading these know walls of text don't convert.
- **No manufactured urgency.** "Stock is limited" without a real reason makes the rep sound desperate. Only use it when true.
- **One ask per message.** Don't pile in three CTAs.
- **First names only.** Sign as the rep's first name. "Alex from Kia" beats "Alex Jennings, Senior Sales Executive."
- **No corporate filler.** "Circling back", "touching base", "just bumping this", "as per my last email" — all banned. They flag the message as automated/lazy on first read.

## Output format

Use this exact structure so the rep can copy-paste each touch when its day arrives.

```
# Follow-up sequence — [Customer first name] · [Vehicle]
**Context:** [one-line summary of where the deal stands]
**Strategy:** [one-line why this sequence fits this customer]

---

## Touch 1 — Day [N] · [Channel]
**Subject** (email only): [line]
**Body:**
[message]

---

## Touch 2 — Day [N] · [Channel]
...
```

End with a short **Notes for the rep:** section calling out:
- The 1–2 highest-leverage messages in the sequence (where to put effort)
- What to do if the customer replies mid-sequence (always: stop the sequence, pivot to live conversation)
- Anything you assumed because the rep didn't provide it

## Worked example

**User input:**
> "Need a follow-up for Sarah. She test-drove a 2024 Kia Sportage SX in Snow White on Saturday, said she'd 'have a think.' I'm Alex. It's now Wednesday. We emailed her the quote on Sunday — no reply."

**Good output:**

```
# Follow-up sequence — Sarah · 2024 Kia Sportage SX (Snow White)
**Context:** Test-drove Saturday, quote emailed Sunday, no reply by Wednesday — 4 days quiet.
**Strategy:** Classic decision paralysis after a positive test drive. Soft SMS check-in first to match her last replied channel, then a value-add, then a permission-based close-out around day 21.

---

## Touch 1 — Day 4 (today) · SMS
**Body:**
Hi Sarah, Alex here from Kia. Just checking the Sportage quote from Sunday landed alright — happy to walk you through any of the figures, or hold the Snow White for you while you think. No pressure either way.

---

## Touch 2 — Day 7 · Email
**Subject:** That Sportage SX — quick thought
**Body:**
Hi Sarah,

Quick one — the Snow White SX you drove is the last one we've got in that colour locally. I've got a second SX coming in transit but it's Cherry Black.

If Snow White is the one, want me to put a 48-hour hold on it while you decide?

— Alex

---

## Touch 3 — Day 11 · SMS
**Body:**
Hi Sarah, hope your week's been good. The Snow White SX is still here. Any questions I can answer — finance, trade-in, anything I missed on Saturday?

---

## Touch 4 — Day 14 · Email
**Subject:** Should I pause this?
**Body:**
Hi Sarah,

I don't want to be the rep that won't take a hint. If you've decided the Sportage isn't the right fit, just reply "not now" and I'll close the file — no hard feelings.

If it's still on the cards but the timing's off, tell me when's better and I'll drop back into your inbox closer to then.

Either way, thanks for the test drive.

— Alex

---

## Touch 5 — Day 21 · Email
**Subject:** Final note — Sportage SX
**Body:**
Hi Sarah,

Last message from me on this one. If anything changed — finance, a different model, a partner who wanted to see it — I'm one message away. Otherwise, I'll leave it here.

— Alex

---

**Notes for the rep:**
- Touch 4 statistically pulls the highest reply rate — don't soften it. The easy out is the point.
- If Sarah replies to any touch, drop the rest of the sequence and pivot to a live conversation.
- I assumed she's comfortable with SMS because she gave you her number for the test drive. If she only replied via email previously, swap touches 1 and 3 to email.
```

## Common edge cases

- **They explicitly asked for "no contact for X weeks":** Honour it. Skip touches 1–3, start at the date they specified, lead with "you asked me to circle back around now."
- **They're a B2B/fleet buyer:** Lengthen the sequence to 60–90 days. Replace "stock running out" hooks with "fiscal year end" or "fleet refresh window" hooks. Use email more, SMS less.
- **They cited price as the reason for hesitation:** Touch 2 should be a finance / weekly-payment reframe, not new inventory. Touch 4 should explicitly ask: "is the headline figure the sticking point, or something else?"
- **They went silent after a finance decline:** Don't follow up from this skill — it's a different conversation. Tell the rep to escalate to their Business Manager or talk about alternative finance products in person.
- **They've explicitly said they bought elsewhere:** Send a single short "congrats on the new car" — no sequence. Genuinely no-strings. Long-term referrals come from gracefully losing.

## What NOT to do

- Don't open any message with "I just wanted to follow up." It signals filler. Open with the specific thing.
- Don't promise discounts, trade-in values, or finance approvals you can't personally authorise.
- Don't write more than 5 lines per touch — length kills follow-ups.
- Don't use "circling back," "touching base," "bumping this," or "as per my last email." Every sales rep who's read this skill knows those phrases make them sound like an outbound BDC bot.
- Don't run all touches in the same channel — channel-switching is half the lift.
