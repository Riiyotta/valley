import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './routes/Layout.jsx'
import Home from './pages/Home.jsx'
import Pricing from './pages/Pricing.jsx'
import Product from './pages/Product.jsx'
import About from './pages/About.jsx'
import Compare from './pages/Compare.jsx'
import Playbooks from './pages/Playbooks.jsx'
import LandingTemplate from './pages/landing/LandingTemplate.jsx'
import AgencyLanding from './pages/landing/AgencyLanding.jsx'
import TryValley from './pages/landing/TryValley.jsx'
import LinkedinAutomation from './pages/landing/LinkedinAutomation.jsx'
import BlogIndex from './pages/blog/BlogIndex.jsx'
import BlogArchive from './pages/blog/BlogArchive.jsx'
import BlogPost from './pages/blog/BlogPost.jsx'
import CaseStudiesIndex from './pages/casestudies/CaseStudiesIndex.jsx'
import CaseStudy from './pages/casestudies/CaseStudy.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

// The three template landing pages render one component from per-page data.
const TEMPLATE_LANDINGS = [
  'linkedin-lead-generation-for-b2b-saas',
  'lead-generation-for-software-companies',
  'lead-generation-for-content-agencies',
]

// Internal routes only (www.joinvalley.co paths). Links to other domains, such as
// beta.joinvalley.co and forms.withsurface.com, stay external and are not built.
export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="blog/archive" element={<BlogArchive />} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="about" element={<About />} />
          <Route path="compare" element={<Compare />} />
          <Route path="playbooks" element={<Playbooks />} />
          {TEMPLATE_LANDINGS.map((slug) => (
            <Route key={slug} path={slug} element={<LandingTemplate slug={slug} />} />
          ))}
          <Route path="linkedin-outreach-for-agencies" element={<AgencyLanding />} />
          <Route path="tryvalley" element={<TryValley />} />
          <Route path="linkedin-automation" element={<LinkedinAutomation />} />
          <Route path="blog" element={<BlogIndex />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          {/* Live 308-redirects /blog_featured/* to /blog. */}
          <Route path="blog_featured/*" element={<Navigate to="/blog" replace />} />
          <Route path="casestudies" element={<CaseStudiesIndex />} />
          <Route path="casestudies/:slug" element={<CaseStudy />} />
          <Route path="terms-of-service" element={<Legal kind="terms" />} />
          <Route path="privacy-policy" element={<Legal kind="privacy" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
