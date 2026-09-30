import '../styles/footer.css'

// CLONE_SPEC.md section 18 (footer). Markup mirrors the live `footer.vf` component inside
// Framer's "Desktop"/"Tablet"/"Phone" wrapper.

const SIGNUP = 'https://beta.joinvalley.co/signup'
const DEMO = 'https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b'
const LOGIN = 'https://beta.joinvalley.co/login'

export default function Footer() {
  return (
    <div id="footer" className="vf-frame">
      <footer className="vf" style={{ width: '100%' }}>
        <div className="vf-inner">
          <div className="vf-top">
            <div>
              <h2>
                Find your people.
                <br />
                Give them a reason to reply.
              </h2>
              <p>Find, qualify, research, and reach your next buyers across email and LinkedIn.</p>
            </div>
            <div className="vf-actions">
              <a href={SIGNUP}>Start for free →</a>
              <a className="surface-form-button" href={DEMO}>
                Book a demo
              </a>
            </div>
          </div>
          <div className="vf-links">
            <div>
              <a href="/" className="vf-brand" aria-label="Valley home">
                <svg viewBox="0 0 48 45" fill="currentColor" aria-hidden="true">
                  <path d="M11.8368 4.67773L21.796 14.637L18.3674 18.2288L13.796 22.9635H4V18.2288H18.3674L8.24491 8.26958L11.8368 4.67773Z M36.1632 4.67773L26.204 14.637L29.6326 18.2288L34.204 22.9635H44V18.2288H29.6326L39.7551 8.26958L36.1632 4.67773Z M8.24512 32.5954L24.0819 16.9219L39.9187 32.5954L36.4901 36.024L26.5309 26.228V40.2689H21.4697V26.228L11.6737 36.024L8.24512 32.5954Z" />
                </svg>
                Valley
              </a>
              <p>
                Your outbound team.
                <br />
                One connected platform.
              </p>
              <a href="mailto:hey@joinvalley.co">hey@joinvalley.co</a>
            </div>
            <nav aria-label="Footer product">
              <strong>Explore Valley</strong>
              <a href="/product">Product</a>
              <a href="/casestudies">Customers</a>
              <a href="/linkedin-outreach-for-agencies">Agencies</a>
              <a href="/pricing">Pricing</a>
            </nav>
            <nav aria-label="Footer resources">
              <strong>Learn more</strong>
              <a href="/blog">Resources</a>
              <a href="/blog/archive">All articles</a>
              <a href="/about">About Valley</a>
              <a href={LOGIN}>Log in</a>
            </nav>
          </div>
          <div className="vf-bottom">
            <span>© Valley. All rights reserved.</span>
            <div>
              <a href="/privacy-policy">Privacy policy</a>
              <a href="/terms-of-service">Terms of service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
