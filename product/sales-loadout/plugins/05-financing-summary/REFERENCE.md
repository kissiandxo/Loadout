# Plugin: Financing Summary

A reference for how to explain dealership finance, lease, and cash payment options to a buyer without sounding like a finance manager reading from a script. Loaded into a Claude project, this lets Claude produce finance explanations that are clear, honest, and don't accidentally promise things the dealership can't deliver.

## When to use this plugin

Pair with:
- **sales-email-generator** — when writing a finance-options email
- **proposal-builder** — when the proposal includes a finance breakdown
- **objection-handler** — when the objection is "the headline price is too high" (the answer is usually finance reframing)
- **negotiation-coach** — finance levers are often the cheapest concession lever

## The 4 ways customers pay for a car

There are really only four options. Every conversation about finance is a conversation about which of these fits THIS customer:

### 1. Cash / bank transfer
- **Who it suits:** Customers with the funds + no interest in financing. Often older buyers, second-car households.
- **The customer's question:** "Can I get a discount for cash?" Honest answer: usually no — dealers make as much or more margin on financed deals via lender kickbacks.
- **The rep's reframe:** Cash buyers should still be offered a finance comparison. Sometimes 0–2% lender promotions make financing the structurally better choice even for buyers who can pay cash.

### 2. Dealer-arranged finance (in-house through the BM)
- **Who it suits:** Most buyers. The path of least resistance.
- **Mechanics:** The Business Manager (BM) shops your loan across multiple lenders, picks the best fit for the buyer's credit profile, and processes it during the dealership visit.
- **The customer's question:** "Why should I use you instead of my own bank?" Honest answer: speed (same-day approvals possible), one place for the whole transaction, BM understands car-specific finance products (balloon, lease, hire-purchase) that bank loans officers often don't.
- **What to never promise:** A specific interest rate. Always say "the rate depends on your application — BM will run it and come back with the offer."

### 3. Customer's own bank / broker
- **Who it suits:** Customers who already have a banking relationship + good credit. Older, higher-income, financially organised.
- **Mechanics:** They get pre-approval from their bank, dealer just delivers the car and processes payment.
- **What to do:** Don't fight it. If their own bank rate is better, that's the right answer for them. But ask them for documentation of pre-approval — vague claims ("the bank's all good") have collapsed too many delivery dates.
- **What to look out for:** Pre-approvals expire (typically 30–90 days). If a customer's pre-approval is dated >60 days back, push them to re-confirm before banking on it.

### 4. Lease / novated lease / business hire-purchase
- **Who it suits:** Business owners, fleet buyers, salary-packaged employees.
- **Mechanics:** Specific structures with tax implications. The BM is the right person to run the comparison — sales reps should not try to advise on tax treatment.
- **The customer's question:** "Which is cheaper for me?" Honest answer: depends on tax bracket, business structure, and use case. NEVER answer that question yourself.

## How to talk about finance, step by step

### Step 1: Find out what they're working with FIRST

Don't quote weekly figures until you know:
- **Do they have a trade-in?** Changes the deposit math significantly.
- **Cash component vs financed component?** Some customers can put $20k cash down and finance the rest.
- **Is income employed / self-employed / business owner?** Affects which lenders fit.
- **Credit history they're aware of?** Don't grill them — ask gently: "Any reason to think the bank might pull a face when they look at this?"

### Step 2: Pick the right framing for their concern

| Their concern | Right frame |
|---|---|
| "It's too expensive" | Weekly payment comparison vs their current outgoing |
| "I don't want to be in debt" | Lease or shorter-term loan to make the end-point clearer |
| "What if I want to upgrade in 3 years?" | Balloon payment / guaranteed buyback if available |
| "I'm self-employed" | Set expectations gently — more docs, slightly slower, but doable |
| "I've had a default in the past" | Don't promise approval; do promise the BM will look honestly |

### Step 3: Present options as a comparison, not a recommendation

Three structures, side by side:

| Structure | Weekly | Term | Balloon | Notes |
|---|---|---|---|---|
| 5-year loan, no balloon | $XXX | 5 years | $0 | Owns the car at the end |
| 4-year loan, 30% balloon | $XXX | 4 years | $XX,XXX | Lower weekly, lump sum at end (or refinance) |
| 3-year lease | $XXX | 3 years | N/A | Hand back at end, no ownership |

The customer picks. Don't pick for them.

### Step 4: Don't quote the rate until BM has run the application

Reps quoting indicative rates that turn out to be 2% higher when the application comes back is the #1 cause of broken trust mid-deal. Always defer the actual rate to the BM. Say: "These are the structures; the BM gets you the actual rate based on your application — usually within an hour."

## Sample explanations (for emails / written comms)

### When emailing a financing follow-up

> Hi [Name],
>
> Quick refresher on the finance options we discussed:
>
> - **5-year loan, no balloon:** Around $[X] per week. You own the car at the end of the term — clean and simple.
> - **4-year loan with a 30% balloon:** Around $[X] per week — lower weekly because there's a [$X,XXX] lump sum at the end, which you can pay out, refinance, or trade-in around.
> - **Lease:** Around $[X] per week for 3 years, then hand the car back — no ownership at the end, but no balloon either.
>
> Worth a quick chat with our BM ([name]) before you decide — they can run the actual rate against your application, which usually moves the weekly figure by $10–20 either way.
>
> No rush — happy to keep the [vehicle] held while you think it through.
>
> — [Rep first name]

### When responding to "I want to use my own bank"

> Hi [Name],
>
> Good call — getting pre-approval through [bank] gives you a solid number to work with. A couple of things worth knowing:
>
> 1. Most pre-approvals are valid for 60–90 days — worth checking the expiry date before we lock in delivery.
> 2. Some banks limit total loan size based on the dealer's invoice value, not the drive-away. Worth confirming with your loans officer that the figure they approved is the drive-away figure, not just the vehicle.
>
> If anything shifts — rates, terms, timing — happy to compare with a dealer finance quote so you've got options. No pressure, just want to make sure you've got the cleanest path.
>
> — [Rep first name]

## How to use this in Claude.ai

1. Drop this REFERENCE.md into your Sales Loadout project knowledge
2. When you ask Claude to draft a finance-related communication, it will pull from this framework
3. Claude won't invent specific rates or promise approvals — that protective discipline is baked in

## What NOT to do (these get sales reps in trouble)

- **Don't quote specific interest rates** as if they're confirmed. Always frame as "indicative until BM runs the application."
- **Don't promise approval.** Even to customers who look certain to get approved. "Looks straightforward — BM will confirm" is the right hedge.
- **Don't advise on tax treatment** for business / novated lease customers. Always defer to the BM and recommend the customer also talks to their accountant.
- **Don't compare your dealer finance to a bank rate the customer told you they got.** They may have misremembered, gotten a special promotion, or be a higher-credit borrower than your typical lender pool. "Different lenders weight different things" is the right framing.
- **Don't push dealer finance to a customer with a clear bank preference.** Lost trust costs more than a missed F&I commission. Let them go with their bank; build the relationship for the service work and the next purchase.
