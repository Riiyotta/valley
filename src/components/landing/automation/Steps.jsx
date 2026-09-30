import { Fragment, useEffect, useRef } from 'react'
import '../../../styles/pages/landing/automation/steps.css'
import CtaButton from '../both/CtaButton.jsx'
import { SURFACE_URL } from '../both/links.js'
import useRiveCanvas from './useRiveCanvas.js'

// "Variant 3" (desktop) / "Variant 5" (phone): the 5-step block (spec 6 la-steps; dump [4]).
// The right-hand "Hero" panel is the blue watercolor image plus a <canvas> (594x700 at >=1280,
// 424x500 below) playing artboard "flow" of 2s4AJnvpSsn8LzY6toNdF1nb84.riv: the
// LINKEDIN / WEBSITE / SALES / LEADS -> Valley -> message-card diagram (ASSETS_GAPFILL 1.3).
// Live wraps it in Framer's variant-appear effect (threshold .5, animateOnce false): the Rive
// `play` prop is true only while the section is in view, so it plays once >=50% is visible,
// pauses (no reset) once the section has fully left, resumes on re-entry, and holds its last
// frame when the one-shot state chain ends. Unchanged under prefers-reduced-motion, as live.
// "Book Demo →" has no href on the live page (it is a Surface popup trigger,
// .surface-form-button); here it opens the Surface form URL like the other demo CTAs.
const STEPS = [
  'Identify leads from LinkedIn viewers, followers and post engagers',
  'Deeply research every prospect across 200+ data points',
  'Automatically qualify for ICP fit & prioritize the best leads',
  'Craft messages in your voice automatically',
  'Send at scale, manage replies and keep your profile safe',
]

export default function Steps() {
  const sectionRef = useRef(null)
  const inViewRef = useRef(false)
  const { canvasRef, riveRef } = useRiveCanvas({
    file: '2s4AJnvpSsn8LzY6toNdF1nb84.riv',
    artboard: 'flow',
    autoplay: false,
    onReady: (rive) => {
      if (inViewRef.current) rive.play()
    },
  })

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return undefined
    // Same enter/leave semantics as Framer's inView(amount .5): enter at >=50% visible,
    // leave only when no longer intersecting at all.
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[entries.length - 1]
        if (!inViewRef.current && e.isIntersecting && e.intersectionRatio >= 0.5) {
          inViewRef.current = true
          riveRef.current?.play()
        } else if (inViewRef.current && !e.isIntersecting) {
          inViewRef.current = false
          riveRef.current?.pause()
        }
      },
      { threshold: [0, 0.5] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [riveRef])

  return (
    <section id="la-steps" className="la-steps" ref={sectionRef}>
      <div className="la-steps__main">
        <img
          className="la-steps__bg"
          src="/assets/pages/landing/img/72PrJH6fdiIsbCJzzwnqVIi90Ho.png"
          alt=""
          aria-hidden="true"
        />
        <div className="la-steps__row">
          <div className="la-steps__group">
            <div className="la-steps__head">
              <p className="la-steps__label">timing, relevance and research</p>
              <h3>A top 1% rep working 24/7 on LinkedIn</h3>
            </div>
            <div className="la-steps__list">
              {STEPS.map((text, i) => (
                <Fragment key={text}>
                  {i > 0 && <div className="la-steps__rule" />}
                  <div className="la-steps__item">
                    <p className="la-steps__n">STEP {i + 1}:</p>
                    <p className="la-steps__text">{text}</p>
                  </div>
                </Fragment>
              ))}
            </div>
            <CtaButton href={SURFACE_URL} label="Book Demo →" />
          </div>
          <div className="la-steps__spacer" />
        </div>
      </div>
      <div className="la-steps__panel">
        <img
          src="/assets/pages/landing/img/FDSF0RPQuFvV3vud3xQsDxqIc8.png"
          alt=""
          aria-hidden="true"
        />
        <div className="la-steps__canvas" data-rive-slot="">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </section>
  )
}
