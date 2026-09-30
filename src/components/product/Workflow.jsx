import OutboundTeam from './OutboundTeam.jsx'
import IntelligenceRows from './IntelligenceRows.jsx'
import ExecutionRows from './ExecutionRows.jsx'
import LearningRow from './LearningRow.jsx'

// "The complete outbound workflow" (id how-it-works), spec/pages/product.md 3. Intro card, then
// seven Framer wrappers, one code-component row each. From 810px up the wrappers are
// position: sticky with top 99..117px (+3px each) and z-index 1..7, so each card parks 3px below
// the previous one and the stack releases together at the end of the column (product.css).
// Below 810 they are in normal flow.
const ROWS = [
  ['prospecting', <IntelligenceRows row="prospecting" />],
  ['qualification', <IntelligenceRows row="qualification" />],
  ['research', <IntelligenceRows row="research" />],
  ['message', <ExecutionRows section="message" />],
  ['channels', <ExecutionRows section="channels" />],
  ['analytics', <ExecutionRows section="analytics" />],
  ['learning', <LearningRow />],
]

export default function Workflow() {
  return (
    <div className="pd-workflow" id="how-it-works" data-framer-name="The complete outbound workflow">
      <div className="pd-workflow-col" data-framer-name="Current Valley capabilities">
        <div className="pd-workflow-item" data-framer-name="An entire outbound team">
          <OutboundTeam />
        </div>
        {ROWS.map(([name, row], i) => (
          <div className={`pd-workflow-item pd-stack pd-stack-${i + 1}`} data-framer-name={name} key={name}>
            {row}
          </div>
        ))}
      </div>
    </div>
  )
}
