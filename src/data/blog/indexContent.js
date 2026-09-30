// Static copy for /blog sections that don't come from posts.json.
// Source: spec/pages/blog-index/dumps/dump_1440.txt and page_info.json.
import casesData from '../../../spec/pages/casestudies/cases.json'

export const FEATURED = {
  href: '/blog_featured/the-20-minute-prospecting-revolution',
  title: 'The 20-Minute Prospecting Revolution',
  author: 'Zayd Ali',
  avatar: '/assets/pages/templates/RkYMuyEtdgStGU8zRVpb3dYfnE.jpeg',
  image: '/assets/pages/templates/XA88EO8N36qShdbqaMtTCXsoba8.png',
  imageAlt:
    'The 20-Minute Prospecting Revolution. Workflow: Find a signal → Research the person → Write with context.',
}

// "The 2026 outbound research library": 5 report cards (slugs exist in posts.json).
export const RESEARCH_REPORTS = [
  {
    slug: 'state-of-outbound-tools-2026',
    title: 'The State of Outbound Tools in 2026',
    summary:
      'A sourced review of 19 outbound tools across seven workflow stages: a taxonomy, a coverage map, and the questions to ask about the handoffs between them.',
    image: '/assets/pages/blog/lcuoWRv8F9hn4hUivqSAw0Ph6TE.png',
    alt: 'The State of Outbound Tools in 2026. Workflow: Research & qualify → Write & review → Send & learn.',
  },
  {
    slug: 'best-outbound-sales-tools-2026',
    title: 'Best Outbound Sales Tools of 2026, by Job and Team',
    summary:
      'The best outbound sales tools of 2026 sorted by who you are: founders, agencies, GTM builders, email teams, revenue orgs. Explicit criteria and tradeoffs.',
    image: '/assets/pages/blog/2TCuF3fC4aYxJ5G3TaYa9Erw.png',
    alt: 'Best Outbound Sales Tools of 2026, by Job and Team. Workflow: Research & qualify → Write & review → Send & learn.',
  },
  {
    slug: 'outbound-stack-costs-2026',
    title: 'What an Outbound Stack Costs in 2026',
    summary:
      'Three outbound budget scenarios priced on real workloads: seats, senders, research credits, email allowances, and contract terms, with verified prices.',
    image: '/assets/pages/blog/DuMaOdmm2CiEWeaJCdsdrwpQglE.png',
    alt: 'What an Outbound Stack Costs in 2026. Workflow: Seats & tools → Time & research → Pipeline & return.',
  },
  {
    slug: 'ai-sdrs-copilots-automation-buyers-guide-2026',
    title: 'AI SDRs, Copilots, and Automation: The 2026 Buyer’s Guide',
    summary:
      'AI SDRs, copilots, and automation explained by what you delegate: decision rights, approval boundaries, exceptions, and the work your team still owns.',
    image: '/assets/pages/blog/fcpto0bYMln2C0dJWLVZfCUVYI.png',
    alt: 'AI SDRs, Copilots, and Automation: The 2026 Buyer’s Guide. Workflow: Research & qualify → Write & review → Send & learn.',
  },
  {
    slug: 'evaluate-outbound-personalization-2026',
    title: 'How to Evaluate Outbound Personalization in 2026',
    summary:
      'A reproducible protocol for judging outbound personalization: a weighted rubric, an annotated example, and editing-cost measures. No invented benchmarks.',
    image: '/assets/pages/blog/1He5jH1JKnVN9fluKbHaCIS5rY.png',
    alt: 'How to Evaluate Outbound Personalization in 2026. Workflow: Know the person → Find the context → Write in your voice.',
  },
]

// "Case Studies" strip: the first 2 case studies. Slugs, titles, people and images come from
// spec/pages/casestudies/cases.json (read-only). The stat labels on this strip differ from
// cases.json cardStats on the live page ("Pipeline Expanded" / "More Meetings"), so they are
// taken from the /blog dump.
const STRIP_LABELS = ['Pipeline Expanded', 'More Meetings']
export const CASE_STRIP = casesData.cases.slice(0, 2).map((c) => ({
  slug: c.slug,
  title: c.title,
  logo: c.logoImageLocal,
  logoAlt: c.company || '',
  person: c.person,
  avatar: c.avatarImageLocal,
  avatarAlt: c.company ? c.person.name : '',
  stats: c.cardStats.map((s, i) => ({ value: s.value, label: STRIP_LABELS[i] || s.label })),
}))
