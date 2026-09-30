import InboxMock from './InboxMock.jsx'
import { Reveal, goToSurface } from './shared.jsx'

// "Join Waitlist" band (spec/pages/casestudy.md 6 and 9). Heading reveals with y 20 / delay .2s,
// the form with y 15 / no delay (spring 210/70/1). The desktop text breaks after "floods" (Framer
// per-breakpoint text); at phone it wraps naturally (one line at 768).
export default function WaitlistBand() {
  return (
    <section className="cs-wait">
      <div className="cs-wait-content">
        <div className="cs-wait-copy">
          <Reveal className="cs-wait-heading" y={20} delay={0.2}>
            <h3>
              The LinkedIn tool that floods{' '}
              <br className="cs-wait-br" />
              your inbox (with real replies).
            </h3>
          </Reveal>
          <Reveal as="form" className="cs-wait-form" y={15} noValidate onSubmit={goToSurface} aria-label="Book a demo">
            <label className="cs-wait-label">
              <span className="cs-wait-box">
                <input type="email" name="email" placeholder="Work Email" aria-label="Work Email" autoComplete="email" required />
              </span>
            </label>
            <button type="submit" className="lf-book-btn">
              Book Demo →
            </button>
          </Reveal>
        </div>
        <div className="cs-wait-mock">
          <InboxMock />
        </div>
      </div>
    </section>
  )
}
