import '../../../styles/pages/landing/automation/cases.css'
import CtaButton from '../both/CtaButton.jsx'
import { SURFACE_URL } from '../both/links.js'

// "Case Study Section" bento (spec 6 la-case-studies; dump section [5]). Every card links to
// "./" on the live page (verbatim; it resolves to the home page), so the clone keeps that.
const IMG = '/assets/pages/landing/img/'

// Case-card arrow: a 12x12 arrow inside a 14x14 box rotated -45deg. Live draws it as an SVG
// background image: black at rest, white on card hover and on the dark GGWP card
// (ASSETS_GAPFILL 3: case-arrow.svg / case-arrow-hover.svg).
function Arrow() {
  return (
    <span className="la-case__arrow" aria-hidden="true">
      <span className="la-case__arrow-icon" />
    </span>
  )
}

function Labels({ company, industry }) {
  return (
    <div className="la-case__labels">
      <span className="la-case__tag la-case__tag--solid">{company}</span>
      <span className="la-case__tag la-case__tag--outline">{industry}</span>
    </div>
  )
}

function Client({ name, role }) {
  return (
    <div className="la-case__client">
      <p className="la-case__name">{name}</p>
      <p className="la-case__role">{role}</p>
    </div>
  )
}

export default function CaseStudies() {
  return (
    <section id="la-case-studies" className="la-cases">
      <div className="la-cases__content">
        <div className="la-cases__head">
          <p className="la-outline-label la-outline-label--wide" data-lp-appear="15">customer stories</p>
          <h3 data-lp-appear="20" data-lp-appear-delay="0.2" data-lp-appear-amount="0.5">300+ Teams trust Valley with LinkedIn Automation</h3>
        </div>

        <div className="la-cases__rows">
          <div className="la-cases__row">
            <a className="la-case la-case--plain" href="./" data-lp-appear="15" data-lp-appear-delay="0.6">
              <div className="la-case__frame">
                <div className="la-case__headline">
                  <h6>How Kaster generated $400k in pipeline in 2 months using Valley</h6>
                  <Labels company="kaster" industry="TECH" />
                </div>
                <div className="la-case__bottom">
                  <Client name="Joe Leiva" role="Co-founder" />
                  <img className="la-case__logo la-case__logo--tall" src={IMG + '8aai3kbA67mLlwK6YCBMunST8.png'} alt="" />
                </div>
                <Arrow />
              </div>
            </a>

            <a className="la-case la-case--stats" href="./" data-lp-appear="15" data-lp-appear-delay="0.8">
              <div className="la-case__frame">
                <div className="la-case__main">
                  <div className="la-case__headline">
                    <h6>How 10x Management generated $84K+ ARR with Valley</h6>
                    <Labels company="10X management" industry="consulting" />
                  </div>
                  <div className="la-case__stats">
                    <div className="la-case__stat">
                      <h6>8-10x</h6>
                      <p>More website intent signals</p>
                    </div>
                    <div className="la-case__stat">
                      <h6>$84K+</h6>
                      <p>ARR from a single customer</p>
                    </div>
                  </div>
                </div>
                <div className="la-case__bottom">
                  <Client name="Sam Z" role="Sales Leader" />
                  <img className="la-case__logo" src={IMG + 'aL9GUFUNbpsZQkPutstMxFaG1Ko.png'} alt="" />
                </div>
                <Arrow />
              </div>
            </a>
          </div>

          <div className="la-cases__row">
            <a className="la-case la-case--plain la-case--nologo" href="./" data-lp-appear="15" data-lp-appear-delay="1">
              <div className="la-case__frame">
                <div className="la-case__headline">
                  <h6>How Tacnode booked 25+ meetings per month with Valley</h6>
                  <Labels company="Tacnode.io" industry="TECH" />
                </div>
                <div className="la-case__bottom">
                  <Client name="Jason" role="Founder" />
                </div>
                <Arrow />
              </div>
            </a>

            <a className="la-case la-case--image" href="./" data-lp-appear="15" data-lp-appear-delay="1.2">
              <div className="la-case__bg">
                <img src={IMG + 'LMuU7y23LItIPfFr2MbBtHvrzI.jpeg'} alt="" />
              </div>
              <div className="la-case__frame">
                <div className="la-case__headline">
                  <h6>How GGWP generated $4M in pipeline with Valley</h6>
                  <Labels company="GGWP" industry="GAMING" />
                </div>
                <img className="la-case__badge" src={IMG + 'SHcFhghwS3Mbun18Ks8LZ7n368.png'} alt="" />
                <Arrow />
              </div>
            </a>

            <a className="la-case la-case--quote" href="./" data-lp-appear="15" data-lp-appear-delay="1.4">
              <div className="la-case__frame">
                <div className="la-case__headline">
                  <h6>How Franq generated $64k in pipeline with Valley in one month</h6>
                  <Labels company="FRANQ" industry="FINANCE" />
                </div>
                <div className="la-case__details">
                  <p className="la-case__quote">
                    "Valley has standardized our approach, allowing us to A/B test without depending
                    on someone being in a good mood that day.
                  </p>
                  <div className="la-case__bottom">
                    <Client name="Rafael Sampaio" role="Head of Growth" />
                    <img className="la-case__logo la-case__logo--desktop" src={IMG + 'k9ThAwIdVaT1s2ZuKZfri84Q5J8.png'} alt="" />
                  </div>
                </div>
                <Arrow />
              </div>
            </a>
          </div>
        </div>

        <CtaButton href={SURFACE_URL} label="Book Demo →" />
      </div>
    </section>
  )
}
