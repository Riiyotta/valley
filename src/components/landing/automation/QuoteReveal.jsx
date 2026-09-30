import { useEffect, useRef } from 'react'
import '../../../styles/pages/landing/automation/quote-reveal.css'

// Unnamed quote section (spec 6 la-quote-reveal, motion M6). 460vh tall, black, with a sticky
// 100vh stage. The quote is split into word spans (flex items, 12px / 8px gap) holding one span
// per letter: 119 letters. This file renders the static, unrevealed state the live page shows
// before the section is reached (every letter rgba(255,255,255,.4) at opacity .7).
//
// Motion (M6), measured on live at 1440x900, 1280x800, 768x1024 and 390x844 (0.01-0.035 steps
// of p, ~12k letter samples) and with reduced motion emulated (live does not change it):
//   p = (scrollY - sectionTop) / (sectionHeight - innerHeight)   (3240px at 1440x900)
// The quote is revealed word by word: each of the 26 words owns 1/26 of p and its letters
// split that slice evenly. For letter j of the n letters in word k:
//   s = (k + j / n) / 26,  e = (k + (j + 1) / n) / 26
//   p <= s      rgba(255,255,255,.4) at opacity .7 (the static state)
//   s < p < e   #fff, opacity .7 -> 1 linearly
//   p >= e      #fff, opacity 1 -> .7 linearly over [e, 1] (the last letter, e = 1, stays 1)
// Model error against live: rms .0003, max .013 in opacity; colour flips match to within one
// sample. (The earlier i/119 formula drifted by up to 10 letters mid-quote.)
const QUOTE =
  'There has been a lot of talk surrounding what works in outbound now. The answer is Valley. Full Stop. Valley is the next generation of outbound.'

const WORDS = (() => {
  let i = 0
  const words = QUOTE.split(' ')
  return words.map((word, k) =>
    [...word].map((ch, j) => ({
      ch,
      i: i++,
      s: (k + j / word.length) / words.length,
      e: (k + (j + 1) / word.length) / words.length,
    })),
  )
})()
const LETTERS = WORDS.flat()

function letterState(p, { s, e }) {
  if (p <= s) return null // static: rgba(255,255,255,.4) at .7
  if (p < e) return 0.7 + (0.3 * (p - s)) / (e - s)
  if (e >= 1) return 1
  return 1 - 0.3 * Math.min(1, (p - e) / (1 - e))
}

export default function QuoteReveal() {
  const rootRef = useRef(null)
  const textRef = useRef(null)

  // rAF-throttled scroll handler, attached only while the section intersects the viewport
  // (same pattern as components/Endorsement.jsx).
  useEffect(() => {
    const root = rootRef.current
    const spans = [...textRef.current.querySelectorAll('.la-quote__letter')]
    const last = new Array(spans.length).fill(undefined)

    let raf = 0
    const update = () => {
      raf = 0
      const rect = root.getBoundingClientRect()
      const pin = Math.max(1, rect.height - window.innerHeight)
      const p = -rect.top / pin
      LETTERS.forEach((l, i) => {
        const o = letterState(p, l)
        const key = o === null ? null : Math.round(o * 1000)
        if (key === last[i]) return
        last[i] = key
        const el = spans[i]
        if (o === null) {
          el.style.removeProperty('color')
          el.style.removeProperty('opacity')
        } else {
          el.style.color = '#fff'
          el.style.opacity = String(key / 1000)
        }
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    let listening = false
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !listening) {
        listening = true
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        onScroll()
      } else if (!en.isIntersecting && listening) {
        listening = false
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
        if (raf) cancelAnimationFrame(raf)
        update() // settle on the final (clamped) state after a fast scroll past
      }
    })
    io.observe(root)
    update()
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="la-quote-reveal" className="la-quote" aria-label="Jeff Becker on Valley" ref={rootRef}>
      <div className="la-quote__stage">
        <div className="la-quote__glow" aria-hidden="true" />
        <p className="la-quote__text" aria-label={QUOTE} ref={textRef}>
          {WORDS.map((letters, w) => (
            <span className="la-quote__word" key={w} aria-hidden="true">
              {letters.map(({ ch, i }) => (
                <span className="la-quote__letter" data-i={i} key={i}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </p>
        <div className="la-quote__author">
          <div className="la-quote__name">JEFF BECKER</div>
          <div className="la-quote__role">[EX - HEAD OF SALES, LINKEDIN]</div>
        </div>
      </div>
    </section>
  )
}
