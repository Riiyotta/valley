import { useState } from 'react'
import '../../../styles/pages/landing/motion.css'

// YouTube facade (spec 3.2 / 3.6 / 12.2): local poster + the YouTube 68x48 play button (path
// copied from the live Framer YouTube component). Click swaps in the embed with autoplay;
// the player itself is third-party and not built.
const PLAY_PATH =
  'M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z'

// Poster files are named <videoId>-maxresdefault.webp.
export function videoIdFromPoster(poster) {
  const file = poster.split('/').pop()
  return file.replace(/-maxresdefault\.webp$/, '')
}

export default function YouTubeFacade({ poster, className = '' }) {
  const [playing, setPlaying] = useState(false)
  const id = videoIdFromPoster(poster)
  return (
    <article
      className={`lp-yt ${className}`}
      role="presentation"
      onClick={() => setPlaying(true)}
    >
      {playing ? (
        <iframe
          className="lp-yt__frame"
          title="Youtube Video"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&iv_load_policy=3&rel=0&modestbranding=1&playsinline=1`}
          allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <img className="lp-yt__poster" src={poster} alt="" decoding="async" loading="lazy" />
          <button className="lp-yt__play" type="button" aria-label="Play">
            <svg viewBox="0 0 68 48" width="100%" height="100%" aria-hidden="true">
              <path className="lp-yt__play-bg" d={PLAY_PATH} fill="#212121" fillOpacity="0.8" />
              <path d="M 45,24 27,14 27,34" fill="#fff" />
            </svg>
          </button>
        </>
      )}
    </article>
  )
}
