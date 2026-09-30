import { useCallback, useEffect, useRef, useState } from 'react'
import '../styles/stories.css'

// CLONE_SPEC.md section 10 (stories) + section 20 row 6 (autoplay).
// Markup mirrors the live `section.valley-customer-results` from the saved page.

const SLIDE_MS = 7000
const SIGNUP = 'https://beta.joinvalley.co/signup'

const SLIDES = [
  {
    id: 'bolt',
    tab: 'Bolt.new',
    quote: '“Valley is a cheat code.”',
    name: 'Stefano McCoy',
    role: 'Sales, Bolt.new',
    avatar: '/assets/img/QWtiaR1m3BLU5A064IdsPPe2Es.png',
    href: '/casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days',
    metric: '$1M+',
    caption: 'Pipeline generated in the first 60 days.',
    support: [
      ['15–20', 'Enterprise meetings booked'],
      ['3 hrs', 'Saved per rep daily'],
    ],
  },
  {
    id: 'ggwp',
    tab: 'GGWP',
    quote: '“I can do an afternoon of prospecting in about 20 minutes tops.”',
    name: "Tim O'Neil",
    role: 'Sales Leader, GGWP',
    avatar: '/assets/img/rnMa9immzygrPgvq8OXo5QCGAk.jpeg',
    href: '/casestudies/how-ggwp-generated-4m-in-pipeline-with-valley',
    metric: '$4M',
    caption: 'Pipeline generated within a quarter.',
    support: [
      ['30–40', 'Meetings with decision makers'],
      ['20–30%', 'Response rate'],
    ],
  },
  {
    id: 'linarca',
    tab: 'Linarca',
    quote: '“I know that quality is always going to be high, consistency is always going to be there.”',
    name: 'Roberto Arrieta',
    role: 'Founder, Linarca',
    avatar: '/assets/img/OsA3bcBEflELOPp9sIw8e2c0xY.png',
    href: '/casestudies/how-linarca-booked-14-qualified-meetings-in-their-first-month-with-valley',
    metric: '14',
    caption: 'Meetings booked in the first month.',
    support: [
      ['20–22%', 'Reply rate during active training'],
      ['1–2 hrs', 'To the first positive response'],
    ],
  },
  {
    id: 'thinkfish',
    tab: 'ThinkFish',
    quote: '“Valley really does get to avoid all the noise.”',
    name: 'Freizle Abarrientos',
    role: 'Chief Operating Officer, ThinkFish',
    avatar: '/assets/img/sfCZQKIFk9u4tjQgtSzASSggZU.jpeg',
    href: '/casestudies/how-thinkfish-books-380-400-meetings-monthly-with-valley',
    metric: '400',
    caption: 'Meetings booked monthly across 50 seats.',
    support: [
      ['50', 'Valley seats'],
      ['2', 'Team members managing those seats'],
    ],
  },
]

const N = SLIDES.length
const pad2 = (n) => String(n).padStart(2, '0')

function ArrowIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 10h13m-5-5 5 5-5 5" />
    </svg>
  )
}

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

// Variant props (defaults = homepage): showHeader renders the h2/sub block; frameClassName is
// appended to the outer Framer layer so a page can restyle its wrapper (padding, border).
// /pricing and /product render the carousel without the header (spec/pages/pricing.md 1).
export default function Stories({ showHeader = true, frameClassName = '' }) {
  const rootRef = useRef(null)
  const tabRefs = useRef([])
  const elapsedRef = useRef(0)
  const [active, setActive] = useState(0)
  const [requestedPlaying, setRequestedPlaying] = useState(true)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === 'undefined' || document.visibilityState === 'visible',
  )
  const reduced = useReducedMotion()
  const playing = requestedPlaying && inView && pageVisible && !reduced

  const setProgress = (v) => {
    if (rootRef.current) rootRef.current.style.setProperty('--vcr-progress', String(v))
  }

  // Autoplay runs only while the carousel intersects (threshold 0) and the tab is visible.
  useEffect(() => {
    const el = rootRef.current
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    const onVis = () => setPageVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  // rAF accumulates elapsed time; --vcr-progress = elapsed / 7000 (linear).
  useEffect(() => {
    if (!playing) return undefined
    let raf = 0
    let last = performance.now()
    const tick = (now) => {
      elapsedRef.current += Math.max(0, now - last)
      last = now
      if (elapsedRef.current >= SLIDE_MS) {
        // carry the overshoot like live (measured slide interval 7000ms, not 7000+frame)
        elapsedRef.current -= SLIDE_MS
        if (elapsedRef.current >= SLIDE_MS) elapsedRef.current = 0 // e.g. a long frame gap after a background tab
        setProgress(elapsedRef.current / SLIDE_MS)
        setActive((i) => (i + 1) % N)
      } else {
        setProgress(elapsedRef.current / SLIDE_MS)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  // Tabs and arrows reset progress; autoplay continues unless Pause was pressed.
  const goTo = useCallback((i) => {
    elapsedRef.current = 0
    setProgress(0)
    setActive(((i % N) + N) % N)
  }, [])

  const onTabKey = (e) => {
    let next = null
    if (e.key === 'ArrowRight') next = (active + 1) % N
    else if (e.key === 'ArrowLeft') next = (active - 1 + N) % N
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = N - 1
    if (next === null) return
    e.preventDefault()
    goTo(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section
      id="stories"
      className={frameClassName ? `stories ${frameClassName}` : 'stories'}
      data-framer-name="Customer results — rotating stories"
    >
      <div className="stories-container">
        {showHeader && (
          <div className="stories-header">
            <h2 className="stories-title">The only platform you need to run exceptional outbound.</h2>
            <p className="stories-sub">
              Valley finds relevant buyers, researches each person, and runs outreach in your voice across LinkedIn and email.
            </p>
          </div>
        )}
        <div className="stories-carousel-container">
          <section
            ref={rootRef}
            className="valley-customer-results"
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer results with Valley"
            data-case={SLIDES[active].id}
            data-playing={String(playing)}
            data-requested-playing={String(requestedPlaying)}
            data-static={String(reduced)}
            data-reduced={String(reduced)}
            style={{
              fontFamily: '"Valley Results Montreal", sans-serif',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: 400,
              letterSpacing: '0em',
              lineHeight: 'normal',
              maxWidth: '100%',
              width: '100%',
              position: 'relative',
              height: 'auto',
              minWidth: 0,
            }}
          >
            <div className="vcr-slides" aria-live="off" aria-atomic="false">
              {SLIDES.map((s, i) => {
                const on = i === active
                return (
                  <article
                    key={s.id}
                    className="vcr-slide"
                    data-active={String(on)}
                    data-slide={s.id}
                    role="tabpanel"
                    id={`vcr-panel-${i}`}
                    aria-labelledby={`vcr-tab-${i}`}
                    aria-hidden={!on}
                  >
                    <div className="vcr-quote-column">
                      <blockquote className="vcr-quote">{s.quote}</blockquote>
                      <div className="vcr-attribution">
                        <img src={s.avatar} width="44" height="44" alt={s.name} decoding="async" />
                        <div>
                          <strong>{s.name}</strong>
                          <span>{s.role}</span>
                        </div>
                      </div>
                      <a className="vcr-story" href={s.href} tabIndex={on ? 0 : -1}>
                        Read {s.tab}’s story <ArrowIcon />
                      </a>
                      <a className="vcr-signup" href={SIGNUP} tabIndex={on ? 0 : -1}>
                        Start for free <ArrowIcon />
                      </a>
                    </div>
                    <div className="vcr-outcomes">
                      <span className="vcr-case-label">{s.tab}, WITH VALLEY</span>
                      <div className="vcr-main-metric">
                        <strong>{s.metric}</strong>
                        <p>{s.caption}</p>
                      </div>
                      <div className="vcr-support">
                        {s.support.map(([v, l]) => (
                          <div key={l}>
                            <strong>{v}</strong>
                            <span>{l}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
            <div className="vcr-controls">
              <div className="vcr-tabs" role="tablist" aria-label="Choose a customer story" onKeyDown={onTabKey}>
                {SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    ref={(el) => (tabRefs.current[i] = el)}
                    type="button"
                    role="tab"
                    id={`vcr-tab-${i}`}
                    aria-controls={`vcr-panel-${i}`}
                    aria-selected={i === active}
                    tabIndex={i === active ? 0 : -1}
                    onClick={() => goTo(i)}
                  >
                    <span>{s.tab}</span>
                    <span className="vcr-tab-track" aria-hidden="true">
                      <i />
                    </span>
                  </button>
                ))}
              </div>
              <div className="vcr-playback">
                <button
                  type="button"
                  className="vcr-play"
                  aria-label={requestedPlaying ? 'Pause customer stories' : 'Play customer stories'}
                  aria-pressed={requestedPlaying}
                  onClick={() => setRequestedPlaying((p) => !p)}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {/* Both paths captured from the live DOM. */}
                    <path d={requestedPlaying ? 'M5.5 3.5v9m5-9v9' : 'm5 3 7 5-7 5z'} />
                  </svg>
                  <span>{requestedPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <span className="vcr-count" aria-hidden="true">
                  {pad2(active + 1)} / {pad2(N)}
                </span>
                <button type="button" className="vcr-arrow" aria-label="Previous customer story" onClick={() => goTo(active - 1)}>
                  <ArrowIcon style={{ transform: 'rotate(180deg)' }} />
                </button>
                <button type="button" className="vcr-arrow" aria-label="Next customer story" onClick={() => goTo(active + 1)}>
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
