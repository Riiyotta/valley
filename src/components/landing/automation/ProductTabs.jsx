import { useState } from 'react'
import '../../../styles/pages/landing/automation/tabs.css'

// "Process Section" product tab viewer (spec 6 la-product-tabs; dump [7]). Click only, no
// autoplay. Each tab swaps the whole variant: (a) blurred background, (b) overlay and
// (c) screenshot, per spec/pages/ASSETS_GAPFILL.md section 2. Live reuses the Dashboard
// screenshot's alt text ("Valley Dashboard") on every tab; kept verbatim. The spec gives cover for
// every screenshot, but live (computed style, 2026-09-30) uses object-fit: contain on Approvals
// and cover with object-position 50% 0% on Inbox; `fit` carries those two.
const TAB_DIR = '/assets/pages/landing/tabs/'
const TABS = [
  { name: 'Dashboard', icon: 'dashboard', bg: 'wz7LBgOdjfBjcqdsOpbqnwRzS8.png', overlay: 'Gl9u6E5bAyZgehsQ4HjFHgoDGsc.png', shot: 'aSykMoBwdyZZEF29uxf3LFX2jwg.png', alt: 'Valley Dashboard' },
  { name: 'Warm Leads', icon: 'warm-leads', bg: 'Y8wPJesuiMeqUh5dOENX5mHZcPI.png', overlay: 'i5A2o1SyoGxRG5zVUPV81UnN90.png', shot: 'GmVsuieqSV4wmUNzTyqx33DH0s.png', alt: 'Valley Dashboard' },
  { name: 'Campaigns', icon: 'campaigns', bg: 'mCeLS0Xe1HYm45DCprT4AlnbYMc.png', overlay: 'P1zX2eeAsQUzCm1wXoJ6kg4JJOI.png', shot: 'Lmw7QVvFiUXkLVO08XRMHO928WM.png', alt: 'Valley Dashboard' },
  { name: 'Approvals', icon: 'approvals', bg: 'ZTpYocqn28qckZfjXwi45xPwLI.png', overlay: 'Ga9YX9lFU4ytZuLe8mzUGyDOtws.png', shot: 'wHp4b8C58t7DvTPtc5QUjfIj2o.png', alt: 'Valley Dashboard', fit: 'contain' },
  { name: 'Inbox', icon: 'inbox', bg: 'kTL2KIcchecrakdPEUWpcyjoX0.png', overlay: 'RNcTMZaMfOR9w21hgRNoIGG1fAk.png', shot: 'qn7iDFRcy3FObGkTOEKEPcNpuRA.png', alt: 'Valley Dashboard', fit: 'top' },
]

// Live quirk (ASSETS_GAPFILL 2): the Dashboard label and icon stay at opacity 1 while
// Campaigns, Approvals or Inbox is active, and only dim when Warm Leads is active.
function isLit(tab, active) {
  return tab === active || (tab === 'Dashboard' && active !== 'Warm Leads')
}

export default function ProductTabs() {
  const [active, setActive] = useState('Dashboard')
  const cur = TABS.find((t) => t.name === active)

  return (
    <section id="la-product-tabs" className="la-tabs">
      <div className="la-tabs__head">
        <p className="la-outline-label la-outline-label--wide" data-lp-appear="15">days to get results, not months</p>
        <h3 data-lp-appear="20" data-lp-appear-delay="0.2" data-lp-appear-amount="0.5">End to End LinkedIn Automation - No GTM Engineer needed</h3>
      </div>

      <div className="la-tabs__panel">
        <div className="la-tabs__bar" role="tablist" aria-label="Valley product views">
          <span className="la-tabs__divider" />
          {TABS.map(({ name, icon }) => (
            <span key={name} className="la-tabs__slot">
              <button
                type="button"
                role="tab"
                aria-selected={active === name}
                data-lit={isLit(name, active) ? '' : undefined}
                className="la-tabs__tab"
                onClick={() => setActive(name)}
              >
                <img src={`/assets/pages/landing/svg/tab-icon-${icon}.svg`} alt="" aria-hidden="true" />
                <span>{name}</span>
              </button>
              <span className="la-tabs__divider" />
            </span>
          ))}
        </div>
        <div className="la-tabs__stage" role="tabpanel" aria-label={active}>
          <img className="la-tabs__blur" src={TAB_DIR + cur.bg} alt="" aria-hidden="true" />
          <div className="la-tabs__wash">
            <img src={TAB_DIR + cur.overlay} alt="" aria-hidden="true" />
            <div className="la-tabs__frame">
              <div className="la-tabs__shot">
                <img src={TAB_DIR + cur.shot} alt={cur.alt} data-fit={cur.fit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
