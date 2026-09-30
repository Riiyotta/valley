import { useCallback, useEffect, useRef, useState } from 'react'
import '../styles/hero.css'

// CLONE_SPEC.md section 8 (hero) + section 20 rows 1-3 (autoplay, scene enter, proof sync).
// The visual's markup mirrors the live `.valley-hero-visual` component (Send scene taken
// verbatim from the saved page; the other four rebuilt from spec/states/hero.txt + the
// .vhv-* rules in spec/components.css, which are ported verbatim into styles/hero.css).

const SIGNUP = 'https://beta.joinvalley.co/signup'
const DEMO = 'https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b'
const SCENE_MS = 5000
const MAYA = '/assets/img/KD64dhKrNdxKzSajCepglBBXSM.jpg'

const SCENES = [
  { id: 'find', label: 'Find', art: '/assets/img/qVEsGfJTu6GKkZimfuu0ZEt9y8w.webp' },
  { id: 'qualify', label: 'Qualify', art: '/assets/img/I2vQY5n5ohqHpTjOEMjbfWcWY.webp' },
  { id: 'research', label: 'Research', art: '/assets/img/rJuKbYxvU87P3NolFKu3MwWGbaw.webp' },
  { id: 'write', label: 'Write', art: '/assets/img/UZd5WAy3WzMaA6tXbKhZPr2Y4.webp' },
  { id: 'send', label: 'Send', art: '/assets/img/4pvxwlcKo6sAQu1W1Q9dsGtx234.webp' },
]

// Proof stories, in scene order (spec 8 table). Hrefs are the spec's relative paths.
const STORIES = [
  {
    quote: '“Valley is a cheat code.”',
    name: 'Stefano McCoy',
    role: 'Sales · Bolt.new',
    company: 'Bolt.new',
    avatar: '/assets/img/QWtiaR1m3BLU5A064IdsPPe2Es.png',
    href: '/casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days',
  },
  {
    quote: '“Instead of going small, we actually go big and just segment them according to ICP fit.”',
    name: 'Freizle Abarrientos',
    role: 'Chief Operating Officer · ThinkFish',
    company: 'ThinkFish',
    avatar: '/assets/img/sfCZQKIFk9u4tjQgtSzASSggZU.jpeg',
    href: '/casestudies/how-thinkfish-books-380-400-meetings-monthly-with-valley',
  },
  {
    quote: '“Valley went really deep to find information that you could never do in just a cursory search.”',
    name: "Tim O'Neil",
    role: 'Sales Leader · GGWP',
    company: 'GGWP',
    avatar: '/assets/img/rnMa9immzygrPgvq8OXo5QCGAk.jpeg',
    href: '/casestudies/how-ggwp-generated-4m-in-pipeline-with-valley',
  },
  {
    quote: '“The quality of conversations were as good as if I was typing it myself.”',
    name: 'David Baeza',
    role: 'Founder & CEO · Butteredtoast',
    company: 'Butteredtoast',
    avatar: '/assets/img/Isd8Ok5lFEZQqqPP6ndAWlTI40I.jpeg',
    href: '/casestudies/how-butteredtoast-generated-1m-in-pipeline-scaling-one-founder-s-personal-brand',
  },
  {
    quote: '“Valley makes our outbound seamless.”',
    name: 'Conrad de Claro',
    role: 'Director of Growth Marketing · GoCanvas',
    company: 'GoCanvas',
    avatar: '/assets/img/ZLYSGUvKkVzLXYs0HskrNMPEys4.jpeg',
    href: '/casestudies/how-gocanvas-30x’d-outbound-pipeline-with-valley',
  },
]

/* ---------- inline SVGs (public/assets/svg/*, see ASSET_MANIFEST.md) ---------- */
const Check = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m4 10 4 4 8-9" />
  </svg>
)
const ChatIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <g stroke="#39779a">
      <path d="M4 3.5h12a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H8L3 18V5a1.5 1.5 0 0 1 1-1.5Z" />
      <path d="M6.5 7h7M6.5 10h4.5" />
    </g>
  </svg>
)
const MailIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="4" width="15" height="12" rx="1.7" />
    <path d="m3 5 7 5 7-5" />
  </svg>
)
const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 10h13m-5-5 5 5-5 5" />
  </svg>
)
const ValleyMark = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 48 45" fill="currentColor" aria-hidden="true">
    <path d="M11.8368 4.67773L21.796 14.637L18.3674 18.2288L13.796 22.9635H4V18.2288H18.3674L8.24491 8.26958L11.8368 4.67773Z" />
    <path d="M36.1632 4.67773L26.204 14.637L29.6326 18.2288L34.204 22.9635H44V18.2288H29.6326L39.7551 8.26958L36.1632 4.67773Z" />
    <path d="M8.24512 32.5954L24.0819 16.9219L39.9187 32.5954L36.4901 36.024L26.5309 26.228V40.2689H21.4697V26.228L11.6737 36.024L8.24512 32.5954Z" />
  </svg>
)
const DocIcon = () => (
  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 2.5h7l3 3v12H5zM12 2.5v4h3M8 10h4M8 13h4" />
  </svg>
)
const SIGNAL_ICONS = [
  // 01..04-hero-visual-signal.svg
  <svg key="0" className="vhv-brand-logo" width="24" height="24" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="7" fill="#dceef8" /><g transform="translate(4 4)" fill="none" stroke="#39779a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 3.5h12a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H8L3 18V5a1.5 1.5 0 0 1 1-1.5Z" /><path d="M6.5 7h7M6.5 10h4.5" /></g></svg>,
  <svg key="1" className="vhv-brand-logo" width="24" height="24" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="7" fill="#fbebca" /><g transform="translate(4 4)" fill="none" stroke="#a66b23" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="14" height="10" rx="2" /><path d="M7 6V3.5h6V6M3 10h14M9 10v2h2v-2" /></g></svg>,
  <svg key="2" className="vhv-brand-logo" width="24" height="24" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="7" fill="#fae3dc" /><g transform="translate(4 4)" fill="none" stroke="#b85c48" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h4v5H4zM12 6h4v5h-4zM8 11c0 2-1 3-3 3m11-3c0 2-1 3-3 3" /></g></svg>,
  <svg key="3" className="vhv-brand-logo" width="24" height="24" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="7" fill="#d9eee7" /><g transform="translate(4 4)" fill="none" stroke="#287d75" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="8.5" cy="8.5" r="5" /><path d="m12 12 4.5 4.5" /></g></svg>,
]

/* ---------- scene bodies ---------- */
function Source({ eyebrow, children }) {
  return (
    <div className="vhv-source">
      <span className="vhv-source-eyebrow"><i />{eyebrow}</span>
      <h3>{children}</h3>
    </div>
  )
}
const Thread = () => (
  <div className="vhv-thread" aria-hidden="true">
    <span />
    <svg width="9" height="9" viewBox="0 0 10 10"><path d="m2 3 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
  </div>
)
const Avatar = ({ className = 'vhv-avatar' }) => (
  <img className={className} src={MAYA} alt="" style={{ objectFit: 'cover', borderRadius: '50%' }} />
)

function FindScene() {
  const signals = ['Lead magnet replies', 'Hiring AEs', 'Competitor complaints', 'Keyword engagement']
  return (
    <>
      <Source eyebrow="AN AUDIENCE THAT KEEPS GROWING">Your next audience.<br />Always taking shape.</Source>
      <Thread />
      <div className="vhv-scene-content" role="img" aria-label="Signals such as lead magnet replies, hiring, competitor complaints and keyword engagement point to one person to qualify.">
        <svg className="vhv-signal-lines" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
          <path d="M100 50 200 145 305 50M95 250 200 145 305 250" />
        </svg>
        {signals.map((s, i) => (
          <div key={s} className={`vhv-signal vhv-signal-${i} vhv-surface vhv-reveal`} style={{ '--i': i }}>
            {SIGNAL_ICONS[i]}
            <strong>{s}</strong>
          </div>
        ))}
        <div className="vhv-audience vhv-surface vhv-reveal" style={{ '--i': 3 }}>
          <span className="vhv-mini-label">A PERSON TO QUALIFY</span>
          <div className="vhv-person">
            <Avatar />
            <span><strong>Maya Chen</strong><small>VP Revenue · Fieldwork</small></span>
          </div>
        </div>
      </div>
    </>
  )
}

function QualifyScene() {
  const rows = [
    ['The right role', 'Leads the revenue team'],
    ['The right company', 'B2B software · growing sales team'],
    ['A possible need', 'Building outbound capacity'],
  ]
  return (
    <>
      <Source eyebrow="THE RIGHT PEOPLE, FOR YOUR BUSINESS">A signal is a start.<br />Fit comes next.</Source>
      <Thread />
      <div className="vhv-scene-content" role="img" aria-label="Maya Chen is a high ICP fit: the right role, the right company and a possible need. Wrong roles and wrong companies are skipped.">
        <div className="vhv-dossier vhv-surface vhv-reveal" style={{ '--i': 0 }}>
          <div className="vhv-person">
            <Avatar />
            <span><strong>Maya Chen</strong><small>VP Revenue · Fieldwork</small></span>
          </div>
          <span className="vhv-fit-tag"><Check />High ICP-Fit</span>
        </div>
        <div className="vhv-decision vhv-fit-stack vhv-surface vhv-reveal" style={{ '--i': 1 }}>
          <span className="vhv-decision-label"><Check />WHY SHE FITS</span>
          {rows.map(([k, v]) => (
            <div key={k} className="vhv-decision-row"><small>{k}</small><strong>{v}</strong></div>
          ))}
        </div>
        <div className="vhv-decision vhv-skip-stack vhv-surface vhv-reveal" style={{ '--i': 2 }}>
          <span className="vhv-decision-label">SKIP</span>
          <div className="vhv-skip-item"><span>×</span>Wrong role</div>
          <div className="vhv-skip-item"><span>×</span>Wrong company</div>
          <p>Engagement alone is not enough.</p>
        </div>
      </div>
    </>
  )
}

function ResearchScene() {
  const sources = ['News & press', 'Podcasts', 'LinkedIn & X', 'YouTube', 'Interviews', 'Newsletters']
  return (
    <>
      <Source eyebrow="CONTEXT FROM ACROSS THE WEB">Know what matters<br />to each person.</Source>
      <Thread />
      <div className="vhv-scene-content" role="img" aria-label="Sources across the web, such as news, podcasts, LinkedIn and X, YouTube, interviews and newsletters, feed one research brief.">
        <svg className="vhv-research-lines" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
          <path d="M70 25 160 150M65 72 160 150M70 120 160 150M60 168 160 150M70 215 160 150M65 260 160 150" />
        </svg>
        <div className="vhv-orbit-sources">
          {sources.map((s, i) => (
            // measured delays .18/.215/.25/.285/.32/.355s => --i steps of .5
            <span key={s} className={`vhv-source-tile vhv-orbit-${i} vhv-surface vhv-reveal`} style={{ '--i': i * 0.5 }}>
              <DocIcon />{s}
            </span>
          ))}
        </div>
        <div className="vhv-brief vhv-surface vhv-reveal" style={{ '--i': 3 }}>
          <div className="vhv-brief-head"><ValleyMark size={18} /><span>RESEARCH BRIEF</span></div>
          <span className="vhv-mini-label">MAYA CHEN · FIELDWORK</span>
          <h3>Know the reason.<br />Make it relevant.</h3>
          <div className="vhv-brief-finding"><small>Company careers page</small><p>Hiring AEs to grow the revenue team.</p></div>
          <div className="vhv-brief-finding"><small>Leadership posts</small><p>Building a repeatable outbound motion.</p></div>
          <div className="vhv-brief-angle">Give new reps a researched starting point.</div>
        </div>
      </div>
    </>
  )
}

function WriteScene() {
  return (
    <>
      <Source eyebrow="RESEARCH, WRITTEN IN YOUR VOICE">Your words.<br />Their context.</Source>
      <Thread />
      <div className="vhv-card vhv-write vhv-surface" role="img" aria-label="An email to Maya Chen written in your voice with context from research, ready for your review.">
        <div className="vhv-voice-outside">
          <span>YOUR VOICE</span>
          <strong>“saw”</strong>
          <strong>“want a few”</strong>
          <strong>“your phrasing”</strong>
        </div>
        <div className="vhv-card-head">
          <span><ValleyMark size={19} />Written with context.</span>
        </div>
        <div className="vhv-write-recipient">
          <span className="vhv-to">To</span>
          <div className="vhv-person vhv-person-compact">
            <Avatar />
            <span><strong>Maya Chen</strong><small>VP Revenue · Fieldwork</small></span>
          </div>
          <MailIcon size={15} />
        </div>
        <div className="vhv-message">
          <p>Maya, <span className="vhv-word">saw</span> Fieldwork is <span className="vhv-context">hiring AEs.</span></p>
          <p>Valley finds prospects and drafts outreach from real research. A useful head start for your new reps.</p>
          <p><span className="vhv-word">Want a few</span> examples for Fieldwork?</p>
        </div>
        <div className="vhv-card-foot">
          <span><Check />Ready for your review</span>
          <span>Review draft<ArrowRight /></span>
        </div>
      </div>
    </>
  )
}

function SendScene() {
  // Verbatim structure from the saved live page.
  return (
    <>
      <Source eyebrow="LINKEDIN AND EMAIL, TOGETHER">One conversation.<br />Across both channels.</Source>
      <Thread />
      <div className="vhv-scene-content vhv-send" role="img" aria-label="Example multichannel sequence: a LinkedIn connection request, your chosen wait, then a LinkedIn message if accepted or an email if not accepted. Replies stop the sequence.">
        <div className="vhv-sequence">
          <div className="vhv-sequence-start vhv-surface vhv-reveal">
            <ChatIcon size={15} />
            <span><small>LINKEDIN</small><strong>Connection request</strong></span>
            <Avatar className="vhv-sequence-person" />
          </div>
          <div className="vhv-sequence-wait"><span /><small>Wait · your timing</small><span /></div>
          <div className="vhv-branch-labels"><span>Accepted</span><span>Not accepted</span></div>
          <div className="vhv-branches">
            <svg className="vhv-branch-line" viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true">
              <path d="M150 0v10H72v20M150 10h78v20" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            <div className="vhv-channel vhv-surface vhv-reveal" style={{ '--i': 1 }}>
              <ChatIcon size={24} />
              <strong>LinkedIn message</strong>
              <span>Continue where you connected.</span>
            </div>
            <div className="vhv-channel vhv-surface vhv-reveal" style={{ '--i': 2 }}>
              <MailIcon size={24} />
              <strong>Email</strong>
              <span>Reach out in their inbox.</span>
            </div>
          </div>
          <div className="vhv-reply-line">
            <Check size={13} />
            <span>A reply stops the sequence.<br />You pick up the conversation.</span>
          </div>
        </div>
      </div>
    </>
  )
}

const SCENE_BODIES = [FindScene, QualifyScene, ResearchScene, WriteScene, SendScene]

/* ---------- hero visual (autoplay) ---------- */
function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

function HeroVisual({ scene, setScene }) {
  const rootRef = useRef(null)
  const tabRefs = useRef([])
  const reduced = useReducedMotion()
  const [playing, setPlaying] = useState(!reduced)
  const elapsed = useRef(0)
  const inView = useRef(false)

  const setProgress = (p) => rootRef.current?.style.setProperty('--vhv-progress', String(p))

  useEffect(() => {
    if (reduced) setPlaying(false)
  }, [reduced])

  // Runs only while the visual intersects (IO threshold 0), the tab is visible and
  // reduced motion is off. rAF accumulates elapsed time; progress = elapsed / 5000 (linear).
  useEffect(() => {
    const el = rootRef.current
    const io = new IntersectionObserver(([e]) => { inView.current = e.isIntersecting }, { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!playing || reduced) return
    let raf
    let last = performance.now()
    const tick = (now) => {
      const dt = now - last
      last = now
      if (inView.current && document.visibilityState === 'visible') {
        elapsed.current += dt
        if (elapsed.current >= SCENE_MS) {
          // carry the overshoot like live (measured switch interval 4999-5000ms, not 5000+frame)
          elapsed.current -= SCENE_MS
          if (elapsed.current >= SCENE_MS) elapsed.current = 0 // e.g. a long frame gap after a background tab
          setProgress(elapsed.current / SCENE_MS)
          setScene((s) => (s + 1) % SCENES.length)
        } else {
          setProgress(elapsed.current / SCENE_MS)
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, reduced, setScene])

  // Clicking a tab (or arrow keys / Home / End) jumps to that scene and stops autoplay.
  const goTo = useCallback((i, focus) => {
    elapsed.current = 0
    setProgress(0)
    setPlaying(false)
    setScene(i)
    if (focus) tabRefs.current[i]?.focus()
  }, [setScene])

  const onTabKey = (e) => {
    const n = SCENES.length
    const map = { ArrowRight: (scene + 1) % n, ArrowLeft: (scene - 1 + n) % n, Home: 0, End: n - 1 }
    if (e.key in map) {
      e.preventDefault()
      goTo(map[e.key], true)
    }
  }

  const current = SCENES[scene]
  const Body = SCENE_BODIES[scene]

  return (
    <div
      ref={rootRef}
      className="valley-hero-visual"
      role="region"
      aria-label="How Valley takes outbound from finding people to starting conversations"
      data-scene={current.id}
      data-scene-index={scene}
      data-playing={String(playing)}
      data-static="false"
      data-reduced={String(reduced)}
      // Site semantics: [data-motion=false] disables the scene-enter keyframes.
      data-motion="true"
      style={{
        fontFamily: '"Valley Hero Montreal", sans-serif',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 400,
        letterSpacing: '0em',
        lineHeight: 'normal',
        height: '100%',
        width: '100%',
        '--vhv-accent': 'rgb(65, 111, 145)',
        '--vhv-art': `url("${current.art}")`,
      }}
    >
      <img className="vhv-art" src={current.art} alt="" loading="eager" fetchpriority="high" width="1200" height="600" />
      <div className="vhv-light" aria-hidden="true" />
      {/* key remounts the scene so the .vhv-card / .vhv-reveal enter keyframes replay */}
      <div
        key={current.id}
        className="vhv-scene"
        role="tabpanel"
        id={`vhv-panel-${scene}`}
        aria-labelledby={`vhv-tab-${scene}`}
        tabIndex={0}
      >
        <Body />
      </div>
      <div className="vhv-controls">
        <div className="vhv-tabs" role="tablist" aria-label="Outbound workflow" onKeyDown={onTabKey}>
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => (tabRefs.current[i] = el)}
              id={`vhv-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === scene}
              aria-controls={`vhv-panel-${i}`}
              tabIndex={i === scene ? 0 : -1}
              onClick={() => goTo(i, false)}
            >
              <span>{s.label}</span>
              <i className="vhv-tab-track"><i /></i>
            </button>
          ))}
        </div>
        <button
          className="vhv-play"
          type="button"
          aria-label={playing ? 'Pause automatic scenes' : 'Play automatic scenes'}
          onClick={() => !reduced && setPlaying((p) => !p)}
        >
          {playing ? (
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 4v12M13 4v12" strokeWidth="2" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m7 4 8 6-8 6z" fill="currentColor" stroke="none" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

/* ---------- proof quote, follows the scene index ---------- */
function HeroProof({ scene }) {
  return (
    <aside
      className="valley-hero-proof"
      data-proof-step={scene}
      aria-label="Customer stories"
      style={{ fontFamily: '"Valley Proof Montreal", Arial, sans-serif', fontSize: 16, fontWeight: 400, lineHeight: 'normal', maxWidth: '100%', width: '100%', position: 'relative' }}
    >
      {STORIES.map((s, i) => {
        const active = i === scene
        return (
          <a
            key={s.name}
            className="vhp-story"
            href={s.href}
            data-active={String(active)}
            aria-hidden={!active}
            tabIndex={active ? 0 : -1}
            aria-label={`${s.name} at ${s.company}, read their customer story`}
          >
            <img className="vhp-person" src={s.avatar} alt="" width="56" height="56" />
            <figure>
              <blockquote>{s.quote}</blockquote>
              <figcaption>
                <span className="vhp-byline"><strong>{s.name}</strong><span>{s.role}</span></span>
              </figcaption>
            </figure>
          </a>
        )
      })}
    </aside>
  )
}

// variant: 'home' (default, "Variant 1") or 'product' ("Variant 2", /product): same structure,
// visual and proof strip; only the copy block differs (spec/pages/product.md section 2).
// The tablet/phone copy of the Variant 2 h1 says "lead-gen" (tablet also breaks after "for");
// the three strings are rendered and toggled by breakpoint in hero.css, the way Framer ships
// breakpoint variants.
export default function Hero({ variant = 'home' }) {
  const [scene, setScene] = useState(0)
  const v2 = variant === 'product'
  return (
    <section id="hero" className={v2 ? 'hero hero--v2' : 'hero'}>
      <div className="hero-row">
        <div className="hero-copy">
          <div className="hero-heading">
            <p className="hero-eyebrow">For founders, sales teams and agencies</p>
            {v2 ? (
              <h1 className="hero-title">
                <span className="hero-v2-desktop">
                  The complete outbound system for B2B sales teams and lead generation agencies
                </span>
                <span className="hero-v2-tablet">
                  The complete outbound system for <br />
                  B2B sales teams and lead-gen agencies
                </span>
                <span className="hero-v2-mobile">The complete outbound system for B2B sales teams and lead-gen agencies</span>
              </h1>
            ) : (
              <h1 className="hero-title">
                Unbelievably good outbound.{' '}
                {/* Tablet/Phone variants break after "outbound." (390 screenshot, 768/1024 line counts) */}
                <br className="hero-title-br" />
                To people who actually want it.
              </h1>
            )}
          </div>
          <div className="hero-explain">
            <p className="hero-sub">
              {v2 ? (
                'Find, qualify, research, and personalize in a single platform and automate outreach to book more calls and generate more pipeline.'
              ) : (
                <>
                  Valley finds the right prospects, researches what matters to them, crafts relevant messaging, and sends
                  outreach in your voice across email &amp; socials in under 5 minutes.
                </>
              )}
            </p>
            <div className="hero-start">
              <div className="hero-buttons">
                {/* hover: Framer spring {bounce:.2,duration:.4} as a linear() transition in hero.css */}
                <a className="hero-btn hero-btn--primary" href={SIGNUP}>
                  <span>Start for free</span>
                </a>
                <a className="hero-btn hero-btn--secondary" href={DEMO}>
                  <span>Book a demo</span>
                </a>
              </div>
              <HeroProof scene={scene} />
            </div>
          </div>
        </div>
        <div className="hero-visual-slot">
          <HeroVisual scene={scene} setScene={setScene} />
        </div>
      </div>
    </section>
  )
}
