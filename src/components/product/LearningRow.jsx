import useLiveInView from './useLiveInView.js'
import '../../styles/pages/product/vlr.css'

// .valley-learning-row (workflow row 7), spec/pages/product.md 3b. Markup and copy mirror the
// live component source (spec/pages/product/source, fn ln). data-motion="true" while >= 15%
// visible runs the vlr-arrive keyframes (reply, patterns +.12s, next +.25s) in vlr.css.
export default function LearningRow() {
  const [ref, motion] = useLiveInView(0.15)
  return (
    <section
      ref={ref}
      className="valley-learning-row"
      data-motion={String(motion)}
      style={{ width: '100%', fontFamily: '"Valley Body Montreal", Arial, sans-serif' }}
    >
      <div className="vlr-row">
        <div className="vlr-copy">
          <small>
            <b>07 / 07</b>
            CONTINUOUS LEARNING
          </small>
          <h3>Improve with every reply.</h3>
          <p>
            Valley learns from what earns positive replies, across your campaigns and the customers before you. It studies the
            audience and the message to improve what comes next.
          </p>
        </div>
        <div
          className="vlr-visual"
          role="img"
          aria-label="Illustrative learning loop: a positive reply informs audience patterns and message patterns, which shape the next campaign."
        >
          <div className="vlr-loop">
            <div className="vlr-reply">
              <small>A POSITIVE REPLY</small>
              <p>“This is exactly what we’re working on. Let’s talk.”</p>
            </div>
            <div className="vlr-arrow">
              <svg viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <path d="M10 2v18m-5-5 5 5 5-5" />
              </svg>
            </div>
            <div className="vlr-patterns">
              <div>
                <strong>Who responds</strong>
                <span>
                  Role · Company size
                  <br />
                  Geography · Signals
                </span>
              </div>
              <div>
                <strong>What resonates</strong>
                <span>
                  Length · Tone · Openers
                  <br />
                  CTAs · Punctuation
                </span>
              </div>
            </div>
            <div className="vlr-next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M20 10a8 8 0 0 0-14-4L3 9m0-6v6h6M4 14a8 8 0 0 0 14 4l3-3m0 6v-6h-6" />
              </svg>
              <span>Better context for your next campaign.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
