import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import '../styles/logos.css'

// CLONE_SPEC.md section 9 (logos). One DOM for all widths: the "migrated from" blocks and the
// "More teams using Valley" tag only show below 1200px ("Website Tablet" / "Website Phone").

const IMG = '/assets/img/'

const FEATURED = [
  { alt: 'Rho', src: 'LCrsyazQOAmTZUH3T20VNvGctf8.svg', w: 81, h: 37 },
  { alt: 'bolt.new', src: 'fPy3rajrBwOXFvdygI98ux0wDiI.png', w: 114, h: 35 },
  { alt: 'StubHub', src: 'TJ8612Exbq2vTbQxsa8bl8I4.svg', w: 99, h: 45 },
  { alt: 'Clarify', src: 'QCo0IxNMsKaJfiivhlkmSucpwg.svg', w: 123, h: 32 },
]

// Tooltip copy verbatim from spec/states/logo_tooltips.json.
const TIPS = {
  miro: {
    quote: '“The GTM landscape is evolving daily, and Valley peaked my interest early on as a company that will be the future of GTM tools”',
    icp: 'ICP: SALES & GTM  LEADERS',
  },
  '10X': {
    quote: 'Valley gave us control of what we were doing as opposed to giving the keys and letting them go. But most importantly, the reason why we joined Valley is because it was a third of the price of the agency that we were using to do a similar type of outreach. - Sam',
    icp: 'ICP: DEV TEAMS',
  },
  Tacnode: {
    quote: "I've been doing this about 12 years and I've never used a tool like this before. It's super cool. Valley seems to have booked us more meetings than anything else that we're using right now",
    icp: 'ICP: AI-First, Real-time Data Teams',
  },
  'Growth Protocol': {
    quote: "I'm able to come into those [pipeline review] meetings and be like, look at what I booked through Valley. You know, if my other kind of channels have slowed down, I'm like, but Valley, Valley's there.",
    icp: 'ICP: SALES & GTM  LEADERS',
  },
  Kaster: {
    quote: "We've booked like four enterprise level demos that we normally wouldn't have through LinkedIn in just the past two months. And two of them happened last week alone",
    icp: 'ICP: C suite HR Decision Makers',
  },
  gocanvas: {
    quote: 'A real response to a message Valley sent a prospect: “I was never considering anything until you reached out with a message that literally spoke to me.” The automation is great but the sauce within Valley is the messaging itself.',
    icp: 'ICP: Field Service & Construction Firms',
  },
  FRANQ: {
    quote: "I can standardize my approach and I can A-B test knowing that I'm actually A-B testing, not depending on someone to be in a good mood that day or in a bad mood that day.",
    icp: 'ICP: SALES & GTM  LEADERS',
  },
  'Darwinian Ventures': {
    quote: 'AI cannot close a deal for you. But it can be a hot lead engine. Valley is always flipping hot leads to our reps, so they can focus on calling and emailing them.',
    icp: 'ICP: SALES & GTM  LEADERS',
  },
}

// w/h = natural image size; the logo renders 46px tall at that aspect ratio.
const MAIN = [
  { alt: 'klaar', src: '3UCjPMpY3Nkuy1xoJaCCN3TKJk.png', w: 230, h: 75 },
  { alt: 'smallest.ai', src: 'glOVQL3Qd1fVRyHWORpg8KFVY.png', w: 360, h: 120 },
  { alt: 'miro', src: 'i9MrwcnTeJlupc8YonFW5eaOgec.png', w: 228, h: 120, dot: true },
  { alt: 'Peec AI', src: 'AYyRFkyykfeW6XOj952lPF0Zc.png', w: 285, h: 120 },
  { alt: 'glean', src: 'fSMDCykUwcEbvyXPdSXFjdNF4hY.png', w: 193, h: 120, ar: 3.39394 },
  { alt: '10X', src: 'ZlOSMxkKcwvpfjkFDJ0ZUgjJKk.png', w: 165, h: 125, dot: true },
  { alt: 'Tacnode', src: 'NfiYqyXn6RqMDJGpeS3bJkL9eEU.png', w: 138, h: 43, dot: true },
  { alt: 'ggwp', src: 'PamliAUziZnsHcig47BKJwoquY.png', w: 267, h: 120 },
  { alt: 'Growth Protocol', src: '4uqpOIDAG2RqFhTLQVKnRR4ENRE.png', w: 591, h: 120, dot: true, wide: true },
  { alt: 'Kaster', src: 'uoWIwAg1brM2fxpy5tHe7EYdLbU.png', w: 292, h: 120, dot: true },
  { alt: 'gocanvas', src: '2MD4BqAIsMousaVLu0QWFtAnBjA.png', w: 322, h: 120, dot: true },
  { alt: 'PandaDoc', src: 'SOyfehqzz61uEv0nABhxHZXPaI.png', w: 312, h: 120 },
  { alt: 'FRANQ', src: 'SsCt2nwZM7v3r1iJr5go5IakYfA.png', w: 317, h: 120, dot: true },
  { alt: 'Darwinian Ventures', src: '10dfy9LKXgJaLU5a86bKVRe9HE.png', w: 312, h: 120, dot: true },
  { alt: 'ANTLER', src: 'yJ5cYSTyer3TnYG3EFxM8MXhpg.png', w: 289, h: 120, ar: 3.39394 },
  { alt: 'More', src: 'DIlJZPjonPeUe4ZwL1CEYmCOUw.png', w: 288, h: 120 },
]

const MORE = { alt: 'More', src: 'DIlJZPjonPeUe4ZwL1CEYmCOUw.png', w: 288, h: 120 }

// Tablet/phone "migrated from" blocks. Tag image sizes are the live 168px-wide boxes (fractional heights).
const MIGRATED = [
  {
    tag: { alt: 'Heyreach', src: 'jx1u5bQyJQTHE8DVeFhTlV7WEQ.png', w: 168, h: 38.047, fit: 'contain' },
    logos: [
      // alt on the live site says "Ridge" but the image is Gallea AI (spec 21.4)
      { alt: 'Gallea AI', src: 'Bx6e2ANj69WlGVSGixBWFjy4WY.png', w: 754, h: 230, dot: true },
      { alt: 'Circuit', src: 'VuqKYnHWoTofCCM3yIH85eHOpo.png', w: 228, h: 120 },
      { alt: 'Capsule', src: '7ii3QW0Ru8RimJQ33PMayGEtvI.png', w: 225, h: 120, ar: 3.21212 },
      { alt: 'Ditchcarbon', src: 'yvTz5ONEScQRG5OWmiMEDzXpas.png', w: 288, h: 120 },
    ],
  },
  {
    tag: { alt: 'Expandi', src: 'cLS5abTnQ5XywuBkuSOLzapiDo.png', w: 168, h: 48.672, fit: 'cover' },
    logos: [
      { alt: 'Growth Experts', src: 'gj2oKe8h7wzUNC5y3oBGI34mM.png', w: 246, h: 120 },
      { alt: 'We&Goliath', src: 'YG1tT9kh0M7mlsBDlaOdgRR0.png', w: 264, h: 120, ar: 3.21212 },
      { alt: 'StoryGen', src: 'ktz6KWkTv0W6wZYpr8fDzYPvY4I.png', w: 279, h: 120 },
      MORE,
    ],
  },
  {
    tag: { alt: 'Lemlist', src: 'W4Pger03NHoxtfZHRcbAIfQ6P4.png', w: 168, h: 55.578, fit: 'contain' },
    logos: [
      { alt: 'experio', src: 'ujCoumqWwdBQpRvvlCfiVuOzso.png', w: 246, h: 120 },
      { alt: 'salesmotion', src: '8muhkAJTPNewpFOWmKmjxRbWdI.png', w: 360, h: 120, ar: 3.21212 },
      { alt: 'Websity Digital', src: 'XR2mg0m5jaEuY77g9McpBAjsHw.png', w: 168, h: 120 },
      MORE,
    ],
  },
]

function LogoCell({ logo, onShow, onHide, onTap }) {
  const ref = useRef(null)
  const tip = logo.dot ? TIPS[logo.alt] : null
  const handlers = tip
    ? {
        onPointerEnter: (e) => e.pointerType === 'mouse' && onShow(ref.current, tip),
        onPointerLeave: (e) => e.pointerType === 'mouse' && onHide(),
        onPointerUp: (e) => e.pointerType !== 'mouse' && onTap(ref.current, tip),
      }
    : {}
  return (
    <div
      ref={ref}
      className="logo-cell"
      tabIndex={0}
      data-dot={logo.dot ? 'true' : undefined}
      // A few live cells use a slightly different Framer aspect ratio (glean/antler 3.39394,
      // Capsule/We&Goliath/salesmotion 3.21212), which makes their rows ~0.6-1px taller.
      style={logo.ar ? { aspectRatio: String(logo.ar) } : undefined}
      {...handlers}
    >
      <div className="logo-row">
        {logo.dot && <span className="logo-dot animate-dot-blink" aria-hidden="true" />}
        <div
          className={logo.wide ? 'logo-mark logo-mark--wide' : 'logo-mark'}
          style={{ aspectRatio: `${logo.w} / ${logo.h}` }}
        >
          <img src={IMG + logo.src} alt={logo.alt} width={logo.w} height={logo.h} loading="lazy" decoding="async" />
        </div>
      </div>
    </div>
  )
}

// Portal card, 280px wide, 10px above the cell and centered on it (spec 9 "Logo tooltip").
// Fades with the live spring {bounce:.2,duration:.4} (opacity transition in logos.css): it mounts
// at opacity 0, flips data-shown once positioned, and stays mounted until the hide fade ends.
function Tooltip({ anchor, tip, shown, onGone }) {
  const ref = useRef(null)
  const [pos, setPos] = useState(null)
  const [entered, setEntered] = useState(false)
  useLayoutEffect(() => {
    if (!pos || entered) return
    getComputedStyle(ref.current).opacity // commit opacity 0 so the fade-in transitions
    setEntered(true)
  }, [pos, entered])
  // Hidden before it ever faded in (or already at 0): no transition will fire, so drop it now.
  useEffect(() => {
    if (!shown && (!entered || getComputedStyle(ref.current).opacity === '0')) onGone()
  }, [shown, entered]) // eslint-disable-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const r = anchor.getBoundingClientRect()
    const h = ref.current.offsetHeight
    // The live card is kept 20px inside the viewport edges (measured at 390: left column -> x=20,
    // right column -> right edge at vw-20).
    const vw = document.documentElement.clientWidth
    const left = Math.min(Math.max(r.left + r.width / 2 - 140, 20), vw - 20 - 280)
    setPos({
      left: left + window.scrollX,
      top: r.top + window.scrollY - 10 - h,
    })
  }, [anchor, tip])
  return createPortal(
    <div
      ref={ref}
      className="logo-tip"
      role="tooltip"
      data-shown={String(entered && shown)}
      onTransitionEnd={(e) => {
        if (e.target === ref.current && !shown) onGone()
      }}
      style={{ left: pos ? pos.left : 0, top: pos ? pos.top : 0, visibility: pos ? 'visible' : 'hidden' }}
    >
      <div className="logo-tip-card">
        <div className="logo-tip-inner">
          {/* 14x14 quote glyph, captured from the live DOM (Framer <use> symbol, viewBox -1 -1 14 14). */}
          <svg className="logo-tip-glyph" width="14" height="14" viewBox="-1 -1 14 14" fill="none" aria-hidden="true">
            <path d="M0 12V6.66122C0 3.47755 1.29851 0.979591 4.8806 0V2.69388C3.22388 3.23265 2.50746 4.16326 2.55224 6.66122H4.8806V12H0ZM12 0V2.69388C10.3433 3.23265 9.62687 4.16326 9.67164 6.66122H12V12H7.1194V6.66122C7.1194 3.47755 8.41791 0.979591 12 0Z" fill="black" />
          </svg>
          <div className="logo-tip-text">
            <p className="logo-tip-quote">{tip.quote}</p>
            <p className="logo-tip-icp">{tip.icp}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default function Logos() {
  const [active, setActive] = useState(null) // { anchor, tip, touch }
  // Tooltips still fading out (each live logo owns its own tooltip, so a hide and the next show
  // cross-fade). Entries are dropped when their opacity transition ends.
  const [leaving, setLeaving] = useState([])
  const show = (next) => {
    setLeaving((l) => [...l.filter((x) => x.anchor !== next.anchor), ...(active && active.anchor !== next.anchor ? [active] : [])])
    setActive(next)
  }
  const hide = () => {
    if (active) setLeaving((l) => [...l.filter((x) => x.anchor !== active.anchor), active])
    setActive(null)
  }
  const gone = (anchor) => setLeaving((l) => l.filter((x) => x.anchor !== anchor))

  const onShow = (anchor, tip) => show({ anchor, tip, touch: false })
  const onHide = () => {
    if (active && !active.touch) hide()
  }
  const onTap = (anchor, tip) => {
    if (active && active.anchor === anchor) hide()
    else show({ anchor, tip, touch: true })
  }

  // Touch: tapping outside a dot cell closes the tooltip.
  useEffect(() => {
    if (!active?.touch) return
    const close = (e) => {
      if (!active.anchor.contains(e.target)) hide()
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [active])

  const cellProps = { onShow, onHide, onTap }

  return (
    <section id="logos" className="logos">
      <h2 className="logos-title">
        <span className="logos-title--desktop">Customers who migrated off of HeyReach, Expandi, and Lemlist.</span>
        <span className="logos-title--compact">Customers who migrated off of HeyReach, Expandi and lemlist.</span>
      </h2>
      <div className="logos-container">
        <div className="logos-migrated">
          {MIGRATED.map((g) => (
            <div key={g.tag.alt} className="logos-group">
              {g.logos.map((l, i) => (
                <LogoCell key={l.alt + i} logo={l} {...cellProps} />
              ))}
              <div className="logos-tag">
                <img
                  src={IMG + g.tag.src}
                  alt={g.tag.alt}
                  style={{ width: g.tag.w, height: g.tag.h, objectFit: g.tag.fit }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="logos-more-tag">
          <p>More teams using Valley</p>
        </div>
        <div className="logos-featured">
          {FEATURED.map((l) => (
            <div key={l.alt} className="logos-featured-cell">
              <img src={IMG + l.src} alt={l.alt} style={{ width: l.w, height: l.h, objectFit: 'cover' }} />
            </div>
          ))}
        </div>
        <div className="logos-grid">
          {MAIN.map((l) => (
            <LogoCell key={l.alt} logo={l} {...cellProps} />
          ))}
        </div>
      </div>
      {[...leaving.map((l) => ({ ...l, shown: false })), ...(active ? [{ ...active, shown: true }] : [])].map((t) => (
        <Tooltip key={t.tip.quote} anchor={t.anchor} tip={t.tip} shown={t.shown} onGone={() => gone(t.anchor)} />
      ))}
    </section>
  )
}
