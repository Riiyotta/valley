// Deterministic placeholder copy for the case-study clone.
// The live case-study bodies, pull-quotes, testimonials and company blurbs are NOT reproduced.
// Everything here is neutral filler (lorem-style words), seeded by the slug so each page is stable.

const WORDS = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore ' +
  'magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo ' +
  'consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint ' +
  'occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum praesent luctus ' +
  'viverra accumsan lacus vel facilisis volutpat blandit cursus risus ultrices eros vitae semper tristique ' +
  'senectus netus malesuada fames turpis egestas pretium aenean pharetra magna ac placerat vestibulum'
).split(' ')

function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

// mulberry32
function rng(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeText(r, chars) {
  const out = []
  let len = 0
  let sentence = 0
  while (len < chars) {
    let w = WORDS[Math.floor(r() * WORDS.length)]
    if (sentence === 0) w = w[0].toUpperCase() + w.slice(1)
    sentence++
    const end = sentence > 6 && r() < 0.16
    if (end || len + w.length + 1 >= chars) {
      w += '.'
      sentence = 0
    } else if (sentence > 3 && r() < 0.06) w += ','
    out.push(w)
    len += w.length + 1
  }
  const s = out.join(' ')
  return s.endsWith('.') ? s : s + '.'
}

function title(r, chars) {
  const t = makeText(r, chars).replace(/[.,]/g, '').toLowerCase()
  return t[0].toUpperCase() + t.slice(1)
}

export const PLACEHOLDER_NOTE = 'Placeholder text for the study clone; the original case study is not reproduced.'

// Returns the article structure for one case study. Element types follow the live template
// (spec/pages/casestudy.md section 4): CHALLENGES / SOLUTIONS / RESULTS groups, each with an h2 and a
// rich-text block; paragraphs with bold lead-ins; one list in RESULTS.
export function caseBody(slug) {
  const r = rng(hash(slug))
  const n = (min, max) => min + Math.floor(r() * (max - min + 1))

  const challenges = {
    chip: 'CHALLENGES',
    title: title(r, n(70, 95)),
    blocks: [{ type: 'p', text: `${PLACEHOLDER_NOTE} ${makeText(r, n(60, 120))}` }],
  }
  for (let i = 0, c = n(3, 6); i < c; i++) challenges.blocks.push({ type: 'p', text: makeText(r, n(150, 360)) })

  const solutions = { chip: 'SOLUTIONS', title: title(r, n(70, 97)), blocks: [] }
  solutions.blocks.push({ type: 'p', text: makeText(r, n(180, 260)) })
  for (let i = 0, c = n(3, 4); i < c; i++) {
    solutions.blocks.push({ type: 'p', lead: title(r, n(18, 34)) + ':', text: makeText(r, n(180, 400)) })
  }

  const results = { chip: 'RESULTS', title: title(r, n(50, 75)), blocks: [] }
  results.blocks.push({ type: 'p', lead: title(r, n(8, 14)) + ':', text: '' })
  results.blocks.push({
    type: 'ul',
    items: [0, 1, 2].map(() => ({ lead: title(r, n(18, 28)), text: makeText(r, n(4, 10)).replace('.', '') })),
  })
  for (let i = 0, c = n(2, 4); i < c; i++) results.blocks.push({ type: 'p', text: makeText(r, n(160, 330)) })

  return {
    sections: [challenges, solutions, results],
    pullQuote: makeText(r, n(56, 62)),
  }
}

// Testimonial quote (live: about 276 chars at 40px) and the sidebar company blurb (about 196 chars).
export function caseQuote(slug) {
  const r = rng(hash(slug + ':quote'))
  return `"${makeText(r, 255 + Math.floor(r() * 30))}"`
}

export function caseBlurb(slug) {
  const r = rng(hash(slug + ':about'))
  return makeText(r, 188 + Math.floor(r() * 12))
}
