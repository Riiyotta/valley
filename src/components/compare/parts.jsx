// Small shared pieces of the .vc component, ported from
// spec/pages/compare/source/ValleyWorkflowComparison.wJFjzal1.mjs (functions f, p, m, h, g, j, A).
import { STATUS_ICON, STATUS_LABEL } from '../../data/compareCompetitors.js'

// Valley mark (source `f`).
export function ValleyMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" fill="none">
      <path d="M8 5L20 17M40 5L28 17M4 23H17M31 23H44M8 40L24 24L40 40M24 25V46" stroke="currentColor" strokeWidth="5" />
    </svg>
  )
}

// Favicon + name (source `p`). Favicons are local copies (ASSETS.md).
export function CompanyLabel({ company }) {
  return (
    <>
      <img
        src={company.favicon}
        width="20"
        height="20"
        alt=""
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.visibility = 'hidden'
        }}
      />
      <span>{company.name}</span>
    </>
  )
}

// Status label with icon (source `m`).
export function Status({ status }) {
  return (
    <span className={`vc-status vc-status-${status}`}>
      <span aria-hidden="true">{STATUS_ICON[status]}</span>
      {STATUS_LABEL[status]}
    </span>
  )
}

export const channelName = (id) => (id === 'email' ? 'Email' : 'LinkedIn')

// Symbol drawn on the SVG rival node (source `j`).
export const svgSymbol = (status) =>
  status === 'native' ? '✓' : ['unavailable', 'unverified'].includes(status) ? '—' : '◐'

// Email / LinkedIn sub-facts of the "reach" stage (source `h`).
export function channelFacts(record) {
  return (
    record.stages
      .find((s) => s.id === 'reach')
      ?.subfacts?.filter((f) => f.id === 'email' || f.id === 'linkedin') || []
  )
}

// Channel badges (source `g`).
export function ChannelBadges({ record }) {
  const facts = channelFacts(record)
  if (!facts.length) return null
  return (
    <span className="vc-channel-badges" aria-label={`${record.name} outreach channels`}>
      {facts.map((f) => (
        <span key={f.id} className={`vc-channel-badge vc-channel-${f.status}`}>
          <span>{channelName(f.id)}</span>
          <span aria-hidden="true">{STATUS_ICON[f.status]}</span>
          <span>{f.status === 'integration' ? 'Other tool' : STATUS_LABEL[f.status]}</span>
        </span>
      ))}
    </span>
  )
}
