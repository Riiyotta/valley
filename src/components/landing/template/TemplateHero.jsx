import DefaultButton from '../shared/DefaultButton.jsx'
import LandingTag from '../shared/LandingTag.jsx'
import ProofTicker from '../shared/ProofTicker.jsx'
import YouTubeFacade from '../shared/YouTubeFacade.jsx'

// Hero (spec 3.2). The hidden "[SEO]Indexing text" layer (opacity 0) is omitted.
export default function TemplateHero({ data }) {
  return (
    <section id="hero" className="lp-hero" data-framer-name="Hero">
      <div className="lp-hero__row" data-framer-name="Text-container">
        <div className="lp-hero__left">
          <div className="lp-hero__heading" data-framer-name="Heading" data-lp-load="">
            <LandingTag as="h6" hover className="lp-hero__tag">
              {data.eyebrow}
            </LandingTag>
            <h1 className="lp-hero__h1">{data.h1}</h1>
            <h2 className="lp-hero__sub">{data.sub}</h2>
          </div>
          <div className="lp-hero__actions">
            <div className="lp-hero__ctas" data-framer-name="cta-wrapper">
              {data.ctas.map((c) => (
                <DefaultButton key={c.href} href={c.href} label={c.label} />
              ))}
            </div>
            <ProofTicker avatars={data.proofAvatars} rows={data.proofTicker} />
          </div>
        </div>
        <div className="lp-hero__right">
          <YouTubeFacade poster={data.video.poster} className="lp-hero__video" />
          <p className="lp-hero__caption">{data.video.caption}</p>
        </div>
      </div>
    </section>
  )
}
