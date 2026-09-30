// "agencyPaths" (spec 4.5): header panel on the watercolor, three path cards on a 1px #cbd6d8
// hairline grid, the budget block and the demo note. At phone the cards clip to 56px (CSS).
export default function AgencyPaths({ data }) {
  return (
    <div id="agency-paths" className="lp-apaths" data-framer-name="agencyPaths">
      <div className="lp-apaths__header" data-framer-name="pathsHeader">
        <img className="lp-apaths__art" src={data.art} alt="" />
        <div className="lp-apaths__panel" data-framer-name="pathsHeaderPanel">
          <p className="lp-alabel">{data.eyebrow}</p>
          <h2 className="lp-apaths__h2">{data.h2}</h2>
          <p className="lp-alead">{data.lead}</p>
        </div>
      </div>
      <div className="lp-apaths__grid" data-framer-name="pathsGrid">
        {data.cards.map((c, i) => (
          <div key={c.label} className="lp-apath" data-framer-name={`pathCard${i}`}>
            <p className="lp-apath__label">{c.label}</p>
            <h3 className="lp-apath__title">{c.title}</h3>
            <p className="lp-apath__line">{c.line}</p>
            <p className="lp-inter">{c.body}</p>
            <p className="lp-apath__label lp-apath__label--owns">{c.ownsLabel}</p>
            <p className="lp-inter">{c.owns}</p>
          </div>
        ))}
      </div>
      <div className="lp-apaths__budget" data-framer-name="agencyBudget">
        <p className="lp-apaths__budget-title">{data.budget.title}</p>
        <p className="lp-inter">{data.budget.body}</p>
        <a className="lp-apaths__cta" href={data.budget.cta.href} data-framer-name="agencyCTA">
          {data.budget.cta.label}
        </a>
      </div>
      <div className="lp-apaths__note" data-framer-name="agencyDemoNote">
        <p className="lp-apaths__note-title">{data.note.title}</p>
        <p className="lp-apaths__note-body">{data.note.body}</p>
      </div>
    </div>
  )
}
