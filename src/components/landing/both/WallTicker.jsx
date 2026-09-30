import { useEffect, useRef } from 'react'
import '../../../styles/pages/landing/both/wall-ticker.css'
import { TRYVALLEY_CARDS, AUTOMATION_CARDS } from './wallTickerData.js'

// "Testimonial Section" / "Wall of loooooveee" (spec 5.4, motion M4). The live Framer ticker
// renders each page's card set three times and loops the track by two sets with a linear WAAPI
// translate at 70 px/s (tryvalley: -4188px over 59,829ms; automation: -4886px over 69,800ms).
const CARD_PITCH = 317 + 32 // card width + row gap
const SPEED = 70 // px per second

function Card({ card }) {
  return (
    <li className="wt-card">
      <div className="wt-card__inner">
        <div className="wt-card__logo">
          <img src={card.logo} alt={card.logoAlt || ''} loading="lazy" />
        </div>
        <div className="wt-card__body">
          <div className="wt-card__text">
            <p>{card.quote}</p>
          </div>
          <div className="wt-card__client">
            <div className="wt-card__photo">
              <img
                src={card.photo}
                alt={card.photoAlt || ''}
                style={card.photoPos ? { objectPosition: card.photoPos } : undefined}
                loading="lazy"
              />
            </div>
            <div className="wt-card__who">
              <p className="wt-card__name">{card.name}</p>
              <p className="wt-card__role">{card.role}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function WallTicker({ variant }) {
  const marqueeRef = useRef(null)

  // Run the marquee only while its box intersects the viewport (live behaviour, see CSS).
  useEffect(() => {
    const el = marqueeRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) el.setAttribute('data-running', '')
      else el.removeAttribute('data-running')
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const cards = variant === 'tryvalley' ? TRYVALLEY_CARDS : AUTOMATION_CARDS
  const shift = 2 * cards.length * CARD_PITCH
  const track = [...cards, ...cards, ...cards]
  return (
    <section id="wall-ticker" className={`wt wt--${variant}`} aria-label="Customer testimonials">
      <div className="wt-content">
        <div className="wt-head">
          <span className="lx-label wt-label" data-lp-appear="15">REal messages, real feedback</span>
          <h3 className="wt-title" data-lp-appear="20" data-lp-appear-delay="0.2" data-lp-appear-amount="0.5">Wall of loooooveee</h3>
          <div className="wt-marquee" ref={marqueeRef}>
            <ul
              className="wt-track"
              style={{ '--wt-shift': `-${shift}px`, '--wt-dur': `${(shift / SPEED) * 1000}ms` }}
            >
              {track.map((card, i) => (
                <Card card={card} key={i} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
