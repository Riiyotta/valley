import Reveal from './Reveal.jsx'

// /pricing "Calendar Section", spec/pages/pricing.md section 5. Embeds the same HubSpot
// meetings URL as the live iframe (third-party content, not rebuilt).
const HUBSPOT = 'https://meetings.hubspot.com/zayd-from-valley/tryvalley'

export default function CalendarSection() {
  return (
    <section className="pr-calendar" id="cal-pricing" data-framer-name="Calendar Section">
      <div className="pr-calendar-card">
        <div className="pr-calendar-inner">
          <Reveal className="pr-calendar-heading" y={20} delay={0.2} threshold={0.5}>
            <h2>See what Valley could do for your team.</h2>
          </Reveal>
          <div className="pr-calendar-embed">
            <iframe src={HUBSPOT} title="Book a meeting with Valley" />
          </div>
        </div>
      </div>
    </section>
  )
}
