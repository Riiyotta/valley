Source: https://www.joinvalley.co/linkedin-automation (plus /tryvalley and /blog/<slug>)

# Asset gap-fill: Rive, product tabs, full SVGs, blog author avatars

Captured 2026-09-29 with Playwright 1.63 (Chromium). Every value below was read from the live pages (network log, bundled Framer JS, computed style) or from the downloaded `.riv` files, loaded in the same Rive runtime the site uses.

The scripts are in `scratchpad/assets2/`: `la.js`, `tv.js`, `riv.js`, `riv2.js`, `verify.js` and `blog.js`. Their raw JSON output is in `scratchpad/assets2/out/`.

All local paths below are relative to `public/`.

---

## 1. Rive animations (`/linkedin-automation`)

### 1.1 Runtime

| Item | Value |
|---|---|
| Wrapper | Framer's built-in **Rive** code component. It is bundled into the page module `https://framerusercontent.com/sites/3k6OJ57RGyNET7iJc2x5n1/FlOoFBLrlnESzgYSmgw5f7XjBd7LxzfZMVD6fjE5a8M.Y9Js2HH_.mjs`. It wraps the `@rive-app/react-*` `useRive` hook. |
| Runtime used | **`@rive-app/webgl2` 2.27.5**. Every instance on the page sets `riveRenderer: true`, so the component picks the WebGL2 (Rive Renderer) build. The bundle also contains a `@rive-app/canvas` copy of the same version (the `riveRenderer: false` path), which this page never uses. |
| WASM | `https://unpkg.com/@rive-app/webgl2@2.27.5/rive.wasm` (fetched once, at every width) |
| JS | Bundled inside the Framer module; no separate script request. For a standalone clone, `https://unpkg.com/@rive-app/webgl2@2.27.5/rive.js` (UMD, global `rive`) behaves identically. It is the build used to inspect the files below. |
| `.riv` format | `RIVE` header, major version 7 |
| External assets | None. No `cdn.rive.app` requests; fonts and images are embedded. |

The Framer component passes these props to `useRive` (verbatim from the bundle):

```
{ src, artboard, stateMachines: "State Machine 1", autoplay: true, autoBind: true,
  automaticallyHandleEvents: true /* handleEvents */, isTouchScrollEnabled: false,
  layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }) }
```

It then runs `useEffect(() => rive && (play ? rive.play() : rive.pause()), [rive, play])`. The Framer prop `play` ("Auto-Play") therefore decides play or pause. `inputsJSON` is `"[]"` everywhere, so no inputs are set. `layoutScaleFactor` is 1.

### 1.2 Files

| Local path | Original URL | Bytes | Artboards in file |
|---|---|---|---|
| `assets/pages/landing/rive/XgB0o9fJSEbmDKrQIb2G97OH9n4.riv` | https://framerusercontent.com/assets/XgB0o9fJSEbmDKrQIb2G97OH9n4.riv | 27,238 | `illo1`, `illo2`, `illo3`, `illo4`. Each is 306x320 with animation `Timeline 1` and state machine `State Machine 1` (no inputs). |
| `assets/pages/landing/rive/2s4AJnvpSsn8LzY6toNdF1nb84.riv` | https://framerusercontent.com/assets/2s4AJnvpSsn8LzY6toNdF1nb84.riv | 293,240 | `flow` is 604x640, with animations `1 2`, `2 2`, `3 2` and state machine `State Machine 1` (no inputs). `logo 2` is 80x80, with `Timeline 1` and `State Machine 1`. It is not referenced by the page directly and is probably nested in `flow`. |

The page requests the feature-card file 4 times (once per canvas; the browser cache serves the repeats) and the flow file once. The same 2 files and 5 canvases load at 1680, 1440, 1280, 768 and 390.

There are no view-model bindings (`viewModelCount` = 0) and no state-machine inputs. Hovering, moving the pointer over and clicking the canvases fired no state changes, so there are **no Rive listeners or hover interactions**.

### 1.3 Where each file renders

| Canvas | Section / element (Framer layer chain) | CSS size (backing store at DPR 1) | File, artboard, state machine | Trigger |
|---|---|---|---|---|
| 1 | `la-features` → "Feature Section" → "Feature Cards" → card "Variant 5" → "BG Grad" → `valleyillo.riv`. Card 1, **"Zero complex integrations"**. At 1440: x 59, y 1653. | 300x300 (300x300), at every width | XgB0 / `illo1` / `State Machine 1` | Autoplay on load. Always playing (`play: true`). Loops. |
| 2 | Same, card "Variant 6", **"Talks like you"**. At 1440: x 400, y 1653. | 300x300 | XgB0 / `illo2` / `State Machine 1` | Autoplay, loop |
| 3 | Same, card "Variant 7", **"Keeps account safe"**. At 1440: x 740, y 1653. | 300x300 | XgB0 / `illo3` / `State Machine 1` | Autoplay, loop |
| 4 | Same, card "Variant 8", **"One person powerhouse"**. At 1440: x 1081, y 1653. | 300x300 | XgB0 / `illo4` / `State Machine 1` | Autoplay, loop |
| 5 | `la-steps`, component "Home Animation" → "Hero" (right half) → `FInal FInal 2.riv`. The LINKEDIN / WEBSITE / SALES / LEADS → Valley → message-card diagram. At 1440: x 785, y 2072. | **594x700** at 1280–1679 and ≥1680. **424x500** at 768 and 390. | 2s4A / `flow` / `State Machine 1` | **Plays on scroll-in (≥50% visible), pauses on scroll-out**. Plays once, then holds the final frame. |

Feature-card variant to artboard mapping in the "Feature Card" component: Variant 1 and 5 use `illo1`, 2 and 6 use `illo2`, 3 and 7 use `illo3`, 4 and 8 use `illo4`. The page uses variants 5–8. The canvas background is transparent; the card's "BG Grad" frame and image sit behind it.

Measured loop periods, from `loop` events when each `Timeline 1` is played as a plain animation:

| Artboard | Loop period |
|---|---|
| `illo1` | 2.50s |
| `illo2` | 0.667s |
| `illo3` | 2.00s |
| `illo4` | 1.50s |
| `logo 2` | about 2.87s |

When run through the state machine, each illo enters state `Timeline 1` immediately and loops forever.

**Flow timing** (state machine `statechange` events, harness):

| Time | State |
|---|---|
| 0.2s | `1 2` |
| 3.0s | `2 2` |
| 5.0s | `3 2` |

Played alone, the animations are one-shot (`stop` event after about 3.0s, 2.0s and 3.2s respectively). The canvas stops changing after about 6s and holds the final frame.

The final frame shows the message card with the RELEVANCE / INTENT / PERSONALIZATION / TONE MAPPING callouts; the first frame is the plain card. Reference frames are in `scratchpad/assets2/out/flow_*.png`.

On the live page the clip kept changing until about 7–8s after entering view. At the end it alternated between 2 hashes; that may be page background grain rather than the canvas.

**Flow trigger wiring**, from the bundle: "Home Animation" is wrapped with Framer's variant-appear effect.

- Settings: `__framer__variantAppearEffectEnabled: true`, `__framer__threshold: 0.5`, `__framer__animateOnce: false`.
- Per breakpoint:

  | Breakpoint | Obscured variant (`play: false`) | Visible variant (`play: true`) |
  |---|---|---|
  | ≥1680 | "Variant 1" | "Variant 2" |
  | 1280–1679.98 | "Variant 3" | "Variant 4" |
  | ≤1279.98 (810–1279.98 and ≤809.98) | "Variant 5" | "Variant 6" |

- The Rive `play` prop is true only in the visible variant. The instance loads with `autoplay: true`, but the effect calls `rive.pause()` as soon as it loads while the section is obscured. Verified live: with only 150px of the section visible, the canvas was static for 4.5s. Scrolled fully in, it animated.
- Leaving the viewport calls `pause()` (no reset). Re-entering calls `play()` again; after a scroll-away and back, the frames changed again.

To clone:

- Use an IntersectionObserver with threshold 0.5 on the steps section. Call `rive.play()` when it enters and `rive.pause()` when it leaves.
- Construct with `autoplay: false`, or pause in `onLoad`.

---

## 2. Product tab images (`/linkedin-automation` → `la-product-tabs`, "Process Section")

Each tab shows **3 stacked images** inside the 1344-wide panel:

| Layer | Box at 1440 | Style |
|---|---|---|
| (a) "Rectangle" background | 1344x933 at (48, 8290) | `filter: blur(10px)`, object-fit cover |
| (b) "Rectangle" overlay | 1344x932 at (49, 8289) | object-fit cover |
| (c) "Image" screenshot | 1159x746 at (142, 8383) | object-fit cover, `box-shadow: rgba(0,0,0,.1) 0 0 24px 32px`. Its frame (1183x770, padding 12) has a 12px `rgba(0,0,0,.1)` border and `backdrop-filter: blur(4px)`. |

The tab bar switches the whole component variant: Dashboard = "Variant 1", Warm Leads = 2, Campaigns = 3, Approvals = 4, Inbox = 5.

All files are the original uploads: the URL without `scale-down-to`, `width`, `height` or `lossless`. The Dashboard images were already in `assets/pages/landing/img/`; copies at the same full resolution are also in `tabs/`.

| Tab | Layer | Local path | Original URL | Pixels | Bytes |
|---|---|---|---|---|---|
| Dashboard | a bg | `assets/pages/landing/tabs/wz7LBgOdjfBjcqdsOpbqnwRzS8.png` | https://framerusercontent.com/images/wz7LBgOdjfBjcqdsOpbqnwRzS8.png | 2098x1696 | 418,783 |
| Dashboard | b overlay | `assets/pages/landing/tabs/Gl9u6E5bAyZgehsQ4HjFHgoDGsc.png` | https://framerusercontent.com/images/Gl9u6E5bAyZgehsQ4HjFHgoDGsc.png | 1536x1024 | 528,975 |
| Dashboard | c screenshot (alt "Valley Dashboard") | `assets/pages/landing/tabs/aSykMoBwdyZZEF29uxf3LFX2jwg.png` | https://framerusercontent.com/images/aSykMoBwdyZZEF29uxf3LFX2jwg.png | 2496x1606 | 155,525 |
| Warm Leads | a bg | `assets/pages/landing/tabs/Y8wPJesuiMeqUh5dOENX5mHZcPI.png` | https://framerusercontent.com/images/Y8wPJesuiMeqUh5dOENX5mHZcPI.png | 1334x1000 | 555,877 |
| Warm Leads | b overlay | `assets/pages/landing/tabs/i5A2o1SyoGxRG5zVUPV81UnN90.png` | https://framerusercontent.com/images/i5A2o1SyoGxRG5zVUPV81UnN90.png | 526x308 | 80,086 |
| Warm Leads | c screenshot | `assets/pages/landing/tabs/GmVsuieqSV4wmUNzTyqx33DH0s.png` | https://framerusercontent.com/images/GmVsuieqSV4wmUNzTyqx33DH0s.png | 2496x1606 | 237,968 |
| Campaigns | a bg | `assets/pages/landing/tabs/mCeLS0Xe1HYm45DCprT4AlnbYMc.png` | https://framerusercontent.com/images/mCeLS0Xe1HYm45DCprT4AlnbYMc.png | 4196x3392 | 1,898,278 |
| Campaigns | b overlay (no srcset on live) | `assets/pages/landing/tabs/P1zX2eeAsQUzCm1wXoJ6kg4JJOI.png` | https://framerusercontent.com/images/P1zX2eeAsQUzCm1wXoJ6kg4JJOI.png | 384x420 | 63,017 |
| Campaigns | c screenshot | `assets/pages/landing/tabs/Lmw7QVvFiUXkLVO08XRMHO928WM.png` | https://framerusercontent.com/images/Lmw7QVvFiUXkLVO08XRMHO928WM.png | 2880x1800 | 110,850 |
| Approvals | a bg | `assets/pages/landing/tabs/ZTpYocqn28qckZfjXwi45xPwLI.png` | https://framerusercontent.com/images/ZTpYocqn28qckZfjXwi45xPwLI.png | 4196x3392 | 4,185,725 |
| Approvals | b overlay | `assets/pages/landing/tabs/Ga9YX9lFU4ytZuLe8mzUGyDOtws.png` | https://framerusercontent.com/images/Ga9YX9lFU4ytZuLe8mzUGyDOtws.png | 524x308 | 46,645 |
| Approvals | c screenshot | `assets/pages/landing/tabs/wHp4b8C58t7DvTPtc5QUjfIj2o.png` | https://framerusercontent.com/images/wHp4b8C58t7DvTPtc5QUjfIj2o.png | 2880x1802 | 186,900 |
| Inbox | a bg | `assets/pages/landing/tabs/kTL2KIcchecrakdPEUWpcyjoX0.png` | https://framerusercontent.com/images/kTL2KIcchecrakdPEUWpcyjoX0.png | 4196x3392 | 3,743,246 |
| Inbox | b overlay | `assets/pages/landing/tabs/RNcTMZaMfOR9w21hgRNoIGG1fAk.png` | https://framerusercontent.com/images/RNcTMZaMfOR9w21hgRNoIGG1fAk.png | 524x292 | 65,990 |
| Inbox | c screenshot | `assets/pages/landing/tabs/qn7iDFRcy3FObGkTOEKEPcNpuRA.png` | https://framerusercontent.com/images/qn7iDFRcy3FObGkTOEKEPcNpuRA.png | 2880x1800 | 136,364 |

Tab label opacity quirk (observed, verbatim original behaviour): the active tab is opacity 1 and the others .6. However, the **Dashboard** label and icon stayed at opacity 1 while Campaigns, Approvals and Inbox were active. They dropped to .6 only when Warm Leads was active. The tab icons are the same SVGs in every variant; only opacity changes.

---

## 3. Full SVG markup (previously truncated at 250 chars)

Everything below is in `assets/pages/landing/svg/`. On the live site the "bg" items are CSS `background-image: url("data:image/svg+xml,…")` on a div, and the "mask" items are `mask-image` on a div with a solid background color. Files are the decoded markup, verbatim (only `xmlns` was added where it was missing).

| Local path | Used by | How the site renders it |
|---|---|---|
| `tab-icon-dashboard.svg` | `/linkedin-automation` product tab "Dashboard" icon ("Graphic", 20x20 at 194,8245) | bg image; 20x20 viewBox, stroke #000 1.33 |
| `tab-icon-warm-leads.svg` | tab "Warm Leads" icon (20x20 at 425,8245) | bg image |
| `tab-icon-campaigns.svg` | tab "Campaigns" icon (20x20 at 664,8245) | bg image |
| `tab-icon-approvals.svg` | tab "Approvals" icon (20x20 at 905,8245) | bg image |
| `tab-icon-inbox.svg` | tab "Inbox" icon (20x20 at 1157,8245) | bg image |
| `case-arrow.svg` | `/linkedin-automation` `la-case-studies` card corner arrow (div 12x12 inside "Arrow" 14x14, which has `transform: rotate(-45deg)` = matrix(.707,-.707,.707,.707,0,0)). Cards "Plain", "With Stats", "With Testimonial" at rest. | bg image, fill `rgb(0,0,0)` |
| `case-arrow-hover.svg` | Same arrow on card hover (card bg goes #000). Also the resting arrow on the dark "Variant 1" (GGWP image) card. | bg image, fill `rgb(255,255,255)` (the only difference) |
| `calendar-chevron-prev.svg` | `/tryvalley` and `/linkedin-automation` `valley-magic` calendar header, left square (24x24 at 1304,1152 on tryvalley) | **mask-image** on a 24x24 div whose `background-color` is `rgb(37,37,37)` via `--szd5nr`. The stroke uses `var(--szd5nr, black)`. |
| `calendar-chevron-next.svg` | Same, right square (24x24 at 1338,1152) | mask-image, same as above |
| `contact-check-badge.svg` | `/tryvalley` "Contact Form" bullet icons: 16x16 at (80,302) before "Demo of the Valley platform" and (80,325) before "Find the right setup for your team". | Inline `<svg viewBox="0 0 24 24"><use href="#876389144"/></svg>`. This file is the referenced symbol with the instance CSS variables baked in: `--1m6trwb: .2` (fill-opacity), `--21h8s6: #0077b5` (fill and stroke), `--pgex8v: 1.5` (stroke width). The result is a scalloped badge with a 20% #0077b5 fill, a 1.5 stroke and a check mark. |
| `contact-check-badge.symbol-raw.svg` | Same symbol, unresolved (keeps the `var(--…)` fallbacks, which default to fill-opacity 0 and black) | For reference |
| `knob-glow-outer.svg` | `valley-magic` slider knob ("Slider Knob" → "Knob Frame"): 89x89 outer glow | bg image. Radial gradient `rgba(255,215,94,.37)` → 0. |
| `knob-glow-inner.svg` | Same knob, 53x53 inner glow (offset 18,18 inside the 89 box) | bg image. Radial gradient `rgba(255,215,94,.53)` → 0. |
| `knob-asterisk.svg` | Same knob, Valley asterisk glyph (17x15.125 viewBox, fill #000) on the white 31x29 tile | bg image |

The knob SVGs are identical on `/tryvalley` and `/linkedin-automation` except for the auto-generated `radialGradient` id string.

---

## 4. Blog author avatars (`/blog/<slug>` → author/meta row)

**Finding:** the "author avatar" on the live site is a **per-post CMS image field**, not one photo per author. The row is a 48x48 `<img>` with `border-radius: 8px`, `object-fit: cover`, next to the author name, Published and Updated.

The data:

- 492 posts; 481 have an avatar and 11 are redirect stubs with none.
- They use **55 distinct image files**.
- Many are topical illustrations. Their alt text is post-specific, e.g. "Happy young girl using AI SDR for LinkedIn outreach with a smile."

I loaded 71 posts live: one per distinct image, plus up to 3 per distinct author label. In **71/71** posts the `<img src>` matched `authorAvatar` in `spec/pages/blog/posts.json`. The posts.json field is therefore correct and can be used as the per-post source of truth.

All 55 files were downloaded at original resolution to `assets/pages/blog/authors/`.

- Naming: `<author-slug>.<ext>` is the author's most-used image (the real headshot). Every other image is `<author-slug>-<framerId>.<ext>`.
- `<author-slug>` is the author the image is most often shown with.
- The full per-file list and the **per-post slug → local avatar path map** are in `spec/pages/ASSETS_GAPFILL.blog-authors.json` (keys `primary`, `files[]`, `posts{}`).

### Primary (headshot) per author

| Author name(s) as displayed | Local path | Original URL | Pixels | Posts using it |
|---|---|---|---|---|
| "Saniya Sood" / "Saniya" (also "Saniya " and "Saniya Sood " with trailing space) | `assets/pages/blog/authors/saniya-sood.jpeg` | https://framerusercontent.com/images/0OwviQTxzr6r2l4SfckrYH3tE0.jpeg | 836x1038 | 182 |
| "Valley" / "Valley editorial team" (Valley asterisk logo on black) | `assets/pages/blog/authors/valley.png` | https://framerusercontent.com/images/cnRnuly8h6LKqnOpIIfcTT6KA.png | 1501x1501 | 86 (74 Valley, 11 shown under "Saniya Sood", 1 under "Zayd Ali") |
| "Zayd Ali" / "Zayd" | `assets/pages/blog/authors/zayd-ali.jpg` | https://framerusercontent.com/images/gPovucVNjmvTpgiV43MixNzTcg.jpg | 798x572 | 18 |
| "Shubh Agrawal" | `assets/pages/blog/authors/shubh-agrawal.jpeg` | https://framerusercontent.com/images/SLXVmXzelte5pTqJYJGMQgHSIU.jpeg | 1536x2048 | 13 |

### Other per-post avatar images

- **Saniya Sood:** 43 files `saniya-sood-<id>.<ext>`. Headshot variants:
  - `-PxswzXkZdsn4JYuVkegnuliy9U.jpg` (433x354, 26 posts)
  - `-TjJsmenZCV1Lwkc3EqKhQFTmD30.webp` (23)
  - `-2j255TCQF154J5vfaT09oDUp6U.webp` (21)
  - `-wFaHghygNfANRf4rPdLJhR57F0.png` (14)
  - `-1t6C3wsKBM8ecZYZypD7QUYAIQY.png` (12)
  - `-gwnJv8CU1jlUbPoiZL6hcBA3so.jpeg` (9)
  - `-QrxeejFNgaYguoZkzlVoYFQmUI.jpeg` (7)
  - `-z2dmVDjNj1rtuNlAOPDfEgDHLp8.png` (7)

  The rest are used by 1–4 posts each, and most of those are illustrations.
- **Zayd Ali:** 8 files `zayd-ali-<id>.<ext>`:
  - `-0KBCxJQNtgzaSotbplzcp0cgA.png`: the same headshot, 616x432, 8 posts
  - `-RkYMuyEtdgStGU8zRVpb3dYfnE.jpeg` (3)
  - `-z6AGSaY1f4VWeHrldxzHhAWNBLs.jpg` (2)
  - `-rBUkBhHVDcYAw2SMBpj4ZjGCT8Q.jpeg`, `-JeW2ylYihK5MAK4dfpTcfRN1wU.jpg`, `-8leDSHEoeeoPRHBUPdKcV4xa79c.jpg`, `-8UfOz4hqCqS7m4tcrLTQ7VIp0T8.jpeg`, `-SExCAul9b1WwdusZ8XLttAx3NN8.jpg` (1 each)

For the clone, render `posts{slug}.avatar` from the JSON map rather than a per-author constant. That is what the live site does.
