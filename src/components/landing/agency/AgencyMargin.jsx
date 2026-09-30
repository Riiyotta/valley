// "agencyMargin" (spec 4.2): heading and three margin-leak cards with a "WITH VALLEY" answer.
export default function AgencyMargin({ data }) {
  return (
    <div id="agency-margin" className="lp-margin" data-framer-name="agencyMargin">
      <p className="lp-alabel">{data.eyebrow}</p>
      <h2 className="lp-margin__h2">{data.h2}</h2>
      <p className="lp-alead">{data.lead}</p>
      <div className="lp-margin__grid" data-framer-name="marginGrid">
        {data.cards.map((c, i) => (
          <div key={c.label} className="lp-mcard" data-framer-name={`marginCard${i}`}>
            <p className="lp-alabel">{c.label}</p>
            <h3 className="lp-mcard__title">{c.title}</h3>
            <p className="lp-abody">{c.body}</p>
            <div className="lp-mcard__answer" data-framer-name={`marginAnswer${i}`}>
              <p className="lp-alabel">{c.answerLabel}</p>
              <p className="lp-abody">{c.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
