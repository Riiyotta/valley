Source: https://www.joinvalley.co/casestudies

# Case studies index template (`/casestudies`)

Measured 2026-09-29 at 1440, 1280, 768 and 390 (Playwright, cookie banner hidden).

Raw material in `spec/pages/casestudies-index/`:
- `dumps/dump_{w}.txt`
- `page_info.json`
- `components.css`, `custom-styles.css`
- `states/st_ci.json` (hover samples), `states/rv_ci2.json` (in-view reveal samples)
- `screens/full_*.jpg`

Data: `spec/pages/casestudies/cases.json` (**21** case studies). Images: `public/assets/pages/casestudies/` (61 files: 21 covers, 20 logos, 20 avatars). Section chrome images (YouTube thumbnails, logo-band background, customer logos) are listed in `spec/pages/template-assets.json` and downloaded to `public/assets/pages/templates/`.

**Count.** There are 21 case studies, not 22. The index grid, `sitemap.xml` and Framer's search index all list the same 21. Other `/casestudies/<slug>` links found inside blog posts 308-redirect to `/blog/…`.

## 1. Section order and reuse

| # | Section | 1440 y / h | 1280 h | 768 h | 390 h | Reuse |
|---|---|---|---|---|---|---|
| 0 | nav | 0 / 84 | 84 | 68 | 68 | **Homepage nav** |
| 1 | `Blog Page Hero` | 0 / 455 | 455 | 412 | 483 | Same component as the blog-index hero, **without** the featured card |
| 2 | `Content` > `List` > `Blog List` (case grid) | 455 / 8684 | 8307 | 14583 | 11996 | New (`CaseStudyCard`) |
| 3 | `Video testimonial Section` | 9139 / 680 | 680 | 2139 | 2139 | New (`VideoTestimonials`) |
| 4 | Logo band (`section[Desktop]`) | 9818 / 480 | 480 | 1951 | 1974 | New (`CustomerLogoBand`). Not the homepage logo wall |
| 5 | `customers-questions-current` | 10298 / 605 | 605 | 592 | 735 | **Homepage `.vsq-faq`** |
| 6 | footer | 10903 / 597 | 597 | 643 | 815 | **Homepage footer** |

Page heights: 11499 / 11122 / 20320 / 18140. There are no filters, no search and no pagination: all 21 cards render at once, and there's no Load More.

## 2. Hero

- `padding: 144px 48px 40px` (768 and 390: 112px top), bg `#f8f9f7`, column, gap 32.
- The text column is 760 wide.
- `h1` "Real teams. Real outbound results.": PPNM Medium 56/59.36, ls -1.5px w500 `#1c292d` (38px at phone, as on the blog index).
- `h2` sub "See how founders, sales teams, and agencies use Valley to turn relevant outreach into meetings and pipeline.": **PPNM Variable 20/30 `#4e606a`**.
- `form`: identical to the blog-index hero form (389x48 input "Your Work Email" plus 119x48 "Book a call" `#111`).

## 3. Case grid

- Wrapper `padding: 0 48px` (phone 0 20px); List `padding: 40px 0 64px` (phone 32px 0 48px); column, gap 24.
- `h2` "Case Studies": PPNM Medium 36/39.6, ls -0.5px `#1c292d` (28/30.8 at phone).
- **Grid:** 2 columns × 658px, gap **28px** at 1440. At 1280 the cards are 578 wide. At phone it's 1 column (728 / 350) with a 24 gap. Cards in a row don't equalise their heights (753 vs 722 at 1440).
- Card:
  - bg `#fff`, 1px `#d6dede` border via `::after`, `padding: 24px` (phone 20px), column, gap 24, `overflow: hidden`.
  - Cover image: 610x305 (2:1), cover. At 1280 530x265, at 768 688x344, at 390 **310x180**.
  - Body (column, gap 24):
    1. Logo strip: full width × 64, `padding: 12px 16px`, bg **`#f0f3f1`**. Logo 180x34, contain, left, **`mix-blend-mode: multiply`**.
    2. `h2` title: PPNM Medium **26/31.2, ls -0.5px** w500 `#1c292d` (768 and 390: **22/26.4**).
    3. Person row (gap 10):
       - avatar 40x40, cover, `object-position: 50% 0`
       - name: PPNM Variable 18/25.2 `#1c292d`
       - role: PPNM Variable 14/19.6 `#52616a`
    4. Stat row: 2 × 300, gap 10. Value is PPNM Medium 36/39.6 w500 `#1c292d`; label is PPNM Variable 14/19.6 `#52616a`.
    5. "Read" pill as an **`a`**: 132x46, `padding: 8px 12px`, bg `#000` → `/casestudies/<slug>`.
  - The data per card is `cases.json` → `title`, `person`, `cardStats`, `coverImage`, `logoImage`, `avatarImage`.
  - One card ("How a Sales Director 6x'd …") has no logo and no avatar; keep the layout with those slots empty.
  - Some stat labels are empty strings on the live site (GoCanvas, Grand Avenue, Darwinian). Render them empty.

## 4. Video testimonials (`Hear It From Them`)

- `section`: `padding: 0 48px`, bg `#f8f9f7`, 1px bottom border `rgba(34,34,34,.07)` via `::after`.
- `Main Content`: `padding: 64px 0` (phone 48px 0), column, gap 32, centered.
- `h4` "Hear It From Them": PPNM Medium 36/39.6, ls -0.5px `#1c292d`, left-aligned in the full-width box (28/30.8 at phone).
- `Video Cont Stack`: grid, gap 20.

| Width | Columns | Card |
|---|---|---|
| 1440 | 4 × 321 | 321x480 |
| 1280 | 4 × 281 | 281x480 |
| 768 | 1 × 728 | 480 tall |
| 390 | 1 × 350 | 480 tall |

- Each `Video Container` is a lazy YouTube embed:
  - a thumbnail `img` (`i.ytimg.com/vi_webp/<id>/maxresdefault.webp`) at 321x572, cover, centered and overflowing vertically, so it's clipped
  - a centered YouTube play button SVG, 68x48 (`translate(-50%,-50%)`)
  - an iframe `https://www.youtube.com/embed/<id>?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=0` loaded on click
  - Video IDs, in order: `bmTEE6d1oiI`, `XJ-4VYbgO0M`, `Yr5M2U7JTkU`, `19w3cPwB6cg` (external). The four thumbnails are downloaded (see template-assets.json).
- Background:
  - a dot grid `radial-gradient(rgba(0,0,0,.07) 0.6px, transparent 1.4px)`, `background-size: 10px 10px`, full section, in a layer mirrored with `matrix3d(-1,…)`
  - a 400x400 cursor "spotlight": bg `rgba(0,0,0,.07)` masked by `radial-gradient(closest-side, #fff 0%, …)`. It's opacity 0 until the pointer enters, then 1, and it follows the pointer.
  - Because it sits inside the mirrored layer, its translate grows without bound. Measured: x=4597 → 12707 → 34950 px while hovering, so on the live site it immediately leaves the canvas and is **effectively invisible**. Optional; skip it or implement it un-mirrored at your discretion.

## 5. Logo band

- `section` 1440x480, 1px border `rgba(0,0,0,.07)`.
- Background image `GYo82zsW5GvTwz5BUTfdARIZrY.jpg` (1328x770), cover, full bleed.
- `Content`: `padding: 46px 0`, column, gap 40, centered.
- `p` "300+ teams trust Valley’s LinkedIn automation because we keep their calendars full of high quality prospects": PPNM Medium 18/22.5 w500 **`#575757`**, centered.
- `Logos` (column, gap 48; phone gap 0):

| Width | Row 1 | Row 2 |
|---|---|---|
| Desktop | 8 × 110.75, gap 32 | 7 × 131.14, gap 32 |
| 768 | 2 × 360, gaps 10/16 | 2 × 352, gaps 10/32 |
| 390 | 2 × 171 | 2 × 163 |

- Logo images are about 120–147 × 40–49, cover. URLs are in `page_info.json` and `template-assets.json`.
- Cells named `Variant 1` also carry a "CASE STUDY" badge: 84x26, `padding: 6px`, bg **`#d9eeff`**, radius **4.5px**, Geist Mono **700** 12/14.4 uppercase **`#0077b5`**.
- Logos link externally in a new tab (`target=_blank`): tacnode.io, brevitypitch.com, 10xmanagement.com, aminochain.io, growthprotocol.ai, wayside.io, gocanvas.com, gathervoices.co, credal.ai, franq.com.br, darwinian.com, kaster.app, antler.co, bolt.new, ggwp.com.
- Logo hover: no change measured.

## 6. Interaction states (rAF-sampled)

| Element | Hover |
|---|---|
| Case card | none |
| "Read" `a` | Same spring as the blog Read pill (bg `#000` → transparent over about 700ms, label copies roll 8px over about 890ms), **plus** the arrow frame fades opacity 1 → 0 |
| Video card | none, except the cursor behaves as a link. Click swaps in the YouTube iframe (native YouTube UI from there) |
| Logo cell | none |
| Hero "Book a call" | none |

## 7. Motion: in-view reveals (Framer `whileInView`, IntersectionObserver)

Declared in the page module, and confirmed by sampling at the moment the element's top is at viewport y=600 of 900:

| Element | Initial | Final | Transition (declared) | Measured first frame after entering view |
|---|---|---|---|---|
| `Video Container` ×4 | opacity 0, `translateY(15px)` | 1, 0 | spring **stiffness 210, damping 70, mass 1**, **delay 0.6s**; the 4th card has **delay 0.8s** | 620ms (cards 1–3), 821ms (card 4) |
| `Logos` block | opacity 0, `translateY(15px)` | 1, 0 | spring 210/70/1, **delay 0.5s** | 525ms |

- The spring is heavily overdamped. Opacity reaches about 0.87 after roughly 650ms and settles fully in about 1.9s (samples in `states/rv_ci2.json`). The y offset tracks the opacity progress exactly (y = 15 × (1 − p)).
- It plays once (no reverse on scroll-out) and is triggered by any intersection (thresholds 0…1).
- There's no other scroll motion. The nav is static.
- Reduced motion: show elements immediately.

## 8. Links

- Internal:
  - nav and footer (see blog-index.md)
  - 21 × `/casestudies/<slug>` (the "Read" `a` on each card; the card itself is not a link)
- External:
  - 4 YouTube embeds
  - 15 customer sites (`_blank`)
  - nav and footer `beta.joinvalley.co`, Surface demo form, `mailto:hey@joinvalley.co`

## 9. Fonts

- Homepage faces
- **Geist Mono 400/700** (Google variable, latin): `public/assets/pages/fonts/geistmono-latin-var.woff2`
- Inter 400
