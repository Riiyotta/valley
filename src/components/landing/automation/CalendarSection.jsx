import '../../../styles/pages/landing/automation/calendar.css'
import { HUBSPOT_URL } from '../both/links.js'

// "Calendar Section" (spec 6 la-calendar; dump [11]): heading plus the live page's HubSpot
// meetings iframe (845x893 at desktop, full width x 876 below). The link under the frame is
// the fallback if the third-party embed doesn't load; it is visually hidden but reachable.
export default function CalendarSection() {
  return (
    <section id="la-calendar" className="la-cal">
      <div className="la-cal__content">
        <div className="la-cal__head">
          <h3 data-lp-appear="20" data-lp-appear-delay="0.2" data-lp-appear-amount="0.5">The only way outbound should be done on LinkedIn</h3>
          <iframe
            className="la-cal__frame"
            data-lp-appear="20"
            data-lp-appear-delay="0.2"
            data-lp-appear-amount="0.5"
            src={HUBSPOT_URL}
            title="Book a meeting with Valley"
            loading="lazy"
          />
          <a className="sr-only" href={HUBSPOT_URL}>
            Book a meeting with Valley on HubSpot
          </a>
        </div>
      </div>
    </section>
  )
}
