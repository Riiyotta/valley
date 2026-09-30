import { caseQuote } from '../../data/casestudies/placeholder.js'

// Testimonial + fixed CTA line (spec/pages/casestudy.md 3). The quote is placeholder text; the name,
// role and portrait are the real case data. Cases without a portrait keep the quote column only.
export default function CaseTestimonial({ c }) {
  return (
    <section className="cs-testi">
      <div className="cs-testi-inner">
        <div className="cs-testi-row">
          {c.avatar && (
            <div className="cs-testi-photo">
              <img src={c.avatar} alt={c.person.name} decoding="async" />
            </div>
          )}
          <div className="cs-testi-quote">
            <h2 className="cs-testi-text">{caseQuote(c.slug)}</h2>
            <div className="cs-testi-who">
              <h5 className="cs-testi-name">{c.person.name}</h5>
              <p className="cs-testi-role">{c.person.role}</p>
            </div>
          </div>
        </div>
        <div className="cs-testi-rule" />
        <div className="cs-testi-cta">
          <div className="cs-testi-cta-text">
            <h2>Turn LinkedIn into Your Most Predictable Revenue Channel</h2>
            <p>A top 1% rep working 24/7 on linkedIn</p>
          </div>
        </div>
      </div>
    </section>
  )
}
