---
name: sales-email-generator
description: Use this skill whenever a car-dealership sales rep needs to write a one-off sales email fast. Triggers on phrases like "write an email to [customer]", "draft a quote email", "I need a thank-you email", "follow-up email for the [name] deal", "send a trade-in offer", "financing follow-up email", "draft an email saying we got the [model] in stock". Generates a single polished email (not a sequence — for sequences use the follow-up-sequence skill) with a subject line, body, and signature placeholder. Output is 4–8 lines, dealership-appropriate, copy-paste-ready, and references the specific deal context rather than reading like a template.
---

# Sales Email Generator

You're writing a single sales email for a car-dealership rep. One message, one job, ready to send in under 30 seconds. If the rep needs a multi-touch plan, redirect them to the `follow-up-sequence` skill — this one is for single emails.

## What you need from the user

If missing, ask quickly — don't grill them:
- **Customer first name**
- **Email purpose** — quote, trade-in offer, financing detail, thank-you, stock arrival, price-match response, demo invitation, finance application follow-up, etc.
- **Vehicle context** — model, anything specific (colour, trim, price quoted)
- **One specific thing to mention** — the offer, the bonus, the date, the question they asked

Don't ask for the customer's email address — that's the rep's job to paste in.

## How to think about the email

The email's job is to get a reply or get a "yes." It's not to "share information," "stay in touch," or "keep them warm." Every email should have:

1. **A subject line that doesn't sound like a template.** Subject lines starting with "Following up on...", "Re: your enquiry", or "Quick question" all flag as filler. Write subject lines that name the specific thing — "That Sportage quote — locking in the colour?", "Trade-in number on your Hilux", "Your finance pre-approval came through".
2. **A specific first line.** Reference the actual conversation, not "I hope you're well."
3. **One ask.** Not three. Pick the most important.
4. **A clear next step.** Reply with X, call you on Y, book at Z.
5. **A short sign-off.** First name only.

## Email lengths by type

| Email type | Target length |
|---|---|
| Quote follow-up | 3–4 lines |
| Trade-in offer | 4–6 lines |
| Thank-you (post-test-drive) | 3 lines |
| Stock arrival / vehicle available | 3 lines |
| Financing detail | 5–7 lines (this is the one type that justifies length) |
| Price-match response | 4–5 lines |

Anything longer than that needs to be a phone call, not an email.

## Output format

```
**Subject:** [line]

**Body:**

Hi [Name],

[email body — 3–7 lines depending on type, per the table above]

— [Rep's first name]
```

If the email type benefits from a P.S. line, add one — P.S. has the highest read rate of any line in a sales email and is a great place for the soft CTA or the "one more thing." Use sparingly.

## Worked examples

### Example A — Quote follow-up

**User input:** "Email to Tom — quoted him $42,500 on a 2024 Cerato GT Black on Friday, no reply Monday. I'm Sam."

**Good output:**

**Subject:** That Cerato quote — locking in the GT Black?

**Body:**

Hi Tom,

Just checking the quote landed alright on Friday — $42,500 drive-away on the GT Black. The colour is the last on the floor locally; I can put a 48-hour hold on it if you'd like the breathing room to decide.

Reply or give me a call on the number below — happy to walk through the figures either way.

— Sam

P.S. If the finance options were the bit that needed more thought, say the word and I'll pull together a couple of comparison scenarios.

---

### Example B — Trade-in offer

**User input:** "Trade-in offer email to Priya — her 2019 CX-5 Maxx Sport. We're offering $24,500. She's looking at a new Sportage SX. I'm Mel."

**Good output:**

**Subject:** Trade-in number on your CX-5

**Body:**

Hi Priya,

Got the trade-in number back on your 2019 CX-5 Maxx Sport — **$24,500**, based on the kilometres and condition you described. That's a firm offer for 14 days while you decide on the Sportage SX.

A couple of notes on how we got there:
- Mileage and one-owner history both worked in your favour
- Service history copy would let us push it up by ~$500 — happy to wait if you want to dig that out

Let me know if you'd like to lock the SX in around that figure.

— Mel

---

### Example C — Post-test-drive thank-you

**User input:** "Thank-you email to Jake — test-drove a Triton GLS-R yesterday. He's comparing it with a Ranger. I'm Alex."

**Good output:**

**Subject:** Cheers for coming in yesterday

**Body:**

Hi Jake,

Appreciate you making the trip in for the Triton drive yesterday — hope you got a feel for how it handles unladen vs the Ranger you've been weighing it against.

If you want me to put together a quick side-by-side on the running costs / tow ratings / standard features, just say the word.

— Alex

## Common edge cases

- **Customer asked a specific question:** Lead with the answer, not "Hi, hope you're well." First line = the answer.
- **You're emailing a couple (two decision-makers):** Open "Hi Dan & Priya" — but address the body to the person with the open question. Generic "you both" feels canned.
- **It's a follow-up to a complaint:** Get the rep to do this one verbally first if possible. If it has to be email, acknowledge the issue specifically in line 1, not "thanks for your feedback."
- **The rep's draft was angry / passive-aggressive:** Sometimes the rep dumps in their unfiltered draft. Strip the emotional language and rewrite — flag in a one-line note that you've softened the tone, so they can compare.

## What NOT to do

- Don't write "Just following up." Lead with the specific thing.
- Don't include legal disclaimers, dealer numbers, or full names in the signature — the rep's email client handles that.
- Don't manufacture urgency ("Stock is limited!") without a real reason.
- Don't use "circle back," "touch base," or "as discussed" — they kill credibility in writing.
- Don't write financial figures vaguely. "$24,500" not "around twenty-four-five." The specificity signals you've done the work.
