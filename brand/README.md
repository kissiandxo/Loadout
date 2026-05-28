# Loadout Brand Assets

All brand assets live here. They're hand-built as SVG / HTML so they're vector, infinitely scalable, and editable without proprietary software.

## Logos

| File | Use |
|---|---|
| `loadout-logo.svg` | Primary wordmark on dark backgrounds — 720×200 |
| `loadout-logo-light.svg` | Wordmark on light backgrounds — same dimensions |
| `loadout-mark.svg` | Square mark (200×200) — for favicons, social avatars, app icons |

**To export PNG:** Open the SVG in a browser, screenshot at the size you need. Or use an SVG-to-PNG converter (online or `npx svg2png`).

**Brand colours:**
- Background: `#0A0A0B`
- Text: `#F4F4F5`
- Accent: `#4F8BFF` (gradient to `#2563EB`)
- Border / subtle: `#27272A`

**Typography:** Inter (Google Fonts) — weights 400, 700, 900 in use.

## Gumroad cover images

Standard 1280×720 covers for each product listing.

| File | For |
|---|---|
| `gumroad/gumroad-cover-sales.svg` | Sales Loadout product page |
| `gumroad/gumroad-cover-customer-engagement.svg` | Customer Engagement Loadout product page |
| `gumroad/gumroad-cover-bundle.svg` | Full Bundle ($149) product page |

**To upload to Gumroad:** Open the SVG in a browser, right-click → "Save as PNG" or screen-grab at 1280×720. Gumroad accepts PNG / JPG covers — convert before upload.

## Cheat sheet (print-ready PDF source)

`cheat-sheet-print.html` — a 4-page designed cheat sheet covering both kits. Opens as a webpage but is built for A4 print.

**To export as PDF:**
1. Open `cheat-sheet-print.html` in Chrome (Firefox / Edge / Safari work too, but Chrome handles dark backgrounds best)
2. Cmd/Ctrl + P (Print)
3. Destination: **Save as PDF**
4. Paper: **A4** · Layout: **Portrait** · Margins: **None** · Background graphics: **ON**
5. Save as `loadout-cheat-sheet.pdf`

The PDF is what ships with each kit. Drop into both kit bundles before re-zipping.

## Demo walkthrough (for video / GIF)

`demo-walkthrough.html` — animated 4-step demo loop showing INSTALL → SLASH COMMAND → RESULT → CTA. Designed for screen recording.

**To capture as GIF or video:**
1. Open `demo-walkthrough.html` in Chrome at 1280×720 viewport (use DevTools → Toggle Device Toolbar → Responsive 1280×720, OR resize the browser window)
2. Use a screen recorder:
   - **macOS:** Cmd+Shift+5 → record selected portion → 16 seconds (one full loop)
   - **Windows:** Game Bar (Win+G) → Screen recording, or use OBS Studio
   - **Loom:** browser-based, easy share
3. Convert recording to GIF: ezgif.com or Cloudconvert (target ~3-5MB for landing page use)

Embed the GIF/video on the Loadout landing page above the Pricing block — replaces the current "no demo yet" gap.

## Editing notes

The SVGs are intentionally hand-written (not exported from Figma) so they're:
- Editable in any text editor
- Diff-friendly under git
- Tiny file size
- Vector, never blurry

If you want to redesign in Figma later, that's fine — just re-export as SVG with the same filenames so nothing else needs to change.
