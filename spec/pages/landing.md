Source: https://www.joinvalley.co/tryvalley

# Valley landing pages: clone spec

Routes covered (all on https://www.joinvalley.co):

- `/tryvalley`
- `/linkedin-automation`
- `/linkedin-outreach-for-agencies`
- `/linkedin-lead-generation-for-b2b-saas`
- `/lead-generation-for-software-companies`
- `/lead-generation-for-content-agencies`

Measured on 2026-09-29 with headless Chromium (Playwright 1.63) at 1440x900, 1280x900, 768x1024 and 390x844, with the cookie banner hidden. Values come from `getComputedStyle`/`getBoundingClientRect`, the live CSSOM, and time-sampled probes. The homepage spec (`/Users/riyaghosh/V3/Valley/CLONE_SPEC.md`) is the reference for anything marked **reuse**. Section 12 lists what couldn't be captured.

## 0. Files

All paths are under `/Users/riyaghosh/V3/Valley/spec/pages/landing/`.

| Path | What it is |
|---|---|
| `<slug>.json` (6 files) | Per-page content as data. Every page has `meta`, `sections[]` (the ordered verbatim text, images, links and iframes of every visible section at 1440, keyed by Framer layer name) and `links[]` (every link, labelled `internal`/`external`, with the widths where it is visible). The three template pages also have a structured `template` object; that is what the shared component should render. `linkedin-outreach-for-agencies.json` adds `compareWidget` (19 competitors, 6 category filters and the text of all 19 comparison states). `tryvalley.json` adds `logoCaseStudyPopups`. Image paths are already local (`/assets/...`). |
| `dumps/dump_<slug>_<w>.txt` | Per-element geometry and computed style for every section, at 1440/1280/768/390. Same line format as the homepage dumps (`T <tag> x,y WxH \| font size/lh ls= wWEIGHT #color … \| "text"`). This is the source of truth for any value not repeated here. |
| `screens/full_<slug>_<w>.jpg` | Full-page screenshots, 24 files (6 pages x 4 widths). The HubSpot iframe and the linkedin-automation scroll-reveal section render as blank or black in full-page captures; see section 12. |
| `states/*.png`, `states/probe*.json` | Hover, open and tab states, plus the raw time-sampled motion data. |
| `motion/motion_<slug>_1440.json` | 7 s motion sampling of every section, plus the list of WAAPI/CSS animations and IntersectionObserver targets. |
| `components.css` | **New** code-component CSS only: `.vc*`, the "Valley vs. Competition" widget (253 rules, verbatim, with `@media`/`@container` kept) and its `@keyframes vc-light-pass` / `vc-trace-in`. The `.vsq*` (FAQ), `.vf*` (footer) and `.vpm*` (nav dropdown) rules on these pages are byte-identical to `/spec/components.css`, so they're omitted here. |
| `framer_template.css`, `framer_linkedin-outreach-for-agencies.css`, `framer_tryvalley.css`, `framer_linkedin-automation.css` | The Framer-generated layout CSS per page (de-duplicated CSSOM: breakpoint `@media` blocks, `.hover` variant rules, text-style presets, `@font-face`). Reference only. |
| `ASSETS.md` | Asset list (100 new files downloaded, 57 reused from `public/assets`). |
| `raw/` | Survey JSON, DOM trees, innerText, per-width link lists, network logs, CSSOM JSON, hover-diff JSON, and the asset URL map. |

Asset files: `/Users/riyaghosh/V3/Valley/public/assets/pages/landing/{img,yt,favicons,fonts}/`.

## 1. Template decision

**Partly shared. Three pages use one template exactly; the other three are separate pages built from shared blocks.**

- **Template "SEO landing" (`LandingTemplate`)**: `/linkedin-lead-generation-for-b2b-saas`, `/lead-generation-for-software-companies` and `/lead-generation-for-content-agencies`.
  - Their DOM trees are identical node for node. Only the Framer hash class names differ (for example `framer-bupv1s-container` vs `framer-1cks0py-container`).
  - Their Framer CSS is identical rule for rule once the hashes are renamed (733 rules each), so there's one `framer_template.css`.
  - They differ **only in copy** (listed below) and slightly in section heights, because the copy wraps differently. Images, videos, logos, the case banner, the FAQ and the footer are identical on all three.
  - What changes per page (all in `template` in each JSON):
    - sticky bar: title, subtitle and CTA label ("Book my Demo" vs "Book a Demo")
    - hero: eyebrow, h1 and sub
    - logos heading line
    - problem section: eyebrow, h2, lead, and the 3 cards' title, body and tag
    - comparison: eyebrow, the two heading lines, and the three paths' tag, kicker, title, body, cost label and value, bullets and footer tag
    - demo heading at phone widths
  - Content-agencies has a 3-line h1, which is why its hero is 11px taller (794).
- **`/linkedin-outreach-for-agencies`** is a **variant**. It uses the same shell and five of the template's blocks: logos "Variant 1", video wall, case-study banner, hero proof ticker and FAQ. Its hero is restyled, and four sections are its own: `agencyMargin`, the "Process V2" workflow, `agencyPaths` and `agencyCompare` (the `.vc` code component). It has **no** sticky bar, feature tiles or HubSpot demo section. Build it as its own page composed from the shared blocks.
- **`/tryvalley`** is **unique**: a demo-request contact form, the "Logos + Case Study Popup" grid, "Valley magic", the "Wall of loooooveee" testimonial ticker, the FAQ and the footer.
- **`/linkedin-automation`** is **unique**. It is an older-generation page that shares the logos grid, "Valley magic" and testimonial ticker with `/tryvalley`. Its own sections are an image hero with floating quote cards, feature cards, a 5-step block, a case-study bento, a scroll-driven letter-reveal quote, a product tab viewer and a HubSpot calendar.

### Shared blocks across the six pages (build once)

| Block | Used on | Homepage equivalent |
|---|---|---|
| Nav (`header` "Large Desktop" / "Phone - Close", `.vpm` dropdown) | all 6 | **reuse** homepage `nav` exactly (same component `framer-v-15mpar8`, same links, same rolling-text hover, same mobile menu) |
| Footer (`footer.vf`, layer "Valley multichannel footer") | all 6 | **reuse** homepage `footer` exactly (same `.vf` CSS; heights 597/597/643/815) |
| FAQ (`section.valley-start-questions` with **only** `.vsq-faq`, no `.vsq-offer` pricing panel) | all 6 | **reuse** the homepage `pricing-faq` FAQ half. Same 6 Q&As (`spec/states/faq.json`). Wrapper `padding: 48px` (48px 20px at phone), bg #f8f9f7, height 605 at 1440/1280, 624 at 768, 767 at 390 |
| Dot Blink (5x5 #0077b5 square, 2s opacity loop) | logos on template + agencies | **reuse** homepage Dot Blink (samples match) |
| Closing CTA (`.vcc`) | none | not used on any landing page |
| Logos "Variant 1" (migrated-off grid) | template, agencies | new; its layout is close to the homepage *tablet/phone* logos variant, and the logo files are the same |
| Hero proof ticker (avatars + rotating stat line) | template, agencies | new |
| Video wall (YouTube facade cards) | template, agencies (restyled) | new |
| Case-study banner ("Testimonial Desktop") | template, agencies | new |
| "Logos + Case Study Popup" grid | tryvalley, linkedin-automation (as "Desktop"/"Content") | new |
| "Valley magic" calendar slider | tryvalley, linkedin-automation (desktop only) | new |
| "Wall of loooooveee" testimonial ticker | tryvalley, linkedin-automation | new (not the homepage `wall-of-love`) |
| `cta__primary` 3D button (black or white, 6px drop shadow) | template, tryvalley, linkedin-automation | new |
| "Default" expanding button (hero CTAs) | template, agencies sticky bar | new |

## 2. Global: breakpoints, fonts, colors

- **Breakpoints** are the same Framer ones as the homepage:
  - Desktop ≥1200. The nav is "Large Desktop", 84px tall.
  - Tablet 810–1199. The nav is "Phone - Close", 68px.
  - Phone ≤809. 768 falls in the Phone range.
  - Section variants switch at these same widths: "Desktop" → "Phone", logos "Variant 1" → "Variant 3".
- **Gutters.**
  - Template and agencies: 48px at desktop, 20px at 768/390.
  - The demo section uses 52px at desktop and 16px at phone.
  - tryvalley and linkedin-automation: 48px at desktop.
- **Fonts.** Reuse the homepage font setup. There is **one new font**: **Geist Mono**, used for mono eyebrows, tags and labels (`Tag` text, "Case study date container", "CASE STUDY" labels, sticky-bar footer). Local file `/assets/pages/landing/fonts/GeistMono-latin-variable.woff2`. It is the Google Fonts latin subset: a variable file that Google serves for both 400 and 700, so declare `font-weight: 400 700`.
  - "ValleyCompare" (`.vc`) is an alias of the PP Neue Montreal Variable file (`4U27qiCuAgm6sc2vgHfWPBCGc.woff2`, weight 100 900), exactly like the homepage aliases.
  - `.vc` declares "ValleyCompare, Arial".
  - Most template text is "PP Neue Montreal Medium" (w500 file). Body leads are "PP Neue Montreal Variable" w400.
  - The agencies page switches most headings to **PP Neue Montreal Variable w400** (a lighter look).
  - `Inter` appears only in the agencies path cards and demo note (17/25.5 #52616a) and the tryvalley bullet line.
- **Recurring colors.**
  - Page bg: #f8f9f7 (template and agencies) and #f7f8f4 (tryvalley and linkedin-automation sections).
  - Blue-grey panel: #e7eff0 (template video wall and case banner bg) and #e9eff0 (agencies cards).
  - Dark ink: #1c292d / #19282e. Muted text: #4e606a, #405862, #52616a, #52646a.
  - LinkedIn blue #0077b5 (tag dots and text); #0076b5 for ticker highlights.
  - Amber tag: text #b77541, bg #e7eff0 (or #fff8df on the demo tag).
  - Link navy #002669 (company names in the video wall; hover → #000 and underline).
  - Dark panels: #1c292d (agencies paths header, CTA), #1d2a2e (tryvalley/automation testimonial and calendar sections), #111111 (buttons).

## 3. Template "SEO landing" (b2b-saas, software-companies, content-agencies)

Render all three pages from one component with the `template` object in each JSON. The numbers below come from `/linkedin-lead-generation-for-b2b-saas`; the other two match except where copy length changes a height (see the tables in section 11).

Section ids to use in the build, in DOM/scroll order:

`sticky-bar` (fixed) · `nav` (reuse) · `hero` · `feature-tiles` · `logos-migrated` · `problem` · `video-wall` · `case-banner` · `comparison` · `demo` · `faq` (reuse) · `footer` (reuse)

### 3.1 `sticky-bar` (layer "Bottom Sticky bar 3"; desktop ≥1200 only, `display: none` below)

- **Container.** `section`, `position: fixed; bottom: 0` (top 812 in a 900-tall viewport), full width, 88px tall, `padding: 0 52px`, bg #fff, top border 1px rgba(0,0,0,.07) drawn with `::after`.
- **Row.** Flex, space-between.
  - Left block: column with `gap: 4px`.
    - `h1` = title, PPNM Medium 18/21.6 #000
    - `h2` = subtitle, 16/19.2 rgba(0,0,0,.6)
  - Right: a "Default" button (164x48 at 1440; see 3.13) labelled with `stickyBar.cta.label`, pointing to the Surface demo URL.
- **Hidden sub-layers.** An "Open" panel (opacity 0, 1px tall) and a "Last section" footer strip exist in the DOM. The Open panel has 3 "Features" columns of "LinkedIn profile viewers / Company profile viewers / LinkedIn post engagers" rows, a testimonial and a Jason Hardman avatar. The strip has "PRIVACY POLICY · TERMS OF SERVICES · © 2025 Valley" in Geist Mono 12/12 0.48px.
  - Neither ever became visible, on hover or on scroll (screenshot `states/tpl_stickybar_open.png`). Treat them as dead design layers and don't build them.
- **Behavior (measured).** The bar is a scroll-direction bar.
  - Visible at scrollY 0 on load.
  - As soon as the page scrolls **down** it hides: `transform: translateY(79px); opacity: 0`.
  - When the user scrolls **up** (after about 100ms of upward scrolling) it slides back in to `translateY(0); opacity: 1`.
  - Samples at 16ms steps: translate 79 → 70.9 (209ms after the up-scroll started) → 44.4 (274) → 22.6 (324) → 9.5 (391) → 2.3 (478) → 0 (598). Opacity tracks inversely (0.103, 0.438, 0.714, 0.880, 0.971, 1).
  - The motion itself lasts about 480ms. It matches the WAAPI config Framer registered, `cubic-bezier(0.55, 0, 0.14, 1)` over 500ms.
  - Hiding runs the same curve in reverse.
  - Nothing else about the nav changes on scroll.

### 3.2 `hero` (layer "Hero")

**Container (1440).** `section` with `padding-top: 112px`, bg #f8f9f7, height 783.

**Text-container.** Flex row, `padding: 24px 48px 56px`, `gap: 32px`, `align-items: center`.

**Left column** (742 wide; 651 at 1280): flex column with `gap: 32px`.

- **Tag** (538x30):
  - `padding: 8px 12px`, `gap: 8px`, bg #e7eff0, no radius.
  - A 4x4 dot, #0077b5.
  - `h6` = eyebrow: Geist Mono 14/14, 0.56px, #0077b5, uppercase.
  - Hover: `scale(1.05)`, spring. Measured 1.0088 (63ms), 1.0449 (156), 1.0508 peak (248), settling at 1.05 by about 430ms.
- **h1** = `hero.h1`: PPNM Medium **56/62.72**, **-1.4px**, #1c292d. Framer splits it into one span per word. 2 lines at 1440 (3 on content-agencies).
- **Sub** (`h2` element) = `hero.sub`: PPNM Variable 20/29, #4e606a, 742 wide (4 lines).
- **CTA row** ("cta-wrapper"): flex, `gap: 10px`. Two "Default" buttons, both bg #111, 48 tall, `padding: 12px 18px`, label PPNM Medium 16/22.4 #fff:
  - "Book a Demo   →" (152 wide) → `https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b`
  - "Start for free  →" (142 wide) → `https://beta.joinvalley.co/signup`
  - The labels contain literal runs of spaces before the arrow. Keep them.
- **Proof ticker** ("Tag", 429x25, `padding: 4px 0 1px 6px`, `gap: 8px`, `backdrop-filter: blur(2px)`), at y+72 under the buttons:
  - Three overlapping 20x20 round avatars at x offsets 0/10/22 with opacity .25/.62/1: `proofAvatars`, in that order.
  - Then the rotating line. Visible text: PPNM Medium 16/17.6 rgba(0,0,0,.6), uppercase. Highlighted words are #0076b5 spans. Non-active rows render at 14/15.4.
  - Items are `hero.proofTicker` (5; the 5th repeats the 1st so the loop is seamless).
  - See Motion M2.

**Right column** (570 wide at 1440): column with `gap: 24px`.

- **YouTube facade** (570x532, `article`):
  - Poster `/assets/pages/landing/yt/t9cYsNR2goo-maxresdefault.webp` (object-fit cover), centered 68x48 YouTube play SVG.
  - On click it becomes `https://www.youtube.com/embed/t9cYsNR2goo` (autoplay). This is Framer's YouTube component; hovering swaps the thumbnail layer for the pre-loaded player shell.
- **Caption** `hero.video.caption`: 16/17.6 rgba(0,0,0,.6), uppercase.

**Hidden SEO block.** A `[SEO]Indexing text` block (opacity 0, `translateY(-36px)`, 840x72) repeats a generic "Valley replaces the Clay + HeyReach + ChatGPT stack…" paragraph in 5 sections. It is invisible; render it as visually hidden or omit it.

**768 / 390.**

- `padding-top: 92px`. Text-container becomes a column: `padding: 24px 20px 56px`, `gap: 32px`, centered text.
- Eyebrow 11/11. h1 **38/42.56, -0.95px**, centered. Sub 18/26.1.
- Buttons are full-width stacked 48px bars (`gap: 10px`). Ticker line 12/13.2.
- The video is full-bleed below.
- Measured quirk: at phone the eyebrow tag (437 wide) and the video caption are wider than the viewport and get clipped by the page's horizontal overflow (see `screens/full_*_390.jpg`). Reproduce this with `overflow-x: clip` on the page, or let the text wrap. The clipping is a defect in the original.

### 3.3 `feature-tiles` (layer "Desktop" / phone "Phone")

- **Container (1440).** `padding: 48px`, bg #f8f9f7, height 360. One flex row, `gap: 10px`, of 4 tiles, each 329x264.
- **Tile** ("Call to action container"):
  - `padding: 20px`, flex column, space-between. bg #1c292d, border 1px rgba(0,0,0,.1).
  - Full-bleed bg image `/assets/pages/landing/img/GGiHIlYdU4o4MMMkKUEQbJ1CUvw.png` (a dark grain texture, 2496x662).
  - Decorative "Star Col": a 100px-wide column of five 100x100 Valley asterisk tiles, positioned at the right edge and partly off the tile. Four are dark (`dc5azD2YYmyls1TdpsaWego0N4.png`) and the fourth is the highlighted iridescent one (`ysxcQkBhX6DvdxX0UA6jJSJnSk.png`). Radius 10, object-fit contain.
  - Title `p`: PPNM Medium 24/26.4, -0.48px, #fff, 231 wide.
  - Tag chip at the bottom: `padding: 4px 8px`, bg #34474e, radius 1, border 1px rgba(0,0,0,.1), `backdrop-filter: blur(2px)`. Text Geist Mono 12/12, 0.48px, #fff, uppercase.
  - Content: `featureTiles[]` (identical on all 3 pages).
- **768/390.** Section `padding: 40px 20px`, `gap: 32px`, 934 tall. Tiles stack full width (728 / 350), each 206 tall, `gap: 10px`.

### 3.4 `logos-migrated` (layer "Variant 1"; phone "Variant 3")

- **Container.** `padding: 32px 48px`, column with `gap: 24px`, bg #f8f9f7.
- **Heading** `p`: `logos.heading` (contains a line break), PPNM Medium 20/27 #19282e, centered.
- **"Logo-container"** (`padding-top: 28px`):
  - **Row 1**: 3 blocks, each 448x240 at 1440.
    - Each block is a grid of 2 columns (182px), `gap: 52px 28px`, `padding: 52px 28px 28px`, with #ccc separator borders drawn by `::after`. The outer border is 1px #e0e0e0.
    - A white competitor chip (184x48, `padding: 8px`, bg #fff) straddles each block's top edge: Heyreach / Expandi / Lemlist wordmarks.
    - A "MIGRATED OFF" tag (124x30, bg #fff, Geist Mono 14/14 0.56px #0077b5) sits centered above the middle chip, with an SVG bracket connector ("Vector 1194233990", 927x45) below the grid.
  - **Grid**: 6 columns (191px), `gap: 40px 28px`, `padding: 28px`, 18 logos.
- **Logo cells.** Each logo is wrapped at **opacity .7**, 40px tall, width auto. The ones flagged `dot: true` have a 5x5 Dot Blink 10px to their left.
- **Tooltip.** The Framer CSS has a hover variant (`min-width: 240px`, label `top: -38px`). No tooltip rendered on hover in the probe (see 12).
- **Data.** `logos.competitors`, `logos.groups[3][4]`, `logos.grid[18]`. The alt texts are verbatim, including "UiPath" on the klaar image and "Ridge" on Gallea Ai; the homepage spec notes these same mismatches.
- **768.** Row-1 blocks stack (728x240 each, grid columns 322). Grid becomes 2 columns (324). Section 1844 tall.
- **390.** Blocks 350x240, grid 2x135. Section 1400 tall.

### 3.5 `problem` (layer "Process V2")

- **Container.** `padding: 56px 48px`, bg #f8f9f7, `overflow: clip`. Container is a column with `gap: 40px`.
- **Heading block** (centered, `gap: 20px`):
  - Tag chip: bg #e7eff0, `padding: 8px 12px`, #0077b5 dot, `code` Geist Mono 14/14 0.56px #0077b5.
  - `h2`: PPNM Medium **40/44.8, -1px**, #1c292d.
  - Lead (an `h2` element): PPNM Variable 20/29 #4e606a, 760 max, centered.
- **Card strip** ("Use Cases - Product Page 2"): 1344 wide, bg #fff.
  - Top: a 56px diagonal-hatch image stripe (`cSfuUaRCe6mtjQgGygGXc0Ms.png`, 5312x224).
  - Then 3 cards in a row, 448x479 each. Borders 1px #ccc via `::after` (left, top and bottom; the last card also has the right border).
- **Card** ("Step Card Active"):
  - Top "Frame 1" (`padding: 40px 30px`):
    - Title: PPNM Medium 20/22 #000.
    - Body: 16/17.6 rgba(0,0,0,.6). `gap: 7.45px` between title and body.
    - Tag chip, 19px below: `padding: 6px 12px`, bg rgba(229,229,229,.4), radius 1, border rgba(0,0,0,.1). Text Geist Mono 12/12 0.48px rgba(0,0,0,.6), uppercase.
  - Bottom "Frame 2" (448x274, `overflow: hidden`):
    - A full-bleed watercolor bg image `problem.cards[i].bg`.
    - A 327x238 product screenshot `cards[i].screenshot`, radius 4, offset x+129 / y+44 so it bleeds off the right and bottom.
    - Screenshot shadow: `0 .6px .6px rgba(0,0,0,.02), 0 2.29px 2.29px rgba(0,0,0,.06), 0 10px 10px rgba(0,0,0,.25)`.
  - Card 2's bg image uses `object-position: 49% 20.1%`.
  - The same 3 bg/screenshot images are used on all 3 pages.
- **Motion.** None. The cards register an IntersectionObserver (thresholds 0–0.99) but no transform or opacity change was sampled while scrolling through them in 100px steps.
- **768/390.**
  - Padding 56/20. h2 **30/33.6, -0.75px**. Lead 18/26.1.
  - Cards stack full width (728x462 at 768, 350x497–514 at 390), `gap: 48px` in the column.
  - The hatch stripe is hidden (it has the `hidden-` class at phone).

### 3.6 `video-wall` (layer "Why sales teams love valley")

- **Container.** `padding: 56px 48px`, bg **#e7eff0**. Inner column with `gap: 64px`.
- **Heading** (`gap: 28px`):
  - Tag: amber dot #b77541 and `p` Geist Mono 14/14 0.56px #b77541, on bg #e7eff0.
  - `h2`: PPNM Medium 40/44.8 -1px #1c292d, centered, 760 max.
- **Row of 4 "Video Container" cards.** Each is 329 wide (705–722 tall), `gap: 10px`, bg #fff, `overflow: hidden`, column with `gap: 4px`.
  - YouTube facade 329x586: poster from `yt/`, 68x48 play button.
  - "Heading" block (`padding: 16px`):
    - A `strong` company link: 14/16.8 w700 **#002669**, pointing to `companyHref` (a `/casestudies/...` path). Hover: color #000 and underline, instant.
    - Then the quote: PPNM Medium 14/16.8 rgba(0,0,0,.6).
  - Data: `videoWall.cards[]`. The company label includes the trailing colon verbatim ("Growth Protocol:", "Tacnode:", "ThinkFish" with the colon outside the link, "Bolt.new").
- **Motion.** Appear on scroll, M3.
- **768/390.** `padding: 56px 20px`, h2 30/33.6. Cards stack full width: 728x1401 at 768 (poster very tall), 350x744 at 390, `gap: 10px`.

### 3.7 `case-banner` (layer "Case Studies v2"; phone "Testimonial Mobile")

- **Container.** `padding: 56px 48px`, bg #e7eff0.
- **Card** "Testimonial Desktop" (1344x367):
  - `padding: 32px`, flex row, `align-items: flex-end`, `gap: 21px`, bg #f6f6f6 under the full-bleed grain image `GGiHIlYdU4o4MMMkKUEQbJ1CUvw.png` (dark), border 1px rgba(0,0,0,.1).
  - Left "Call to action text container" (586 wide, column with `gap: 28px`):
    - Quote: PPNM Medium 24/26.4 #fff.
    - Author row (`gap: 11px`): 40px round avatar, "Sam Momin" 16/17.6 #fff, and the role 12/13.2 rgba(255,255,255,.7).
    - Two chips (182x51, `padding: 10px 12px`, bg rgba(255,255,255,.12), radius 4, border rgba(0,0,0,.1), `backdrop-filter: blur(8px)`). Text 12/15.6, 0.12px, rgba(255,255,255,.74), `text-transform: capitalize`.
  - Right: two "Star Col" columns (200 wide, five 200x200 asterisk tiles each, `gap: 10px`) at x 936 and 1151. They are vertically offset (the first starts 300px lower), overflow the card and are clipped.
  - Top-right: `cta__primary` "Book a demo →" (3.13) → Surface URL.
- **Hover** (on the whole card): the two star columns slide in opposite directions. Column 1 goes from +455px to 0 (upward); column 2 from -304 to 0. Framer spring: 50% of the distance in about 150ms, 90% in about 450ms, settled by about 1.2s. Samples are in `states/probe_…json` → `csHover`. Screenshots: `states/tpl_casestudy_rest.png`, `tpl_casestudy_hover.png`. Mouse-leave reverses it.
- **768/390.** Card 728/350 x 659, content stacked, the chips become one text span, and the CTA sits at the bottom-left.

### 3.8 `comparison` (layer "Comparative Analysis" → "Compare Table 2")

- **Container.** `padding: 56px 48px`, bg #f8f9f7, column with `gap: 40px`.
- **Heading** (760 wide, `gap: 28px`): amber tag, then two `p` lines of PPNM Medium 40/44.8 -1px #1c292d, centered (`comparison.headingLines`).
- **Row of 3 cards**, each 441 wide, `gap: 10px`, `align-items: center`.
  - Cards 1–2 ("Variant 1"): 563 tall, bg #f8f9f7, radius 2, border 1px #d9d9d9, `padding: 28px`, column with `gap: 24px`.
  - Card 3 ("Variant 2", `highlight: true`): 661 tall, bg **#e8efef**, and adds a CTA.
- **Card contents, in order:**
  1. Tag chip (`padding: 8px 10px`, bg #f8f9f7): PPNM Variable 12/15.6, 0.56px, #315e8d.
  2. Kicker: PPNM Medium 16/21.6 #405862.
  3. Title: 24/27.6 #19282e.
  4. Body: 18/25.2 #405862.
  5. Cost box: `padding: 14px 16px`, bg #f8f9f7, radius 4, border rgba(0,0,0,.1), `backdrop-filter: blur(8px)`. Label 15/20.25, 0.15px, #405862, capitalize. Value 36/39.6 #19282e.
  6. 3 bullets: each is a 4x4 #666 dot and 18/25.2 #405862 text, `gap: 10px`.
  7. Footer tag (`padding: 8px 12px`, bg #f8f9f7, radius 1–2): PPNM Variable 12/16.2 0.48px #405862, uppercase, centered.
  8. Card 3 only: a "Default" button "Book a demo   →" (150x46, bg **#000**) → Surface URL.
- **768/390.** Cards stack full width (728 / 350), 30/33.6 heading.

### 3.9 `demo` (layer "Desktop" / "Phone", HubSpot booking)

- **Container.** `padding: 80px 52px 120px`, height 1505. Background: a full-size layer tiled with `url(/assets/pages/landing/img/ceUkuYsnQN6G6F5pnloZWV1iU.png)`, a 136x148 dot-grid tile.
- **Inner container:** `padding: 40px`, column with `gap: 80px`.
- **Heading:**
  - Tag: bg **#fff8df**, amber dot and text, Geist Mono 14/14.
  - Two `p` lines: PPNM Medium **56/67.2, -1.12px, #000**, centered.
- **Embed.** `iframe` 845x893 → `https://meetings.hubspot.com/zayd-from-valley/tryvalley`. It is third-party and renders blank in headless capture. For the clone, embed the same URL or show a placeholder box of the same size.
- **768/390.** `padding: 60px 16px`. Tag 10/10. Heading 27/32.4, -0.54px. The phone copy is **different**: "The Only Way Outbound should…" (see `sections[]` in each JSON, section "Phone"). Iframe 736x853 / 358x853.

### 3.10 `faq`, 3.11 `footer`, `nav`

**Reuse** the homepage components (section 1 table).

### 3.12 Section order at phone

`hero` → `feature-tiles` → `logos-migrated` → `problem` → `video-wall` → `case-banner` → `comparison` → `demo` → `faq` → `footer`. There is no sticky bar at phone.

### 3.13 Buttons used by the template

- **"Default" (hero, sticky bar, comparison card 3).**
  - Rest: `a`, bg #111 (#000 on the comparison card), 48 tall (46 on the comparison card), `padding: 12px 18px`, `overflow: hidden`. The label is duplicated: a second copy sits 42px below, hidden by overflow.
  - A "Back" layer holds an image (`x4WGqv5aU1EbJsAAySHvFBp9HaY.webp`, `object-position: 33.4% 14.3%`) that isn't visible at rest.
  - Hover (measured at 40ms): the button **widens from 152 to 240px** (165 → 197 → 225 → 236 → 240 by about 400ms, spring with no overshoot on width). At the same time the visible label scales and moves up out of the box (translateY 43 → 0 relative to a new position 50px higher). The result is an **empty dark 240px bar** while hovered (`states/tpl_btn_hover.png`).
  - Mouse-leave shrinks it back over about 400ms (240 → 219 → 182 → 158 → 152).
  - This is exactly what the original does. Reproduce it with a width spring (framer-motion `{type:"spring", bounce:0, duration:0.4}` is close), and move the label copy.
- **`cta__primary` (case banner).** A 132x48 `a` with `padding-top: 5px`. Its "Button Content" (132x43) is bg #111, border 1px rgba(0,0,0,.2), `box-shadow: 0 6px 0 rgba(0,0,0,.6)`. Label PPNM Medium 16/19.2, -0.16px, #fff.
  - Hover "press" (measured): the shadow alpha falls .6 → .404 (83ms) → .09 (166) → 0 (248). At the same time the content box moves down about 5px and briefly scales Y to .898, then springs back to 1.0 by about 450ms. Result: the button looks pushed down, with no shadow.

## 4. `/linkedin-outreach-for-agencies` (variant page)

Section ids in order:

`nav` (reuse) · `agency-hero` · `logos-migrated` (reuse 3.4) · `agency-margin` · `agency-workflow` · `video-wall` (restyled, 4.4) · `case-banner` (reuse 3.7; section `padding: 64px 48px`, bg #f8f9f7 instead of #e7eff0) · `agency-paths` · `agency-compare` (`.vc`) · `faq` (reuse) · `footer` (reuse).

There is no sticky bar, no feature tiles and no demo iframe. The content is in `linkedin-outreach-for-agencies.json` (`sections[]` + `compareWidget`).

### 4.1 `agency-hero` (layer "Hero")

- **Container.** `padding: 144px 48px 64px`, bg #f8f9f7, height 658. Row with `gap: 48px`, centered.
- **Left column** (624 wide, `gap: 24px`):
  - Eyebrow row: 4x4 #0077b5 dot and `p` PPNM Variable 12/18 #557885, uppercase.
  - h1 "Keep the margin. Keep the client." (two lines): PPNM Variable **64/71.68, w400**, #1c292d.
  - Sub: PPNM Variable 20/30 #52646a.
  - CTA `a` "agencyDemo":
    - "Book a demo ↗", 151x56, `padding: 16px 24px`, bg #1c292d, label PPNM Variable 16/24 #f8f9f7 → Surface URL.
    - Hover: no change was measured (no hover variant).
  - The same proof ticker as the template (avatars + rotating line).
- **Right** (672x368, `padding: 24px`):
  - A watercolor image fills the box (`5PTRAJLnFg6rsWb9IKzPm6tagrQ.png`, 1536x768).
  - Inset in it, a 624x320 YouTube facade (poster t9cYsNR2goo).
- **768/390.**
  - `padding: 144px 24px 64px`, stacked. h1 40/44.8. Sub 18/27.
  - Heights: 949 (768) and 1048 (390).

### 4.2 `agency-margin` (layer "agencyMargin")

- **Container.** `padding: 80px 48px`, column with `gap: 36px`, bg #f8f9f7.
- **Heading:**
  - Eyebrow 12/18 #557885.
  - h2: PPNM Variable **48/55.2 w400** #1c292d.
  - Lead: 20/30 #52646a.
- **Grid** "marginGrid": 3 columns of 432, `gap: 24px`.
- **Card:** `padding: 28px`, bg **#e9eff0**, column with `gap: 20px`.
  - Label ("01 / SETUP"): 12/18 #557885.
  - h3: 28/32.2 #1c292d.
  - Body: 18/27 #52646a.
  - "Answer" block: `padding-top: 20px`, top border 1px #cbd6d8. Contains "WITH VALLEY" (12/18 #557885) and a line in 18/27 #1c292d.
- **390.** `padding: 48px 20px`. h2 34/39.1. Cards stack (350x481, `padding: 24px`).

### 4.3 `agency-workflow` (layer "Process V2", agency version)

- **Container.** `padding: 80px 48px`, bg **#e9eff0**.
- **Heading** (left-aligned): #315e8d dot, eyebrow, h2 48/53.76 w400, lead 20/30 (820 max).
- **Grid** "agencyWorkflow": 3 columns of 432, `gap: 24px`.
- **Step card:** bg #f8f9f7.
  - A 432x180 cover image:
    - step 1 `5PTRAJLnFg6rsWb9IKzPm6tagrQ.png`
    - step 2 `zPOKyZnbl77fH6unSixkvRUOSOs.png`
    - step 3 `5WP0tI1lICNwC23waJVfpSCTTpE.png`
  - Content (`padding: 28px`, `gap: 16px`): "01" 12/18 #557885, h3 26/29.12, body 18/27 #52646a.
- **390.** `padding: 80px 24px`. h2 34/38.08. One column (342x560 cards).

### 4.4 `video-wall` (agency restyle)

- **Container.** `padding: 80px 48px`, bg #f8f9f7.
- **Heading** is left-aligned: #315e8d dot, eyebrow `p` PPNM Variable 12/15.6 0.56px #315e8d, h2 **"The proof is in your clients’ pipeline."** 48/53.76 w400.
- **Grid** of 4 columns (318), `gap: 24px`.
- **Card:** bg **#e9eff0**, border 1px #d6dede. Poster 318x567. Text 16/23.2 #405862. Company `strong` 16/23.2 w700 #002669.
- Same videos, quotes and links as the template; the quotes use curly apostrophes here.
- **Appear motion:** M3.

### 4.5 `agency-paths` (layer "agencyPaths")

- **Container.** `padding: 64px 48px`.
- **"pathsHeader"** (1344x329, `padding: 40px`):
  - Full-bleed image `5PTRAJLnFg6rsWb9IKzPm6tagrQ.png`.
  - Dark panel (850 wide, `padding: 32px`, `gap: 20px`, bg #1c292d):
    - Eyebrow 12/18 #b9cfdb.
    - h2 42/48.3 w400 #f8f9f7.
    - Lead 20/30 #c3d0d4.
- **"pathsGrid"**: 3 columns, `padding: 1px`, `gap: 1px`, bg #cbd6d8 (this draws hairline dividers).
  - Cards: `padding: 28px`, `gap: 16px`, bg #fff (card 3 is #e9eff0).
    - Label 13/19.5 #52616a.
    - h3 PPNM Medium 28/32.2.
    - Line 20/26 #1c292d.
    - Body Inter 17/25.5 #52616a.
    - "YOUR TEAM OWNS" 13/19.5 0.52px.
    - Body Inter 17/25.5 #52616a.
- **"agencyBudget"** (`padding: 32px`, bg #e9eff0):
  - Title 26/31.2 PPNM Medium.
  - Body Inter 17/25.5.
  - `a` "agencyCTA" "Book a demo →": 150x47, `padding: 14px 22px`, bg #111, 16/19.2 #fff → Surface URL.
- **"agencyDemoNote"** (`padding: 24px 0`): "See Valley for agencies." 32/36.8, then Inter 16/19.2 #000.
- **Phone (768/390).** The path cards collapse to **56px tall and clip their content**: only the "PATH 0x / …" label shows (`states` screenshot `screens/full_linkedin-outreach-for-agencies_390.jpg` around y 11,400). This is the original's behavior; copy it or fix it deliberately.

### 4.6 `agency-compare` (`.vc` code component, "Valley vs. Competition")

- **Wrapper** `padding: 64px 48px`. `section.vc` is 1344 wide, bg #f7f9f7.
- **Full CSS** is in `components.css`. That CSS plus this section is enough to rebuild it. It is probably the same widget as on `/compare`, so check the `/compare` spec if one exists.
- **`header.vc-intro`** (`padding: 36px 48px 32px`, row, `align-items: end`):
  - Kicker "Valley vs. Competition": 14/21, 1.82px, uppercase, #52616a.
  - h2 "The whole workflow. A clearer choice.": 46/47.38, -2.53px, #1c292e, 355 max.
  - p: 18/27 #58685e, 300 max.
- **`.vc-picker`** (`padding: 0 48px 26px`, bottom border #d5ddd1):
  - "Compare Valley with" (17/25.5 w500).
  - Search `input` "Find a competitor" (190x48, bg #fcfcf8, border 1px #cbd4c5, `padding: 10px 12px`, 16/24 #344d40).
  - Category `select` (190x48), options: All competitors, LinkedIn & sequencing, AI outbound platforms, Email & infrastructure, Data & automation, Revenue platforms.
  - Company chips `button.vc-company` (46 tall, `padding: 10px 13px`, `gap: 8px`, 20x20 favicon, 16/24):
    - Default: border 1px #d3dace, text #4e5e52, favicon `filter: grayscale(1); opacity: .8`.
    - Hover: bg #eaf0e5, border #718778.
    - Selected: bg #233f33, border #233f33, text #f7faee, full-color favicon.
  - 10 chips show at first. The "All 19 competitors" button reveals all 19 (list in JSON).
- **`.vc-main`** (`padding: 32px 48px 26px`):
  - Heading "Valley vs. HeyReach" (32/35.2, -1.12px; "vs." is #788578), category line, and "Read the full comparison ↗" → `/blog/valley-vs-<name>` (one URL per competitor, all 19 in the JSON).
  - Title "Start with the signal. Follow it to the reply." (22/33, -0.44px) and a caption.
  - Track key:
    - Valley "Upper track" swatch: `DzF7ltBGreQELkgImDCaxxldqH0.jpg` texture, 35x12.
    - Rival "Lower track" swatch: #d3d9cf.
    - Channel badges "Email / LinkedIn" with "✓ Built in", "↗ Other tool" or "◐ Partial coverage".
  - A 1248x452 SVG track diagram: 7 stages, each with ✓ / ◐ / — per competitor.
  - Legend.
  - Collapsed `details.vc-criteria` "What each stage means · 7 steps in the workflow". It opens to a 3-column grid of 7 white cards (400 wide, `padding: 20px`, border #d5dfe0); the texts are in `sections[]`.
- **`.vc-close`:**
  - h3 "Compare the work. Then decide." 29/33.35.
  - Links "Valley vs. Competition ↗" → `/compare` and `a.vc-cta` "See Valley in action ↗" (bg #1c292e, hover bg #3e5c43) → Surface.
- **States.** Selecting a chip swaps `.vc-main`. The per-competitor text for all 19 is in `compareWidget.states`. Screenshots: `states/ag_vc_all19.png`, `ag_vc_main.png`, `ag_vc_criteria_open.png`.
- **Motion.**
  - `@keyframes vc-light-pass` 11s infinite: a light sweep on the Valley track.
  - `vc-trace-in` 0.8s, run once when the trace is (re)drawn after a selection.
  - Both keyframes are in `components.css`.
- **390.** The widget reflows via `@container`:
  - Intro `padding: 36px 20px 32px`, h2 39/40.17.
  - The picker controls stack.
  - `.vc-main` becomes a vertical list of stage rows ("What counts / Built in / Requires another tool", 16/22.4 #2d5637 and #394c56).
  - Heights: 4561 (390) and 3166 (768).

## 5. `/tryvalley` (unique)

Section ids in order:

`nav` (reuse; on this page it's a normal-flow block at the top, not an overlay) · `contact` · `logo-cases` · spacer 48 · `valley-magic` (desktop only) · spacer 48 · `wall-ticker` · spacer 48 · `faq` (reuse) · `footer` (reuse).

Spacers are 48px tall at desktop and 24px at phone, bg #f7f8f4. Content is in `tryvalley.json`.

### 5.1 `contact` (layer "Contact Form")

- **Container.** `padding: 64px 48px`, bg **#f7f8f4**, a row of two 672-wide columns.
- **Left panel** (`padding: 32px`, `gap: 28px`, bg #e9eff0):
  - "See Valley in action.": PPNM Medium **44/48.4, -1.54px**, #1c292d.
  - "Talk to Zayd and Alex about your team’s outbound workflow.": PPNM Variable 18/26.1 #52616a.
  - Two check rows (16x16 check-circle SVG and text): "Demo of the Valley platform" (PPNM Medium 16/22.4) and "Find the right setup for your team" (Inter 16/19.2).
  - Quote (16/22.4 #000), then a 20px avatar (`iwEx5TIcTfi3RasDvugTZhlD7I.jpeg`) with "Jason Hardman, Founding Enterprise Account Executive" (14/19.6 #52616a).
- **Right "Form"** (`padding: 32px`, bg #fff, border 1px #d5ddde):
  - `form.surface-form-handler` (column, `gap: 20px`).
  - Two inputs, each 608x48 with `padding: 12px` and border 1px #cbd6da: "Full Name" and "Your Work Email" (16/19.2 #1c292e).
  - Button "Book a demo" (608x48, bg #111, 16/19.2 #fff).
  - The form posts to Surface; hidden inputs carry the Surface form fields. For the clone, validate and link to the Surface URL.
- **768/390.** Stacked. Heights 612 and 686.

### 5.2 `logo-cases` (layer "Logos + Case Study Popup")

- **Container.** `padding: 64px 0` inside the 48px gutter, a top/bottom border rgba(0,0,0,.07), bg #f7f8f4.
- **Heading:** "150+ teams trust Valley because we keep their calendars full of high quality prospects", PPNM Medium 18/22.5 #575757, centered.
- **Logos:** two flex rows (`gap: 24px`), plus a centered "Gather Voices" logo between them.
  - Each logo is 120–147 wide by 40–49 tall.
  - Logos with a case study show a "CASE STUDY" label under them: `padding: 6px`, bg #d9eeff, radius 4.5, Geist Mono 12/14.4 **w700** #0077b5, uppercase.
- **Hover on a case-study logo:** a 165x191 popup card appears above the logo (`states/try_logo_hover.png`). It contains the company logo, a "↗", the title "How Tacnode booked 25+ meetings per month with Valley" (~14px) and a Geist Mono "ICP: …" line. All 8 texts are in `tryvalley.json` → `logoCaseStudyPopups`.
- **Links:** logos link to the **customer's own site** (external: tacnode.io, 10xmanagement.com, growthprotocol.ai, gocanvas.com, franq.com.br, darwinian.com, kaster.app, ggwp.com).
- **Motion:** appear on scroll (M3).
- **390:** 1029 tall, logos wrap.

### 5.3 `valley-magic` (layer "Valley magic Section" → "50% Magic"; ≥1200 only)

- **Container:** 1344x709, bg #000, border rgba(0,0,0,.07).
- **Left "Cont 1"** (566 wide, `padding: 72px 60px`, space-between):
  - White outlined label "VALLEY MAGIC" (Geist Mono 12/14.4, 1px #fff border).
  - "See how Valley fills your calendar": PPNM Medium 40/48 w400 #fff.
  - "Outreach sent with valley" (18/22.5 rgba(255,255,255,.5)).
  - The **slider**: a 446px track with a 1px #767676 line, an orange gradient fill image (`cyqCnH73kdkUeeoIFSQCM01Qcs.png`), 4 step dots (8x8, radius 2, the first #ffc391) and a 48px knob (a white 31x29 tile with the Valley asterisk, inside a glow).
  - A note (14/16.8 rgba(255,255,255,.7)).
  - A white `cta__primary` "Start for free" → signup.
- **Right "Cont 2"** (779 wide, bg #fafafa, `padding: 24px 18px`): a July 2025 calendar.
  - "July" 28/35 #252525 with "2025" at .7 alpha.
  - Two 24px #252525 arrow squares.
  - A 7-column grid (106px columns, `gap: 8px 0`) of day cells (89x107).
  - Each cell: a day number (11/13.75 #252525, .5 for out-of-month days) and up to 3 event labels (85x20, `padding: 4px`, 11/13.2 #000). Label colors: #bde9ff blue, #fccece pink, #ffe8a4/#ffe495 yellow. Each label has a watercolor overlay image (`Dm2wyGw…`, `rkdfi8F…`, `44mBuaK…`).
  - Every label has a matching "hider" (bg #fafafa) that covers it until revealed.
- **Motion:** M5. The slider auto-steps and reveals meetings.
- **Hover** on the slider: the fill scales slightly (Framer hover variant).
- **Below 1200:** hidden.

### 5.4 `wall-ticker` (layer "Testimonial Section")

- **Container.** bg **#1d2a2e**, `padding: 64px 48px`, centered.
  - Outlined label "REAL MESSAGES, REAL FEEDBACK" (Geist Mono 12/14.4, 1px #fff border).
  - h3 "Wall of loooooveee" (PPNM Medium 42/50.4 w400 #fff).
- **Marquee:** a `ul`, row with `gap: 32px`, cards repeated.
- **Card:** 317x398, `padding: 6px`, bg rgba(255,255,255,.5); inner white.
  - Logo area (`padding: 18px`, logo image 178x61 contain).
  - Quote (PPNM Medium 16/20.8 #000, centered, `padding: 0 36px`).
  - Round avatar, name (14px) and role (12/14.4).
- **Motion:** M4 (continuous leftward scroll, 70 px/s).
- Content (company, quote, person and role for each card) is in `sections[]` in the JSON. The tryvalley and linkedin-automation tickers use different card sets.

## 6. `/linkedin-automation` (unique, older design)

Section ids in order:

`nav` (reuse, normal flow) · `la-hero` · `logo-cases` (same component as 5.2, heading "300+ teams trust Valley’s LinkedIn automation because we keep their calendars full of high quality prospects") · `la-features` · `la-steps` · `la-case-studies` · `la-quote-reveal` · `la-product-tabs` · spacer · `valley-magic` (5.3) · spacer · `la-calendar` · spacer · `wall-ticker` (5.4) · spacer · `faq` (reuse) · `footer` (reuse).

Content is in `linkedin-automation.json`.

- **`la-hero`** ("Variant 1", 1440x828):
  - Full-bleed sky/watercolor image `y9E8JCzvNWid9P6Sv5ODRz6mcHo.png`.
  - Centered stack:
    - Outlined Geist Mono label "THE QUALITY-FIRST ALTERNATIVE TO HEYREACH, EXPANDI & LINKEDHELPER" (12/14.4 #000).
    - h1 "AI **LinkedIn** Automation that Books You More Sales Calls." PPNM Medium 52/55.64 w400 #000; "LinkedIn" is #0077b5.
    - Sub: 16/20 #3d3d3d, 750 wide.
    - `cta__primary` buttons: "Book Demo →" (black) → Surface, and "Try Valley Now" (white) → signup.
  - Four floating "Fade Card Stack" quote bubbles (200x116: a quote in 14/16.8, a 29px avatar and a company logo) sit at the left and right edges. They cross-fade between quotes: opacity 0.001 → 1 over 400ms `cubic-bezier(.44,0,.56,1)`, with outgoing cards fading over about 900ms.
  - Hover on a bubble: `filter: blur(2px)` on the others and a slight lift.
- **`la-features`** ("Feature Section"):
  - bg #f7f8f4, `padding: 64px 48px`.
  - Label "END TO END LINKEDIN AUTOMATION".
  - h2 "Finally, a LinkedIn Automation tool that" + h3 "delivers" (42/50.4; "delivers" is #223b85 and underlined).
  - 4 cards (323x356, bg #fff, radius 3, border #d1d1d1): h6 20/24 title ("Zero complex integrations", "Talks like you", "Keeps account safe", "One person powerhouse") above an illustration.
- **`la-steps`** ("Variant 3", 810 tall):
  - Left: label "TIMING, RELEVANCE AND RESEARCH", h3 "A top 1% rep working 24/7 on LinkedIn" (42/46.2 w400), then 5 rows. Each row is "STEP n:" in Geist Mono 14/21 plus text in PPNM Medium 18/21.6, separated by 1px rgba(0,0,0,.4) lines. Then a `cta__primary` "Book Demo →".
  - Right: a blue watercolor panel with a Valley flow diagram (LINKEDIN / WEBSITE / SALES / LEADS → Valley → a message card with "Send", and the caption "THIS IS A REAL MESSAGE BY VALLEY").
- **`la-case-studies`** ("Case Study Section"):
  - Label "CUSTOMER STORIES", h3 "300+ Teams trust Valley with LinkedIn Automation" (40/44).
  - A bento of 5 `a` cards (**href `./`**, verbatim; they link to the home page):
    - Card bg #f2f2f2. Title h6 24/28.8. Black Geist Mono company tag. Person name and role (14/16.8).
    - The 10x card adds stat boxes ("8-10x More website intent signals", "$84K+ ARR from a single customer"; bg #f8f8f8, border #e9e9e9).
    - The Franq card adds a quote.
    - The GGWP card is an image card.
  - Hover on a card: bg → #000, title → #fff, tag inverts.
  - A `cta__primary` "Book Demo →" sits below.
- **`la-quote-reveal`** (unnamed, 4140 tall, bg #000):
  - A sticky 100vh (900) stage (`position: sticky; top: 0`) with bg image `D2Y8s7ddqFfxnp0I3xAHYq2wyB4.png` (orange/pink blur) and an 800x800 blurred (100px) circle glow.
  - The quote "There has been a lot of talk surrounding what works in outbound now. The answer is Valley. Full Stop. Valley is the next generation of outbound." is split into **119 letter spans** (PPNM Medium 40/36).
  - Under it: "JEFF BECKER" (20px, 2px tracking, w700) and "[EX - HEAD OF SALES, LINKEDIN]" (18px, 1px tracking, .9 alpha).
  - Scroll-driven, see M6.
  - At phone the section is 4710 (768) / 3882 (390) tall.
- **`la-product-tabs`** ("Process Section"):
  - Label "DAYS TO GET RESULTS, NOT MONTHS", h3 "End to End LinkedIn Automation - No GTM Engineer needed" (40/44).
  - A 1344x989 white panel with a 5-tab bar (56 tall, 1px rgba(0,0,0,.05) dividers): **Dashboard, Warm Leads, Campaigns, Approvals, Inbox**. Each tab has an icon and 16/22.4 text; inactive tabs are .6 opacity; the active tab has a 2px dark underline.
  - Below the tabs, a watercolor frame holds a product screenshot.
  - **Click only; no autoplay** (sampled for 9s).
  - Screenshots of each tab: `states/la_tab_*.png`.
  - At phone the tab viewer is hidden (543 / 578 tall).
- **`la-calendar`** ("Calendar Section"): bg #1d2a2e, h3 "The only way outbound should be done on LinkedIn" (42/50.4 #fff), and the HubSpot meetings iframe (blank in capture).

## 7. Motion (all measured)

| # | What | Where | Trigger | Spec |
|---|---|---|---|---|
| M1 | Sticky bar hide/show | template | scroll direction | Hides on any downward scroll and shows after upward scroll: `translateY(79px)` + opacity 0 ↔ none/1. About 500ms `cubic-bezier(.55,0,.14,1)`; samples in 3.1. Visible at load (scrollY 0). |
| M2 | Hero proof ticker | template, agencies | autoplay loop | Every **~2.03s** (samples at 405ms, 2444ms and 4479ms), the stack of 5 rows shifts up one row (about 25px). The active row fades in and the outgoing row fades out: opacity animations 460ms linear with a 50ms delay. Row transforms use a Framer layout spring (overshoot about 0.7px, settled in about 500ms, e.g. offset 22.9 → 4.1 → -0.68 → -0.28 → 0 at 100ms steps). The container width tweens to the new text width (356 → 376 → 380 → 375). After the 5th row (a duplicate of the 1st) it snaps back to the start. |
| M3 | Appear on scroll | video-wall cards (template, agencies); logo-cases and valley-magic contents (tryvalley, automation) | IntersectionObserver (thresholds 0–0.99), once | From `translateY(15px); opacity: 0` (video cards) or `translateY(20px); opacity: 0` (tryvalley/automation blocks) to none/1. Samples for the video cards: 316ms 14.22/.052 · 504ms 8.06/.463 · 723ms 4.08/.728 · 1005ms 1.68/.888 · 1224ms 0.85/.943, settling at about 1.5s. That is a long ease-out (Framer spring; `cubic-bezier(.16,1,.3,1)` over ~1.4s is a close match). All 4 cards animate together, with no stagger. |
| M4 | Testimonial marquee | tryvalley, automation | always | WAAPI `translateX(0 → -4188px)` over 59,829ms (tryvalley) and `0 → -4886px` over 69,800ms (automation): linear, infinite, **70 px/s** leftward. Cards are duplicated for a seamless loop. |
| M5 | Valley magic slider | tryvalley, automation (desktop) | autoplay loop, once in view | The knob steps through 4 stops (x = 179 → 298 → 418 → 519 at 1440, i.e. 0 / ⅓ / ⅔ / full of the 446px track). One step every **~1.52s**. Each move takes about 600ms (spring, e.g. 200 → 234 → 259 → 279 → 289 → 295 → 298). At the last stop it holds about 0.8s, then springs back to the start (about 700ms), so the full cycle is ~6.07s. The fill width follows the knob. Revealed calendar labels at each stop: 2 → 17 → 41 → 67. Each reveal fades that cell's "hider" opacity 1 → 0 over **500ms `cubic-bezier(.64,.02,.31,1.01)`**. "Label Stack" heights spring between 42 and 64. On reset, all hiders fade back in. |
| M6 | Letter-by-letter quote reveal | automation `la-quote-reveal` | scroll (sticky, 4140px tall; the stage pins for 3240px) | Let `p = (scrollY − sectionTop) / 3240`. Unrevealed letters are `color: rgba(255,255,255,.4); opacity: .7`. Letter *i* of 119 turns `#fff` when `p ≥ i/119`. Its opacity is then about `1 − 0.3·(p − i/119)`, clamped to ≥ .7 (the first letter measured .993 at p≈.03, .90 at .34, .76 at .81, .70 at 1). So the letters just revealed are brightest and older ones dim back to .7. The author lines stay at opacity 1 and the glow circle stays static. |
| M7 | Tag hover scale | template and agencies hero eyebrow tag | hover | `scale(1 → 1.05)`, spring, peak 1.0508 at ~250ms, settled at ~430ms |
| M8 | "Default" button hover | template | hover | Width 152 → 240 plus label swap (3.13), about 400ms spring |
| M9 | `cta__primary` press | template, tryvalley, automation | hover | Shadow `0 6px 0 rgba(0,0,0,.6)` → alpha 0 over ~250ms, content drops ~5px with a brief scaleY .9 squash, springs back by ~450ms. On tryvalley/automation the wrapping "Hole" also scales 1.02 with `0 10px 10px rgba(0,0,0,.2)`, and "Default" scales 1.05 on hover. |
| M10 | Case-banner star columns | template, agencies | hover on the banner | Columns slide ±300–455px to 0 (spring, ~1.2s settle), reversed on leave |
| M11 | Dot Blink | logos | always | Same as the homepage (2s opacity loop) |
| M12 | `.vc` light pass and trace | agencies | always / on selection | `vc-light-pass` 11s infinite; `vc-trace-in` 0.8s once |
| M13 | Floating quote bubbles | automation hero | autoplay | Opacity cross-fade: 400ms in with `cubic-bezier(.44,0,.56,1)`, outgoing about 900ms |
| M14 | Nav | all | – | Same as the homepage (rolling-text link hover, mobile menu spring). No hide-on-scroll: the nav transform stayed identity at every scroll position sampled. |

There is no parallax, and no Lottie or `<video>` autoplay (the videos are click-to-play YouTube embeds). The feature tiles, problem cards, comparison cards, agency cards and FAQ have no load or scroll motion.

`prefers-reduced-motion` was not tested separately. The `.vc` CSS contains `@media (prefers-reduced-motion: reduce)` rules (see `components.css`); the Framer-driven effects have no reduced-motion override in the CSS.

## 8. Interaction states (summary)

| Element | Hover | Other |
|---|---|---|
| Nav, dropdown, footer links, FAQ `details` | reuse homepage | reuse homepage |
| Hero eyebrow tag | scale 1.05 (M7) | – |
| "Default" buttons | widen + label swap (M8) | – |
| `cta__primary` / `cta__secondary` | press (M9) | – |
| Agency `agencyDemo` / `agencyCTA` | no measured change | – |
| Video-wall company link | #002669 → #000 + underline, instant | – |
| YouTube facade | play-button layer swaps to the player shell | click → iframe `youtube.com/embed/<id>?autoplay=1` |
| Case banner | star columns slide (M10) | – |
| tryvalley/automation case-study logo | popup card above the logo | click → customer site |
| Automation case cards | bg #f2f2f2 → #000, text → #fff | href `./` |
| Automation product tabs | – | click switches the screenshot; active tab has full opacity and an underline |
| `.vc-company` | bg #eaf0e5, border #718778 | selected: bg #233f33, text #f7faee |
| `.vc-cta` | bg #1c292e → #3e5c43 | – |
| `details.vc-criteria` | – | opens a 7-card grid |
| Sticky bar | none | scroll-direction show/hide (M1) |

## 9. Links

Every link on each page is in `<slug>.json` → `links[]`, labelled `internal` (www.joinvalley.co) or `external` (any other domain), with its label and the widths where it is visible.

- **Internal, already known:**
  - `/`, `/product`, `/playbooks`, `/compare`, `/casestudies`, `/linkedin-outreach-for-agencies`, `/pricing`, `/blog`, `/blog/archive`, `/about`, `/privacy-policy`, `/terms-of-service`.
- **Internal, new on these pages:**
  - Case studies:
    - `/casestudies/how-growth-protocol-generated-150k-pipeline-in-4-months-with-valley`
    - `/casestudies/how-tacnode-booked-25-meetings-per-month-with-valley`
    - `/casestudies/how-thinkfish-books-380-400-meetings-monthly-with-valley`
    - `/casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days`
    - `/casestudies/how-penthara-generated-10x-roi-with-valley-in-their-first-90-days` (a DOM-only link on the b2b-saas and software pages: sticky-bar Open panel, never visible)
  - 19 comparison articles from `.vc`, one per competitor. They are exactly: `/blog/valley-vs-heyreach-ai-powered-personalization-vs-multi-account-volume`, `/blog/valley-vs-gojiberry`, `/blog/valley-vs-amplemarket`, `/blog/valley-vs-lemlist`, `/blog/valley-vs-instantly`, `/blog/artisan-vs-valley-which-ai-sdr-platform-actually-books-meetings`, `/blog/valley-vs-11x`, `/blog/valley-vs-expandi-which-linkedin-outreach-tool-is-right-for-your-team`, `/blog/valley-vs-clay`, `/blog/valley-vs-phantombuster`, `/blog/valley-vs-aisdr`, `/blog/valley-vs-apollo`, `/blog/valley-vs-dripify-which-linkedin-outreach-tool-actually-converts-in-2026`, `/blog/valley-vs-linkedhelper`, `/blog/valley-vs-outreach`, `/blog/valley-vs-regie`, `/blog/valley-vs-reply`, `/blog/valley-vs-salesloft`, `/blog/valley-vs-smartlead`.
- **External:**
  - `https://beta.joinvalley.co/signup` and `/login`.
  - `https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b`, the demo popup, used by every "Book a demo" CTA.
  - `https://meetings.hubspot.com/zayd-from-valley/tryvalley`, an iframe.
  - YouTube embeds.
  - `mailto:hey@joinvalley.co`.
  - Customer sites from the logo grids: tacnode.io, 10xmanagement.com, growthprotocol.ai, gocanvas.com, franq.com.br, darwinian.com, kaster.app, ggwp.com, brevitypitch.com, aminochain.io, wayside.io, credal.ai, antler.co, bolt.new, and gathervoices.co (with a long Google Ads query string, verbatim).

## 10. Assets

See `ASSETS.md`: **100 new files** in `public/assets/pages/landing/` (75 images including 4 og:images, 5 YouTube posters, 19 competitor favicons, 1 font) and **57 files reused** from `public/assets/` (logos, fonts, avatars). Every `<slug>.json` already points at local paths.

## 11. Section maps (measured heights)

For the phone section lists, the first column follows 1440 order; where a page's phone structure differs, the full list at that width follows the table.

#### `/linkedin-lead-generation-for-b2b-saas` (document height: 1440: 8014, 1280: 7962, 768: 16483, 390: 14483)

| # | Framer layer at 1440 (at 390 if different) | 1440 y / h | 1280 h | 768 h | 390 h |
|---|---|---|---|---|---|
| 1 | Hero | 0 / 783 | 783 | 912 | 1090 |
| 2 | Desktop (Phone) | 783 / 360 | 360 | 934 | 934 |
| 3 | Variant 1 (Variant 3) | 1143 / 760 | 736 | 1844 | 1400 |
| 4 | Process V2 | 1903 / 918 | 936 | 1757 | 2018 |
| 5 | Why sales teams love valley | 2821 / 1046 | 975 | 5900 | 3306 |
| 6 | Case Studies v2 | 3867 / 479 | 479 | 771 | 771 |
| 7 | Comparative Analysis | 4346 / 961 | 986 | 1972 | 2257 |
| 8 | Desktop (Phone) | 5307 / 1505 | 1505 | 1125 | 1125 |
| 9 | FAQs- V3 2 | 6812 / 605 | 605 | 624 | 767 |
| 10 | Desktop (Phone) | 7417 / 597 | 597 | 643 | 815 |

#### `/lead-generation-for-software-companies` (document height: 1440: 8056, 1280: 7962, 768: 16536, 390: 14586)

| # | Framer layer at 1440 (at 390 if different) | 1440 y / h | 1280 h | 768 h | 390 h |
|---|---|---|---|---|---|
| 1 | Hero | 0 / 783 | 783 | 912 | 1090 |
| 2 | Desktop (Phone) | 783 / 360 | 360 | 934 | 934 |
| 3 | Variant 1 (Variant 3) | 1143 / 760 | 736 | 1844 | 1400 |
| 4 | Process V2 | 1903 / 936 | 936 | 1785 | 2115 |
| 5 | Why sales teams love valley | 2838 / 1046 | 975 | 5900 | 3306 |
| 6 | Case Studies v2 | 3884 / 479 | 479 | 771 | 771 |
| 7 | Comparative Analysis | 4363 / 986 | 986 | 1998 | 2263 |
| 8 | Desktop (Phone) | 5350 / 1505 | 1505 | 1125 | 1125 |
| 9 | FAQs- V3 2 | 6855 / 605 | 605 | 624 | 767 |
| 10 | Desktop (Phone) | 7460 / 597 | 597 | 643 | 815 |

#### `/lead-generation-for-content-agencies` (document height: 1440: 8042, 1280: 7947, 768: 16628, 390: 14466)

| # | Framer layer at 1440 (at 390 if different) | 1440 y / h | 1280 h | 768 h | 390 h |
|---|---|---|---|---|---|
| 1 | Hero | 0 / 794 | 794 | 1007 | 1168 |
| 2 | Desktop (Phone) | 794 / 360 | 360 | 934 | 934 |
| 3 | Variant 1 (Variant 3) | 1154 / 760 | 736 | 1844 | 1400 |
| 4 | Process V2 | 1914 / 936 | 936 | 1757 | 2018 |
| 5 | Why sales teams love valley | 2849 / 1046 | 975 | 5900 | 3306 |
| 6 | Case Studies v2 | 3895 / 479 | 479 | 771 | 771 |
| 7 | Comparative Analysis | 4374 / 961 | 961 | 2023 | 2162 |
| 8 | Desktop (Phone) | 5335 / 1505 | 1505 | 1125 | 1125 |
| 9 | FAQs- V3 2 | 6841 / 605 | 605 | 624 | 767 |
| 10 | Desktop (Phone) | 7446 / 597 | 597 | 643 | 815 |

#### `/linkedin-outreach-for-agencies` (document height: 1440: 8799, 1280: 8781, 768: 17960, 390: 18246)

| # | Framer layer at 1440 (at 390 if different) | 1440 y / h | 1280 h | 768 h | 390 h |
|---|---|---|---|---|---|
| 1 | Hero | 0 / 658 | 688 | 949 | 1048 |
| 2 | Variant 1 (Variant 3) | 658 / 760 | 736 | 1844 | 1400 |
| 3 | agencyMargin | 1418 / 919 | 946 | 1408 | 2012 |
| 4 | Process V2 | 2337 / 932 | 959 | 1706 | 2209 |
| 5 | Why sales teams love valley | 3269 / 1089 | 1041 | 6013 | 3504 |
| 6 | Case Studies v2 | 4358 / 495 | 495 | 755 | 755 |
| 7 | agencyPaths | 4853 / 1131 | 1157 | 853 | 1176 |
| 8 | agencyCompare | 5984 / 1613 | 1557 | 3166 | 4561 |
| 9 | FAQs- V3 2 | 7597 / 605 | 605 | 624 | 767 |
| 10 | Desktop (Phone) | 8202 / 597 | 597 | 643 | 815 |

#### `/tryvalley` (document height: 1440: 3820, 1280: 3979, 768: 3318, 390: 4119)

| # | Framer layer at 1440 (at 390 if different) | 1440 y / h | 1280 h | 768 h | 390 h |
|---|---|---|---|---|---|
| 1 | Contact Form | 84 / 481 | 481 | see list below | see list below |
| 2 | Logos + Case Study Popup | 565 / 498 | 657 | see list below | see list below |
| 3 | Spacer | 1063 / 48 | 48 | see list below | see list below |
| 4 | Valley magic Section | 1111 / 709 | 709 | see list below | see list below |
| 5 | Spacer | 1820 / 48 | 48 | see list below | see list below |
| 6 | Testimonial Section | 1868 / 703 | 703 | see list below | see list below |
| 7 | Spacer | 2571 / 48 | 48 | see list below | see list below |
| 8 | Heading + Desc FAQ | 2619 / 605 | 605 | see list below | see list below |
| 9 | Desktop | 3224 / 597 | 597 | see list below | see list below |

At 768 the section list is: Contact Form 612, Logos + Case Study Popup 617, Spacer 24, Spacer 24, Testimonial Section 683, Spacer 24, Heading + Desc FAQ 624, Phone 643.

At 390 the section list is: Contact Form 686, Logos + Case Study Popup 1029, Spacer 24, Spacer 24, Testimonial Section 683, Spacer 24, Heading + Desc FAQ 767, Phone 815.

#### `/linkedin-automation` (document height: 1440: 13342, 1280: 13342, 768: 14711, 390: 14679)

| # | Framer layer at 1440 (at 390 if different) | 1440 y / h | 1280 h | 768 h | 390 h |
|---|---|---|---|---|---|
| 1 | Variant 1 | 84 / 828 | 828 | see list below | see list below |
| 2 | Desktop | 912 / 480 | 480 | see list below | see list below |
| 3 | Feature Section | 1392 / 626 | 626 | see list below | see list below |
| 4 | Variant 3 | 2017 / 810 | 810 | see list below | see list below |
| 5 | Case Study Section | 2827 / 1074 | 1074 | see list below | see list below |
| 6 |  | 3902 / 4140 | 4140 | see list below | see list below |
| 7 | Process Section | 8042 / 1244 | 1244 | see list below | see list below |
| 8 | Spacer | 9286 / 48 | 48 | see list below | see list below |
| 9 | Valley magic Section | 9334 / 709 | 709 | see list below | see list below |
| 10 | Spacer | 10043 / 48 | 48 | see list below | see list below |
| 11 | Calendar Section | 10091 / 1216 | 1216 | see list below | see list below |
| 12 | Spacer | 11308 / 48 | 48 | see list below | see list below |
| 13 | Testimonial Section | 11356 / 737 | 737 | see list below | see list below |
| 14 | Spacer | 12092 / 48 | 48 | see list below | see list below |
| 15 | FAQ Section | 12140 / 605 | 605 | see list below | see list below |
| 16 | Desktop | 12745 / 597 | 597 | see list below | see list below |

At 768 the section list is: Variant 3 723, Content 945, Feature Section 1725, Variant 5 1115, Case Study Section 1828,  4710, Process Section 543, Spacer 24, Spacer 24, Calendar Section 1054, Spacer 24, Testimonial Section 661, FAQ Section 624, Phone 643.

At 390 the section list is: Variant 3 723, Content 966, Feature Section 1764, Variant 5 1258, Case Study Section 1995,  3882, Process Section 578, Spacer 24, Spacer 24, Calendar Section 1131, Spacer 24, Testimonial Section 661, FAQ Section 767, Phone 815.

## 12. Could not capture / notes for Build

1. **HubSpot meetings iframe** (template `demo`, automation `la-calendar`). It is third-party and renders blank in headless Chromium, so no styles were captured. Embed the URL or use a same-size placeholder.
2. **YouTube players**: only the facades (posters and play buttons) were measured. The players are third-party.
3. **Surface demo popup and form submission** (`forms.withsurface.com`): third-party, not recreated.
4. **Full-page screenshots.** The linkedin-automation letter-reveal section and the HubSpot areas render black or blank in `screens/full_*` because of sticky layout and iframes. Use `states/la_letters_mid.png` for the reveal.
5. **Framer springs** were sampled, not read from config (except the sticky-bar WAAPI `cubic-bezier(.55,0,.14,1)` 500ms, the hider `cubic-bezier(.64,.02,.31,1.01)` 500ms, and the bubble fade `cubic-bezier(.44,0,.56,1)` 400ms, which came from `document.getAnimations()`). The curves in section 7 are the measured samples; framer-motion springs with `bounce ≈ 0.2, duration ≈ 0.4–0.6` reproduce them.
6. **Logos "Variant 1" hover tooltip.** The Framer CSS declares a hover variant (a label at `top: -38px`), but no tooltip text rendered on hover in the probe. The homepage-style testimonial tooltips were not found on these logos.
7. **Sticky-bar "Open" panel and footer strip**: present in the DOM but never shown by hover or scroll. Treated as dead layers.
8. **Phone overflow defects in the original.** The template hero eyebrow and caption overflow at phone widths, and the agency path cards clip to 56px at phone. They are captured as-is.
9. **Intermediate widths** (810–1199 tablet): not sampled. At 1024 the layout uses the Framer tablet breakpoint (same "Phone"-style variants for most sections, per the CSS in `framer_*.css`).
10. **`prefers-reduced-motion`**: not tested live.
11. **`.vc` SVG track diagram geometry**: captured by screenshot and text only (per-competitor ✓/◐/— statuses are in `compareWidget.states[].text`). The SVG paths are generated by the component at runtime from its data. Its CSS is complete in `components.css`.
