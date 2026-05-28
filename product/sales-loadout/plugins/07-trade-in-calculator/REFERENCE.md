# Plugin: Trade-In Framework

A reference for how to talk about, value, and present trade-in offers in a way that doesn't break trust on first contact. The single most emotional moment in a car deal is the customer hearing what their current car is worth — get it wrong and the deal is over.

This plugin doesn't try to be a Redbook clone. It's the conversational and structural framework — what to ask, what to present, in what order, and how to defend the number.

## When to use this plugin

Pair with:
- **proposal-builder** — when the proposal includes a trade-in
- **negotiation-coach** — trade-in lever is usually cheaper than price lever for the dealership
- **objection-handler** — when the customer says "you're lowballing my trade"
- **customer-recap** — when capturing trade-in expectations and discrepancies

## The trade-in conversation, in order

### Step 1 — Gather the information you need BEFORE quoting any number

Don't quote a trade-in figure with no information. Get:

| Field | Why it matters |
|---|---|
| Year | Drives 80% of the baseline |
| Make + model + trim | Trim differences can be $3k+ |
| Variant (e.g., diesel vs petrol) | Big swings on resale |
| Kilometres | Anything over the year × 15,000 is "high" |
| Service history | "Full dealer history" lifts value; gaps drop it |
| Condition (panels, interior, mechanical) | Real photos or in-person |
| Tyre condition | Often the cheapest negotiation point |
| Number of owners | "One owner" is a real lift |
| Any modifications | Mods almost always reduce trade value |
| Outstanding finance | If yes, factor into the net trade figure |

The first time you discuss trade-in value, your line is: "Let me get the BM to put a number on it formally — I don't want to give you a guess that's off, that's how trust gets broken." That buys you the right to do this properly.

### Step 2 — Present the trade-in number with structure, not just a figure

Customers hear "$24,000" as an attack on their car. They hear "$24,000 based on these factors, here's why" as a fair conversation.

Template for presenting the offer:

```
Trade-in offer: Your [Year Make Model Trim]

Base wholesale benchmark: $XX,XXX
[Note: this is the auction / wholesale market value for a clean similar vehicle]

Adjustments:
+ Full service history confirmed:           +$XXX
+ One-owner (lifts buyer confidence):       +$XXX
- Higher than average kilometres:           -$XXX
- Tyres at ~40% (we'll have to replace):    -$XXX
- Minor scratches on rear quarter:          -$XXX

Final offer: $XX,XXX
Valid for 14 days from inspection
```

This format does three things:
1. Shows the customer their car ISN'T being assessed as junk — the base is fair
2. Shows the adjustments are factual, not opinion
3. Gives them levers they can address ("if I get the tyres done myself, what does that move?")

### Step 3 — Defending the number when they push back

Common pushbacks and the framing:

**"I saw [private sale listing] for $30k. Why are you offering $24k?"**
> "Fair question — private sale and trade-in are different markets. Private sale at $30k means waiting weeks or months, dealing with strangers test-driving it, and most private sales actually clear about 10% below ask, so realistically you'd net around $27k on the private route. Our $24k is the no-hassle, drive-away-today path. The $3k difference is the cost of convenience. Some customers want the $3k, some want to be done in an hour — both are legitimate."

**"Redbook says $28k."**
> "Redbook gives a band — usually trade-in low to private-sale high. Our offer is sitting at the realistic trade-in side of that band. Worth a look at the full Redbook range together so you can see the spread."

**"You're trying to lowball me."**
> "I get the read. Here's the breakdown — this isn't a number I pulled out, it's what the wholesale market clears similar cars at, adjusted for the specifics of yours. If you want, I can show you what auction prices are doing on identical models this week. The number isn't the dealer trying to win — it's the market."

**"My mate got more for his at [other dealer]."**
> "Possible — different dealers price trades differently depending on what they want for the lot at that moment. Worth asking him what trim, kilometres, and condition his was — usually the gap closes when you compare like-for-like."

### Step 4 — When the customer's number and yours are far apart

If the gap is >$3,000, you have three options:

1. **Walk them through the breakdown again** — sometimes they didn't really hear it the first time. Use the adjustment template.
2. **Offer to absorb part of the gap in inclusions** — "I can't move the trade number further, but I can throw in [accessories / first service / extended warranty] worth $1k. Effectively the same net to you."
3. **Acknowledge the gap and let them sell privately** — "Genuinely if you'd net $27k privately and we're at $24k, you should sell it privately. The deal still works for us; we'll do the new car without the trade." This counter-intuitive move often closes the trade because the customer didn't realise they were free to walk on the trade portion.

NEVER: bump your offer by $2k just because they pushed back, without any new information. It teaches them every number is negotiable, makes them suspicious of every other figure in the deal, and damages trust.

## Sample script: presenting the trade-in number to a customer

> "Right — got the trade-in number back from the BM on your 2018 Pajero Sport. Before I tell you the figure, want to walk you through how we got there, because I'd rather you understand it than just hear a number.
>
> Base wholesale on a clean 2018 Pajero Sport with average ks is $26,000 — that's what they'd clear at auction this week. Your service history is full and dealer-stamped, which lifts it $500. One-owner from new is another $500.
>
> A couple of things bring it down: ks are around 95,000 which is about 15k over average, so that's -$800. The tyres look like they've got maybe 30% left so we'd need to replace before retail — that's another -$700. There's a scratch on the rear quarter panel that needs touch-up — call it -$300.
>
> So we land at $25,200, rounded to $25,000. That's a firm offer for 14 days while you decide on the new car.
>
> Few questions you can ask: if you'd rather replace the tyres yourself before bringing it in, we'd take the $700 back off the adjustment. Same with the touch-up — if you want to handle it, the deduction goes away. Both are choices you can make."

## How to use this in Claude.ai

1. Drop this REFERENCE.md into your Sales Loadout project knowledge
2. When discussing a trade-in via any skill, Claude will use this framework — the structured breakdown, the defensible language, the right responses to common pushbacks
3. Pair with the Deal Summary plugin filled out with trade-in details for the cleanest output

## What NOT to do

- **Don't quote a trade-in figure off the top of your head.** Even if you're confident. Defer to "let me get the BM to put a proper number on it" — buys you the right to land the number professionally.
- **Don't haggle from a vague position.** If you're going to defend $24k, defend it with the breakdown. Without the breakdown, you'll cave.
- **Don't pretend Redbook doesn't exist.** Customers will look it up. Acknowledge it, frame it, move on.
- **Don't promise a trade-in figure subject to inspection** without saying so explicitly. The number you quote pre-inspection is the number they'll hold you to.
- **Don't lowball intentionally and expect to negotiate up.** It poisons the relationship. Quote the real number, defend it, move on if they don't accept.
