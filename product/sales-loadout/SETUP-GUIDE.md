# The Sales Loadout — Setup Guide

You bought it. Let's get it running in under 30 minutes.

There are two ways to install the Sales Loadout, depending on how you use Claude. Pick the path that matches your setup.

| Your situation | Install path |
|---|---|
| I use Claude on the web at claude.ai | → **Path A — Claude.ai Projects** (15 min) |
| I use Claude Code in my terminal | → **Path B — Claude Code agents** (10 min) |
| I'm new and want the simplest start | → **Path A** (you can always switch later) |

---

## Path A — Claude.ai Projects (recommended for most sales reps)

This is the most accessible path. You don't need to install anything — everything runs in your browser.

### What you need

- A Claude.ai account with **Claude Pro** ($20/month USD — required for Projects)
- About 15 minutes

If you don't have Claude Pro yet, sign up at [claude.ai](https://claude.ai) → Settings → Subscription. Then come back here.

### Step 1 — Create your first Project (5 minutes)

We'll start with the most-used skill — Follow-Up Sequence. Once you have it working, the other 11 follow the same pattern.

1. Open [claude.ai](https://claude.ai) and click **Projects** in the left sidebar
2. Click **Create new project**
3. Name it: **Follow-Up Sequence** (or whatever makes sense to you)
4. In the project settings, find **Custom instructions** (sometimes labeled "Edit project knowledge" → "Instructions")
5. Open `skills/01-follow-up-sequence/SKILL.md` from this bundle
6. Copy everything below the `---` frontmatter line (start from `# Follow-Up Sequence`)
7. Paste it into the Custom instructions field
8. Save

That's it — the project now has a focused AI inside it that knows how to write multi-touch follow-up sequences.

### Step 2 — Add your first plugin (3 minutes)

Plugins give Claude reference data so its output is sharper.

1. Still inside your Follow-Up Sequence project, click **Project knowledge** (or "Add knowledge" / "Files")
2. Open `plugins/02-lead-re-engagement/REFERENCE.md` and `plugins/08-phone-script/REFERENCE.md` from this bundle
3. Either upload these files directly, OR paste their content into project knowledge notes
4. Save

### Step 3 — Test it (2 minutes)

In the same project, send Claude this prompt:

> Need a follow-up sequence for Sarah. She test-drove a 2024 Kia Sportage SX in Snow White on Saturday, said she'd "have a think." I'm Alex. It's now Wednesday — we emailed her the quote on Sunday.

You should get back a structured 5-touch sequence with channels, timing, and ready-to-send messages.

If the output looks like a generic "thanks for your interest!" template — go back and check that you pasted the SKILL.md content into Custom instructions, not just dropped it as a file.

### Step 4 — Create the other 11 projects (or fewer)

Repeat Steps 1–2 for the other skills you want — same process, different SKILL.md, different name. You don't have to do all 12 at once. Most reps start with 3–5 and add the rest as they need them.

**Recommended starter set:**
1. Follow-Up Sequence
2. Sales Email Generator
3. Objection Handler
4. Customer Recap
5. Priority List

Add the others as you find yourself needing them.

### Step 5 — Use the Deal Summary plugin per deal

Once you have a few projects running, your single biggest quality multiplier is the **Deal Summary plugin** (`plugins/01-deal-summary/REFERENCE.md`).

When you start working on a specific deal, fill out the Deal Summary template with that customer's details and drop it into the project knowledge of whichever skill you're using. Every output gets sharper because Claude is working from real context.

Pro tip: keep one Deal Summary file per active deal (`deal-holland.md`, `deal-tom-cerato.md`, etc.). Drop the relevant one in at the start of any session about that deal.

---

## Path B — Claude Code agents + slash commands

This path is for buyers already using Claude Code (the CLI tool from Anthropic). You get the same 12 skills as proper Claude Code agents, plus slash commands (`/follow-up`, `/recover`, etc.) that invoke them directly.

### What you need

- Claude Code installed and working — install instructions at [docs.claude.com/claude-code](https://docs.claude.com/claude-code)
- About 10 minutes

### Step 1 — Copy the .claude directory

The Sales Loadout's `.claude/` directory contains:
- `agents/` — 12 agent definitions (currently shipping as referenced skills)
- `commands/` — 12 slash commands

Two install options:

**Option B1 — Project-level install (recommended):**
Copy the `.claude/` directory into the root of whichever Claude Code project you want to use for sales work. The slash commands will work within that project.

**Option B2 — Global install:**
Copy the contents of `.claude/commands/` into `~/.claude/commands/` (your home directory's Claude config). The slash commands will be available everywhere.

For global install of the underlying agents/skills, also copy `skills/` to `~/.claude/skills/` so the slash commands can reference them.

### Step 2 — Test it

Open a Claude Code session and type:

```
/follow-up Sarah test drove a Sportage SX in Snow White on Saturday, no reply since Sunday's quote, I'm Alex
```

You should get back the same structured 5-touch follow-up sequence.

### Step 3 — Add the plugins as project knowledge

Drop the `plugins/` directory (or specific plugin REFERENCE.md files) into your Claude Code project. The agents reference these for sharper output.

### Available slash commands

| Command | What it does |
|---|---|
| `/follow-up` | Generate a 5-touch follow-up sequence for a quiet deal |
| `/recover` | 3-touch no-show recovery |
| `/email` | One polished sales email |
| `/objection` | Three framings + next step for a mid-deal objection |
| `/prep` | Pre-meeting prep — predict top 5 objections |
| `/negotiate` | Tactical negotiation map |
| `/pipeline` | Strategic pipeline review |
| `/priorities` | Daily / weekly action list |
| `/proposal` | Generate a clean 1–2 page sales proposal |
| `/recap` | Post-meeting customer summary + next steps |
| `/cold` | One cold outreach message |
| `/test-drive` | 48-hour post-test-drive follow-up |

---

## Common issues + fixes

### "The output is generic / doesn't sound like a real sales rep"

You probably didn't paste the SKILL.md content into Custom instructions / didn't install the agent properly. Verify:
- (Claude.ai) Custom instructions field contains the SKILL.md body
- (Claude Code) `~/.claude/skills/` contains the relevant skill folder OR the project has `.claude/agents/` configured

### "Claude is asking for too much info before producing anything"

The skills are calibrated to ask for missing critical fields once before producing output (so the output is grounded, not invented). Provide more context in your initial prompt and it'll skip the questions.

### "Claude produced an example with the wrong dealership / brand / vehicle terminology"

Customise the SKILL.md for your dealership. Open the file, search for terms that don't fit your brand (Mitsubishi, Kia, Outlander, etc.), replace with the equivalents from your brand. Save, re-paste into Custom instructions. Takes 5 minutes per skill.

### "The output is too long / too formal / too casual"

Tell the agent. "Make the sequence 3 touches instead of 5", "Drop the formal tone", "Sign off as Phoenix not Alex" — these stick within the conversation. To make them stick across all conversations, add the line to the SKILL.md before pasting.

### "I want to combine multiple skills in one project"

You can. Some reps use one project with multiple SKILL.md files combined into the Custom instructions — works well for "Quick Touch" type tasks (combining Email Generator + Objection Handler + Recap into a single project called "Sales Co-Pilot").

The trade-off: one focused project per skill produces sharper output than one combined project. Recommend keeping the high-stakes skills (Follow-Up Sequence, Negotiation Coach, Proposal Builder) in their own projects.

---

## What to do next

### Once you have the basics installed

1. **Run the Pipeline Review skill** on your current open deals. It'll give you an honest read on what's about to close and what's bleeding time. Do this Friday afternoon weekly.
2. **Use the Customer Recap skill IMMEDIATELY after every customer interaction** — the discipline of capturing what happened doubles your conversion on second visits.
3. **Use the Follow-Up Sequence skill on every quote that goes 4+ days quiet** — this is the single highest-leverage skill in the bundle.

### Customising per your dealership

Worth investing 30 minutes once to customise the skills for your specific brands, vehicles, and processes:

1. Open each SKILL.md
2. Search-and-replace brand examples (e.g., "Kia" → "Toyota" if you sell Toyotas)
3. Update the worked examples with vehicles from your actual lot
4. Add any dealership-specific rules (e.g., "All trade-ins valued by BM, never the rep" if that's your rule)
5. Re-paste into Custom instructions

After the first 30-minute setup, every output is calibrated for your dealership.

### When new versions ship

Pro and Agency tier buyers get lifetime updates. When a new version drops, you'll get an email with a download link to the updated bundle. Replace the relevant SKILL.md / REFERENCE.md files in your projects with the new versions.

---

## Need help?

- **Email support** (Pro + Agency tiers): [support@yourloadout.example — replace with real]
- **Discord community** (Agency tier): [discord link — replace with real]
- **30-day no-questions refund** — email and we'll sort it out
