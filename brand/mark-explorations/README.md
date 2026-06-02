# App-mark explorations — L+T monogram

Modern, black-&-white reworkings of the old gothic mark. The original symbol
was an **L+T combined** monogram (a vertical stem with a **T** crossbar on top
and an **L** foot at the bottom) buried under gothic serifs, bone-ends, a cross
finial, and sparkles. These keep that L+T skeleton and rebuild it as a thick,
rounded geometric mark with a **subtle forward lean** (for motion, à la
Linear / Arc), inside a rounded squircle tile (~23% corner radius). All gothic /
occult / medieval / religious cues are removed. Reads cleanly from a 1024px app
icon down to a ~20px favicon.

| File | Direction | Notes |
|---|---|---|
| `tl-02.svg` | **L + T · thick** — *current primary* | Faithful L+T combined; thick rounded bars, gentle ~6° lean. |
| `tl-01.svg` | **L + T · light** | Same monogram, lighter weight and a wider T-bar. |
| `tl-03-Lonly.svg` | **L · lean** | Pure “L” monogram with the same forward lean (drops the T). |

- **`options-contact-sheet.png`** — side-by-side comparison (large · inverted · favicon).
- **`preview.html`** — open in a browser to compare live, including a wordmark lockup.

## Current primary

`brand/loadout-mark.svg` is currently **L + T · thick** (`tl-02`), with companions:

| File | What |
|---|---|
| `brand/loadout-mark.svg` | Primary mark — dark tile, white glyph (200×200) |
| `brand/loadout-mark-light.svg` | Inverted — white tile, dark glyph |
| `brand/loadout-mark-glyph.svg` | Glyph only, transparent (recolour via `fill`) |
| `brand/loadout-mark.png` | 512px export |
| `brand/loadout-mark-1024.png` | 1024px export (app stores / high-res) |
| `brand/loadout-mark-light.png` | 512px inverted export |

## Promote a different option to primary

1. Copy your chosen option over the primary, e.g.:
   ```sh
   cp brand/mark-explorations/tl-01.svg brand/loadout-mark.svg
   ```
   then mirror its glyph into `loadout-mark-light.svg` (white tile / `#0A0A0B`
   glyph) and `loadout-mark-glyph.svg` (no tile).
2. Re-export the PNGs with [`@resvg/resvg-js`](https://github.com/yisibl/resvg-js):
   ```sh
   npm i @resvg/resvg-js
   node -e "const{Resvg}=require('@resvg/resvg-js'),fs=require('fs');\
   for(const[s,o,w]of[['brand/loadout-mark.svg','brand/loadout-mark.png',512],\
   ['brand/loadout-mark.svg','brand/loadout-mark-1024.png',1024],\
   ['brand/loadout-mark-light.svg','brand/loadout-mark-light.png',512]])\
   fs.writeFileSync(o,new Resvg(fs.readFileSync(s),{fitTo:{mode:'width',value:w}}).render().asPng());"
   ```

## Tuning the lean

The forward lean is a `skewX(-6)` (or `-8`) on the glyph group, with a small
`translate(x)` to recenter. Reduce toward `-4` for more upright, increase toward
`-10` for more motion.

## Colour

Rich near-black `#0A0A0B` (matches the brand background) + pure white `#FFFFFF`.
Swap to literal `#000000` for absolute black.
