Source: https://www.joinvalley.co/compare

# /compare: clone spec

Measured from the live page on 2026-09-29 with headless Chromium (Playwright) at 1440x900, 1280x900, 768x900 and 390x844, cookie banner hidden. Global rules (fonts, tokens) are in `/Users/riyaghosh/V3/Valley/CLONE_SPEC.md`.

## 0. Files

- `spec/pages/compare/dumps/dump_{1440,1280,768,390}.txt`, `sections_*.json`, `media_*.json`, `reqs_*.json`, `texts.json`, `svgs.json` (includes the 1344x487 track SVG), `meta.json`, `listeners.json`, `css_raw.json`, `vc_main_heyreach.html` (full `.vc` DOM in the default HeyReach state).
- `spec/pages/compare/components.css`: verbatim `.vc*` CSS (251 rules, `@container` rules at 1100/900/780/620/470 etc., `prefers-reduced-motion`), plus `vc-light-pass` and `vc-trace-in` keyframes.
- `spec/pages/compare/states/competitors.json`: **verbatim `.vc-main` text and links for all 19 competitors** (HeyReach, Gojiberry, Amplemarket, lemlist, Instantly, Artisan, 11x, Expandi, Clay, PhantomBuster, Apollo, Smartlead, Dripify, Linked Helper, AiSDR, Regie.ai, Reply.io, Outreach, Salesloft). `states/interactions.txt`: category filter results, search, accordion, hover/focus and animation timings.
- `spec/pages/compare/screens/full_{1440,1280,768,390}.jpg`, `state_picker_all_1440.jpg`, `state_search_cl_1440.jpg`, `state_criteria_open_1440.jpg`.
- `spec/pages/compare/source/ValleyWorkflowComparison.wJFjzal1.mjs`: the component module, which holds the full competitor dataset (statuses, notes, source URLs, pricing text) and the SVG track drawing code. Reference for Build; porting the data from it is simpler than re-typing `competitors.json`.
- `spec/pages/compare/ASSETS.md`.

## 1. Page skeleton

- Framer breakpoints 1200 / 810 (same as the homepage). Nav: **reuse homepage `Nav`** (identical; fixed; no appear animation on this page). Footer: **reuse homepage `Footer`** (identical).
- One content section, `compare`: Framer wrapper "Complete outbound comparison" with top padding **100px** (768/390: **80px**) to clear the fixed nav, containing the code component `section.vc` (full-bleed, bg #f7f9f7).

| id | Framer layer / component root | position | 1440 y / h | 1280 y / h | 768 y / h | 390 y / h |
|---|---|---|---|---|---|---|
| `nav` | Valley navigation / `.vpm` | fixed | 0 / 84 | 0 / 84 | 0 / 68 | 0 / 68 |
| `compare` | Complete outbound comparison / `.vc` | relative | 0 / 4471 | 0 / 4516 | 0 / 6446 | 0 / 9002 |
| `footer` | Valley footer / `.vf` | relative | 4471 / 597 | 4516 / 597 | 6446 / 643 | 9002 / 815 |


Document height: 5068px at 1440, 5113px at 1280, 7089px at 768, 9817px at 390.

**New components:** `ValleyCompare` (`.vc`) with sub-parts Intro, Picker, TrackKey, TrackSVG (desktop) / Timeline (container ≤780), Legend, Criteria accordion, Differences, Pricing, Table, Proof, Close, Directory, Method. The same component in `compact` mode is used on /product (see product.md §4).

## 2. `.vc` anatomy (1440 values; 1280 identical except widths; see dumps for 768/390)

Font `ValleyCompare` = alias of `/assets/fonts/4U27qiCuAgm6sc2vgHfWPBCGc.woff2` (PPNM Variable 100–900). Base 17px/1.5, color #1c292e.

1. **Intro** `header.vc-intro`: `padding: 62px 48px 32px`, flex row, space-between, align end, gap 44 (768: `35px 30px 32px`, stacked; 390: `35px 20px 32px`).
   - eyebrow "Valley vs. Competition": 14/21, ls 1.82px (0.13em), w500, uppercase, #52616a.
   - h1 "The whole workflow. A clearer choice." (2 lines, `<br>`): **76/78.28, ls -4.18px (-0.055em), w500**, width 586 (768: 46/47.38 ls -2.53; 390: 39/40.17 ls -2.145).
   - right p: 18/27 #58685e, max 300 (desktop), `padding-bottom: 5px`.
2. **Picker** `.vc-picker`: `padding: 0 48px 26px`, bottom border 1px #d5ddd1.
   - top row: "Compare Valley with" 17/25.5 w500; controls (gap 8): search `input` 190x48 (placeholder "Find a competitor", 16/24 #344d40, bg #fcfcf8, border 1px #cbd4c5, `padding: 10px 12px`) and category `select` 190x48 (same style) with options: All competitors · LinkedIn & sequencing · AI outbound platforms · Email & infrastructure · Data & automation · Revenue platforms. At 390 the controls stack full width (350x48 each).
   - chips `.vc-companies` (flex wrap, gap 7): `button.vc-company` min-height 44, `padding: 10px 13px` (390: `9px 10px`), border 1px #d3dace, 16/24 #4e5e52, 20x20 favicon (`object-fit: contain`, `filter: grayscale(1); opacity: .8`). Pressed (`aria-pressed=true`): bg/border #233f33, text #f7faee, favicon in color. Hover: bg #eaf0e5, border #718778 (instant). Focus-visible: 2px #436c9b offset 4.
   - Default shows 10 "featured" chips (HeyReach pressed) + a text button "All 19 competitors" (16/24 #425c4b, `padding: 10px`). Clicking it shows all 19 chips and the button becomes "Show featured".
3. **Main** `.vc-main` (`padding: 32px 48px 0`):
   - `.vc-comparison-heading`: h2 "Valley vs. HeyReach" 32/35.2 ls -1.12 w500 (the "vs." span #788578), category p 16/24 #52616a (e.g. "LinkedIn & sequencing"), right link "Read the full comparison ↗" 16/24 → the competitor's blog post.
   - strong "Start with the signal. Follow it to the reply." 22/33 ls -0.44 w500; span "Read left to right. Valley is the upper track; HeyReach is below." 17/25.5 #52616a.
   - `.vc-track-key` (`padding: 17px 0`, top+bottom border 1px #d5ddd1): Valley brand (35x12 swatch = cover crop of `DzF7ltBGreQELkgImDCaxxldqH0.jpg`, Valley mark 24x24, "Valley" 23px, "Upper track" 14px #394c56) and the rival group (swatch #d3d9cf, favicon, name 18px, "Lower track", channel badges: "Email ↗ Other tool" (border #cbd3c6) and "LinkedIn ✓ Built in" (bg #e9f0f2, border #9caf96), 14/18.2).
   - **Track SVG** 1344x487 (inline, drawn by the component from the data; dump in `svgs.json`/`vc_main_heyreach.html`): two horizontal tracks across the seven stages with status symbols per stage; `.vc-light` (opacity .65) sweeps along the Valley track; `.vc-trace` paths draw in on selection. Below a 780px container this SVG is replaced by `.vc-timeline`: a head row (Valley vs competitor with 10px badges) and one `li` per stage (`padding: 24px 0`, 2-col grid 169/169 at 390, h4 20/30 with number "0 1" 11px #6c7a62, "What counts" criterion, each side a 2px left-bordered cell with status + note).
   - `.vc-legend` (`padding: 10px 0 24px`, bottom border): "✓ Built in", "◐ Limited / external", "— No confirmed coverage" (symbols 21/31.5 w700; labels 16/24), right note 15/22.5 #52616a.
   - `details.vc-criteria` (`padding: 22px 0`, bottom border): summary "What each stage means" 20/30 w500 + "7 steps in the workflow" 15px #52616a. Closed by default; opens instantly (no transition, height 75 → 711 at 1440). Content: `ol` grid 3 cols (432 each, gap 24) of white cards (border 1px #d5dfe0, `padding: 20px`): number 13px ls 1.56 w500 #52616a, h4 19/26.6 w500, p 16/25.6 #52616a.
   - `.vc-differences` (`padding: 36px 0`, bottom border): h3 26/31.2 ls -0.65 (competitor-specific, e.g. "The purchase begins before the connection request") + `ol` 3 cols gap 32, items 17/27.2 #394c56 with counter "01/02/03" (`::before`).
   - `.vc-pricing` (`padding: 30px 0`): h3 "Compare the commitment, too." 25/30; grid 2 cols gap 32: Valley card (bg #e9f0f2, border 1px #d3dccd, `padding: 20px 22px`, h4 17px, price "$199" 34/40.8 ls -1.02 + "/ month" 14px, note 17/27.2, link "Valley plans ↗" → /pricing) and rival card (no bg; text + "Pricing source ↗").
   - `.vc-table-section` (`padding-top: 34px`): h3 "Every stage, side by side." 26/31.2; `table` with caption (15/24 #52616a) and columns "The work" 255 / "Valley" 544 (cells bg #e9f0f2) / competitor 544; `th`/`td` `padding: 19px 20px`, bottom border 1px #d5ddd1, text 17/27.2 #394c56. Status labels 16/22.4 w500: "Built in" #2d5637 with ✓, "Requires another tool" #394c56 with ↗, "Partial coverage" with ◐. Email+LinkedIn row has a nested `.vc-channel-details` list. Each cell ends with "Product details ↗" / "View source ↗" links (15/24 #52616a).
4. **Proof** `aside.vc-proof` (full-bleed, bg #e9f0f2, border-top/bottom 1px #d5ddd1, `padding: 35px 48px`, grid 1134/178): eyebrow "Bolt.new, with Valley" 14px ls 1.82 uppercase, blockquote "“Valley is a cheat code.”" 27/32.4 ls -0.675, p 15/22.5, link "Read the customer story ↗".
5. **Close** `.vc-close` (`padding: 35px 48px`, flex space-between): h3 "Bring a prospect. Judge the work." 29/33.35 ls -0.87 w500, p 17/25.5 #394c56 max 640; actions: "Compare plans ↗" → /pricing and `.vc-cta` "See Valley in action" (bg #1c292e, #fff, `padding: 14px 20px`, 202x52, hover bg **#3e5c43**, instant) → https://meetings.hubspot.com/zayd-from-valley/tryvalley.
6. **Directory** `nav.vc-directory` (`padding: 28px 48px`, top border): h3 "Find your comparison" 22/33; grid 4 cols gap `13px 26px`, 19 links 15/22.5 #52616a (list in §5).
7. **Method** `.vc-method` (`padding: 26px 48px`, top border, grid 180/1134 gap 30): h3 "How we compare" 18/27; p 15/22.5 #52616a; source links row (gap 14).

## 3. Interaction states and data behaviour (measured)

- **Chip click**: switches the whole `.vc-main` to that competitor (heading, category, track, differences, pricing, table, method sources). URL does not change (no query param). `.vc` height varies per competitor: 4373 (HeyReach) … 4510 (11x) at 1440; all values in `interactions.txt`.
- **Category select**: filters the chip row. Measured: LinkedIn & sequencing → HeyReach, lemlist, Expandi, Dripify, Linked Helper, Reply.io; AI outbound platforms → Gojiberry, Amplemarket, Artisan, 11x, Apollo, AiSDR, Regie.ai; Email & infrastructure → Instantly, Smartlead; Data & automation → Clay, PhantomBuster; Revenue platforms → Outreach, Salesloft. (Selection is not changed by filtering.)
- **Search**: case-insensitive filter on name ("cl" → Clay). No match → the chip row is empty (no message).
- **Criteria accordion**: native `<details>`, instant.
- Hovers: chips (above), `.vc-cta` (above); all text links: no hover change. Focus-visible: 2px #436c9b offset 4 on chips.

## 4. Motion (measured)

- `.vc-light`: `vc-light-pass 11s ease-in-out infinite` (translateX 0 held to 12%, travels to 1620px by 60%, held to 100%), opacity .65.
- `.vc-trace`: `vc-trace-in .8s ease-out 1 both` (stroke-dasharray 1 with pathLength, dashoffset 1 → 0, opacity .3 → 1).
- Both animations restart at currentTime 0 on every competitor switch (the SVG is re-keyed), measured one frame after click.
- No appear/scroll effects; nav does **not** play the load appear here. `prefers-reduced-motion`: all `.vc` animations/transitions off.

## 5. Verbatim copy (default HeyReach state; other competitors in `states/competitors.json`)

#### `compare` verbatim innerText (1440)

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
The purchase begins before the connection request
Research and enrichment are supplied by a connected intelligence layer.
External AI agents can create custom messages; native learned written style is not established.
LinkedIn sending is native; email execution needs a connected sender.
Compare the commitment, too.
Valley Starter

$199 / month

Or $149/month billed quarterly ($447 per quarter). Email is an optional add-on; included with Plus.

Valley plans ↗
HeyReach

HeyReach Growth lists $79 per sender/month, or $71 per month billed quarterly ($213). Its email workflow uses connected tools, so budget for those subscriptions and research separately.

Pricing source ↗
Every stage, side by side.
Valley and HeyReach: public product documentation. “Not verified” does not mean unavailable.
The work	Valley	HeyReach
Live buying signals	
✓
Built in

Find prospects through buying signals, playbooks, or your own list.

Product details ↗	
↗
Requires another tool

Signals and discovery arrive from Clay, RB2B or other upstream tools.

View source ↗
Qualify	
✓
Built in

Check prospects against your ideal customer profile and review the reasons for each match.

Product details ↗	
↗
Requires another tool

Documented qualification happens upstream before HeyReach receives the lead.

View source ↗
Deep research	
✓
Built in

Bring prospect activity, interviews, and company context into sourced research.

Product details ↗	
↗
Requires another tool

Research and enrichment are supplied by a connected intelligence layer.

View source ↗
Your writing voice	
✓
Built in

Turn the research and your writing style into drafts you can review and edit.

Product details ↗	
↗
Requires another tool

External AI agents can create custom messages; native learned written style is not established.

View source ↗
Email + LinkedIn	
✓
Built in

Run researched LinkedIn and email campaigns. Email is included with Plus and an optional add-on on Starter.

Product details ↗	
↗
Requires another tool

LinkedIn sending is native; email execution needs a connected sender.

Email
↗
Requires another tool

Execution relies on a connected tool.

Email source ↗
LinkedIn
✓
Built in

Automated native linkedin execution documented.

LinkedIn source ↗
View source ↗
Manage replies	
✓
Built in

Review replies with the prospect and campaign context close at hand.

Product details ↗	
✓
Built in

Unified Inbox manages replies across connected LinkedIn accounts.

View source ↗
Learn & improve	
✓
Built in

Use campaign results to refine your audience and messaging.

Product details ↗	
◐
Partial coverage

Reports and API events support operator or external-agent improvement; native outcome learning is not established.

View source ↗
BOLT.NEW, WITH VALLEY
“Valley is a cheat code.”

Stefano McCoy · Sales, Bolt.new. $1M+ pipeline in the first 60 days.

Read the customer story ↗
Bring a prospect. Judge the work.

Starter begins at $199/month, or $149/month billed quarterly. Choose Plus for included email, priority Slack support, and onboarding.

Compare plans ↗
See Valley in action
↗
Find your comparison
Valley vs. HeyReach ↗
Valley vs. Gojiberry ↗
Valley vs. Amplemarket ↗
Valley vs. lemlist ↗
Valley vs. Instantly ↗
Valley vs. Artisan ↗
Valley vs. 11x ↗
Valley vs. Expandi ↗
Valley vs. Clay ↗
Valley vs. PhantomBuster ↗
Valley vs. Apollo ↗
Valley vs. Smartlead ↗
Valley vs. Dripify ↗
Valley vs. Linked Helper ↗
Valley vs. AiSDR ↗
Valley vs. Regie.ai ↗
Valley vs. Reply.io ↗
Valley vs. Outreach ↗
Valley vs. Salesloft ↗
How we compare

Published by Valley. Sources checked September 14, 2026. We compare public product documentation across seven stages, not hands-on benchmark results. Writing cells distinguish variables, instructed AI copy, and learned voice. Features and availability may vary by plan. “Not verified” means the available evidence does not establish the capability. Check each source and the package you would buy.

HeyReach: Primary vendor source ↗
HeyReach: Primary vendor source ↗
HeyReach: Primary vendor source ↗
Valley product ↗
Suggest a correction ↗
```

## 6. Links

| section | link text | href (as authored) | type | resolved |
|---|---|---|---|---|
| compare | Read the full comparison ↗ | `/blog/valley-vs-heyreach-ai-powered-personalization-vs-multi-account-volume` | internal | /blog/valley-vs-heyreach-ai-powered-personalization-vs-multi-account-volume |
| compare | Valley plans ↗ | `/pricing` | internal | /pricing |
| compare | Pricing source ↗ | `https://www.heyreach.io/pricing` | external | https://www.heyreach.io/pricing |
| compare | Product details ↗ | `/product` | internal | /product |
| compare | View source ↗ | `https://www.heyreach.io/blog/trigger-based-outreach` | external | https://www.heyreach.io/blog/trigger-based-outreach |
| compare | View source ↗ | `https://www.heyreach.io/blog/automated-data-enrichment` | external | https://www.heyreach.io/blog/automated-data-enrichment |
| compare | View source ↗ | `https://www.heyreach.io/` | external | https://www.heyreach.io/ |
| compare | Product details ↗ | `/pricing` | internal | /pricing |
| compare | Email source ↗ | `https://www.heyreach.io/` | external | https://www.heyreach.io/ |
| compare | LinkedIn source ↗ | `https://www.heyreach.io/` | external | https://www.heyreach.io/ |
| compare | Read the customer story ↗ | `/casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days` | internal | /casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days |
| compare | Compare plans ↗ | `/pricing` | internal | /pricing |
| compare | See Valley in action ↗ | `https://meetings.hubspot.com/zayd-from-valley/tryvalley` | external | https://meetings.hubspot.com/zayd-from-valley/tryvalley |
| compare | Valley vs. HeyReach ↗ | `/blog/valley-vs-heyreach-ai-powered-personalization-vs-multi-account-volume` | internal | /blog/valley-vs-heyreach-ai-powered-personalization-vs-multi-account-volume |
| compare | Valley vs. Gojiberry ↗ | `/blog/valley-vs-gojiberry` | internal | /blog/valley-vs-gojiberry |
| compare | Valley vs. Amplemarket ↗ | `/blog/valley-vs-amplemarket` | internal | /blog/valley-vs-amplemarket |
| compare | Valley vs. lemlist ↗ | `/blog/valley-vs-lemlist` | internal | /blog/valley-vs-lemlist |
| compare | Valley vs. Instantly ↗ | `/blog/valley-vs-instantly` | internal | /blog/valley-vs-instantly |
| compare | Valley vs. Artisan ↗ | `/blog/artisan-vs-valley-which-ai-sdr-platform-actually-books-meetings` | internal | /blog/artisan-vs-valley-which-ai-sdr-platform-actually-books-meetings |
| compare | Valley vs. 11x ↗ | `/blog/valley-vs-11x` | internal | /blog/valley-vs-11x |
| compare | Valley vs. Expandi ↗ | `/blog/valley-vs-expandi-which-linkedin-outreach-tool-is-right-for-your-team` | internal | /blog/valley-vs-expandi-which-linkedin-outreach-tool-is-right-for-your-team |
| compare | Valley vs. Clay ↗ | `/blog/valley-vs-clay` | internal | /blog/valley-vs-clay |
| compare | Valley vs. PhantomBuster ↗ | `/blog/valley-vs-phantombuster` | internal | /blog/valley-vs-phantombuster |
| compare | Valley vs. Apollo ↗ | `/blog/valley-vs-apollo` | internal | /blog/valley-vs-apollo |
| compare | Valley vs. Smartlead ↗ | `/blog/valley-vs-smartlead` | internal | /blog/valley-vs-smartlead |
| compare | Valley vs. Dripify ↗ | `/blog/valley-vs-dripify-which-linkedin-outreach-tool-actually-converts-in-2026` | internal | /blog/valley-vs-dripify-which-linkedin-outreach-tool-actually-converts-in-2026 |
| compare | Valley vs. Linked Helper ↗ | `/blog/valley-vs-linkedhelper` | internal | /blog/valley-vs-linkedhelper |
| compare | Valley vs. AiSDR ↗ | `/blog/valley-vs-aisdr` | internal | /blog/valley-vs-aisdr |
| compare | Valley vs. Regie.ai ↗ | `/blog/valley-vs-regie` | internal | /blog/valley-vs-regie |
| compare | Valley vs. Reply.io ↗ | `/blog/valley-vs-reply` | internal | /blog/valley-vs-reply |
| compare | Valley vs. Outreach ↗ | `/blog/valley-vs-outreach` | internal | /blog/valley-vs-outreach |
| compare | Valley vs. Salesloft ↗ | `/blog/valley-vs-salesloft` | internal | /blog/valley-vs-salesloft |
| compare | HeyReach: Primary vendor source ↗ | `https://www.heyreach.io/blog/trigger-based-outreach` | external | https://www.heyreach.io/blog/trigger-based-outreach |
| compare | HeyReach: Primary vendor source ↗ | `https://www.heyreach.io/blog/automated-data-enrichment` | external | https://www.heyreach.io/blog/automated-data-enrichment |
| compare | HeyReach: Primary vendor source ↗ | `https://www.heyreach.io/` | external | https://www.heyreach.io/ |
| compare | Valley product ↗ | `/product` | internal | /product |
| compare | Suggest a correction ↗ | `mailto:hey@joinvalley.co` | external (mailto) | mailto:hey@joinvalley.co |

Internal links outside the known routes (/, /pricing, /product, /about, /compare, /playbooks): `/blog/artisan-vs-valley-which-ai-sdr-platform-actually-books-meetings`, `/blog/valley-vs-11x`, `/blog/valley-vs-aisdr`, `/blog/valley-vs-amplemarket`, `/blog/valley-vs-apollo`, `/blog/valley-vs-clay`, `/blog/valley-vs-dripify-which-linkedin-outreach-tool-actually-converts-in-2026`, `/blog/valley-vs-expandi-which-linkedin-outreach-tool-is-right-for-your-team`, `/blog/valley-vs-gojiberry`, `/blog/valley-vs-heyreach-ai-powered-personalization-vs-multi-account-volume`, `/blog/valley-vs-instantly`, `/blog/valley-vs-lemlist`, `/blog/valley-vs-linkedhelper`, `/blog/valley-vs-outreach`, `/blog/valley-vs-phantombuster`, `/blog/valley-vs-regie`, `/blog/valley-vs-reply`, `/blog/valley-vs-salesloft`, `/blog/valley-vs-smartlead`, `/casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days`.

## 7. Could not capture / notes

1. Competitor favicons are Google favicon-service images (third-party); local copies at 128px are in `public/assets/pages/compare/` (HeyReach's is a JPEG). A few services return 38–48px icons only (Linked Helper, lemlist).
2. The track SVG geometry is generated by code; the rendered SVG for HeyReach at 1440 is in `svgs.json`, the generator is in `source/ValleyWorkflowComparison…mjs`. Other competitors' SVGs were not saved individually (their statuses are in `competitors.json`).
3. The HubSpot booking page behind "See Valley in action" is external.
