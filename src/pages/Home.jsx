import Hero from '../components/Hero.jsx'
import Logos from '../components/Logos.jsx'
import Stories from '../components/Stories.jsx'
import Endorsement from '../components/Endorsement.jsx'
import Steps from '../components/Steps.jsx'
import Jobs from '../components/Jobs.jsx'
import Showcase from '../components/Showcase.jsx'
import Integrations from '../components/Integrations.jsx'
import TeamFit from '../components/TeamFit.jsx'
import WallOfLove from '../components/WallOfLove.jsx'
import PricingFaq from '../components/PricingFaq.jsx'
import ClosingCta from '../components/ClosingCta.jsx'

// Page order from CLONE_SPEC.md section 3. The nav is position: fixed and the page
// reserves no space for it (the hero's top padding clears it).
export default function Home() {
  return (
    <main>
      <Hero />
      <Logos />
      <Stories />
      <Endorsement />
      <Steps />
      <Jobs />
      <Showcase />
      <Integrations />
      <TeamFit />
      <WallOfLove />
      <PricingFaq />
      <ClosingCta />
    </main>
  )
}
