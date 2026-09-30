import '../../../styles/pages/landing/automation/features.css'
import useRiveCanvas from './useRiveCanvas.js'

// "Feature Section" (spec 6 la-features; dump section [3]).
// Each card's lower half is a 300px "BG Grad" frame: a blurred photo (brightness .9,
// opacity .8) under a 300x300 transparent <canvas> playing one artboard of
// XgB0o9fJSEbmDKrQIb2G97OH9n4.riv (ASSETS_GAPFILL 1.3: cards use variants 5-8 -> illo1-4).
// Autoplay on load, loops forever, no inputs or listeners. Live keeps it running under
// prefers-reduced-motion, so the clone does too.
const CARDS = [
  { title: 'Zero complex integrations', img: 'dtRktHlARsttJsKSZbUw244HeU.png', artboard: 'illo1' },
  { title: 'Talks like you', img: '4vW4VmcBU27VlUmHmFX1fy582lo.png', artboard: 'illo2' },
  { title: 'Keeps account safe', img: 'BaYYEM6uPfe2e8kfQbG496DoyI.png', artboard: 'illo3' },
  { title: 'One person powerhouse', img: 'SVw8cbcJKKM1TQhIlKwHkQOA66Y.png', artboard: 'illo4' },
]

function FeatureRive({ artboard }) {
  const { canvasRef } = useRiveCanvas({ file: 'XgB0o9fJSEbmDKrQIb2G97OH9n4.riv', artboard })
  return <canvas ref={canvasRef} width={300} height={300} />
}

export default function Features() {
  return (
    <section id="la-features" className="la-features">
      <div className="la-features__content">
        <div className="la-features__head">
          <p className="la-outline-label" data-lp-appear="15" data-lp-appear-bp="all">End to End LinkedIN Automation</p>
          <div className="la-features__title">
            <h2 data-lp-appear="20" data-lp-appear-delay="0.2" data-lp-appear-amount="0.5">Finally, a LinkedIn Automation tool that</h2>
            <h3 data-lp-appear="20" data-lp-appear-delay="0.2" data-lp-appear-amount="0.5">delivers</h3>
          </div>
        </div>
        <div className="la-features__cards">
          {CARDS.map((c, i) => (
            <div className="la-feature" key={c.title} data-lp-appear="15" data-lp-appear-delay={0.6 + 0.2 * i}>
              <div className="la-feature__head">
                <h6>{c.title}</h6>
              </div>
              <div className="la-feature__art">
                <img
                  src={`/assets/pages/landing/img/${c.img}`}
                  alt="a blurry image of a cell phone with a blurry background"
                  loading="lazy"
                />
                <div className="la-feature__canvas" data-rive-slot="">
                  <FeatureRive artboard={c.artboard} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
