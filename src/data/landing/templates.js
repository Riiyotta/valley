// Per-page data for the three "SEO landing" template pages (spec/pages/landing.md section 3).
// Source: the `template` object in each spec JSON. The JSON has a few capture errors; they are
// corrected below from the spec's own source of truth (dumps/ and raw/text_<slug>.txt), and each
// patch names the line it comes from. Nothing here is invented copy.
import b2b from '../../../spec/pages/landing/linkedin-lead-generation-for-b2b-saas.json'
import software from '../../../spec/pages/landing/lead-generation-for-software-companies.json'
import content from '../../../spec/pages/landing/lead-generation-for-content-agencies.json'

// Demo heading at phone widths (spec 3.9 says it is in sections[] but it is not; the text is in
// dumps/dump_<slug>_390.txt and was re-read from the live DOM: "The Only Way Outbound should ").
const PHONE_DEMO_HEADING = 'The Only Way Outbound should '

function clone(x) {
  return JSON.parse(JSON.stringify(x))
}

function build(json, patch) {
  const t = clone(json.template)
  t.meta = json.meta
  t.demo.phoneHeading = PHONE_DEMO_HEADING
  patch?.(t)
  return t
}

export const LANDING_TEMPLATES = {
  'linkedin-lead-generation-for-b2b-saas': build(b2b, (t) => {
    // dump 1440: <strong>ThinkFish</strong> is the link and ":" is a second, unlinked <strong>
    // in rgba(0,0,0,.6) (raw text "ThinkFish:").
    t.videoWall.cards[2].companySuffix = ':'
  }),
  'lead-generation-for-software-companies': build(software, (t) => {
    // Ticker row 2: every software dump (1440/1280/768/390) and raw text line 56 show the Ridge
    // row, not "GALLEA AI GENERATED 15 MEETINGS IN 14 DAYS".
    t.hero.proofTicker[1] = clone(b2b.template.hero.proofTicker[1])
    // Problem heading: the JSON put the lead into h2 and dropped the heading
    // (raw text lines 94-96; dump 1440 <p> 40/44.8 + <h2> 20/29).
    t.problem.lead = t.problem.h2
    t.problem.h2 = 'Engineers ignore the outreach everyone else sends'
    // Path 02 body is three hard-broken lines (raw text lines 186-188; dump box 385x76).
    t.comparison.paths[1].body = 'Scrape signals, enrich in Clay,\nwrite in ChatGPT, send from\nHeyReach. Hope nothing breaks.'
  }),
  'lead-generation-for-content-agencies': build(content, (t) => {
    // Hero sub is two paragraphs, cut off in the JSON (raw text lines 44-46; dump h2 742x203).
    t.hero.sub =
      'You ghostwrite the posts, grow the founder’s following, fill the top of funnel. Then the outbound layer sends generic DMs that waste it. Valley messages the people who actually engaged - in the founder’s voice, off 60+ data points of research - at 15–45% reply rates. \n\nOne engine per client, live in 30 minutes. The outbound finally matches the brand you built.'
    // raw text lines 96-98; dump 1440 <p> 40/44.8 + <h2> 20/29.
    t.problem.lead = t.problem.h2
    t.problem.h2 = 'Great content, wasted by generic outbound'
    // raw text lines 188-190 and 210-212 (hard-broken bodies).
    t.comparison.paths[1].body = 'Scrape signals, enrich in Clay,\nwrite in ChatGPT, send from\nHeyReach. Hope nothing breaks.'
    t.comparison.paths[2].body = 'Warm signal outreach without the\nduct-tape stack. One bill, one\nworkspace per client.'
  }),
}

// Shared hero proof ticker data (identical on all template pages and the agency page;
// agency JSON sections[Hero] lists the same five rows and three avatars).
export const PROOF_AVATARS = b2b.template.hero.proofAvatars
export const PROOF_TICKER = b2b.template.hero.proofTicker
// Shared logos "Variant 1" and case-banner data (identical on template + agency pages, spec 3.4 / 3.7).
export const LOGOS_MIGRATED = b2b.template.logos
export const CASE_BANNER = b2b.template.caseBanner
