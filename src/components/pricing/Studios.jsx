import Reveal from './Reveal.jsx'

// /pricing "Get Early Access Banner" (Valley Studios), spec/pages/pricing.md section 4.
// The live submit button carries `surface-form-button` and the Surface script opens the
// Surface form. The clone lets the browser validate the email (type=email, required), then
// opens the same Surface URL in a new tab. The form itself is not recreated.
const SURFACE = 'https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b'

export default function Studios() {
  const onSubmit = (e) => {
    e.preventDefault()
    window.open(SURFACE, '_blank', 'noopener')
  }
  return (
    <section className="pr-studios" data-framer-name="Get Early Access Banner">
      <img
        className="pr-studios-bg"
        src="/assets/img/DzF7ltBGreQELkgImDCaxxldqH0.jpg"
        alt="Background for LinkedIn automation and AI SDR outreach with dark gray and white accents."
        decoding="async"
      />
      <div className="pr-studios-content">
        <div className="pr-studios-head">
          <Reveal className="pr-studios-label" y={15} threshold={0.5}>
            <p>VALLEY STUDIOS</p>
          </Reveal>
          <Reveal className="pr-studios-titles" y={20} delay={0.2} threshold={0.5}>
            <h3 className="pr-studios-title">
              Valley Done-For-You
              <br />
              Meetings booked. Pipeline filled. You close deals.
            </h3>
            <p className="pr-studios-price">$1499/mo</p>
          </Reveal>
          {/* Not animated on live (only label, title block and form start hidden). */}
          <h3 className="pr-studios-sub">
            Your Valley, operated by us: strategy, campaigns, optimization, reporting. <br />
            For teams that want the pipeline without the operating.
          </h3>
          <div className="pr-studios-formwrap">
            <Reveal as="form" className="pr-studios-form" name="Waitlist" y={15} threshold={0} onSubmit={onSubmit}>
              <div className="pr-studios-field">
                <input type="email" name="Email" required placeholder="Your work email" aria-label="Your work email" />
              </div>
              <button type="submit" className="pr-studios-btn">
                <span>Book a call →</span>
              </button>
            </Reveal>
            {/* Visible only in the 1280-1679.98 page variant (hidden-* classes on live). */}
            <p className="pr-studios-note">Currently not accepting more users, join our waitlist</p>
          </div>
        </div>
      </div>
    </section>
  )
}
