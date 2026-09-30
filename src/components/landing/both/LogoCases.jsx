import '../../../styles/pages/landing/both/logo-cases.css'
import {
  TRYVALLEY_ROWS,
  AUTOMATION_DESKTOP_ROWS,
  AUTOMATION_PHONE_GRID,
  AUTOMATION_PHONE_TAIL,
} from './logoCasesData.js'

// "Logos + Case Study Popup" (spec 5.2; linkedin-automation layers "Desktop" / "Content").
// Case-study logos link to the customer's own site and show a popup card above the logo on
// hover. The popup's inner styling was not captured (it mounts on hover, outside the load
// CSSOM); its box (165x191, centred over the slot) and texts are from the spec, the rest is
// matched to states/try_logo_hover.png.

function Popup({ popup }) {
  return (
    <span className="lc-popup" aria-hidden="true">
      <span className="lc-popup__top">
        <img className="lc-popup__logo" src={popup.logo} alt="" />
        <span className="lc-popup__arrow">↗</span>
      </span>
      <span className="lc-popup__title">{popup.title}</span>
      <span className="lc-popup__icp">{popup.icp}</span>
    </span>
  )
}

function Logo({ item }) {
  const img = (
    <img
      className="lc-img"
      src={item.src}
      alt={item.alt}
      width={item.w}
      height={item.h}
      style={{ width: item.w, height: item.h, objectFit: item.fit || 'cover' }}
      loading="lazy"
    />
  )

  if (item.type === 'case') {
    const gap = item.gap === 'sb' ? undefined : item.gap
    return (
      <div className="lc-slot lc-slot--case" style={item.slotH ? { height: item.slotH } : undefined}>
        <a
          className="lc-case"
          href={item.href}
          data-sb={item.gap === 'sb' ? '' : undefined}
          style={gap !== undefined ? { gap } : undefined}
        >
          {img}
          <span className="lc-label" data-small={item.smallLabel ? '' : undefined}>
            Case Study
          </span>
        </a>
        <Popup popup={item.popup} />
      </div>
    )
  }

  if (item.type === 'boxed') {
    return (
      <div className="lc-slot">
        <a className="lc-boxed" href={item.href}>
          {img}
        </a>
      </div>
    )
  }

  return (
    <div className="lc-slot" style={item.slotH ? { height: item.slotH } : undefined}>
      {item.href ? (
        <a className="lc-plain" href={item.href}>
          {img}
        </a>
      ) : (
        img
      )}
    </div>
  )
}

export default function LogoCases({ variant }) {
  if (variant === 'tryvalley') {
    return (
      <section id="logo-cases" className="lc lc--try" aria-label="Customers">
        <div className="lc-content">
          <p className="lc-heading" data-lp-appear="15" data-lp-appear-delay="0.5">
            150+ teams trust Valley because we keep their calendars full of high quality prospects
          </p>
          <div className="lc-logos" data-lp-appear="15" data-lp-appear-delay="0.5" data-lp-appear-bp="all">
            {TRYVALLEY_ROWS.map((row, i) => (
              <div className="lc-row" key={i}>
                {row.map((item, j) => (
                  <Logo item={item} key={j} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="logo-cases" className="lc lc--auto" aria-label="Customers">
      <img
        className="lc-bg"
        src="/assets/pages/landing/img/GYo82zsW5GvTwz5BUTfdARIZrY.jpg"
        alt=""
        aria-hidden="true"
      />
      <div className="lc-content lc-content--desktop">
        <p className="lc-heading" data-lp-appear="15" data-lp-appear-delay="0.5">
          300+ teams trust Valley’s LinkedIn automation because we keep their calendars full of high
          quality prospects
        </p>
        <div className="lc-grid" data-lp-appear="15" data-lp-appear-delay="0.5">
          {AUTOMATION_DESKTOP_ROWS.map((row, i) => (
            <div className={`lc-grid__row lc-grid__row--${i + 1}`} key={i}>
              {row.map((item, j) => (
                <Logo item={item} key={j} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="lc-content lc-content--phone">
        <p className="lc-heading">
          150+ teams trust Valley because we keep their calendars full of high quality prospects
        </p>
        <div className="lc-phone">
          <div className="lc-phone__grid">
            {AUTOMATION_PHONE_GRID.map((item, j) => (
              <Logo item={item} key={j} />
            ))}
          </div>
          <Logo item={AUTOMATION_PHONE_TAIL} />
        </div>
      </div>
    </section>
  )
}
