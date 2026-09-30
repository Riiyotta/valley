// Track key + the 1200x435 "landscape" SVG (source function `v`). Two arcs across the seven
// stages: Valley on the upper arc (photo-filled, with the .vc-light sweep and the .vc-trace
// draw-in), the competitor on the lower arc, coloured only where its stage is `native`.
// The parent re-keys .vc-main per competitor, so both CSS animations restart on every switch.
import { useId } from 'react'
import { STAGES, STATUS_LABEL } from '../../data/compareCompetitors.js'
import { ChannelBadges, CompanyLabel, ValleyMark, channelFacts, channelName, svgSymbol } from './parts.jsx'

const TRACK_IMAGE = '/assets/img/DzF7ltBGreQELkgImDCaxxldqH0.jpg'
const VALLEY_PATH = 'M80 272 Q600 -12 1120 272'
const RIVAL_PATH = 'M80 382 Q600 98 1120 382'

export default function TrackDiagram({ company, record }) {
  const uid = useId().replace(/:/g, '')
  const label =
    `Seven-stage overview. Valley: all seven stages built in, email varies by plan. ${company.name}: ` +
    `${record.stages.map((s) => `${s.label}: ${STATUS_LABEL[s.status]}`).join('; ')}. ` +
    `${channelFacts(record).map((f) => `${channelName(f.id)}: ${STATUS_LABEL[f.status]}`).join('; ')}. ` +
    'Colored competitor segments mark only stages that meet the criterion.'

  return (
    <div className="vc-arc" role="img" aria-label={label}>
      <div className="vc-track-key" aria-hidden="true">
        <div className="vc-track-brand">
          <i className="vc-track-swatch" />
          <ValleyMark />
          <span>Valley</span>
          <small>Upper track</small>
        </div>
        <div className="vc-track-rival-group">
          <div className="vc-track-brand vc-track-brand-rival">
            <i className="vc-track-swatch vc-track-swatch-rival" />
            <CompanyLabel company={company} />
            <small>Lower track</small>
          </div>
          <ChannelBadges record={record} />
        </div>
      </div>
      <svg aria-hidden="true" viewBox="0 0 1200 435" className="vc-landscape" focusable="false">
        <defs>
          <mask id={`track-${uid}`}>
            <path d={VALLEY_PATH} fill="none" stroke="white" strokeWidth="94" strokeLinecap="round" />
          </mask>
          <clipPath id={`native-windows-${uid}`}>
            {record.stages.map((s, i) =>
              s.status === 'native' ? (
                <rect
                  key={s.id}
                  className="vc-native-segment"
                  data-stage={s.id}
                  x={80 + (1040 * i) / 6 - 1040 / 12}
                  y="100"
                  width={1040 / 6}
                  height="390"
                />
              ) : null,
            )}
          </clipPath>
          <mask id={`rival-track-${uid}`}>
            <path
              d={RIVAL_PATH}
              clipPath={`url(#native-windows-${uid})`}
              fill="none"
              stroke="white"
              strokeWidth="47"
              strokeLinecap="round"
            />
          </mask>
          <linearGradient id={`wash-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#254a50" stopOpacity=".03" />
            <stop offset="1" stopColor="#213c4a" stopOpacity=".3" />
          </linearGradient>
          <linearGradient id={`light-${uid}`}>
            <stop stopColor="#f7edb1" stopOpacity="0" />
            <stop offset=".5" stopColor="#f7edb1" stopOpacity=".6" />
            <stop offset="1" stopColor="#f7edb1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={RIVAL_PATH} fill="none" stroke="#e1e3de" strokeWidth="47" strokeLinecap="round" />
        <g mask={`url(#rival-track-${uid})`}>
          <image href={TRACK_IMAGE} x="0" y="110" width="1200" height="390" preserveAspectRatio="xMidYMid slice" />
          <rect x="0" y="110" width="1200" height="390" fill="#f7f9f7" opacity=".3" />
        </g>
        <g mask={`url(#track-${uid})`}>
          <rect width="1200" height="390" fill="#839d82" />
          <image href={TRACK_IMAGE} x="0" y="0" width="1200" height="390" preserveAspectRatio="xMidYMid slice" />
          <rect width="1200" height="390" fill={`url(#wash-${uid})`} />
          <rect className="vc-light" x="-420" y="0" width="420" height="390" fill={`url(#light-${uid})`} />
        </g>
        <path
          key={company.id}
          className="vc-trace"
          d={VALLEY_PATH}
          fill="none"
          stroke="#eff4d5"
          strokeOpacity=".65"
          strokeWidth="1.5"
          pathLength="1"
        />
        {STAGES.map((stage, n) => {
          const t = n / 6
          const x = 80 + 1040 * t
          const y = 272 - 568 * t * (1 - t)
          const s = record.stages[n]
          const native = s.status === 'native'
          return (
            <g key={stage.id}>
              <text x={x} y={y - 117} textAnchor="middle" className="vc-svg-number">
                0{n + 1}
              </text>
              <text x={x} y={y - 95} textAnchor="middle" className="vc-svg-label">
                {stage.lines.map((line, li) => (
                  <tspan key={line} x={x} dy={li === 0 ? 0 : 18}>
                    {line}
                  </tspan>
                ))}
              </text>
              <circle cx={x} cy={y} r="16" fill="#f7f9ee" stroke="#d3e5cb" strokeWidth="2" />
              <path d={`M${x - 6} ${y}l4 4 8-8`} fill="none" stroke="#254d3a" strokeWidth="2.5" />
              <line x1={x} y1={y + 53} x2={x} y2={y + 88} stroke="#bdc7bf" strokeDasharray="2 4" />
              <circle
                className="vc-rival-node"
                data-stage={stage.id}
                data-status={s.status}
                cx={x}
                cy={y + 110}
                r="13"
                fill={native ? '#f0f5e7' : '#f7f8f3'}
                stroke={native ? '#537253' : '#a7afa7'}
                strokeWidth={native ? '2' : '1.5'}
              />
              <text
                x={x}
                y={y + 115}
                textAnchor="middle"
                className="vc-svg-symbol"
                data-status={s.status}
                fill={native ? '#36583a' : '#4f5e4b'}
              >
                {svgSymbol(s.status)}
              </text>
              <title>
                {stage.label}: {STATUS_LABEL[s.status]}
              </title>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
