import StarColumn from '../shared/StarColumn.jsx'

// Feature tiles "Desktop" / "Phone" (spec 3.3).
export default function FeatureTiles({ tiles }) {
  return (
    <section id="feature-tiles" className="lp-tiles" data-framer-name="Desktop">
      <div className="lp-tiles__row">
        {tiles.map((t, i) => (
          <div key={i} className="lp-tile" data-framer-name="Call to action container">
            <img className="lp-tile__bg" src={t.bg} alt="" />
            <StarColumn />
            <p className="lp-tile__title">{t.title}</p>
            <div className="lp-tile__tag" data-framer-name="Case study date container">
              <p>{t.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
