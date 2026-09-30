Source: https://www.joinvalley.co/blog

# Blog index template (`/blog`, plus `/blog/archive`)

Measured 2026-09-29 with headless Chromium (Node Playwright), cookie banner hidden. Widths: 1440x900, 1280x900, 768x844 and 390x844. All values come from `getComputedStyle` and `getBoundingClientRect`, plus rAF sampling for motion.

Raw material is in `spec/pages/blog-index/`:
- `dumps/dump_{1440,1280,768,390}.txt`: per-element geometry and style. The line format is the same as the homepage `spec/dumps` (see CLONE_SPEC.md section 0).
- `page_info.json`: every link (internal or external), every image (natural and rendered size), and the loaded fonts.
- `components.css`: de-duplicated live CSS rules that match this page's elements. Nav, footer and FAQ are excluded; they are already in `spec/components.css`.
- `custom-styles.css`: custom `<style>` blocks. There are none beyond the homepage ones, so this file only holds a header.
- `states/hover_samples.json`: rAF-sampled hover timelines.
- `screens/full_*.jpg`, `screens/archive_1440_top.jpg`, `screens/states/read-pill_rest.png`.

Data: `spec/pages/blog/posts.json` (492 posts). Card images: `public/assets/pages/blog/` (450 files, 47 MB).

## 1. Section order and reuse

| # | Section (Framer layer) | 1440 y / h | 1280 h | 768 h | 390 h | Reuse |
|---|---|---|---|---|---|---|
| 0 | nav (`header[Large Desktop]`, fixed) | 0 / 84 | 84 | 68 | 68 | **Homepage nav**, identical (CLONE_SPEC section 7) |
| 1 | `Blog Page Hero` | 0 / 606 | 606 | 969 | 870 | New (`BlogHero`). Its email+button form is also used on `/casestudies` |
| 2 | `Research library spacing` > `2026 outbound research library` | 606 / 1260 | 1264 | 2832 | 2596 | New (`ResearchLibrary`) |
| 3 | `List` > `All Blogs` (CMS list, paginated) | 1866 / 5871 | 5429 | 2097 | 1521 | New (`BlogCardGrid` + `BlogCard`) |
| 4 | `List` > `Blog List` ("Case Studies" strip) | 7737 / 715 | 715 | 998 | 1054 | New (`CaseStudyCardCompact`) |
| 5 | `resources-questions-current` | 8452 / 605 | 605 | 592 | 735 | **Homepage `.vsq-faq`** (FAQ half of `pricing-faq`), same six Q&As, wrapper `padding: 48px` |
| 6 | footer `.vf` | 9057 / 597 | 597 | 643 | 815 | **Homepage footer**, identical |

Page heights: 9654 / 9216 / 8130 / 7591. The body is `#fff`, and every section paints `#f8f9f7` except the research panel.

There is no search, no category filter and no tag filter anywhere on `/blog`. The site has no categories. Pagination is Framer "Load More" (section 5 below). A flat list of all posts lives at `/blog/archive` (section 9 below).

## 2. `Blog Page Hero`

- Wrapper: `padding: 132px 48px 48px`, bg `#f8f9f7`, `overflow: hidden`, `filter: brightness(1)`.
  - 768 and 390: `padding: 112px 20px 40px`.
- Inner row: flex row, `gap: 48px`, align flex-start.
  - 1440: 1344 wide. Title column is 760 at x=48. Featured card is 400x426 at x=856.
  - 1280: title column 736, card at x=832.
  - At or below 810 the row becomes a column with `gap: 40px`, and the card is full width (728x561 at 768, 350x401 at 390).
- Title column: flex column, `gap: 24px`. It holds a text block (column, gap 20) and then the form.
  - `h1` "LinkedIn and Email Outbound Resources for B2B Sales Teams": PP Neue Montreal Medium 56/59.36, ls -1.5px, w500, `#1c292d`. At 768 and 390 it's 38/40.28 with ls -1.5px.
  - `p` "Compare the tools. Understand the tradeoffs. Build an outbound workflow your team can run.": **Inter** 16/19.2 `#000` (18/21.6 at 768 and 390).
  - `form`: flex row, gap 12, 520x48 (350 wide at 390).
    - Input box: 389x48 (219 at 390), `padding: 16px`, bg `#fff`, radius 2px, a 1px `#d6dede` border drawn with `::after`. Placeholder "Your Work Email", PPNM Medium 16/19.2 w500 `#1c292d`.
    - Button `Default`: 119x48, `padding: 12px 22px`, bg `#111111`, radius 0. Label "Book a call", PPNM Medium 16/19.2 w500 `#fff`.
    - This is the same Framer form component as the case-study "Book a call" forms. The form posts to the Surface demo flow; the clone can just link it to `https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b`.
- Featured card: an `a` → `/blog_featured/the-20-minute-prospecting-revolution` (internal). It is 400x426, bg `#fff`, radius 3px, with a 1px `#d6dede` border via `::after`. Inside is the `Featured Blog` layer: column, justify flex-end, bg `#f8f8f8`, a 1px `#d9d9d9` border via `::after`, `overflow: hidden`.
  - Top bar: 64 tall, `padding: 12px`, space-between.
    - Left: the "FEATURED READ" chip. It's 118x24 with `padding: 6px 12px`, a 1px `#000` border via `::after`, and `backdrop-filter: blur(2px)`. Text is **Geist Mono Regular** 12/14.4 `#000`.
    - Right: author pill. 107x40, `padding: 8px 12px 8px 8px`, gap 8, bg `#fbfbfb`, backdrop blur 2px. It holds a 24x24 avatar (cover; the drop-shadow stack is in the dump) and "Zayd Ali" (PPNM Medium 16/16 w400 `#000`).
  - Image: 400x200, object-fit cover, `XA88EO8N36qShdbqaMtTCXsoba8.png` (1200x600).
  - Body: `padding: 20px`, column, gap 16, bg `#fff`.
    - `h5` title: PPNM Medium 24/28.8, ls -0.5px, w500 `#1c292d`.
    - "Read" pill (section 6).

## 3. Research library (`2026 outbound research library`)

- Outer: `padding: 64px 48px` (768 and 390: `40px 20px`).
- Panel: bg `#e9eff0`, 1px `#d3dfe1` border via `::after`, `padding: 40px` (768 and 390: `24px 20px`), flex column, gap 28, `overflow: clip`.
- `h2` "The 2026 outbound research library": PPNM Medium 36/41.4, ls -0.9px, w500 `#1c292d`. At 768 and 390: 30/34.5, ls -0.75px.
- `p` "Five reports. Nineteen direct comparisons. A clearer view of the complete outbound workflow.": PPNM Variable 18/27 `#4e606a`.
- Grid `Reports from the CMS`, `gap: 24px`:

| Width | Columns |
|---|---|
| 1440 | 3 × 405.33 |
| 1280 | 3 × 352 |
| 768 | 1 × 688 |
| 390 | 1 × 310 |

  - There are 5 cards, so the desktop rows are 3 + 2.
  - Each card is an `a[Read the report]`: `padding: 20px`, column, gap 18, bg `#fff`, no border, radius 0.
    - Image: full width, aspect 2:1 (365x183 at 1440, 648x324 at 768, 270x135 at 390), cover.
    - `h3`: PPNM Medium 24/28.8 w500 `#1c292d`.
    - `p` summary: PPNM Variable 16/24 `#4e606a`.
  - Card titles and summaries are short index metadata and are in the dump. The images are 1200x600 PNG covers; their URLs are in `page_info.json`.
- Button `Explore all comparisons` → `/compare`: 240x51, `padding: 16px 24px`, bg `#1c292d`. Label "Explore all 19 comparisons ↗", PPNM Variable 16/19.2 `#fff`.

## 4. Blog card grid (`All Blogs`)

- Section: `padding: 48px 48px 64px`, bg `#f8f9f7`. At 768 and 390 it's `32px 20px 48px`.

| Width | Layout | Card | Page size |
|---|---|---|---|
| 1440 | grid, 2 × 664, gap 16 (row and column), `padding-bottom: 80px` | 664 wide × 426 (1-line title) or 459 (2-line) | 24 |
| 1280 | grid, 2 × 584, gap 16 | 584 × 422 | 24 |
| 768 | flex column, gap 32 | 728 × 460 | 4 |
| 390 | flex column, gap 32 | 350 × 284–316 | 4 |

Page sizes were measured by clicking Load More. At 1440 the list goes 24 → 48 → 72 … → 492 (21 loads). At 390 it goes 4 → 8 → 12.

**Desktop card (≥ 810, `Featured Blog`)**
- bg `#fff`, 1px `#d6dede` border via `::after`, `overflow: hidden`, radius 0.
- `Image` area: 664x306 (1440), `padding: 20px`, column, justify flex-end.
  - The background is either the card image (cover), or, when the post has no card image, the diagonal-stripe pattern: `background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='126' height='126'><path d='M126 0v21.584L21.584 126H0v-17.585L108.415 0H126Zm0 108.414V126h-17.586L126 108.414Zm0-84v39.171L63.585 126H24.414L126 24.414Zm0 42v39.17L105.584 126h-39.17L126 66.414ZM105.586 0 0 105.586V66.415L66.415 0h39.171Zm-42 0L0 63.586V24.415L24.415 0h39.171Zm-42 0L0 21.586V0h21.586Z' fill='rgb(136,136,136,0.2)' fill-rule='evenodd'/></svg>") repeat; background-size: 64px auto` on white.
  - `posts.json` → `cardUsesPattern` tells you which. In the first 24, 14 have images. Overall 452 of 492 posts have a card image.
  - Bottom row inside the image, space-between:
    - "FEATURED READ" chip: 118x24, `padding: 6px 12px`, 1px `#d9d9d9` border, backdrop blur 2px. Geist Mono Regular 12/14.4 **#fff**.
    - "5 min": `h5`, PPNM Medium 14/19.6 w400 `#fff`.
  - Every card on the live site says "FEATURED READ" and "5 min".
- Body `a`: `padding: 16px`, column, gap 16.
  - `h5` title: PPNM Medium 24/32.4 w500 `#1c292d`.
  - "Read" pill.
  - The `a` wraps the body only. It links to `./blog/<slug>` (internal).

**Phone card (< 810)** is a different variant.
- The image is 728x340 at 768 and 350x163 at 390, cover, with a dark overlay div `rgba(0,0,0,.23)`.
- "5 min" sits top-right: `padding-right: 16px`, PPNM Medium **24/33.6** `#fff`.
- The "FEATURED READ" chip sits bottom-left, 16px inset.
- Body: `padding: 16px`, gap 16.

**Load More button** (`button[Default]`): 104x40, `padding: 16px` (0 16px in the case strip), bg `#000`, radius 0. Label "Load More", **Inter 14/16.8 w600** `#fff`, centered. It's right-aligned under the grid (x=1288 at 1440). Hover has no visual change (identical before/after screenshots). It is removed when all 492 posts are shown.

## 5. "Case Studies" strip (`Blog List`)

- Section: `padding: 64px 48px` (768 and 390: `48px 20px`), bg `#f8f9f7`. Column, gap 24.
- Header row, space-between:
  - `h2` "Case Studies": PPNM Medium 36/39.6, ls -0.5px `#1c292d` (28/30.8 at 768 and 390).
  - A "Read" pill, 109x48 here. It has no `href` on the live site (it's a non-link div).
- Cards: 2 side by side at desktop (656x435 each, 32 gap, x=48 and x=736), stacked at phone (728x363 and 350x391).
  - `a[Case Study]`: bg `#f8f8f8`, 1px `#d9d9d9` border via `::after`, `padding: 20px`, column, gap 32.
  - Logo: 616x38, contain, left-aligned.
  - `h2`: PPNM Medium 24/33.6 w500 `#000`.
  - Person row (gap 10):
    - avatar 40x40, cover, `object-position: 50% 0%`
    - name: PPNM Medium 18/25.2 w500 `#1c292e`
    - role: PPNM Variable 14/16.8 `#52616a`
  - Stat row: 2 × 303 wide, gap 10. Value is PPNM Medium 36/39.6 w500 `#1c292e`; label is PPNM Variable 14/19.6 `#52616a`.
  - "Read" pill.
- Only the first 2 case studies (Gallea AI and SaanSerif) are shown.
- Each card also renders a Framer "Load More" button positioned outside the section bounds. It's clipped by an ancestor's overflow, so it's never visible. Don't reproduce it.
- The same component is used as "More Case Studies" on the case-study page (see casestudy.md).

## 6. Shared "Read" pill (`Variant 1`, used on every card in all templates)

- Box 109x40 (109x48 in the case strip header; 132x46 as an `a` on `/casestudies`), `padding: 8px 12px`, bg `#000`, `overflow: hidden`, radius 0.
- Content: two stacked label copies ("Read", PPNM Medium 16/16 w400) and two 16x16 chevron glyphs "»". The rest state shows a white label and a white glyph.
- **Hover** (sampled at rAF, all from one Framer variant change):
  - bg `#000` → transparent.
  - `::after` border colour → `#000` (a 1px black outline appears).
  - The white label copy moves 0 → -8px and fades out; the black copy moves -8 → 0.
  - Text and glyph colour switch white → black on the first frame.
  - The transition is a **spring {stiffness: 500, damping: 60, mass: 1}**, declared in the module as `j={damping:60,…,stiffness:500,type:"spring"}`. The fit to samples gives k≈506, c≈61 (error 0.0002). It settles in about 700ms (bg) and 880ms (y).
  - Hovering the pill does not change the card.
  - On `/casestudies` the pill is an `a` variant where the arrow frame also fades 1 → 0.
- Card containers (`a`, `Featured Blog`, research cards, featured hero card) have **no hover state**. Before/after screenshots were byte-identical.

## 7. Grid summary (all widths)

| Grid | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| Hero row | 760 + 400, gap 48 | 736 + 400, gap 48 | column, gap 40 | column, gap 40 |
| Research reports | 3 × 405.33, gap 24 | 3 × 352, gap 24 | 1 × 688 | 1 × 310 |
| All Blogs | 2 × 664, gap 16 | 2 × 584, gap 16 | column, gap 32 | column, gap 32 |
| Case strip | 2 × 656, gap 32 | 2 × 576, gap 32 | column | column |
| FAQ (`.vsq-faq`) | 466.9 / 747.1, gap 48 | 405.4 / 648.6, gap 48 | 230.8 / 407.2 at 768 (see homepage) | 1 col |
| Footer | per homepage | | | |

## 8. Motion

- No scroll reveal, no appear animation (`[data-framer-appear-id]` exists on one wrapper, which is already at opacity 1), no IntersectionObserver consumers.
- The nav is static (bg `#f8f9f7`, no shadow at any scroll position).
- The only motion is the Read pill hover spring, plus the homepage FAQ and footer behaviour.
- Load More inserts the next 24 cards instantly (no transition).
- `prefers-reduced-motion`: nothing extra is needed.

## 9. `/blog/archive` (footer link "All articles")

- A standalone page with **no nav and no footer**. The body is `#fff`.
- `Archive Content`: max 1200 centered (x=120), `padding: 96px` (390: `48px 20px 56px`), column, gap 24 (390: 20).
- `h1` "Blog archive": **PP Neue Montreal SemiBold** 40/44, ls -1px, w600 `#000` (390: 32/35.2).
- List `Published Articles`: column, gap 12 (390: 14). 492 `Article Link` rows. Each row is an `a` → `./<slug>` with the post title in PPNM Medium 16/22.4 w500 (390: 17/24.65).
- The computed link colour is `rgba(255,255,255,.25)` on a white page, so the titles are almost invisible on the live site (see `screens/archive_1440_top.jpg`). Hover adds an underline.
- Reproduce as-is or fix at Build's discretion. The data source is the same `posts.json`.

## 10. Links

- Internal:
  - nav (Home `/`, Product `/product`, Playbooks `/playbooks` via the dropdown, Valley vs. Competition `/compare`, Customers `/casestudies`, Agencies `/linkedin-outreach-for-agencies`, Pricing `/pricing`)
  - featured card `/blog_featured/the-20-minute-prospecting-revolution`
  - research cards (report pages), "Explore all 19 comparisons ↗" `/compare`
  - 24 × `/blog/<slug>` per page
  - case cards `/casestudies/how-gallea-ai-…`, `/casestudies/how-sans-serif-…`
  - footer (`/product`, `/casestudies`, `/linkedin-outreach-for-agencies`, `/pricing`, `/blog`, `/about`, `/privacy-policy`, `/terms-of-service`)
- External:
  - `https://beta.joinvalley.co/login`, `https://beta.joinvalley.co/signup` (nav and footer)
  - `https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b` (footer "Book a demo")
  - `mailto:hey@joinvalley.co`
- The full list is in `blog-index/page_info.json`.

## 11. Fonts used on this template

PP Neue Montreal Medium (500), PP Neue Montreal Variable (400), **Geist Mono Regular** (chip labels; not used on the homepage, Framer-hosted Google font), Inter 400 and 600 (Load More label uses w600), and the homepage FAQ and footer faces.
