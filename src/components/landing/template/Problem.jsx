import LandingTag from '../shared/LandingTag.jsx'

// Problem "Process V2" (spec 3.5): heading, hatch stripe, three step cards. No motion.
// Card 2's watercolor uses object-position 49% 20.1%.
const BG_POSITION = [undefined, '49% 20.1%', undefined]

export default function Problem({ data }) {
  return (
    <section id="problem" className="lp-problem" data-framer-name="Process V2">
      <div className="lp-problem__container">
        <div className="lp-heading">
          <LandingTag as="code">{data.eyebrow}</LandingTag>
          <h2 className="lp-h2">{data.h2}</h2>
          {data.lead && <h2 className="lp-lead">{data.lead}</h2>}
        </div>
        <div className="lp-problem__strip" data-framer-name="Use Cases - Product Page 2">
          <img className="lp-problem__hatch" src={data.stripe} alt="" />
          <div className="lp-problem__cards">
            {data.cards.map((c, i) => (
              <div key={c.title} className="lp-pcard" data-framer-name="Step Card Active">
                <div className="lp-pcard__top">
                  <div className="lp-pcard__container">
                    <div className="lp-pcard__heading">
                      <p className="lp-pcard__title">{c.title}</p>
                      <p className="lp-pcard__body">{c.body}</p>
                    </div>
                    <div className="lp-pcard__tag">
                      <p>{c.tag}</p>
                    </div>
                  </div>
                </div>
                <div className="lp-pcard__art">
                  <img className="lp-pcard__bg" src={c.bg} alt="" style={{ objectPosition: BG_POSITION[i] }} />
                  <div className="lp-pcard__shot">
                    <img src={c.screenshot} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
