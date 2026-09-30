Source: https://www.joinvalley.co/

# Valley home page: clone spec

Measured from the live site on 2026-09-29 with headless Chromium (Playwright 1.63). Viewports: 1440x900, 1280x900, 1024x900 (tablet), 768x1024 and 390x844 (phone, DPR 1 and 2). Values come from `getComputedStyle` and `getBoundingClientRect`, the live CSSOM, and the site's own component JS modules. Nothing here is eyeballed. Anything that couldn't be measured is listed in section 20.

## 0. How to use this spec

- This file is the human-readable spec. The raw measurements it's built from are next to it in `/Users/riyaghosh/V3/Valley/spec/`:
  - `spec/components.css`: the verbatim CSS of every Valley code component (about 1,800 rules, with `@media`, `@container` and `@supports` wrappers kept). **Treat this as the source of truth for the fine detail inside the hero visual, the showcase app mockups, the calculator and so on.** Build can port these rules almost directly into CSS modules or `@layer components` (Tailwind v3 alone is not a good fit for them).
  - `spec/dumps/dump_{1440,1280,1024,768,390}.txt`: per-element box geometry (page coordinates `x,y WxH`), padding, flex/grid, typography, colors, borders, radii, shadows, transforms, pseudo-elements and transitions for every section at each width.
  - `spec/states/*.txt`: the same per-element dump for every tab or slide state (hero 5 scenes, stories 4 slides, showcase 6 tabs, integrations 3 tabs, team-fit 3 tabs), plus `faq.json` (Q&A text) and `logo_tooltips.json` (hover quote cards).
  - `spec/texts_1440.txt`: full verbatim `innerText` per section plus every link's `href`.
  - `spec/screens/*.jpg`: full-page screenshots per width and screenshots of every tab state (for visual confirmation only).
- Dump line format: `T <tag> x,y WxH | font size/line-height ls=letter-spacing wWEIGHT #color ... | "text"`. `B` is a box and `IMG`/`SVG` are media. `#rrggbb/0.5` means that color at 50% alpha. `::after{...}` is the pseudo-element's box and paint.
- Assets live in `/Users/riyaghosh/V3/Valley/public/assets/` and are mapped in `/Users/riyaghosh/V3/Valley/ASSET_MANIFEST.md`.

## 1. Platform and libraries

- The site is built in **Framer** (`<meta name="generator" content="Framer a56d1fd">`, site id `3k6OJ57RGyNET7iJc2x5n1`). It is not Webflow.
- Framer layers (nav, hero copy and buttons, the logo wall) animate with Framer's bundled **framer-motion** (`motion.BfuEmyvq.mjs`). These are only hover variants, the mobile-menu variant change, the logo tooltip and the dot-blink loop.
- Most sections are **custom React code components** that ship their own `<style>` blocks. Their motion is plain **CSS keyframes and transitions** plus a **requestAnimationFrame** loop, **scroll listeners** and **IntersectionObserver**. One case uses the Web Animations API (the showcase tab progress).
- The site does **not** use GSAP, ScrollTrigger, Lenis or any other smooth-scroll library. `html` has `scroll-behavior: auto`, so native scrolling is used.
- There are no Framer "appear" effects on the live page (`[data-framer-appear-id]` count is 0) and no generic scroll-reveal fade-ins. Content is visible immediately. The only scroll-driven effects are the two pinned sections (endorsement and jobs) and the step-nav highlight.
- Every component respects `prefers-reduced-motion: reduce`: autoplay and pinning are disabled and keyframes are turned off. The clone should do the same.

## 2. Breakpoints

Framer breakpoints come from its generated CSS:

| Name | Range | Nav variant | Hero variant | Logo section variant |
|---|---|---|---|---|
| Desktop | >= 1200px | `Large Desktop` (84px tall, inline links) | `Variant 1 - Desktop` (2 columns) | `Website Desktop` |
| Tablet | 810 to 1199.98px | `Phone - Close` (68px, hamburger) | `Variant 1 - Tablet` (stacked) | `Website Tablet` |
| Phone | <= 809.98px | `Phone - Close` / `Phone Open` | `Variant 1 - Phone` (stacked) | `Website Phone` |

- 768 is in the **Phone** range. 1280 and 1440 are both Desktop.
- The code components use `container-type: inline-size` and respond to **their own width** through `@container` queries. The thresholds are 1280, 1100, 1000, 900/900.01, 850, 760, 720, 620, 600/601, 560, 400 and 380. The copies of these rules are in `spec/components.css`.
- A few components also use `@media (max-width: 720px | 400px | 700px | 540px)`.

## 3. Page skeleton, container and gutters

- `body` background is `#ffffff`. Framer injects `:root body { background: rgb(255,255,255) }`, but every section paints its own background, so white is never seen.
- The page is one vertical stack of full-width sections. There is **no max-width container**: content spans the viewport minus the side gutters. Some components cap inner widths themselves, for example `.ve-content` max 1100px, `.vcc-scene` max 1360px and `.vgs-header` about 890px.
- The nav wrapper is `position: fixed; top: 0` across the full width. The page does not reserve space for it. Instead the hero has a large top padding (140px desktop, 124px tablet, 112px phone).

Side gutters by width (the section paddings measured at each width):

| Width | Framer sections (hero, logos, stories wrapper, jobs wrapper, showcase, team-fit, pricing) | `vgs` sections (steps, integrations, wall-of-love) | endorsement content | footer |
|---|---|---|---|---|
| 1440 / 1280 | 48px | 48px | 170px (centered max-width 1100) / 90px | 48px |
| 1024 | 28px | 48px | 48px | 48px |
| 768 | 20px | 48px | 28px | 28px |
| 390 | 20px | 24px | 20px | 24px |

### Section map (page y and height in px, measured)

| # | id | Framer layer name / component root | 1440 y / h | 1280 h | 1024 h | 768 h | 390 h |
|---|---|---|---|---|---|---|---|
| - | `nav` | `header[data-framer-name="Large Desktop"]`, fixed | 0 / 84 | 84 | 68 | 68 | 68 |
| 1 | `hero` | `Variant 1 - Desktop` (+ `.valley-hero-visual`, `.valley-hero-proof`) | 0 / 924 | 924 | 1426 | 1340 | 1483 |
| 2 | `logos` | `Website Desktop` | 924 / 658 | 621 | 953 | 2306 | 1546 |
| 3 | `stories` | `Customer results — rotating stories` (+ `.valley-customer-results`) | 1582 / 682 | 682 | 673 | 731 | 1112 |
| 4 | `endorsement` | `Jeff Becker — perspective on Valley` (`.valley-endorsement`, pinned) | 2264 / 2610 | 2610 | 2610 | 2970 | 473 (not pinned) |
| 5 | `steps` | `Paste your website - choose a play - launch` (`.vgs`, walkthrough) | 4874 / 2349 | 2337 | 3253 | 3358 | 3608 |
| 6 | `jobs` | `Your entire outbound team` (`.vstack`, pinned) | 7223 / 2846 | 2846 | 2846 | 1804 (not pinned) | 1886 (not pinned) |
| 7 | `showcase` | `Explore Valley — six product views` (`.valley-showcase`), DOM id `explore-valley` | 10069 / 1167 | 1167 | 1121 | 1155 | 1530 |
| 8 | `integrations` | `Claude ChatGPT CRM API and MCP` (`.vgs`, integrations) | 11237 / 997 | 947 | 987 | 1090 | 1579 |
| 9 | `team-fit` | `Who Valley is built for` (`.valley-team-fit`) | 12233 / 697 | 660 | 667 | 592 | 886 |
| 10 | `wall-of-love` | `Wall of love - original customer voices` (`.vgs`, love) | 12930 / 1435 | 1479 | 1885 | 2096 | 2899 |
| 11 | `pricing-faq` | `Start with Valley` (`.valley-start-questions`: `.vsq-offer` + `.vsq-faq`) | 14365 / 1206 | 1206 | 1190 | 1193 | 1739 |
| 12 | `closing-cta` | `Closure CTA` (`.vcc`) | 15571 / 766 | 751 | 727 | 705 | 831 |
| 13 | `footer` | `Desktop` (`footer.vf`) | 16337 / 597 | 597 | 597 | 643 | 815 |

Total document height: 16,934px at 1440, 16,828 at 1280, 18,935 at 1024, 19,982 at 768 and 20,387 at 390.

Two extra layers that are not sections:
- `backdrop`: a `position: fixed; z-index: -1` 100vw x 100vh image (`img/RnDHaOXCu7muvvTJnxKF3Ld6Xzs.png`, object-fit cover). Every section is opaque, so it is never visible, and it's absent at phone. It can be skipped.
- `cookie-banner`: Framer's consent component, shown bottom-left on first visit (see section 18). It's optional for a study clone.

## 4. Fonts

### Font files (all in `public/assets/fonts/`)

| File | Real face | Declared family names on the site | Weight |
|---|---|---|---|
| `6uIfYl8bnz9kOy3KOuV7PxhFPhA.woff2` | PP Neue Montreal **Medium** (static) | `PP Neue Montreal Medium` | 500 (also registered with no weight, so it matches any) |
| `4U27qiCuAgm6sc2vgHfWPBCGc.woff2` | PP Neue Montreal **Variable** | `PP Neue Montreal Variable` (declared weight 400), `Valley Proof Montreal`, `Valley Hero Montreal`, `Valley Results Montreal`, `Valley Body Montreal`, `Valley Showcase Montreal`, `Valley Team Montreal`, `ValleyStack`, `ValleyFooter` (all declared `font-weight: 100 900`) | 100 to 900 |
| `vQyevYAyHtARFwPqUzQGpnDs.woff2` | Inter Regular, latin subset (Framer-hosted) | `Inter` | 400 |
| `DXD0Q7LSl7HEvDzucnyLnGBHM.woff2` | Inter Bold, latin subset (Framer-hosted) | `Inter` | 700 |
| `4MKMq3fAUvPlUf3nRWmLMzBRBc.woff2` | PP Neue Montreal SemiBold | `PP Neue Montreal SemiBold` | declared on the site but never used (status "unloaded"). Optional. |

### Critical rendering quirk (verified)

Several components (`vgs` = steps/integrations/wall-of-love, `vcc`, `vpm`, `.valley-endorsement` root) specify `font-family: "PP Neue Montreal", Inter, Arial, sans-serif`. **No `@font-face` named plain "PP Neue Montreal" exists**, so that text renders in **Inter**. Framer only registers static Inter **400 and 700** faces. That means text declared as `font-weight: 500` renders with the **Inter 400** face: I measured identical widths for 400 and 500, and there's no synthetic bold. The headlines in those sections therefore look Regular, not Medium.

To match pixel-for-pixel, alias "PP Neue Montreal" to Inter and load **only the 400 and 700 static Inter files**. Don't use the Google Inter variable font, or 500 will render as true Medium.

Recommended `@font-face` set for the build:

```css
@font-face { font-family: "PP Neue Montreal Medium"; src: url("/assets/fonts/6uIfYl8bnz9kOy3KOuV7PxhFPhA.woff2") format("woff2"); font-display: swap; }
@font-face { font-family: "PP Neue Montreal Variable"; src: url("/assets/fonts/4U27qiCuAgm6sc2vgHfWPBCGc.woff2") format("woff2"); font-weight: 100 900; font-display: swap; }
/* Site aliases, all pointing at the variable file with weight 100 900:
   Valley Proof Montreal, Valley Hero Montreal, Valley Results Montreal, Valley Body Montreal,
   Valley Showcase Montreal, Valley Team Montreal, ValleyStack, ValleyFooter */
@font-face { font-family: "PP Neue Montreal"; src: url("/assets/fonts/vQyevYAyHtARFwPqUzQGpnDs.woff2") format("woff2"); font-weight: 100 600; font-display: swap; } /* = Inter 400 */
@font-face { font-family: "PP Neue Montreal"; src: url("/assets/fonts/DXD0Q7LSl7HEvDzucnyLnGBHM.woff2") format("woff2"); font-weight: 700 900; font-display: swap; } /* = Inter 700 */
@font-face { font-family: "Inter"; src: url("/assets/fonts/vQyevYAyHtARFwPqUzQGpnDs.woff2") format("woff2"); font-weight: 400; }
@font-face { font-family: "Inter"; src: url("/assets/fonts/DXD0Q7LSl7HEvDzucnyLnGBHM.woff2") format("woff2"); font-weight: 700; }
```

Framer's metric-matched fallbacks, if wanted: `PP Neue Montreal Medium Placeholder` = local Arial with ascent 98.07%, descent 24.77%, line-gap 0, size-adjust 97.68%. `PP Neue Montreal Variable Placeholder` = local Arial with ascent 105.13%, descent 26.56%, size-adjust 91.13%.

Other font files the page loads but that aren't used by visible home-page text: Google `DM Sans`, `Inter Tight`, `Work Sans` and `Fragment Mono` CSS, `Geist Mono`, and a Supabase-hosted `ppneuemontreal-medium.otf` plus `GeistMono_Variable` inside the Surface form iframe. None of them are needed.

### Which family renders where

| Area | font-family (as declared) | Renders as |
|---|---|---|
| nav links, hero copy, hero buttons, logos heading, logo tooltips, stories heading | `"PP Neue Montreal Medium"` | PP Neue Montreal Medium |
| stories sub-paragraph | `"PP Neue Montreal Variable"` 400 | PP NM Variable |
| hero proof quote | `'Valley Proof Montreal'` | PP NM Variable |
| hero visual | `"Valley Hero Montreal"` | PP NM Variable |
| stories carousel | `"Valley Results Montreal"` | PP NM Variable |
| endorsement quote | `"Valley Body Montreal"` | PP NM Variable |
| steps / integrations / wall-of-love (`vgs`), closing CTA (`vcc`), nav Product dropdown (`vpm`) | `"PP Neue Montreal", Inter, Arial` | **Inter 400/700** (see quirk above) |
| jobs | `ValleyStack` | PP NM Variable |
| showcase | `"Valley Showcase Montreal"` | PP NM Variable |
| team fit | `"Valley Team Montreal"` | PP NM Variable |
| pricing / FAQ | `"Valley Body Montreal"` | PP NM Variable |
| footer | `ValleyFooter` | PP NM Variable |

## 5. Color tokens (computed)

Framer tokens on `body`: `#fff`, `#ffffff80`, `#ffffff40`, `#000`, `#ffffff0d`, `#00000080`, `#f8f8f8`, `#00000040`, `#0000000d`, `#d9d9d9`, `#ffffffb3`, and `#0077b5` (LinkedIn blue, used for the dot blink).

Measured palette, grouped (hex as computed):

- **Page and surface backgrounds:** `#f8f9f7` (Framer sections, nav, logo cells, stories card) · `#f7f9f7` (`vgs` sections, `vcc` section) · `#ffffff` (cards, wall-of-love figures, FAQ panel, integration panel) · `#e8eff0` (pricing offer panel) · `#e8efef` (team-fit panel) · `#eaf0ec` (integration hub) · `#fcfdf7` (steps "window" card) · `#f8faf9` (showcase app shell)
- **Dark surfaces:** `#17272b` (endorsement section) · `#142b32` (jobs panel) · `#1c3036` (footer) · `#19282e` (primary button, nav CTA) · `#19292e` (`vgs` CTA) · `#1c292e` / `#1c292d` (`vcc`/`vsq` buttons) · `#111111` (stories "Start for free") · `#193d3d` (hero research brief card) · `rgba(21,45,48,0.95)` = `#152d30/0.95` (hero tab bar) · `#1d3138` (`vgs` "A look inside the workflow" tag)
- **Ink (headings):** `#19282e` (h1, logos h2, stories, team-fit) · `#1c292e` (`vgs`, stories h2, `vcc`) · `#1c292d` (`vsq`) · `#203342` (showcase) · `#1d343b` (jobs calculator) · `#f6f8f4` / `#f8f9f7` (headings on dark)
- **Body greys:** `#40525c` (hero sub) · `#4a5e68` (hero eyebrow) · `#52636c` (`vgs` paragraphs, stories sub) · `#4f5e63` · `#536e75` · `#64767e` (inactive step link) · `#61717c` · `#677783` (showcase meta) · `#5e7077` (inactive tab) · `#b8cbce`, `#c2d0d2`, `#bbcdce`, `#b4c7c9` (text on dark)
- **Accent blues:** `#376f9c` (stories accent, showcase `--vs-accent`, links) · `#32658b` (`vgs` text links) · `#315e8d` (team-fit accent) · `#3275b5` / `#3375b4` (pricing links and eyebrow) · `#42687c` (`vgs` eyebrow) · `#426f94` (`vgs` active tab underline) · `#356c93` (active step border) · `#416f91` (hero visual accent) · `#002669` (nav "Log in") · `#0077b5` (dot blink) · `#83b6e8` (jobs platform top border) · `#a9d0ec` (filled job) · `#96c8ea` (jobs progress bar)
- **Greens:** `#4a755c` (check glyph) · `#507466` (pricing check icon) · `#476b60` (closing CTA second line) · `#e4eddf` / `#c5d8c0` (showcase plan card bg/border)
- **Borders / hairlines:** `#d6dfdd` (logo grid, stories card) · `#d4dedb` (`vgs` cards and stepnav) · `#ccd8d3` · `#cfd8d8` (FAQ) · `#d2dfe1` (offer panel) · `#d6dede` (FAQ panel) · `#ced9d8` (arrow buttons) · `#cad6d7` (team tabs) · `#ccd8d8` (team panel) · `#cddad3` (tool cards) · `#476069` (jobs tiles) · `#cfddda` (calculator) · `rgba(255,255,255,0.19)` (footer rules) · `#718589` (footer ghost button) · `rgba(172,191,184,0.4)` (closing CTA bottom rule)

Gradients:
- Hero visual light overlay `.vhv-light`: `linear-gradient(rgba(22,60,57,.42), transparent 45%, rgba(33,29,21,.64))` on the Research scene. The per-scene variants are in `components.css` (`.vhv-light`, `[data-scene=...]`).
- Endorsement shade `.ve-shade`: `linear-gradient(110deg, rgba(15,35,38,.80), rgba(15,35,38,.57) 58%, rgba(15,35,38,.42))`.
- Jobs stage overlay `.vstack-stage::after`: `linear-gradient(100deg, #142b32 0%, rgba(20,43,50,.95) 45%, rgba(20,43,50,.4))` over the art image at opacity .12.
- Closing CTA `.vcc-scene`: `linear-gradient(90deg, rgba(245,246,235,.92) 0%, rgba(246,247,239,.96) 25%, rgba(245,246,236,.96) 75%, rgba(237,240,229,.85) 100%)` over `img/PFm0moxeBn8eOm66rVN2ssTio.png` (cover). A 10px strip of the same image runs along the bottom edge (`::after`, `inset: auto 0 0; height: 10px`).
- Showcase playbook-card thumbnails: `linear-gradient(0deg, rgba(23,44,55,.79), rgba(23,44,55,.125))` over the image.

Radii: the design is almost entirely **square**, and all section panels and buttons have radius 0. The exceptions are the hero-visual chips and cards (3-4px), the stories avatar (3px) and arrows (2px), the endorsement avatar (2px), the wall-of-love avatars (3px), the showcase shell (5px), showcase cards (5-6px), the showcase sidebar items (4px), the logo tooltip (4px), the mobile menu panel (12px), and avatars/step numbers (50%).

Shadows:
- nav dropdown `0 12px 30px rgba(25,41,46,.082)`
- `vgs` window `0 10px 25px rgba(21,43,52,.125)`
- showcase shell `0 10px 35px -20px rgba(21,45,78,.5)`
- hero chips and cards `0 12px 24px -15px rgba(20,47,71,.5)`
- `.vhv-card` `0 22px 45px -18px rgba(21,57,81,.5), 0 2px 5px rgba(41,72,87,.125)`
- logo tooltip `0 10px 20px rgba(0,0,0,.05)`

Backdrop filters: none are used anywhere on the page.

## 6. Typography roles (desktop 1440, computed)

`size/line-height`, letter-spacing and weight. Colors are hex.

| Role | Family (rendered) | Size / LH | LS | Wt | Color |
|---|---|---|---|---|---|
| Nav link | PPNM Medium | 14 / 16.8 | 0 | 500 file | #000 |
| Nav "Log in" | PPNM Medium | 16 / 19.2 | 0 | 500 | #002669 |
| Nav CTA label | PPNM Medium | 14 / 16.8 | 0 | 500 | #fff |
| Hero eyebrow | PPNM Medium | 15 / 22.5 | 0 | 500 | #4a5e68 |
| Hero h1 | PPNM Medium | 60 / 62.4 (1.04) | -2.1px (-0.035em) | 500 | #19282e |
| Hero sub | PPNM Medium | 20 / 30 | 0 | 500 | #40525c |
| Hero buttons | PPNM Medium | 14 / 16.8 | 0 | 500 | #fff / #000 |
| Hero proof quote | PPNM Var | 19 / 26.6 | -0.285px | 400 | #243940 |
| Hero proof name / role | PPNM Var | 15/21 w500 · 13/18.2 w400 | 0 | | #243940 · #52646b |
| Hero visual eyebrow | PPNM Var | 11 / 15.4 | 0.66px, uppercase | 400 | scene-dependent (#f5f4e7 on dark art, #49645a / #42606b on light art) |
| Hero visual h3 | PPNM Var | 42 / 44.52 (clamp(30px,6.6cqw,42px)) | -1.47px | 600 | #fffdf0 or #264842 / #254b56 |
| Hero tab label | PPNM Var | 14 / 16.8 | 0 | 400 | #dae4df (active #21393a) |
| Logos h2 | PPNM Medium | 36 / 43.2 | 0 | 500 | #19282e, centered |
| Stories h2 | PPNM Medium | 46 / 55.2 | -1.38px | 500 | #1c292e |
| Stories sub | PPNM Var | 21 / 31.5 | 0 | 400 | #52636c |
| Stories quote | PPNM Var | 27 / 31.86 | -0.675px | 500 | #19282e |
| Stories big metric | PPNM Var | 96 / 91.2 | -5.28px | 500 | #19282e, lining-nums |
| Stories sub metric | PPNM Var | 29 / 31.9 | -0.725px | 500 | #19282e |
| Stories eyebrow | PPNM Var | 12 / 16.8 | 0.78px, uppercase | 400 | #376f9c |
| Endorsement kicker | PPNM Var | 11 / 15.4 | 0.66px, uppercase | 400 | #e1e9e6 |
| Endorsement quote | PPNM Var | 48 / 55.2 (1.15) | -1.584px (-0.033em) | 500 | #fff |
| `vgs` eyebrow | Inter | 12 / 18 | 1.2px, uppercase | 400 | #42687c |
| `vgs` h2 | Inter (500 renders as 400) | 58 / 62.06 (clamp(36px,4.1vw,58px), lh 1.07) | -2.03px (-0.035em) | 500 | #1c292e |
| `vgs` lead | Inter | 21 / 31.5 | 0 | 400 | #52636c |
| `vgs` h3 (steps) | Inter | 32 / 37.12 | -0.8px | 500 | #1c292e |
| `vgs` body | Inter | 18 / 27 | 0 | 400 | #52636c |
| Jobs h2 | PPNM Var | 56.448 / 58.71 (clamp(38px,4.2cqw,62px), lh 1.04) | -0.035em | 500 | #f6f8f4 |
| Jobs price | PPNM Var | 52 / 52 | -2.34px | 500 | #1d343b |
| Showcase tab | PPNM Var | 15 / 20 | 0 | 400 | #77848d (active #1e3748) |
| Showcase intro h3 | PPNM Var | 24 / 28.8 | -0.6px | 500 | #203342 |
| Team-fit h2 | PPNM Var | 48 / 51.84 | -1.824px | 500 | #19282e |
| Team-fit h3 | PPNM Var | 38 / 43.32 | -1.216px | 500 | #19282e |
| Wall metric | Inter | 72 / 72 | -3.24px | 500 | #1c292e |
| Wall quote | Inter | 20 / 28 | -0.3px | 400 | #1c292e |
| Pricing h2 | PPNM Var | 44 / 47.52 | -1.76px | 500 | #1c292d |
| Pricing $199 | PPNM Var | 76 / 76 | -4.56px | 500 | #1c292d |
| FAQ question | PPNM Var | 20 / 26 | -0.4px | 500 | #1c292d |
| FAQ answer | PPNM Var | 17 / 26.35 | 0 | 400 | #4a5b64 |
| Closing h2 | Inter | 66 / 67.98 (clamp(38px,4.6vw,66px)) | -2.64px | 500 | #1c292e, 2nd line #476b60 |
| Footer h2 | PPNM Var | 44 / 49.28 | -1.54px | 500 | #f8f9f7 |
| Footer link | PPNM Var | 16 / normal | 0 | 400 | #f8f9f7 |
| Footer column title | PPNM Var | 12 / normal | 0.72px, uppercase | 400 | #9eb6ba |

---

## 7. `nav`

**Structure.** A fixed wrapper (`position: fixed; top: 0; width: 100%`) contains `header` with `padding: 20px 48px` and `bg #f8f9f7`. Inside it is `nav` → "Links & Button", a flex row with `justify-content: space-between; align-items: center`:
1. The logo `a` (99x29) at x=48, y=28. It's an SVG wordmark, `svg/26-nav-logo-valley-wordmark.svg` (viewBox `0 0 99 29.078`), painted as a background data-URI and filled black.
2. "Menu Links", a flex row with `gap: 28px`, 543x44 at x=415 (at 1280 it's at x=335; it sits centered between logo and CTA). Items in order: **Home**, **Product ▾**, **Valley vs. Competition**, **Customers**, **Agencies**, **Pricing**. Each link is an `a` with `padding: 12px 0`, 44px tall. Label: PPNM Medium 14/16.8 #000.
3. "cta__nav", a flex row with `gap: 16px`, right-aligned: **Log in** (text link, 16px #002669, → `https://beta.joinvalley.co/login`) and **Start for free**, a 108x40 button (`padding: 10px 16px`, bg `#19282e`, radius 0, label 14px #fff) → `https://beta.joinvalley.co/signup`.

Link targets: Home `./`, Valley vs. Competition `./compare`, Customers `./casestudies`, Agencies `./linkedin-outreach-for-agencies`, Pricing `./pricing`.

**Product dropdown** (`.vpm`, a native `<details>`; click to open, hover does nothing):
- The summary is "Product" (declared 14px w500 #19252e; renders as Inter 400) with a 10x10 chevron (stroke #4f6373). The chevron has `transition: transform .15s` and rotates 180deg when open.
- The panel is `position: absolute; top: 100%; left: 0; width: 330px; padding: 10px; bg #fff; border 1px #d4dedb; shadow 0 12px 30px rgba(25,41,46,.082); z-index: 10`.
- It holds two links (`padding: 18px 16px`; the second has a 1px #e3e9e5 top border):
  - "Explore Product ↗" / "See how Valley works, from signal to reply." → `/product`
  - "All Playbooks ↗" / "Find your next play. See every step." → `/playbooks`
- Title: 17px w500 #1c292e, with the arrow at w400. Description: 14px/1.5 #52636c, margin-top 7px.
- Link hover: bg `#eef3ef`, instant (no transition).
- Focus-visible: `2px solid #39729c`, offset 4px.

**Nav link hover ("rolling text").** Each link holds two stacked copies of its label, 20px apart, inside a clipped box. On hover both slide up 20px, so the second copy replaces the first. The Framer transition is a spring: I measured the offset over time as 0, 7.0, 12.6, 17.5, 19.2, 19.9, 20.0 and a 20.7px overshoot at 50ms steps, so it settles in about 300ms. The module declares `{type:"spring", bounce:0.2, duration:0.6}` and `{bounce:0.2, duration:0.4}` for these link components. Color does not change.

**Scroll behavior.** None. The nav stays fixed and identical at every scroll position: bg #f8f9f7, no shadow, no border, no hide or show (sampled at y = 0, 40, 120, 600, 2000, 1500, 300 and 0).

**Tablet and phone (< 1200).** The variant is `Phone - Close`: `header` 68px tall, `padding: 10px 20px`, bg #f8f9f7. It holds the logo (99x29, left padding 16px) and a 48x48 hamburger button at the right. The hamburger has four black bars, 19x2, at y offsets 17, 24, 24 and 31 inside the button, and a 2px radius.

**Mobile menu (`Phone Open`).** Clicking the hamburger changes the variant.
- The header grows from 68 to about 456px tall (measured 107 → 225 → 335 → 382 → 411 → 429 → 440 → 446 → 450 → 452 at 50ms steps). The transition is a spring with stiffness 400, damping 50, mass 1.
- The nav container becomes a card: bg #f8f9f7, radius 12px, a 1px `rgba(34,55,72,.09)` border via `::after`, and `padding: 0 16px 16px`.
- Inside is a column with `gap: 24px`: logo row (with the close button), then links (column, gap 4px, each 44px tall), then the CTA row (`padding: 0 24px`, gap 24px) with "Log in" and "Start for free".
- In the mobile Product dropdown (`.vpm-mobile`) the panel becomes inline: no shadow, a left border of 1px #ccd8d3, `padding-left: 8px`, links `padding: 14px 12px`, titles 16px and descriptions 13px.
- Hamburger to X: the middle two bars become 15x15-box bars rotated +45deg and -45deg, and the outer two fade to opacity 0.
- The page is not scroll-locked. The menu card overlays the hero.
- Screenshot: `spec/screens/mob_nav_open.jpg`.

## 8. `hero`

**Desktop (1440).**
- Section `padding: 140px 48px 64px`, bg `#f8f9f7`, height 924, `overflow: clip`.
- Inner row "One promise, one product moment": flex row, `gap: 64px`, `align-items: center`, 1344x720.
- Left column "Hero copy and action": 640 wide (560 at 1280), flex column, `gap: 17px`, vertically centered (y 212 to 787).
  - "Heading", column with `gap: 18px`:
    - Eyebrow `p` "For founders, sales teams and agencies" (15/22.5, #4a5e68).
    - `h1` "Unbelievably good outbound. To people who actually want it." (60/62.4, -0.035em, #19282e). 640x187, three lines at 1440.
  - "Product explanation and action", column with `gap: 24px`:
    - `p` "Valley finds the right prospects, researches what matters to them, crafts relevant messaging, and sends outreach in your voice across email & socials in under 5 minutes." (20/30, #40525c). 640x90.
    - "Start with Valley", column with `gap: 12px`:
      - Button row (`gap: 10px`):
        - **Primary** "Start for free" (112x42, `padding: 10px 18px`, bg #19282e, label 14px #fff) → `https://beta.joinvalley.co/signup`.
        - **Secondary** "Book a demo" (116x42, bg #fff, label #000) → `https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b`. The Surface script turns this into a popup modal with an iframe; a plain link is fine for the clone.
      - At 1440 the buttons have no border. At tablet and phone they get a `::after` border: 1px #000 on Primary and 1px rgba(0,0,0,.2) on Secondary.
    - Hero proof `aside.valley-hero-proof`: `padding-top: 32px`. It's a grid with every story stacked in the same cell, fading between them.
      - Each `a.vhp-story` is a grid `56px 1fr` with `gap: 18px`, `padding-top: 24px` and `border-top: 1px #d7dfdc`.
      - Avatar: 56x56, radius 4px.
      - Blockquote: 19/26.6, -0.015em, #243940.
      - Byline: `strong` 15px w500 #243940 and `span` 13px #52646b, gap 5px.
      - Inactive stories: `opacity: 0; visibility: hidden`. Active: `[data-active=true]`, opacity 1. Transition `opacity .3s, visibility .3s`.
      - The active story follows the hero scene index (see Motion). The five stories, in scene order:

| scene | quote | person | role · company | avatar | href |
|---|---|---|---|---|---|
| 0 Find | "Valley is a cheat code." | Stefano McCoy | Sales · Bolt.new | `img/QWtiaR1m3BLU5A064IdsPPe2Es.png` | /casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days |
| 1 Qualify | "Instead of going small, we actually go big and just segment them according to ICP fit." | Freizle Abarrientos | Chief Operating Officer · ThinkFish | `img/sfCZQKIFk9u4tjQgtSzASSggZU.jpeg` | /casestudies/how-thinkfish-books-380-400-meetings-monthly-with-valley |
| 2 Research | "Valley went really deep to find information that you could never do in just a cursory search." | Tim O'Neil | Sales Leader · GGWP | `img/rnMa9immzygrPgvq8OXo5QCGAk.jpeg` | /casestudies/how-ggwp-generated-4m-in-pipeline-with-valley |
| 3 Write | "The quality of conversations were as good as if I was typing it myself." | David Baeza | Founder & CEO · Butteredtoast | `img/Isd8Ok5lFEZQqqPP6ndAWlTI40I.jpeg` | /casestudies/how-butteredtoast-generated-1m-in-pipeline-scaling-one-founder-s-personal-brand |
| 4 Send | "Valley makes our outbound seamless." | Conrad de Claro | Director of Growth Marketing · GoCanvas | `img/ZLYSGUvKkVzLXYs0HskrNMPEys4.jpeg` | /casestudies/how-gocanvas-30x’d-outbound-pipeline-with-valley |

(Quotes render with curly quotes: `“…”`.)

- Right column `div.valley-hero-visual`: 640x720 (560x720 at 1280), bg `#5486a1`, `overflow: clip`, `container-type: inline-size`, `isolation: isolate`.
  - Layers:
    - full-bleed `img.vhv-art` (object-fit cover; object-position varies per scene: 53%, 50%, 49%, 56%, 67%)
    - `.vhv-light` gradient overlay
    - `.vhv-scene` content: eyebrow at top-left inset 38px, with a 4x4 dot before it; `h3`; then scene cards
    - bottom control bar `.vhv-controls`: 589x64, 26px from the sides and 29px from the bottom, `padding: 8px`, `gap: 8px`, bg `rgba(21,45,48,.95)`, border 1px `rgba(236,241,227,.26)`
  - Tabs (`.vhv-tabs`) are five equal buttons (106x46, `padding: 0 7px`, column with `gap: 10px`). Each has a label and a 2px track `i.vhv-tab-track` (bg `rgba(211,223,211,.3)`) whose inner `<i>` fills with `transform: scaleX(var(--vhv-progress))`.
    - Active tab: bg `#f6f6ee`, label #21393a, track bg `rgba(54,94,92,.22)`, fill `#365e5c`.
    - Inactive tabs: opacity .7, `transition: opacity .15s`, hover → opacity 1.
  - Play/pause button `.vhv-play` (34x44): left border 1px, `#fffaea` icon 15px.
  - The five scenes are described below. Every per-element style is in `spec/states/hero.txt`, the art is in `img/*.webp`, and there are screenshots at `spec/screens/state_hero_{0..4}.jpg`.
    - **0 Find** (art `qVEsGfJTu6GKkZimfuu0ZEt9y8w.webp`). Eyebrow "AN AUDIENCE THAT KEEPS GROWING". h3 "Your next audience. Always taking shape." Four signal cards ("Lead magnet replies", "Hiring AEs", "Competitor complaints", "Keyword engagement"; 15px w500 #243c45, each with a 25px icon tile) around a center card: "A PERSON TO QUALIFY", avatar, **Maya Chen**, "VP Revenue · Fieldwork". Thin connector lines in between (SVG).
    - **1 Qualify** (`I2vQY5n5ohqHpTjOEMjbfWcWY.webp`, light art so dark text: eyebrow #49645a, h3 #264842). Eyebrow "THE RIGHT PEOPLE, FOR YOUR BUSINESS". h3 "A signal is a start. Fit comes next." Person card: Maya Chen, "VP Revenue · Fieldwork", "✓ High ICP-Fit". "WHY SHE FITS" card: The right role / Leads the revenue team; The right company / B2B software · growing sales team; A possible need / Building outbound capacity. "SKIP" card: × Wrong role, × Wrong company, "Engagement alone is not enough."
    - **2 Research** (`rJuKbYxvU87P3NolFKu3MwWGbaw.webp`). Eyebrow "CONTEXT FROM ACROSS THE WEB". h3 "Know what matters to each person." Six source chips on the left (169x38, bg #fff3df, 12px #5d4939): News & press, Podcasts, LinkedIn & X, YouTube, Interviews, Newsletters. Dark brief card (372x367, bg #193d3d, border #496257): "RESEARCH BRIEF", "MAYA CHEN · FIELDWORK", "Know the reason. Make it relevant." (25px w500 #fff1d5), "Company careers page" / "Hiring AEs to grow the revenue team.", "Leadership posts" / "Building a repeatable outbound motion.", footer "Give new reps a researched starting point."
    - **3 Write** (`UZd5WAy3WzMaA6tXbKhZPr2Y4.webp`, dark text: eyebrow #42606b, h3 #254b56). Eyebrow "RESEARCH, WRITTEN IN YOUR VOICE". h3 "Your words. Their context." "YOUR VOICE" chips: “saw”, “want a few”, “your phrasing”. Email card "Written with context.", To: Maya Chen (VP Revenue · Fieldwork). Body: "Maya, [saw] Fieldwork is [hiring AEs.]" / "Valley finds prospects and drafts outreach from real research. A useful head start for your new reps." / "[Want a few] examples for Fieldwork?" Underlined phrases have a 1px bottom border #8aa99b; "hiring AEs." is highlighted with bg #e7f0f3. Footer: "✓ Ready for your review" · "Review draft →".
    - **4 Send** (`4pvxwlcKo6sAQu1W1Q9dsGtx234.webp`). Eyebrow "LINKEDIN AND EMAIL, TOGETHER". h3 "One conversation. Across both channels." Card "LINKEDIN / Connection request" with avatar → pill "Wait · your timing" → branches "Accepted" / "Not accepted" → cards "LinkedIn message / Continue where you connected." and "Email / Reach out in their inbox." → note "✓ A reply stops the sequence. You pick up the conversation."

**1280.** Same as 1440 with narrower columns (copy 560, visual 560x720).

**Tablet 1024** (`Variant 1 - Tablet`).
- Section `padding: 124px 28px 64px`. Stacked column with `gap: 40px`: copy block 650 wide, then the visual full width (968x720).
- Eyebrow 13/19.5. h1 50/52, -1.75px. Sub 16/24, 520 wide. Buttons stay side by side (112 and 116 wide).
- The tab bar spans 891 wide.

**Phone 768 / 390** (`Variant 1 - Phone`).
- `padding: 112px 20px 48px`, column with `gap: 36px`. Copy column `gap: 24px`, heading gap 20px.
- Eyebrow 11/16.5. h1 38/39.52, -1.33px (4 lines at 390). Sub 17/24.99.
- Buttons are full width and stacked (`gap: 8px`, 42px tall, each with a `::after` border).
- The proof block is full width.
- The visual is full width and **660px tall**. At 390 the tab bar is 329 wide with a 4px gap. Scene layouts reflow through `@container` rules (see `.vhv-*` in components.css).

## 9. `logos`

**Desktop 1440.**
- Section "Website Desktop": `padding: 48px 48px 56px`, flex column, `gap: 36px`, centered, bg #f8f9f7.
- `h2` "Customers who migrated off of HeyReach, Expandi, and Lemlist." (36/43.2, w500, #19282e, centered, 1344 wide). At 1280 it's the same.
- "Logo-container" (1344 wide, column, gap 0):
  1. "Featured customers": a grid of four columns (306px each at 1440, 266 at 1280), `gap: 24px`, `padding: 24px`, height 112. Border 1px #d6dfdd on all sides (drawn with `::after`). Cells are centered flex. Logos at natural size:
     - Rho, `img/LCrsyazQOAmTZUH3T20VNvGctf8.svg`, 81x37
     - bolt.new, `img/fPy3rajrBwOXFvdygI98ux0wDiI.png`, 114x35
     - StubHub, `img/TJ8612Exbq2vTbQxsa8bl8I4.svg`, 99x45
     - Clarify, `img/QCo0IxNMsKaJfiivhlkmSucpwg.svg`, 123x32
  2. Main grid: five columns (244.8px each at 1440, 212.8 at 1280), `gap: 12px 20px`, `padding: 20px`. Border 1px #d6dfdd on the left, right and bottom only. Cells are 245x71, bg #f8f9f7, with the logo centered. Each logo sits in a wrapper at **opacity .85** and renders 46px tall (width auto).
     - Cells are either "Website Logo Plain" (just the logo) or "Website Logo" (a 5x5 **Dot Blink** square, bg #0077b5, 8px left of the logo, and a hover tooltip).
     - Order, left to right and top to bottom (● = has dot and tooltip):
       - Row 1: klaar (`3UCjPMpY3Nkuy1xoJaCCN3TKJk.png`, alt says "UiPath" but the image is the **klaar** wordmark), smallest.ai, ● miro, Peec AI, glean
       - Row 2: ● 10X, ● Tacnode, ggwp, ● GROWTH_PROTOCOL (wide, 197x40), ● Kaster
       - Row 3: ● gocanvas, PandaDoc, ● FRANQ, ● Darwinian Ventures, ANTLER
       - Row 4: "+ MORE" (`DIlJZPjonPeUe4ZwL1CEYmCOUw.png`)
     - File names are in the manifest.
- **Logo tooltip** (hover on a ● cell).
  - A card 280px wide, anchored 10px above the cell and centered horizontally on it. It renders in a portal with z-index 11.
  - Card: bg #f8f9f7, radius 4px, border 1px #d6dfdd (`::after`), shadow `0 10px 20px rgba(0,0,0,.05)`, `padding: 16px`, column with `gap: 10px`.
  - Contents: a 14x14 black quote glyph (SVG), then "Testimonial Container" (column, gap 24px) holding the quote (PPNM Medium 14/18.9 w500 #19282e) and the ICP line (11/14.85 w500 #4f5e63).
  - Enter animation: opacity 0 → 1 with a Framer spring `{bounce:.2, duration:.4}`. Measured opacity is 0.31 to 0.62 at 60ms, 0.82 to 0.98 at 120ms, and 1 by 180ms. There's no transform.
  - Texts are verbatim below (also in `spec/states/logo_tooltips.json`):
    - miro: “The GTM landscape is evolving daily, and Valley peaked my interest early on as a company that will be the future of GTM tools” · ICP: SALES & GTM  LEADERS
    - 10X: Valley gave us control of what we were doing as opposed to giving the keys and letting them go. But most importantly, the reason why we joined Valley is because it was a third of the price of the agency that we were using to do a similar type of outreach. - Sam · ICP: DEV TEAMS
    - Tacnode: I've been doing this about 12 years and I've never used a tool like this before. It's super cool. Valley seems to have booked us more meetings than anything else that we're using right now · ICP: AI-First, Real-time Data Teams
    - Growth Protocol: I'm able to come into those [pipeline review] meetings and be like, look at what I booked through Valley. You know, if my other kind of channels have slowed down, I'm like, but Valley, Valley's there. · ICP: SALES & GTM  LEADERS
    - Kaster: We've booked like four enterprise level demos that we normally wouldn't have through LinkedIn in just the past two months. And two of them happened last week alone · ICP: C suite HR Decision Makers
    - gocanvas: A real response to a message Valley sent a prospect: “I was never considering anything until you reached out with a message that literally spoke to me.” The automation is great but the sauce within Valley is the messaging itself. · ICP: Field Service & Construction Firms
    - FRANQ: I can standardize my approach and I can A-B test knowing that I'm actually A-B testing, not depending on someone to be in a good mood that day or in a bad mood that day. · ICP: SALES & GTM  LEADERS
    - Darwinian: AI cannot close a deal for you. But it can be a hot lead engine. Valley is always flipping hot leads to our reps, so they can focus on calling and emailing them. · ICP: SALES & GTM  LEADERS
- **Dot Blink loop**: opacity 1 → 0 → 1, 2.0s period, infinite. Each 1s half uses the tween `cubic-bezier(.5,0,.88,.77)`. Samples: 1.00 at t=1650ms, 0.77 at 2050, 0.19 at 2450, 0.01 at 2650, 0.23 at 3050, 0.75 at 3450, 1.00 at 3650. All dots are in phase.

**Tablet and phone** ("Website Tablet" / "Website Phone"). The layout and the logo set are different.
- h2 text changes to "Customers who migrated off of HeyReach, Expandi and lemlist." (lowercase lemlist, no Oxford comma). Sizes: 32/38.4 at tablet, 28/33.6 at phone.
- Phone section `padding: 36px 20px 40px`, gap 32px.
- Then three "migrated from" blocks, each with a centered tag chip (184x48, bg #f8f9f7, `padding: 8px`) straddling the top border and holding a competitor wordmark:
  - **Heyreach** (`jx1u5bQyJQTHE8DVeFhTlV7WEQ.png`): Gallea AI (● alt "Ridge", `Bx6e2ANj69WlGVSGixBWFjy4WY.png`), Circuit, Capsule, Ditchcarbon
  - **Expandi** (`cLS5abTnQ5XywuBkuSOLzapiDo.png`): growthexperts, We&Goliath, StoryGen, + MORE
  - **Lemlist** (`W4Pger03NHoxtfZHRcbAIfQ6P4.png`): experio, salesmotion, websity, + MORE
  - Each block is a 2-column grid with `padding: 44px 16px 24px` and `gap: 24px 20px`.
- Then a "More teams using Valley" tag (14px w500 #4f5e63), the Featured 2x2 grid (200 tall), and the main grid in 2 columns (145px each at 390, `gap: 12px 20px`). The main grid has the same 16 logos as desktop.
- On touch the tooltip appears on tap. The 768 screenshot shows one open over the grid.

## 10. `stories`

**Section** "Customer results — rotating stories": `padding: 8px 48px 32px`.
- Header "Your outbound keeps moving": `padding: 40px 0`, column with `gap: 20px`.
  - `h2` "The only platform you need to run exceptional outbound." (46/55.2, -1.38px, w500, #1c292e)
  - `p` "Valley finds relevant buyers, researches each person, and runs outreach in your voice across LinkedIn and email." (PPNM Variable 21/31.5 #52636c, max 880 wide)

**Carousel** `section.valley-customer-results`: 1344x424, `padding: 40px 48px 24px`, bg #f8f9f7, border 1px #d6dfdd, `container-type: inline-size`.
- `.vcr-slides`: a grid with every slide stacked in one cell.
- `article.vcr-slide`: grid `565px 633px` (≈ 0.9fr / 1fr), `gap: 48px`, `padding: 4px 0 24px`.
  - Left `.vcr-quote-column` (column, gap 20):
    - blockquote (27/31.86 w500)
    - attribution: 44x44 avatar (radius 3, bg #e5ebe7) plus name (15 w500) and role (14 #4f5e63), gap 12
    - "Read {company}’s story →" link (15px #376f9c with a 17px arrow; hover underline)
    - `a.vcr-signup` "Start for free →" (155x46, `padding: 14px 22px`, bg #111111, #fff 15px, gap 16px, `transition: background-color .15s`, hover bg #2c383c) → signup
  - Right `.vcr-outcomes` (column, gap 14):
    - eyebrow "{COMPANY}, WITH VALLEY" (12px 0.78px uppercase #376f9c)
    - main metric (96/91.2 -5.28px lining-nums) with its caption (20/26 #40525c)
    - `.vcr-support`: 2-column grid with gap 28, `padding-top: 18px`, top border 1px #d6dfdd. Each column has a value (29/31.9 w500) and a label (15/20.25 #4f5e63).
- `.vcr-controls`: `padding-top: 9px`, top border 1px #d6dfdd, space-between.
  - Left, tabs with `gap: 26px`: Bolt.new, GGWP, Linarca, ThinkFish. Labels are 13/18.2 (inactive #5e7077, active #19282e), `padding: 5px 0 12px`. Each has a 2px track under it (active track #d2dcdd, fill `#376f9c` with `scaleX(var(--vcr-progress))`).
  - Right: "Pause" / "Play" button (14px icon plus 12px label, hover color #376f9c), counter "01 / 04" (11px tabular-nums #62727a), then prev/next arrows. Arrows are 37x37 with a 1px #ced9d8 border and radius 2, `transition: background-color .15s`, and hover bg #eaf0ed. The prev arrow is the next arrow's SVG rotated 180deg.
- Slides, verbatim:

| tab | quote | person, role | read link → | eyebrow | main metric / caption | support 1 | support 2 | avatar |
|---|---|---|---|---|---|---|---|---|
| Bolt.new | “Valley is a cheat code.” | Stefano McCoy, Sales, Bolt.new | Read Bolt.new’s story | BOLT.NEW, WITH VALLEY | $1M+ / Pipeline generated in the first 60 days. | 15–20 / Enterprise meetings booked | 3 hrs / Saved per rep daily | QWtia…png |
| GGWP | “I can do an afternoon of prospecting in about 20 minutes tops.” | Tim O'Neil, Sales Leader, GGWP | Read GGWP’s story | GGWP, WITH VALLEY | $4M / Pipeline generated within a quarter. | 30–40 / Meetings with decision makers | 20–30% / Response rate | rnMa9…jpeg |
| Linarca | “I know that quality is always going to be high, consistency is always going to be there.” | Roberto Arrieta, Founder, Linarca | Read Linarca’s story | LINARCA, WITH VALLEY | 14 / Meetings booked in the first month. | 20–22% / Reply rate during active training | 1–2 hrs / To the first positive response | OsA3b…png |
| ThinkFish | “Valley really does get to avoid all the noise.” | Freizle Abarrientos, Chief Operating Officer, ThinkFish | Read ThinkFish’s story | THINKFISH, WITH VALLEY | 400 / Meetings booked monthly across 50 seats. | 50 / Valley seats | 2 / Team members managing those seats | sfCZQ…jpeg |

Story link targets: Bolt.new and GGWP are in the link list in `spec/texts_1440.txt`. Linarca → `/casestudies/how-linarca-booked-14-qualified-meetings-in-their-first-month-with-valley`. ThinkFish → `/casestudies/how-thinkfish-books-380-400-meetings-monthly-with-valley`.

**Responsive.**
- Tablet 1024: section `padding: 8px 28px 32px`, h2 40/46. The slide grid is 388/434 with the 96px metric kept.
- Phone: h2 34/39.1 -1.02px, sub 19/28.5.
- At 390 the card has `padding: 28px 24px 20px` and the slide becomes one column (gap 26). The metric is 80/76 and the caption 19/25.65. Controls become a column (gap 7).

## 11. `endorsement`

- Outer bg #f8f9f7. `section.valley-endorsement` has bg `#17272b` and `font-family: "Valley Body Montreal"`.
- **Pinned mode** (`data-scroll="true"`) applies when the component is wider than 600px, the viewport is at least 650px tall and reduced motion is off. The section is `height: 290vh` (2610 at 900 tall) with `min-height: 810px`.
- `.ve-sticky`: `position: sticky; top: 88px; height: calc(100svh - 88px)` (812), `min-height: 560px`, `padding: 64px 48px`, flex centered vertically, `overflow: hidden`, `isolation: isolate`.
  - `img.ve-art` covers it absolutely (`5Elg5B9vPo2Xblz2XfnsvZzgqlA.png`, object-position `center 56%`, z -1).
  - `.ve-shade` gradient sits above the image (see section 5).
  - `.ve-content`: max-width 1100, centered (x=170 at 1440).
    - Kicker "JEFF BECKER ON THE FUTURE OF OUTBOUND" (11px, 0.06em, uppercase, #e1e9e6). It has a 4x4 square `::before` and gap 11, with margin-bottom 34.
    - `blockquote.ve-quote`: max-width 970, 48/1.15, -0.033em, w500. Text: “There has been a lot of talk surrounding what works in outbound now. The answer is Valley. Full Stop. Valley is the next generation of outbound.”
    - `.ve-author`: margin-top 50, gap 15. Avatar 48x48 with radius 2 (`haYdvzAyBL9mis35W8mYp4ZskM.png`). "Jeff Becker" is 18/1.35 w500. "Former Head of Sales, LinkedIn" is 13/1.4 #e0e8e5 with margin-top 3.
  - `.ve-scroll-cue`: a 20x26 down-arrow SVG centered 24px from the bottom. It animates `ve-scroll-pulse 2.4s ease-in-out infinite` (0%/100%: opacity .4, translateY 0; 50%: opacity .95, translateY 5px).
- **Word reveal.** Each word is a `span.ve-word[data-word]`.
  - In scroll mode the word itself has `color: transparent` and `-webkit-text-stroke: .7px rgba(255,255,255,.7)`, so it reads as outline text.
  - `::after { content: attr(data-word); position: absolute; inset: 0; color: #fff; opacity: var(--fill, 1) }` paints the solid word on top.
  - A scroll handler (rAF-throttled, active only while the section intersects) computes:
    ```
    p      = clamp01( (88 - rect.top) / max(1, rect.height - innerHeight + 88) )
    fill_i = clamp01( (clamp01((p - 0.04) / 0.73) + 0.04) * N - i )   // N = 26 words, i = 0..25
    ```
  - Measured at 1440x900: at dy = 0 (section top at 0) words 0 to 1 are 1 and 0.35. At dy = 450, 10.27 words are filled. At dy = 1350, all 26 are filled. The pin releases at dy = 1798.
- **Not pinned** (phone at 390, or a short viewport): the section is auto height (473 at 390) with `padding: 48px 20px 80px`. The quote is 31/37.2 -1.023px. Words are solid white (`--fill` defaults to 1).
- At 768x1024 the section is pinned: 2970 tall (290vh) with sticky height 936 and `padding: 48px 28px`.

## 12. `steps`

- `section.vgs` bg #f7f9f7. `.vgs-wrap` has `padding: 88px 48px`. At 390 it's `padding: ~104px 24px` (see dump).
- Header (max about 890 wide):
  - eyebrow "FROM YOUR WEBSITE TO YOUR NEXT CONVERSATION"
  - `h2` "A few clicks to start.<br>A whole new way to reach out."
  - `p` (margin-top 24, max 780) "Bring your business. Valley brings the research, the relevance and the follow-through."
  - Header block is y 4962 to 5213, then a 56px gap to the walk.
- `.vgs-walk`: grid `160px 1fr`, gap 48 (tablet: 130px / gap 28).
  - **Step nav** `nav.vgs-stepnav`: `position: sticky; top: 115px; align-self: start`, column.
    - Three links, each `padding: 18px 0` with a 1px bottom border #d4dedb, 15px Inter #64767e, and gap 10. Each has a small number span ("01", "02", "03" at 11px) and a 15px arrow SVG (`margin-left: auto; opacity: 0`).
    - Active (`aria-current="step"`): color #1c292e, border-color #356c93, arrow opacity 1. There's no transition, so it switches instantly.
    - Labels: "Connect", "Choose a play", "Launch".
    - Clicking smooth-scrolls to `#valley-step-N` (`scrollIntoView({behavior:'smooth', block:'start'})`).
    - The active step is the last `article[data-step]` whose `top < 0.45 * innerHeight`, recomputed on scroll.
  - **Step body**: three `article`s, each a grid `minmax(0,.85fr) minmax(0,1fr)` (505/595 at 1440) with gap 36, `align-items: center`, and `padding-bottom: 100px` (the last has 0).
    - Copy column:
      - eyebrow "01 / CONNECT" (12px 1.2px uppercase #42687c)
      - h3 (32/37.12 -0.8px)
      - body `p` (18/27 #52636c)
      - `small` note (14/21, `padding: 18px 0`, top border 1px #ccd8d3)
      - an optional link or CTA
    - Scene column `.vgs-scene` (595 wide): `padding: 22px`, background image (cover). It holds a tag "A LOOK INSIDE THE WORKFLOW" (11px 0.66px uppercase #fff on #1d3138, `padding: 6px 9px`) and a `.vgs-window` card (bg #fcfdf7, `padding: 22px`, shadow). The window header is the 23x32 Valley mark, a 15px bold title, "Valley" at the right (12px #5e6f72), and a bottom border #d4ddd6.
  - Articles verbatim:
    1. **01 / Connect**
       - h3 "Paste in your website."
       - p "**Valley Scout**, your AI outbound assistant, learns what you sell, who you help and what makes you different. Connect LinkedIn and email so the outreach comes from you."
       - small "Your business. Your accounts. Your voice."
       - Scene bg `PFm0moxeBn8eOm66rVN2ssTio.png`. Window "Your business":
         - URL field "↗ yourwebsite.com" with "Website added" (10px #356653); border 1px #c4d2cb, `padding: 12px`
         - "A starting point,<br>built around you." (26/29.64 -0.65px)
         - check rows (✓ #4a755c): "What you sell" / "Your product and the problem it solves"; "Who you help" / "The roles and companies that fit"
         - connection chips "in LinkedIn" and "✉ Email" (13px, bg #e9efeb, `padding: 8px 12px`) under a top border
    2. **02 / Choose a play**
       - h3 "Pick the signal. Review the plan."
       - p "Choose from the playbook library: people engaging with your content, companies hiring, a competitor’s audience, or your own list. Valley finds the buyers, checks fit and researches the reason to reach out."
       - small "Choose a play → Review your audience → Make it yours."
       - Link "Explore all playbooks →" (16px #32658b, gap 14, hover underline offset 5px) → `/playbooks`
       - Scene bg `5WP0tI1lICNwC23waJVfpSCTTpE.png`. Window "Your next play":
         - "BUYING SIGNALS" (11px 0.88px #4d7182)
         - "Hiring for roles that<br>signal your problem"
         - four numbered rows (23px circle, 1px #bfcfc4 border; 14px text; bottom border #d4ddd6): Find companies hiring · Identify the decision makers · Qualify fit and research · Draft a relevant first message
         - footer bar "Your audience and message, ready to review →" (12px, bg #edf3ed, `padding: 14px`)
    3. **03 / Launch**
       - h3 "Relevant outreach. Real conversations."
       - p "Review the message and launch your play. Valley runs the sequence across your connected channels and brings replies into one inbox, so you can focus on the conversations that matter."
       - small "Keep control of approvals, timing and follow-ups."
       - CTA `.vgs-cta` "Start for free →" (185x52, `padding: 14px 22px`, bg #19292e, 16px #fff, gap 24, hover bg #344e57 with no transition) → signup
       - Scene bg `V5YzrhTWz6oX6qYDyJJzGKbRnIU.png`. Window "Unified inbox":
         - message box (bg #eaf1ee, `padding: 18px`): "LINKEDIN · INTERESTED REPLY" and "“This is good timing.<br>Can you tell me more?”" (25/30)
         - checks "Conversation in one place" / "See the research and message history"; "Your next reply, ready to review" / "Keep the conversation in your voice"
         - footer bar "You take the conversation from here →"
- **Phone (390):** the step nav becomes a horizontal sticky strip: `position: sticky; top: 64px`, row with gap 16, bg #f7f9f7, `padding-top: 8px`, 76 tall. Articles stack with the scene below the copy (scene 342 wide, `padding: 16px`). There are no scroll animations.

## 13. `jobs`

- Wrapper "Your entire outbound team": `padding: 24px 48px 32px`, bg #f8f9f7.
- `section.vstack`: bg #142b32, color #f6f8f4, `container-type: inline-size`.
- **Pinned mode** (`data-motion="true"`) applies when the component is wider than 760px, the viewport is at least 720px tall and reduced motion is off. The section is `height: 310vh` (2790 at 900).
- `.vstack-stage`: `position: sticky; top: 88px; min-height: max(620px, 100svh - 88px)`, `padding: 48px`, flex centered, `overflow: hidden`.
  - `img.vstack-art`: the same art as the endorsement (`5Elg5B9vPo2Xblz2XfnsvZzgqlA.png`) at opacity .12, z -2.
  - `::after` gradient sits above it (see section 5).
- Top block:
  - kicker "LESS STACK. MORE OUTBOUND." (11px, 0.09em, uppercase, #a4c6df, mb 15)
  - `h2` "All these jobs.<br>One connected platform." (clamp(38px, 4.2cqw, 62px); lh 1.04; -0.035em; max 780)
  - lead "From the first signal to the next reply. Bring the work together in Valley." (18/1.45 #b8cbce)
- `.vstack-body`: grid `minmax(0,1.65fr) minmax(0,1fr)` (755/457 at 1440), gap 36.
  - **Map** (`.vstack-map`): four columns with gap 10. Each group has a title (12px #a8bdc2) with an index "01" to "04" (#7696a0), then four tiles.
    - `.vstack-job`: min-height 79, border 1px #476069, `padding: 13px 12px` (dump 11/12), 15/1.2 #d1dfe1, `overflow: hidden`.
    - Inside each tile: a `✓` check (12px, `opacity: var(--fill)`), the label, and `small.vstack-vendor` (10px, opacity .75, gap 5) with a 12px grayscale favicon plus the vendor name.
    - `::before` covers the tile (bg #a9d0ec, `transform: scaleX(var(--fill)); transform-origin: left`, z -1).
    - When `[data-filled=true]` the text is #183741 and the border #a9d0ec.
    - Groups and tiles:
      - **Discover** 01: List building (Sales Navigator; inline person SVG), Profile viewers (LinkedIn Premium; inline SVG), Post engagement (Trigify), Company signals (Common Room)
      - **Understand** 02: ICP scoring (Clay), Qualification (Clay), Contact enrichment (Apollo), Prospect research (Perplexity)
      - **Reach out** 03: Your writing style (Lavender), Personalized messages (Lavender), LinkedIn sequences (HeyReach), Email sequences (Instantly)
      - **Improve** 04: Follow-ups (lemlist), Reply management (HeyReach), Campaign analytics (HubSpot), Continuous learning ("Your team’s analysis", no icon)
    - Favicons come from `https://www.google.com/s2/favicons?domain=<d>&sz=32`. They're downloaded at 64px to `public/assets/favicons/`.
  - **Platform card** `aside.vstack-platform`: bg `rgba(241,247,243,.97)`, color #1d343b, top border 3px #83b6e8, `padding: 20px 24px`, column space-between with gap 18.
    - Brand row: 30px Valley glyph (`svg/14-vstack-strong.svg`) plus "Valley" (25 w500), and a badge "ONE PLATFORM" (10px 0.4px uppercase #48725c).
    - Price row: "$199" (52/52 -2.34px w500) and "/ seat / month" (14px #61747b).
    - "Starter · The outbound platform<br>Email, priority support, and onboarding are optional." (12/17.4 #526a71)
    - Toggle `.vstack-toggle` (bg #e3ebea, `padding: 3px`, gap 3): "Monthly" / "Quarterly · $447" (12px, `padding: 8px 5px`). The pressed one gets bg #fff and #1b363f. Quarterly shows price **$149**; monthly shows **$199**.
    - Calculator: "What is your average contract value?" and a `$` input (number, 90x36, border 1px #c8d7d5, default **10000**, clamped 0 to 10,000,000 on blur). "Potential pipeline from Valley / month" and the value `"$" + (8×ACV).toLocaleString('en-US') + "–" + "$" + (10×ACV)...`, which is "$80,000–$100,000" by default (clamp(25px,2.3cqw,34px) w500). Note: "Based on 8–10 estimated meetings/month per seat × your contract value. Assumes each meeting becomes an opportunity; not closed revenue."
    - `a.vstack-trial` "Start free trial →" (full width, 48 tall, bg #1c292e, 16px w500 #fff, hover #344f4a) → signup
- Bottom row `.vstack-bottom` (margin-top 24, space-between):
  - status "**<span class=vstack-count>0</span> / 16 jobs connected.** One shared context." (13px #b4c9cf, bold part #f5f8f4 w500)
  - `a.vstack-link` "Explore the plans ↗" → `/pricing`. It's a 178x48 bordered button (1px #9fb7bc, `padding: 12px 22px`, 16px) with hover bg #29434a.
- `.vstack-track`: 2px tall, bg #35505b, margin-top 18. The inner bar is #96c8ea with `scaleX(var(--progress))`.
- **Scroll logic:**
  ```
  p = clamp01((88 - rect.top) / max(1, rect.height - innerHeight + 88))
  a = clamp01((p - 0.05) / 0.76)
  --progress = a
  fill_i = clamp01(a*17 - i)   (i = 0..15, in DOM order: column by column)
  filled = fill_i > 0.65
  count  = min(16, floor(a*17))
  ```
  - Measured at 1440: count is 0 until dy≈0, 1 at dy 150, 4 at 450, 8 at 750, 13 at 1200, 16 at 1500. It unpins at dy≈1900.
- **Not pinned** (768 and below, or a short viewport): everything shows fully filled (`--fill` and `--progress` default to 1, count "16").
  - The layout stacks: the map becomes 2 columns (336px at 768, 147 at 390) with `gap: 24px 16px`, and the platform card goes below it.
  - Phone h2 is 38/39.52.

## 14. `showcase`

- Section: `padding: 48px 48px 96px`, bg #f8f9f7, DOM id `explore-valley`. The root is `.valley-showcase` with `--vs-accent: #376f9c`.
- Toolbar `.vs-toolbar`: bottom border 1px `rgba(35,62,80,.094)`, gap 24.
  - Tabs (`gap: 32px`): Dashboard, Playbooks, Prospects, AI Studio, Campaigns, Scout. Buttons are 15/20, `padding: 16px 0 20px`, #77848d; active is #1e3748.
  - Each tab has a 2px track at the bottom (active: `rgba(55,111,156,.15)`) with a `.vs-tab-progress` fill (accent, scaleX animated).
  - At the right, the "Play product tour" / "Pause product tour" button (147x44, bg #f4f7f1, border 1px #ccd8d3, 14px #667681, 13px play/pause glyph, hover bg #e6eee4).
- Intro `.vs-intro`: space-between with `padding: 26px 0 28px`. It holds the h3 (24/28.8 -0.6px w500 #203342, max about 440) and the description (15/21.75 #61717c, max 430). Per-tab text, verbatim from the component data:

| tab | title | description |
|---|---|---|
| Dashboard | Mission control for the world's best outbound. | See the work in motion, track pipeline generated, analyze results, and manage replies. |
| Playbooks | Pick a play. Valley does the outbound. | Start with a signal, an audience, or your own list. Valley brings prospecting, research, messaging, and follow-up into one workflow. |
| Prospects | Never a stale database. The best signals at your fingertips. | Your buyers are constantly changing and showing signal. Valley figures out who matters, why they matter & presents them to you. |
| AI Studio | AI Messaging trained by you, that sounds like you...      no em dashes | Give Valley your product, your writing style and the rules every draft should follow to craft unique messages, at scale, indistinguishable from a handwritten message. |
| Campaigns | One conversation. With warm prospects. Receiving incredible messaging. Across all channels. | Connect LinkedIn and email in a sequence that follows what happens next. |
| Scout | Your new AI Head of Outbound who never sleeps, misses a follow up, or forgets a signal. | Scout is an AI Agent that can conduct any action in Valley or any AI Tool via our MCP connector. Ask Scout to launch the best plays for you & then go do something else. |

- Stage `.vs-stage`: 1344x868 with `padding: 26px`. The background is `img/Qovuw4iQncZcQQ2Zp5FGwdvDJ5k.jpg` (cover).
  - `.vs-shell` app window: bg #f8faf9, border 1px #e9eeeb, radius 5, shadow `0 10px 35px -20px rgba(21,45,78,.5)`, `padding-top: 52px`.
  - `.vs-appbar`: 52 tall, bg `rgba(255,255,252,.91)`, bottom border. It holds the 22px mark plus "Valley / {Tab}".
  - JS sets the stage height per tab through `--vs-stage-height`: **640, 540, 560, 540, 620, 540px** (+40px when the component is narrower than 1100px). This applies only when the component is wider than 900px.
- Tab contents are full app mockups: Dashboard (sidebar, greeting, plan card, metrics, SVG pipeline chart, activity and leads), Playbooks (library cards with image headers), Prospects (a table of six people plus a detail panel), AI Studio (writing style and playground), Campaigns (a sequence flowchart), and Scout (chat plus campaign draft).
  - Every element's text, box and color is in `spec/states/showcase.txt`, with screenshots at `spec/screens/state_showcase_{0..5}.jpg`. Styles are under `.vs-*` in `components.css`.
  - Prospects table ("YOUR AUDIENCE / All prospects"; columns Name, Company, Signal, ICP-Fit), verified from the Prospects state:
    - Maya Chen (VP Revenue) · Fieldwork · Hiring AEs · High (avatar `KD64…jpg`)
    - Jordan Lee (Head of Sales) · Northline · New sales team · High (`rEmg…jpg`)
    - Alex Kim (Sales Director) · Forma · Hiring AEs · High (`OJmd…jpg`)
    - Sam Rivera (Founder) · Relay · New market · Medium (`W7yM…jpg`)
    - Drew Patel (VP Sales) · Plainview · Hiring SDRs · High (`0j48…jpg`)
    - Taylor Nguyen (Revenue Lead) · Gather · Team growth · Medium (`g9K3…jpg`)
  - Detail panel: Maya Chen / "High ICP-Fit", "Research Findings" / "Ready", COMPANY CAREERS PAGE "Fieldwork is hiring account executives", LINKEDIN · MAYA CHEN "“We’re building our sales team.”", WHY SHE FITS: Revenue leader · B2B software · Hiring sales roles.
  - Dashboard values: "$450,000" Potential pipeline (#294f61), "128" Interested replies (#507559), "12" Active campaigns (#996b50), all 38px tabular-nums.
- Responsive:
  - 768: tabs scroll horizontally (`overflow-x: auto`, no scrollbar; the active tab scrolls into view). Stage `padding: 18px`.
  - 390: stage `padding: 12px`, shell `padding-top: 43px`, stage about 1156 tall. Layouts collapse through `@container (max-width: 900px | 600px | 400px)`.

## 15. `integrations`

- `vgs` section with `padding: 88px 48px`. Header:
  - eyebrow "CONNECTED TO THE WAY YOU WORK"
  - h2 "Your tools. Valley’s entire workflow."
  - p "Use Valley from Claude or ChatGPT through MCP. Connect your CRM, build with the API, and keep your outbound in the tools your team already uses."
- `.vgs-integration`: 1344x514 at y+395, two columns (671/671), bg #fff, border 1px #d4dedb.
  - **Hub** (left, bg #eaf0ec, `padding: 48px 32px`):
    - center card (200x132, bg #fcfdf8, border 1px #cfdbd4, `padding: 22px`): 32px mark, "Valley" (26px w500), "Research · Outreach · Replies" (10px #576d68)
    - connector SVG `viewBox 0 0 500 200`, `preserveAspectRatio: none`, path `M250 0C250 100 70 70 70 200M250 0V200M250 0C250 100 430 70 430 200`, stroke #96b2a2. It's 607x96.
    - tool row 1 (3 columns, gap 12): "Claude / MCP", "ChatGPT / MCP", "HubSpot / CRM". Cards are 18px text with 11px #526d63 subtitles, bg #fff, border 1px #cddad3, `padding: 17px 9px`, centered.
    - row 2 (2 columns, transparent bg): "Your tools / API + webhooks", "LinkedIn + email / Connected accounts" (15px)
  - **Client** (right, `padding: 32px`):
    - tabs `.vgs-tabs` (gap 24, bottom border #d4dfd9): Claude, ChatGPT, API. Buttons are 16px, `padding: 10px 0 15px`, #52636c. Active is #19292e with a 2px bottom border #426f94. Click only, no autoplay, no transition.
    - panel: eyebrow (11px 0.88px #4d7182), prompt `p` (23/29.9 -0.46px), agent box (bg #f1f5ee, `padding: 20px`, gap 16, 32px mark plus 16/24 text), note (14/21 #52636c), CTA "Start with Valley →" (211x52, `.vgs-cta`) → signup
    - per-tab text:

| tab | eyebrow | prompt | agent reply | note |
|---|---|---|---|---|
| Claude | ASK IN CLAUDE | Find companies hiring for roles that signal a need for our product. Build a play and show me the plan before launch. | Research the signal, find the buyers, and prepare the play for your review. | Connect Valley to Claude with your workspace’s MCP address. You choose which actions connected tools can take. |
| ChatGPT | ASK IN CHATGPT | Show me the replies that need attention and draft a relevant follow-up for each. | Read the conversations, bring in their context, and prepare the next replies. | Connect Valley through ChatGPT’s custom MCP connector setup. You choose which actions connected tools can take. |
| API | ASK IN API | Your CRM → Valley API → researched prospects → your workflow | Connect prospect data, campaign actions and results to the tools your team already runs. | Use a workspace API key to connect your own tools and automations. You choose which actions connected tools can take. |

- Responsive: 1024 keeps 2 columns (463/463). 768 keeps 2 columns (335/335). At 390 it's 1 column, 1132 tall.

## 16. `team-fit`

- Wrapper `padding: 32px 48px`. `section.valley-team-fit`: bg #e8efef, border 1px #ccd8d8. `.vtf-shell` has `padding: 60px 64px 64px`.
- Header (column, gap 28):
  - eyebrow "FOR YOUR TEAM" (11px 0.99px #3d6575)
  - h2 "Built around the way you sell." (48/51.84 -1.824px)
  - tabs `.vtf-tabs`: bg #f8f9f7, border 1px #cad6d7, row gap 0. Buttons "Founders | Sales teams | Agencies" are 16/1.35, `padding: 13px 25px`, 48 tall, #4f6670, with a 1px left divider between them.
    - Selected: bg #dce7ec (dump shows #e3ebed while hovered) and color #244a65, plus a 2px `::after` underline (#315e8d, `scaleX(0 → 1)`, `transition: transform .18s`).
    - `transition: background .18s, color .18s`. Hover bg #e3ebed.
- Panel `.vtf-panel`: grid `minmax(0,1.12fr) minmax(0,1fr)` (593/549), gap 72 at 1440 (56 at 1280), `padding-top: 40` (36 at 1280). On every tab change it replays `vtf-arrive .24s ease` (from opacity .35, translateY 4px).
  - Left `.vtf-job`: h3 (38/43.32), p (19/29.45 #405862, max 563), note (13/19.5 #536e75).
  - Right `aside.vtf-case`: bg #f8f9f7, `padding: 32px 108px 32px 32px`, with a 68px-wide image strip on the right edge (`::after`, bg #b5cdd5 plus the image, left border). It holds:
    - eyebrow "{Company}, with Valley" (11px 0.715px uppercase #4a6571)
    - metric (46/49.68 -1.748px w500)
    - caption (16/23.2 #435b64)
    - person name (14/19.6 #2f4854) and role (12/16.8 #59717a)
    - link "See {Company}’s story →" (14px #315e8d, hover underline offset 4px)
- Tabs verbatim:

| tab | h3 | p | note | case eyebrow | metric | caption | person / role | link |
|---|---|---|---|---|---|---|---|---|
| Founders | Keep outbound moving.<br>Keep building your company. | Give Valley your offer, your ideal customer and your voice. Review the outreach it prepares, then spend your time on the conversations it starts. | A repeatable starting point for founder-led sales. | LINARCA, WITH VALLEY | 14 meetings | In the first month, from a single seat. | Roberto Arrieta / Founder, Linarca | See Linarca’s story |
| Sales teams | Give every rep a researched starting point. | Bring your team’s targeting and writing standards into the campaign. See why a prospect fits, review the message and keep the reply connected to its context. | Consistent preparation. More room for the human conversation. | GGWP, WITH VALLEY | $4M in pipeline | Generated within a quarter. | Tim O’Neil / Sales Leader, GGWP | See GGWP’s story |
| Agencies | A clear outbound process. For each client you serve. | Build each client’s offer, audience and writing style into their campaigns. Connect the research and sending, and keep your team focused on relevant conversations. | A repeatable service, with each client’s context intact. | THINKFISH, WITH VALLEY | 400 meetings per month | Booked for their clients. | Freizle Abarrientos / Chief Operating Officer, ThinkFish | See ThinkFish’s story |

- Case strip images per tab: see `spec/states/teamfit.txt` (`vtf-case ::after` bgi). These are `5WP0tI1lICNwC23waJVfpSCTTpE.png`, `DzF7ltBGreQELkgImDCaxxldqH0.jpg` and `zPOKyZnbl77fH6unSixkvRUOSOs.png`.
- Responsive:
  - 1280: h2 44/47.52.
  - 768: h2 39px and a 2-column panel (323/299, gap 32).
  - 390: h2 33/35.64, tabs become a 3-column grid (99px each), panel is 1 column.

## 17. `wall-of-love`

- `vgs` section with `padding: 88px 48px`. Header:
  - eyebrow "THE WALL OF LOVE"
  - h2 "Good outreach gets a response.<br>That's Valley."
  - p "Real words from the people doing the work."
- Metrics `.vgs-metrics`: 3-column grid with gap 40. Each item is an `a` (column):
  - `b` value (72/72 -3.24px w500, `padding-bottom: 24px`, bottom border 1px #cdd9d4)
  - `span` label (19/28.5)
  - `small` source (13px #427497)
  - Items:
    - "$1M+" / "Pipeline in the first 60 days" / "Bolt.new ↗" → Bolt.new case study
    - "3 hrs" / "Saved per rep, per day" / "Bolt.new ↗" → same
    - "400" / "Meetings monthly across 50 seats" / "ThinkFish ↗" → `/casestudies`
- Quotes `.vgs-quotes`: 3-column grid with gap 16 (2 rows at 1440: 338 and 366 tall).
  - Each `figure`: bg #fff, border 1px #d4dedb, `padding: 28px`, column space-between with gap 32.
  - blockquote: 20/28 -0.3px #1c292e.
  - figcaption: 52x52 avatar (radius 3) plus name (15 w500) and role (13 #52636c), gap 14.
  - Quotes in order:
    1. “A real response to a message Valley sent a prospect: “I was never considering anything until you reached out with a message that literally spoke to me.” The automation is great but the sauce within Valley is the messaging itself.” (Conrad de Claro, Director of Growth Marketing, GoCanvas; `TVJrBRufv5aW8aCK1AjoE8KR01s.png`)
    2. “Email and LinkedIn definitely work but the personalization requirements to make them work have just gotten higher. The new bar is being set by Valley. Go see it for yourself.” (Garrett Marker, CRO, Brex; `MPNLm2C5tToiVIBuk5qDNA6OQ.png`)
    3. “If you don't have an active, engaged LinkedIn pipeline and you have a clearly defined ICP and persona, you need to add Valley to your tech stack immediately to supplement your sales.” (Greg, Co-Founder, Kaster; `rwDafO1WYNHe1OHiQ1WlMneI4.jpeg`)
    4. “I'm able to come into those [pipeline review] meetings and be like, look at what I booked through Valley. You know, if my other kind of channels have slowed down, I'm like, but Valley, Valley's there.” (Angelene Perez-Vento, AE, Growth Protocol; `y05cyu6N0bAtOqCKI9X3XsvDxE.png`)
    5. “I would say to book me 14 meetings with qualified prospects in that traditional method could take me three months, two to three months amongst all the other things that I'm balancing. So you're thinking of shrinking it down from 90 days down to 20, which is absolutely wild.” (Brandon Kay, VP Sales, Gallea AI; `OYLLgql4PH7iAjFP1EIjtiqAe4.jpg`, a 4465x6694 original; serve it resized)
    6. “The messages it writes are actually really high-taste. I was really surprised by the personalization. I don’t want to be a bottleneck for those connection requests going out - it’s that good.” (Edmund Cuthbert, Founder at Superposition; `wAsP8kJymz9NP0e6K68bbPhJ0.png`)
- Link "Read the customer stories →" (16px #32658b) → `/casestudies`.
- Responsive: 1024 and 768 use 2 columns (456/456 and 328/328). At 768 the metrics stay 3 columns. At 390 quotes are 1 column and metrics are 3 narrow columns (103px each, gap 16).

## 18. `pricing-faq`, `closing-cta`, `footer`, cookie banner

### `pricing-faq`

- Wrapper `padding: 64px 48px`. Font "Valley Body Montreal".
- **Offer** `.vsq-offer`: 1344x505, bg #e8eff0, border 1px #d2dfe1, `padding: 40px`, 2-column grid (607/607), gap 48.
  - Left column:
    - eyebrow "MAKE YOUR NEXT CONVERSATION COUNT" (11px 0.605px uppercase #3375b4)
    - h2 "Start with one seat.<br>Put Valley to work." (44/47.52 -1.76px, max 450)
    - price row: "$199" (76/76 -4.56px w500) and "/ seat / month" (17px #52616a), gap 12, baseline-aligned
    - "Or $149/month, billed quarterly.<br>$447 every three months." (16/24 #52616a)
    - links row (gap 24):
      - `a.vsq-primary` "Start for free" (128x46, bg #1c292d, 16px #fff, `padding: 12px 22px`, hover #344b56, no transition) → signup
      - `a.vsq-secondary` "See plans →" (16px #3275b5, hover underline) → `/pricing`
    - "7-day trial for eligible new subscribers.<br>Payment method required." (13/19.5 #596770)
  - Right `.vsq-included` (`padding-top: 12px`):
    - h3 "Included in every plan." (23/27.6 -0.575px)
    - four `li` (`padding: 15px 0`, bottom border 1px #dce2e1 except the last, gap 14, 18px check SVG stroke #507466, 17/23.8 text):
      - Find prospects through plays or your own lists.
      - Qualify and research the people worth reaching.
      - Write in your voice. Review before sending.
      - Follow up on LinkedIn. Add email when you need it.
    - note "One seat connects one LinkedIn account.<br>Email sending, priority Slack support, and an onboarding call are optional add-ons on this plan. Discovery and enrichment use credits." (14/21 #5b6870)
- **FAQ** `.vsq-faq`: margin-top 64 (y 14998), bg #fff, border 1px #d6dede, `padding: 40px`, grid 467/747 with gap 48.
  - Left: h2 "Questions,<br>answered." (40/43.2 -1.6px) and p "The practical details before your first campaign." (18/26.1 #52616a).
  - Right: six native `<details>`, each with a bottom border 1px #cfd8d8 (the first also has a top border).
    - `summary`: 20/1.3 -0.02em w500, `padding: 21px 0`, gap 24, with a 28x28 "+" (22px #547997).
    - `[open]` rotates the plus 45deg. There's no transition declared, so it snaps.
    - Answer `p`: 17/1.55 #4a5b64, `padding: 0 34px 24px 0`, max 660.
    - Q&A are in `spec/states/faq.json`:
      1. What do I need to get started? / Tell Valley what you sell, who you sell to and how you write. Choose a play or bring your own list, connect your sending accounts, then review the outreach before launch.
      2. Can I review and edit the messages? / Yes. Review, edit and approve drafts before they go out. You choose the sending schedule and follow-up steps for your campaign.
      3. Does Valley send email as well as LinkedIn messages? / Yes. Combine email and LinkedIn in the same sequence. Email sending is an optional add-on on the base plan; the middle and upper plans include 1,000 email messages per month. Connect your Gmail or Microsoft inbox to send.
      4. Which plan includes email and priority support? / Starter is $199/month or $149/month billed quarterly. Email sending, priority Slack support, and an onboarding call are optional add-ons. Plus, at $299/month or $249/month billed quarterly, includes 1,000 email messages per month, a priority support Slack group, and an onboarding call. Growth includes these benefits plus $300 in monthly credits.
      5. What uses credits? / Finding new prospects, finding and verifying email addresses, and upgraded message generation use credits. Research, base message writing, imports and LinkedIn sending are included in the subscription.
      6. How does the free trial work? / Eligible new subscribers get a 7-day trial. A payment method is required. Cancel before the trial ends to avoid starting the paid subscription.
- Responsive:
  - 768: offer `padding: 28px`, 2 columns (319/319), h2 36px.
  - 390: offer `padding: 24px 20px`, 1 column, h2 34px. FAQ is 1 column, h2 32px, summary 18px.

### `closing-cta`

- `section.vcc`: bg #f7f9f7, `padding: 40px 48px 64px`.
- `.vcc-scene` (max 1360, 1344x662) uses the gradient and image background from section 5, plus the bottom 10px image strip.
- `.vcc-content` (`padding: 88px 48px 30px`), all centered:
  - eyebrow "A NEW WAY TO REACH YOUR NEXT CUSTOMER" (12px 1.44px uppercase #426e73)
  - h2 "Your people are out there." with a second line span "Let Valley find them." (#476b60); clamp(38px,4.6vw,66px), lh 1.03, -0.04em
  - p "Start with your work email. Turn the right signals into relevant conversations, in your voice." (21/31.5 #4e6262, max 650)
  - form `.vcc-fields`: grid `468px 200px`, gap 12, align end, 680 wide, centered
    - label "Work email" (13px #354b4c) above the input
    - input: 58 tall, placeholder "you@company.com", 17px #172a2e, bg `rgba(255,255,255,.93)`, border 1px #b5c5be, `padding: 14px 18px`
    - button "Start for free →" (200x58, bg #1c292e, border 1px #1c292e, 17px #fff, arrow 23px, hover bg #344f4a, `:disabled` opacity .72)
  - under the form: "Next, create your free account." and a "Privacy policy" link (13px #566a61) → `/privacy-policy`
  - `.vcc-bottom`: top border 1px `rgba(172,191,184,.4)`, `padding-top: 22px`, space-between: "Find your people." · "Give them a reason to reply." (13px #536961)
- Form behavior:
  - Personal domains (gmail.com, yahoo.com, outlook.com, icloud.com, proton.me and so on; the full list is in the component) are rejected with "Please use your company email address, rather than a personal inbox such as Gmail."
  - While submitting it shows "Saving your details…". It posts to Surface (form `cmf7e6uw600amlb0cmoloma5b`) and then does `location.assign("https://beta.joinvalley.co/signup")`.
  - On failure: "We couldn’t save your details. Please try again, or continue directly to signup below."
  - The clone can just validate and redirect.
- Responsive:
  - 1280: h2 58.88.
  - 768: h2 38, fields 1 column (654 wide).
  - 390: h2 40/41.2, fields 1 column with gap 18.

### `footer`

- `footer.vf`: bg #1c3036. `.vf-inner` has `padding: 64px 48px 28px`.
- `.vf-top`: grid 747/533, gap 64, `padding-bottom: 48px`, bottom border 1px `rgba(255,255,255,.19)`.
  - Left: h2 "Find your people.<br>Give them a reason to reply." (44/49.28 -1.54px w500 #f8f9f7) and p "Find, qualify, research, and reach your next buyers across email and LinkedIn." (19/28.5 #c2d0d2, max 570).
  - Right, `.vf-actions` flex-end with gap 16:
    - "Start for free →" (152x52, bg #f8f9f7, color #1c3036, border 1px #f8f9f7, `padding: 15px 22px`, 17px) → signup
    - "Book a demo" (ghost, border 1px #718589, color #f8f9f7) → Surface demo URL
- `.vf-links`: grid 514/367/367, gap 48, `padding: 44px 0`.
  - Brand: 38px mark (`svg/23-footer-logo-mark.svg`, fill #f8f9f7) plus "Valley" (30px -1.05px w500), then p "Your outbound team.<br>One connected platform." (15/22.5 #bbcdce), then `hey@joinvalley.co` (12px, mailto).
  - Nav 1 (column, gap 14): title "EXPLORE VALLEY" (12px 0.72px #9eb6ba), then Product `/product`, Customers `/casestudies`, Agencies `/linkedin-outreach-for-agencies`, Pricing `/pricing` (16px #f8f9f7).
  - Nav 2: title "LEARN MORE", then Resources `/blog`, All articles `/blog/archive`, About Valley `/about`, Log in (beta login).
- `.vf-bottom`: top border 1px `rgba(255,255,255,.19)`, `padding-top: 24px`, space-between. "© Valley. All rights reserved." on the left and "Privacy policy" `/privacy-policy` · "Terms of service" `/terms-of-service` (gap 24) on the right, all 13px #b4c7c9.
- All footer links underline on hover (`.vf a:hover`). Focus is 2px #b1d8f2 with offset 5.
- Responsive:
  - 768: `padding` about 28px sides, top block 1 column (gap 28), h2 38/42.56, links grid 249/207/207.
  - 390: h2 33/36.96, links grid 2 columns (155/155), brand block spans the full width above.

### Cookie banner (optional)

Framer consent component. Banner "We use cookies" / "To run the site, understand what's working, and (if you let us) tailor what you see." with **Reject** and **Accept** buttons, inset 24px bottom-left, `padding: 24px`. It enters with a spring (stiffness 500, damping 60, from y+10). After a choice it shrinks to a 24px cookie-icon button bottom-right (`svg/25-cookie-button.svg`). Not needed for the study clone.

## 19. Interaction states (summary)

Transition timings are exact CSS. "Spring" values are Framer configs from the site's modules.

| Element | Hover | Focus-visible | Active / selected | Transition |
|---|---|---|---|---|
| Nav text links | label rolls up 20px (duplicate copy) | - | - | spring (bounce .2, ~.4-.6s; settles ~300ms) |
| Nav Product summary | - | 2px #39729c, offset 4 | chevron rotate(180deg) when open | transform .15s |
| Dropdown links | bg #eef3ef | inherits | - | none |
| Hero Primary button | opacity 1 → .82 | - | - | spring bounce .2 dur .4 (measured .82 in ~120ms) |
| Hero Secondary button | bg #fff → #e9f5ff | - | - | same spring |
| Nav CTA "Start for free" | no measurable change | - | - | - |
| Logo cell with dot | tooltip fades in above | - | - | spring bounce .2 dur .4 |
| Hero tabs | opacity .7 → 1 | 1px #fff9e6, offset 3 | bg #f6f6ee, text #21393a | opacity .15s |
| Stories "Start for free" | bg #111 → #2c383c | 2px #376f9c, offset 5 | - | background-color .15s |
| Stories arrows | bg → #eaf0ed | same | - | background-color .15s |
| Stories Play/Pause | color → #376f9c | same | - | none |
| Stories "Read … story" | underline | same | - | none |
| `vgs` CTA | bg → #344e57 | 3px #3476a7, offset 4 | - | none |
| `vgs` text links | underline, offset 5px | same | - | none |
| Step nav links | - | same | aria-current: #1c292e, border #356c93, arrow visible | none |
| `vgs` tabs | - | same | #19292e + 2px #426f94 underline | none |
| Jobs "Start free trial" | bg → #344f4a | 3px #467aa9, offset 4 | - | none |
| Jobs "Explore the plans" | bg → #29434a | 2px #6cb3eb, offset 4 | - | none |
| Jobs toggle | - | same | bg #fff, #1b363f | none |
| Showcase tour button | bg → #e6eee4 | 2px accent, offset 4 | label toggles Play/Pause | none |
| Team-fit tabs | bg → #e3ebed | 2px #315ea0, offset 5 | bg #dce7ec, #244a65, underline scaleX(1) | bg/color .18s, underline transform .18s |
| Team-fit case link | underline, offset 4 | same | - | none |
| Pricing primary | bg → #344b56 | 2px #3275b5, offset 5 | - | none |
| Pricing "See plans" | underline | same | - | none |
| FAQ summary | - | same | plus rotate(45deg) | none |
| Closing CTA button | bg → #344f4a | 3px #3c78a1, offset 4 | disabled opacity .72 | none |
| Footer links | underline | 2px #b1d8f2, offset 5 | - | none |

## 20. Motion (summary)

| # | What | Trigger | Spec |
|---|---|---|---|
| 1 | Hero scene autoplay | on mount; runs only while the hero visual is intersecting (IO threshold 0), the tab is visible, and reduced motion is off | 5 scenes, **5000ms each**, loops. rAF accumulates elapsed time; `--vhv-progress = elapsed/5000` (linear) drives the active tab fill `scaleX`. Clicking a tab (or arrow keys, Home, End) jumps to that scene and **stops autoplay**. The play button toggles it. When paused, the active track bg is #fff9e6. |
| 2 | Hero scene enter | on scene change | `.vhv-card` `vhv-card-in` .48s cubic-bezier(.22,1,.36,1) .08s both (from opacity 0, translateY 10px). `.vhv-thread` `vhv-thread-in` .35s .15s (scaleY .2 → 1, origin top). `.vhv-reveal` items `vhv-detail-in` .35s, delay `.18s + var(--i)*.07s` (translateY 4px → 0); the six Research chips measured at .18/.215/.25/.285/.32/.355s and the brief card at .39s. The source heading animation (`vhv-source-in`) is overridden to `none` on this page, so the heading and the background art swap instantly. |
| 3 | Hero proof sync | hero dispatches the `valley:hero-scene` event | the proof story with the same index becomes active: opacity/visibility .3s |
| 4 | Logo dot blink | always | opacity 1 → 0 → 1, 2s loop, `cubic-bezier(.5,0,.88,.77)` per 1s half |
| 5 | Logo tooltip | hover | opacity 0 → 1, spring (bounce .2, .4s), no transform |
| 6 | Stories autoplay | while intersecting (threshold 0), tab visible, no reduced motion | **7000ms per slide**, loops over 4. `--vcr-progress` is linear and fills the active tab underline. The new slide plays `vcr-reveal .35s ease` (opacity 0, translateY 5px → 0). Tabs and arrows reset progress to 0; autoplay continues unless Pause is pressed. |
| 7 | Endorsement pin + word fill | scroll | see section 11 (290vh, sticky top 88, word-fill formula) |
| 8 | Endorsement scroll cue | always | `ve-scroll-pulse 2.4s ease-in-out infinite` |
| 9 | Step nav highlight | scroll | active = last article with top < 45% viewport; instant |
| 10 | Jobs pin + fill | scroll | see section 13 (310vh, sticky top 88, 16 tiles fill left-to-right via `scaleX(--fill)`, counter, progress bar) |
| 11 | Showcase autoplay | while ≥ 12% visible, tab visible, no reduced motion | **6000ms per tab**, loops over 6. WAAPI `animate([{scaleX(0)},{scaleX(1)}], {duration:6000, easing:'linear', fill:'forwards'})` on `.vs-tab-progress`; onfinish goes to the next tab. Clicking a tab stops autoplay. The "Play/Pause product tour" button toggles it. |
| 12 | Showcase panel enter | on tab change | `.vs-enter` elements run `vs-appear .55s cubic-bezier(.22,1,.36,1) both` with `animation-delay: var(--delay, 0ms)` (opacity 0, translateY 14px → 0). The Campaigns flow lines `.vs-line` draw with `vs-connect 1.1s cubic-bezier(.22,1,.36,1)` (stroke-dasharray 1800, offset 1800 → 0). |
| 13 | Team-fit panel | on tab change | `vtf-arrive .24s ease both` (opacity .35, translateY 4px → 0) |
| 14 | Mobile menu | hamburger click | Framer variant change, spring stiffness 400 / damping 50 / mass 1 (height 68 → ~456 in ~500ms; bars morph to an X) |
| 15 | Nav link roll | hover | see section 7 |

There are no marquees or tickers, no parallax (endorsement and jobs art are static inside their sticky stages), no Lottie, no video on this page, and no scroll-triggered fade-ins on generic content.

## 21. Could not capture / ambiguities for Build

1. **The Surface "Book a demo" modal** is a third-party iframe (`forms.withsurface.com`), so it was not recreated. Link to the URL instead.
2. **Cookie banner**: Framer's third-party consent UI. I captured its text and behavior only, not the full styles.
3. **Framer spring curves**: the springs above are the literal configs found in the site's modules. Framer's `bounce/duration` spring resolves to physics internally, and I didn't reproduce the exact per-frame curve. In CSS, `cubic-bezier(.34,1.3,.64,1)` over about 350ms is a close approximation for the hovers. Better, since framer-motion is allowed as a dependency, use `{type:'spring', bounce:.2, duration:.4}` directly.
4. **Logo alt text doesn't match the images** in two places. `3UCjPMpY3Nkuy1xoJaCCN3TKJk.png` has alt "UiPath" but shows the **klaar** wordmark. `Bx6e2ANj69WlGVSGixBWFjy4WY.png` has alt "Ridge" but shows **Gallea Ai**. Use the image and fix the alt.
5. **Mixed quote styles**: the logos h2 copy differs between desktop ("HeyReach, Expandi, and Lemlist.") and tablet/phone ("HeyReach, Expandi and lemlist."). Several quotes mix straight `'` and curly `’`. The copy in this spec is verbatim; keep it as is.
6. **Showcase mockups** (6 tabs) and **hero scenes** (5) are very detailed. The per-element numbers are in `spec/states/*.txt` and the CSS in `spec/components.css`, but the pipeline-chart SVG path and the Campaigns flow SVG geometry are captured only as exported SVG files (`svg/19-showcase-pipeline-chart.svg`, `svg/49-showcase-sequence.svg`). Those files hold the Dashboard/Campaigns paths as rendered at 1440.
7. **Responsive internals of code components**: I measured 1440/1280/1024/768/390. Intermediate widths follow the `@container` rules in `components.css`, which I didn't sample one by one.
8. **The `backdrop` fixed image** (`RnDHaOXCu7…png`) is present in the DOM but is never visible. It can be omitted.
9. **Showcase tab bodies**: the tables above list the key copy. For every remaining label inside the six app mockups, read `spec/states/showcase.txt`; it is the verbatim source.
10. **Unused preloads**: 16 small images (15 PNGs and 1 SVG) are fetched by the page but never rendered on the home route (probably Framer prefetching for other routes). They are parked in `public/assets/img/_unused/` for completeness.
