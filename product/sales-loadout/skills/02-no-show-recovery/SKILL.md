---
name: no-show-recovery
description: Use this skill when a car-dealership sales rep has a no-show situation — a customer booked a test drive / finance appointment / pickup / handover and didn't turn up. Triggers on phrases like "they didn't show", "the [name] family no-showed", "had a no-show this morning", "didn't turn up for their test drive", "missed appointment", "didn't make their finance appointment". Generates a tight 3-touch recovery sequence (same day, +2 day, +5 day) with messages that are warm rather than guilt-tripping, plus an honest "is this still a real lead?" assessment so the rep doesn't waste a week chasing someone who's already gone elsewhere.
---

# No-Show Recovery

You're helping a car-dealership sales rep recover a no-show appointment. The customer booked time, didn't show. Two thirds of no-shows are NOT bad-faith — they're life-got-in-the-way. Your messages should assume that and give them an easy reschedule, not a guilt trip. The other third never intended to come; design Touch 3 to surface that signal cleanly so the rep can move on.

## What you need from the user

If missing, ask:
- **Customer first name**
- **What they were booked for** — test drive / finance appointment / handover / showroom visit
- **Original appointment time** (just so you can reference it specifically)
- **Vehicle / deal context** — what model, what stage of the deal
- **Channel preference** — how they booked (online, phone, SMS)
- **Rep's first name**

## How to structure the recovery

3 touches, max. Anything longer is harassment.

- **Touch 1 (same day, 1–3 hours after the missed slot):** Warm, no-blame SMS or short call. Assume something came up. Offer a clear reschedule.
- **Touch 2 (Day +2):** Email if Touch 1 was SMS, SMS if Touch 1 was email. Single line + reschedule link or two suggested times.
- **Touch 3 (Day +5):** Permission-based close. "Want me to assume the timing's no longer right, or shall we try once more?" This is the surface — if they don't reply to this, they're not a lead.

## Tone discipline

- **Never lead with "you missed your appointment" or "we were expecting you."** The customer already feels the social weight of standing you up; piling on lowers reply rates.
- **Single reschedule path per message** — don't offer 5 time slots in Touch 1.
- **Don't moralise.** "Just wanted to make sure you're OK" is fine. "We held the slot for you specifically" is guilt-tripping.
- **Touch 3 should be honest, not passive-aggressive.** "Want me to assume the timing's no longer right" gives them dignity; "I haven't heard from you" does not.

## Output format

```
# No-show recovery — [Customer first name] · [What they missed]
**Context:** [one line]
**Read on the lead:** [your honest take — Hot / Warm / Likely lost / Need more signal]

---

## Touch 1 — same day · [Channel]
**Body:**
[message]

---

## Touch 2 — Day +2 · [Channel]
**Subject** (email only): [line]
**Body:**
[message]

---

## Touch 3 — Day +5 · [Channel]
**Subject** (email only): [line]
**Body:**
[message]

---

**Notes for the rep:**
- [signals to watch for]
- [when to stop]
```

## Worked example

**User input:**
> "Marcus no-showed his test drive at 10am today. Triton GLX-R, white. Booked online 4 days ago, confirmed by email. We've emailed once and called once, no answer. I'm Alex."

**Good output:**

# No-show recovery — Marcus · 10am Triton GLX-R test drive (white)
**Context:** Booked online 4 days ago, confirmed by email, didn't show at 10am today.
**Read on the lead:** Need more signal. Online booking + a confirmation 4 days out usually means real intent. The unanswered phone today is the worrying bit — likely either (a) work emergency, (b) bought elsewhere this weekend, or (c) cold feet about the price. Touch 1 surfaces which.

---

### Touch 1 — same day (this afternoon) · SMS
**Body:**
Hi Marcus, Alex from the dealership. No drama about this morning — life happens. The white Triton GLX-R is still here when you are. Want me to flick you a couple of times to try again this week?

---

### Touch 2 — Day +2 · Email
**Subject:** That Triton — still here when you are
**Body:**
Hi Marcus,

Just looping back — the white GLX-R is still in the lot. If a Saturday morning works better than a weekday, I can hold one of the 10am or 11am slots for you. Reply with whichever and I'll lock it in.

— Alex

---

### Touch 3 — Day +5 · SMS
**Body:**
Hi Marcus, last message from me on this one. Want me to assume the timing's no longer right and close the file, or shall I keep an eye out for a similar Triton if one comes in?

---

**Notes for the rep:**
- If he replies at any point, drop the rest of the sequence and book him in.
- If Touch 3 gets no reply, mark the lead lost — don't reopen the file unless he initiates contact.
- The "keep an eye out for a similar Triton" framing in Touch 3 lets him say "yes please" without committing to a date, which catches the people who *do* want the car but had a genuine reason for ghosting.
- If you find out he bought elsewhere between Touch 1 and 3, send one short "congrats on the new ute" message and close. Long-term referrals come from gracefully losing.

## Common edge cases

- **They no-showed a handover (signed deal):** This is urgent — switch to phone immediately, don't wait the 1–3 hours. Handover no-shows are usually finance-collapse signals.
- **They no-showed a finance appointment:** They're probably hiding a pre-approval problem. Touch 1 should still be warm, but offer "happy to chat finance options informally before we make it formal" — gives them an out to surface the issue.
- **Repeat no-show (second time):** Don't run the sequence. One Touch 1 SMS, then close the file. The signal is clear.
- **They booked through a third-party platform (carsales, etc.):** They may not remember which dealership they booked with. Touch 1 must lead with which dealer + which specific vehicle.

## What NOT to do

- Don't send "we were expecting you at 10am" — they know.
- Don't mention what time was "held" for them — it sounds like guilt-tripping.
- Don't run more than 3 touches — at that point you're the problem.
- Don't make them book themselves through an online form again — propose specific times.
