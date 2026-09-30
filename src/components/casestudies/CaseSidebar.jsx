import { caseBlurb } from '../../data/casestudies/placeholder.js'
import { goToSurface } from './shared.jsx'

// Sticky right sidebar (spec/pages/casestudy.md 4): company "About" card (real logo, placeholder
// blurb) and the "Try Valley" card. Form parts reuse the long-form input/button styles.
export default function CaseSidebar({ c }) {
  return (
    <aside className="cs-side">
      <div className="cs-about">
        <div className="cs-about-logo">{c.logo && <img src={c.logo} alt={c.logoAlt || c.company} decoding="async" />}</div>
        <div className="cs-about-text">
          <p>{caseBlurb(c.slug)}</p>
        </div>
      </div>
      <div className="cs-cta">
        <div className="cs-cta-head">
          <h2>Try Valley</h2>
          <p>Make LinkedIn your Greatest Revenue Channel  ↓</p>
        </div>
        <form className="cs-cta-form" noValidate onSubmit={goToSurface} aria-label="Try Valley">
          <label className="lf-input-box">
            <input type="email" name="email" placeholder="Enter your work email" aria-label="Work email" autoComplete="email" required />
          </label>
          <button type="submit" className="lf-book-btn">
            Book a call →
          </button>
        </form>
      </div>
    </aside>
  )
}
