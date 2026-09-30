import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PROOF_AVATARS, PROOF_TICKER } from '../../../data/landing/templates.js'
import '../../../styles/pages/landing/motion.css'

// Hero proof ticker (spec 3.2, motion M2). Three overlapping avatars (x 0/10/22, opacity
// .25/.62/1) and five rows; row 1 is the resting state.
//
// Motion, measured frame by frame on all four live pages (template x3 + agencies) and read
// from the live Framer appear config:
// - The row stack steps up one row after 2.0s dwells: rows 1 -> 2 -> 3 -> 4 -> 5 then, after a
//   1.0s dwell, snaps (no animation) back to row 1. Cycle 9.0s, identical at every width and
//   with reduced motion emulated (live has no reduced-motion override).
// - Each step moves the stack with a spring (zeta .73, omega 18.9: 0 -> 1.028 @230ms -> 1 by
//   ~430ms), the incoming active row grows from 14px to 16px text as it slides (Framer layout
//   scale) and the clip box width follows the active row's width (375 -> 356 -> 376 -> 380).
// - Visibility is what the live Framer variants actually render: row 1 is always opaque; at
//   >= 1200 row 2 is opaque from step 2 on and reads "Gallea AI generated 15 meetings in 14
//   days" while it is the active row; rows 3-5 are opacity 0 in every variant (their appear
//   effect targets opacity 0), so the ticker shows row 1, row 2, then an empty clip for steps
//   3-5. Below 1200 only row 1 is ever visible.
// - On load row 1 rises 10px and fades in after .5s (spring 200/30), from the appear config.
const DWELL = [2000, 2000, 2000, 2000, 1000]
const DESKTOP = '(min-width: 1200px)'
const GALLEA = { text: 'Gallea AI generated 15 MEETINGS in 14 DAYS', highlights: ['MEETINGS in 14 DAYS'] }
const AVATAR_X = [0, 10, 22]
const AVATAR_OPACITY = [0.25, 0.62, 1]

function Row({ text, highlights }) {
  // Split the verbatim row text around each highlight, in order.
  const parts = []
  let rest = text
  highlights.forEach((h) => {
    const i = rest.indexOf(h)
    if (i < 0) return
    if (i > 0) parts.push({ t: rest.slice(0, i) })
    parts.push({ t: h, hl: true })
    rest = rest.slice(i + h.length)
  })
  if (rest) parts.push({ t: rest })
  return parts.map((p, i) =>
    p.hl ? (
      <span key={i} className="lp-proof__hl">
        {p.t}
      </span>
    ) : (
      <span key={i}>{p.t}</span>
    ),
  )
}

export default function ProofTicker({ rows = PROOF_TICKER, avatars = PROOF_AVATARS, className = '' }) {
  const boxRef = useRef(null)
  const prevRef = useRef(null) // { step, w: [], h: [] } from the last committed step
  const [step, setStep] = useState(0)
  const [desktop, setDesktop] = useState(false)
  const [anim, setAnim] = useState(false)

  // Layout effect so row 1's load state (hidden, +10px) is in place before the first paint.
  useLayoutEffect(() => {
    const mq = window.matchMedia(DESKTOP)
    const sync = () => setDesktop(mq.matches)
    sync()
    setAnim(true)
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!anim) return undefined
    const id = setTimeout(() => setStep((s) => (s + 1) % rows.length), DWELL[step] ?? 2000)
    return () => clearTimeout(id)
  }, [anim, step, rows.length])

  // Each step: rows keep their previous scale for one frame, then spring to the live layout.
  // Live row pitch (measured): rows above the active row sit at -25px per row (row 1 at -24
  // once it has left), rows below at +25.6. Translates are applied per row on top of the
  // clone's flex layout so the travel per step is the live 24-25px.
  const place = (els, s) => {
    const top0 = els[0].offsetTop
    els.forEach((el, i) => {
      const target = 25 * (i - s) + (i === 0 && s > 0 ? 1 : 0) + (i > s ? 0.6 : 0)
      el.style.transform = `translateY(${(target - (el.offsetTop - top0)).toFixed(2)}px)`
    })
  }
  useLayoutEffect(() => {
    const box = boxRef.current
    if (!box || !anim) return
    const els = [...box.children]
    const prev = prevRef.current
    const snap = !prev || (step === 0 && prev.step !== 0)
    const w = els.map((el) => el.offsetWidth)
    const h = els.map((el) => el.offsetHeight)

    box.setAttribute('data-lp-snap', '')
    els.forEach((el, i) => {
      const sx = !snap && prev.w[i] && w[i] ? prev.w[i] / w[i] : 1
      const sy = !snap && prev.h[i] && h[i] ? prev.h[i] / h[i] : 1
      el.style.scale = Math.abs(sx - 1) > 0.001 || Math.abs(sy - 1) > 0.001 ? `${sx} ${sy}` : ''
    })
    if (snap) {
      place(els, step)
      box.style.width = `${w[step]}px`
    }
    void box.offsetWidth // commit the start state before transitions resume
    box.removeAttribute('data-lp-snap')
    if (!snap) {
      place(els, step)
      els.forEach((el) => {
        el.style.scale = ''
      })
      box.style.width = `${w[step]}px`
    }
    prevRef.current = { step, w, h }
  }, [step, desktop, anim])

  // Web fonts change the row widths after mount: re-measure the clip width without animating.
  useEffect(() => {
    if (!anim || !document.fonts) return undefined
    let alive = true
    document.fonts.ready.then(() => {
      const box = boxRef.current
      if (!alive || !box || !prevRef.current) return
      const els = [...box.children]
      const s = prevRef.current.step
      box.setAttribute('data-lp-snap', '')
      place(els, s)
      box.style.width = `${els[s].offsetWidth}px`
      prevRef.current = { step: s, w: els.map((el) => el.offsetWidth), h: els.map((el) => el.offsetHeight) }
      void box.offsetWidth
      box.removeAttribute('data-lp-snap')
    })
    return () => {
      alive = false
    }
  }, [anim])

  const shown = (i) => i === 0 || (desktop && i === 1 && step >= 1)

  return (
    <div className={`lp-proof ${className}`} data-framer-name="Tag">
      <div className="lp-proof__avatars">
        {avatars.map((src, i) => (
          <div key={src} className="lp-proof__avatar" style={{ left: AVATAR_X[i], opacity: AVATAR_OPACITY[i] }}>
            <img src={src} alt="" />
          </div>
        ))}
      </div>
      <div
        className="lp-proof__rows"
        data-lp-ticker=""
        data-lp-anim={anim ? '' : undefined}
        data-step={step}
        ref={boxRef}
      >
        {rows.map((r, i) => {
          const row = anim && desktop && i === 1 && step === 1 ? GALLEA : r
          return (
            <p
              key={i}
              className="lp-proof__row"
              data-active={i === 0 || (anim && i === step) ? 'true' : 'false'}
              data-shown={anim && shown(i) ? '' : undefined}
              aria-hidden={i === 0 ? undefined : 'true'}
            >
              <Row text={row.text} highlights={row.highlights} />
            </p>
          )
        })}
      </div>
    </div>
  )
}
