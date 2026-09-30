import DefaultButton from '../shared/DefaultButton.jsx'
import LandingTag from '../shared/LandingTag.jsx'

// "Comparative Analysis" / "Compare Table 2" (spec 3.8): three path cards, the third highlighted
// with a black "Default" button.
export default function PathsComparison({ data }) {
  return (
    <section id="comparison" className="lp-compare" data-framer-name="Comparative Analysis">
      <div className="lp-compare__heading">
        <LandingTag as="code" tone="amber">
          {data.eyebrow}
        </LandingTag>
        <div className="lp-compare__lines">
          {data.headingLines.map((l) => (
            <p key={l} className="lp-h2">
              {l}
            </p>
          ))}
        </div>
      </div>
      <div className="lp-compare__row">
        {data.paths.map((p) => (
          <div key={p.tag} className={`lp-path${p.highlight ? ' lp-path--hl' : ''}`} data-framer-name={p.highlight ? 'Variant 2' : 'Variant 1'}>
            <div className="lp-path__top">
              <div className="lp-path__tag">
                <p>{p.tag}</p>
              </div>
              <p className="lp-path__kicker">{p.kicker}</p>
            </div>
            <div className="lp-path__heading">
              <p className="lp-path__title">{p.title}</p>
              <p className="lp-path__body">{p.body}</p>
            </div>
            <div className="lp-path__cost">
              <p className="lp-path__cost-label">{p.costLabel}</p>
              <p className="lp-path__cost-value">{p.costValue}</p>
            </div>
            <div className="lp-path__bullets">
              {p.bullets.map((b) => (
                <div key={b} className="lp-path__bullet">
                  <div className="lp-path__dot" />
                  <p>{b}</p>
                </div>
              ))}
            </div>
            <div className="lp-path__foot">
              <p>{p.footerTag}</p>
            </div>
            {p.cta && <DefaultButton href={p.cta.href} label={p.cta.label} black />}
          </div>
        ))}
      </div>
    </section>
  )
}
