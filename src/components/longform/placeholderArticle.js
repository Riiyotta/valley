/*
 * placeholderArticle(seed): neutral placeholder body for long-form templates.
 * The clone does not reproduce article bodies (blog-post.md "Content rule"); every post renders
 * this generic outbound-sales filler, written for the clone, inside the faithful template.
 *
 * API:
 *   import { placeholderArticle } from '../longform/placeholderArticle.js'
 *   const article = placeholderArticle('some-slug')
 *   article.sections -> [{ id, title, blocks }, x3]
 *     id:     'blog-section-1' | 'blog-section2' | 'blog-section3' (the live TOC target ids)
 *     title:  the section h2 text (also the TOC label)
 *     blocks: RichText blocks (see RichText.jsx), each section containing h2 and h3 subheads,
 *             several paragraphs (strong, em, links), a list, a blockquote, an image,
 *             a table, inline code and a code block.
 *   Pass { idPrefix } as a second argument to use other ids (e.g. for case studies):
 *     placeholderArticle(slug, { idPrefix: 'cs-section-' }) -> 'cs-section-1', '-2', '-3'.
 *
 * Deterministic per seed: a string hash drives paragraph counts, list lengths, table size,
 * block order and which filler lines are used, so pages differ but never change between loads.
 */

const IMAGES = [
  { src: '/assets/pages/templates/1yAumaR84b2Z0lmNLKMqNrgY.jpeg', width: 720, height: 398 },
  { src: '/assets/pages/templates/IT76Aaq67wchbfaIkDJdbLY4phM.jpg', width: 720, height: 480 },
  { src: '/assets/pages/templates/ftaOQXeRTkzekiBu3G0v4DZ6PI.jpg', width: 720, height: 552 },
]

const SECTION_TITLES = [
  'Why the first touch decides the rest of the sequence',
  'Building a target list you can actually work',
  'Timing outreach around real buying signals',
  'Writing messages that read like a person wrote them',
  'Measuring replies instead of volume',
  'Handing warm conversations to the right rep',
  'Keeping sender accounts healthy over time',
  'What a weekly outbound review should cover',
  'Choosing channels for each stage of the funnel',
  'Common mistakes when a team scales outreach',
  'Setting expectations with leadership early',
  'Turning a one-off win into a repeatable play',
]

const SUBHEADS = [
  'Start with the account, not the contact',
  'Define what a good reply looks like',
  'Keep the first message short',
  'Decide who owns follow-up',
  'Separate research from writing',
  'Pick one metric per stage',
  'Review a sample every week',
  'Document the play before you scale it',
  'Plan for the quiet weeks',
  'Know when to stop a sequence',
  'Match tone to the channel',
  'Give reps room to edit',
]

const SENTENCES = [
  'Most outbound programs fail quietly, long before anyone looks at the numbers.',
  'A smaller list of well-researched accounts usually outperforms a large list worked at random.',
  'The goal of a first message is to earn a second one, not to close a deal.',
  'Teams that write down their assumptions find it easier to learn from each campaign.',
  'Reply rate is a useful signal, but only when it is read alongside meeting quality.',
  'It helps to decide in advance which responses count as positive and which do not.',
  'Research should take minutes per account, not an afternoon, or the process will stall.',
  'A clear owner for every conversation prevents warm leads from going cold.',
  'Short messages tend to be read; long ones tend to be saved for later and forgotten.',
  'Every channel has its own etiquette, and prospects notice when it is ignored.',
  'The best sequences change based on what the prospect has already seen.',
  'Consistency matters more than intensity when building a pipeline over a quarter.',
  'Sales leaders often underestimate how long it takes a new play to settle.',
  'A weekly review of ten real conversations teaches more than a dashboard of averages.',
  'When a message performs well, it is worth asking why before copying it everywhere.',
  'Personal details only help when they connect to a reason for reaching out.',
  'Tools can speed up the work, but the judgment about who to contact stays with the team.',
  'Follow-up is where most meetings are actually booked.',
  'Clean data at the start saves hours of cleanup at the end of the month.',
  'A good handoff note gives the next person enough context to continue without asking.',
  'Prospects respond to relevance far more reliably than to clever phrasing.',
  'Pausing a sequence that is not working is a decision, not a failure.',
  'It is easier to improve one step at a time than to rebuild the whole process at once.',
  'Shared templates are a starting point that each rep should adapt to their own voice.',
]

const LIST_ITEMS = [
  'Agree on the ideal customer profile before building any list.',
  'Limit each sequence to a single, clear call to action.',
  'Track replies by category, not just by count.',
  'Leave space between touches so each one can land.',
  'Keep a short library of openers that have worked before.',
  'Record why a prospect said no, when they tell you.',
  'Review sender health at the start of each week.',
  'Retire messages that no longer get responses.',
  'Tag accounts by the signal that triggered outreach.',
  'Share one good conversation with the team every Friday.',
  'Set a daily limit that the team can sustain.',
  'Write the follow-up before sending the first message.',
]

const QUOTES = [
  'The list you choose shapes every result that follows it.',
  'A reply is the start of a conversation, not the end of a campaign.',
  'Slow, specific outreach tends to beat fast, generic outreach.',
  'If a message would feel odd to receive, it is probably odd to send.',
  'The process is only as good as the notes people leave behind.',
  'Measure what you want more of, and review it often.',
]

const TABLES = [
  [
    ['Stage', 'What to check', 'Typical owner'],
    ['Research', 'Account fit and recent activity', 'SDR'],
    ['First touch', 'Relevance of the opening line', 'SDR'],
    ['Follow-up', 'Timing and channel choice', 'SDR'],
    ['Reply', 'Intent and next step', 'AE'],
    ['Meeting', 'Agenda and attendees', 'AE'],
    ['Review', 'What to repeat or retire', 'Team lead'],
    ['Handoff', 'Notes and context', 'AE'],
  ],
  [
    ['Metric', 'Why it matters', 'How often', 'Notes'],
    ['Accounts researched', 'Shows capacity', 'Daily', 'Keep the bar consistent'],
    ['Messages sent', 'Tracks activity', 'Daily', 'Not a goal on its own'],
    ['Reply rate', 'Signals relevance', 'Weekly', 'Split by category'],
    ['Positive replies', 'Signals interest', 'Weekly', 'Define it in advance'],
    ['Meetings booked', 'Connects to pipeline', 'Weekly', 'Check attendance'],
    ['Pipeline created', 'Shows business impact', 'Monthly', 'Review with finance'],
  ],
  [
    ['Channel', 'Strength', 'Watch out for'],
    ['Email', 'Easy to scale', 'Deliverability'],
    ['Social', 'Personal context', 'Daily limits'],
    ['Phone', 'Fast answers', 'Timing'],
    ['Events', 'Warm introductions', 'Cost per contact'],
    ['Referrals', 'High trust', 'Low volume'],
  ],
]

const CODE_SNIPPETS = [
  [
    [['comment', '// Score an account before it enters a sequence']],
    [['keyword', 'function'], ' ', ['definition', 'scoreAccount'], ['punctuation', '('], 'account', ['punctuation', ')'], ' ', ['punctuation', '{']],
    ['  ', ['keyword', 'let'], ' score ', ['punctuation', '='], ' ', ['static', '0']],
    ['  ', ['keyword', 'if'], ' ', ['punctuation', '('], 'account', ['punctuation', '.'], ['property', 'fitsProfile'], ['punctuation', ')'], ' score ', ['punctuation', '+='], ' ', ['static', '40']],
    ['  ', ['keyword', 'if'], ' ', ['punctuation', '('], 'account', ['punctuation', '.'], ['property', 'recentSignal'], ['punctuation', ')'], ' score ', ['punctuation', '+='], ' ', ['static', '35']],
    ['  ', ['keyword', 'if'], ' ', ['punctuation', '('], 'account', ['punctuation', '.'], ['property', 'contacted'], ['punctuation', ')'], ' score ', ['punctuation', '-='], ' ', ['static', '20']],
    ['  ', ['keyword', 'return'], ' ', ['definition', 'Math'], ['punctuation', '.'], ['property', 'max'], ['punctuation', '('], 'score', ['punctuation', ','], ' ', ['static', '0'], ['punctuation', ')']],
    [['punctuation', '}']],
    [],
    [['definition', 'scoreAccount'], ['punctuation', '({'], ' ', ['property', 'fitsProfile'], ['punctuation', ':'], ' ', ['static', 'true'], ' ', ['punctuation', '})'], ' ', ['comment', '// 40']],
  ],
  [
    [['punctuation', '{']],
    ['  ', ['property', '"sequence"'], ['punctuation', ':'], ' ', ['string', '"example-sequence"'], ['punctuation', ',']],
    ['  ', ['property', '"steps"'], ['punctuation', ':'], ' ', ['punctuation', '[']],
    ['    ', ['punctuation', '{'], ' ', ['property', '"day"'], ['punctuation', ':'], ' ', ['static', '1'], ['punctuation', ','], ' ', ['property', '"channel"'], ['punctuation', ':'], ' ', ['string', '"email"'], ' ', ['punctuation', '},']],
    ['    ', ['punctuation', '{'], ' ', ['property', '"day"'], ['punctuation', ':'], ' ', ['static', '4'], ['punctuation', ','], ' ', ['property', '"channel"'], ['punctuation', ':'], ' ', ['string', '"social"'], ' ', ['punctuation', '},']],
    ['    ', ['punctuation', '{'], ' ', ['property', '"day"'], ['punctuation', ':'], ' ', ['static', '9'], ['punctuation', ','], ' ', ['property', '"channel"'], ['punctuation', ':'], ' ', ['string', '"email"'], ' ', ['punctuation', '}']],
    ['  ', ['punctuation', '],']],
    ['  ', ['property', '"dailyLimit"'], ['punctuation', ':'], ' ', ['static', '25']],
    [['punctuation', '}']],
  ],
  [
    [['keyword', 'const'], ' ', ['definition', 'categories'], ' ', ['punctuation', '='], ' ', ['punctuation', '['], ['string', "'interested'"], ['punctuation', ','], ' ', ['string', "'later'"], ['punctuation', ','], ' ', ['string', "'no'"], ['punctuation', ']']],
    [],
    [['keyword', 'export'], ' ', ['keyword', 'function'], ' ', ['definition', 'tagReply'], ['punctuation', '('], 'text', ['punctuation', ')'], ' ', ['punctuation', '{']],
    ['  ', ['keyword', 'if'], ' ', ['punctuation', '('], ['string', '/next week|later/'], ['punctuation', '.'], ['property', 'test'], ['punctuation', '('], 'text', ['punctuation', '))'], ' ', ['keyword', 'return'], ' ', ['string', "'later'"]],
    ['  ', ['keyword', 'if'], ' ', ['punctuation', '('], ['string', '/not interested/'], ['punctuation', '.'], ['property', 'test'], ['punctuation', '('], 'text', ['punctuation', '))'], ' ', ['keyword', 'return'], ' ', ['string', "'no'"]],
    ['  ', ['keyword', 'return'], ' ', ['string', "'interested'"]],
    [['punctuation', '}']],
  ],
]

const INLINE_CODE = ['daily_limit', 'reply_category', 'account_score', 'last_touch', 'owner_id', 'signal_type']

// ---- deterministic randomness -------------------------------------------------------------
function hashString(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(a) {
  return function next() {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeRng(seed) {
  const rand = mulberry32(hashString(String(seed)))
  const int = (min, max) => min + Math.floor(rand() * (max - min + 1))
  const pick = (arr) => arr[Math.floor(rand() * arr.length)]
  const take = (arr, n) => {
    const copy = arr.slice()
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy.slice(0, n)
  }
  // Sentences come from a shuffled deck, refilled when empty, so a paragraph never repeats
  // the one before it.
  let deck = []
  const sentences = (n) => {
    const out = []
    while (out.length < n) {
      if (deck.length === 0) deck = take(SENTENCES, SENTENCES.length)
      out.push(deck.pop())
    }
    return out
  }
  return { rand, int, pick, take, sentences }
}

// ---- builders -----------------------------------------------------------------------------
function paragraph(rng, decorate) {
  const parts = rng.sentences(rng.int(3, 4))
  if (!decorate) return { type: 'p', content: [parts.join(' ')] }
  const content = []
  parts.forEach((s, i) => {
    if (i > 0) content.push(' ')
    if (decorate === 'strong' && i === 0) content.push({ t: 'strong', c: s })
    else if (decorate === 'em' && i === 1) content.push({ t: 'em', c: s })
    else content.push(s)
  })
  return { type: 'p', content }
}

function paragraphWithCode(rng) {
  const [a, b] = rng.sentences(2)
  const code = rng.pick(INLINE_CODE)
  return {
    type: 'p',
    content: [a, ' Many teams keep a field such as ', { t: 'code', c: code }, ' on each record so the rule is visible to everyone. ', b],
  }
}

function paragraphWithLink(rng, internal) {
  const [a, b] = rng.sentences(2)
  const link = internal
    ? { t: 'a', href: '/blog', c: 'other guides in this library' }
    : { t: 'a', href: 'https://beta.joinvalley.co/signup?utm_source=blog', c: 'try the workflow on your own account' }
  return { type: 'p', content: [a, ' For a related walkthrough, see ', link, '. ', b] }
}

function sectionBlocks(rng, index, picks) {
  const subheads = picks.subheads.slice(index * 2, index * 2 + 2)
  const listType = rng.rand() < 0.5 ? 'ul' : 'ol'
  const image = picks.images[index]
  const table = picks.tables[index]
  const tableRows = table.slice(0, rng.int(Math.min(4, table.length), table.length))
  const code = picks.codes[index]

  const intro = []
  const introCount = rng.int(2, 4)
  for (let i = 0; i < introCount; i++) intro.push(paragraph(rng, i === 0 ? 'strong' : i === 1 ? 'em' : null))

  // Groups after the intro; their order varies per seed.
  const listGroup = [
    { type: 'h2', content: [subheads[0]] },
    paragraph(rng),
    { type: listType, items: rng.take(LIST_ITEMS, rng.int(3, 5)).map((t) => [t]) },
    paragraphWithLink(rng, index !== 1),
  ]
  const quoteGroup = [{ type: 'blockquote', content: [picks.quotes[index]] }, paragraph(rng)]
  const mediaGroup = [
    paragraph(rng),
    { type: 'img', src: image.src, width: image.width, height: image.height, alt: 'Placeholder illustration' },
    paragraph(rng),
    { type: 'table', rows: tableRows },
  ]
  const codeGroup = [
    { type: 'h3', content: [subheads[1]] },
    paragraphWithCode(rng),
    { type: 'code', lines: code },
    paragraph(rng),
  ]
  const groups = rng.take([listGroup, quoteGroup, mediaGroup, codeGroup], 4)
  const blocks = intro.concat(...groups)
  const outroCount = rng.int(0, 2)
  for (let i = 0; i < outroCount; i++) blocks.push(paragraph(rng))
  return blocks
}

export function placeholderArticle(seed, { idPrefix } = {}) {
  const rng = makeRng(seed)
  const titles = rng.take(SECTION_TITLES, 3)
  // One of each per section, no repeats within an article
  const picks = {
    subheads: rng.take(SUBHEADS, 6),
    images: rng.take(IMAGES, 3),
    tables: rng.take(TABLES, 3),
    codes: rng.take(CODE_SNIPPETS, 3),
    quotes: rng.take(QUOTES, 3),
  }
  const ids = idPrefix
    ? [1, 2, 3].map((n) => `${idPrefix}${n}`)
    : ['blog-section-1', 'blog-section2', 'blog-section3'] // live ids, quirk included
  return {
    sections: titles.map((title, i) => ({ id: ids[i], title, blocks: sectionBlocks(rng, i, picks) })),
  }
}

export default placeholderArticle
