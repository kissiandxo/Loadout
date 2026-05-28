# Plugin: Conversation Tagging

A taxonomy for tagging customer conversations (tickets, chats, calls, emails) so they're searchable, reportable, and useful for pattern detection. Loaded into your project, this lets every customer-engagement agent contribute to a coherent organisational memory.

## When to use this plugin

Pair with:
- **support-ticket-router** (tags assigned during initial classification)
- **faq-agent** (tags surface FAQ gaps via clustering)
- **churn-signals** (tags identify at-risk patterns)
- All other engagement agents — every conversation should carry tags

## Why tags matter (beyond ticket organization)

Most businesses use tags badly — too many tags, no consistency, no review process. Done well, tags unlock:

- **Pattern detection:** "We've had 12 tickets tagged 'shipping-delay' this month" → action
- **Product / process insights:** "47% of complaints involve checkout-flow" → roadmap signal
- **Coaching opportunities:** "Reps tagged with 'escalated-to-manager' more than average" → training conversation
- **Customer segmentation:** "Customers who've raised 'billing-confusion' tickets churn at 2x rate" → proactive outreach
- **Documentation gaps:** "We get 'how-do-I-cancel' tagged tickets despite having an FAQ" → discoverability issue

## The tag taxonomy structure

Use a multi-dimensional tagging system. Each conversation gets tags across these dimensions:

### Dimension 1 — Category (what the conversation is ABOUT)
What functional area does this conversation relate to?

- `billing`
- `technical`
- `sales-presale`
- `sales-upsell`
- `complaint`
- `compliment`
- `feature-request`
- `bug-report`
- `account-management`
- `cancellation`
- `refund`
- `return`
- `shipping`
- `product-question`
- `policy-question`
- `urgent-safety`
- `partnership-inquiry`
- `press-or-media`
- `other`

### Dimension 2 — Sub-category (specific topic within category)
More granular. Examples within categories:

- `billing-failed-payment`
- `billing-card-update`
- `billing-invoice-request`
- `billing-pricing-question`
- `technical-sync-issue`
- `technical-integration-broken`
- `technical-error-message`
- `complaint-shipping-delay`
- `complaint-product-quality`
- `complaint-support-experience`

Don't over-engineer the sub-category taxonomy. Start with 3-5 sub-tags per category and expand only when patterns emerge.

### Dimension 3 — Sentiment / temperature
- `calm`
- `frustrated`
- `angry`
- `urgent`
- `confused`
- `delighted`

### Dimension 4 — Resolution path
- `resolved-first-touch` (fixed in one reply)
- `resolved-multi-touch` (multiple back-and-forths)
- `escalated-l2` (level 2 escalation)
- `escalated-l3` (manager / above)
- `escalated-l4` (founder / exec)
- `unresolved-customer-disengaged` (no further response from customer)
- `unresolved-known-limitation` (we can't fix this)
- `auto-closed` (no response, system closure)

### Dimension 5 — Outcome
- `retained` (customer kept)
- `churned` (customer left)
- `partial-refund` (resolution included partial refund)
- `full-refund`
- `replacement-sent`
- `feature-promised` (we said we'd build something)
- `documentation-gap` (FAQ needs update)
- `product-bug` (development team needs to fix)

### Dimension 6 — Risk flags (only when applicable)
- `chargeback-threat`
- `legal-mention`
- `public-review-risk`
- `vip-customer`
- `repeat-issue` (same customer, multiple times, same topic)
- `pattern-trigger` (Nth similar complaint this month)

## Tagging discipline

### How many tags per conversation?

Minimum: 1 per dimension that applies = typically 3-5 tags
Maximum: ~8 tags total (more than that becomes noise)

### Tagging at intake vs at resolution

Best practice: tag at TWO moments.

**At intake (initial classification):**
- Category
- Sub-category
- Sentiment
- Risk flags (if any)

**At resolution:**
- Update sub-category if it evolved
- Add resolution path
- Add outcome
- Add any new risk flags surfaced during conversation

This catches both the customer's stated issue (intake) and the actual underlying issue (resolution).

### Tag review cadence

| Frequency | Activity |
|---|---|
| Weekly | CS lead reviews tag counts — what's spiking this week? |
| Monthly | Full tag-usage audit — are reps using the right tags? Are there tags being underused? Overused? |
| Quarterly | Taxonomy review — are there new tags we need? Old tags we should retire? |

## Patterns to watch for

### Pattern A — Single-issue spike
- Tag count for one specific sub-category jumps 3x in a week
- Action: Investigate root cause same-week. Often a recent product change, bug, or process failure.

### Pattern B — Coupled tags
- Two tags appearing together more than baseline (e.g., `billing-failed-payment` + `frustrated` consistently appearing in same tickets)
- Action: Process improvement at the coupling point. The failed-payment flow is creating frustration; can be smoothed.

### Pattern C — Tag mismatch on resolution
- Conversations tagged X at intake but resolved with outcome Y far more than baseline (e.g., "billing-pricing-question" tickets frequently resolving as "feature-promised")
- Action: Often signals a sales / marketing gap. People asking about pricing are actually asking "is this feature available."

### Pattern D — Risk flag clustering
- Multiple `chargeback-threat` or `public-review-risk` tags in short window
- Action: Possible coordinated dispute or genuine systemic issue. Escalate to leadership immediately.

### Pattern E — VIP tags inversely correlated with resolution speed
- VIP customers' tickets taking longer to resolve than average
- Action: Process failure — VIPs should be FASTER, not slower

## Reporting from tags

Monthly / quarterly reports useful for leadership:

### Volume report
- Total conversations
- Top 5 categories by volume
- Top 5 sub-categories by volume
- Trend vs previous period

### Quality report
- % resolved at first touch (target: 60%+)
- % escalated beyond L1 (target: <15%)
- Average resolution time per category
- CSAT correlation with tags

### Pattern report
- New patterns detected this period
- Action items per pattern
- Status of previous period's pattern action items

## Common edge cases

- **Conversation crosses multiple categories** → Tag the PRIMARY one + secondary categories. Don't try to give every category equal weight. Most conversations have a dominant issue.
- **Customer raised one issue, real issue was different** → Use intake vs resolution tagging (described above) to capture the evolution.
- **Conversation has no clean resolution** → Tag with `unresolved-customer-disengaged` or `unresolved-known-limitation` — both are valid outcomes. Don't force a fake `resolved` tag.
- **Tagging burden on reps** → Keep the required tag set small (Category + sub-category + sentiment is enough at intake). Other tags applied only when relevant.
- **Different teams using different vocabulary** → Standardise taxonomy in a single document, train consistently. Inconsistent tagging makes patterns invisible.

## Tag retirement

Tags should retire when:
- They're being used <5% of the time → consolidate into a parent or drop
- They've been replaced by a more accurate alternative
- The underlying category no longer exists (e.g., a discontinued product)

Retirement process: don't delete historic data. Mark the tag as `archived` and stop assigning to new conversations. Existing conversations keep their tags for historical analysis.

## What NOT to do

- **Don't have more than ~50 active tags total.** More than that and reps stop using them consistently.
- **Don't allow free-form tagging.** Reps create unique tags each time and the data becomes useless. Use closed lists.
- **Don't tag retroactively at scale.** If a new tag is needed, apply it going forward. Bulk re-tagging historic data is error-prone.
- **Don't measure rep performance by tag usage alone.** Tag accuracy is hard to evaluate; SLA + CSAT are better KPIs.
- **Don't tie tags directly to automation** without a human-in-the-loop. "All `urgent` tags trigger SMS to manager" sounds clever but generates noise the second a rep mis-tags.
- **Don't ignore the tags in your reporting.** If tags aren't used for decisions, reps notice and stop being careful with them. Show tag-based insights monthly to leadership and customer service.
