import CtaPrimary from './CtaPrimary.jsx'
import StarColumn from './StarColumn.jsx'
import { CASE_BANNER } from '../../../data/landing/templates.js'
import '../../../styles/pages/landing/shared.css'

// Case-study banner "Testimonial Desktop" / "Testimonial Mobile" (spec 3.7). Hovering the card
// slides the two star columns (M10, CSS spring in shared.css). variant "agency" = section padding
// 64px 48px on #f8f9f7 (spec 4).
const BG = '/assets/pages/landing/img/GGiHIlYdU4o4MMMkKUEQbJ1CUvw.png'

export default function CaseBanner({ data = CASE_BANNER, variant = 'template', avatarAlt = '' }) {
  return (
    <section id="case-banner" className={`lp-case${variant === 'agency' ? ' lp-case--agency' : ''}`} data-framer-name="Case Studies v2">
      <div className="lp-case__card" data-framer-name="Testimonial Desktop">
        <img className="lp-case__bg" src={BG} alt="" />
        <StarColumn className="lp-case__stars1" />
        <StarColumn className="lp-case__stars2" />
        <div className="lp-case__text">
          <p className="lp-case__quote">{data.quote}</p>
          <div className="lp-case__author">
            <img className="lp-case__avatar" src={data.avatar} alt={avatarAlt} />
            <div className="lp-case__who">
              <p className="lp-case__name">{data.name}</p>
              <p className="lp-case__role">{data.role}</p>
            </div>
          </div>
          <div className="lp-case__chips">
            {data.chips.map((c) => (
              <div key={c} className="lp-case__chip">
                <p>{c}</p>
              </div>
            ))}
          </div>
        </div>
        <CtaPrimary href={data.cta.href} label={data.cta.label} className="lp-case__cta" />
      </div>
    </section>
  )
}
