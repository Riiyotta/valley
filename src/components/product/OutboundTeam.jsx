import '../../styles/pages/product/vot.css'

// .valley-outbound-team intro card ("An entire outbound team"), spec/pages/product.md 3a.
// Markup and copy mirror the live component source (spec/pages/product/source, fn fn / pn).
const ROLES = [
  ['GTM engineer', 'Build the right audience'],
  ['Researcher', 'Find the reason to reach out'],
  ['Copywriter', 'Make it sound like you'],
  ['SDR', 'Send and follow through'],
  ['Analyst', 'Learn what earns a reply'],
]

export default function OutboundTeam() {
  return (
    <section className="valley-outbound-team" style={{ width: '100%', fontFamily: '"Valley Body Montreal", Arial, sans-serif' }}>
      <div className="vot-intro">
        <div className="vot-copy">
          <small>Your outbound team, working together</small>
          <h2>
            An entire outbound team.
            <br />
            One piece of software.
          </h2>
          <p>
            Valley finds the people, does the research, writes the message and follows through. Every step shares the same
            context.
          </p>
        </div>
        <div
          className="vot-org"
          aria-label="Valley brings the work of a GTM engineer, researcher, copywriter, SDR and analyst together"
        >
          <div className="vot-roles">
            {ROLES.map(([role, job]) => (
              <div className="vot-role" key={role}>
                <strong>{role}</strong>
                <span>{job}</span>
              </div>
            ))}
          </div>
          <div className="vot-valley">
            <svg viewBox="0 0 48 45" fill="currentColor" aria-hidden="true">
              <path d="M11.8368 4.67773L21.796 14.637L18.3674 18.2288L13.796 22.9635H4V18.2288H18.3674L8.24491 8.26958L11.8368 4.67773Z" />
              <path d="M36.1632 4.67773L26.204 14.637L29.6326 18.2288L34.204 22.9635H44V18.2288H29.6326L39.7551 8.26958L36.1632 4.67773Z" />
              <path d="M8.24512 32.5954L24.0819 16.9219L39.9187 32.5954L36.4901 36.024L26.5309 26.228V40.2689H21.4697V26.228L11.6737 36.024L8.24512 32.5954Z" />
            </svg>
            <strong>Valley</strong>
            <span>
              One connected
              <br />
              outbound workflow.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
