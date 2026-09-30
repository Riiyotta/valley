import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import '../styles/endorsement.css'

// CLONE_SPEC.md section 11 (endorsement) + section 20 rows 7-8.
// Markup mirrors the live `section.valley-endorsement` from the saved page.

const QUOTE =
  'There has been a lot of talk surrounding what works in outbound now. The answer is Valley. Full Stop. Valley is the next generation of outbound.'
const WORDS = QUOTE.split(' ') // N = 26
const N = WORDS.length
const STICKY_TOP = 88

const clamp01 = (v) => Math.min(1, Math.max(0, v))

// Pinned only when the component is wider than 600px, the viewport is at least
// 650px tall and reduced motion is off (spec 11).
function shouldPin(el) {
  if (!el) return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return el.getBoundingClientRect().width > 600 && window.innerHeight >= 650
}

export default function Endorsement() {
  const rootRef = useRef(null)
  const wordRefs = useRef([])
  const [scrollMode, setScrollMode] = useState(false)

  // Decide pinned vs static; re-check on resize and reduced-motion changes.
  useLayoutEffect(() => {
    const el = rootRef.current
    const check = () => setScrollMode(shouldPin(el))
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    window.addEventListener('resize', check)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    mq.addEventListener('change', check)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', check)
      mq.removeEventListener('change', check)
    }
  }, [])

  // Word fill. rAF-throttled scroll handler, active only while the section intersects.
  useEffect(() => {
    const el = rootRef.current
    const words = wordRefs.current
    if (!scrollMode) {
      words.forEach((w) => w && w.style.removeProperty('--fill'))
      el.removeAttribute('data-progress')
      return undefined
    }

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const p = clamp01((STICKY_TOP - rect.top) / Math.max(1, rect.height - window.innerHeight + STICKY_TOP))
      const t = (clamp01((p - 0.04) / 0.73) + 0.04) * N
      for (let i = 0; i < N; i++) {
        if (words[i]) words[i].style.setProperty('--fill', String(clamp01(t - i)))
      }
      el.setAttribute('data-progress', p.toFixed(3))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    let listening = false
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !listening) {
        listening = true
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        onScroll()
      } else if (!e.isIntersecting && listening) {
        listening = false
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
        update() // settle at the final 0 / 1 state when leaving
      }
    })
    io.observe(el)
    update()

    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [scrollMode])

  return (
    <section id="endorsement" className="endorsement" data-framer-name="Jeff Becker — perspective on Valley">
      <section
        ref={rootRef}
        className="valley-endorsement"
        data-scroll={String(scrollMode)}
        aria-label="Jeff Becker on Valley"
        style={{ width: '100%', fontFamily: '"Valley Body Montreal", Arial, sans-serif' }}
      >
        <div className="ve-sticky">
          <img className="ve-art" src="/assets/img/5Elg5B9vPo2Xblz2XfnsvZzgqlA.png" alt="" loading="lazy" />
          <div className="ve-shade" />
          <div className="ve-content">
            <div className="ve-kicker">Jeff Becker on the future of outbound</div>
            <blockquote className="ve-quote" aria-label={QUOTE}>
              <span aria-hidden="true">
                “
                {WORDS.map((w, i) => (
                  <Fragment key={i}>
                    <span className="ve-word" data-word={w} ref={(node) => (wordRefs.current[i] = node)}>
                      {w}
                    </span>
                    {i < N - 1 ? ' ' : null}
                  </Fragment>
                ))}
                ”
              </span>
            </blockquote>
            <div className="ve-author">
              <img src="/assets/img/haYdvzAyBL9mis35W8mYp4ZskM.png" width="48" height="48" alt="Jeff Becker" loading="lazy" />
              <div>
                <strong>Jeff Becker</strong>
                <span>Former Head of Sales, LinkedIn</span>
              </div>
            </div>
          </div>
          <div className="ve-scroll-cue" aria-hidden="true">
            <svg viewBox="0 0 24 28" fill="none">
              <path d="M12 4v18M5 15l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>
    </section>
  )
}
