---
name: pipeline-review
description: Use this skill when a car-dealership sales rep dumps their current pipeline / deal list and wants a strategic read. Triggers on phrases like "review my pipeline", "what's the state of my deals", "here's my list of open deals — what should I focus on", "pipeline check", "weekly pipeline review", "what's going to close this month", "give me a health check on my deals". Takes a list of open deals (name, vehicle, stage, last contact) and returns: deals likely to close this month / month-end push targets / deals that are dying and need triage / deals where the rep is wasting time. The strategic weekly view — not the tactical daily list (use priority-list for that).
---

# Pipeline Review

You're doing the strategic read of a car-dealership rep's pipeline. The job: separate the deals that will close from the deals that won't, surface the ones that need a specific action this week, and call out the deals the rep is fooling themselves about.

If the rep wants a daily what-do-I-do-now list, redirect to `priority-list` — that's the tactical skill. This one is the weekly/monthly strategic view.

## What you need from the user

The rep will typically paste in a list of their open deals. Each entry should ideally include:
- **Customer name**
- **Vehicle of interest**
- **Stage** — enquiry / test drove / quoted / finance pending / negotiating / verbal yes / signed
- **Last contact date** (or days since)
- **Any specific notes** — "needs partner approval", "waiting on trade-in inspection", "considering competitor"
- **Quoted figure** if relevant

If the rep gives a partial list (e.g., "I've got Tom on the Cerato, Sarah on the Sportage, Marcus no-showed his Triton…"), work with what's there. Don't ask for a perfectly formatted spreadsheet.

If they give you no list at all, ask: "Quick — paste your top 10 open deals, even a one-liner each. Then I can give you a real read."

## How to think about pipeline health

Most reps' pipelines have a predictable shape:
- 20% are deals that will close, regardless of what the rep does
- 20% are deals that will never close, regardless of what the rep does
- 60% are deals that close based on what the rep does this week

Your job is to surface that middle 60% — and call out the 20% that's dead weight so the rep stops wasting energy.

Stage-by-stage signals:

| Stage | Days since contact | Healthy signal | Dying signal |
|---|---|---|---|
| Enquiry only | <7 | Engaged in conversation | Hasn't replied to first follow-up |
| Test drove | <14 | Asked specific follow-up Qs | Vague "I'll think about it" + silence |
| Quoted | <10 | Asked clarifying questions on the quote | No reply after 14+ days |
| Finance pending | <5 | Bank/BM moving on it | Stalled for >7 days = problem |
| Negotiating | <3 | Gaps narrowing | Same gap for 2 weeks = stuck |
| Verbal yes | <2 | Paperwork in motion | Silence after verbal = high collapse risk |

## Output format

```
# Pipeline review — [date or week]
**Total open deals:** [N]
**Stage breakdown:** [enquiry: X / test drove: Y / quoted: Z / negotiating: W / verbal yes: V]
**Likely month-end close volume:** [your honest estimate — number of deals + total value]

---

## 🟢 Close this week (push these, they're ready)
- **[Customer] · [Vehicle]** — [why this is hot] · **Action:** [specific move]
- ...

## 🟡 Close this month with effort (your real volume comes from this list)
- **[Customer] · [Vehicle]** — [where they're stuck] · **Action this week:** [specific move]
- ...

## 🟠 Triage / decide — fish or cut bait
- **[Customer] · [Vehicle]** — [why this one's wobbly] · **Decision needed:** [stay or close the file]
- ...

## 🔴 Dead — close the file
- **[Customer] · [Vehicle]** — [the honest call]
- ...

---

**Three deals that need a phone call (not an email) this week:**
1. [name] — [why phone]
2. [name] — [why phone]
3. [name] — [why phone]

**Single highest-leverage action of your week:**
> "[the one thing that matters most]"

**Note:** [any pattern you noticed — too many deals in one stage, ghosting after quotes, etc.]
```

## Worked example

**User input:**
> "Pipeline review please. Open deals: Sarah (Sportage SX) - test drove 11 days ago, quoted 8 days ago, no reply. Tom (Cerato GT) - quoted Friday, replied 'thinking about it' Monday. Holland family (Outlander PHEV) - second visit booked tomorrow, $76k quoted, $5k gap. Marcus (Triton GLX-R) - no-showed his test drive last week, sent 2 follow-ups, silence. Jess (EV5) - enquiry 3 weeks ago, test drove 2 weeks ago, said 'come back to me end of month', no contact since. Patel family (Carnival) - quoted 21 days ago, single 'will discuss with family' reply, silence. McKinnons (Sorento) - signed verbal yes for finance 4 days ago, paperwork stuck waiting on bank. Riley (ASX) - first enquiry yesterday, replied positive, want to come in Saturday. I'm Alex."

**Good output:**

# Pipeline review — Week of [today]
**Total open deals:** 8
**Stage breakdown:** Enquiry: 1 (Riley) / Test drove: 2 (Sarah, Jess) / Quoted: 3 (Tom, Patel, Holland) / Negotiating: 1 (Holland) / Verbal yes: 1 (McKinnons) / Dead-zone post-no-show: 1 (Marcus)
**Likely month-end close volume:** 3 deals — Holland, McKinnons, Riley. Maybe 4 if you push Tom hard this week. Realistic gross from this pipeline: 3–4 cars.

---

## 🟢 Close this week (push these, they're ready)
- **McKinnons · Sorento** — Verbal yes, finance only blocker. Bank delay is a bottleneck, not a deal-killer. **Action:** Phone the bank/BM today, not the customer. Get the loan moved, then call the McKinnons with a delivery date — they need confirmation they didn't make the wrong decision.
- **Holland family · Outlander PHEV** — Coming in tomorrow with a $5k gap and a Friday road-trip deadline. Use the `negotiation-coach` skill before the meeting. **Action:** Pre-pull trade-in valuation on the Pajero Sport, prepare road-trip-ready bundle, run objection-prep skill tonight.

## 🟡 Close this month with effort (your real volume from here)
- **Tom · Cerato GT** — Quoted 4 days ago, "thinking about it" Monday. He's in the classic 5–7 day decision window. **Action this week:** Phone call by Friday — not email. He needs to hear a human voice. Use one of the value-add hooks (colour availability, finance change, EOFY framing).
- **Riley · ASX** — Booked for Saturday, positive replies. Most likely to close if Saturday goes well. **Action this week:** Prep with `objection-prep` Friday night so you're ready Saturday morning. Don't over-engineer — they're warm.

## 🟠 Triage / decide — fish or cut bait
- **Sarah · Sportage SX** — 11 days since test drove, 8 days since quote, no reply. Classic decision paralysis OR went elsewhere. **Decision needed:** Run her through `follow-up-sequence` (you're at Day 8 — Touch 2 of the sequence). Give it 2 more touches, then move her down the list if no reply.
- **Jess · EV5** — Said "end of month, come back to me." Honour her timeline. **Decision needed:** Diarise for the 28th, don't contact before. If she replies positively then, she's a 🟡. If silent, she's 🔴.

## 🔴 Dead — close the file
- **Marcus · Triton GLX-R** — No-show + 2 follow-ups + silence = he bought elsewhere or went off the idea. Send one final permission-based message (`no-show-recovery` Touch 3), then close. Stop spending mental cycles on him.
- **Patel family · Carnival** — Quoted 21 days ago, one vague reply, then 14+ days silence. Carnivals have 60+ day decision cycles for families this size, BUT silence after a "will discuss with family" reply is usually a no. **Action:** One last "want me to pause and come back closer to school holidays?" email. Then close until they re-initiate.

---

**Three deals that need a phone call (not an email) this week:**
1. **McKinnons** — Verbal yes deals collapse on silence. Call Wednesday with a delivery update, even if there's no update.
2. **Tom** — He's in decision paralysis. A phone call breaks the loop. Email won't.
3. **The bank/BM on McKinnons' finance** — This is the call that unlocks your closest-to-close deal. Make it before any customer call.

**Single highest-leverage action of your week:**
> "Tomorrow's Holland meeting. They're a $51k+ cash deal that closes this week if you bring numbers (trade-in valuation, run-cost comparison) ready before they walk in. Skipping the prep is the difference between 3 and 4 closes this month."

**Note:** Pattern in your pipeline — you've got 3 deals stuck post-quote with no reply (Sarah, Tom, Patel). All three need switching from email to phone or to a value-add touch. Same intervention works on all three. Block 30 minutes Friday morning to handle them as a batch.

## Common edge cases

- **Rep dumps 30+ deals:** Skill should focus on the top 5–7 in each category. Don't review every deal — the rep will switch off. Surface the most consequential.
- **Rep is overly optimistic ("all my deals are hot!"):** Push back gently in the output. The triage section is where to do it — name the dying deals plainly.
- **Rep is overly pessimistic ("none of my deals are going anywhere"):** Same job in reverse — find the deals they're under-rating. The "🟢 Close this week" section is where to push back.
- **Rep gives no stages, just names + vehicles:** Ask for stages on the top 3. For the rest, make best guesses and flag the assumption.

## What NOT to do

- Don't give 30 bullet points. The rep won't act on 30 things. 3–5 actions per category, max.
- Don't be sycophantic. "Strong pipeline!" with no substance is filler. If the pipeline is thin, say so.
- Don't recommend "follow up with everyone." That's not a strategy. Pick the 3 that need a specific action and name them.
- Don't moralise about deals the rep should have closed earlier. Forward-looking only.
