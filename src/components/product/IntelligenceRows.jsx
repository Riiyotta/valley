import useLiveInView from './useLiveInView.js'
import '../../styles/pages/product/vir.css'

// .valley-intelligence-rows (workflow rows 1-3: prospecting, qualification, research),
// spec/pages/product.md 3b. Markup, copy and icons mirror the live component source
// (spec/pages/product/source, fns Q / en / tn / nn / rn / an). Each `.vir-stage` is live
// (data-live="true") while >= 15% visible, which runs the vir-settle / vir-flow / vir-confirm
// keyframes in vir.css; leaving the viewport resets it so they replay on re-entry.

const ART = {
  prospecting: '/assets/pages/product/dU36ul18DtX1eCElt7maRiZGotc.png',
  qualification: '/assets/pages/product/5PTRAJLnFg6rsWb9IKzPm6tagrQ.png',
  research: '/assets/pages/product/LCJ24npVr4QMqurmmIGxgEU62HU.png',
}

const ICONS = {
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  check: <path d="m5 12 4 4L19 6" />,
  skip: <path d="m7 7 10 10M7 17 17 7" />,
  people: (
    <>
      <path d="M3 20v-2a5 5 0 0 1 10 0v2M15 14a5 5 0 0 1 6 4v2" />
      <circle cx="8" cy="7" r="3" />
      <path d="M15 4a3 3 0 0 1 0 6" />
    </>
  ),
  work: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="1" />
      <path d="M8 7V3h8v4M3 12h18" />
    </>
  ),
  message: (
    <>
      <path d="M3 4h18v13H9l-6 4V4Z" />
      <path d="M7 9h10M7 13h6" />
    </>
  ),
  search: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="m15 15 6 6" />
    </>
  ),
  source: (
    <>
      <path d="M5 3h9l5 5v13H5V3Z" />
      <path d="M14 3v6h5M8 13h8M8 17h6" />
    </>
  ),
}

function Icon({ type = 'arrow', size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[type] || ICONS.arrow}
    </svg>
  )
}

function Stage({ kind, label, children }) {
  const [ref, live] = useLiveInView(0.15)
  return (
    <div className={`vir-stage vir-${kind}`} ref={ref} data-live={String(live)} role="img" aria-label={label}>
      <img className="vir-painting" src={ART[kind]} alt="" loading="lazy" />
      {children}
    </div>
  )
}

function Prospecting() {
  return (
    <Stage
      kind="prospecting"
      label="Engagement, hiring, competitor frustrations and relevant keywords surface a new person to qualify: Maya Chen, VP Revenue at Fieldwork. Illustrative example."
    >
      <div className="vir-find-composition">
        <div className="vir-signal-rail">
          <span className="vir-mini-label">WHAT’S CHANGING</span>
          <div>
            <Icon type="people" />
            <span>
              Lead magnet
              <br />
              engagement
            </span>
          </div>
          <div>
            <Icon type="work" />
            <span>Hiring signals</span>
          </div>
          <div>
            <Icon type="message" />
            <span>
              Competitor
              <br />
              frustrations
            </span>
          </div>
          <div>
            <Icon type="search" />
            <span>Relevant keywords</span>
          </div>
        </div>
        <span className="vir-find-arrow">
          <Icon size={25} />
        </span>
        <div className="vir-new-person">
          <span className="vir-mini-label">A PERSON TO QUALIFY</span>
          <div className="vir-person-monogram">
            MC
            <span className="vir-new-dot" />
          </div>
          <strong>Maya Chen</strong>
          <span className="vir-person-role">
            VP Revenue
            <br />
            Fieldwork
          </span>
          <div className="vir-new-reason">
            <Icon type="work" size={17} />
            <span>Hiring account executives</span>
          </div>
        </div>
      </div>
    </Stage>
  )
}

function Qualification() {
  return (
    <Stage
      kind="qualification"
      label="Your ideal customer is a revenue leader at a growing B2B software company. Maya Chen matches the role and company criteria. Sam Price, a Community Manager, is outside the target roles and is skipped. Illustrative example."
    >
      <div className="vir-fit-composition">
        <div className="vir-ideal-customer">
          <span className="vir-mini-label">YOUR IDEAL CUSTOMER</span>
          <strong>B2B software. Revenue leaders. Growing teams.</strong>
        </div>
        <div className="vir-fit-person">
          <div className="vir-fit-person-top">
            <span className="vir-fit-monogram">MC</span>
            <div>
              <strong>Maya Chen</strong>
              <span>VP Revenue · Fieldwork</span>
            </div>
            <span className="vir-fit-check">
              <Icon type="check" size={22} />
            </span>
          </div>
          <div className="vir-fit-reason">
            <span className="vir-fit-state">High ICP-Fit</span>
            <span>
              Right role. Right company. <br />
              Hiring account executives.
            </span>
          </div>
        </div>
        <div className="vir-skip-person">
          <div>
            <strong>Sam Price</strong>
            <span>Community Manager · Outside your target roles.</span>
          </div>
          <span className="vir-skip-state">
            <Icon type="skip" size={15} />
            Skip
          </span>
        </div>
      </div>
    </Stage>
  )
}

function Research() {
  const findings = [
    ['Building a bigger revenue team.', 'Company news'],
    ['Quality matters more than volume.', 'LinkedIn post'],
    ['New reps need a better starting point.', 'Podcast interview'],
  ]
  return (
    <Stage
      kind="research"
      label="Research across news, podcasts, LinkedIn and X, YouTube and newsletters becomes a short sourced brief. Example findings: growing a revenue team from company news; prioritizing quality from a LinkedIn post; better starting points for new reps from a podcast interview. All example findings are illustrative."
    >
      <div className="vir-research-composition">
        <div className="vir-source-ribbon">
          <span>News</span>
          <span>Podcasts</span>
          <span>LinkedIn / X</span>
          <span>YouTube</span>
          <span>Newsletters</span>
        </div>
        <div className="vir-research-brief">
          <div className="vir-brief-header">
            <Icon type="source" size={19} />
            <span>WHAT MATTERS TO MAYA</span>
          </div>
          {findings.map(([finding, source]) => (
            <div className="vir-finding" key={finding}>
              <strong>{finding}</strong>
              <span>
                <span />
                {source}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  )
}

const ROWS = {
  prospecting: {
    badge: '01 / 07',
    eyebrow: 'PROSPECTING',
    heading: 'Find your next buyers.',
    body: 'Catch relevant engagement, hiring, competitor frustrations and conversations around your keywords. Turn what’s happening now into the next people worth reaching.',
    Visual: Prospecting,
  },
  qualification: {
    badge: '02 / 07',
    eyebrow: 'QUALIFICATION',
    heading: 'Qualify every prospect.',
    body: 'Valley checks each person against your ideal customer and explains the match. Correct a decision, refine the criteria, and re-check who belongs in your campaign.',
    Visual: Qualification,
  },
  research: {
    badge: '03 / 07',
    eyebrow: 'RESEARCH',
    heading: 'Research each person.',
    body: 'Pull useful context from posts, interviews and company news. See the sources behind the findings, so the message starts with a reason to reach out.',
    Visual: Research,
  },
}

// row: 'prospecting' | 'qualification' | 'research' (one instance per sticky wrapper on live).
export default function IntelligenceRows({ row }) {
  const r = ROWS[row]
  const { Visual } = r
  return (
    <section
      className="valley-intelligence-rows"
      aria-label="Find, qualify and research buyers with Valley"
      data-static="false"
      data-row={row}
      style={{
        fontStyle: 'normal',
        fontWeight: 400,
        letterSpacing: '0em',
        width: '100%',
        position: 'relative',
        height: 'auto',
        minWidth: 0,
        fontFamily: '"Valley Intelligence Montreal", sans-serif',
        fontSize: 19,
        lineHeight: 'normal',
      }}
    >
      <article className="vir-row" data-step={row}>
        <div className="vir-copy">
          <span className="vir-eyebrow">
            <b>{r.badge}</b>
            {r.eyebrow}
          </span>
          <h3>{r.heading}</h3>
          <p>{r.body}</p>
        </div>
        <Visual />
      </article>
    </section>
  )
}
