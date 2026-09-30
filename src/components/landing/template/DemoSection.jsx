import LandingTag from '../shared/LandingTag.jsx'

// HubSpot booking section "Desktop" / "Phone" (spec 3.9). Embeds the same meetings iframe as
// the live page (third-party, renders blank in headless capture). Phone uses a different
// one-line heading (see data/landing/templates.js).
export default function DemoSection({ data }) {
  return (
    <section id="demo" className="lp-demo" data-framer-name="Desktop">
      <div className="lp-demo__bg" aria-hidden="true" />
      <div className="lp-demo__container" data-framer-name="Container">
        <div className="lp-demo__heading">
          <LandingTag tone="amber" cream>
            {data.eyebrow}
          </LandingTag>
          <div className="lp-demo__lines">
            {data.headingLines.map((l) => (
              <p key={l} className="lp-demo__line">
                {l}
              </p>
            ))}
            <p className="lp-demo__line lp-demo__line--phone">{data.phoneHeading}</p>
          </div>
        </div>
        <iframe className="lp-demo__frame" src={data.iframe} title="Book a meeting with Valley" loading="lazy" />
      </div>
    </section>
  )
}
