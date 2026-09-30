import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import '../styles/jobs.css'

// CLONE_SPEC.md section 13 (jobs) + section 19 (jobs states) + section 20 row 10.
// Markup mirrors the live `section.vstack` from the saved page.

const SIGNUP = 'https://beta.joinvalley.co/signup'
const STICKY_TOP = 88

const ListIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2c6478" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
    <path d="M10 6h10M10 12h10M10 18h10" />
    <circle cx="4" cy="6" r="1" />
    <circle cx="4" cy="12" r="1" />
    <circle cx="4" cy="18" r="1" />
  </svg>
)

const PersonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2c6478" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
  </svg>
)

const fav = (file) => `/assets/favicons/${file}`

const GROUPS = [
  {
    title: 'Discover',
    jobs: [
      { label: 'List building', vendor: 'Sales Navigator', icon: <ListIcon /> },
      { label: 'Profile viewers', vendor: 'LinkedIn Premium', icon: <PersonIcon /> },
      { label: 'Post engagement', vendor: 'Trigify', img: fav('trigify.io.png') },
      { label: 'Company signals', vendor: 'Common Room', img: fav('commonroom.io.png') },
    ],
  },
  {
    title: 'Understand',
    jobs: [
      { label: 'ICP scoring', vendor: 'Clay', img: fav('clay.com.png') },
      { label: 'Qualification', vendor: 'Clay', img: fav('clay.com.png') },
      { label: 'Contact enrichment', vendor: 'Apollo', img: fav('apollo.io.png') },
      { label: 'Prospect research', vendor: 'Perplexity', img: fav('perplexity.ai.png') },
    ],
  },
  {
    title: 'Reach out',
    jobs: [
      { label: 'Your writing style', vendor: 'Lavender', img: fav('lavender.ai.png') },
      { label: 'Personalized messages', vendor: 'Lavender', img: fav('lavender.ai.png') },
      { label: 'LinkedIn sequences', vendor: 'HeyReach', img: fav('heyreach.io.jpg') },
      { label: 'Email sequences', vendor: 'Instantly', img: fav('instantly.ai.png') },
    ],
  },
  {
    title: 'Improve',
    jobs: [
      { label: 'Follow-ups', vendor: 'lemlist', img: fav('lemlist.com.png') },
      { label: 'Reply management', vendor: 'HeyReach', img: fav('heyreach.io.jpg') },
      { label: 'Campaign analytics', vendor: 'HubSpot', img: fav('hubspot.com.png') },
      { label: 'Continuous learning', vendor: 'Your team’s analysis' },
    ],
  },
]

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const ACV_MAX = 10000000

export default function Jobs() {
  const rootRef = useRef(null)
  const countRef = useRef(null)
  const [motion, setMotion] = useState(false)
  const [quarterly, setQuarterly] = useState(false)
  const [acv, setAcv] = useState('10000')

  // Pinned mode: component wider than 760px, viewport >= 720px tall, no reduced motion.
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const evaluate = () => {
      const el = rootRef.current
      if (!el) return
      setMotion(el.getBoundingClientRect().width > 760 && window.innerHeight >= 720 && !reduce.matches)
    }
    evaluate()
    window.addEventListener('resize', evaluate)
    reduce.addEventListener('change', evaluate)
    return () => {
      window.removeEventListener('resize', evaluate)
      reduce.removeEventListener('change', evaluate)
    }
  }, [])

  const tiles = () => rootRef.current?.querySelectorAll('.vstack-job') ?? []

  // Scroll-driven fill (spec 13 "Scroll logic"). Written straight to the DOM each frame.
  const update = useCallback(() => {
    const el = rootRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = clamp01((STICKY_TOP - rect.top) / Math.max(1, rect.height - window.innerHeight + STICKY_TOP))
    const a = clamp01((p - 0.05) / 0.76)
    el.style.setProperty('--progress', String(a))
    el.dataset.progress = a.toFixed(3)
    tiles().forEach((tile, i) => {
      const fill = clamp01(a * 17 - i)
      tile.style.setProperty('--fill', String(fill))
      tile.dataset.filled = String(fill > 0.65)
    })
    if (countRef.current) countRef.current.textContent = String(Math.min(16, Math.floor(a * 17)))
  }, [])

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    if (!motion) {
      // Static: everything filled. The live component writes --fill: 1 inline on each tile.
      el.style.removeProperty('--progress')
      delete el.dataset.progress
      tiles().forEach((tile) => {
        tile.style.setProperty('--fill', '1')
        tile.dataset.filled = 'true'
      })
      if (countRef.current) countRef.current.textContent = '16'
      return
    }
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        update()
      })
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [motion, update])

  const acvNumber = Math.min(ACV_MAX, Math.max(0, Number(acv) || 0))
  const pipeline = `$${(8 * acvNumber).toLocaleString('en-US')}–$${(10 * acvNumber).toLocaleString('en-US')}`

  return (
    <section id="jobs" className="jobs-wrap">
      <section
        ref={rootRef}
        className="vstack"
        data-motion={motion ? 'true' : 'false'}
        aria-label="Your outbound stack, together in Valley"
        style={{
          width: '100%',
          fontFamily: 'ValleyStack, Arial, sans-serif',
          fontSize: 16,
          fontStyle: 'normal',
          fontWeight: 400,
          letterSpacing: '0em',
          lineHeight: 1.2,
        }}
      >
        <div className="vstack-stage">
          <img className="vstack-art" src="/assets/img/5Elg5B9vPo2Xblz2XfnsvZzgqlA.png" alt="" loading="lazy" />
          <div className="vstack-inner">
            <header className="vstack-top">
              <div>
                <p className="vstack-kicker">Less stack. More outbound.</p>
                <h2>
                  All these jobs.
                  <br />
                  One connected platform.
                </h2>
                <p className="vstack-lead">From the first signal to the next reply. Bring the work together in Valley.</p>
              </div>
            </header>
            <div className="vstack-body">
              <div className="vstack-map">
                {GROUPS.map((group, g) => (
                  <div className="vstack-group" key={group.title}>
                    <div className="vstack-group-title">
                      {group.title}
                      <span>0{g + 1}</span>
                    </div>
                    {group.jobs.map((job) => (
                      <div className="vstack-job" key={job.label}>
                        <span className="vstack-check" aria-hidden="true">
                          ✓
                        </span>
                        <span className="vstack-job-copy">
                          <span className="vstack-job-label">{job.label}</span>
                          <small className="vstack-vendor">
                            {job.icon}
                            {job.img && <img src={job.img} alt="" width="12" height="12" loading="lazy" />}
                            {job.vendor}
                          </small>
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <aside className="vstack-platform" aria-label="Estimate your potential pipeline">
                <div>
                  <div className="vstack-brand">
                    <strong>
                      <svg width="30" height="30" viewBox="0 0 48 48" aria-hidden="true">
                        <path
                          d="M8 8l12 12M40 8L28 20M4 24h14m12 0h14M24 44V29M9 40l15-15 15 15"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="5"
                        />
                      </svg>
                      Valley
                    </strong>
                    <span className="vstack-badge">One platform</span>
                  </div>
                  <div className="vstack-price">
                    <strong>{quarterly ? '$149' : '$199'}</strong>
                    <span>/ seat / month</span>
                  </div>
                  <p className="vstack-plan">
                    Starter · The outbound platform
                    <br />
                    Email, priority support, and onboarding are optional.
                  </p>
                  <div className="vstack-toggle">
                    <button type="button" aria-pressed={!quarterly} onClick={() => setQuarterly(false)}>
                      Monthly
                    </button>
                    <button type="button" aria-pressed={quarterly} onClick={() => setQuarterly(true)}>
                      Quarterly · $447
                    </button>
                  </div>
                </div>
                <div className="vstack-cost">
                  <label>
                    What is your average contract value?
                    <span className="vstack-input">
                      <span>$</span>
                      <input
                        aria-label="Average contract value"
                        type="number"
                        min="0"
                        max={ACV_MAX}
                        value={acv}
                        onChange={(e) => setAcv(e.target.value)}
                        onBlur={() => setAcv(String(acvNumber))}
                      />
                    </span>
                  </label>
                  <div className="vstack-projection" aria-live="polite">
                    <span>Potential pipeline from Valley / month</span>
                    <strong>{pipeline}</strong>
                    <p>
                      Based on 8–10 estimated meetings/month per seat × your contract value. Assumes each meeting becomes an
                      opportunity; not closed revenue.
                    </p>
                  </div>
                  <a className="vstack-trial" href={SIGNUP}>
                    Start free trial <span aria-hidden="true">→</span>
                  </a>
                </div>
              </aside>
            </div>
            <div className="vstack-bottom">
              <div className="vstack-status">
                <b>
                  <span className="vstack-count" ref={countRef} /> / 16 jobs connected.
                </b>{' '}
                One shared context.
              </div>
              <a className="vstack-link" href="/pricing">
                Explore the plans ↗
              </a>
            </div>
            <div className="vstack-track" aria-hidden="true">
              <div />
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
