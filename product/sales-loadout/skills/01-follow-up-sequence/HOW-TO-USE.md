# How to use — Follow-Up Sequence Skill

This skill gives you a 5-touch follow-up plan for any deal that's gone quiet. Two ways to install it.

## Option A — Claude.ai (recommended for most sales reps)

1. Go to [claude.ai](https://claude.ai) → click **Projects** in the sidebar → **Create new project**
2. Name it: **Follow-Up Sequence**
3. Click **Set custom instructions** (sometimes shown as "Edit project knowledge" → "Instructions")
4. Open `SKILL.md` in this folder
5. Copy everything *below* the `---` frontmatter block (start from `# Follow-Up Sequence`)
6. Paste it into the custom instructions field → Save
7. (Optional) Drag any of the plugin reference files from `../plugins/` into the project's knowledge — start with `02-lead-re-engagement` and `08-phone-script`

You're now ready. Open the project and ask for a sequence.

## Option B — Claude Code (for technical users)

1. Copy this whole folder (`01-follow-up-sequence`) into `~/.claude/skills/` on your machine
2. Restart Claude Code
3. The skill will auto-load when you describe a follow-up task in a Claude Code session

## How to call the skill (what to type)

The skill responds to natural language. Any of these will trigger a good output:

- "Draft a follow-up sequence for Sarah. She test-drove a Sportage on Saturday, no reply since Sunday's quote."
- "What should I send to the McKinnons? They came in last Tuesday, asked about the Outlander, haven't called back."
- "I haven't heard back from the Patel deal — quote sent 10 days ago for a Triton GLX. Give me a plan."
- "5-touch sequence for warm leads after a test drive. Customer is Jess, Cerato GT, drove it Friday."

The more context you give, the sharper the output. If you forget a detail, the skill will ask before generating.

## Best results — what to include in your prompt

The skill is calibrated for this input shape:

| Field | Example |
|---|---|
| Customer first name | Sarah |
| Vehicle (model + colour/trim) | 2024 Sportage SX, Snow White |
| Last contact event | Test drove Saturday |
| Days since last contact | 4 |
| Last replied channel | SMS |
| Your first name | Alex |

You can give it all in one paragraph — the skill will parse it.

## Troubleshooting

- **Output feels generic:** You gave it too little context. Re-prompt with the specific vehicle, the actual conversation history (1–2 sentences), and what they actually said.
- **Output is too pushy:** Tell the skill the customer is price-sensitive / nervous / first-time buyer. It'll adjust tone.
- **The cadence doesn't fit your dealership:** Tell the skill once — "we work on 14-day sequences not 21" — and it'll comply for the rest of the conversation. To make it stick, add that line to the bottom of the SKILL.md content you pasted into the project.

## Pairs well with

- **Plugin: Lead Re-Engagement** — when the deal has been quiet for 30+ days
- **Plugin: Phone Script** — Touch 3 in this sequence is often more powerful as a phone call than an SMS
- **Skill: Customer Recap** — if you have detailed test drive notes, run those through Customer Recap first, then feed the recap into this skill for a much sharper sequence
