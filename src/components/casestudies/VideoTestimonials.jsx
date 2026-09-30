import { useState } from 'react'
import { Reveal } from './shared.jsx'

// "Hear It From Them" (spec/pages/casestudies-index.md 4). Lazy YouTube embeds: a local thumbnail and
// play button; clicking swaps in the live embed URL. The cursor spotlight is skipped (on the live site
// it sits in a mirrored layer and immediately leaves the canvas, so it is never visible).
const VIDEOS = ['bmTEE6d1oiI', 'XJ-4VYbgO0M', 'Yr5M2U7JTkU', '19w3cPwB6cg']

function Video({ id }) {
  const [playing, setPlaying] = useState(false)
  if (playing) {
    return (
      <iframe
        className="csi-video-frame"
        src={`https://www.youtube.com/embed/${id}?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=0`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    )
  }
  return (
    <>
      <img className="csi-video-thumb" src={`/assets/pages/templates/yt-${id}.webp`} alt="" loading="lazy" decoding="async" />
      <button type="button" className="csi-video-play" aria-label="Play" onClick={() => setPlaying(true)}>
        <svg height="100%" viewBox="0 0 68 48" width="100%" aria-hidden="true">
          <path
            d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
            fill="#212121"
            fillOpacity="0.8"
          />
          <path d="M 45,24 27,14 27,34" fill="#fff" />
        </svg>
      </button>
    </>
  )
}

export default function VideoTestimonials() {
  return (
    <section className="csi-videos">
      <div className="csi-videos-dots" aria-hidden="true" />
      <div className="csi-videos-main">
        <h4 className="csi-videos-title">Hear It From Them</h4>
        <div className="csi-videos-grid">
          {VIDEOS.map((id, i) => (
            <Reveal className="csi-video" key={id} y={15} delay={i === 3 ? 0.8 : 0.6}>
              <div className="csi-video-inner">
                <Video id={id} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
