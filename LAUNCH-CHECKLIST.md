# Launch Checklist — Loadout

Two kits built. Site builds clean. Zips ready. Brand assets in place. This is what's left — only the manual steps you have to do yourself.

Total time to go live from here: **~3 hours** if you push through.

---

## 0 — What's already done (don't redo)

- ✅ Sales Loadout kit built + zipped → `product/sales-loadout/dist/`
- ✅ Customer Engagement Loadout kit built + zipped → `product/customer-engagement-loadout/dist/`
- ✅ Astro site builds clean (3 live pages: home + 2 bundle pages + thanks)
- ✅ Site repositioned as "AI staff pre-built for any business"
- ✅ Personal info scrubbed (no Phoenix / Gateway / Kia / Mitsubishi / NSW anywhere shipping)
- ✅ Git history clean (single fresh commit by neutral author)
- ✅ Brand assets: logo, mark, 3 Gumroad covers, designed cheat sheet, animated demo walkthrough → `brand/`

---

## Step 1 — Convert brand SVGs to PNGs (10 min)

Gumroad accepts SVG but PNG is safer for thumbnails.

For each file in `brand/` and `brand/gumroad/`:

1. Open the `.svg` in Chrome
2. Right-click → **Save as PNG** (or screenshot at the SVG's native size)
3. Save alongside the original as `.png`

Specifically you need:
- `brand/loadout-logo.png` (720×200)
- `brand/loadout-mark.png` (200×200)
- `brand/gumroad/gumroad-cover-sales.png` (1280×720)
- `brand/gumroad/gumroad-cover-customer-engagement.png` (1280×720)
- `brand/gumroad/gumroad-cover-bundle.png` (1280×720)

Faster way: open each SVG → press F12 → Console tab → run:
```js
const svg = document.querySelector('svg');
const data = new XMLSerializer().serializeToString(svg);
const canvas = document.createElement('canvas');
canvas.width = svg.viewBox.baseVal.width;
canvas.height = svg.viewBox.baseVal.height;
const img = new Image();
img.onload = () => {
  canvas.getContext('2d').drawImage(img, 0, 0);
  const a = document.createElement('a');
  a.download = 'export.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
};
img.src = 'data:image/svg+xml,' + encodeURIComponent(data);
```

---

## Step 2 — Generate the PDF cheat sheet (5 min)

The polished PDF that ships with both kits.

1. Open `brand/cheat-sheet-print.html` in Chrome
2. Press Cmd/Ctrl + P
3. Set: **Destination: Save as PDF · Paper: A4 · Layout: Portrait · Margins: None · Background graphics: ON**
4. Save as `loadout-cheat-sheet.pdf`
5. Copy the PDF into:
   - `product/sales-loadout/PROMPT-CHEAT-SHEET.pdf`
   - `product/customer-engagement-loadout/PROMPT-CHEAT-SHEET.pdf`
6. Re-run both packagers:
   ```powershell
   & 'product/sales-loadout/pack-product.ps1'
   & 'product/customer-engagement-loadout/pack-product.ps1'
   ```

(Edit each `pack-product.ps1` $Include array to add `PROMPT-CHEAT-SHEET.pdf` if you want it in the zip — otherwise it's a separate add-on file on the Gumroad listing.)

---

## Step 3 — Record the demo GIF (15 min)

1. Open `brand/demo-walkthrough.html` in Chrome at 1280×720 (DevTools → device toolbar → custom 1280×720, or just resize the window)
2. Record one full loop (16 seconds) using:
   - **macOS:** Cmd+Shift+5 → record selected portion
   - **Windows:** Win+G (Game Bar) → record · or OBS Studio
   - **Loom:** browser-based, easy upload
3. Convert to GIF at ezgif.com (target 3-5 MB) OR keep as MP4 and host on Vimeo/YouTube unlisted
4. Embed on:
   - Gumroad listings (each product page's "Description" field)
   - The Astro site's home hero OR bundle pages (above Pricing section)

---

## Step 4 — Create Gumroad (or Lemon Squeezy) account (20 min)

Decision: **Gumroad** is fastest to set up; **Lemon Squeezy** handles EU VAT automatically.

For first launch I recommend Gumroad — easier, validates conversion before optimising for tax compliance.

### Gumroad setup

1. Sign up at [gumroad.com](https://gumroad.com)
2. Verify your email + connect a payout method (Stripe in most regions)
3. Create products in this order:

| Product | Price | Cover | File to upload |
|---|---|---|---|
| **The Sales Loadout** | $97 | `gumroad-cover-sales.png` | `product/sales-loadout/dist/the-sales-loadout-v1.zip` |
| **The Sales Loadout + Vault** | $144 | (use same cover with "+ VAULT" overlay or same one) | `product/sales-loadout/dist/the-sales-loadout-with-vault-v1.zip` |
| **The Customer Engagement Loadout** | $97 | `gumroad-cover-customer-engagement.png` | `product/customer-engagement-loadout/dist/the-customer-engagement-loadout-v1.zip` |
| **The Customer Engagement Loadout + Vault** | $144 | (same) | `product/customer-engagement-loadout/dist/the-customer-engagement-loadout-with-vault-v1.zip` |
| **The Full Loadout (both kits)** | $149 | `gumroad-cover-bundle.png` | Either upload both Vault zips OR have Gumroad's "bundle" feature combine them |
| **Done-With-You Setup Call** | $497 | (text-only cover, optional) | (no file — this is service delivery; you book the call after purchase) |

### Product description for each

Copy from the bundle's `README.md` for the long description. Add a short headline at the top:

For Sales Loadout:
> **12 specialised AI sales staff. Pre-built. Installed in 30 minutes.**
> Stop losing deals to follow-up failures, slow proposals, and missed objections. Works in Claude.ai Projects OR Claude Code.

For Customer Engagement Loadout:
> **12 AI staff + your own website chatbot. Pre-built.**
> Replace Chatbase / Tidio / Intercom Fin with an owned stack. ~$1 per 1,000 messages thereafter.

### Coupons (set after products are live)

- Code: `FOUNDING` — $20 off, capped at 50 uses
- (Optional later) Code: `BUNDLE5` — $5 off the bundle, no cap

---

## Step 5 — Paste the 6 checkout URLs into the site (5 min)

Open `src/content/bundles/sales.json` AND `src/content/bundles/customer-engagement.json`.

Search for `TODO_PASTE_CHECKOUT_URL_HERE` and replace with the real Gumroad URLs.

```json
"checkoutUrl": "https://gumroad.com/l/sales-loadout",
"bumpUrl":     "https://gumroad.com/l/sales-loadout-vault",
"premiumUrl":  "https://gumroad.com/l/loadout-setup-call",
```

---

## Step 6 — Replace the founder placeholder (5 min)

Open in this order:
1. `src/components/bundle/FounderNote.astro` — fill in the `<!-- TODO -->` lines + the `FN` initials → your real initials (or swap the div for an `<img src="/founder.jpg">`)
2. `src/components/home/FounderSection.astro` — same treatment
3. If you want a real headshot: save a square ~96×96 JPG to `public/founder.jpg` and replace the div with an `<img>`

Or leave the FN placeholders for now and launch — you can update post-launch without breaking anything.

---

## Step 7 — Push the repo to GitHub (10 min)

Local git is already initialised + committed. Just need a remote.

```bash
cd path/to/loadout
gh repo create loadout --private --source=. --remote=origin --push
```

No GitHub CLI? Create an empty private repo at github.com → then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/loadout.git
git branch -M main
git push -u origin main
```

---

## Step 8 — Deploy to Cloudflare Pages (10 min)

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com) → sign in
2. **Create a project → Connect to Git → pick `loadout`**
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variables: `NODE_VERSION = 20`
4. **Save and Deploy**. First build ~90 seconds.
5. Your URL: `loadout-xyz.pages.dev`

---

## Step 9 — (Optional) Connect a real domain (5–15 min)

Buy: `getloadout.com` / `yourloadout.com` / `loadout.dev` from Namecheap, Porkbun, or Cloudflare Registrar.

In Cloudflare Pages → your project → **Custom domains → Add** → paste the domain → follow DNS prompts.

Also update `astro.config.mjs` `site:` to your real domain so OpenGraph + canonical URLs are correct, then push the change.

---

## Step 10 — The first 30 buyers (this is the actual work)

Site live with no traffic = zero sales. Within 24 hours of launch:

### Channel 1 — Reddit (highest ROI for this audience)
- **r/ClaudeAI** (~80k members) — Post: "I built [the Sales Loadout / Customer Engagement Loadout] — sharing the [free] follow-up sequence skill"
  - Give the `01-follow-up-sequence/SKILL.md` (or `01-website-chatbot-builder/SKILL.md`) away free in the post
  - Link to the bundle at the end as "if you want the other 11 + plugins"
- **r/SaaS** for the Customer Engagement Loadout (the chatbot angle resonates)
- **r/EntrepreneurRideAlong** for the Sales Loadout (sales rep angle)
- **r/n8n** if you decide to bundle in any of your 30 n8n workflows later

### Channel 2 — LinkedIn (founder credibility play)
Single post — your own story. Don't make it a sales pitch.

Template:
> Last [month/year] I built an AI-powered chatbot for my own website. Took an afternoon and $0/month to run — instead of $99/mo for Chatbase.
>
> Worked so well I built 11 more agents around it. Then sold them as a kit.
>
> The Loadout: 12 AI customer engagement staff + the chatbot stack. Drop into Claude Code or Claude.ai Projects. One-time $97.
>
> Comment "kit" or DM me for the link.

### Channel 3 — Indie Hackers + Hacker News
Post when one of your three (Reddit / LinkedIn / X) is showing traction. Don't burn the launch all in one day.

### Channel 4 — Direct outreach (slow but compounds)
Find 50 people in your network who'd benefit. Personal DM, not a blast. "Built this for myself, thought of you because [specific reason]. If it's not relevant just say."

### Channel 5 — Product Hunt (later — only when you have ~10 customers)
Don't launch on PH first day. The platform punishes low-engagement launches. Wait until you have 10 buyers + 3 testimonials.

### Channel 6 — Pricing experiments
- First 50 buyers get `FOUNDING` ($20 off) — you've already set this up in Gumroad
- After 50 buyers: regular pricing, no code
- After 100 buyers: maybe an upsell to the Full Bundle for existing buyers of one kit at $52 ("Get the other kit for $52 — you've already bought one")

---

## Common things to fix post-launch

You'll find these once real customers start buying:

- **Output too dealership-specific** in Sales kit examples → run the skill examples once for your buyer's industry, replace if many people complain
- **Cloudflare Worker setup confuses non-technical buyers** of the chatbot agent → write a video walkthrough, attach to product page
- **Vault tier underselling** → improve the description, list a few specific scripts
- **No social proof** → after first 5 buyers, ask each one for a one-line testimonial + permission. Add to landing page (replacing the "founding buyer" placeholder section)

---

## Done state — when you've shipped

You'll know launch is complete when:

1. ✅ At least one paid sale has settled on Gumroad
2. ✅ The bundle delivery email has been received by a real customer
3. ✅ At least one customer has confirmed they got value (replied with feedback / tagged you / left a review)

That's the bar. Then iterate.

---

## What's deliberately NOT in this checklist

- Email automation / Mailerlite drip sequences — defer until you have 50+ buyers and email list is worth nurturing
- SEO blog content — slow channel, defer until paid channels are working
- Affiliate program — defer until product has converted 100+ paying customers and proof-of-life exists
- Multi-language versions — defer to v2
- More kits (Marketing / Ops / HR / Finance staff) — defer until first two kits have converted 200+ buyers combined

Focus is the moat. Two kits live and selling beats six kits half-built.
