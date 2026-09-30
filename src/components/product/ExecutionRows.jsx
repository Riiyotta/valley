import { useEffect, useId, useRef, useState } from 'react'
import '../../styles/pages/product/ver.css'

// .valley-execution-rows (workflow rows 4-6: message, channels, analytics), spec/pages/product.md
// 3b. Markup, copy and icons mirror the live component source (spec/pages/product/source,
// fns Z / Gt / Kt / qt / Jt). One IntersectionObserver (threshold .12) per `.ver-row`: the first
// intersection sets data-seen="true" for good (runs the ver-enter reveal, staggered by
// --ver-order x 75ms in ver.css); data-in-view pauses/resumes while it is off screen.

const ART = {
  message: '/assets/img/zPOKyZnbl77fH6unSixkvRUOSOs.png',
  channels: '/assets/img/5WP0tI1lICNwC23waJVfpSCTTpE.png',
  analytics: '/assets/img/5Elg5B9vPo2Xblz2XfnsvZzgqlA.png',
}

function Icon({ kind = 'arrow', size = 18 }) {
  let body
  if (kind === 'mail')
    body = (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <path d="m4 6 8 7 8-7" />
      </>
    )
  else if (kind === 'profile')
    body = (
      <g stroke="#287d75">
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20v-2a5.5 5.5 0 0 1 11 0v2M19 8v6m-3-3h6" />
      </g>
    )
  else if (kind === 'check') body = <path d="m5 12 4 4L19 6" />
  else if (kind === 'reply') body = <path d="m9 5-6 6 6 6M3 11h10c5 0 8 3 8 8" />
  else if (kind === 'calendar')
    body = (
      <>
        <rect x="3" y="5" width="18" height="16" rx="1.5" />
        <path d="M3 10h18M8 3v4m8-4v4m-9 7h3m4 0h3" />
      </>
    )
  else if (kind === 'chart') body = <path d="M4 4v16h16M8 16v-4m5 4V8m5 8V5" />
  else if (kind === 'research') body = <path d="M5 3h9l5 5v13H5zM14 3v6h5M9 12h6m-6 4h4" />
  else body = <path d="M4 12h15m-5-5 5 5-5 5" />
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {body}
    </svg>
  )
}

function MessageArt() {
  return (
    <div
      className="ver-visual ver-message-art"
      role="img"
      aria-label="Illustrative message: your short, direct writing style and a prospect's hiring context shape a personal first email."
    >
      <img className="ver-background" src={ART.message} alt="" loading="lazy" decoding="async" />
      <div className="ver-message-composition">
        <div className="ver-message-inputs ver-reveal">
          <span>
            <Icon kind="research" size={16} />
            Their context
          </span>
          <span>
            Your voice <span className="ver-voice-mark">Aa</span>
          </span>
        </div>
        <article className="ver-letter ver-surface ver-reveal" style={{ '--ver-order': 1 }}>
          <div className="ver-letter-header">
            <span>
              <Icon kind="mail" />
              To Maya at Fieldwork
            </span>
            <span>Draft</span>
          </div>
          <p>
            Maya, <mark>saw you’re adding AEs.</mark>
          </p>
          <p>Valley gives each rep researched prospects and a first message in your team’s voice.</p>
          <p>
            <mark>Want to see a few examples?</mark>
          </p>
          <div className="ver-letter-foot">
            <Icon kind="check" size={15} />
            <span>Ready for your review.</span>
          </div>
        </article>
      </div>
    </div>
  )
}

function ChannelsArt() {
  return (
    <div
      className="ver-visual ver-channels-art"
      role="img"
      aria-label="Illustrative sequence: a LinkedIn connection, an email follow-up after a chosen wait, then a reply stops the sequence."
    >
      <img className="ver-background" src={ART.channels} alt="" loading="lazy" decoding="async" />
      <div className="ver-sequence">
        <div className="ver-sequence-step ver-sequence-first ver-surface ver-reveal">
          <span className="ver-channel-icon">
            <Icon kind="profile" size={23} />
          </span>
          <div>
            <small>FIRST TOUCH</small>
            <strong>Connect on LinkedIn</strong>
          </div>
          <span className="ver-step-index">01</span>
        </div>
        <div className="ver-wait ver-reveal" style={{ '--ver-order': 1 }}>
          <span />
          Your timing
          <span />
        </div>
        <div className="ver-sequence-step ver-sequence-second ver-surface ver-reveal" style={{ '--ver-order': 2 }}>
          <span className="ver-channel-icon">
            <Icon kind="mail" size={23} />
          </span>
          <div>
            <small>FOLLOW-UP</small>
            <strong>Continue by email</strong>
          </div>
          <span className="ver-step-index">02</span>
        </div>
        <div className="ver-reply-stop ver-reveal" style={{ '--ver-order': 3 }}>
          <Icon kind="reply" size={19} />
          <div>
            <strong>They reply. Follow-ups stop.</strong>
            <span>The conversation is yours.</span>
          </div>
          <Icon kind="check" size={18} />
        </div>
      </div>
    </div>
  )
}

const FLOW = [
  { label: 'Campaign', detail: 'The outreach you run', icon: 'mail' },
  { label: 'Reply', detail: 'People responding', icon: 'reply' },
  { label: 'Meeting', detail: 'Conversations booked', icon: 'calendar' },
]

function AnalyticsArt() {
  return (
    <div
      className="ver-visual ver-analytics-art"
      role="img"
      aria-label="Illustrative campaign analysis: review replies and meetings, then estimate potential pipeline using interested prospects and your average deal size. No outcome numbers are shown."
    >
      <img className="ver-analytics-strip" src={ART.analytics} alt="" loading="lazy" decoding="async" />
      <div className="ver-analysis">
        <div className="ver-analysis-heading ver-reveal">
          <span>FOLLOW THE CONVERSATION</span>
          <Icon kind="chart" size={22} />
        </div>
        <div className="ver-analysis-flow">
          {FLOW.map((s, i) => (
            <div className="ver-analysis-step ver-reveal" style={{ '--ver-order': i + 1 }} key={s.label}>
              <span className="ver-analysis-icon">
                <Icon kind={s.icon} size={20} />
              </span>
              <strong>{s.label}</strong>
              <span>{s.detail}</span>
              {i < 2 && <span className="ver-analysis-connector" aria-hidden="true" />}
            </div>
          ))}
        </div>
        <div className="ver-pipeline ver-surface ver-reveal" style={{ '--ver-order': 4 }}>
          <span>Potential pipeline</span>
          <p>
            Interested prospects
            <br />
            <span>× your average deal size</span>
          </p>
          <small>An estimate, with its inputs in view.</small>
        </div>
      </div>
    </div>
  )
}

const ROWS = [
  {
    id: 'message',
    number: '04',
    category: 'MESSAGE GENERATION',
    heading: 'Write messages in your voice.',
    body: 'Valley combines what it learns about each prospect with your phrasing, punctuation and style. You get a relevant first draft that sounds like you, ready to review, edit and make your own.',
    Graphic: MessageArt,
  },
  {
    id: 'channels',
    number: '05',
    category: 'EMAIL & LINKEDIN',
    heading: 'Send across email and LinkedIn.',
    body: 'Connect your own accounts and put both channels in one sequence. Choose the timing, review the messages and let the follow-ups run. When someone replies, the sequence stops so you can pick up the conversation.',
    Graphic: ChannelsArt,
  },
  {
    id: 'analytics',
    number: '06',
    category: 'ANALYTICS & PIPELINE',
    heading: 'Track replies, meetings, and pipeline.',
    body: 'See replies and meetings beside campaign activity. Estimate potential pipeline from interested prospects and your average deal size, then use what you learn to improve the next campaign.',
    Graphic: AnalyticsArt,
  },
]

// section: 'message' | 'channels' | 'analytics' (one instance per sticky wrapper on live).
export default function ExecutionRows({ section }) {
  const rootRef = useRef(null)
  const [inView, setInView] = useState({})
  const [seen, setSeen] = useState({})
  const [pageVisible, setPageVisible] = useState(true)
  const uid = 'ver-' + useId().replace(/:/g, '')
  useEffect(() => {
    const onVis = () => setPageVisible(!document.hidden)
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const id = e.target.dataset.row || ''
          setInView((m) => ({ ...m, [id]: e.isIntersecting }))
          if (e.isIntersecting) setSeen((m) => ({ ...m, [id]: true }))
        }),
      { threshold: 0.12 },
    )
    rootRef.current?.querySelectorAll('.ver-row').forEach((el) => io.observe(el))
    onVis()
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [section])
  return (
    <section
      ref={rootRef}
      className="valley-execution-rows"
      aria-label="Writing, sending and understanding your outbound"
      data-static="false"
      data-page-visible={String(pageVisible)}
      style={{
        fontStyle: 'normal',
        fontWeight: 400,
        letterSpacing: '0em',
        width: '100%',
        position: 'relative',
        height: 'auto',
        minWidth: 0,
        fontFamily: '"Valley Execution Montreal", sans-serif',
        fontSize: 16,
        lineHeight: 'normal',
      }}
    >
      {ROWS.filter((r) => r.id === section).map(({ id, number, category, heading, body, Graphic }) => (
        <article
          className="ver-row"
          data-row={id}
          data-seen={String(!!seen[id])}
          data-in-view={String(!!inView[id])}
          aria-labelledby={`${uid}-${id}`}
          key={id}
        >
          <div className="ver-copy">
            <span className="ver-category">
              <b>{number} / 07</b>
              {category}
            </span>
            <h3 id={`${uid}-${id}`}>{heading}</h3>
            <p>{body}</p>
          </div>
          <Graphic />
        </article>
      ))}
    </section>
  )
}
