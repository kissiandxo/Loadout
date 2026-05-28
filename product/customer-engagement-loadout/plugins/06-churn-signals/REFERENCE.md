# Plugin: Churn Signals

The early-warning indicators that a customer is on the path to churn — and the proactive moves you can make BEFORE they cancel. Loaded into your project, this helps every retention-related agent recognise churn risk and act on it.

## When to use this plugin

Pair with:
- **cancellation-save** (intervening when signals appear, not just at cancel-time)
- **winback-campaign** (understanding what stage of churn the customer is in)
- **vip-customer-manager** (catching VIP churn risk early — single customer can be material)
- **support-ticket-router** (severity uplift when churn signals are present)

## The three phases of customer churn

Most churn isn't a sudden decision — it's a gradual disengagement. Three phases, with different intervention windows:

### Phase 1 — Drift (60-90 days of declining engagement)
- Usage patterns shift downward
- Customer hasn't done anything dramatic, just less
- They're not unhappy — they're just not engaged
- **Intervention window: WIDE.** Easy to save here. Most businesses miss it entirely.

### Phase 2 — Detach (weeks before cancellation)
- Customer is now actively disengaged
- May have started evaluating alternatives
- Tone in support tickets shifts (shorter, less invested)
- **Intervention window: NARROW.** Save possible but requires specific action.

### Phase 3 — Decision (days before cancellation)
- Customer has decided
- May have stopped using entirely
- Cancellation is imminent
- **Intervention window: MINIMAL.** Save attempts at this phase have low success rate. Better to focus on graceful exit and future re-engagement.

## Specific churn signals (in priority order)

### S-tier signals (act immediately)

| Signal | What it means | Action |
|---|---|---|
| **Cancellation form opened (but not submitted)** | Decision phase | Auto-trigger a personal outreach within hour |
| **Last login >30 days for a daily-use product** | Habit broken | Trigger re-engagement sequence focused on re-establishing routine |
| **Downgrade to lowest tier** | Often prelude to cancel | Reach out to confirm they're getting what they need |
| **Failed payment + no resolution in 48 hours** | Disengagement, not just a card issue | Personal outreach, not just retry-billing emails |
| **Specific competitor mentioned in support ticket** | Active evaluation | Time-sensitive — competitor switch may be imminent |

### A-tier signals (worth investigating within a week)

| Signal | What it means | Action |
|---|---|---|
| **Usage drops 60%+ vs their baseline** | Drift phase | Diagnostic outreach: "anything getting in the way?" |
| **Removed integrations or API connections** | Pulling out data | Investigate before they leave |
| **Stopped opening product emails for 30+ days** | Disengaged | Re-engagement sequence |
| **NPS dropped from 9+ to 7 or below** | Confidence falling | Personal follow-up using NPS skill |
| **Specific feature request mentioned 2+ times with no acknowledgement** | Feeling unheard | Reach out specifically about that feature |

### B-tier signals (worth tracking, not always actionable)

| Signal | What it means | Action |
|---|---|---|
| **Logged in but didn't take any action** | Coming for the wrong thing? | Track over time; intervene if pattern repeats |
| **Single negative support interaction recently** | One bad moment | Follow up specifically on the resolution |
| **Customer's industry / role changed** | Use case may have shifted | Light outreach to check |
| **Subscription billed at higher cost (e.g., annual renewal at higher price)** | May reconsider value | Proactive value-proof outreach |

### C-tier signals (probably noise)

| Signal | Why probably noise |
|---|---|
| **Single missed login week** | Normal usage pattern |
| **Increase in support tickets** | Could be increased engagement |
| **Customer logged out of all sessions** | Could be device change |
| **Customer left a 4-star review** | Generally good, not a churn signal alone |

## How to design a churn-signal monitoring system

You don't need sophisticated tooling to start.

### Tier 1 — Manual / weekly review (for small businesses)
A Friday-afternoon weekly review of:
- Customers who logged in <X times this week (your baseline)
- Customers with failed payments unresolved
- Customers who opened the cancel form but didn't submit
- Customers who left negative feedback in any channel

10-15 minutes/week. Identify 3-5 customers to reach out to personally.

### Tier 2 — Email + spreadsheet (small to mid-size)
A weekly automated report (from your CRM, billing, or analytics) of customers crossing thresholds. Reviewed by a CS lead and triaged into action items.

### Tier 3 — Dedicated churn dashboard (for larger teams)
Live dashboard showing churn-risk score per customer based on a composite of signals. Customer success team works through high-risk accounts daily.

The mechanism matters less than the discipline of acting on signals. Start simple.

## Proactive intervention patterns

### Pattern A — The "anything getting in the way" check
For customers in DRIFT phase. Short, personal, low-pressure.

> Hi [Name],
> Noticed [your team / you] hasn't been in [product] much over the last few weeks. No pressure, just checking — anything getting in the way, or just busier season?
> — [Name]

70% don't reply (which is fine — at least you flagged you noticed). 30% reply, and within those replies you find specific feedback that's gold.

### Pattern B — The "feature mention" follow-up
For customers who requested something specific that wasn't acknowledged.

> Hi [Name],
> I noticed you mentioned [specific feature] in [where they mentioned it]. Wanted to circle back: [the honest update — it's on the roadmap / not planned / partial fix coming / etc.]. Either way, your specific use case helps us prioritise.
> — [Name]

### Pattern C — The "post-bad-experience" check-in
For customers who had a negative support interaction recently.

> Hi [Name],
> Following up on the [issue] we sorted last week — how's it been since? If anything else came up, just reply. We've all been there with the [type of issue] and want to make sure it's actually fixed for you.
> — [Name]

### Pattern D — The "high-value-but-quiet" founder touch
For VIPs in early drift.

> [Name],
> Quick personal note — you've been one of our [tenure] customers and I wanted to reach out directly. No specific reason — just wanted to know how you're finding things and whether there's anything we could be doing differently for you.
> — [Founder name]

## Common edge cases

- **Customer signals churn but says they're happy** → either they're being polite, or the signal is misleading. Probe gently: "Saw [signal] — anything specific behind that, or is everything fine?"
- **Multiple customers from same company show signals simultaneously** → likely an internal change at the company (budget cut, restructure, champion left). Reach out at the executive level.
- **VIP customer shows S-tier signal** → escalate to founder-level immediately. Cost of losing a $10K+ LTV customer is materially different from a $50 LTV customer.
- **Customer rejected a save attempt previously** → don't try the same save again. They've decided.
- **Many customers churning around the same time** → look for a common cause (product change, pricing change, market shift). Address the systemic issue, not the individual customers.

## What NOT to do

- **Don't reach out for every signal.** Overcommunication is its own churn driver.
- **Don't pretend you noticed a signal you actually got from automated tools.** Customers can tell when the message is templated.
- **Don't use churn signals to put customers in marketing campaigns.** They need personal touches, not automation.
- **Don't assume the customer is the problem.** Most churn signals point back at things YOUR product / process could change. Listen for those before pitching.
- **Don't only monitor signals on paying customers.** Free / trial users churning is also a signal of product issues — they just have less direct revenue impact.
- **Don't act on churn signals at the expense of normal customer experience.** A great customer experience is the long-term churn prevention. Single-point interventions complement that, they don't replace it.
