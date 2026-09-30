import { useLayoutEffect, useRef, useState } from 'react'
import '../styles/nav.css'

// CLONE_SPEC.md section 7 (nav). Desktop "Large Desktop" variant at >= 1200px,
// "Phone - Close" / "Phone Open" below that. Both variants are rendered and toggled with CSS,
// the same way Framer ships its breakpoint variants.

const LOGIN = 'https://beta.joinvalley.co/login'
const SIGNUP = 'https://beta.joinvalley.co/signup'

const LINKS_BEFORE_PRODUCT = [{ label: 'Home', href: './' }]
const LINKS_AFTER_PRODUCT = [
  { label: 'Valley vs. Competition', href: './compare' },
  { label: 'Customers', href: './casestudies' },
  { label: 'Agencies', href: './linkedin-outreach-for-agencies' },
  { label: 'Pricing', href: './pricing' },
]

// "Rolling text" link: two stacked copies, 20px apart, in a clipped box. Hover shifts both
// up 20px with the live spring (transition in nav.css).
function RollLink({ label, href }) {
  return (
    <a className="nav-link" href={href}>
      <span className="nav-roll">
        <span className="nav-roll-inner">
          <span>{label}</span>
          <span aria-hidden="true">{label}</span>
        </span>
      </span>
    </a>
  )
}

function ProductMenu({ mobile }) {
  return (
    <div className={mobile ? 'vpm vpm-mobile' : 'vpm'}>
      <details>
        <summary>
          Product
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="m3 4 3 3 3-3" />
          </svg>
        </summary>
        <div className="vpm-panel">
          <a href="/product">
            <span>Explore Product <b>↗</b></span>
            <small>See how Valley works, from signal to reply.</small>
          </a>
          <a href="/playbooks">
            <span>All Playbooks <b>↗</b></span>
            <small>Find your next play. See every step.</small>
          </a>
        </div>
      </details>
    </div>
  )
}

function Links({ mobile }) {
  return (
    <>
      {LINKS_BEFORE_PRODUCT.map((l) => <RollLink key={l.label} {...l} />)}
      <ProductMenu mobile={mobile} />
      {LINKS_AFTER_PRODUCT.map((l) => <RollLink key={l.label} {...l} />)}
    </>
  )
}

function Cta() {
  return (
    <>
      <a className="nav-login" href={LOGIN}>Log in</a>
      <a className="nav-start" href={SIGNUP}><span>Start for free</span></a>
    </>
  )
}

// Route-aware props (set by routes/Layout.jsx; defaults reproduce the homepage exactly):
// - appear: Framer appear-on-load of the fixed wrapper (/pricing, /product, /about).
// - sticky: wrapper is position: sticky in normal flow instead of fixed (/playbooks).
// - desktopMin: viewport width where the desktop header starts; 1200 by default. Other
//   supported values (nav.css): 1100 (/casestudies), 1280 (blog posts, case studies),
//   1440 (/playbooks).
export default function Nav({ appear = false, sticky = false, desktopMin = 1200 }) {
  const [open, setOpen] = useState(false)
  const cardRef = useRef(null)
  // Open: grow the card from its closed height (48) to its natural height with the live
  // Framer spring (stiffness 400 / damping 50 / mass 1; easing in nav.css). The live site runs
  // it regardless of prefers-reduced-motion. Close is instant, as on live.
  useLayoutEffect(() => {
    const card = cardRef.current
    if (!card) return
    if (!open) {
      card.style.height = ''
      delete card.dataset.anim
      return
    }
    const to = card.getBoundingClientRect().height
    card.style.transition = 'none'
    card.style.height = '48px'
    card.dataset.anim = 'open'
    card.getBoundingClientRect() // commit the 48px start
    card.style.transition = ''
    card.style.height = `${to}px`
    const done = (e) => {
      if (e && e.target !== card) return
      card.style.height = ''
      delete card.dataset.anim
      card.removeEventListener('transitionend', done)
    }
    card.addEventListener('transitionend', done)
    return () => card.removeEventListener('transitionend', done)
  }, [open])
  return (
    <div
      className="nav-wrap"
      id="nav"
      data-appear={appear ? 'true' : undefined}
      data-sticky={sticky ? 'true' : undefined}
      data-bp={desktopMin === 1200 ? undefined : String(desktopMin)}
    >
      {/* Desktop: "Large Desktop" */}
      <header className="nav-desktop">
        <nav className="nav-bar" aria-label="Main">
          <a className="nav-logo" href="./" aria-label="Valley home" />
          <div className="nav-links">
            <Links />
          </div>
          <div className="nav-cta">
            <Cta />
          </div>
        </nav>
      </header>

      {/* Tablet + phone: "Phone - Close" / "Phone Open". Opening animates the card height
          (Framer spring stiffness 400, damping 50, mass 1); the bars switch to an X instantly. */}
      <header className="nav-mobile" data-open={String(open)}>
        <nav className="nav-card" aria-label="Main" ref={cardRef}>
          <div className="nav-mob-row">
            <a className="nav-logo" href="./" aria-label="Valley home" />
            <button
              className="nav-burger"
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <i className="nav-bar-1" />
              <i className="nav-bar-2" />
              <i className="nav-bar-3" />
              <i className="nav-bar-4" />
            </button>
          </div>
          {open && (
            <>
              <div className="nav-mob-links">
                <Links mobile />
              </div>
              <div className="nav-mob-cta">
                <Cta />
              </div>
            </>
          )}
        </nav>
      </header>
    </div>
  )
}
