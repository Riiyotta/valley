/*
 * InlineCtaCard: the "Give your sales team / an unfair advantage." card placed between article
 * sections (blog-post.md section 4, "Inline CTA card"; same component on case studies).
 *
 * API:
 *   <InlineCtaCard image="/assets/pages/templates/BKhwazmhCmOQuEHju5t2RCgyLk0.jpeg" imageAlt="" />
 *   - image: background photo URL (object-fit cover, fills the card). Defaults to CTA_IMAGES[0].
 *   - imageAlt: alt text for the photo (decorative by default).
 *   - className: appended to the root.
 *   CTA_IMAGES (named export) lists the three live CTA photos in slot order (CTA 1, 2, 3).
 *
 * Form: first name + work email, both required; "Book a call →" validates, then sends the
 * visitor to the external demo form (see formSubmit.js). Nothing is collected.
 * Geometry: 760x311 at 1440 (padding 24, glass panel 712x263); 321 tall at phone, where the
 * form gets 16px padding and the two inputs stay side by side.
 */
import './longform.css'
import { submitToBookACall } from './formSubmit.js'

export const CTA_IMAGES = [
  '/assets/pages/templates/BKhwazmhCmOQuEHju5t2RCgyLk0.jpeg',
  '/assets/pages/templates/ftaOQXeRTkzekiBu3G0v4DZ6PI.jpg',
  '/assets/pages/templates/IT76Aaq67wchbfaIkDJdbLY4phM.jpg',
]

export default function InlineCtaCard({ image = CTA_IMAGES[0], imageAlt = '', className = '' }) {
  return (
    <div className={className ? `lf-cta ${className}` : 'lf-cta'}>
      <img className="lf-cta-bg" src={image} alt={imageAlt} loading="lazy" decoding="async" />
      <div className="lf-cta-panel">
        <div className="lf-cta-head">
          <h2>{'Give your sales team\nan unfair advantage.'}</h2>
          <div className="lf-cta-rule" />
        </div>
        <form className="lf-cta-form" noValidate onSubmit={submitToBookACall}>
          <div className="lf-cta-row">
            <label className="lf-input-box">
              <input type="text" name="firstName" placeholder="Enter your first name" aria-label="First name" autoComplete="given-name" required />
            </label>
            <label className="lf-input-box">
              <input type="email" name="email" placeholder="Enter your work email" aria-label="Work email" autoComplete="email" required />
            </label>
          </div>
          <button type="submit" className="lf-book-btn">
            Book a call →
          </button>
        </form>
      </div>
    </div>
  )
}
