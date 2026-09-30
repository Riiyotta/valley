// /about backers + hiring ("Frame 2147223575" and "Frame 2085663186"), spec/pages/about.md 2.
export function Backers() {
  return (
    <div className="ab-backers" data-framer-name="Frame 2147223575">
      <div className="ab-backers-col">
        <div className="ab-backers-head">
          <h1 className="ab-h">Backed by great partners</h1>
        </div>
        <div className="ab-backers-strip">
          <img
            className="ab-backers-logo"
            src="/assets/pages/about/NhkTWgcyjDvBUlCEbsiXQaQ2Yk.png"
            alt="Valley's investors"
            decoding="async"
          />
        </div>
      </div>
    </div>
  )
}

export function Hiring() {
  return (
    <div className="ab-hiring" data-framer-name="Frame 2085663186">
      <div className="ab-hiring-panel">
        <div className="ab-hiring-art">
          <img src="/assets/img/5Elg5B9vPo2Xblz2XfnsvZzgqlA.png" alt="Painted Valley landscape with open sky, green hills and a winding river" decoding="async" />
        </div>
        <div className="ab-hiring-content">
          <p className="ab-hiring-title">Valley is growing.</p>
          <div className="ab-hiring-buttons">
            <a className="ab-hiring-btn ab-hiring-btn--light" href="https://www.linkedin.com/company/joinvalley/" target="_blank" rel="noopener">
              <span>Explore Roles</span>
              <img src="/assets/pages/about/svg/11-hiring-16x16.svg" alt="" width="16" height="16" />
            </a>
            <a className="ab-hiring-btn ab-hiring-btn--dark" href="mailto:support@joinvalley.co">
              <span>Contact Us</span>
              <img src="/assets/pages/about/svg/12-hiring-16x16.svg" alt="" width="16" height="16" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
