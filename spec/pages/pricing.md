Source: https://www.joinvalley.co/pricing

# /pricing: clone spec

Measured from the live page on 2026-09-29 with headless Chromium (Playwright), viewports 1440x900, 1280x900, 768x900 and 390x844 (DPR 1), with the cookie banner hidden. Values come from `getComputedStyle`/`getBoundingClientRect`, the live CSSOM and the page's Framer module. Shared rules (fonts, the "PP Neue Montreal renders as Inter" quirk, tokens) are in `/Users/riyaghosh/V3/Valley/CLONE_SPEC.md` and are not repeated.

## 0. Files

- `spec/pages/pricing/dumps/dump_{1440,1280,768,390}.txt`: per-element geometry + computed styles per section (same line format as the homepage dumps).
- `spec/pages/pricing/dumps/sections_*.json`, `media_*.json`, `reqs_*.json`, `texts.json` (verbatim text + links), `svgs.json`, `meta.json`, `listeners.json`, `css_raw.json`, `vp-plans_quarterly.html`.
- `spec/pages/pricing/components.css`: verbatim CSS of the one new code component (`.vp-*`). Shared components are omitted there because their rules are byte-identical to `spec/components.css`.
- `spec/pages/pricing/states/plans_toggle.json` (Monthly vs Quarterly copy), `states/interactions.txt` (hover/focus/timing measurements).
- `spec/pages/pricing/screens/full_{1440,1280,768,390}.jpg`, `state_plans_monthly_1440.jpg`, `state_plans_quarterly_1440.jpg`.
- `spec/pages/pricing/source/3CeIl…mjs`: the page's Framer module (contains the `.vp` component source and the appear-animation configs), reference only.
- `spec/pages/pricing/ASSETS.md`: asset list.

## 1. Page skeleton, breakpoints

- Framer page breakpoints for this route are **different from the homepage**: Phone `<=809.98`, Tablet `810–1279.98`, Desktop `1280–1679.98`, Large Desktop `>=1680` (from the page module). 1440 and 1280 therefore render the same "Desktop" page variant. The nav component still uses its own breakpoints (Large Desktop header at >=1200, `Phone - Close` below), exactly like the homepage.
- body/sections bg `#f8f9f7`. An absolutely positioned full-height `BG Grain` layer exists in the Framer tree but paints nothing visible; skip it.
- Side gutter 48px at 1440/1280, 20px at 768/390 (Framer sections); the `.vp-plans` wrapper has `padding: 48px` (desktop) / `32px 20px` (768, 390).

### Section map

| id | Framer layer / component root | position | 1440 y / h | 1280 y / h | 768 y / h | 390 y / h |
|---|---|---|---|---|---|---|
| `nav` | Large Desktop / `.vpm` | fixed | 0 / 84 | 0 / 84 | 0 / 68 | 0 / 68 |
| `pricing-hero` | Hero Section (Framer layer) | relative | 0 / 394 | 0 / 394 | 0 / 265 | 0 / 402 |
| `plans` | pricing-three-plans / `.vp-plans` | relative | 394 / 1289 | 394 / 1289 | 265 / 2604 | 402 / 2808 |
| `spacer` | Spacer (Framer layer) | relative | 1683 / 32 | 1683 / 32 | 2869 / 32 | 3210 / 32 |
| `studios` | Get Early Access Banner (Framer layer) | relative | 1715 / 608 | 1715 / 608 | 2901 / 500 | 3242 / 620 |
| `proof` | Logos + Case Study Popup / `.valley-customer-results` | relative | 2323 / 552 | 2323 / 552 | 3401 / 583 | 3862 / 897 |
| `calendar` | Calendar Section (Framer layer) | relative | 2875 / 1169 | 2875 / 1169 | 3984 / 1100 | 4759 / 1136 |
| `faq` | pricing-questions-current / `.valley-start-questions` | relative | 4044 / 605 | 4044 / 605 | 5084 / 592 | 5895 / 735 |
| `footer` | Desktop / `.vf` | relative | 4649 / 597 | 4649 / 597 | 5676 / 643 | 6629 / 815 |


Document height: 5246px at 1440, 5246px at 1280, 6319px at 768, 7444px at 390.
### Reuse vs new

| id | Status |
|---|---|
| `nav` | **Reuse homepage `Nav`** (identical DOM/styles; only difference: on this page the fixed nav wrapper plays a Framer *appear on load*, see Motion). |
| `pricing-hero` | **New** (Framer layer, simple centered text block). |
| `plans` | **New code component** `.vp-plans` (3 plan cards + billing toggle + "Scale" row). |
| `spacer` | 32px empty section, bg #f8f9f7. |
| `studios` | **New** Framer banner "Valley Done-For-You" with image background and waitlist form. |
| `proof` | **Reuse homepage `Stories` carousel** (`.valley-customer-results`, CSS identical) **without its header** (no h2/sub; the homepage wrapper "Your outbound keeps moving" is absent). New outer wrapper: `section` padding `64px 48px`, bg #f8f9f7, `::after` 1px inset border `rgba(0,0,0,.07)`. Card itself unchanged (1344x424 at 1440). Make the header a prop. |
| `calendar` | **New** Framer section with HubSpot meetings iframe. |
| `faq` | **Reuse homepage `PricingFaq`'s FAQ half only** (`.vsq-faq`; CSS identical). The `.vsq-offer` block is not rendered here. Outer wrapper padding `48px` (homepage: `64px 48px`). Make offer optional. |
| `footer` | **Reuse homepage `Footer`** (identical). |

There is no closing-cta (`.vcc`) on this page.

## 2. `pricing-hero`

- `section` padding `0 48px` (768/390: `0 20px`), bg #f8f9f7, overflow hidden. Inner "Content" padding `88px 0 24px` (768/390: `64px 0 24px`).
- "Heading + Desc": flex column, `gap: 24px`, `align-items: center`, width 960 (centered).
- Label pill "PLANS THAT GROW WITH YOU": box 246x33, `padding: 6px`; text PPNM Medium 15/21, letter-spacing 1px, w500, #52616a (no border/bg).
- h1 "Your outbound platform. Your level of support.": PPNM Medium **68/70.72**, ls -2px, w500, #1c292d, centered, max 740 wide (2 lines at 1440/1280). 768 and 390: **40/41.6**, ls -2px (1 line at 768, 3 lines at 390).
- p: PPNM Variable 20/30 w400 #526570 centered, max 760. 768/390: 18/27.

## 3. `plans` (`.vp-plans`, new code component)

Font: `ValleyPlans` = alias of `/assets/fonts/4U27qiCuAgm6sc2vgHfWPBCGc.woff2` (PPNM Variable, weight 100–900). Root `container-type: inline-size`, color #1c292d. Full CSS in `components.css` (40 rules); key measured values:

- **Toggle** `.vp-toggle`: centered, `width: max-content`, bg #e7edef, `padding: 5px`, `gap: 4px`, `margin: 0 auto 32px`; 275x58 at 1440. Buttons 17px w500, `min-height: 48px`, `padding: 12px 22px` (container <=760: `12px 15px`), transparent / #41565f; pressed (`aria-pressed=true`) bg #1c292d, #fff. Labels "Monthly" and "Quarterly · save". Hover: no change. State swap is instant (no transition).
- **Grid** `.vp-grid`: `repeat(3, minmax(0,1fr))`, gap 20. 1440: 3x 434.66 (1344 wide), 1280: 3x 381.33; container <=760 (768 and 390): 1 column.
- **Card** `.vp-card`: flex column, `padding: 30px`, bg #fff, border 1px #d2dddd, radius 0. Middle card (Plus, `:nth-child(2)`): bg #e8eff0, border **2px #527995**, padding 29px. Container <=1050: padding 24/23; <=760: 28/27. Card heights at 1440: 966 each (grid stretch).
  - h3: 28px/1.15, ls -0.035em (-0.98px), w500 (<=1050: 25px).
  - `.vp-desc`: 17/25.5 #526570, `min-height: 76px`, margin-top 16 (<=1050: 16px, min-height 90; <=760: min-height 0).
  - `.vp-price`: flex baseline, gap 8, margin-top 28. `strong` 58px/1.05 ls -0.05em w500 (the "$" is a separate text node: "$ 199"), <=1050: 48px, <=760: 56px. `span` "/ seat / month" 15px #526570.
  - `.vp-bill`: 14/21 #526570, min-height 42, margin-top 10 (two lines split by `<br>`).
  - `.vp-button`: flex center, bg #1c292d, #fff, 17px, min-height 50, `padding: 12px 18px`, `margin: 24px 0`; label + " →" span. Hover bg **#34505b**, instant (no transition, measured at 30ms). Focus-visible outline 2px #3976ae offset 4.
  - List `li`: flex gap 12, `padding: 13px 0`, border-top 1px #d9e1e2, 16px/1.45 (<=1050: 15px; <=760: 16px). `::before` content "✓" color #416c65.
  - `.vp-extra`: 14/21 #526570, margin-top 24.
- **Scale row** `.vp-scale`: flex space-between center, gap 24, `padding: 30px 0`, margin-top 20, border-bottom 1px #d6dede. `strong` 23px w500 "Need a larger team setup?", `p` 17px #526570 margin-top 8, link "Talk to sales →" 17px #3c709d nowrap (hover: no change). <=760: column, align start.

### Billing toggle states (verbatim, from `states/plans_toggle.json`)

| Plan | Monthly price / bill line | Quarterly price / bill line | CTA → href |
|---|---|---|---|
| Starter | $199 / seat / month · "Billed monthly." / "7-day trial. Payment method required." | $149 · "$447 billed every three months." / "7-day trial. Payment method required." | "Start for free →" → https://beta.joinvalley.co/signup |
| Plus | $299 · "Billed monthly." / "Includes email, priority support, and onboarding." | $249 · "$747 billed every three months." / same 2nd line | "Book a demo →" → https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b |
| Growth | $499 · same as Plus | $419 · "$1257 billed every three months." / same | "Book a demo →" → same Surface URL |

Feature lists, descriptions and extras are in the verbatim copy below; they do not change with the toggle. Default state is Monthly.

## 4. `studios` ("Get Early Access Banner", Framer)

- At 1440 the section is inset: x=40, 1360x608 (horizontal margin 40). At 1280, 768, 390 it is full-bleed (0..width). Heights: 608 / 608 / 500 / 620.
- Background: `img` cover, 50% 50%, `assets/img/DzF7ltBGreQELkgImDCaxxldqH0.jpg` (already in public/assets), with overlay "Content" bg `rgba(12,32,37,.72)`, `padding: 72px 56px` (768/390: `48px 24px`).
- Column (max 960, centered), gap 28:
  - Label: `padding: 6px 13px`, text "VALLEY STUDIOS" PPNM Variable 11/15.95, ls 1px, uppercase, #b9d5e7.
  - h3 "Valley Done-For-You" + line break + "Meetings booked. Pipeline filled. You close deals.": PPNM Medium **48/51.84**, ls -1.2px, #fff, centered, max 900 (768/390: 32/34.56, ls -0.8).
  - p "$1499/mo": PPNM Medium 32/35.84 ls -0.8 #fff.
  - h3 (sub) PPNM Variable 20/30 #d9e6e7 centered max 760 (768/390: 17/25.5).
  - Form "Waitlist" (flex row gap 8, 520 wide at desktop): input wrapper 380x52 bg #fff radius 1px, `padding: 12px 16px`, 1px inner border `rgba(0,0,0,.5)` via `::after`; input placeholder "Your work email", PPNM Medium 16/19.2, #1c292e, `type=email required name=Email`. Button 132x52, bg #111111, 1px `rgba(0,0,0,.2)` inner border, label "Book a call →" PPNM Medium 16/19.2 ls -0.16 #fff, `padding: 12px 18px`. At 768/390 the form stacks (input full width 520/342, button 132 centered below).
  - Note under form: "Currently not accepting more users, join our waitlist", **Geist Mono** 12/14.4 uppercase #000 centered (the page loads Geist Mono 400 from Google Fonts; local copy `assets/pages/pricing/fonts/or3nQ6H-1_WfwkMZI_qYFrcdmg.woff2`). Note: #000 on the dark overlay is barely visible on the live site; keep as measured.
- Behaviour: the submit button carries class `surface-form-button` (the Surface script intercepts it and opens the Surface form https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b). The form itself is a Framer form with honeypot inputs. Clone: validate email and open/link the Surface URL. Hover on the button: no computed change measured. Input focus: no computed change.

## 5. `calendar`

- `section` `padding: 32px 48px 64px` (768/390: `32px 20px 64px`), bg #f8f9f7, bottom hairline `rgba(0,0,0,.07)` via `::after`.
- Card "Content": bg #edf2f2, 1px #d2dddd inner border (`::after`), `padding: 56px 48px` (768/390: `28px 20px`), 1344x1073 at 1440.
- Column gap 40 (centered): h2 "See what Valley could do for your team." PPNM Medium **44/49.28** ls -1px #1c292d centered, max 850 (768/390: 32/35.84).
- `iframe` https://meetings.hubspot.com/zayd-from-valley/tryvalley, 1000x872 at 1440/1280, 688x872 at 768, 310x872 at 390; style `width:100%;height:100%;border:none`. Its contents are third-party (HubSpot) and were **not** captured; use the iframe or a link.

## 6. Colors / type summary (new roles only)

| Role | Font | Size/LH | LS | Wt | Color |
|---|---|---|---|---|---|
| Hero label | PPNM Medium | 15/21 | 1px | 500 | #52616a |
| Hero h1 | PPNM Medium | 68/70.72 (≤809: 40/41.6) | -2px | 500 | #1c292d |
| Hero sub | PPNM Var | 20/30 (≤809: 18/27) | 0 | 400 | #526570 |
| Plan h3 | ValleyPlans | 28/32.2 | -0.98px | 500 | #1c292d |
| Plan price | ValleyPlans | 58/60.9 | -2.9px | 500 | #1c292d |
| Plan body | ValleyPlans | 17/25.5 | 0 | 400 | #526570 |
| Plan list | ValleyPlans | 16/23.2 | 0 | 400 | #1c292d (✓ #416c65) |
| Studios h3 | PPNM Medium | 48/51.84 | -1.2px | 500 | #fff |
| Calendar h2 | PPNM Medium | 44/49.28 | -1px | 500 | #1c292d |

New colors: #e7edef (toggle track), #d2dddd, #527995 (Plus border), #d9e1e2, #416c65, #34505b (button hover), #3c709d (Talk to sales), #d6dede, `rgba(12,32,37,.72)` (studios overlay), #b9d5e7, #d9e6e7, #edf2f2 (calendar card).

## 7. Interaction states (measured)

| Element | Hover | Focus-visible | Active | Transition |
|---|---|---|---|---|
| `.vp-toggle button` | none | 2px #3976ae offset 4 | pressed: bg #1c292d / #fff | none (instant swap of prices) |
| `.vp-button` | bg #1c292d → #34505b | 2px #3976ae offset 4 | - | none |
| `.vp-scale a` | none | same | - | none |
| Studios "Book a call" | none measured | - | opens Surface form | - |
| Proof carousel, FAQ, nav, footer | as homepage (CLONE_SPEC §19) | | | |

## 8. Motion (measured)

1. **Nav appear on load** (this page only among shared-nav pages: also /product and /about): the fixed nav wrapper starts at `opacity: .001; transform: translateY(-79px)` and animates to `opacity 1, y 0` as a **tween 0.5s, ease `cubic-bezier(.55,0,.14,1)`, delay 0** (config from the page module; sampled: y -79 → -54 at 355ms → -5.9 at 526ms → 0 at ~704ms after DOMContentLoaded, i.e. the tween starts on hydration ~190ms).
2. **Framer appear-in-view** (animate once, IO threshold from config):
   - Hero label "PLANS THAT GROW WITH YOU" and Studios label: from `{opacity:0, y:15}` to rest, **spring stiffness 210, damping 70, mass 1, delay 0**, threshold 0.5. Measured: op .10 @50ms, .48 @240ms, .75 @485ms, .90 @750ms, .99 @1.6s; y 15 → 0 (overdamped, no overshoot).
   - Studios heading block (h3 + price + sub) and the calendar h2: from `{opacity:0, y:20}`, same spring with **delay 0.2s**, threshold 0.5 (measured trigger when element top is ~180px inside the viewport for the studios block, ~100px for the calendar h2).
   - Studios waitlist form: `{opacity:0, y:15}`, spring 210/70, delay 0, **threshold 0** (fires as soon as 1px is visible).
   - The hero h1 and sub are NOT animated. Plans, proof, FAQ and footer have no appear effect.
3. Proof carousel autoplay (7s per slide, `vcr-reveal .35s`) exactly as the homepage stories component.
4. No scroll-linked (parallax/pin) effects on this page. `prefers-reduced-motion`: skip the appear effects.

## 9. Verbatim copy

Nav and footer copy are identical to the homepage (CLONE_SPEC §7, §18). FAQ Q&A are identical to the homepage (`spec/states/faq.json`). Proof carousel slides identical to homepage stories.

#### `pricing-hero` verbatim innerText (1440)

```text
PLANS THAT GROW WITH YOU

Your outbound platform. Your level of support.

Every plan includes prospecting, qualification, research, and personalized LinkedIn outreach. Add email and hands-on support, or choose a plan that includes them.
```

#### `plans` verbatim innerText (1440)

```text
Monthly
Quarterly · save
Starter

LinkedIn only. The full outbound platform, run your way.

$199
/ seat / month

Billed monthly.
7-day trial. Payment method required.

Start for free
 →
Prospecting, qualification, and research
Messages written in your voice
LinkedIn campaigns and follow-ups
Campaign analytics and reply management
Unified inbox
ICP Scoring
Valley AI Copilot (Scout)
CRM, API and MCP integrations (HubSpot, Claude, etc.)
Live chat support

Optional add-ons: email sending, priority Slack support, and an onboarding call.

Plus

LinkedIn + email. Multichannel outreach with a team in your corner.

$299
/ seat / month

Billed monthly.
Includes email, priority support, and onboarding.

Book a demo
 →
Everything in Starter
1,000 email messages per month
Slack group for priority support
An onboarding call
Dedicated customer success manager
Email waterfall enrichment (15+ data providers)
Admin access & view

Additional credits available separately.

Growth

LinkedIn + email. More credits to find your next buyers.

$499
/ seat / month

Billed monthly.
Includes email, priority support, and onboarding.

Book a demo
 →
Everything in Plus
1,000 email messages per month
Priority Slack support and onboarding
$300 in additional credits every month

For teams that need more discovery and enrichment.

Need a larger team setup?

Valley Scale offers custom pricing for teams of five seats or more.

Talk to sales →
```

#### `spacer` verbatim innerText (1440)

```text

```

#### `studios` verbatim innerText (1440)

```text
VALLEY STUDIOS

Valley Done-For-You
Meetings booked. Pipeline filled. You close deals.

$1499/mo

Your Valley, operated by us: strategy, campaigns, optimization, reporting. 
For teams that want the pipeline without the operating.

Book a call →

CURRENTLY NOT ACCEPTING MORE USERS, JOIN OUR WAITLIST
```

#### `calendar` verbatim innerText (1440)

```text
See what Valley could do for your team.
```

## 10. Links

Nav/footer links are the homepage ones (not repeated). "internal" = www.joinvalley.co path, everything else external.

| section | link text | href (as authored) | type | resolved |
|---|---|---|---|---|
| plans | Start for free → | `https://beta.joinvalley.co/signup` | external | https://beta.joinvalley.co/signup |
| plans | Book a demo → | `https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b` | external | https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b |
| plans | Talk to sales → | `https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b` | external | https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b |
| proof | Read Bolt.new’s story | `https://www.joinvalley.co/casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days` | internal | /casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days |
| proof | Start for free | `https://beta.joinvalley.co/signup` | external | https://beta.joinvalley.co/signup |
| proof | (icon/image link) | `https://www.joinvalley.co/casestudies/how-ggwp-generated-4m-in-pipeline-with-valley` | internal | /casestudies/how-ggwp-generated-4m-in-pipeline-with-valley |
| proof | (icon/image link) | `https://beta.joinvalley.co/signup` | external | https://beta.joinvalley.co/signup |
| proof | (icon/image link) | `https://www.joinvalley.co/casestudies/how-linarca-booked-14-qualified-meetings-in-their-first-month-with-valley` | internal | /casestudies/how-linarca-booked-14-qualified-meetings-in-their-first-month-with-valley |
| proof | (icon/image link) | `https://www.joinvalley.co/casestudies/how-thinkfish-books-380-400-meetings-monthly-with-valley` | internal | /casestudies/how-thinkfish-books-380-400-meetings-monthly-with-valley |

Internal links outside the known routes (/, /pricing, /product, /about, /compare, /playbooks): `/casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days`, `/casestudies/how-ggwp-generated-4m-in-pipeline-with-valley`, `/casestudies/how-linarca-booked-14-qualified-meetings-in-their-first-month-with-valley`, `/casestudies/how-thinkfish-books-380-400-meetings-monthly-with-valley`.

## 11. Could not capture / notes

1. HubSpot meetings iframe content (third-party, cross-origin): not captured; embed or link it.
2. Surface form modal behind "Book a demo"/"Book a call" (third-party): not recreated; link to the URL.
3. Framer spring curves are given as the literal configs from the module (stiffness 210, damping 70, mass 1); use framer-motion with the same values rather than a CSS approximation.
4. The 1680px "Large Desktop" page variant was not sampled (outside the requested widths).
