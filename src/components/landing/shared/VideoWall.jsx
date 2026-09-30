import YouTubeFacade from './YouTubeFacade.jsx'
import LandingTag from './LandingTag.jsx'
import '../../../styles/pages/landing/shared.css'

// "Why sales teams love valley" video wall. variant "template" = spec 3.6 (centred heading,
// amber tag, 4 flex cards on #e7eff0); variant "agency" = spec 4.4 (left heading, #315e8d
// eyebrow, 4-column grid, #e9eff0 cards). Appear on scroll (M3, measured on live): the four
// cards rise 15px and fade in together, .6s after any part enters the viewport, >= 1200 only.
function CompanyLabel({ card }) {
  const label = card.companyHref ? (
    <a className="lp-vw__company" href={card.companyHref}>
      <strong>{card.company}</strong>
    </a>
  ) : (
    <strong className="lp-vw__company lp-vw__company--plain">{card.company}</strong>
  )
  return (
    <>
      {label}
      {card.companySuffix && <strong className="lp-vw__suffix">{card.companySuffix}</strong>}
    </>
  )
}

export default function VideoWall({ data, variant = 'template' }) {
  const agency = variant === 'agency'
  return (
    <section id="video-wall" className={`lp-vw${agency ? ' lp-vw--agency' : ''}`} data-framer-name="Why sales teams love valley">
      <div className="lp-vw__inner">
        <div className="lp-vw__heading">
          {agency ? (
            <div className="lp-vw__eyebrow" data-framer-name="Tag">
              <div className="lp-tag__dot" />
              <p>{data.eyebrow}</p>
            </div>
          ) : (
            <LandingTag tone="amber">{data.eyebrow}</LandingTag>
          )}
          <h2 className="lp-vw__h2">{data.h2}</h2>
        </div>
        <div className="lp-vw__row">
          {data.cards.map((card) => (
            <div key={card.poster} className="lp-vw__card" data-framer-name="Video Container" data-lp-appear="15" data-lp-appear-delay="0.6">
              <YouTubeFacade poster={card.poster} className="lp-vw__video" />
              <div className="lp-vw__text">
                <p className="lp-vw__quote">
                  <CompanyLabel card={card} />
                  <br />
                  <br />
                  {card.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
