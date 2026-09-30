Source: https://www.joinvalley.co/playbooks

# /playbooks: clone spec

Measured from the live page on 2026-09-29 with headless Chromium (Playwright) at 1440x900, 1280x900, 768x900 and 390x844, cookie banner hidden. Global rules (fonts, the "PP Neue Montreal renders as Inter" quirk, tokens) are in `/Users/riyaghosh/V3/Valley/CLONE_SPEC.md`.

## 0. Files

- `spec/pages/playbooks/dumps/dump_{1440,1280,768,390}.txt`, `sections_*.json`, `media_*.json`, `reqs_*.json`, `texts.json`, `svgs.json`, `meta.json`, `listeners.json`, `css_raw.json`, `drawer_first.html` (the open drawer's DOM).
- `spec/pages/playbooks/components.css`: verbatim `.vpl*` CSS (85 rules) incl. the `<dialog>` drawer.
- `spec/pages/playbooks/states/plays.json`: **all 58 plays**: card text, `?play=` href and the **full verbatim drawer text + links** for each. `states/categories.json`: the card list per category. `states/interactions.txt`: hovers, focus, search, drawer measurements.
- `spec/pages/playbooks/screens/full_{1440,1280,768,390}.jpg`, `state_drawer_1440.jpg`, `state_drawer_390.jpg`, `state_search_empty_1440.jpg`.
- `spec/pages/playbooks/source/2fchlP4D…mjs`: page module containing the `.vpl` component and its plays dataset (reference).
- `spec/pages/playbooks/ASSETS.md` (no new files; every image is already in `public/assets`).

## 1. Page skeleton, breakpoints

- Framer page breakpoints for this route are **Desktop `>=1440`, Tablet `810–1439.98`, Phone `<=809.98`** (differs from the homepage). Consequence: at **1280 the page already uses the Tablet variant, so the nav shows the `Phone - Close` hamburger header (68px)** even though the homepage shows the desktop nav at 1280.
- The nav wrapper here is **`position: sticky; top: auto`** in normal flow (not fixed): it takes 84px (desktop) / 68px of layout height at the top and the content starts below it. Visually it behaves like the homepage nav otherwise (reuse the `Nav` component with a `sticky` prop; no appear animation on this page).
- One content section (`section.vpl`, bg #f7f9f7) and the shared footer.

| id | Framer layer / component root | position | 1440 y / h | 1280 y / h | 768 y / h | 390 y / h |
|---|---|---|---|---|---|---|
| `nav` | Large Desktop / `.vpm` | sticky | 0 / 84 | 0 / 68 | 0 / 68 | 0 / 68 |
| `playbooks` | - / `.vpl-hero` | relative | 84 / 7571 | 68 / 7902 | 68 / 11339 | 68 / 20211 |
| `footer` | Desktop / `.vf` | relative | 7655 / 597 | 7970 / 597 | 11407 / 643 | 20279 / 815 |


Document height: 8252px at 1440, 8567px at 1280, 12050px at 768, 21094px at 390.

| id | Status |
|---|---|
| `nav` | **Reuse homepage `Nav`** (sticky variant, see above). |
| `playbooks` | **New code component** `.vpl`: hero, category tiles, toolbar with search, card grid, `<dialog>` drawer. |
| `footer` | **Reuse homepage `Footer`** (identical). |

## 2. `.vpl` anatomy

Font stack `"PP Neue Montreal", Inter, Arial` → renders as **Inter 400/700** (CLONE_SPEC §4 quirk; w500 renders as 400). Base 17/1.5 #1c292e.

### Hero `header.vpl-hero`
- max-width 1456, centered; `padding: 100px 48px 72px` (768: `80px 48px 72px`; 390: `60px 24px 48px`). Height 543 (1440) / 531 / 456 / 592.
- eyebrow "The Valley playbook library": 12/18, ls 1.2px (0.1em), uppercase, #4b6b7a.
- h1 "A better reason to reach out." `<br>` "A play for every one.": **72/74.88, ls -2.88px (-0.04em)**, w500, max 960, `white-space: pre-line`; size is `clamp(40px, 5.2vw, 72px)`, lh 1.04, ls -0.04em (measured 1280: 66.56/69.22 ls -2.66; 768/390: 40/41.6 ls -1.6).
- p "Ready-to-run outreach plays. Pick your starting signal, review the plan, and let Valley find, qualify, research and reach out." 21/31.5 #52616a, max 750.
- actions: `a.vpl-cta` "Start for free" + 20px arrow SVG, bg #18282d, #fff, 16/24, `padding: 16px 24px`, 192x56, hover bg **#304c56** (instant) → https://beta.joinvalley.co/signup; `a.vpl-product` "Explore the product ↗" 17/25.5, margin-left 28, underline offset 6 → `/product` (no hover change measured).

### Category tiles `.vpl-categories`
- grid 6 cols (1440: 214 each; 1280: 187), gap 12; 768: 3 cols (216); 390: 2 cols (165). Tiles 150px tall.
- `button`: flex column, justify end, `padding: 20px 16px`, border 2px transparent, bg `linear-gradient(0deg, rgba(17,35,40,.94), rgba(17,35,40,.05))` over a cover image. Label `span` 16/19.2 w500 #fff; count `small` 13/19.5 #e0e9e9.
- Selected (`aria-pressed=true`): `outline: 2px solid #3476a7; outline-offset: 3px`. Hover: no change.
- Tiles and images (all already in `public/assets/img/`):

| Tile | Count | Background image |
|---|---|---|
| All plays | 58 plays | `PFm0moxeBn8eOm66rVN2ssTio.png` |
| The basics | 7 plays | `5WP0tI1lICNwC23waJVfpSCTTpE.png` |
| Content & social signals | 9 plays | `V5YzrhTWz6oX6qYDyJJzGKbRnIU.png` |
| Buying signals | 29 plays | `DzF7ltBGreQELkgImDCaxxldqH0.jpg` |
| Your lists & network | 16 plays | `PFm0moxeBn8eOm66rVN2ssTio.png` |
| Press, investors & advisors | 3 plays | `5WP0tI1lICNwC23waJVfpSCTTpE.png` |

### Toolbar `.vpl-toolbar`
- flex space-between, align end, gap 24, `margin: 52px 0 24px` (390: column, stretch).
- left: h2 (selected category name) 30/45 ls -0.6 w500 + count span 14/21 #52616a ("58 plays", or "3 plays matching your search").
- right: `label.vpl-search` 360 wide (390: full): caption "Search playbooks" 14/21 #52616a, gap 7, `input` 360x54, placeholder "Try hiring, competitors or LinkedIn…", 17/25.5, bg #fff, border 1px #cfdad9, `padding: 13px 16px`.

### Card grid `.vpl-grid`
- grid 3 cols (1440: 437; 1280: 384), gap 16; 768: 2 cols (328); 390: 1 col (342).
- card = `article > a` (href `/playbooks?play=<slug>`): flex column, `padding: 28px`, bg #fff, border 1px #d4dedd, `min-height: 300px`; **hover bg #edf3f1, border #77968c, `transition: background .18s, border-color .18s`** (ease). Focus-visible outline 3px #3476a7 offset 4.
  - top row: tag 12/18 ls .72 uppercase #396585 ("Popular play" / "Valley play" / "Coming soon") + 20px arrow icon (stroke #396585).
  - h3 25/30 (lh 1.2) ls -0.025em (-0.625px) w500 (card-top to h3 distance 24px at 1440).
  - p 17/25.5 #52616a, `padding-bottom: 26px`.
  - foot (margin-top auto, `padding-top: 18px`, top border 1px #dbe3df): cadence left, channel right, 14/21 #52616a.
- Empty search state `.vpl-empty`: h3 "No plays match that search.", p "Try a signal such as hiring, profile viewers or funding.", button "Show all plays".

### Play drawer (`dialog.vpl-dialog`, native modal)
- Opens on card click (the `<a>`'s default navigation is prevented); URL becomes `/playbooks?play=<slug>` and **a direct visit to that URL opens the drawer on load** (verified with `?play=recruit-advisors`). Close button / Esc closes it and the URL returns to `/playbooks`. `body` gets `overflow: hidden` while open.
- Geometry: right-aligned full-height sheet, `width: min(680px, 100vw)`, `height: 100dvh`, `margin: 0 0 0 auto` (1440: x=760, 680x900; 390: full screen 390x844), bg #fcfdfb, no shadow, scrolls internally. `::backdrop` `rgba(17,31,38,.48)` + `backdrop-filter: blur(5px)`.
- **No open/close animation** (sampled every 60ms: opacity 1, transform none from the first frame).
- Content (`.vpl-detail-body`, `padding: 64px 40px 32px`): close "×" (44x44 at top 16 / right 20, 32px); eyebrow "Valley playbook"; h2 38/1.12 ls -0.03em w500 (≤600px: 32px); description 20px #52616a; "Outreach channel: …" 16px; flow chips `.vpl-flow` (12px, `padding: 6px 9px`, bg #edf2f5, text #315b79, border 1px #d5e0e8; the final "send" chip bg #1c292e #fff; separators "›"); steps `ol` (grid 34px / 1fr, gap 20, 28px bottom padding; number badge 32x32 circle, border 1px #92aca8, 12px #315b79; h3 20 w500; p 17 #52616a); setup box (`padding: 24px`, bg #eef3ef, border 1px #d4dfd9; h3 "Before you launch"; `dl` rows 14px with top borders); note 14px #52616a.
- Sticky footer `.vpl-detail-footer` (`padding: 20px 40px`, top border 1px #d4dfd9, bg #fcfdfb): full-width "Start for free" CTA → https://beta.joinvalley.co/signup.

## 3. Interaction states (measured)

| Element | Hover | Focus-visible | Active | Transition |
|---|---|---|---|---|
| Play card | bg #fff → #edf3f1, border #d4dedd → #77968c | 3px #3476a7 offset 4 | opens drawer | background/border-color .18s ease (sampled #f4f7f6 at 80ms, done by 150ms) |
| Category tile | none | 3px #3476a7 offset 4 | 2px #3476a7 outline offset 3 | none |
| `.vpl-cta` | bg #18282d → #304c56 | same | - | none |
| `.vpl-product`, drawer close | none | same | - | none |
| Search | filters live on input (title/description match); count text changes to "N plays matching your search" | | | none |

Category click filters the grid instantly and does not change the URL.

## 4. Motion

None beyond the card hover transition: no appear effects, no scroll-driven effects, no drawer animation, no autoplay. The nav does not play the load appear here.

## 5. All plays (card data; drawer copy per play is in `states/plays.json`)

| # | Tag | Title | Card description | Cadence | Channel | Category | `?play=` slug |
|---|---|---|---|---|---|---|---|
| 1 | POPULAR PLAY | Message your qualified profile viewers | Highly relevant outreach to people viewing your LinkedIn profile who fit your ICP. | Runs daily | LinkedIn only | The basics, Content & social signals | `message-your-qualified-profile-viewers` |
| 2 | POPULAR PLAY | Message your competitors' engagers | People engaging with a competitor you name. Already problem-aware, already shopping. | Runs daily | LinkedIn only | The basics, Content & social signals | `message-your-competitors-engagers` |
| 3 | POPULAR PLAY | Hiring for roles that signal your problem | A job post is a company announcing a gap. Catch them while it hurts. | Refills daily | LinkedIn only | Buying signals | `hiring-for-roles-that-signal-your-problem` |
| 4 | POPULAR PLAY | Hijack lead-magnet posts | Find viral lead-magnet posts your audience engaged with, scrape the engagers, message the best fits. | One-time | LinkedIn only | The basics, Content & social signals | `hijack-lead-magnet-posts` |
| 5 | POPULAR PLAY | Message your post engagers | People reacting to and commenting on your posts, qualified and messaged. | Runs daily | LinkedIn only | Content & social signals | `message-your-post-engagers` |
| 6 | POPULAR PLAY | Publicly discussing a problem you solve | Companies and decision makers talking about your problem, out loud, on the record. | Refills daily | LinkedIn only | Buying signals | `publicly-discussing-a-problem-you-solve` |
| 7 | POPULAR PLAY | Find companies with signal-based search | Companies and decision makers talking about your problem, out loud, on the record. | Refills daily | LinkedIn only | The basics, Buying signals | `find-companies-with-signal-based-search` |
| 8 | POPULAR PLAY | Hyper-relevant messaging to a Sales Nav audience | Paste the search. Valley qualifies, researches, and writes for every person in it. | One-time | LinkedIn only | The basics, Your lists & network | `hyper-relevant-messaging-to-a-sales-nav-audience` |
| 9 | POPULAR PLAY | Just raised or acquired | New money means new headcount, new tools, new urgency. | Refills weekly | LinkedIn only | Buying signals | `just-raised-or-acquired` |
| 10 | POPULAR PLAY | Message the post engagers of major influencers in your space | The people commenting on the big accounts in your space are your buyers, pre-warmed. | Runs daily | LinkedIn only | Content & social signals | `message-the-post-engagers-of-major-influencers-in-your-space` |
| 11 | POPULAR PLAY | Companies running paid ads | Companies actively spending on paid ads right now, across Meta, Google, and LinkedIn. A live in-market budget signal. | Refills daily | LinkedIn only | Buying signals | `companies-running-paid-ads` |
| 12 | POPULAR PLAY | Clone your best customers | Companies that look exactly like your top ten accounts, found on the open web. | Refills weekly | LinkedIn only | Buying signals | `clone-your-best-customers` |
| 13 | POPULAR PLAY | Message any post's engagers | Paste any LinkedIn posts, yours or anyone's. Valley scrapes everyone who engaged and messages the best fits. | One-time | LinkedIn only | Content & social signals | `message-any-post-s-engagers` |
| 14 | POPULAR PLAY | Displace a competitor | Companies publicly using the tool you replace. The category is sold, the vendor is not. | Refills weekly | LinkedIn only | Buying signals | `displace-a-competitor` |
| 15 | POPULAR PLAY | Upload a list + send templated messages | A proven three-step connect sequence that asks for the meeting. | One-time | LinkedIn only | Your lists & network | `upload-a-list-send-templated-messages` |
| 16 | POPULAR PLAY | Ambush a competitor's launch | Everyone engaging their launch post is evaluating. Get in the consideration set. | One-time | LinkedIn only | Buying signals | `ambush-a-competitor-s-launch` |
| 17 | POPULAR PLAY | New exec, new budget | A just-hired VP or C-level in your buying seat rethinks the stack in their first 90 days. | Refills weekly | LinkedIn only | Buying signals | `new-exec-new-budget` |
| 18 | VALLEY PLAY | Hiring the role you replace | They budgeted a salary for the problem. Offer them the software instead. | Refills daily | LinkedIn only | Buying signals | `hiring-the-role-you-replace` |
| 19 | VALLEY PLAY | Catch competitor churn | People publicly complaining about the tool they use are mid-switch. Be there. | Refills daily | LinkedIn only | Buying signals | `catch-competitor-churn` |
| 20 | VALLEY PLAY | Upload a list + send hyper-relevant messages | Your list, Valley’s brain. Every row needs a LinkedIn profile URL. | One-time | LinkedIn only | The basics, Your lists & network | `upload-a-list-send-hyper-relevant-messages` |
| 21 | VALLEY PLAY | Using complementary technology | Their stack tells you they are your buyer before they do. | Refills weekly | LinkedIn only | Buying signals | `using-complementary-technology` |
| 22 | VALLEY PLAY | Mine your old viral post | That post that popped six months ago is a prospect list nobody harvested. | One-time | LinkedIn only | Your lists & network | `mine-your-old-viral-post` |
| 23 | VALLEY PLAY | Message your company page followers | Your own company page. Valley pulls everyone who follows you and messages the best fits. | One-time | LinkedIn only | Content & social signals | `message-your-company-page-followers` |
| 24 | VALLEY PLAY | Competitors' followers | Valley finds your competitors' LinkedIn pages and pulls everyone following them. They already care about your category. | One-time | LinkedIn only | Content & social signals | `competitors-followers` |
| 25 | VALLEY PLAY | Clone your ICP by firmographics | Companies that match your ICP on size, industry, and geography, from Apollo firmographics. | Refills daily | LinkedIn only | Buying signals | `clone-your-icp-by-firmographics` |
| 26 | VALLEY PLAY | Re-engage a previous campaign | People who accepted your connect but never replied get a fresh motion, by stage reached. | One-time | LinkedIn only | Your lists & network | `re-engage-a-previous-campaign` |
| 27 | VALLEY PLAY | Harvest a testimonial post's engagers | When a customer posts about you, everyone who liked it just raised a hand. | One-time | LinkedIn only | Your lists & network | `harvest-a-testimonial-post-s-engagers` |
| 28 | VALLEY PLAY | Recently launched on Product Hunt | Companies that just shipped and are trending on Product Hunt, founders named. | Refills daily | LinkedIn only | Buying signals | `recently-launched-on-product-hunt` |
| 29 | VALLEY PLAY | Ask your network for intros | A warm, low-pressure referral ask to first-degree connections who know your buyers. | One-time | LinkedIn only | Your lists & network | `ask-your-network-for-intros` |
| 30 | VALLEY PLAY | Follow through on your case study | Engagers of your own case-study post get the longer story, one to one. | One-time | LinkedIn only | Your lists & network | `follow-through-on-your-case-study` |
| 31 | VALLEY PLAY | Shopify brands with a stack gap | Shopify DTC brands in your niche missing an app category you sell into. | Refills daily | LinkedIn only | Buying signals | `shopify-brands-with-a-stack-gap` |
| 32 | VALLEY PLAY | Launched or partnered recently | A launch or partnership in the last six months means motion, budget, and press to reference. | One-time | LinkedIn only | Buying signals | `launched-or-partnered-recently` |
| 33 | VALLEY PLAY | Fastest-growing lists and awards | Inc 5000 types. Public proof of growth, and founders who love talking about it. | One-time | LinkedIn only | Buying signals | `fastest-growing-lists-and-awards` |
| 34 | VALLEY PLAY | Message your personal LinkedIn followers | A follow is a hand raise. Valley finds the ones worth shaking. | Runs daily | LinkedIn only | Content & social signals | `message-your-personal-linkedin-followers` |
| 35 | VALLEY PLAY | Crossover a newsletter author's audience | The engaged readership of a niche newsletter, reached where they actually reply. | Runs weekly | LinkedIn only | Buying signals | `crossover-a-newsletter-author-s-audience` |
| 36 | VALLEY PLAY | Companies at a target funding stage | Companies at the funding stage you target, optionally only ones that raised recently. Valley finds them. | Refills daily | LinkedIn only | Buying signals | `companies-at-a-target-funding-stage` |
| 37 | VALLEY PLAY | Headcount surge | Companies growing over 20% a year are buying tools this quarter, not someday. | Refills monthly | LinkedIn only | Buying signals | `headcount-surge` |
| 38 | VALLEY PLAY | Mine a conference before you get there | Engagers of the event and speaker posts, messaged before the booth even opens. | One-time | LinkedIn only | Buying signals | `mine-a-conference-before-you-get-there` |
| 39 | VALLEY PLAY | Conference follow-up | Upload the attendee list, follow up while the badge scan is warm. | One-time | LinkedIn only | Your lists & network | `conference-follow-up` |
| 40 | VALLEY PLAY | Opening new offices or markets | Geographic expansion means new teams, new processes, and no incumbent vendors. | One-time | LinkedIn only | Buying signals | `opening-new-offices-or-markets` |
| 41 | VALLEY PLAY | Share a lead magnet | Give-first sequence that opens with the asset, not the ask. | One-time | LinkedIn only | Your lists & network | `share-a-lead-magnet` |
| 42 | VALLEY PLAY | Catch podcast-clip engagers | People engaging podcast clips in your niche are listening to someone about your problem. | One-time | LinkedIn only | Buying signals | `catch-podcast-clip-engagers` |
| 43 | VALLEY PLAY | Modernizing off a legacy stack | Companies stuck on aging tools, found by the artifacts legacy software leaves in public. | One-time | LinkedIn only | Buying signals | `modernizing-off-a-legacy-stack` |
| 44 | VALLEY PLAY | Invite a list to an event | Invite plus two reminders, timed around your event date. | One-time | LinkedIn only | Your lists & network | `invite-a-list-to-an-event` |
| 45 | VALLEY PLAY | Reach ex-colleagues at new companies | People who worked where you worked, now sitting in buying seats elsewhere. | One-time | LinkedIn only | Your lists & network | `reach-ex-colleagues-at-new-companies` |
| 46 | VALLEY PLAY | Find people with AI | Describe who you want to reach. Valley finds matching people on LinkedIn and builds your list. | One-time | LinkedIn only | The basics, Your lists & network | `find-people-with-ai` |
| 47 | VALLEY PLAY | Recently PE-acquired or IPO’d | Ownership change resets every budget and every vendor relationship. | One-time | LinkedIn only | Buying signals | `recently-pe-acquired-or-ipo-d` |
| 48 | VALLEY PLAY | Engage your first-degree network | A slow, personal drip to people already in your network. | One-time | LinkedIn only | Your lists & network | `engage-your-first-degree-network` |
| 49 | VALLEY PLAY | People talking about it on podcasts | Founders and leaders who discussed your problem on a podcast will discuss it with you. | One-time | LinkedIn only | Buying signals | `people-talking-about-it-on-podcasts` |
| 50 | VALLEY PLAY | Message a synced Clay table | Your Clay workflows feed Valley continuously. New rows become outreach. | Syncs live | LinkedIn only | Your lists & network | `message-a-synced-clay-table` |
| 51 | VALLEY PLAY | Pitch journalists and analysts | The people covering your category, found for you and pitched with a story, not a press release. | One-time | LinkedIn only | Press, investors & advisors | `pitch-journalists-and-analysts` |
| 52 | VALLEY PLAY | Regulation with a deadline | When a rule changes in your space, every affected company becomes in-market at once. | One-time | LinkedIn only | Buying signals | `regulation-with-a-deadline` |
| 53 | VALLEY PLAY | Reach investors for your raise | Angels and VCs active in your category, found for you and approached with traction, not a cold deck. | One-time | LinkedIn only | Press, investors & advisors | `reach-investors-for-your-raise` |
| 54 | VALLEY PLAY | Recently rebranded | A rebrand is a company mid-reinvention. Every process is up for review. | One-time | LinkedIn only | Buying signals | `recently-rebranded` |
| 55 | VALLEY PLAY | Reach candidates engaging hiring content | People engaging posts about roles like yours are quietly looking. | One-time | LinkedIn only |  | `reach-candidates-engaging-hiring-content` |
| 56 | VALLEY PLAY | Recruit advisors | The operators you want around the table, found for you and approached with a real role. | One-time | LinkedIn only | Press, investors & advisors | `recruit-advisors` |
| 57 | VALLEY PLAY | Listed in partner directories | Agencies and consultancies in your ecosystem’s partner directories, already qualified by someone else. | One-time | LinkedIn only | Buying signals | `listed-in-partner-directories` |
| 58 | COMING SOON | Named accounts | Bring the accounts you are going after. Valley groups the buyers at each, watches every account for buying signals, and drafts the opener the moment one fires. | One-time | LinkedIn only | Your lists & network | `named-accounts` |

### Drawer copy example (play 1, verbatim)

```text
Valley playbook
Message your qualified profile viewers
Highly relevant outreach to people viewing your LinkedIn profile who fit your ICP.
Outreach channel: LinkedIn only
Profile viewers › Qualify fit › Research › LinkedIn only
01 Valley watches your profile viewers — New viewers picked up on a daily sync.
02 Qualifies against your ICP — Only high and medium fits move forward. The rest are ignored.
03 Researches each person — The message references why they matter, not that they viewed you.
04 Sends and manages replies — Drafts wait for your approval if you want them to.
Before you launch
Set your ideal customer criteria and connect the accounts you want to use.
LinkedIn Premium is required to access profile viewers.
Audience: High + medium fit
Cadence: Watch · daily
Review the audience, message and sending settings before starting. The channel shown is the sending channel for this play, not the source of its prospects.
[Start for free →]
```

## 6. Verbatim page copy

#### `playbooks` verbatim innerText (1440)

```text
THE VALLEY PLAYBOOK LIBRARY
A better reason to reach out.
A play for every one.

Ready-to-run outreach plays. Pick your starting signal, review the plan, and let Valley find, qualify, research and reach out.

Start for free
Explore the product ↗
All plays
58 plays
The basics
7 plays
Content & social signals
9 plays
Buying signals
29 plays
Your lists & network
16 plays
Press, investors & advisors
3 plays
All plays
58 plays
Search playbooks
POPULAR PLAY
Message your qualified profile viewers

Highly relevant outreach to people viewing your LinkedIn profile who fit your ICP.

Runs daily
LinkedIn only
POPULAR PLAY
Message your competitors' engagers

People engaging with a competitor you name. Already problem-aware, already shopping.

Runs daily
LinkedIn only
POPULAR PLAY
Hiring for roles that signal your problem

A job post is a company announcing a gap. Catch them while it hurts.

Refills daily
LinkedIn only
POPULAR PLAY
Hijack lead-magnet posts

Find viral lead-magnet posts your audience engaged with, scrape the engagers, message the best fits.

One-time
LinkedIn only
POPULAR PLAY
Message your post engagers

People reacting to and commenting on your posts, qualified and messaged.

Runs daily
LinkedIn only
POPULAR PLAY
Publicly discussing a problem you solve

Companies and decision makers talking about your problem, out loud, on the record.

Refills daily
LinkedIn only
POPULAR PLAY
Find companies with signal-based search

Companies and decision makers talking about your problem, out loud, on the record.

Refills daily
LinkedIn only
POPULAR PLAY
Hyper-relevant messaging to a Sales Nav audience

Paste the search. Valley qualifies, researches, and writes for every person in it.

One-time
LinkedIn only
POPULAR PLAY
Just raised or acquired

New money means new headcount, new tools, new urgency.

Refills weekly
LinkedIn only
POPULAR PLAY
Message the post engagers of major influencers in your space

The people commenting on the big accounts in your space are your buyers, pre-warmed.

Runs daily
LinkedIn only
POPULAR PLAY
Companies running paid ads

Companies actively spending on paid ads right now, across Meta, Google, and LinkedIn. A live in-market budget signal.

Refills daily
LinkedIn only
POPULAR PLAY
Clone your best customers

Companies that look exactly like your top ten accounts, found on the open web.

Refills weekly
LinkedIn only
POPULAR PLAY
Message any post's engagers

Paste any LinkedIn posts, yours or anyone's. Valley scrapes everyone who engaged and messages the best fits.

One-time
LinkedIn only
POPULAR PLAY
Displace a competitor

Companies publicly using the tool you replace. The category is sold, the vendor is not.

Refills weekly
LinkedIn only
POPULAR PLAY
Upload a list + send templated messages

A proven three-step connect sequence that asks for the meeting.

One-time
LinkedIn only
POPULAR PLAY
Ambush a competitor's launch

Everyone engaging their launch post is evaluating. Get in the consideration set.

One-time
LinkedIn only
POPULAR PLAY
New exec, new budget

A just-hired VP or C-level in your buying seat rethinks the stack in their first 90 days.

Refills weekly
LinkedIn only
VALLEY PLAY
Hiring the role you replace

They budgeted a salary for the problem. Offer them the software instead.

Refills daily
LinkedIn only
VALLEY PLAY
Catch competitor churn

People publicly complaining about the tool they use are mid-switch. Be there.

Refills daily
LinkedIn only
VALLEY PLAY
Upload a list + send hyper-relevant messages

Your list, Valley’s brain. Every row needs a LinkedIn profile URL.

One-time
LinkedIn only
VALLEY PLAY
Using complementary technology

Their stack tells you they are your buyer before they do.

Refills weekly
LinkedIn only
VALLEY PLAY
Mine your old viral post

That post that popped six months ago is a prospect list nobody harvested.

One-time
LinkedIn only
VALLEY PLAY
Message your company page followers

Your own company page. Valley pulls everyone who follows you and messages the best fits.

One-time
LinkedIn only
VALLEY PLAY
Competitors' followers

Valley finds your competitors' LinkedIn pages and pulls everyone following them. They already care about your category.

One-time
LinkedIn only
VALLEY PLAY
Clone your ICP by firmographics

Companies that match your ICP on size, industry, and geography, from Apollo firmographics.

Refills daily
LinkedIn only
VALLEY PLAY
Re-engage a previous campaign

People who accepted your connect but never replied get a fresh motion, by stage reached.

One-time
LinkedIn only
VALLEY PLAY
Harvest a testimonial post's engagers

When a customer posts about you, everyone who liked it just raised a hand.

One-time
LinkedIn only
VALLEY PLAY
Recently launched on Product Hunt

Companies that just shipped and are trending on Product Hunt, founders named.

Refills daily
LinkedIn only
VALLEY PLAY
Ask your network for intros

A warm, low-pressure referral ask to first-degree connections who know your buyers.

One-time
LinkedIn only
VALLEY PLAY
Follow through on your case study

Engagers of your own case-study post get the longer story, one to one.

One-time
LinkedIn only
VALLEY PLAY
Shopify brands with a stack gap

Shopify DTC brands in your niche missing an app category you sell into.

Refills daily
LinkedIn only
VALLEY PLAY
Launched or partnered recently

A launch or partnership in the last six months means motion, budget, and press to reference.

One-time
LinkedIn only
VALLEY PLAY
Fastest-growing lists and awards

Inc 5000 types. Public proof of growth, and founders who love talking about it.

One-time
LinkedIn only
VALLEY PLAY
Message your personal LinkedIn followers

A follow is a hand raise. Valley finds the ones worth shaking.

Runs daily
LinkedIn only
VALLEY PLAY
Crossover a newsletter author's audience

The engaged readership of a niche newsletter, reached where they actually reply.

Runs weekly
LinkedIn only
VALLEY PLAY
Companies at a target funding stage

Companies at the funding stage you target, optionally only ones that raised recently. Valley finds them.

Refills daily
LinkedIn only
VALLEY PLAY
Headcount surge

Companies growing over 20% a year are buying tools this quarter, not someday.

Refills monthly
LinkedIn only
VALLEY PLAY
Mine a conference before you get there

Engagers of the event and speaker posts, messaged before the booth even opens.

One-time
LinkedIn only
VALLEY PLAY
Conference follow-up

Upload the attendee list, follow up while the badge scan is warm.

One-time
LinkedIn only
VALLEY PLAY
Opening new offices or markets

Geographic expansion means new teams, new processes, and no incumbent vendors.

One-time
LinkedIn only
VALLEY PLAY
Share a lead magnet

Give-first sequence that opens with the asset, not the ask.

One-time
LinkedIn only
VALLEY PLAY
Catch podcast-clip engagers

People engaging podcast clips in your niche are listening to someone about your problem.

One-time
LinkedIn only
VALLEY PLAY
Modernizing off a legacy stack

Companies stuck on aging tools, found by the artifacts legacy software leaves in public.

One-time
LinkedIn only
VALLEY PLAY
Invite a list to an event

Invite plus two reminders, timed around your event date.

One-time
LinkedIn only
VALLEY PLAY
Reach ex-colleagues at new companies

People who worked where you worked, now sitting in buying seats elsewhere.

One-time
LinkedIn only
VALLEY PLAY
Find people with AI

Describe who you want to reach. Valley finds matching people on LinkedIn and builds your list.

One-time
LinkedIn only
VALLEY PLAY
Recently PE-acquired or IPO’d

Ownership change resets every budget and every vendor relationship.

One-time
LinkedIn only
VALLEY PLAY
Engage your first-degree network

A slow, personal drip to people already in your network.

One-time
LinkedIn only
VALLEY PLAY
People talking about it on podcasts

Founders and leaders who discussed your problem on a podcast will discuss it with you.

One-time
LinkedIn only
VALLEY PLAY
Message a synced Clay table

Your Clay workflows feed Valley continuously. New rows become outreach.

Syncs live
LinkedIn only
VALLEY PLAY
Pitch journalists and analysts

The people covering your category, found for you and pitched with a story, not a press release.

One-time
LinkedIn only
VALLEY PLAY
Regulation with a deadline

When a rule changes in your space, every affected company becomes in-market at once.

One-time
LinkedIn only
VALLEY PLAY
Reach investors for your raise

Angels and VCs active in your category, found for you and approached with traction, not a cold deck.

One-time
LinkedIn only
VALLEY PLAY
Recently rebranded

A rebrand is a company mid-reinvention. Every process is up for review.

One-time
LinkedIn only
VALLEY PLAY
Reach candidates engaging hiring content

People engaging posts about roles like yours are quietly looking.

One-time
LinkedIn only
VALLEY PLAY
Recruit advisors

The operators you want around the table, found for you and approached with a real role.

One-time
LinkedIn only
VALLEY PLAY
Listed in partner directories

Agencies and consultancies in your ecosystem’s partner directories, already qualified by someone else.

One-time
LinkedIn only
COMING SOON
Named accounts

Bring the accounts you are going after. Valley groups the buyers at each, watches every account for buying signals, and drafts the opener the moment one fires.

One-time
LinkedIn only
Your next conversation has a starting point.

Pick a play. Make it yours. Let Valley do the work.

Start for free
```

## 7. Links

Every card links to `/playbooks?play=<slug>` (58, listed in §5); every drawer footer links to https://beta.joinvalley.co/signup.

| section | link text | href (as authored) | type | resolved |
|---|---|---|---|---|
| playbooks | Start for free | `https://beta.joinvalley.co/signup` | external | https://beta.joinvalley.co/signup |
| playbooks | Explore the product ↗ | `/product` | internal | /product |
| playbooks | POPULAR PLAY Message your qualified profile viewers Highly relevant ou | `/playbooks?play=message-your-qualified-profile-viewers` | internal | /playbooks?play=message-your-qualified-profile-viewers |
| playbooks | POPULAR PLAY Message your competitors' engagers People engaging with a | `/playbooks?play=message-your-competitors-engagers` | internal | /playbooks?play=message-your-competitors-engagers |
| playbooks | POPULAR PLAY Hiring for roles that signal your problem A job post is a | `/playbooks?play=hiring-for-roles-that-signal-your-problem` | internal | /playbooks?play=hiring-for-roles-that-signal-your-problem |
| playbooks | POPULAR PLAY Hijack lead-magnet posts Find viral lead-magnet posts you | `/playbooks?play=hijack-lead-magnet-posts` | internal | /playbooks?play=hijack-lead-magnet-posts |
| playbooks | POPULAR PLAY Message your post engagers People reacting to and comment | `/playbooks?play=message-your-post-engagers` | internal | /playbooks?play=message-your-post-engagers |
| playbooks | POPULAR PLAY Publicly discussing a problem you solve Companies and dec | `/playbooks?play=publicly-discussing-a-problem-you-solve` | internal | /playbooks?play=publicly-discussing-a-problem-you-solve |
| playbooks | POPULAR PLAY Find companies with signal-based search Companies and dec | `/playbooks?play=find-companies-with-signal-based-search` | internal | /playbooks?play=find-companies-with-signal-based-search |
| playbooks | POPULAR PLAY Hyper-relevant messaging to a Sales Nav audience Paste th | `/playbooks?play=hyper-relevant-messaging-to-a-sales-nav-audience` | internal | /playbooks?play=hyper-relevant-messaging-to-a-sales-nav-audience |
| playbooks | POPULAR PLAY Just raised or acquired New money means new headcount, ne | `/playbooks?play=just-raised-or-acquired` | internal | /playbooks?play=just-raised-or-acquired |
| playbooks | POPULAR PLAY Message the post engagers of major influencers in your sp | `/playbooks?play=message-the-post-engagers-of-major-influencers-in-your-space` | internal | /playbooks?play=message-the-post-engagers-of-major-influencers-in-your-space |
| playbooks | POPULAR PLAY Companies running paid ads Companies actively spending on | `/playbooks?play=companies-running-paid-ads` | internal | /playbooks?play=companies-running-paid-ads |
| playbooks | POPULAR PLAY Clone your best customers Companies that look exactly lik | `/playbooks?play=clone-your-best-customers` | internal | /playbooks?play=clone-your-best-customers |
| playbooks | POPULAR PLAY Message any post's engagers Paste any LinkedIn posts, you | `/playbooks?play=message-any-post-s-engagers` | internal | /playbooks?play=message-any-post-s-engagers |
| playbooks | POPULAR PLAY Displace a competitor Companies publicly using the tool y | `/playbooks?play=displace-a-competitor` | internal | /playbooks?play=displace-a-competitor |
| playbooks | POPULAR PLAY Upload a list + send templated messages A proven three-st | `/playbooks?play=upload-a-list-send-templated-messages` | internal | /playbooks?play=upload-a-list-send-templated-messages |
| playbooks | POPULAR PLAY Ambush a competitor's launch Everyone engaging their laun | `/playbooks?play=ambush-a-competitor-s-launch` | internal | /playbooks?play=ambush-a-competitor-s-launch |
| playbooks | POPULAR PLAY New exec, new budget A just-hired VP or C-level in your b | `/playbooks?play=new-exec-new-budget` | internal | /playbooks?play=new-exec-new-budget |
| playbooks | VALLEY PLAY Hiring the role you replace They budgeted a salary for the | `/playbooks?play=hiring-the-role-you-replace` | internal | /playbooks?play=hiring-the-role-you-replace |
| playbooks | VALLEY PLAY Catch competitor churn People publicly complaining about t | `/playbooks?play=catch-competitor-churn` | internal | /playbooks?play=catch-competitor-churn |
| playbooks | VALLEY PLAY Upload a list + send hyper-relevant messages Your list, Va | `/playbooks?play=upload-a-list-send-hyper-relevant-messages` | internal | /playbooks?play=upload-a-list-send-hyper-relevant-messages |
| playbooks | VALLEY PLAY Using complementary technology Their stack tells you they  | `/playbooks?play=using-complementary-technology` | internal | /playbooks?play=using-complementary-technology |
| playbooks | VALLEY PLAY Mine your old viral post That post that popped six months  | `/playbooks?play=mine-your-old-viral-post` | internal | /playbooks?play=mine-your-old-viral-post |
| playbooks | VALLEY PLAY Message your company page followers Your own company page. | `/playbooks?play=message-your-company-page-followers` | internal | /playbooks?play=message-your-company-page-followers |
| playbooks | VALLEY PLAY Competitors' followers Valley finds your competitors' Link | `/playbooks?play=competitors-followers` | internal | /playbooks?play=competitors-followers |
| playbooks | VALLEY PLAY Clone your ICP by firmographics Companies that match your  | `/playbooks?play=clone-your-icp-by-firmographics` | internal | /playbooks?play=clone-your-icp-by-firmographics |
| playbooks | VALLEY PLAY Re-engage a previous campaign People who accepted your con | `/playbooks?play=re-engage-a-previous-campaign` | internal | /playbooks?play=re-engage-a-previous-campaign |
| playbooks | VALLEY PLAY Harvest a testimonial post's engagers When a customer post | `/playbooks?play=harvest-a-testimonial-post-s-engagers` | internal | /playbooks?play=harvest-a-testimonial-post-s-engagers |
| playbooks | VALLEY PLAY Recently launched on Product Hunt Companies that just ship | `/playbooks?play=recently-launched-on-product-hunt` | internal | /playbooks?play=recently-launched-on-product-hunt |
| playbooks | VALLEY PLAY Ask your network for intros A warm, low-pressure referral  | `/playbooks?play=ask-your-network-for-intros` | internal | /playbooks?play=ask-your-network-for-intros |
| playbooks | VALLEY PLAY Follow through on your case study Engagers of your own cas | `/playbooks?play=follow-through-on-your-case-study` | internal | /playbooks?play=follow-through-on-your-case-study |
| playbooks | VALLEY PLAY Shopify brands with a stack gap Shopify DTC brands in your | `/playbooks?play=shopify-brands-with-a-stack-gap` | internal | /playbooks?play=shopify-brands-with-a-stack-gap |
| playbooks | VALLEY PLAY Launched or partnered recently A launch or partnership in  | `/playbooks?play=launched-or-partnered-recently` | internal | /playbooks?play=launched-or-partnered-recently |
| playbooks | VALLEY PLAY Fastest-growing lists and awards Inc 5000 types. Public pr | `/playbooks?play=fastest-growing-lists-and-awards` | internal | /playbooks?play=fastest-growing-lists-and-awards |
| playbooks | VALLEY PLAY Message your personal LinkedIn followers A follow is a han | `/playbooks?play=message-your-personal-linkedin-followers` | internal | /playbooks?play=message-your-personal-linkedin-followers |
| playbooks | VALLEY PLAY Crossover a newsletter author's audience The engaged reade | `/playbooks?play=crossover-a-newsletter-author-s-audience` | internal | /playbooks?play=crossover-a-newsletter-author-s-audience |
| playbooks | VALLEY PLAY Companies at a target funding stage Companies at the fundi | `/playbooks?play=companies-at-a-target-funding-stage` | internal | /playbooks?play=companies-at-a-target-funding-stage |
| playbooks | VALLEY PLAY Headcount surge Companies growing over 20% a year are buyi | `/playbooks?play=headcount-surge` | internal | /playbooks?play=headcount-surge |
| playbooks | VALLEY PLAY Mine a conference before you get there Engagers of the eve | `/playbooks?play=mine-a-conference-before-you-get-there` | internal | /playbooks?play=mine-a-conference-before-you-get-there |
| playbooks | VALLEY PLAY Conference follow-up Upload the attendee list, follow up w | `/playbooks?play=conference-follow-up` | internal | /playbooks?play=conference-follow-up |
| playbooks | VALLEY PLAY Opening new offices or markets Geographic expansion means  | `/playbooks?play=opening-new-offices-or-markets` | internal | /playbooks?play=opening-new-offices-or-markets |
| playbooks | VALLEY PLAY Share a lead magnet Give-first sequence that opens with th | `/playbooks?play=share-a-lead-magnet` | internal | /playbooks?play=share-a-lead-magnet |
| playbooks | VALLEY PLAY Catch podcast-clip engagers People engaging podcast clips  | `/playbooks?play=catch-podcast-clip-engagers` | internal | /playbooks?play=catch-podcast-clip-engagers |
| playbooks | VALLEY PLAY Modernizing off a legacy stack Companies stuck on aging to | `/playbooks?play=modernizing-off-a-legacy-stack` | internal | /playbooks?play=modernizing-off-a-legacy-stack |
| playbooks | VALLEY PLAY Invite a list to an event Invite plus two reminders, timed | `/playbooks?play=invite-a-list-to-an-event` | internal | /playbooks?play=invite-a-list-to-an-event |
| playbooks | VALLEY PLAY Reach ex-colleagues at new companies People who worked whe | `/playbooks?play=reach-ex-colleagues-at-new-companies` | internal | /playbooks?play=reach-ex-colleagues-at-new-companies |
| playbooks | VALLEY PLAY Find people with AI Describe who you want to reach. Valley | `/playbooks?play=find-people-with-ai` | internal | /playbooks?play=find-people-with-ai |
| playbooks | VALLEY PLAY Recently PE-acquired or IPO’d Ownership change resets ever | `/playbooks?play=recently-pe-acquired-or-ipo-d` | internal | /playbooks?play=recently-pe-acquired-or-ipo-d |
| playbooks | VALLEY PLAY Engage your first-degree network A slow, personal drip to  | `/playbooks?play=engage-your-first-degree-network` | internal | /playbooks?play=engage-your-first-degree-network |
| playbooks | VALLEY PLAY People talking about it on podcasts Founders and leaders w | `/playbooks?play=people-talking-about-it-on-podcasts` | internal | /playbooks?play=people-talking-about-it-on-podcasts |
| playbooks | VALLEY PLAY Message a synced Clay table Your Clay workflows feed Valle | `/playbooks?play=message-a-synced-clay-table` | internal | /playbooks?play=message-a-synced-clay-table |
| playbooks | VALLEY PLAY Pitch journalists and analysts The people covering your ca | `/playbooks?play=pitch-journalists-and-analysts` | internal | /playbooks?play=pitch-journalists-and-analysts |
| playbooks | VALLEY PLAY Regulation with a deadline When a rule changes in your spa | `/playbooks?play=regulation-with-a-deadline` | internal | /playbooks?play=regulation-with-a-deadline |
| playbooks | VALLEY PLAY Reach investors for your raise Angels and VCs active in yo | `/playbooks?play=reach-investors-for-your-raise` | internal | /playbooks?play=reach-investors-for-your-raise |
| playbooks | VALLEY PLAY Recently rebranded A rebrand is a company mid-reinvention. | `/playbooks?play=recently-rebranded` | internal | /playbooks?play=recently-rebranded |
| playbooks | VALLEY PLAY Reach candidates engaging hiring content People engaging p | `/playbooks?play=reach-candidates-engaging-hiring-content` | internal | /playbooks?play=reach-candidates-engaging-hiring-content |
| playbooks | VALLEY PLAY Recruit advisors The operators you want around the table,  | `/playbooks?play=recruit-advisors` | internal | /playbooks?play=recruit-advisors |
| playbooks | VALLEY PLAY Listed in partner directories Agencies and consultancies i | `/playbooks?play=listed-in-partner-directories` | internal | /playbooks?play=listed-in-partner-directories |
| playbooks | COMING SOON Named accounts Bring the accounts you are going after. Val | `/playbooks?play=named-accounts` | internal | /playbooks?play=named-accounts |

Internal links outside the known routes (/, /pricing, /product, /about, /compare, /playbooks): none.

## 8. Could not capture / notes

1. Whether card clicks use `pushState` or `replaceState` could not be distinguished reliably in headless mode; measured: URL shows `?play=<slug>` while open and `/playbooks` after closing; deep links open the drawer.
2. No new assets; category tile art reuses existing images.
