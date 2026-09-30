import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'

// Per-route nav behaviour, from the page recons:
// - /pricing, /product, /about: the fixed nav plays the Framer appear on load
//   (spec/pages/pricing.md 8.1, product.md 6.1, about.md 3).
// - /playbooks: nav wrapper is sticky (in flow), and its page breakpoints put the desktop
//   header at >= 1440 (spec/pages/playbooks.md 1). No appear there.
// - /casestudies: desktop header from 1100; blog posts and case studies: from 1280
//   (tablet audit, measured on live).
// Every other route (including /) keeps the homepage nav unchanged.
const APPEAR_ROUTES = ['/pricing', '/product', '/about']

function navPropsFor(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/playbooks') return { sticky: true, desktopMin: 1440 }
  if (APPEAR_ROUTES.includes(path)) return { appear: true }
  if (path === '/casestudies') return { desktopMin: 1100 }
  if (/^\/(blog|casestudies)\/[^/]+$/.test(path) && path !== '/blog/archive') return { desktopMin: 1280 }
  return {}
}

// Shared chrome for every page. Scrolls to the top on route change unless the
// URL targets an in-page anchor.
export default function Layout() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  const navProps = navPropsFor(pathname)
  return (
    <>
      {/* Keyed by route on appear routes so client-side navigation replays the load appear. */}
      <Nav key={navProps.appear ? pathname : 'nav'} {...navProps} />
      <Outlet />
      <Footer />
    </>
  )
}
