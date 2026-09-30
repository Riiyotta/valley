import { LOGOS_MIGRATED } from '../../../data/landing/templates.js'
import '../../../styles/pages/landing/shared.css'

// Logos "Variant 1" (desktop) / "Variant 3" (phone), spec/pages/landing.md 3.4. Three
// "migrated off" groups with a competitor chip on each top edge, then the 6-column grid (2 below
// 1200). Logos sit at opacity .7, 40px tall; `dot` logos get the homepage Dot Blink.
// Competitor chip image heights from dumps (Heyreach 168x38 contain, Expandi 168x49 cover,
// Lemlist 168x56 contain), centred in the 184x48 chip.
const CHIP_IMG = {
  Heyreach: { height: 38, objectFit: 'contain' },
  Expandi: { height: 49, objectFit: 'cover' },
  Lemlist: { height: 56, objectFit: 'contain' },
}

function Logo({ logo }) {
  return (
    <div className="lp-logo">
      {logo.dot && <div className="lp-logo__dot animate-dot-blink" data-framer-name="Dot Blink" />}
      <div className="lp-logo__img">
        <img src={logo.src} alt={logo.alt} />
      </div>
    </div>
  )
}

export default function LogosMigrated({ data = LOGOS_MIGRATED }) {
  return (
    <section id="logos-migrated" className="lp-logos" data-framer-name="Variant 1">
      <p className="lp-logos__heading">{data.heading}</p>
      <div className="lp-logos__container" data-framer-name="Logo-container">
        <div className="lp-logos__migrated" data-framer-name="Tag">
          {data.migratedLabel}
        </div>
        <div className="lp-logos__groups">
          {data.groups.map((group, g) => {
            const chip = data.competitors[g]
            return (
              <div key={g} className="lp-logos__group">
                <div className="lp-logos__col">
                  <Logo logo={group[0]} />
                  <Logo logo={group[1]} />
                </div>
                <div className="lp-logos__col">
                  <Logo logo={group[2]} />
                  <Logo logo={group[3]} />
                </div>
                <div className="lp-logos__chip" data-framer-name="Tag">
                  <img src={chip.src} alt={chip.alt} style={CHIP_IMG[chip.alt]} />
                </div>
              </div>
            )
          })}
        </div>
        <div className="lp-logos__grid-wrap">
          <div className="lp-logos__grid">
            {data.grid.map((logo, i) => (
              <Logo key={i} logo={logo} />
            ))}
          </div>
        </div>
        <div className="lp-logos__vector" data-framer-name="Vector 1194233990" aria-hidden="true" />
      </div>
    </section>
  )
}
