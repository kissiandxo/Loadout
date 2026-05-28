# Prompt Cheat Sheet — The Customer Engagement Loadout

The magic phrases for each of the 12 agents. Use this as a quick reference — keep it open in a tab, print it, or pin it next to your screen.

For each agent: the slash command, the trigger phrases, the required inputs, and a copy-paste prompt template.

---

## 01 · Website Chatbot Builder — `/chatbot`

**Trigger phrases:**
- "Build me a chatbot for my website"
- "I need a Chatbase alternative"
- "Embed a Claude chatbot"
- "Owned chatbot stack for [business]"

**Required inputs:** Business name + description · Website URL · Primary purpose (support / lead capture / FAQ / etc.) · Tone · Escalation email · Anthropic API key access

**Best prompt template:**
> Build me a chatbot for my website. Business: [name + one-line description]. Site: [URL]. Primary purpose: [support / lead capture / FAQ deflection / product recommendation]. Tone: [warm / professional / playful / no-nonsense]. Escalation email: [where handoffs go]. I have an Anthropic API key. Top FAQs: [paste 5-10 with answers]. Off-limits topics: [things bot shouldn't discuss]. Brand colours: [primary + accent hex]. Hosting: [Cloudflare / Vercel / Netlify].

---

## 02 · Support Ticket Router — `/triage`

**Trigger phrases:**
- "Triage this ticket"
- "Classify this support email"
- "Which queue should this go to?"
- "Is this urgent?"

**Required inputs:** Ticket content · Customer identity if known · Business context · Available routing destinations · SLA expectations

**Best prompt template:**
> Triage this ticket. Came in [time/channel]. From [customer name + status]. [Paste verbatim ticket content]. Available queues: [billing / support / tech / urgent / sales]. SLA expectations: [same-day / 24h / 48h].

---

## 03 · FAQ Agent — `/faq`

**Trigger phrases (ANSWER mode):**
- "Answer this customer question"
- "What's our FAQ on [topic]?"
- "Customer asked: [verbatim]"

**Trigger phrases (MAINTAIN mode):**
- "I have these tickets — what FAQs should we have?"
- "Audit our FAQ knowledge base"
- "Build me an FAQ from these support tickets"

**ANSWER mode prompt:**
> Customer asked: "[verbatim]". Our brand: [name + one-line]. FAQ knowledge base loaded in project.

**MAINTAIN mode prompt:**
> FAQ maintenance. Here are [N] recent customer questions: [paste dump]. Current FAQ knowledge base in project knowledge.

---

## 04 · Review Response Generator — `/review`

**Trigger phrases:**
- "Respond to this [Google / Trustpilot / Yelp] review"
- "Draft a reply to this 1-star"
- "Thank-you note for a 5-star"

**Required inputs:** Full review (rating + text) · Platform · Business name · What actually happened if known · Your name + role

**Best prompt template:**
> Respond to this [Platform] review. Rating: [stars]. Text: "[verbatim]". Business: [name]. What actually happened: [back-story or "I don't have details"]. I'm [Your name], [Role].

---

## 05 · Complaint Handler — `/complaint`

**Trigger phrases:**
- "Customer is furious about [X]"
- "Handle this complaint"
- "Customer wants to speak to a manager"
- "Customer is threatening to [chargeback / cancel / review]"

**Required inputs:** Customer's message (verbatim) · Account history · What actually happened · Limit on offer · Channel · Your name

**Best prompt template:**
> Complaint to handle. Customer: [Name + history + LTV]. Channel: [email / chat / DM]. They wrote: "[verbatim]". What actually happened: [back-story]. Limit on offer: [full refund / partial / nothing]. I'm [Your name].

---

## 06 · Refund / Return Negotiator — `/refund`

**Trigger phrases:**
- "Refund request from [customer]"
- "Customer wants to return [product]"
- "Is this refund eligible?"
- "Out-of-policy refund — what do I say?"

**Required inputs:** Customer's request · Account history · Current policy · Limits / discretion · Channel · Your name

**Best prompt template:**
> Refund request. Customer: [name + history]. Ordered: [product + date + amount]. Their reason: "[verbatim]". Our policy: [refund window, conditions]. I can authorise: [full / partial / store credit / nothing]. Channel: [email / chat / public review]. I'm [Your name].

---

## 07 · NPS / CSAT Follow-Up — `/nps`

**Trigger phrases:**
- "Follow up on this NPS response"
- "Customer scored us [X]/10"
- "Draft a thank-you for a 10/10"
- "Respond to this detractor"

**Required inputs:** Score + scale · Verbatim comment · Customer context · What you can offer · Your name

**Best prompt template:**
> NPS follow-up. Score: [X]/10. Customer comment: "[verbatim or 'no comment']". Customer: [name + tenure + LTV]. What I can offer: [referral incentive / personal connection / recovery gesture]. I'm [Your name].

---

## 08 · Onboarding Sequencer — `/onboard`

**Trigger phrases:**
- "Build an onboarding sequence for [product]"
- "Draft welcome emails for new customers"
- "Post-purchase email flow"

**Required inputs:** Business type (SaaS / e-com / service) · What was purchased · The "aha" moment · Brand voice · Channels · Churn timing data · Your name

**Best prompt template:**
> Onboarding sequence for [Business]. Type: [SaaS / e-com / service]. Product/plan: [details]. Aha moment: [specific user experience]. Brand voice: [warm / professional / casual]. Channels: [email / SMS / in-app]. Most churn happens at [Day X-Y]. I'm [Your name].

---

## 09 · Win-Back Campaign — `/winback`

**Trigger phrases:**
- "Win-back campaign for [segment]"
- "Re-engage churned customers"
- "Email to lapsed customers"

**Required inputs:** Customer segment · Time since churn · Churn reason if known · What's changed · Available offer · Brand voice · Your name

**Best prompt template:**
> Win-back campaign. Segment: [cancelled subscribers / non-reorders / inactive accounts]. Churned: [N months ago]. Reason if known: [price / fit / neglect / competitor / life event]. What's changed since: [genuine reasons]. Available offer: [discount / pause / nothing]. I'm [Your name].

---

## 10 · VIP Customer Manager — `/vip`

**Trigger phrases:**
- "VIP outreach for [customer]"
- "Reach out to our top 20 customers"
- "Personalised touch for our highest-value customer"

**Required inputs:** VIP type (revenue / referral / strategic) · Customer details · Occasion / trigger · What can be offered · Your name + role

**Best prompt template:**
> VIP outreach. Customer: [name + status + LTV + tenure]. Type: [revenue VIP / referral VIP / strategic VIP / mixed]. Occasion: [anniversary / milestone / proactive / specific event]. I can extend: [early access / direct line / specific perk]. I'm [Your name], [Role].

---

## 11 · Cancellation Save — `/save`

**Trigger phrases:**
- "Customer wants to cancel"
- "Save script for [customer]"
- "They hit the cancel button"
- "How do I respond when they say they're leaving?"

**Required inputs:** Stated reason (verbatim) · Customer context · What you can offer · Channel · Your name

**Best prompt template:**
> Cancellation save. Customer: [name + tenure + plan + LTV]. Their stated reason: "[verbatim]". Usage trajectory: [heavy / declining / inactive]. What I can offer: [pause / downgrade / discount / nothing]. Channel: [chat / email / cancel-flow]. I'm [Your name].

---

## 12 · Knowledge Base Builder — `/kb`

**Trigger phrases (STRUCTURE mode):**
- "Build me a knowledge base structure"
- "Audit our help center"
- "What should be in our knowledge base?"

**Trigger phrases (WRITE mode):**
- "Write the article 'how do I [X]'"
- "Draft a troubleshooting article for [issue]"

**STRUCTURE mode prompt:**
> Build me a knowledge base for [Business]. Type: [SaaS / e-com / service]. Top customer questions from recent tickets: [paste top 10-20]. Platform: [Intercom / HelpScout / Notion / Zendesk / custom].

**WRITE mode prompt:**
> Write the article "[customer-phrased question]". Intent type: [Tutorial / Reference / Troubleshooting / Conceptual]. Tone: [match our brand notes].

---

## Universal patterns

### Pattern 1 — Drop in the tone framework

Before any agent prompt, drop in your Tone Framework decisions from `plugins/02-tone-framework/REFERENCE.md`. Every output gets calibrated to your brand voice.

### Pattern 2 — Use plugins as context

For each agent, pair with the most relevant plugins:
- Complaint handler + Escalation Matrix + Tone Framework
- Cancellation save + Churn Signals + Retention Psychology
- Review responder + Review Handling Playbook + Tone Framework
- Onboarding sequencer + Onboarding Maps + Tone Framework
- VIP manager + Retention Psychology + Tone Framework

### Pattern 3 — Tell Claude what NOT to say

Each SKILL.md has a "What NOT to do" section. Reinforce in your prompt for high-stakes situations: "No 'we sincerely apologise', no 'rest assured', no 'as per our policy'."

### Pattern 4 — Customer context goes first

For any agent that's customer-facing, lead your prompt with WHO the customer is. Generic prompts produce generic outputs. The agent can't tell you it needs more context — you have to provide it upfront.

### Pattern 5 — When the output isn't quite right

Don't start over. Tell the agent what to adjust:
- "Make it shorter — 50% length"
- "Less formal"
- "More direct"
- "Address [Name] specifically"
- "Drop the discount offer — they're not price-driven"

The next iteration is usually right.
