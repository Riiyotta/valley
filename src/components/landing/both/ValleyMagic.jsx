import { useEffect, useRef, useState } from 'react'
import '../../../styles/pages/landing/both/valley-magic.css'
import CtaButton from './CtaButton.jsx'
import { SIGNUP_URL } from './links.js'
import { CELLS, OVERLAYS, WEEKDAYS } from './valleyMagicData.js'

// "Valley magic Section" -> "50% Magic" (spec 5.3, motion M5). Desktop only (>= 1200).
// The slider autoplays once the block is in view: 4 stops (0, 1/4 … full fill), one move every
// ~1.52s, a hold at the last stop, then a spring back to the start; the whole cycle is ~6.07s.
// Each move reveals that stop's calendar labels by fading their "hider" 1 -> 0 over 500ms
// cubic-bezier(.64,.02,.31,1.01); on reset every hider fades back in.

// Cycle timing (ms from the reset), from states/probe2.json -> magic.
const STOP_AT = [1510, 3030, 4560]
const CYCLE = 6070
const FIRST_RESET = 30 // first move lands ~1.54s after the section comes into view

// Knob left edge at each stop as a fraction of the 446px track (x = 179/298/418/519 at 1440).
const KNOB = [71 / 446, 190 / 446, 310 / 446, 411 / 446]

// Knob asterisk and calendar chevrons: the live SVGs (ASSETS_GAPFILL 3). The asterisk is a
// background image on live; the chevrons are mask images over a #252525 fill.
function Asterisk() {
  return <img className="vm-knob__mark" src="/assets/pages/landing/svg/knob-asterisk.svg" alt="" aria-hidden="true" />
}

function Chevron({ dir }) {
  return <span className={`vm-cal__arrow vm-cal__arrow--${dir === 'left' ? 'prev' : 'next'}`} aria-hidden="true" />
}

export default function ValleyMagic() {
  const rootRef = useRef(null)
  const [stop, setStop] = useState(0)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return undefined
    const timers = []
    let started = false

    const runCycle = (resetAt) => {
      timers.push(setTimeout(() => setStop(0), resetAt))
      STOP_AT.forEach((t, i) => timers.push(setTimeout(() => setStop(i + 1), resetAt + t)))
      timers.push(setTimeout(() => runCycle(0), resetAt + CYCLE))
    }

    const io = new IntersectionObserver((entries) => {
      if (started || !entries.some((e) => e.isIntersecting)) return
      started = true
      io.disconnect()
      runCycle(FIRST_RESET)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <section id="valley-magic" className="vm" aria-label="See how Valley fills your calendar">
      <div className="vm-frame" ref={rootRef} data-stop={stop}>
        <img
          className="vm-bg"
          src="/assets/pages/landing/img/3MqHudIBy1ZEIFJXaNZZ7UPNreE.png"
          alt=""
          aria-hidden="true"
        />

        <div className="vm-left">
          <div className="vm-heading">
            <span className="lx-label vm-label">VALLEY MAGIC</span>
            <p className="vm-title" data-lp-appear="20" data-lp-appear-delay="0.2" data-lp-appear-amount="0.5">See how Valley fills your calendar</p>
          </div>

          <div className="vm-slider-block" data-lp-appear="20" data-lp-appear-delay="0.2" data-lp-appear-amount="0.5">
            <p className="vm-kicker">Outreach sent with valley</p>
            <div className="vm-slider" aria-hidden="true">
              <div className="vm-slider__line" />
              <div className="vm-slider__fill" style={{ width: `${((stop + 1) / 4) * 100}%` }}>
                <img src="/assets/pages/landing/img/cyqCnH73kdkUeeoIFSQCM01Qcs.png" alt="" />
              </div>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="vm-slider__dot"
                  data-on={stop > i ? '' : undefined}
                  style={{ left: `calc(${(i + 1) * 25}% - 8px)` }}
                />
              ))}
              <div className="vm-knob" style={{ left: `${KNOB[stop] * 100}%` }}>
                <span className="vm-knob__glow vm-knob__glow--outer" />
                <span className="vm-knob__glow vm-knob__glow--inner" />
                <span className="vm-knob__frame">
                  <span className="vm-knob__tile">
                    <Asterisk />
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="vm-bottom" data-lp-appear="20" data-lp-appear-delay="0.2" data-lp-appear-amount="0.5">
            <p className="vm-note">
              Most other LinkedIn automation tools gets 2-5% response rates - Valley triples that
              instantly
            </p>
            <CtaButton href={SIGNUP_URL} label="Start for free" tone="light" />
          </div>
        </div>

        <div className="vm-cal" aria-hidden="true">
          <div className="vm-cal__head">
            <p className="vm-cal__month">
              July <span>2025</span>
            </p>
            <div className="vm-cal__arrows">
              <span className="vm-cal__arrowbox">
                <Chevron dir="left" />
              </span>
              <span className="vm-cal__arrowbox">
                <Chevron dir="right" />
              </span>
            </div>
          </div>
          <div className="vm-cal__weekdays">
            {WEEKDAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="vm-cal__grid">
            {CELLS.map((cell, i) => (
              <div className="vm-cell" key={i}>
                <p className="vm-cell__day" data-muted={cell.muted ? '' : undefined}>
                  {cell.day}
                </p>
                <div className="vm-cell__stack">
                  {cell.labels.map(([text, bg, overlay]) => (
                    <div className="vm-event" key={text + bg} style={{ background: bg }}>
                      <img src={OVERLAYS[overlay]} alt="" />
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
                {cell.labels.map(([text, , , revealAt], j) => (
                  <span
                    key={`h${j}`}
                    className="vm-hider"
                    style={{
                      top: 26 + j * 22,
                      opacity: revealAt !== null && stop >= revealAt ? 0 : 1,
                    }}
                    data-label={text}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
