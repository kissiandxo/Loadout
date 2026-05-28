# Plugin: Weekly Recap Generator

A structured template + framework that turns a sales rep's messy end-of-week brain-dump into a clean weekly recap their BM, sales manager, or themselves can actually use.

## When to use this plugin

Friday afternoon, end-of-month, or whenever your sales manager asks "how's your week been?" Pair with:
- **pipeline-review** skill — for the strategic version
- **priority-list** skill — for next week's tactical view

## The template

Paste this into the project's chat (or load this REFERENCE.md as project knowledge), then dump your week into the chat in any format. Claude will produce the structured recap below.

```
# Sales Week Recap — [Week ending date]

## The numbers
- **Deals closed this week:** [count] — total value $[X]
- **New enquiries received:** [count]
- **Test drives conducted:** [count]
- **Quotes issued:** [count]
- **Open deals in pipeline:** [count, with stage breakdown]
- **Month-to-date close vs target:** [X of Y]

## What worked this week
- [specific deal that closed + the move that closed it]
- [specific tactical win — e.g., "phone-call follow-up on Day 5 unstuck Tom's deal"]
- [a process or habit change that paid off]

## What didn't work
- [specific deal that fell over + the honest root cause]
- [a follow-up pattern that's not landing — e.g., "Tuesday SMS follow-ups returning <10% reply rate"]
- [admin or operational drag that hit the week]

## Wins beyond the numbers
- [a customer relationship that levelled up]
- [a referral generated]
- [a service-customer interaction that has future deal value]

## Risks heading into next week
- [deal in danger that needs immediate intervention]
- [stuck deal that needs a decision (push or close)]
- [external factor — end of month, finance terms changing, stock movement]

## Next week's focus
- **The single most important deal:** [name + why]
- **Three deals that need calls (not emails):** [list]
- **The administrative thing I'll stop putting off:** [the bm chase / the stock check / the cold leads triage]
```

## Worked example

**User input dump:**
> "Closed 3 deals this week — Sorento with the McKinnons ($72k), Cerato with Tom ($43k), and the Holland Outlander PHEV ($76k + trade). New enquiries: probably about 12, hard to count, online and walk-in. Test drives: 7 I think. Quotes: maybe 9. Pipeline: 14 open — heavy in the quoted stage. Hit 5 of 8 month target.
>
> What worked: the phone call on Tom on Tuesday — broke his decision paralysis. The objection-prep on the Hollands meeting on Wednesday was clutch, Priya's running-cost question was the close moment. Sarah ghosted, didn't recover her.
>
> What didn't: lost Patel family, finance fell through on the Carnival. Marcus disappeared after his test drive no-show. Email follow-ups across the board feel like they're getting opened-but-not-replied — I think I'm sending too many on Mondays.
>
> Wins: the McKinnons want to refer their daughter who's looking at a Cerato. Got a really positive review from the Holland family that I'll write up for the Google page.
>
> Risks: Riley's Saturday booking — they're a maybe, not a yes. Got 3 deals in the 'quoted >10 days no reply' bucket I haven't decided on. End of month is in 12 days and I need 3 more deals to hit number.
>
> Next week: Riley Saturday is biggest, need to prep. Want to phone Sarah, the Patel family, and the 3 quoted-no-reply leads. The lead-list cleanup from January is finally going to happen Friday afternoon."

**Good output:**

# Sales Week Recap — Week ending [date]

## The numbers
- **Deals closed this week:** 3 — total value $191,000 + trade
- **New enquiries received:** ~12 (mix of online + walk-in)
- **Test drives conducted:** 7
- **Quotes issued:** 9
- **Open deals in pipeline:** 14 (heavy in quoted stage)
- **Month-to-date close vs target:** 5 of 8

## What worked this week
- **The Tuesday phone call to Tom** — he was stuck in decision paralysis post-quote. A 5-minute call unlocked a $43k Cerato GT close that an email would have lost. Lesson: when a quoted deal goes quiet, the phone is the right move on Day 4–5, not Day 14.
- **Pre-meeting prep on the Hollands** — running the objection-prep skill the night before meant Priya's running-cost question was answered before she finished asking it. That was the close moment. Worth treating Holland-tier meetings as ALWAYS deserving the prep time.
- **The McKinnons handover** — went smoothly, paperwork was pre-filled, finance was unstuck mid-week. Result: a referral mentioned in conversation (their daughter, Cerato GT shopper).

## What didn't work
- **Sarah's Sportage deal** — quoted Day 0, then went silent. Touched her with 2 emails, no SMS, no phone. Email-only was the wrong cadence for a single-buyer first-timer.
- **Patel family Carnival** — finance fell through on a deal that was verbal-yes. Root cause: too long between pre-approval and formal application. Lesson: lock formal finance within 7 days of verbal yes, every time.
- **Marcus no-show + ghost** — no-showed his Triton test drive, ignored 2 follow-ups. He bought elsewhere or went off the idea. Two follow-ups was correct; the time between them (3 days) might have been too short.
- **Monday email pattern** — feels like Monday emails are opened-but-not-replied. Worth A/B-ing the cadence — try Tuesday or Wednesday morning for the next 3 weeks.

## Wins beyond the numbers
- **McKinnons referral** — their daughter (early-20s, looking at Cerato). Warm intro on the way. Hot referral with no prospecting cost.
- **Holland family Google review** — Priya offered. Writing it up before they head off on the road trip. Worth chasing the few minutes to actually get it posted.

## Risks heading into next week
- **Riley's Saturday ASX appointment** — a "maybe" not a "yes." If Riley doesn't convert, the month-end math gets harder. Treat Saturday like a real selling day, not a casual walk-through.
- **Three deals stuck quoted-no-reply** — Sarah (Sportage), and two un-named in the dump. Either they're a "make a call this week" or they're dead. The midweek triage is the move.
- **End of month is 12 days away — 3 more deals needed.** Working backwards from EOFY, that's one close every 4 days. Riley Saturday is the closest realistic close. The 3 quoted-stalled leads are the volume play.

## Next week's focus
- **The single most important deal:** Riley · ASX · Saturday morning. Prep the objection-prep + Saturday-only buyer profile work Friday evening. This is the deal that determines whether next week is on-target or behind.
- **Three deals that need calls (not emails) next week:**
  1. Sarah (Sportage SX) — switch from email to phone, Tuesday morning.
  2. Patel family — phone with honesty: "the bank declined, here's what we can still do" — don't ghost them just because their original deal fell over.
  3. The two unnamed quoted-no-reply leads — both phone calls, Wednesday afternoon block.
- **The administrative thing I'll stop putting off:** January's stale lead-list cleanup, Friday afternoon. Half of those are probably re-engageable in some form via the lead-re-engagement plugin patterns.

---

**Honest note for the rep:** A 3-close week at $190k+ is good. The frustration in your dump (Sarah, Patel, Marcus, the Monday emails) is real and worth fixing, but don't let the losses noise out the wins — the McKinnons handover and the Holland close are both top-tier outcomes. The Riley deal is the one to obsess over for the next 5 days.

---

## How to use this in Claude.ai

1. Friday afternoon, paste this template into your Sales Loadout chat
2. Above it, dump your week as a stream-of-consciousness paragraph — exactly like the worked example above
3. Claude returns the structured recap
4. Forward it to your manager, paste into your CRM weekly notes, or just keep it for yourself

**Pro tip:** Do this the same hour every Friday. The discipline matters more than the polish. A 70%-quality weekly recap done every week beats a 95%-quality one done once a month.

## What NOT to do

- Don't sanitise the dump for the recap. The honest stuff is what makes the recap useful — to you and to your manager.
- Don't list every single deal you touched. The recap should be a signal, not a log. The CRM is the log.
- Don't end the recap with vague resolutions ("do better at follow-ups"). The "Next week's focus" should have names, dates, and channels.
- Don't write this for your manager only. The first audience is YOU, 7 days from now, trying to remember what to act on.
