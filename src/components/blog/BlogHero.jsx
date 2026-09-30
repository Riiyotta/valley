import { Link } from 'react-router-dom'
import ReadPill from './ReadPill.jsx'
import Chip from './Chip.jsx'
import { FEATURED } from '../../data/blog/indexContent.js'
import { submitToBookACall } from '../longform/formSubmit.js'

// "Blog Page Hero" (blog-index.md section 2): title column + email form, featured card.
export default function BlogHero() {
  return (
    <section className="bl-hero">
      <div className="bl-hero-row">
        <div className="bl-hero-copy">
          <div className="bl-hero-text">
            <h1>LinkedIn and Email Outbound Resources for B2B Sales Teams</h1>
            <p>Compare the tools. Understand the tradeoffs. Build an outbound workflow your team can run.</p>
          </div>
          <form className="bl-hero-form" noValidate onSubmit={submitToBookACall}>
            <label className="bl-hero-input">
              <input type="email" name="email" placeholder="Your Work Email" aria-label="Your work email" autoComplete="email" required />
            </label>
            <button type="submit" className="bl-hero-btn">
              Book a call
            </button>
          </form>
        </div>
        <Link className="bl-feat" to={FEATURED.href}>
          <div className="bl-feat-inner">
            <div className="bl-feat-top">
              <Chip tone="dark" />
              <div className="bl-feat-author">
                <span className="bl-feat-avatar">
                  <img src={FEATURED.avatar} alt={FEATURED.author} />
                </span>
                <span className="bl-feat-name">{FEATURED.author}</span>
              </div>
            </div>
            <img className="bl-feat-img" src={FEATURED.image} alt={FEATURED.imageAlt} />
            <div className="bl-feat-body">
              <h5>{FEATURED.title}</h5>
              <ReadPill tall />
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
