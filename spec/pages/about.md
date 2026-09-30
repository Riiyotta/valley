Source: https://www.joinvalley.co/about

# /about: clone spec

Measured from the live page on 2026-09-29 with headless Chromium (Playwright) at 1440x900, 1280x900, 768x900 and 390x844, cookie banner hidden. Global rules (fonts, tokens) are in `/Users/riyaghosh/V3/Valley/CLONE_SPEC.md`.

## 0. Files

- `spec/pages/about/dumps/dump_{1440,1280,768,390}.txt` (per-element geometry and styles), `sections_*.json`, `media_*.json`, `reqs_*.json`, `texts.json`, `svgs.json`, `meta.json`, `listeners.json`, `css_raw.json`.
- No `components.css`: apart from the shared nav/footer this page is built from plain **Framer layers** (no Valley code components), so all styling is in the dumps (computed styles).
- `spec/pages/about/states/interactions.txt` (hover measurements).
- `spec/pages/about/screens/full_{1440,1280,768,390}.jpg`.
- `spec/pages/about/source/IOQaE9l8…mjs`: page module (reference).
- `spec/pages/about/ASSETS.md`: 11 new PNGs (10 signatures + backer logo), the Geist Mono font and 13 extracted SVGs.

## 1. Page skeleton, breakpoints

- Framer breakpoints 1200 / 810 (same as the homepage). The 768 and 390 layouts are the same Phone variant.
- Page bg #f8f9f7 (inherited). Gutters 48px (1440/1280), 20px (768/390).

| id | Framer layer / component root | position | 1440 y / h | 1280 y / h | 768 y / h | 390 y / h |
|---|---|---|---|---|---|---|
| `nav` | Large Desktop / `.vpm` | fixed | 0 / 84 | 0 / 84 | 0 / 68 | 0 / 68 |
| `about-hero` | Frame 2085663185 (Framer layer) | relative | 0 / 624 | 0 / 624 | 0 / 658 | 0 / 658 |
| `mission` | Frame 2085663181 (Framer layer) | relative | 696 / 827 | 696 / 858 | 706 / 1242 | 706 / 1638 |
| `team` | Frame 2147223576 (Framer layer) | relative | 1571 / 1281 | 1602 / 1281 | 1996 / 2434 | 2392 / 2442 |
| `backers` | Frame 2147223575 (Framer layer) | relative | 2852 / 461 | 2883 / 461 | 4430 / 242 | 4834 / 242 |
| `hiring` | Frame 2085663186 (Framer layer) | relative | 3312 / 768 | 3343 / 768 | 4671 / 250 | 5076 / 250 |
| `footer` | Desktop / `.vf` | relative | 4080 / 597 | 4111 / 597 | 4921 / 643 | 5326 / 815 |


Document height: 4677px at 1440, 4708px at 1280, 5564px at 768, 6141px at 390.

| id | Status |
|---|---|
| `nav` | **Reuse homepage `Nav`** + on-load appear (Motion). |
| `about-hero` | **New** Framer block: image banner with centered-left headline. |
| `mission` | **New**: 2-column bordered panel (art card + letter). |
| `team` | **New**: "Our team" heading + 2-column bordered grid of 12 signature cells. |
| `backers` | **New**: heading + one wide logo image. |
| `hiring` | **New**: image banner with headline and two buttons. |
| `footer` | **Reuse homepage `Footer`**. |

There is no closing CTA on this page. A zero-height `#navswitch` marker div (absolute, y=464, 84 tall) exists in the tree; it paints nothing.

## 2. Sections

### `about-hero`
- Wrapper `padding: 132px 48px 0` (768/390: `112px 20px 0`). Panel "Frame 2147223570": 1344x492 (768: 728x546; 390: 350x546), bg **#1a3037**, radius 0.
- Background image `assets/img/5Elg5B9vPo2Xblz2XfnsvZzgqlA.png` (existing; 1536x768 painted valley), `object-fit: cover`, on a layer with **opacity .62** over the #1a3037 fill.
- Text block (absolute, bottom area: at 1440 x=48..1392, y 348–584, `padding: 0 32px`, flex column gap 24, left aligned; 768/390: centered text, `padding: 0 20px`):
  - Tag "A NEW YORK SALES OS COMPANY": box `padding: 6px 12px` with a 1px #fff border (`::after`), text **Geist Mono Regular 12/14.4 #fff** (font `assets/pages/about/fonts/Lmb0Q1R6W4GsaGVtHGnTyQsZCY.woff2`).
  - h1 "Augmenting Sales Intelligence for the Next Generation": PPNM Medium **56/62.72, ls -1.68px**, #fff, max 960 (768/390: h2 38/42.56 ls -1.14, centered).

### `mission`
- Wrapper `padding: 0 48px`, margin-top 72 from the hero (y 696). Row: flex, gap 0, 1344x827 at 1440 (1280: 858 tall).
- Left art card 538x827 (1280: 474): `padding: 24px`, 1px `rgba(0,0,0,.25)` border (`::after`). Inside: the same valley PNG stretched (`object-fit: fill`) 490x779, and a "Group" of 7 black SVG shapes with **`mix-blend-mode: hard-light`** (files `svg/01…07-mission-*.svg`; positions in the dump).
- Right letter column 806 wide (1280: 710): border 1px `rgba(0,0,0,.25)` except the left side; padding 32, column gap 24:
  - h2 "Built by the outbound-obsessed." PPNM Medium **40/44.8 ls -1.2px** #1c292d (768/390: 30/33.6 ls -0.9).
  - 5 paragraphs PPNM Variable **20/31** #4e606a; inline "Valley" links #002669 (hover: color #000 + underline, instant).
  - Signature block: a 221x75 hand-signature (SVG data-URI background, in the dump) then an "Ordered List" footer row (`padding: 24px`, top border 1px `rgba(0,0,0,.25)`): "Zayd Ali" / "CEO @" + link "Valley", **Geist Mono Regular 16/16 `rgba(0,0,0,.5)`** (link #002669).
- 768/390: stacked (art card 495 tall on top, letter below).

### `team`
- Wrapper `padding: 0 48px`, column gap 24. Heading row `padding: 24px 0`: "Our team" PPNM Medium 40/44.8 ls -1.2 (768/390: 30/33.6).
- Grid: 2 cols x 672 (1280: 592), gap 0; 768/390: single column. 12 cells, each 194 tall, `padding: 24px`, column gap 24, justify center, 1px `rgba(0,0,0,.25)` borders (`::after`; top/left/right, last row also bottom), producing a ruled table.
  - Signature art at **opacity .5**: PNG images or inline SVG (`svg/08-team-157x73.svg`, `svg/10-team-296x48.svg`); several have a static `translateY(-24…-40px)` offset exactly as measured (see dump; they are not animated).
  - Row: role `p` PPNM Medium **24/24 w400 `rgba(0,0,0,.5)`**, and a 40x40 LinkedIn button (`padding: 8px 12px`, bg `rgba(0,0,0,.05)`, 22x22 icon #39779a; `svg/09-team-22x22.svg`). **Hover: icon grows 22 → 24px and turns `rgba(0,0,0,.8)`** (instant at the 30ms sample).
  - Roles in order: CEO & Founder · Head of Frontend · Head of Backend · Head of CX · Software Engineer · Design Lead · Software Engineer · Founding Customer Experience · Customer Support · Customer Support · (2 more, see copy). LinkedIn targets in §4.

### `backers`
- Wrapper `padding: 72px 48px` (768/390: 48px 20px), column gap 32. h1 "Backed by great partners" PPNM Medium 40/44.8 ls -1.2 (768/390: 30/33.6).
- Logo strip: 1152x240 image `assets/pages/about/NhkTWgcyjDvBUlCEbsiXQaQ2Yk.png` (3702x723, `object-fit: cover`), left/right 1px `rgba(0,0,0,.25)` borders, centered (x=144 at 1440). No hover.

### `hiring`
- Wrapper `padding: 0 48px` (768/390: `0 20px`); panel 1344x768 (768/390: 250 tall), bg #1a3037 with the valley PNG at opacity .62 (`fill`).
- Content bottom-left at desktop (x 88, y 3904; column gap 32), centered at 768/390:
  - "Valley is growing." PPNM Medium 56/62.72 ls -1.68 #fff (768/390: 38/42.56).
  - Buttons (gap 8, 40 tall, `padding: 8px 12px`, gap 4, 16x16 arrow icons): "Explore Roles" bg #fff, text #000, `backdrop-filter: blur(2px)` → https://www.linkedin.com/company/joinvalley/; "Contact Us" bg `rgba(0,0,0,.25)`, text #fff → mailto:support@joinvalley.co. Text PPNM Medium 16/16. No hover change measured. 768: each 287 wide; 390: stacked/wrapped (see dump).

## 3. Interaction states and motion

| Element | Hover | Transition |
|---|---|---|
| Mission inline "Valley" link | #002669 → #000 + underline | none |
| Team LinkedIn button | icon 22 → 24px, #39779a → rgba(0,0,0,.8) | none measured (Framer variant swap) |
| Explore Roles / Contact Us / team cell / backer logo | none | - |

Motion: only the **nav appear on load** (`{opacity:.001, y:-79}` → rest, tween .5s `cubic-bezier(.55,0,.14,1)`; sampled y -76 at 178ms, -8 at 404ms, 0 at 617ms after DOMContentLoaded). No other appear, scroll, marquee or autoplay effects (all Framer transforms on the page were stable over time; the signature offsets are static).

## 4. Verbatim copy

#### `about-hero` verbatim innerText (1440)

```text
A NEW YORK SALES OS COMPANY

Augmenting Sales
Intelligence for the
Next Generation
```

#### `mission` verbatim innerText (1440)

```text
Built by the outbound-obsessed.

The game has changed for sales reps. Prospects are seeing through templated “spray and pray” outbound sequences — or worse, not seeing them at all. Volume-based outreach & robotic sales reps are dead.

Today’s best reps are running an outbound playbook built on personalization, relevance, and timing. We built Valley to help businesses like yours scale & automate the complex world of what’s required to run a profitable outbound motion today.

It used to take an army of SDRs to achieve hyper-personalization at scale. We designed Valley to be your army of one. It’s a single AI-led outbound engine that understands your product, clones your voice, and learns all about your prospects — then fills up your sales calendar to prove it.

Valley is the hyper-personalized AI sales rep that books you quality meetings while your team does literally anything else.

Signed

Zayd Ali

CEO @Valley
```

#### `team` verbatim innerText (1440)

```text
Our team

CEO & Founder

Head of Frontend

Head of Backend

Head of CX

Software Engineer

Design Lead

Software Engineer

Founding Customer Experience

Customer Support

Customer Support

Executive Assistant

Head of Growth
```

#### `backers` verbatim innerText (1440)

```text
Backed by great partners
```

#### `hiring` verbatim innerText (1440)

```text
Valley is growing.

Explore Roles

Contact Us
```

## 5. Links

| section | link text | href (as authored) | type | resolved |
|---|---|---|---|---|
| mission | Valley | `https://joinvalley.co/` | internal | / |
| mission | Valley | `./` | internal | / |
| team | (icon/image link) | `https://www.linkedin.com/in/zayd-syed-ali-4201101a9/` | external | https://www.linkedin.com/in/zayd-syed-ali-4201101a9/ |
| team | (icon/image link) | `https://www.linkedin.com/in/alex-builds-stuff/` | external | https://www.linkedin.com/in/alex-builds-stuff/ |
| team | (icon/image link) | `https://www.linkedin.com/in/arimgibson/` | external | https://www.linkedin.com/in/arimgibson/ |
| team | (icon/image link) | `https://www.linkedin.com/in/catherinemccollian/` | external | https://www.linkedin.com/in/catherinemccollian/ |
| team | (icon/image link) | `https://www.linkedin.com/in/olamidesamuel/` | external | https://www.linkedin.com/in/olamidesamuel/ |
| team | (icon/image link) | `https://www.linkedin.com/in/skeshav628/` | external | https://www.linkedin.com/in/skeshav628/ |
| team | (icon/image link) | `https://www.linkedin.com/in/mrgawde/` | external | https://www.linkedin.com/in/mrgawde/ |
| team | (icon/image link) | `https://www.linkedin.com/in/zubeir-said/` | external | https://www.linkedin.com/in/zubeir-said/ |
| team | (icon/image link) | `https://www.linkedin.com/in/bmpcompas/` | external | https://www.linkedin.com/in/bmpcompas/ |
| team | (icon/image link) | `https://www.linkedin.com/in/chad-hizon/` | external | https://www.linkedin.com/in/chad-hizon/ |
| team | (icon/image link) | `https://www.linkedin.com/in/%F0%9F%97%BB-anna-vecera-%F0%9F%97%BB-887021206/` | external | https://www.linkedin.com/in/%F0%9F%97%BB-anna-vecera-%F0%9F%97%BB-887021206/ |
| team | (icon/image link) | `https://www.linkedin.com/in/shubhagrawal/` | external | https://www.linkedin.com/in/shubhagrawal/ |
| hiring | Explore Roles | `https://www.linkedin.com/company/joinvalley/` | external | https://www.linkedin.com/company/joinvalley/ |
| hiring | Contact Us | `mailto:support@joinvalley.co` | external (mailto) | mailto:support@joinvalley.co |

Internal links outside the known routes (/, /pricing, /product, /about, /compare, /playbooks): none.

## 6. Could not capture / notes

1. The mission signature is a CSS data-URI background (221x75) in the live page; it was decoded to `public/assets/pages/about/svg/13-mission-signature-221x75.svg`.
2. Alt texts on the signature images are SEO strings that do not match the people (e.g. "Valley AI logo…"); copy the images, write proper alts.
3. The two inline "Valley" links in the mission copy point to `https://joinvalley.co/` and `./` (both the homepage).
