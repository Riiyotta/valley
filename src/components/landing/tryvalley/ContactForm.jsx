import { useId, useRef, useState } from 'react'
import '../../../styles/pages/landing/tryvalley/contact.css'
import { SURFACE_URL } from '../both/links.js'

// /tryvalley "Contact Form" (spec 5.1). The live form is a Surface form handler; the clone
// validates the way the homepage closing CTA does (src/components/ClosingCta.jsx) and then
// opens the Surface form URL. Nothing is collected or stored.

// Same list and message as ClosingCta (the spec names only these domains).
const PERSONAL_DOMAINS = new Set(['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'proton.me'])
const PERSONAL_ERROR =
  'Please use your company email address, rather than a personal inbox such as Gmail.'

// 16x16 scalloped check badge: the live <use>d symbol with its instance variables baked in
// (#0077b5 at 20% fill, 1.5 stroke; ASSETS_GAPFILL 3 contact-check-badge.svg).
function CheckIcon() {
  return <img className="tvc-check" src="/assets/pages/landing/svg/contact-check-badge.svg" alt="" aria-hidden="true" />
}

export default function ContactForm() {
  const id = useId()
  const emailRef = useRef(null)
  const [busy, setBusy] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const email = emailRef.current
    const domain = email.value.trim().split('@')[1]?.toLowerCase() ?? ''
    email.setCustomValidity(PERSONAL_DOMAINS.has(domain) ? PERSONAL_ERROR : '')
    if (!form.reportValidity()) return
    setBusy(true)
    window.location.assign(SURFACE_URL)
  }

  return (
    <section id="contact" className="tvc" aria-label="Book a demo">
      <div className="tvc-panel">
        <div className="tvc-title">
          <p className="tvc-h">See Valley in action.</p>
          <p className="tvc-sub">Talk to Zayd and Alex about your team’s outbound workflow.</p>
        </div>
        <div className="tvc-checks">
          <div className="tvc-check-row">
            <CheckIcon />
            <h6 className="tvc-check-text tvc-check-text--medium">Demo of the Valley platform</h6>
          </div>
          <div className="tvc-check-row">
            <CheckIcon />
            <p className="tvc-check-text tvc-check-text--inter">Find the right setup for your team</p>
          </div>
        </div>
        <div className="tvc-quote">
          <h2 className="tvc-quote__text">
            "I've been doing this about 12 years and I've never used a tool like this before - we
            have Outreach, HubSpot, Seamless, but Valley has booked us more meetings than anything
            else we're using right now.”
          </h2>
          <div className="tvc-quote__author">
            <img
              className="tvc-quote__avatar"
              src="/assets/pages/landing/img/iwEx5TIcTfi3RasDvugTZhlD7I.jpeg"
              alt="A professional man in a black suit smiling forward on a meeting or call."
            />
            <p>Jason Hardman, Founding Enterprise Account Executive</p>
          </div>
        </div>
      </div>

      <div className="tvc-form-box">
        <form className="tvc-form" aria-label="Book a demo" aria-busy={busy} onSubmit={onSubmit}>
          <label className="tvc-field" htmlFor={`${id}-name`}>
            <span className="sr-only">Full Name</span>
            <input
              id={`${id}-name`}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Full Name"
              required
              maxLength={200}
            />
          </label>
          <label className="tvc-field" htmlFor={`${id}-email`}>
            <span className="sr-only">Your Work Email</span>
            <input
              ref={emailRef}
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Your Work Email"
              required
              maxLength={254}
              onInput={(e) => e.currentTarget.setCustomValidity('')}
            />
          </label>
          <button className="tvc-submit" type="submit" disabled={busy}>
            Book a demo
          </button>
        </form>
      </div>
    </section>
  )
}
