// Agency "Process V2" workflow (spec 4.3): left-aligned heading and three step cards.
export default function AgencyWorkflow({ data }) {
  return (
    <section id="agency-workflow" className="lp-flow" data-framer-name="Process V2">
      <div className="lp-flow__container">
        <div className="lp-flow__heading">
          <div className="lp-eyebrow lp-eyebrow--team">
            <div className="lp-tag__dot" />
            <p className="lp-alabel">{data.eyebrow}</p>
          </div>
          <h2 className="lp-ah2">{data.h2}</h2>
          <p className="lp-alead lp-flow__lead">{data.lead}</p>
        </div>
        <div className="lp-flow__grid" data-framer-name="agencyWorkflow">
          {data.steps.map((s, i) => (
            <div key={s.num} className="lp-step" data-framer-name={`agencyStep${i}`}>
              <img className="lp-step__img" src={s.img} alt="" />
              <div className="lp-step__content">
                <p className="lp-alabel">{s.num}</p>
                <h3 className="lp-step__title">{s.title}</h3>
                <p className="lp-abody">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
