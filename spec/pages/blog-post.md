Source: https://www.joinvalley.co/blog/skylead-alternatives-2026

# Blog post template (`/blog/<slug>`)

Measured 2026-09-29 at 1440, 1280, 768 and 390 with headless Chromium (Playwright), cookie banner hidden.

- **Primary sample** (full dumps and screenshots): `/blog/skylead-alternatives-2026`.
- **Rich-text variant samples** (style extraction at 1440, 1280, 768 and 390). These were picked after scanning the SSR HTML of all 481 reachable posts, so together they cover every element type that occurs on the site:
  - `sales-kpi-definition-key-examples`: blockquote, h4 inside ol, strong inside h2/h3, table
  - `silent-killer-of-sales-teams`: in-body h1, h5, ol + ul nesting
  - `claude-code-guide-non-technical-growth-teams`: inline `code`, h4, table, images
  - `linkedin-outreach-for-founders-win-meetings-without-a-sales-team`: Sandpack code blocks, 5-column table
  - `integrate-aisdr-to-sales-teams`: h5, h6

**Content rule.** Article bodies are not recorded anywhere in this spec or its raw files. Dumps show `"[redacted N chars]"` for body text, and screenshots blur the body and the TOC. Build should render placeholder copy inside this template.

Raw material in `spec/pages/blog-post/`:
- `dumps/dump_{1440,1280,768,390}.txt`
- `page_info.json`: links (body links shown as `[body link]`) and images
- `rich/<slug>.json`: per-element-role computed styles, the gap to the previous sibling, and a structural outline per section, at each width, with no text
- `rich/roles_by_width.txt`: role × width summary
- `rich/merged_styles_1440.txt`: all variants merged across the six samples
- `components.css`: live CSS rules matching the template, plus extra rules from the variant samples (lists, blockquote, h4–h6, code, Sandpack)
- `custom-styles.css`: the site's custom table CSS, verbatim
- `states/hover_samples.json`, `states/motion_scroll.json`
- `screens/full_*.jpg`

## 1. Section order and reuse

| # | Section | 1440 y / h | 1280 h | 768 h | 390 h | Reuse |
|---|---|---|---|---|---|---|
| 0 | `Valley navigation` (fixed header) | 0 / 84 | 84 | 68 | 68 | **Homepage nav** |
| 1 | `Blog Title` (post header) | 0 / 816 | 816 | 605 | 703 | New (`PostHeader`) |
| 2 | `Blog Section` (sidebar + article) | 816 / 5194* | 5194* | 5150* | 7007* | New (`PostLayout`, `TocCard`, `SidebarCta`, `AuthorMeta`, `RichText`, `InlineCtaCard`) |
| 3 | `More Blogs` ("Related Blogs") | 6010 / 1285 | 1285 | 2330 | 2330 | New (`RelatedPostCard`, a variant of the blog card; the Read pill is shared) |
| 4 | footer `.vf` | 7295 / 597 | 597 | 643 | 815 | **Homepage footer** |

\* Heights of section 2 depend on article length.

There is no homepage closing CTA and no FAQ on posts. There are no share links, no tags, no category, no comments and no breadcrumbs. The template has no reading-progress bar.

## 2. Post header (`Blog Title`)

- Wrapper: bg **`#e7eff0`**, `padding: 148px 48px 72px` (768 and 390: `124px 20px 48px`).
- Inner `Title Content`: max-width 960, centered (x=240 at 1440, x=160 at 1280). Column, gap 24, align start.
  - `h1`: PPNM Medium 56/62.72 (1.12em), ls -1.68px (-0.03em), w500 `#1c292d`. At 768 and 390: 38/42.56, ls -1.14px.
  - Subtitle `p` (= the post's meta description, stored as `excerpt` in posts.json):
    - Desktop (≥ 810): **Inter** 16/19.2 `#000`, 960 wide.
    - At 768 and 390 the phone variant restyles it: **PPNM Variable 18/27.9 `#4e606a`** (350x112 at 390).
  - `Article landscape cover`: 960x360 (768: 728x220; 390: 350x220), radius 4px, `overflow: clip`.
    - It shows the post cover when one exists; otherwise it shows the same stripe pattern as the index cards (see blog-index.md section 4).
    - The sample shows the pattern. Covers are cropped with object-fit cover.
  - `Article metadata`: a 0-height code component (JSON-LD only; nothing visible).

## 3. Body layout (`Blog Section`)

- Wrapper: bg `#f8f9f7`, `padding: 72px 48px` (768 and 390: `48px 20px`).
- `Blog Container`: max-width 1200, centered. It's 1200 wide at x=120 at 1440, and 1184 wide at x=48 at 1280.
  - Desktop (≥ 810): flex **row**, gap 48, align start.
  - Phone (< 810): flex **column**, gap 32.
- **Left column `Table of content container`**:
  - 1440: 360 wide (30%), 1280: 355.
  - Desktop: `position: sticky; top: 140px`. Phone: full width and **not** sticky, placed above the article.
  - Column, gap 12. It contains two cards:
  1. **TOC card** (`About` > `Frame 2085663199`):
     - Transparent bg, 1px `#d9d9d9` border via `::after` (and a top border on the inner frame).
     - `padding: 20px`, column, gap 10.
     - `h5` "Table of contents": PPNM Medium 20/28 w400 `#000`.
     - One `a[Default]` per article section (3 in the sample). Each is 320 wide, `padding: 8px`, with a `p` in PPNM Medium 14/16.8 w400 `rgba(0,0,0,.5)`.
     - The items are the section h2 texts. They're placeholders in the clone.
  2. **Sidebar CTA** (`CTA`):
     - bg `#f8f8f8`, 1px `#d9d9d9` border, `padding: 16px`, column, gap 24.
     - `h2` "Try Valley": PPNM Medium 28/39.2 w400 `#000`, centered.
     - `p` "Put your outbound workflow to work.": Inter 16/19.2 `#000`.
     - `form`, stacked with gap 0:
       - input box 328x48, `padding: 16px`, 1px `#d9d9d9` border, placeholder "Enter your work email" (PPNM Medium 16/19.2 `#000`)
       - button `Button Content` 132x48: bg `#111111`, 1px `rgba(0,0,0,.2)` inner border, `Text Wrap` `padding: 12px 18px`, label "Book a call →" (PPNM Medium 16/19.2, ls -0.16px, `#fff`)
- **Right column `Blog Content Container`**: max 760 (760 at x=528 at 1440; x=451 at 1280). Column, **gap 42**.
  1. **Author/meta row `Name`**: flex row, gap 10, align center.
     - Avatar 48x48, radius **8px**, cover.
     - `Container` column (gap 4):
       - author first name: **Inter 16/22.4** `#000`
       - `Article Dates` column (gap 2) with two rows (gap 4): "Published:" + `<time>` and "Updated:" + `<time>`, both **DM Sans 12/16.2** `rgba(0,0,0,.55)`
     - Date format is "Sep 21, 2026". Values per post are in posts.json (`authorDisplayed`, `dateDisplayed`, `updatedDisplayed`).
  2. **`Content`**: column, **gap 48**, `padding-bottom: 16px`. Children, in order:
     - `Section 1`, `CTA 1`, `Section 2`, `CTA 2`, `Section 3`, `CTA 3`.
     - In the SSR scan of 481 posts, `CTA 2` and `CTA 3` appear on 428 and `CTA 1` on 404. The clone should render each CTA slot optionally.
     - Each `Section N` has `id="blog-section-1"`, `"blog-section2"`, `"blog-section3"` (these are the TOC targets). It's a column with **gap 24** holding:
       - (a) the section `h2` title in its own text block
       - (b) one Framer rich-text block with the body

## 4. Rich-text body (every element type found across the 481 posts)

Frequency across all 481 posts, from an SSR HTML scan:
- every post: h2, p, img, strong, a
- em 469, ul 309, h3 289, table/figure 246, ol 150, h4 41, blockquote 27, h5 21, h1 (in body) 18, pre (Sandpack) 7, h6 6, inline code 3
- never: hr, iframe, video, embeds, sup, mark, details

Column width is **760** at 1440 and 1280, **728** at 768 and **350** at 390. There's no extra max-width inside it.

Typography by role and width. Colours are computed. "m" is the margin; the site uses `margin-top` on every block after the first (Framer `--framer-paragraph-spacing`), so the **first block in a section has no top margin**.

| Role | 1440 / 1280 | 768 / 390 | Weight, colour, other |
|---|---|---|---|
| Section title `h2` (own block) | PPNM Medium 40/44.8, ls -1.2px | 30/33.6, ls -0.9px | w500 `#1c292d` |
| `h2` inside body | PPNM Medium 34/40.12, ls -0.85px, m-top 20 | 28/33.04, ls -0.7px | w500 `#1c292d` |
| `h1` inside body (rare) | PPNM Medium 40/44.8, ls -1.2px, m-top 20 | 30/33.6 | w500 `#1c292d` |
| `h3` | PPNM Medium 26/31.2, ls -0.52px, m-top 20 | 23/27.6, ls -0.46px | w500 `#1c292d` |
| `h4` | PPNM Medium **42/42**, ls 0, m-top **40** | 32/32 | w400 `#000` (legacy preset) |
| `h5` | PPNM Medium 20/28, m-top 40 | same | w400 `#000` |
| `h6` | PPNM Medium 16/22.4, m-top 40 | same | w400 `#000` |
| `p` | **PPNM Variable 20/31**, m-top 20 | **18/27.9** | w400 `#4e606a` |
| `strong` (in p, li, td) | **Inter** 20/31 w700 | 18/27.9 | `#4e606a` (renders in Inter Bold, not PPNM) |
| `strong` in h2/h3 | PP Neue Montreal **SemiBold** w600 | | `#1c292d` |
| `em` | **Inter** 20/31 italic | 18/27.9 | `#4e606a` (Inter 400 italic face) |
| `a` (in p, li, td) | PPNM Variable, same size | | `#002669`, no underline |
| `a` **hover** | colour → `#000`, underline appears | | Instant: `transition: all 0s`. Sampled change on the first frame |
| inline `code` | **Fragment Mono**, same size as the paragraph | | `#333`, bg `rgba(0,0,0,.1)`, `padding: 2px 4px` (0.1em 0.2em), radius 6px |
| `ul` / `ol` | margin 0, no top margin (the gap after the preceding p is 0) | | li `padding-left: 24.68px` (1.234em); 22.21 at 18px |
| `ul > li` marker | `::before` "•", absolute left 0, same font as p, colour `#4e606a` | | the native `list-style` is none |
| `ol > li` marker | `::before` `counter(list-item) "."`, same font and colour as p | | when the li holds an h4, the marker is 42px PPNM Medium `#000` and li `padding-left: 53.34px` |
| `li > p` | same as p, no margin between li | | |
| `blockquote` | m-top 20, `padding-left: 24px`, `::before` 4px-wide bar full height, bg **`#dddddd`** | | quote p: PPNM Medium 20/40 w400 `#000` |
| `img` (in body) | 720 wide at 1440 (max-width 100%), height auto, no radius; margin-top 0 after p | proportional | follows `p` with no gap |

**Tables** (`figure > table`). These are custom CSS injected site-wide; `custom-styles.css` has it verbatim.

- `figure`:
  - `display: block; width: 100%; overflow-x: auto; margin: 28px 0; padding-bottom: 12px; overscroll-behavior-x: contain; scrollbar-color: #657e89 #e7edeb`
  - `figure::before` is a sticky caption "Compare the details · Scroll across to see every column →": `position: sticky; left: 0; display: block; margin-bottom: 14px; font-size: 13px; line-height: 1.5; color: #53676e` (sans-serif fallback). This caption text is site chrome and is identical on every table.
- `table`:
  - `width: 100%; min-width: 740px; table-layout: fixed; border-collapse: collapse; font-size: 15px; line-height: 1.5`
  - 1px `#e8e8e8` outer border, radius 8px, `overflow: hidden`
  - tables with 5 or more columns get `min-width: 1440px`
  - the figure scrolls horizontally at 390 and 768, and for 5+ columns at every width
- `td`, `th`:
  - `padding: 18px 20px; text-align: left; vertical-align: top; border: 1px solid #d5dedb`
  - `td`: bg `#fbfcf9`, colour `#35494f`
  - `th` **and `tr:first-child > td`**: bg **`#e8eeea`**, colour `#20373b`, w500
  - `:is(td,th) :is(p,a,strong,span)`: `font-size: 15px; line-height: 1.5; letter-spacing: 0`
  - `:is(td,th) p + p`: `margin-top: 8px`
  - `figure:has(table):focus-visible`: `outline: 2px solid #416f91; outline-offset: 5px`
- `p` inside cells: PPNM Variable 15/22.5 `#4e606a`. The p colour overrides the cell colour in practice.
- Samples had 7×4, 9×3, 8×3 and 5×5 tables.

**Code blocks** (Framer CodeBlock = Sandpack/CodeMirror, dark theme):
- Block: 760x270 (short blocks 165 tall). `.sp-layout` has bg **`#161820`**, radius **15px**, `overflow: hidden`.
- `.cm-content` `padding: 30px`. Lines are **Fragment Mono 14/21**, `white-space: pre`, and scroll horizontally.
- Sandpack tokens:
  - surface1 `#161820`, surface2 `#252525`, surface3 `#2f2f2f`
  - plain `#eeeeee`, comment `#666666`, keyword and tag `#00BBFF`, punctuation `#999999`, definition `#ffcc66`, property `#77dddd`, static `#ff8866`, string `#bb88ff`
- Gap before the block (after p) is 0; after the block (before p) it's 20.
- Same width at 390 (350x270).
- There's no copy button and no filename tab.

**Structure of the sampled bodies** (element types only; `×n` means n consecutive):
- skylead-alternatives-2026:
  - S1: h2, p×6, figure>table(7r×4c)
  - CTA 1
  - S2: h2, (h3, p×2)×5
  - CTA 2
  - S3: h2, (h3, p)×4
  - CTA 3
- sales-kpi-definition-key-examples (25,517px long at 1440):
  - S1: h2, p, blockquote, p×2, img, p×4, h2, ul(4 li), h2, p×4, h3, p×2, figure>table(9r×3c), p, h2, img, p×3, (h3, p…)×7
  - S2: long run of h3 / ol(1 li with h4) / p×2
  - S3: h3 / ul(5 li) groups, h2, img, …
- silent-killer-of-sales-teams:
  - S1: p×3, img, p, h1, p, ol(5 li), p, h2, p, [ol(1 li), ul(3–4 li)]×5, p
  - S2: p, ol(5 li), p, ul(5 li), p
  - S3: h5, ol(5 li), h5, p×3
- claude-code-guide…:
  - S1: p×3, img, p×4, figure>table(8r×3c), p, h2, p, ul(4 li), p, h2, p, img, p×2, ul, p, ul, p×2
  - S3 has h4×5 with inline code
- linkedin-outreach-for-founders…: 3 Sandpack blocks, figure>table(5r×5c), many h3 / ul(4 li) / ol(4 li) groups
- integrate-aisdr-to-sales-teams: S2 holds h5 subsections (h5, p×4–13) and an h6

**Inline CTA card (`CTA 1/2/3`, between sections)**:
- 760x311 (768: 728x289–321; 390: 350x289–321).
- `padding: 24px`, a 1px `rgba(0,0,0,.25)` border on the right, bottom and left (no top) via `::after`.
- Background photo: `img`, cover, absolutely filling the card. Each CTA uses a different photo; the URLs are in `page_info.json`, e.g. `BKhwazmhCmOQuEHju5t2RCgyLk0.jpeg`, `ftaOQXeRTkzekiBu3G0v4DZ6PI.jpg`, `IT76Aaq67wchbfaIkDJdbLY4phM.jpg`.
- Glass panel 712x263:
  - bg `rgba(255,255,255,.73)`, **`backdrop-filter: blur(24px)`**, `padding: 24px`, column, gap 24
  - box-shadow `rgba(27,28,29,.02) 0 2px 4px, rgba(27,28,29,.06) 0 6px 10px, rgba(228,229,231,.48) 0 -3px 3px inset`
  - `h2` "Give your sales team<br>an unfair advantage." (template copy, identical in all 3,780 CTA instances): PPNM Medium 28/39.2 w400 `#000`, `white-space: pre`; 20/28 at 768 and 390
  - 251x1 rule, bg `rgba(0,0,0,.45)`
  - `form` (column, gap 12):
    - row of two 327x48 inputs (gap 10): "Enter your first name" and "Enter your work email", `padding: 16px`, 1px `rgba(0,0,0,.25)` border
    - "Book a call →" button, same as the sidebar
  - At 390 the inputs stack.

## 5. Related posts (`More Blogs`)

- bg `#f8f9f7`, `padding: 72px 48px`, column, gap 24, centered.
- `h3` "Related Blogs": PPNM Medium 40/44.8, ls -1.2px w500 `#1c292d`, 960 wide, left-aligned inside a centered 960 box.
- Grid: 2 × 656 with gap 32 (1440), 2 × 576 (1280), 1 column 728 / 350 at phone. There are always 4 cards: the 4 newest posts.
- `Featured Blog` card, 656x520:
  - bg **`#e7eff0`**, 1px `#d9d9d9` border
  - `Image` 306 tall, `padding: 24px`, justify end: image or stripe pattern plus a **`rgba(0,0,0,.23)` overlay**; bottom row has the "FEATURED READ" chip (white Geist Mono 12px) and **"5 min" PPNM Medium 24/33.6 `#fff`**
  - body `padding: 16px`, gap 16, centered vertically
    - `h5` title: **PPNM Medium 32/35.84, ls -0.96px** w500 `#1c292d`
    - "Read" pill
- Live-site quirk: every related-card link has `href="./"`, so it resolves to the homepage. Link to `/blog/<slug>` in the clone.

## 6. Interaction states (rAF-sampled; `states/hover_samples.json`)

| Element | Rest | Hover / focus | Timing |
|---|---|---|---|
| Body link `a` | `#002669`, no underline | `#000` + underline (`text-decoration-line: underline`) | instant |
| TOC link | text `rgba(0,0,0,.5)`, transparent bg | no hover change | — |
| TOC link, active (scroll-spy) | see motion | bg **`#0077b5`**, text `#fff` | tween about 215ms, CSS-ease-like curve |
| "Read" pill (related cards) | see blog-index.md section 6 | same | spring k 500, c 60 |
| "Book a call →" buttons (sidebar and CTA) | `#111111` | no visual change | — |
| Inputs | 1px `#d9d9d9` / `rgba(0,0,0,.25)` border | focus: no visible change measured | Framer input vars declare a focused border of `#000`; see `components.css` `--framer-input-focused-border-color` |
| Table rows | — | no hover | — |
| Related / whole cards | — | no hover | — |

## 7. Motion

- **TOC scroll-spy.** Framer IntersectionObservers with thresholds 0 to 1 at 0.01 steps (rootMargin 0) watch the section blocks. Measured on the sample at 1440, with sections at y=991, 3001 and 4843:

| scrollY | Active TOC item |
|---|---|
| < 540 | none |
| 540 | item 1 |
| 2560 | item 2 |
| 4400 | item 3 |

  - So an item becomes active when its section's top passes about 450px from the top of the viewport. That's half of 900.
  - The swap between items (Default ↔ `Active` variant) animates bg and text colour together. The sample fits CSS `ease` (cubic-bezier(.25,.1,.25,1)) over about 215ms, error 0.0017.
  - Active: bg `#0077b5`, text `#fff`. Default: transparent, `rgba(0,0,0,.5)`.
  - The last item stays active through the related section and footer.
- **Sticky sidebar.** `top: 140px`. It stops at the end of `Blog Container`; sampled top went 140 → 93 → -357 as the container ended.
- **TOC link targets.** The live `href` is `"../"` (a relative link, broken on the live site). The intended behaviour is to scroll to `#blog-section-N`. The clone should use in-page anchors and smooth scroll is optional; the live `html` has `scroll-behavior: auto`.
- No appear or scroll reveals (`[data-framer-appear-id]` count 0, no opacity-0 elements). The nav is static.
- Reduced motion: the TOC tween can be instant.

## 8. Links (primary sample; `page_info.json`)

- Internal:
  - nav and footer (as blog-index.md)
  - TOC items (`../`, see above)
  - 4 related cards (`./`, see above)
  - article body links: 1 in the sample, labelled `[body link]`
- External:
  - in-body CTA links `https://beta.joinvalley.co/signup?utm_source=blog` (2 in the sample)
  - nav and footer `beta.joinvalley.co` login and signup, Surface demo form, `mailto:hey@joinvalley.co`

## 9. Fonts needed beyond the homepage set

Files are in `public/assets/pages/fonts/` (downloaded from the live site):

| Face | File | Used for |
|---|---|---|
| Inter 400 italic | `vFzuJY0c65av44uhEKB6vyjFMg.woff2` (Framer) | `em` |
| Inter 700 | homepage `DXD0Q7LSl7HEvDzucnyLnGBHM.woff2` | `strong` |
| DM Sans 400 | `dmsans-latin-var.woff2` (Google, latin) | dates |
| Geist Mono Regular | `Lmb0Q1R6W4GsaGVtHGnTyQsZCY.woff2` (Framer) | chips |
| PP Neue Montreal SemiBold | homepage `4MKMq3fAUvPlUf3nRWmLMzBRBc.woff2` | `strong` in headings |
| Fragment Mono | **not downloaded** | code. It's a Google font requested by the Sandpack module only on posts with code blocks; use Google Fonts "Fragment Mono" 400 |
