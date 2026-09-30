import { Link } from 'react-router-dom'

// /about mission letter ("Frame 2085663181"), spec/pages/about.md section 2 mission.
// The art card layers 7 outline shapes over the painted valley with mix-blend-mode: hard-light.
const SHAPES = [
  ['01-mission-148x152.svg', 'ab-shape-1'],
  ['02-mission-149x152.svg', 'ab-shape-2'],
  ['03-mission-265x195.svg', 'ab-shape-3'],
  ['04-mission-25x24.svg', 'ab-shape-4'],
  ['05-mission-25x25.svg', 'ab-shape-5'],
  ['06-mission-41x41.svg', 'ab-shape-6'],
  ['07-mission-28x29.svg', 'ab-shape-7'],
]

export default function Mission() {
  return (
    <div className="ab-mission" data-framer-name="Frame 2085663181">
      <div className="ab-mission-inner">
        <div className="ab-mission-row">
          <div className="ab-mission-art">
            <div className="ab-mission-art-inner">
              <img
                className="ab-mission-painting"
                src="/assets/img/5Elg5B9vPo2Xblz2XfnsvZzgqlA.png"
                alt="Painted Valley landscape with open sky, green hills and a winding river"
                decoding="async"
              />
              <div className="ab-mission-shapes" aria-hidden="true">
                {SHAPES.map(([file, cls]) => (
                  <img key={file} className={cls} src={`/assets/pages/about/svg/${file}`} alt="" />
                ))}
              </div>
            </div>
          </div>
          <div className="ab-mission-letter">
            <div className="ab-mission-body">
              <h2 className="ab-mission-title">Built by the outbound-obsessed.</h2>
              <div className="ab-mission-text">
                <p>
                  The game has changed for sales reps. Prospects are seeing through templated “spray and pray” outbound
                  sequences — or worse, not seeing them at all. Volume-based outreach &amp; robotic sales reps are dead.
                </p>
                <p>
                  Today’s best reps are running an outbound playbook built on personalization, relevance, and timing. We
                  built <Link to="/">Valley</Link> to help businesses like yours scale &amp; automate the complex world of
                  what’s required to run a profitable outbound motion today.
                </p>
                <p>
                  It used to take an army of SDRs to achieve hyper-personalization at scale. We designed{' '}
                  <Link to="/">Valley</Link> to be your army of one. It’s a single AI-led outbound engine that understands
                  your product, clones your voice, and learns all about your prospects — then fills up your sales calendar to
                  prove it.
                </p>
                <p>
                  Valley is the hyper-personalized AI sales rep that books you quality meetings while your team does literally
                  anything else.
                </p>
                <p>Signed</p>
              </div>
            </div>
            <div className="ab-mission-sign">
              <div className="ab-mission-signature" role="img" aria-label="Zayd Ali signature" />
              <div className="ab-mission-list">
                <div className="ab-mission-name">
                  <p>Zayd Ali</p>
                  <p>
                    CEO @<Link to="/">Valley</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
