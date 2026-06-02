# App-mark explorations

Three black-&-white, flat-vector directions for the Loadout.ai app mark — a
modern, geometric reworking of the old gothic symbol. All gothic / serif /
sparkle / cross detailing has been stripped out in favour of clean rounded
forms, strong negative space, and a rounded-squircle tile (≈23% corner radius)
that reads cleanly from a 1024px app icon down to a 20px favicon.

| File | Direction | Reads as |
|---|---|---|
| `01-stack-e.svg` | **Stack · E** — *current primary* | Vertical stem + three rounded bars: an “E” / a loaded stack of modules. Faithful transform of the uploaded symbol. |
| `02-clean-l.svg` | **Clean · L** | A premium geometric monogram; leans into the “Loadout” name and matches the old brand mark. |
| `03-bracket.svg` | **Bracket · Lo** | An L-bracket cradling a rounded module — a literal “loadout slot,” also reads as “Lo”. |

- **`options-contact-sheet.png`** — side-by-side comparison (large icon · inverted · favicon).
- **`preview.html`** — open in a browser to compare live and screenshot.

## Current primary

`brand/loadout-mark.svg` is currently **Stack · E**, with these companions:

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
   cp brand/mark-explorations/02-clean-l.svg brand/loadout-mark.svg
   ```
   (then mirror its glyph into `loadout-mark-light.svg` / `loadout-mark-glyph.svg`).
2. Re-export the PNGs. These were rendered with [`@resvg/resvg-js`](https://github.com/yisibl/resvg-js):
   ```sh
   npm i @resvg/resvg-js
   node -e "const{Resvg}=require('@resvg/resvg-js'),fs=require('fs');\
   for(const[s,o,w]of[['brand/loadout-mark.svg','brand/loadout-mark.png',512],\
   ['brand/loadout-mark.svg','brand/loadout-mark-1024.png',1024],\
   ['brand/loadout-mark-light.svg','brand/loadout-mark-light.png',512]])\
   fs.writeFileSync(o,new Resvg(fs.readFileSync(s),{fitTo:{mode:'width',value:w}}).render().asPng());"
   ```

## Colour

Rich near-black `#0A0A0B` (matches the brand background) + pure white `#FFFFFF`.
Swap to literal `#000000` if you prefer absolute black.
