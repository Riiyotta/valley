import Comparison from '../components/Comparison.jsx'
import '../styles/pages/compare/page.css'

// /compare: fixed shared Nav (Layout), one content section (.vc), shared Footer.
// On this page Framer sets the component's demo link to HubSpot (spec compare.md 2.5).
const DEMO = 'https://meetings.hubspot.com/zayd-from-valley/tryvalley'

export default function Compare() {
  return (
    <main className="cmp-page">
      <div className="cmp-frame">
        <Comparison demoLink={DEMO} />
      </div>
    </main>
  )
}
