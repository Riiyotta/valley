Source: https://www.joinvalley.co/casestudies/how-gallea-ai-generated-600k-in-pipeline-with-valley-in-just-3-weeks

# Case study template (`/casestudies/<slug>`)

Measured 2026-09-29 at 1440, 1280, 768 and 390 (Playwright, cookie banner hidden).

- **Primary sample** (full dumps and screenshots): Gallea AI (long body, 11,488px at 1440).
- **Second sample** (rich-text styles and outline at 1440, 768 and 390): `how-gocanvas-30x’d-outbound-pipeline-with-valley` (short body).
- Hero stats, person and meta for all 21 were collected by loading every case page. They're in `spec/pages/casestudies/cases.json`.

**Content rule.** The case-study body, the pull-quotes, the testimonial quote and the company "About" blurb are redacted in all raw files (`[redacted N chars]`) and blurred in the screenshots. Render placeholders.

Raw material in `spec/pages/casestudy/`:
- `dumps/`, `page_info.json`, `components.css`, `custom-styles.css`, `screens/`
- `rich/rich_cs_{gallea,gocanvas}.json`, `rich/roles_by_width.txt`
- `states/st_cs.json`, `states/st_faq.json`

## 1. Section order and reuse

| # | Section | 1440 y / h | 1280 h | 768 h | 390 h | Reuse |
|---|---|---|---|---|---|---|
| 0 | `Valley navigation` | 0 / 84 | 84 | 68 | 68 | **Homepage nav** |
| 1 | `Blog Title` (dark hero + 3 stats) | 0 / 645 | 645 | 870 | 956 | New (`CaseHero`, `HeroStat`) |
| 2 | `Testominoal + CTA` (sic) | 645 / 604 | 616 | 1141 | 1026 | New (`CaseTestimonial`) |
| 3 | `Content` (article + sticky sidebar) | 1249 / 7580* | 7580* | 7563* | 10294* | Shares `RichText` and `InlineCtaCard` with blog posts; new `CaseAboutCard`, `SectionChip`, `PullQuoteCard`, `ResultStats` |
| 4 | `More Blogs` ("More Case Studies") | 8829 / 498 | 529 | 838 | 945 | Same card family as the blog-index "Case Studies" strip, in a compact variant |
| 5 | `Join Waitlist Section` | 9327 / 916 | 916 | 1022 | 1055 | New (`WaitlistBand` + `InboxMock`) |
| 6 | `Heading + Desc FAQ` | 10243 / 649 | 649 | 590 | 682 | New (`FaqAccordion`). **Not** the homepage `.vsq-faq` |
| 7 | footer | 10892 / 597 | 597 | 643 | 815 | **Homepage footer** |

\* Depends on body length. GoCanvas's body is 3,986px tall at 1440, versus 7,436px for Gallea.

## 2. Hero (`Blog Title`)

- bg **`#1a3037`**. The inner wrapper has `padding: 148px 48px 72px` (phone `124px 20px 48px`) and box-shadow **`rgba(88,92,95,.2) 0 40px 96px -8px`**.
- Column, gap 40.
- `h1` (the case title from cases.json): PPNM Medium 56/62.72, ls -1.68px w500 **`#fff`**. It sits in a 960 box, centered (x=240 at 1440, 160 at 1280). At phone: 38/42.56, ls -1.14px.
- Stats row `Frame 11644`: flex row, gap 20, 3 cards.
  - Card size: 435x192 at 1440, 381 wide at 1280. At phone it's a column with gap 20, 728 / 350 wide.
  - Each card: `padding: 24px`, column, gap 20, 1px **left** border `rgba(255,255,255,.25)` via `::after`.
    - label: PPNM Medium 20/20 w400 `rgba(255,255,255,.5)`
    - value: PPNM Medium **56/56** w500 `#fff`
    - chip: `padding: 6px 12px`, gap 4, 1px `#fff` border. It holds a 10x10 up-arrow (data-URI SVG, white) and uppercase text in Geist Mono Regular 14/16.8 `#fff`.
    - The chip texts are fixed: "HIGHER REVENUE", "MORE MEETINGS", "BETTER TRACTION".
  - The data comes from `cases.json` → `heroStats[] {label, value, chip}`. Some labels are empty.

## 3. Testimonial + CTA line (`Testominoal + CTA`)

- bg `#f8f9f7`, `padding: 72px 48px` (phone 48px 20px). Column, gap 24, centered.
- Row `Frame 11652`: flex row, gap 40. At phone it's a column, with the photo after the quote.
  - Portrait `img`: 376x343 at 1440, 332x302 at 1280, 728x664 at 768 and 350x319 at 390. Cover. It's the person's photo, the same file as the card avatar.
  - Quote column (928 at 1440, 812 at 1280; column, gap 32):
    - quote `h2`: PPNM Medium 40/44.8, ls -1.2px w500 `#1c292d`. This is case content, so use a placeholder.
    - name `h5`: PPNM Medium 20/28 `#000`
    - role: Geist Mono Regular 12/14.4 uppercase `rgba(0,0,0,.5)`
- Divider: 1344x1, bg `#d9d9d9`.
- CTA line (template copy, identical on all 21 pages; column, gap 8):
  - `h2` "Turn LinkedIn into Your Most Predictable Revenue Channel": PPNM Medium 28/39.2 w400 `#000`
  - `p` "A top 1% rep working 24/7 on linkedIn": PPNM Medium 16/20.8 `#000`

## 4. Body (`Content`)

- Wrapper bg `#f8f9f7`, `padding: 72px 48px` (phone 48px 20px).
- `Content Container`: max 1200 (1184 at 1280). Desktop is a flex row with gap 48; phone is a column with gap 32.
- **The article is on the LEFT (760, or 757 at 1280) and the sidebar on the RIGHT.** This is the mirror of the blog post layout.

**Sidebar `Table of content container`**:
- 384 wide at 1440, 379 at 1280, full width at phone.
- **`position: sticky; top: 220px`** on desktop. At phone it's placed **above** the article and not sticky.
- Column, gap 12. There are **no TOC links** on case studies. It holds two cards:
  1. `About`: 1px `#d9d9d9` border.
     - Logo box: full width × 80, bg `#fff`, `padding-left: 12px`; logo 372x47, contain.
     - Blurb: `padding: 24px`, 1px top border `#d9d9d9`. The text is PPNM Variable **18/27.9 uppercase** `#4e606a`. It's the company description (CMS), so use a placeholder.
  2. `CTA`: bg **`#e7eff0`**, 1px `#d9d9d9` border, `padding: 24px`, column, gap 24.
     - `h2` "Try Valley": 28/39.2
     - `p` "Make LinkedIn your Greatest Revenue Channel  ↓": PPNM Medium 16/20.8 `rgba(0,0,0,.5)`
     - email input 336x48 + "Book a call →" button: identical to the blog sidebar CTA

**Article (`Case Study Content Container` > `Content`)**: column, gap 48, `padding-bottom: 16px`. Structure, in order:
1. Section group `Frame 2147223607`:
   - chip "CHALLENGES": 108x24, `padding: 6px 12px`, 1px `#000` border, Geist Mono Regular 14/16.8 `#000`
   - then (gap 32) `h2` 40/44.8, ls -1.2px (30/33.6 at phone), then (gap 16) a rich-text block
   - Gallea: p×7. GoCanvas: p×3.
2. **Pull-quote card** `Frame 2147223628`:
   - 760x270 (phone 728x232 / 350x304)
   - background photo, cover; 1px border `rgba(0,0,0,.25)` on the right, bottom and left
   - `padding: 48px`
   - a white panel (`padding: 48px 28px`, row, gap 8, same triple shadow as the blog CTA card, **no** blur) holding a “ glyph (PPNM Medium 40/40 `#000`) and an `h2` quote (PPNM Medium 28/39.2 w400 `#000`; 20/28 at phone)
3. `CTA 1`: identical to the blog inline CTA card (blog-post.md section 4).
4. Section group "SOLUTIONS": chip, h2, rich text (p with strong lead-ins, sometimes ul).
5. `CTA 1` again (the second instance).
6. Section group "RESULTS": chip, h2, rich text (Gallea: p×2, ul(3 li), p…).
7. **Result stats** `Frame 11644`:
   - desktop: row of 3 × 253 × about 220
   - each card: `padding: 20px 24px`, column, gap 32, 1px left border `rgba(0,0,0,.25)`
     - label p: PPNM Medium 19–20/20 `rgba(0,0,0,.5)`
     - value **`h1`**: PPNM Medium **48/57.6** w400 `#000`
     - chip with an arrow SVG and Geist Mono 14/16.8 `#000`
   - phone: column, gap 12; each card has a full 1px `rgba(0,0,0,.25)` border and the value is 28/30.8
   - these mirror the hero stats
8. `CTA 2` (a third inline CTA) is the last child, after the result stats (y=8430 at 1440 on the sample).

Rich-text roles are the same as blog posts (`rich/roles_by_width.txt`):
- p PPNM Variable 20/31 `#4e606a` with m-top 20 (18/27.9 at phone)
- strong Inter 700
- a `#002669`
- ul li `padding-left: 24.68px`

Element occurrence across all 21 case-study bodies (SSR scan):
- ul in 17
- ol in 6
- blockquote in 3
- h3 in 2
- h4 in 1
- no tables, no code, no iframes

These use the same blog rich-text styles (blog-post.md section 4). The images in 21 are the pull-quote and CTA backgrounds.

## 5. "More Case Studies" (`More Blogs`)

- bg `#f8f9f7`, `padding: 72px 48px`. Column, gap 24.
- `h2` "More Case Studies": 40/44.8, ls -1.2px `#1c292d`, 960 wide, left-aligned.
- Grid: 2 × 656 with gap 32 (1440), 2 × 576 (1280), 1 column at phone. It always shows the first two case studies (Gallea and SaanSerif), even on those same pages.
- Compact card `a[Case Study]`:
  - bg `#f8f8f8`, 1px `#d9d9d9` border, `padding: 20px`, column, gap 32
  - top row: logo 303x38 (contain, left) and "CASE STUDY" (Geist Mono Regular 11/13.2 uppercase `#000`, right-aligned)
  - `h2`: **PPNM Medium 28/31.36, ls -0.84px** w500 `#1c292d`
  - meta row (gap 24):
    - person block (220 wide, `padding-right: 32px`, 1px right border `#d9d9d9`): avatar 40x40, name PPNM Medium 16/22.4 `#000`, role Geist Mono 10/12 uppercase at opacity .6
    - 2 stats: value PPNM Medium 16/22.4, label Geist Mono 10/12 uppercase at opacity .6
  - "Read" pill
- Live quirk: the card links are `href="./"` (homepage). Use `/casestudies/<slug>`.
- Each card also renders an invisible, clipped "Load More" button; don't reproduce it.

## 6. Join Waitlist band

- `section`: bg **`#1a3037`**, 1px border `rgba(0,0,0,.07)` on the right, bottom and left. `padding: 72px 48px`, row, gap 48. At phone it's a column.
- Left `Heading + Desc` (857 wide; column, gap 41):
  - `h3` "The LinkedIn tool that floods your inbox (with real replies).": PPNM Medium 40/44.8, ls -1.2px w500 `#fff`
  - form `Variant 1` (414x48, row, gap 0):
    - input (282x43 in a 48-tall label with a 5px top pad; bg `#fff`, radius 1px, 1px `rgba(0,0,0,.5)` border, `padding: 9px`, placeholder "Work Email" in PPNM Medium 16 `rgba(0,0,0,.5)`)
    - button "Book Demo →" 132x48, same button as the others
- Right `Variant 7` **inbox mock**: 439x772, bg `#fff`, 1px `rgba(0,0,0,.1)` border, **shadow `rgba(2,133,192,.2) 0 1px 40px`**, `overflow: hidden`.
  - Header "Messages": 42 tall, `padding: 10px 16px`, 1px bottom border `rgba(0,0,0,.05)`, 16/22.4 `#000` at opacity .8, chevron icon.
  - Search row: `padding: 6px 10px`, inner bg `#f8f9fb`, `padding: 8px`, "Search messages" 14/19.6 `rgba(0,0,0,.5)`.
  - `messages` list: rows 439x86, `padding: 16px 12px`, gap 10, 1px top and bottom borders `rgba(0,0,0,.07)`.
    - avatar 54x54 (radius 100px) with a 12x12 online dot (`#077542`, 1px white ring)
    - name 16/22.4
    - time 15/21
    - preview 15/21 `#4a4b4d`
    - unread badge 18x18 `#0285c0` with "1" in DM Sans 12 `#fff`
    - the texts are at opacity .8
  - The mock avatars and names are UI chrome; they're in the dump and `template-assets.json`.

## 7. FAQ accordion (`Heading + Desc FAQ`)

- bg `#f8f9f7`, `padding: 72px 48px`, column, gap 31, centered.
- Label chip "frequently Asked Questions": 213x26, `padding: 6px 13px`, 1px `#000` border, Geist Mono **400** 12/14.4 uppercase `#000`.
- `h3` "FAQ": 40/44.8, ls -1.2px `#1c292d` (960 box).
- Accordion: 960 wide, 5 items, column, gap 0.
  - Each item: bg `#fff`, 1px bottom border `rgba(0,0,0,.07)`.
  - Closed: `padding: 12px 24px`, 64 tall. Open: `padding: 20px 24px`.
  - Top row: gap 24. Question p is PPNM Medium 16/20.8 `#000`, 848 wide.
  - Answer: PPNM Medium 16/22.4 at `rgba(0,0,0,.7)` (the text block also has opacity .7).
  - Plus icon: two bars, 14x2 and 2x14, bg `#999`, radius 1px / 10px. When the item is open only the horizontal bar remains (a minus).
- The first item is open by default. **Items toggle independently**: clicking a closed item opens it without closing the others, and clicking an open item closes it (verified on GoCanvas: `O116 C64 C64 C64 C64` → `O116 C64 O93 C64 C64` → `C64 C64 O93 C64 C64`).
- Questions (site copy, identical on all 21 pages):
  1. "Which channels does Valley support?"
  2. "How safe is it and does Valley risk my LinkedIn account?"
  3. "Do I have to commit to an Annual Plan like other AI SDRs?"
  4. "How does Valley personalize messages?"
  5. "Is Valley available in my country?"
  - The answers are in the dump if needed. They're product FAQ copy, not case-study content.
- **Open motion (sampled):** height 64 → 138 (for a 2-line answer).
  - It fits an underdamped spring, ζ≈0.80, settling in about 400ms with a slight overshoot (138.7 → 138.0).
  - That matches Framer's `{type:"spring", bounce:0.2, duration:0.4}`, which is declared in this page's modules.
  - The answer text and the icon bars switch on the first frame.

## 8. Interaction states

| Element | Result |
|---|---|
| "Read" pill (More Case Studies) | spring hover, as in blog-index.md section 6 |
| "Book a call →" (sidebar), "Book Demo →" (waitlist) | no visible hover |
| Sidebar input focus | no visible change measured |
| FAQ item | click toggles (above); no hover change |
| Cards | no hover |

## 9. Motion

- **In-view reveals** (IntersectionObserver, thresholds 0…1, played once). All use the spring **stiffness 210, damping 70, mass 1**:

| Element | Initial | Delay |
|---|---|---|
| Waitlist heading block | opacity 0, `translateY(20px)` | **0.2s** |
| Waitlist form `Variant 1` | opacity 0, y 15 | 0 |
| FAQ label chip | opacity 0, y 15 | 0 (sampled: starts immediately) |
| FAQ `h3` block and accordion container | opacity 0, y 15 | 0 |

- **Inbox mock loop** (component variants, auto-advancing):
  - Every **~1.07s** (sampled cycle points: 578, 1497, 2570, 3496, 4577, 5652, 6722, 7790 ms) the component switches variant.
  - A new message row appears at the top, and every row below slides down from `translateY(-row height ≈ -71…-86px)` to 0.
  - The slide is a tween of 0.4s, `ease: [.44,0,.21,1]` (declared as `U={delay:0,duration:.4,ease:[.44,0,.21,1],type:"tween"}` in the component module).
  - There are 7 variants in the cycle (`framer-v-xsb43x → dv36l2 → jryrwe → ldezhe → nrrist → 1e7lq6y → nie2p → 14v8hfk → xsb43x…`); the full loop is about 7.5s.
  - It runs continuously and isn't paused off-screen.
- Sticky sidebar at `top: 220px`, released at the end of the container.
- Hero stats, testimonial and body have no entrance animation. The nav is static.

## 10. Links (`page_info.json`)

- Internal:
  - nav and footer
  - More Case Studies cards (`./`, a live bug)
- External:
  - "Valley" `https://joinvalley.co/` (`_blank`, from the waitlist component)
  - `beta.joinvalley.co` signup and login
  - Surface demo form
  - `mailto:hey@joinvalley.co`
- The body of the primary sample has no body links. GoCanvas has 3 `#002669` links.

## 11. Fonts

Homepage set, plus:
- Geist Mono Regular (Framer `Lmb0Q1R6W4GsaGVtHGnTyQsZCY.woff2`)
- Geist Mono 400 (Google)
- DM Sans 400
- Inter 600 (`yDtI2UI8XcEg1W2je9XPN3Noo.woff2`)
- Inter 700

Files are in `public/assets/pages/fonts/` and `public/assets/fonts/`.
