Source: https://www.joinvalley.co/product

# /product: clone spec

Measured from the live page on 2026-09-29 with headless Chromium (Playwright) at 1440x900, 1280x900, 768x900 and 390x844 (DPR 1), cookie banner hidden. Values are computed styles/rects, the live CSSOM and the page's Framer module. Global rules (fonts, the "PP Neue Montreal renders as Inter" quirk, tokens) live in `/Users/riyaghosh/V3/Valley/CLONE_SPEC.md`.

## 0. Files

- `spec/pages/product/dumps/dump_{1440,1280,768,390}.txt` (per-element geometry + styles), `sections_*.json`, `media_*.json`, `reqs_*.json`, `texts.json`, `svgs.json`, `meta.json`, `listeners.json`, `css_raw.json`, `vc_compact_1440.html` (DOM of the comparison block).
- `spec/pages/product/components.css`: verbatim CSS of the **new** components on this page (`.valley-outbound-team/.vot`, `.valley-intelligence-rows/.vir`, `.valley-execution-rows/.ver`, `.valley-learning-row/.vlr`, `.vc`), 676 rules + 7 keyframes. Shared components (hero visual, showcase, stories, team-fit, pricing/FAQ, nav, footer) are omitted because every rule is byte-identical to `spec/components.css`. The `.vc` rules are identical to `spec/pages/compare/components.css`.
- `spec/pages/product/states/interactions.txt`: sticky-stack scroll samples at 1440/768/390, IO-driven animation list, hover measurements.
- `spec/pages/product/screens/full_{1440,1280,768,390}.jpg` and `state_workflow_{intro,prospecting,qualification,research,message,channels,analytics,learning}_1440.jpg`.
- `spec/pages/product/source/d9S_C34X…mjs`: page module containing the workflow components' source and data (reference only).
- `spec/pages/product/ASSETS.md`.

## 1. Page skeleton, breakpoints

- Framer page breakpoints: Desktop `>=1200`, Tablet `810–1199.98`, Phone `<=809.98` (same as the homepage). The hero switches to its `Variant 2 - Mobile` variant below 810.
- bg #f8f9f7 throughout; gutters 48px (1440/1280), 20px (768/390).

### Section map

| id | Framer layer / component root | position | 1440 y / h | 1280 y / h | 768 y / h | 390 y / h |
|---|---|---|---|---|---|---|
| `nav` | Large Desktop / `.vpm` | fixed | 0 / 84 | 0 / 84 | 0 / 68 | 0 / 68 |
| `hero` | Variant 2 - Desktop (Framer layer) | relative | 0 / 924 | 0 / 924 | 0 / 1289 | 0 / 1409 |
| `logos` | Website Desktop (Framer layer) | relative | 924 / 658 | 924 / 621 | 1289 / 2306 | 1409 / 1546 |
| `showcase` | Product in action / `.valley-showcase` | relative | 1582 / 1135 | 1545 / 1135 | 3595 / 1123 | 2956 / 1498 |
| `workflow` | The complete outbound workflow / `.valley-outbound-team` | relative | 2718 / 4105 | 2680 / 3959 | 4718 / 3728 | 4454 / 6246 |
| `proof` | product-proof-current / `.valley-customer-results` | relative | 6822 / 520 | 6639 / 520 | 8446 / 519 | 10700 / 833 |
| `team-fit` | product-fit-current / `.valley-team-fit` | relative | 7342 / 729 | 7159 / 692 | 8966 / 608 | 11533 / 902 |
| `comparison` | product-comparison-current / `.vc` | relative | 8071 / 1581 | 7851 / 1525 | 9573 / 3102 | 12435 / 4401 |
| `pricing-faq` | product-questions-current / `.valley-start-questions` | relative | 9652 / 1174 | 9376 / 1174 | 12675 / 1145 | 16836 / 1691 |
| `footer` | Desktop / `.vf` | relative | 10826 / 597 | 10551 / 597 | 13820 / 643 | 18526 / 815 |


Document height: 11423px at 1440, 11148px at 1280, 14463px at 768, 19341px at 390.

### Reuse vs new

| id | Status |
|---|---|
| `nav` | **Reuse homepage `Nav`**; plus the on-load appear (see Motion). |
| `hero` | **Reuse homepage `Hero` component with a second copy variant** ("Variant 2"). Identical structure, hero visual (`.valley-hero-visual`, 5 autoplaying scenes) and proof strip (`.valley-hero-proof`); only the copy block differs (below). |
| `logos` | **Reuse homepage `Logos`** unchanged (diff of the 1440 dump against the homepage: 0 differing lines). |
| `showcase` | **Reuse homepage `Showcase`** (`.valley-showcase`, CSS identical). Outer wrapper differs: `padding: 56px 48px` and no clip (homepage `48px 48px 96px`, `overflow: clip`); 768/390 `padding: 40px 20px`. Height 1135 at 1440 (homepage 1167). |
| `workflow` | **New**: intro card (`.valley-outbound-team`) + 7 sticky stacked rows made of three new code components (`.valley-intelligence-rows` x3, `.valley-execution-rows` x3, `.valley-learning-row` x1). |
| `proof` | **Reuse homepage `Stories` carousel without header** (same as /pricing). Wrapper `padding: 48px`. |
| `team-fit` | **Reuse homepage `TeamFit`** unchanged; wrapper `padding: 48px` (homepage `32px 48px`). |
| `comparison` | **New component, shared with /compare**: `.vc.vc-compact` (the compact variant of the Valley vs. Competition component). Build it once for /compare and pass `compact`. |
| `pricing-faq` | **Reuse homepage `PricingFaq`** (offer + FAQ, identical); wrapper `padding: 48px` (homepage `64px 48px`). |
| `footer` | **Reuse homepage `Footer`**. |

No closing CTA (`.vcc`), no stories header, no endorsement/steps/jobs/integrations/wall-of-love on this page.

## 2. `hero` (Variant 2 copy)

Differences from the homepage hero (everything else identical, including the visual, tabs, proof strip, buttons and their hovers):

| | 1440 / 1280 | 768 / 390 (`Variant 2 - Mobile`) |
|---|---|---|
| wrapper padding | `140px 48px 64px` | `112px 20px 48px` |
| "Hero copy and action" gap | 24px (homepage 17) | 24 |
| "Heading" gap | 20px (homepage 18) | 20 |
| eyebrow | "For founders, sales teams and agencies" PPNM Medium 15/22.5 #4a5e68 | 13/19.5 |
| h1 | "The complete outbound system for B2B sales teams and lead generation agencies" PPNM Medium **56/59.36, ls -1.96px**, #1c292d, column 640 (1440) / 560 (1280) wide, 4 lines | "The complete outbound system for B2B sales teams and lead-gen agencies" (**note: "lead-gen"**) 38/40.28, ls -1.33 |
| sub | "Find, qualify, research, and personalize in a single platform and automate outreach to book more calls and generate more pipeline." PPNM Medium 20/29 #4a5e68 | 18/26.1, max 650 at 768 |
| buttons | "Start for free" → https://beta.joinvalley.co/signup, "Book a demo" → Surface form (same styles and hovers as homepage: Primary opacity 1→.82, Secondary bg #fff→#e9f5ff, spring) | same |

## 3. `workflow` (new)

Wrapper "The complete outbound workflow" (DOM `id="how-it-works"`): bg #f8f9f7, `padding: 48px` (768/390: `48px 20px`), inner column "Current Valley capabilities" (flex column, gap 0, centered).

### 3a. Intro `.vot-intro` (component `.valley-outbound-team`)

- Card 1344x523 (1440): bg #e8eff0, border 1px #d5dfe0, `padding: 40px`, grid `578 / 636` (≈ 1fr 1.1fr), gap 48, align center. 1280: 502/552. 768: padding 28, gap 30, cols 305/335. 390: padding 24, 1 column (300), gap 28.
- Left: eyebrow `small` "YOUR OUTBOUND TEAM, WORKING TOGETHER" 12/16.8 ls .6px uppercase #456a7a; h2 "An entire outbound team. One piece of software." **46/51.52 ls -1.932px (-0.042em) w500 #1c292d** (768: 38/42.56; 390: 34/38.08); p 19/28.5 #4e606a max 460. Font "Valley Body Montreal" (= PPNM Variable).
- Right `.vot-org`: dark panel bg #1a3037, `padding: 34px 36px`, grid `344 / 185` gap 34, radial highlight `::after` `radial-gradient(at 100% 0%, rgba(65,106,116,.26), transparent 70%)`.
  - 5 `.vot-role` rows (padding 13px 0, bottom border 1px `rgba(255,255,255,.137)` except last): `strong` 21/25.2 w500 #fff + `span` 14/19.6 #bbcecf. Roles: GTM engineer / Build the right audience · Researcher / Find the reason to reach out · Copywriter / Make it sound like you · SDR / Send and follow through · Analyst / Learn what earns a reply.
  - `.vot-valley` column: 34px left padding, 1px left border (white at low alpha, see components.css), a 24x1 #b9d3ce connector tick (`::before`), Valley mark SVG 55x52 #fff, "Valley" 29/42 ls -.87 w500 #fff, "One connected outbound workflow." 13/18.2 #bbcecf centered.
  - 768: padding 24, cols 172/93, gap 22. 390: padding 20, gap 18.

### 3b. Seven stacked rows

Each row is a Framer wrapper (named `prospecting`, `qualification`, `research`, `message`, `channels`, `analytics`, `learning`) containing one code-component instance filtered to one row.

**Stacking (desktop only, measured):** wrappers are `position: sticky` with `top` = **99, 102, 105, 108, 111, 114, 117px** and `z-index` 1–7. Heights at 1440: 518, 518, 518, 462, 462, 462, 462 (1280: 518 x3, 418 x3, 448). Each card scrolls up and parks 3px below the previous one, so the stack shows a 3px "ledge" of each earlier card; all seven stay stuck until the end of the "Current Valley capabilities" container, then scroll away together (at 1440 scrollY ≈ 6168 the first three and then the rest release). Sample (1440, viewport tops of the 7 rows): scrollY 3918 → 99/102/491/1009/…; 4818 → 99/102/105/109/570/…; 6018 → 99/102/105/108/111/114/294. At 768 and 390 the wrappers are `position: relative` (no stacking; normal flow).

**Row card** (`.vir-row`, `.ver-row`, `.vlr-row`, identical frame): bg #f8f9f7, border 1px #d6dede, radius 0, **shadow `0 -8px 28px -25px rgba(32,52,59,.25)`** (the upward shadow separates stacked cards), `padding: 28px`, grid `579.5 / 666.5` (≈ 0.87fr 1fr), gap 40, align center. 1280: 505/581. 768: padding 22, gap 28, cols 304/350. 390: padding 18, gap 24, 1 column (visual below copy).

**Copy column** (`.vir-copy` / `.ver-copy` / `.vlr-copy`, padding `12px 8px`):
- category line: `span` 11/14.85 ls .605px uppercase #4e6b7b, e.g. "PROSPECTING", with a badge `b` "01 / 07" (14/18.9 ls .14 w500 #456d90, bg #e8eff3, `padding: 10px 12px`).
- h3 **40/44.8, ls -1.28px (-0.032em), w500, #1c292d** (768: 34/38.08; 390: 30/33.6).
- p 20/30 #465a61 (execution rows: ls -0.24px, #465b60).
- Fonts: "Valley Intelligence Montreal" (rows 1–3), "Valley Execution Montreal" (4–6), "Valley Body Montreal" (7) — all aliases of `/assets/fonts/4U27qiCuAgm6sc2vgHfWPBCGc.woff2`, weight 100–900.

**Visual column** (full composition CSS in `components.css`; per-element numbers in the dumps):
| # | Row | Visual |
|---|---|---|
| 1 | Prospecting "Find your next buyers." | `.vir-stage` 666x460, 1px #d6dede, radius 2, painted bg image `dU36ul18DtX1eCElt7maRiZGotc.png` (cover). `.vir-find-composition` grid 270 / 25 / 270 gap 16: dark rail `.vir-signal-rail` (bg #203b42, "WHAT’S CHANGING", 4 signals with 20px icons: Lead magnet engagement · Hiring signals · Competitor frustrations · Relevant keywords), arrow `.vir-find-arrow`, and card `.vir-new-person` (bg #fbfcf3, border #e1e7d4, "A PERSON TO QUALIFY", avatar initials "MC" 62x62, green dot, "Maya Chen" 29px, "VP Revenue Fieldwork", reason "Hiring account executives"). |
| 2 | Qualification "Qualify every prospect." | stage bg `5PTRAJLnFg6rsWb9IKzPm6tagrQ.png`; `.vir-fit-composition` column gap 12: "YOUR IDEAL CUSTOMER / B2B software. Revenue leaders. Growing teams." (bg #f4f7ed), fit card (Maya Chen, "VP Revenue · Fieldwork", check icon, "High ICP-Fit" / "Right role. Right company. Hiring account executives."), skip card ("Sam Price" / "Community Manager · Outside your target roles." / "Skip"). |
| 3 | Research "Research each person." | stage bg `LCJ24npVr4QMqurmmIGxgEU62HU.png`; source ribbon (bg #273a42: News · Podcasts · LinkedIn / X · YouTube · Newsletters) over a brief card (bg #fcfbf2, "WHAT MATTERS TO MAYA", 3 findings 23px: "Building a bigger revenue team." Company news · "Quality matters more than volume." LinkedIn post · "New reps need a better starting point." Podcast interview). |
| 4 | Message generation "Write messages in your voice." | `.ver-visual` 666x404 radius 2, bg image `zPOKyZnbl77fH6unSixkvRUOSOs.png` (pos 50% 45%) + `rgba(152,115,71,.08)` wash; chips "Their context" / "Your voice Aa"; letter card (bg #fcfbf1, "To Maya at Fieldwork", "Draft", body 19/26.98 with two `mark` highlights, footer "Ready for your review."). |
| 5 | Email & LinkedIn "Send across email and LinkedIn." | bg `5WP0tI1lICNwC23waJVfpSCTTpE.png` (50% 61%) + `rgba(16,46,36,.098)`; sequence steps "FIRST TOUCH / Connect on LinkedIn / 01", "Your timing" wait line, second step, reply-stop card. |
| 6 | Analytics "Track replies, meetings, and pipeline." | `.ver-visual` bg #203a38; analysis heading, 3-step flow, pipeline card. |
| 7 | Learning "Improve with every reply." | `.vlr-visual` with `::before` image `DzF7ltBGreQELkgImDCaxxldqH0.jpg`; `.vlr-reply` card (bg #fffefb, border #c5d6cd), `.vlr-patterns` 2x grid (1px gaps on #bfcfc7), `.vlr-next` row. |

All verbatim strings are in section 7 (copy) and in `texts.json`.

## 4. `comparison` (`.vc.vc-compact`)

Same component as `/compare` (see `spec/pages/compare.md` for full anatomy, states and data for all 19 competitors). Compact variant differences (from `.vc-compact` rules + measurement):
- Rendered inside the Framer wrapper with `padding: 48px` (768/390: `32px 20px`), so `.vc` is 1344 wide at 1440 (not full-bleed).
- `.vc-intro` padding-top 36 (`36px 48px 32px`), heading is an **h2 46/47.38 ls -2.53px** (39px in the narrow container rule) instead of the /compare h1 76/78.28; the eyebrow "VALLEY VS. COMPETITION" and the right-hand paragraph are still present.
- Only these blocks render: intro, picker, main (comparison heading, track key, SVG track, legend, criteria `<details>`), then `.vc-close` with a 1px #d5ddd1 top border. **Not rendered**: `.vc-differences`, `.vc-pricing`, `.vc-table-section`, `.vc-proof`, `.vc-directory`, `.vc-method`.
- `.vc-main` padding `32px 48px 26px`; compact `.vc-close` 1344x140 with links "Valley vs. Competition ↗" → `/compare` and CTA "See Valley in action ↗" → Surface form (on /compare the CTA goes to HubSpot).
- `.vc` element size: 1344x1485 (1440), 1184x1429 (1280), 728x3038 (768), 350x4337 (390). Below a 780px container the SVG track is replaced by the vertical `.vc-timeline` list (see compare.md).

## 5. Interaction states (measured)

| Element | Hover | Focus-visible | Transition |
|---|---|---|---|
| Hero Primary / Secondary | opacity → .82 / bg → #e9f5ff | as homepage | spring (sampled .83 at 150ms) |
| `.vc-company` chip | bg transparent → #eaf0e5, border #d3dace → #718778 | 2px #436c9b offset 4 | none |
| `.vc-cta` | bg #1c292e → #3e5c43 | same | none |
| `.vc` text links | no change | same | none |
| Workflow rows | no hover states | - | - |
| Everything shared | as CLONE_SPEC §19 | | |

## 6. Motion (measured)

1. **Nav appear on load**: `{opacity:.001, y:-79}` → `{opacity:1, y:0}`, tween 0.5s `cubic-bezier(.55,0,.14,1)` (same as /pricing; sampled y -62.6 at 272ms after DOMContentLoaded, 0 by ~650ms).
2. The hero copy has **no** appear animation here (checked: no elements with initial opacity 0 other than hidden breakpoint variants).
3. Hero visual autoplay, proof-strip sync, logo dot blink/tooltips, showcase autoplay (6s/tab, WAAPI progress, height map `[640,540,560,540,620,540]` + 40 below 1100px width), stories autoplay (7s), team-fit tab transitions: all exactly as the homepage (CLONE_SPEC §20).
4. **Workflow sticky stack** (scroll-driven, native `position: sticky`, no JS): see 3b.
5. **Workflow row animations** (IntersectionObserver; each respects `prefers-reduced-motion` and `document.hidden`):
   - Intelligence rows (1–3): each `.vir-stage` gets `data-live="true"` while ≥15% visible (IO threshold .15), `false` when it leaves (so animations replay on re-entry). While live: `.vir-new-person` `vir-settle .8s cubic-bezier(.16,1,.3,1) both`; `.vir-find-arrow` `vir-flow 4s ease-in-out infinite` (opacity .55↔1, x -3↔3px, peak at 30%); `.vir-fit-check` `vir-confirm .7s ease both` (opacity .5→1, scale .85→1); `.vir-finding` `vir-settle .65s ease both`, 3rd/4th child delays .12s/.24s (vir-settle: opacity .7→1, y 6→0).
   - Execution rows (4–6): one IO (threshold .12) per `.ver-row`; first intersection sets `data-seen="true"` permanently; `data-in-view` pauses/resumes. `.ver-reveal` elements run `ver-enter .65s cubic-bezier(.22,1,.36,1) both` with `animation-delay: calc(var(--ver-order) * 75ms)` (ver-enter: opacity .12→1, y 10→0). Orders: message = inputs 0, letter 1; channels = first step 0, wait 1, second step 2, reply-stop 3; analytics = heading 0, steps 1/2/3, pipeline 4.
   - Learning row (7): `data-motion="true"` while ≥15% visible: `.vlr-reply` `vlr-arrive .65s ease both`, `.vlr-patterns` delay .12s, `.vlr-next` delay .25s (opacity .45→1, y 7→0).
6. **Comparison**: `.vc-light` `vc-light-pass 11s ease-in-out infinite` (translateX 0 → 1620px between 12% and 60%, i.e. a light sweep along the Valley track), `.vc-trace` `vc-trace-in .8s ease-out both` (stroke-dashoffset 1→0, opacity .3→1). Both restart from 0 whenever a different competitor is selected (measured currentTime 0 on the next frame).

## 7. Verbatim copy

Nav, logos, showcase, proof, team-fit, pricing-faq and footer copy are identical to the homepage (see CLONE_SPEC and `spec/texts_1440.txt`). New copy:

#### `hero` verbatim innerText (1440)

```text
For founders, sales teams and agencies

The complete outbound system for B2B sales teams and lead generation agencies

Find, qualify, research, and personalize in a single platform and automate outreach to book more calls and generate more pipeline.

Start for free

Book a demo

“Instead of going small, we actually go big and just segment them according to ICP fit.”
Freizle Abarrientos
Chief Operating Officer · ThinkFish
THE RIGHT PEOPLE, FOR YOUR BUSINESS
A signal is a start.
Fit comes next.
Maya Chen
VP Revenue · Fieldwork
High ICP-Fit
WHY SHE FITS
The right role
Leads the revenue team
The right company
B2B software · growing sales team
A possible need
Building outbound capacity
SKIP
×
Wrong role
×
Wrong company

Engagement alone is not enough.

Find
Qualify
Research
Write
Send
```

#### `workflow` verbatim innerText (1440)

```text
YOUR OUTBOUND TEAM, WORKING TOGETHER
An entire outbound team.
One piece of software.

Valley finds the people, does the research, writes the message and follows through. Every step shares the same context.

GTM engineer
Build the right audience
Researcher
Find the reason to reach out
Copywriter
Make it sound like you
SDR
Send and follow through
Analyst
Learn what earns a reply
Valley
One connected
outbound workflow.
01 / 07
PROSPECTING
Find your next buyers.

Catch relevant engagement, hiring, competitor frustrations and conversations around your keywords. Turn what’s happening now into the next people worth reaching.

WHAT’S CHANGING
Lead magnet
engagement
Hiring signals
Competitor
frustrations
Relevant keywords
A PERSON TO QUALIFY
MC
Maya Chen
VP Revenue
Fieldwork
Hiring account executives
02 / 07
QUALIFICATION
Qualify every prospect.

Valley checks each person against your ideal customer and explains the match. Correct a decision, refine the criteria, and re-check who belongs in your campaign.

YOUR IDEAL CUSTOMER
B2B software. Revenue leaders. Growing teams.
MC
Maya Chen
VP Revenue · Fieldwork
High ICP-Fit
Right role. Right company.
Hiring account executives.
Sam Price
Community Manager · Outside your target roles.
Skip
03 / 07
RESEARCH
Research each person.

Pull useful context from posts, interviews and company news. See the sources behind the findings, so the message starts with a reason to reach out.

News
Podcasts
LinkedIn / X
YouTube
Newsletters
WHAT MATTERS TO MAYA
Building a bigger revenue team.
Company news
Quality matters more than volume.
LinkedIn post
New reps need a better starting point.
Podcast interview
04 / 07
MESSAGE GENERATION
Write messages in your voice.

Valley combines what it learns about each prospect with your phrasing, punctuation and style. You get a relevant first draft that sounds like you, ready to review, edit and make your own.

Their context
Your voice
Aa
To Maya at Fieldwork
Draft

Maya, saw you’re adding AEs.

Valley gives each rep researched prospects and a first message in your team’s voice.

Want to see a few examples?

Ready for your review.
05 / 07
EMAIL & LINKEDIN
Send across email and LinkedIn.

Connect your own accounts and put both channels in one sequence. Choose the timing, review the messages and let the follow-ups run. When someone replies, the sequence stops so you can pick up the conversation.

FIRST TOUCH
Connect on LinkedIn
01
Your timing
FOLLOW-UP
Continue by email
02
They reply. Follow-ups stop.
The conversation is yours.
06 / 07
ANALYTICS & PIPELINE
Track replies, meetings, and pipeline.

See replies and meetings beside campaign activity. Estimate potential pipeline from interested prospects and your average deal size, then use what you learn to improve the next campaign.

FOLLOW THE CONVERSATION
Campaign
The outreach you run
Reply
People responding
Meeting
Conversations booked
Potential pipeline

Interested prospects
× your average deal size

An estimate, with its inputs in view.
07 / 07
CONTINUOUS LEARNING
Improve with every reply.

Valley learns from what earns positive replies, across your campaigns and the customers before you. It studies the audience and the message to improve what comes next.

A POSITIVE REPLY

“This is exactly what we’re working on. Let’s talk.”

Who responds
Role · Company size
Geography · Signals
What resonates
Length · Tone · Openers
CTAs · Punctuation
Better context for your next campaign.
```

#### `comparison` verbatim innerText (1440)

```text
VALLEY VS. COMPETITION
The whole workflow.
A clearer choice.

From the first buying signal to the next conversation. See what happens in Valley, and what each alternative brings.

Compare Valley with
All competitors
LinkedIn & sequencing
AI outbound platforms
Email & infrastructure
Data & automation
Revenue platforms
HeyReach
Gojiberry
Amplemarket
lemlist
Instantly
Artisan
11x
Expandi
Clay
PhantomBuster
All 19 competitors
Valley vs. HeyReach

LinkedIn & sequencing

Read the full comparison ↗

Start with the signal. Follow it to the reply.
Read left to right. Valley is the upper track; HeyReach is below.

Valley
Upper track
HeyReach
Lower track
Email
↗
Other tool
LinkedIn
✓
Built in
01
Live buyingsignals
◐
02
Qualify
◐
03
Deepresearch
◐
04
Your writingvoice
◐
05
Email +LinkedIn
◐
06
Managereplies
✓
07
Learn &improve
◐
✓
Built in
◐
Limited / external
—
No confirmed coverage

Email is included with Plus; optional on Starter. Open the stage guide for definitions; the detailed comparison retains each exact status and source.

What each stage means 7 steps in the workflow
Compare the work. Then decide.

Explore all seven stages and the details behind each comparison.

Valley vs. Competition ↗
See Valley in action
↗
```

## 8. Links

| section | link text | href (as authored) | type | resolved |
|---|---|---|---|---|
| hero | Start for free | `https://beta.joinvalley.co/signup` | external | https://beta.joinvalley.co/signup |
| hero | Book a demo | `https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b` | external | https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b |
| hero | Stefano McCoy at Bolt.new, read their customer story | `https://www.joinvalley.co/casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days` | internal | /casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days |
| hero | “Instead of going small, we actually go big and just segment them acco | `https://www.joinvalley.co/casestudies/how-thinkfish-books-380-400-meetings-monthly-with-valley` | internal | /casestudies/how-thinkfish-books-380-400-meetings-monthly-with-valley |
| hero | Tim O'Neil at GGWP, read their customer story | `https://www.joinvalley.co/casestudies/how-ggwp-generated-4m-in-pipeline-with-valley` | internal | /casestudies/how-ggwp-generated-4m-in-pipeline-with-valley |
| hero | David Baeza at Butteredtoast, read their customer story | `https://www.joinvalley.co/casestudies/how-butteredtoast-generated-1m-in-pipeline-scaling-one-founder-s-personal-brand` | internal | /casestudies/how-butteredtoast-generated-1m-in-pipeline-scaling-one-founder-s-personal-brand |
| hero | Conrad de Claro at GoCanvas, read their customer story | `https://www.joinvalley.co/casestudies/how-gocanvas-30x’d-outbound-pipeline-with-valley` | internal | /casestudies/how-gocanvas-30x’d-outbound-pipeline-with-valley |
| proof | Read Bolt.new’s story | `https://www.joinvalley.co/casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days` | internal | /casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days |
| proof | Start for free | `https://beta.joinvalley.co/signup` | external | https://beta.joinvalley.co/signup |
| proof | (icon/image link) | `https://www.joinvalley.co/casestudies/how-ggwp-generated-4m-in-pipeline-with-valley` | internal | /casestudies/how-ggwp-generated-4m-in-pipeline-with-valley |
| proof | (icon/image link) | `https://beta.joinvalley.co/signup` | external | https://beta.joinvalley.co/signup |
| proof | (icon/image link) | `https://www.joinvalley.co/casestudies/how-linarca-booked-14-qualified-meetings-in-their-first-month-with-valley` | internal | /casestudies/how-linarca-booked-14-qualified-meetings-in-their-first-month-with-valley |
| proof | (icon/image link) | `https://www.joinvalley.co/casestudies/how-thinkfish-books-380-400-meetings-monthly-with-valley` | internal | /casestudies/how-thinkfish-books-380-400-meetings-monthly-with-valley |
| team-fit | See Linarca’s story | `https://www.joinvalley.co/casestudies/how-linarca-booked-14-qualified-meetings-in-their-first-month-with-valley` | internal | /casestudies/how-linarca-booked-14-qualified-meetings-in-their-first-month-with-valley |
| comparison | Read the full comparison ↗ | `/blog/valley-vs-heyreach-ai-powered-personalization-vs-multi-account-volume` | internal | /blog/valley-vs-heyreach-ai-powered-personalization-vs-multi-account-volume |
| comparison | Valley vs. Competition ↗ | `/compare` | internal | /compare |
| comparison | See Valley in action ↗ | `https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b` | external | https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b |
| pricing-faq | Start for free | `https://beta.joinvalley.co/signup` | external | https://beta.joinvalley.co/signup |
| pricing-faq | See plans → | `/pricing` | internal | /pricing |

Internal links outside the known routes (/, /pricing, /product, /about, /compare, /playbooks): `/blog/valley-vs-heyreach-ai-powered-personalization-vs-multi-account-volume`, `/casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days`, `/casestudies/how-butteredtoast-generated-1m-in-pipeline-scaling-one-founder-s-personal-brand`, `/casestudies/how-ggwp-generated-4m-in-pipeline-with-valley`, `/casestudies/how-gocanvas-30x’d-outbound-pipeline-with-valley`, `/casestudies/how-linarca-booked-14-qualified-meetings-in-their-first-month-with-valley`, `/casestudies/how-thinkfish-books-380-400-meetings-monthly-with-valley`.

## 9. Could not capture / notes

1. The Surface demo form (third-party) is linked, not recreated.
2. The composition SVG icons inside the workflow visuals are inline in the component source (`source/d9S…mjs`) and in `dumps/svgs.json`; they were not exported as separate files.
3. Tablet width 1024 was not sampled for this page (not requested); intermediate widths follow the `@container` rules in `components.css`.
