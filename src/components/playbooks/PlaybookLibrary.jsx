// .vpl playbook library (source component `P` in spec/pages/playbooks/source/2fchlP4D...mjs):
// hero, category tiles, toolbar with live search, card grid / empty state, bottom CTA, drawer.
// Opening a play pushes `?play=<slug>` (source: history.pushState), closing replaces it away
// (history.replaceState), and Back/Forward re-sync via popstate. A direct visit opens the drawer.
import { useEffect, useState } from 'react'
import '../../styles/pages/playbooks/playbooks.css'
import { CATEGORIES, PLAYS, TILE_IMAGES } from '../../data/playbooks.js'
import PlayDrawer from './PlayDrawer.jsx'
import { ArrowIcon, SIGNUP, channelLabel, inCategory } from './shared.jsx'

const TITLE = 'A better reason to reach out.\nA play for every one.'
const INTRO =
  'Ready-to-run outreach plays. Pick your starting signal, review the plan, and let Valley find, qualify, research and reach out.'

export default function PlaybookLibrary() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(null)

  useEffect(() => {
    const sync = () => {
      const id = new URLSearchParams(window.location.search).get('play')
      setOpen(PLAYS.find((p) => p.id === id) || null)
    }
    sync()
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  const openPlay = (play) => {
    setOpen(play)
    const url = new URL(window.location.href)
    url.searchParams.set('play', play.id)
    window.history.pushState({}, '', url)
  }
  const closePlay = () => {
    setOpen(null)
    const url = new URL(window.location.href)
    url.searchParams.delete('play')
    window.history.replaceState({}, '', url)
  }

  const q = query.toLowerCase()
  const cards = PLAYS.filter(
    (p) =>
      inCategory(p, category) &&
      [p.title, p.d, ...p.tags, ...p.steps.map((s) => s.heading)].join(' ').toLowerCase().includes(q),
  ).sort((a, b) => Number(!!a.soon) - Number(!!b.soon) || b.pop - a.pop)

  return (
    <section className="vpl" style={{ position: 'relative', width: '100%' }}>
      <header className="vpl-hero">
        <span className="vpl-eyebrow">The Valley playbook library</span>
        <h1>{TITLE}</h1>
        <p>{INTRO}</p>
        <a className="vpl-cta" href={SIGNUP}>
          Start for free <ArrowIcon />
        </a>
        <a className="vpl-product" href="/product">
          Explore the product ↗
        </a>
      </header>

      <div className="vpl-library">
        <div className="vpl-categories" aria-label="Playbook categories">
          {CATEGORIES.map(([key, label], n) => (
            <button
              key={key}
              aria-pressed={category === key}
              onClick={() => setCategory(key)}
              style={{
                backgroundImage: `linear-gradient(0deg,rgba(17,35,40,.94),rgba(17,35,40,.05)),url(${TILE_IMAGES[n % 4]})`,
              }}
            >
              <span>{label}</span>
              <small>{PLAYS.filter((p) => inCategory(p, key)).length} plays</small>
            </button>
          ))}
        </div>

        <div className="vpl-toolbar">
          <div>
            <h2>{CATEGORIES.find(([key]) => key === category)?.[1]}</h2>
            <span role="status">
              {cards.length} {cards.length === 1 ? 'play' : 'plays'}
              {query && ' matching your search'}
            </span>
          </div>
          <label className="vpl-search">
            <span>Search playbooks</span>
            <input
              type="search"
              placeholder="Try hiring, competitors or LinkedIn…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>

        {cards.length ? (
          <div className="vpl-grid">
            {cards.map((play) => (
              <article key={play.id}>
                <a
                  href={`/playbooks?play=${play.id}`}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
                    e.preventDefault()
                    openPlay(play)
                  }}
                >
                  <div className="vpl-card-top">
                    <span>{play.soon ? 'Coming soon' : play.pop >= 88 ? 'Popular play' : 'Valley play'}</span>
                    <ArrowIcon />
                  </div>
                  <h3>{play.title}</h3>
                  <p>{play.d}</p>
                  <div className="vpl-card-foot">
                    <span>{play.tags.find((t) => t.startsWith('watch:'))?.slice(6) || 'One-time'}</span>
                    <span>{channelLabel(play)}</span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="vpl-empty">
            <h3>No plays match that search.</h3>
            <p>Try a signal such as hiring, profile viewers or funding.</p>
            <button
              onClick={() => {
                setQuery('')
                setCategory('all')
              }}
            >
              Show all plays
            </button>
          </div>
        )}

        <footer className="vpl-bottom">
          <h2>Your next conversation has a starting point.</h2>
          <p>Pick a play. Make it yours. Let Valley do the work.</p>
          <a className="vpl-cta" href={SIGNUP}>
            Start for free <ArrowIcon />
          </a>
        </footer>
      </div>

      {open && <PlayDrawer key={open.id} play={open} close={closePlay} />}
    </section>
  )
}
