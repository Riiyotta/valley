import AboutHero from '../components/about/AboutHero.jsx'
import Mission from '../components/about/Mission.jsx'
import Team from '../components/about/Team.jsx'
import { Backers, Hiring } from '../components/about/Backers.jsx'
import '../styles/pages/about/about.css'

// /about, section order from spec/pages/about.md section 1. Nav (with its load appear) and
// footer come from routes/Layout.jsx. Layer nesting follows the live page: hero + (mission, team)
// share a column with gaps 72 / 48; backers and hiring follow with no gap.
export default function About() {
  return (
    <main className="about-page">
      <div className="ab-top">
        <AboutHero />
        <div className="ab-body">
          <Mission />
          <Team />
        </div>
      </div>
      <div className="ab-bottom">
        <Backers />
        <Hiring />
      </div>
    </main>
  )
}
