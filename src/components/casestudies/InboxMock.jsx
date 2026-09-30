import { useEffect, useState } from 'react'

// Inbox mock ("Variant 7", spec/pages/casestudy.md 6 and 9). Measured loop on the live page
// (rAF-sampled row counts): 9 -> 10 -> ... -> 16 rows, one step every ~1.015s; after 16 it resets
// to 8 rows (no animation) and ~110ms later adds row 9 again (8.18s per loop). On every step the
// new row appears at the top and the rows below slide from -86px (one row) to 0 over a 0.4s
// tween, ease [.44,0,.21,1]. Runs continuously; reduced motion shows the full list, static.
const T = '/assets/pages/templates/'
// Top-to-bottom order in the 16-row state.
const ROWS = [
  { name: 'Julian Brown', time: '8:20 AM', text: "Julian: Let's connect over a google meet..", img: 'rNzNVtMmcVD8Bbkb0XSy8Fueyo.png', pos: '50% 50%', alt: 'man standing near white wall' },
  { name: 'Michelle Long', time: '3:15 PM', text: "Michelle: Ah, super. Let's talk more.", img: 'yXeeOYxz8W2c4pifD630oEUbIr8.png', pos: '50% 50%', alt: 'woman in white crew neck shirt smiling' },
  { name: 'Micheal Kurt', time: '5:24 AM', text: 'Micheal: Like, this is pretty cool. Okay lets…', img: 'AOv6knwp0gsbQ0DAg3NJpbQ5Clg.png', pos: '50% 0%', alt: 'man in blue crew neck shirt' },
  { name: 'Mike Thompson', time: '5:24 AM', text: "Mike: Let's connect next tuesday", img: 'IQKddGGUVKfESbTRhHhxUrBqwQ.jpg', pos: '50% 50%', alt: "men's gray crew-neck shirt" },
  { name: 'Kanan Gill', time: '5:24 AM', text: 'Kanan: Where are you folks based out of?', img: 'F8ur4MxzltB6kcNMHbY8uVKQbg.jpg', pos: '50% 50%', alt: 'man wearing eyeglasses' },
  { name: 'Alfie Dyes', time: '6:15 PM', text: 'Alfie: Let me send you my cal', img: 'GLRr9uvTdE0X3XmXVEeXLdXHgS8.jpg', pos: '50% 50%', alt: 'man wearing white crew-neck shirt outdoor selective focus photography' },
  { name: 'Mary Kim', time: '5:24 AM', text: "Mary: Let's connect over a follow up call.", img: 'th5MyfiqIwKlQIzoyZCDs5tVlk.png', pos: '50% 0%', alt: 'closeup photography of woman smiling' },
  { name: 'Jack Jones', time: '5:24 AM', text: "Jack: Let's gooo. Let's take it forward.", img: 'MmGrf8ysKLgt7WYL0OdoM7ZbOQ.jpg', pos: '50% 50%', alt: 'man in green crew neck shirt and black hat' },
  { name: 'Jason Burman', time: '5:14 AM', text: 'Jason: Sound great, send me your calendar', img: 'Y9KmJAQ4w53hsc4jJojfokLZ7D8.jpg', pos: '50% 50%', alt: 'man standing near white wall' },
  { name: 'Katy Jones', time: '3:24 AM', text: 'Katy: Okay, tell me more', img: 'oUkBi1c8nERocfQrJWNLxZ9Fipw.jpg', pos: '50% 50%', alt: 'woman in white crew neck shirt smiling' },
  { name: 'Buddy Rich', time: '5:24 AM', text: 'Buddy: Ah, smart catch. Let me know more.', img: 'JKorM5B0WmJOc8WoLSGW2e0hNG8.jpg', pos: '50% 0%', alt: 'man in blue crew neck shirt' },
  { name: 'Tommy Karl', time: '8:24 PM', text: "Tommy: Super folks. What a message! Let's..", img: 'IQKddGGUVKfESbTRhHhxUrBqwQ.jpg', pos: '50% 50%', alt: "men's gray crew-neck shirt" },
  { name: 'Kanan Gill', time: '6:30 PM', text: "Kanan: What's your pricing?", img: 'F8ur4MxzltB6kcNMHbY8uVKQbg.jpg', pos: '50% 50%', alt: 'man wearing eyeglasses' },
  { name: 'Kaleb Sal', time: '1:24 PM', text: "Kaleb: Now that's a refreshing outreach…", img: 'GLRr9uvTdE0X3XmXVEeXLdXHgS8.jpg', pos: '50% 50%', alt: 'man wearing white crew-neck shirt outdoor selective focus photography' },
  { name: 'Maggie Jones', time: '2:00 AM', text: "Maggie: Haha, almost didn't catch that. let's..", img: 'dNEIQlELj9wVHIBlIYAMLCENUeI.png', pos: '50% 0%', alt: 'closeup photography of woman smiling' },
  { name: 'Alfn Crips', time: '5:24 AM', text: 'Alfn: Sound great, send me your calendar', img: 'MmGrf8ysKLgt7WYL0OdoM7ZbOQ.jpg', pos: '50% 50%', alt: 'man in green crew neck shirt and black hat' },
]
const TOTAL = ROWS.length // 16
const MIN = 9
const STEP_MS = 1015
const RESET_GAP_MS = 110

function Icon({ kind }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (kind === 'edit')
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M 9 0 L 2 0 C 0.895 0 0 0.895 0 2 L 0 16 C 0 17.105 0.895 18 2 18 L 16 18 C 17.105 18 18 17.105 18 16 L 18 9" transform="translate(2 4)" {...common} />
        <path d="M 10.5 0.621 C 11.328 -0.207 12.672 -0.207 13.5 0.621 C 14.328 1.45 14.328 2.793 13.5 3.621 L 4 13.121 L 0 14.121 L 1 10.121 Z" transform="translate(8 1.879)" {...common} />
      </svg>
    )
  if (kind === 'search')
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M 0 8 C 0 3.582 3.582 0 8 0 C 12.418 0 16 3.582 16 8 C 16 12.418 12.418 16 8 16 C 3.582 16 0 12.418 0 8 Z" transform="translate(3 3)" {...common} />
        <path d="M 4.35 4.35 L 0 0" transform="translate(16.65 16.65)" {...common} />
      </svg>
    )
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M 0 7 L 0 0" transform="translate(4 14)" {...common} />
      <path d="M 0 7 L 0 0" transform="translate(4 3)" {...common} />
      <path d="M 0 9 L 0 0" transform="translate(12 12)" {...common} />
      <path d="M 0 5 L 0 0" transform="translate(12 3)" {...common} />
      <path d="M 0 5 L 0 0" transform="translate(20 16)" {...common} />
      <path d="M 0 9 L 0 0" transform="translate(20 3)" {...common} />
      <path d="M 0 0 L 6 0" transform="translate(1 14)" {...common} />
      <path d="M 0 0 L 6 0" transform="translate(9 8)" {...common} />
      <path d="M 0 0 L 6 0" transform="translate(17 16)" {...common} />
    </svg>
  )
}

export default function InboxMock() {
  // count = rows shown; tick flips the slide keyframe name so the animation restarts every step.
  const [state, setState] = useState({ count: MIN, tick: 0, animate: false })
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState({ count: TOTAL, tick: 0, animate: false })
      return
    }
    let timer
    const advance = (count, tick) => {
      if (count < TOTAL) {
        timer = setTimeout(() => {
          setState({ count: count + 1, tick: tick + 1, animate: true })
          advance(count + 1, tick + 1)
        }, STEP_MS)
      } else {
        timer = setTimeout(() => {
          setState({ count: MIN - 1, tick, animate: false })
          timer = setTimeout(() => {
            setState({ count: MIN, tick: tick + 1, animate: true })
            advance(MIN, tick + 1)
          }, RESET_GAP_MS)
        }, STEP_MS + 15)
      }
    }
    advance(MIN, 0)
    return () => clearTimeout(timer)
  }, [])

  const start = TOTAL - state.count
  const anim = state.animate ? (state.tick % 2 ? 'cs-inbox-slide-a' : 'cs-inbox-slide-b') : 'none'
  return (
    <div className="cs-inbox" aria-hidden="true">
      <div className="cs-inbox-head">
        <p className="cs-inbox-dim">Messages</p>
        <span className="cs-inbox-icon cs-inbox-icon--rot">
          <Icon kind="edit" />
        </span>
      </div>
      <div className="cs-inbox-search">
        <div className="cs-inbox-search-box">
          <div className="cs-inbox-search-left">
            <span className="cs-inbox-icon">
              <Icon kind="search" />
            </span>
            <p className="cs-inbox-dim cs-inbox-search-text">Search messages</p>
          </div>
          <span className="cs-inbox-icon cs-inbox-icon--rot">
            <Icon kind="sliders" />
          </span>
        </div>
      </div>
      <div className="cs-inbox-list">
        {ROWS.slice(start).map((r, i) => {
          const idx = start + i
          return (
            <div className="cs-inbox-row" key={idx} style={i === 0 ? undefined : { animationName: anim }}>
              <div className="cs-inbox-row-inner">
                <div className="cs-inbox-avatar">
                  <img src={T + r.img} alt={r.alt} style={{ objectPosition: r.pos }} decoding="async" />
                  <span className="cs-inbox-dot" />
                </div>
                <div className="cs-inbox-body">
                  <div className="cs-inbox-line">
                    <p className="cs-inbox-dim cs-inbox-name">{r.name}</p>
                    <p className="cs-inbox-dim cs-inbox-time">{r.time}</p>
                  </div>
                  <div className="cs-inbox-line cs-inbox-line--end">
                    <p className="cs-inbox-dim cs-inbox-preview">{r.text}</p>
                    <span className="cs-inbox-badge">1</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
