/*
 * TryValleyForm: the "Try Valley" sidebar card under the table of contents
 * (blog-post.md section 3, "Sidebar CTA").
 *
 * API:
 *   <TryValleyForm />            fills its parent's width (360 at 1440 in the blog sidebar)
 *   - className: appended to the root.
 *
 * Card: bg #f8f8f8, 1px #d9d9d9 border, padding 16, gap 24. "Try Valley" (PPNM Medium 28/39.2,
 * 20/28 at phone), "Put your outbound workflow to work." (Inter 16/19.2), then a stacked form:
 * full-width email input (48 tall) and the 132x48 "Book a call →" button.
 * Submit validates the email, then sends the visitor to the external demo form
 * (see formSubmit.js). Nothing is collected.
 */
import './longform.css'
import { submitToBookACall } from './formSubmit.js'

export default function TryValleyForm({ className = '' }) {
  return (
    <div className={className ? `lf-try ${className}` : 'lf-try'}>
      <div className="lf-try-head">
        <h2>Try Valley</h2>
        <p>Put your outbound workflow to work.</p>
      </div>
      <form className="lf-try-form" noValidate onSubmit={submitToBookACall} aria-label="Try Valley">
        <label className="lf-input-box">
          <input type="email" name="email" placeholder="Enter your work email" aria-label="Work email" autoComplete="email" required />
        </label>
        <button type="submit" className="lf-book-btn">
          Book a call →
        </button>
      </form>
    </div>
  )
}
