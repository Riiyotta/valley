import ProofTicker from '../shared/ProofTicker.jsx'
import YouTubeFacade from '../shared/YouTubeFacade.jsx'

// Agency hero (spec 4.1). The eyebrow row scales 1.05 on hover like the template tag
// (raw/hover_linkedin-outreach-for-agencies.json); the "agencyDemo" CTA has no hover variant.
export default function AgencyHero({ data }) {
  return (
    <section id="agency-hero" className="lp-ahero" data-framer-name="Hero">
      <div className="lp-ahero__row" data-framer-name="Text-container">
        <div className="lp-ahero__left">
          <div className="lp-ahero__heading" data-framer-name="Heading" data-lp-load="">
            <div className="lp-eyebrow lp-tag-hover" data-framer-name="Tag">
              <div className="lp-tag__dot" />
              <p className="lp-alabel">{data.eyebrow}</p>
            </div>
            <h1 className="lp-ahero__h1">
              {data.h1Lines[0]}
              <br />
              {data.h1Lines[1]}
            </h1>
            <p className="lp-ahero__sub">{data.sub}</p>
          </div>
          <div className="lp-ahero__actions">
            <div className="lp-ahero__ctawrap" data-framer-name="cta-wrapper">
              <a className="lp-ahero__cta" href={data.cta.href} data-framer-name="agencyDemo">
                {data.cta.label}
              </a>
            </div>
            <ProofTicker />
          </div>
        </div>
        <div className="lp-ahero__right">
          <img className="lp-ahero__art" src={data.art} alt="" />
          <YouTubeFacade poster={data.poster} className="lp-ahero__video" />
        </div>
      </div>
    </section>
  )
}
