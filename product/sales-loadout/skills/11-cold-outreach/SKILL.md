---
name: cold-outreach
description: Use this skill when a car-dealership sales rep needs to write a cold outreach message to a prospect they haven't talked to yet. Triggers on phrases like "write a cold email to [prospect]", "draft a LinkedIn message for [name]", "cold SMS for [prospect type]", "I want to reach out to [type of buyer] — what should I say", "I'm targeting fleet buyers — write me an outreach", "cold approach to [businesstype]", "tradie outreach for utes". Generates ONE message (not a sequence) sharp enough to get a reply from a stranger — meaning it's brief, specific, mentions a real reason for contacting them, and has a low-pressure CTA. Channel-aware: writes differently for email vs SMS vs LinkedIn. Anti-spam discipline by design.
---

# Cold Outreach

You're writing a cold message to a prospect the rep doesn't have a relationship with yet. The goal is a reply — not a sale. Cold messages that try to sell on first contact get deleted. Cold messages that earn a 30-second response open a conversation.

If the rep already has a relationship (prior enquiry, past customer, referred lead), this isn't the right skill — `sales-email-generator` is. This skill is for true cold contact.

## What you need from the user

If missing, ask:
- **Who they're contacting** — name (if known), business name (for B2B), role/situation
- **Why they're contacting them** — be specific. "Saw their fleet on the road", "drove past their site and noticed all their utes are X brand", "their company posted a hiring expansion online", "a mutual customer mentioned them", "they liked a competitor's social post about a model we sell"
- **Channel** — email / SMS / LinkedIn DM
- **What the rep is offering** — a specific vehicle? A fleet conversation? A test drive invite? A quote?
- **Rep's first name + dealership**

The "why they're contacting them" is the critical input. Without a specific reason, the message is cold spam. With a specific reason, it's a real outreach. If the rep can't articulate one, push back: "Why this prospect, specifically? What's the trigger?"

## How to think about cold outreach by channel

**Email** — 4–6 lines max. Subject line is everything. Open with the specific reason for reaching out, not "I hope this finds you well." End with a low-pressure CTA.

**SMS** — 2 sentences max, ~160 characters. Identify yourself (dealer + first name), state the specific reason, ask one easy yes/no question. Never sell.

**LinkedIn DM** — 3–4 lines. More room than SMS but less than email. Reference something specific from their profile, post, or company news. The CTA is usually "open to a quick chat" rather than "want a quote."

## Output format

```
**Channel:** [Email / SMS / LinkedIn]
**Subject line** (email only): [line]

**Message:**

[the message body]

— [Rep first name]
[Optional: dealership name on email, omitted on SMS]

---

**Why this works:**
- [one line — the hook]
- [one line — the CTA quality]

**If they don't reply within [N days]:**
- [single follow-up move, no more]

**Don't do:**
- [the anti-pattern that ruins this kind of cold outreach]
```

## Worked examples

### Example A — Cold email to a fleet buyer

**User input:** "Write a cold email to the operations manager at McGrath Plumbing — they have a fleet of 12 utes (Hilux mostly, some Rangers), I drove past their yard and noticed two had For Sale signs. They might be cycling out the older units. I want to introduce myself + Triton GLS-R fleet pricing. I'm Alex at Gateway Mitsubishi."

**Good output:**

**Channel:** Email
**Subject line:** Your two For Sale Hilux — quick fleet note

**Message:**

Hi [Ops manager name],

Drove past the McGrath yard yesterday and noticed two For Sale signs on the older Hilux. If you're rotating the fleet, worth a 5-minute chat before you commit to like-for-like.

Mitsubishi Triton GLS-R, fleet pricing — we've done a few similar trades-and-replace deals for plumbing fleets in the area lately, including a couple where the rotated Hilux moved fast on the second-hand market.

Happy to send a quick comparison sheet or grab a coffee. Either way, good luck with the cycle.

— Alex
Gateway Mitsubishi

---

**Why this works:**
- Specific real-world observation as the hook (For Sale signs) — proves it's not a mass blast
- Doesn't pitch the Triton over the Hilux; offers a comparison and acknowledges Toyota loyalty is real
- "Either way, good luck with the cycle" closes with a no-pressure off-ramp, which paradoxically raises reply rates

**If they don't reply within 5 days:**
- Send ONE follow-up — a single line: "Hi [name], didn't want this to drop. If now's not the right time happy to leave it. — Alex." Don't chase a third time. If they want it, they'll reply.

**Don't do:**
- Don't lead with the Triton's spec sheet. They know what a ute is. Lead with WHY YOU.
- Don't bash Toyota. Plumbing fleets that run Hilux often run Hilux for a reason — your job is to earn a comparison conversation, not win an argument.

---

### Example B — Cold SMS to a private prospect

**User input:** "Cold SMS to Mark — he commented on our dealership Instagram post about the new EV5 yesterday saying 'looks sharp, what's the range?'. We got his number from the comment because he tagged his personal account that has it. Want to follow up with a soft hello. I'm Sam at Gateway Kia."

**Good output:**

**Channel:** SMS
**Message:**

Hi Mark, Sam from Gateway Kia. Saw your range question on the EV5 post — quick answer: 540km WLTP on the Air long-range. Happy to send you the full breakdown or get you behind the wheel if you're curious. No rush.

— Sam

---

**Why this works:**
- Identifies the source (the Instagram comment) — feels like a real human, not a list
- Answers his actual question in the message, not just teases it. Information first, ask second.
- "No rush" disarms the cold-text suspicion ("oh god, sales pitch incoming")

**If he doesn't reply within 3 days:**
- Skip the follow-up. SMS chasing on a single Instagram comment crosses into creepy. If he wanted more, the door's open.

**Don't do:**
- Don't include a link in cold SMS — flagged as spam by carriers and customers
- Don't push for a test drive in the first SMS — the message is "here's the answer, door is open"

---

### Example C — Cold LinkedIn DM to a small-business owner

**User input:** "Cold LinkedIn DM to Jess Thomas — she just posted about scaling her landscaping business from 4 utes to 8. Want to introduce myself for the new ute purchases. I'm Alex at Gateway Mitsubishi."

**Good output:**

**Channel:** LinkedIn DM
**Message:**

Hi Jess, saw your post about doubling the fleet — congrats. The 4-to-8 step is the awkward middle where pricing structures shift, depending on how you go about it.

If you'd want a quick comparison of what a fleet of 4 new Tritons would look like vs financing 4 + holding the existing 4, happy to put it together — no obligation. We do this kind of analysis for a few growing trades businesses around the Wollongong area.

— Alex
Gateway Mitsubishi

---

**Why this works:**
- Genuine acknowledgement of the post (read it, understood it) before pitching anything
- Specific pain point of the 4-to-8 scaling stage (the financing/structuring complexity) — shows you've thought about her business, not just "selling utes"
- "No obligation, here's the work" CTA — gives her something useful even if she doesn't proceed
- Mention of "few growing trades businesses around Wollongong" is social proof without being braggy

**If she doesn't reply within 7 days:**
- Comment thoughtfully on a different post of hers (not a sales comment — a real insight). Build the relationship before pushing again. LinkedIn rewards patience.

**Don't do:**
- Don't connect first without a message, then send the pitch as the second touch — that's the spammy pattern.
- Don't include a calendar link in the first DM. Suggest the call only after she replies positively.

## Common edge cases

- **The rep has no specific reason for reaching out:** Push back. Generic cold outreach doesn't work and you'll waste the prospect's reputation with them. Ask: "What made you pick THIS person, today? What did you see, read, or hear about them?" If they have nothing, suggest they don't send.
- **B2B fleet prospect:** Always go through email or LinkedIn first, not SMS. SMS to a business number for cold outreach reads as desperate.
- **Referred lead (a customer mentioned them):** Lead with the referral name in the first line. "Sarah Jenkins mentioned you might be in the market" — it's the warmest cold-outreach hook there is.
- **Prospect saw a specific online listing / ad:** Reference the listing. "Saw you booked a test drive enquiry online — the [vehicle] is still here."
- **Tradies / blue-collar B2B:** Keep it shorter. Phone call > SMS > email. Avoid LinkedIn — most tradies don't check it.

## What NOT to do

- Don't open cold messages with "I hope this email finds you well." It signals automation immediately.
- Don't write more than 6 lines of email body for cold outreach. 4 is better.
- Don't pitch on the first message. The message is to start a conversation, not close a deal.
- Don't include 3 CTAs ("call me, or email me, or reply, or fill in this form"). One easy yes/no question.
- Don't reference data the prospect didn't share publicly (e.g., "I see your business turns over $X") — instantly creepy.
- Don't fake personalisation. "Hi {First Name}, I noticed your interest in {Vehicle}!" reads as obvious mail-merge. If you don't have real personalisation, don't send.
