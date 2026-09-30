// Placeholder bodies for /terms-of-service and /privacy-policy. The clone does not reproduce
// Valley's legal text (spec/pages/legal.md "Content rule"). The structure follows the live pages:
//   Terms: 103 <p> blocks (no margins), empty-line paragraphs as separators, 26 bold lead-ins,
//          1 external link. Paragraph lengths follow the live line counts at 1440 (rich_legal_terms.json).
//   Privacy: one <p> broken by <br>, 29 bold heading lines, 10 bold-italic sub-heads, 5 external
//          links; close to the live page height (the live p holds ~22,800 characters, denser than this filler).
// Filler is neutral lorem-style text, deterministic (fixed seeds).

const WORDS = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore ' +
  'magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo ' +
  'consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint ' +
  'occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum praesent luctus ' +
  'viverra accumsan lacus vel facilisis volutpat blandit cursus risus ultrices eros vitae semper tristique'
).split(' ')

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

function text(r, chars) {
  const out = []
  let len = 0
  let n = 0
  while (len < chars) {
    let w = WORDS[Math.floor(r() * WORDS.length)]
    if (n === 0) w = w[0].toUpperCase() + w.slice(1)
    n++
    if ((n > 7 && r() < 0.15) || len + w.length + 1 >= chars) {
      w += '.'
      n = 0
    }
    out.push(w)
    len += w.length + 1
  }
  return out.join(' ')
}

function heading(r, words) {
  const out = []
  for (let i = 0; i < words; i++) {
    const w = WORDS[Math.floor(r() * WORDS.length)]
    out.push(w[0].toUpperCase() + w.slice(1))
  }
  return out.join(' ')
}

export const NOTE =
  'Placeholder text for the Valley study clone. This page keeps the layout of the live page but does not reproduce its legal text.'

// Live paragraph heights at 1440 (31px per line); 31 = an empty separator paragraph.
const TERMS_LINES = [124, 186, 31, 155, 31, 155, 31, 31, 62, 31, 31, 310, 31, 217, 31, 186, 31, 31, 31, 186, 31, 248, 31, 31, 31, 155, 31, 31, 31, 124, 31, 31, 31, 124, 31, 31, 31, 155, 31, 31, 31, 186, 31, 279, 31, 31, 186, 31, 155, 31, 31, 31, 155, 31, 186, 31, 31, 31, 217, 248, 279, 341, 31, 31, 31, 248, 31, 124, 62, 31, 31, 434, 31, 155, 31, 31, 31, 217, 31, 31, 31, 124, 31, 31, 31, 124, 31, 31, 31, 124, 31, 31, 31, 62, 31, 31, 31, 434, 93, 31, 31, 31, 155].map((h) => Math.round(h / 31))

// Returns [{ lead?: string, text: string, link?: boolean }] with `null` for empty paragraphs.
export function termsBody() {
  const r = rng(20260929)
  let section = 0
  let textIndex = 0
  return TERMS_LINES.map((lines) => {
    if (lines === 1) return null
    const i = textIndex++
    const chars = lines * 88 - 40
    if (i === 0) return { text: `${NOTE} ${text(r, chars - NOTE.length - 1)}` }
    if (i === 1) return { text: text(r, chars) }
    // 26 numbered bold lead-ins on the following paragraphs (the live page has 26 strong runs)
    if (section < 26 && (i % 2 === 0 || i > 30)) {
      section++
      const lead = `${section}. ${heading(r, 1 + Math.floor(r() * 3))}.`
      return { lead, text: text(r, chars - lead.length - 1), link: section === 20 }
    }
    return { text: text(r, chars) }
  })
}

// Privacy: a flat list of runs rendered inside one <p>; 'br' = line break.
export function privacyRuns() {
  const r = rng(424242)
  const runs = [{ t: 'text', v: NOTE }, { t: 'br' }, { t: 'br' }]
  const links = [
    { href: 'https://joinvalley.co/', label: 'Valley', strong: true, primary: true },
    { href: 'https://www.aboutcookies.org/', label: 'aboutcookies.org' },
    { href: 'https://www.aboutcookies.org/', label: 'aboutcookies.org' },
    { href: 'http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html', label: 'Flash settings' },
    { href: 'http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager06.html', label: 'Flash settings' },
  ]
  let chars = NOTE.length
  let emCount = 0
  let linkIdx = 0
  for (let s = 1; s <= 29; s++) {
    runs.push({ t: 'strong', v: `${s}. ${heading(r, 1 + Math.floor(r() * 4))}` }, { t: 'br' })
    const paras = 2 + Math.floor(r() * 2)
    for (let p = 0; p < paras; p++) {
      if (emCount < 10 && s > 4 && p === 1 && s % 2 === 1) {
        runs.push({ t: 'emstrong', v: heading(r, 2 + Math.floor(r() * 3)) }, { t: 'br' })
        emCount++
      }
      const len = 150 + Math.floor(r() * 220)
      if (linkIdx < links.length && (s === 2 || s === 21 || s === 22) && p === 0) {
        const n = s === 2 ? 1 : 2
        for (let k = 0; k < n && linkIdx < links.length; k++) {
          runs.push({ t: 'text', v: text(r, Math.floor(len / 2)) + ' ' }, { t: 'link', ...links[linkIdx++] }, { t: 'text', v: '. ' })
        }
        runs.push({ t: 'text', v: text(r, Math.floor(len / 2)) })
      } else {
        runs.push({ t: 'text', v: text(r, len) })
      }
      chars += len
      runs.push({ t: 'br' }, { t: 'br' })
    }
  }
  // Top up so the block height lands near the live one (10,881px at 1440).
  while (chars < 18000) {
    const len = 200 + Math.floor(r() * 200)
    runs.splice(runs.length - 2, 0, { t: 'br' }, { t: 'br' }, { t: 'text', v: text(r, len) })
    chars += len
  }
  while (runs.length && runs[runs.length - 1].t === 'br') runs.pop()
  return runs
}
