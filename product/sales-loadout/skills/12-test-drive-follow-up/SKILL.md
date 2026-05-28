---
name: test-drive-follow-up
description: Use this skill specifically in the 24-48 hours AFTER a customer has done a test drive — the under-used moment in most dealership workflows where most reps either send a generic "thanks for coming in" or nothing at all. Triggers on phrases like "post-test-drive message for [name]", "[customer] just test drove the [model]", "what should I send after the test drive", "follow-up for the test drive yesterday", "test drive recap message", "they drove the [model] yesterday — write the next message". Generates ONE polished follow-up message tuned to what actually happened during the drive: which features they reacted to, which concerns they raised, what they compared it to. Calibrated for the specific decision-window window where test-drive customers are most replyable. This is a single-shot follow-up; for multi-touch sequences use follow-up-sequence.
---

# Test Drive Follow-Up

The 48 hours after a test drive is the most under-used moment in dealership sales. Customers are warm, the memory is fresh, they're talking to their partner/family about it. Most reps either send nothing or send a generic "thanks for coming in" that gets ignored.

Your job: write the ONE message that lands within that 48-hour window, references what *actually happened* during the drive, and asks one specific question that's hard to ignore.

If the customer is now past the 48-hour window or has already been quoted and gone quiet, redirect to `follow-up-sequence` — the dynamics shift after that.

## What you need from the user

If missing, ask quickly:
- **Customer first name**
- **Vehicle they drove** — model + trim + colour if known
- **When they drove it** — yesterday morning, this afternoon, etc.
- **What they reacted to during the drive** — "loved the boot space", "kept asking about charging", "compared it to their current car a lot", "said it was bigger than they expected"
- **Concerns or pushback** they raised — "thought it might be too big for the garage", "wasn't sure about the colour", "said the finance figure was high"
- **What was discussed about next steps** — "going to think about it", "asked for a quote", "comparing it with X", "talking to their partner tonight"
- **Channel** — email or SMS (SMS lands much better in this window)
- **Rep's first name**

You can run with less, but the single most useful input is "what did they react to" — that's the hook for the message.

## How to think about post-test-drive

The customer just had a multi-sensory experience with the car. They have OPINIONS. The follow-up's job is to:

1. Reference one specific thing from the drive (proves you were paying attention, not running a script)
2. Address the one concern they raised (shows you listened, not just sold)
3. Ask ONE question that requires more than a yes/no — but is easy to answer

That's it. Don't pile in a quote, a hold offer, a competitor comparison, a finance pitch. One message, one job, one question.

## Output format

```
**Channel:** [SMS / Email]
**Subject line** (email only): [line]
**Timing:** [send within X hours of the drive — usually same-day evening or next morning]

**Message:**

[the message body]

— [Rep first name]

---

**Why this lands:**
- [one line — the hook from the drive]
- [one line — the question and why it's hard to ignore]

**If they reply with [likely answer A]:**
- [next move]

**If they reply with [likely answer B]:**
- [next move]

**If they don't reply within 72 hours:**
- [single soft follow-up move, then they shift into the follow-up-sequence skill]
```

## Worked examples

### Example A — Engaged single buyer

**User input:** "Sarah test-drove the 2024 Sportage SX in Snow White on Saturday morning. She was really positive — kept commenting on how quiet the cabin was vs her current 2017 Mazda CX-5. Reacted well to the boot space (she's into camping/dogs). Concern was the price — said it was 'at the top of what she was thinking.' Going to 'sit with it over the weekend.' I'm Alex. Send Saturday evening."

**Good output:**

**Channel:** SMS
**Timing:** Saturday evening, around 6pm (lets her relax after the drive but stays in same-day window)

**Message:**

Hi Sarah — Alex from the dealership. Hope the rest of the day's been good. One thing I forgot to mention on the drive — the Sportage SX has that proper-sized 90L cool box mount in the boot that fits a 50L Engel without losing the seat split. Thought of you with the camping setup. Have a think over the weekend, no rush. Happy to walk through the price piece if that's the bit still sitting awkwardly.

— Alex

---

**Why this lands:**
- Hook from the drive: the camping/dogs angle. She mentioned it, you remembered, you tied it back to a specific feature you didn't show her. Proves attention.
- Question (soft): not really a question — it's an open door specifically on the price concern she raised. Doesn't push, doesn't pretend price wasn't a thing.

**If she replies with "Yes please":**
- Don't dump finance options into SMS. Reply: "Want me to send through 3 quick options on different deposit / weekly figures? Email easier?" Then send the email Monday morning.

**If she replies with "Still thinking":**
- Reply once on Sunday evening: "All good — if the colour or stock availability is part of what's holding you up, just let me know and I can hold the Snow White for 48 hours while you decide." Then back off.

**If she doesn't reply within 72 hours:**
- Run her into `follow-up-sequence`. The post-test-drive window has closed, she's now a Day-3 quiet quote follow-up.

---

### Example B — Couple, one enthusiastic + one skeptical

**User input:** "The Patel family — husband Raj and wife Maya — test-drove the 2024 Carnival Platinum on Thursday afternoon. Raj loved it (3 kids, sliding doors, all the room). Maya was reserved — kept comparing it to a Hyundai Staria. Concern was 'whether it's too much car for school runs.' Discussed next steps: they're going to look at the Staria over the weekend, then decide. I'm Mel. Send Thursday evening."

**Good output:**

**Channel:** Email
**Subject line:** That Carnival drive + the Staria comparison
**Timing:** Thursday evening, before 8pm

**Message:**

Hi Raj and Maya,

Thanks for coming in for the Carnival drive this afternoon — Raj, hope the third-row legroom held up to your expectations, and Maya, I appreciate you being upfront about the Staria comparison.

Genuinely worth driving both before deciding — they're more different than the spec sheet suggests, especially around the school-run question Maya raised. Honest take: the Staria is a smaller drive footprint by about 30cm in length, which on a tight school car park is meaningful. The Carnival's reverse camera and sensor setup is one of the better ones in the segment for that exact use case, but only if you trust the tech.

One question — when you're at the Hyundai dealer this weekend, two things worth checking that often get glossed:
1. The legroom in row 3 with row 2 set for an adult (most demos are with row 2 pushed forward)
2. The boot capacity behind row 3 fully up (also often shown with rows down)

Happy to be a sounding board on what you see. No pressure either way — drive both, then we'll talk.

— Mel

---

**Why this lands:**
- Addresses BOTH decision-makers individually (Raj on legroom, Maya on the Staria comparison)
- Doesn't bash the Staria — instead, gives them honest things to check, which positions you as advisor not salesperson
- The "no pressure, drive both" framing earns the right to be the trusted voice when they come back to compare

**If they reply (likely scenario) thanking you and confirming they'll drive the Staria:**
- Reply briefly: "Great. Take your time, happy to chat after." Don't pile on more info. You've earned the second meeting.

**If they reply with specific questions:**
- Answer the questions. Don't try to close.

**If they don't reply within 72 hours:**
- Send ONE message after the weekend (Monday morning): "Hi Raj and Maya — how did the Staria drive go? Happy to compare notes whenever suits." Then run into `follow-up-sequence` if still quiet.

---

### Example C — Test drive that went poorly (the under-used save)

**User input:** "Tom test-drove the Cerato GT yesterday. Honestly, didn't go great — the GT has a stiff ride that he didn't expect, and he kept saying 'I think I'd prefer something softer.' He's now leaning towards the regular Sportage. We discussed swapping focus to Sportage. I'm Sam."

**Good output:**

**Channel:** SMS
**Timing:** Same-day evening

**Message:**

Hi Tom — Sam here. Appreciated your honesty on the Cerato GT ride feel today. That stiffness catches a lot of people who haven't driven the GT trim before. Want to come back Saturday and drive a Sportage S — totally different setup, softer ride, but you keep that punchier engine feel you wanted? No pressure, just easier than guessing.

— Sam

---

**Why this lands:**
- Acknowledges the negative experience honestly (which builds trust)
- Reframes from "bad test drive" to "good data point" — the GT ride wasn't a failure, it was useful information
- Offers a specific next drive that addresses his exact preference, not a vague "come back sometime"
- Customer who didn't love the first drive often comes back if you make the second drive feel easy and pre-targeted

**If he replies positively:** Book the Saturday slot immediately. Don't let it drift.

**If he doesn't reply within 48 hours:**
- One final message: "Hi Tom — Sportage S is still here if you change your mind. If you're going to keep looking elsewhere, totally fine — just thought I'd close the loop." Then close the file. He's not a 7-touch sequence customer; he's a "fit wasn't right" customer.

## Common edge cases

- **Customer was already a quoted/considering customer (not first-touch):** This skill still works, but ground the message in the new test-drive info rather than the prior history. Don't pile both.
- **Test drive was a corporate / fleet evaluation:** Different dynamics — they're evaluating against operational criteria, not emotional ones. Adjust: lead with capability points (payload, tow, fuel economy) rather than feel/experience.
- **Customer test-drove TWO vehicles at the same visit:** Send a follow-up about ONE of them — the one they reacted to more strongly. A "you drove both, here's a comparison" email is too long and too sales-y in this window. Pick one.
- **Customer was clearly just there to drive for fun (not buying):** Polite single SMS thanking them, no question. Don't run them through a follow-up sequence — they're not a lead.
- **Customer drove a competitor's car the same day:** Reference it directly without bashing. "Hope the back-to-back with the [competitor] was useful — happy to debrief on the differences if it'd help."

## What NOT to do

- Don't send "thanks for coming in!" with no specific content. It's worse than sending nothing.
- Don't include a quote in the post-test-drive message unless they explicitly asked for one. Pushing pricing in this window damages trust.
- Don't ask for a sale ("Want to come in tomorrow to finalise?") — too fast. The message earns the right to a NEXT conversation, not a close.
- Don't write more than 5 lines of email body or 3 sentences of SMS for this window. The customer just had a 30-minute experience with the car — they want a brief follow-up, not a wall of text.
- Don't send post-test-drive follow-ups MORE than 48 hours after the drive. Past that window, the dynamics shift to the regular `follow-up-sequence` patterns.
