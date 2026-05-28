# Launch Checklist — Loadout

Five things only you can do. Total: ~45 minutes. Once these are done, the site is live and you can take payments.

---

## 1. Create a Gumroad (or Lemon Squeezy) account → 15 min

Either platform works. Gumroad is faster to set up; Lemon Squeezy handles EU VAT for you.

- **Gumroad:** [gumroad.com](https://gumroad.com) → sign up → "Create product" → Digital product → "The Sales Loadout"
- **Lemon Squeezy:** [lemonsqueezy.com](https://lemonsqueezy.com) → sign up → "New product" → Digital product

**Create 3 products per bundle (just SALES for launch):**
1. The Sales Loadout — $97
2. The Sales Loadout + Script Vault — $144 (= $97 + $47 bump)
3. Done-With-You Setup Call — $497

Upload the bundle delivery file (zip of skills + plugins + setup PDF). Until you have that, set product to "manual delivery" and write a short delivery email template.

---

## 2. Paste the 3 checkout URLs into `src/content/bundles/sales.json` → 2 min

Search the project for `TODO_PASTE_CHECKOUT_URL_HERE` (or just open the file).

```json
"checkoutUrl": "https://gumroad.com/l/sales-loadout",
"bumpUrl":     "https://gumroad.com/l/sales-loadout-vault",
"premiumUrl":  "https://gumroad.com/l/sales-setup-call",
```

The "first 50" `FOUNDING` discount code goes in the Gumroad/Lemon Squeezy dashboard as a $20-off coupon, capped at 50 uses.

---

## 3. Push the repo to GitHub → 10 min

I've already initialised the local repo and made the baseline commit. You just need to push it to a new GitHub repo.

```bash
cd path/to/loadout
gh repo create loadout --private --source=. --remote=origin --push
```

If you don't have the GitHub CLI installed, do it through github.com manually: create an empty private repo called `loadout`, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/loadout.git
git branch -M main
git push -u origin main
```

---

## 4. Deploy to Cloudflare Pages → 10 min

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com) → sign in
2. **Create a project → Connect to Git → pick your `loadout` repo**
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `20` (set under Environment variables: `NODE_VERSION = 20`)
4. Deploy. First build takes ~90 seconds.
5. You'll get a URL like `loadout-xyz.pages.dev` — site is live.

(Netlify is the same flow at [app.netlify.com](https://app.netlify.com) if you prefer.)

---

## 5. (Optional) Connect a real domain → 5–10 min

Pick something short. `loadout.dev`, `getloadout.com`, `loadout.io`. Buy from any registrar (Namecheap, Porkbun, Cloudflare Registrar). Then in your Pages dashboard → Custom domains → Add → paste the domain → follow the DNS prompts.

Also update `astro.config.mjs` `site:` field to your real domain so OpenGraph and canonical URLs are correct.

---

## After launch — the 24-hour playbook

Don't sit on it. Within 24 hours of going live:

1. **Post on LinkedIn** from your profile. Lean on whatever industry credibility you have ("I sell X for a living, built this for myself"). A starting draft is in your n8n pack's `sales-page/copy.md`.
2. **Post in r/n8n** with one workflow as a free gift, linking to the pack. Value first, sell second.
3. **DM 10 people** in your network who'd benefit. Founder-mode outreach, not blasts.
4. **Email your existing client list** if you have one. "I built this. First 50 buyers get $20 off with code FOUNDING."

The site is the storefront. Without traffic, it's an empty shop. Pick three traffic sources and work them hard for the first 14 days — Reddit, LinkedIn, and direct outreach are the highest-leverage starting points.

---

## What's already done

- ✅ Site built and verified — `npm run build` is clean
- ✅ SALES bundle fully written
- ✅ Retail + Trades coming-soon stubs in catalog
- ✅ Pricing anchored at $97 / +$47 bump / $497 premium
- ✅ Founder note drafted as neutral placeholder — fill in your name + credibility line before launch
- ✅ Social proof = honest "founding buyer" launch block (not fake testimonials)
- ✅ Local git repo initialised + first commit
- ✅ README + this checklist
