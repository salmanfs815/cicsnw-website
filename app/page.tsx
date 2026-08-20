import galleryData from "../content/gallery.json";

type GalleryItem = { src: string; alt: string; caption?: string };
const galleryItems = galleryData as GalleryItem[];
const donationUrl = import.meta.env.VITE_DONATION_URL || "#give";

const milestones = [
  { amount: "$1 million", date: "December 31, 2026", label: "Land acquisition" },
  { amount: "$1 million", date: "March 10, 2027", label: "Land acquisition" },
  { amount: "$1.2 million", date: "May 31, 2027", label: "Complete acquisition" },
  { amount: "$800,000", date: "December 31, 2027", label: "Initial building" },
];

const funds = [
  { number: "01", name: "New West Masjid", detail: "Land acquisition and the initial extensible building." },
  { number: "02", name: "Taiba Musalla", detail: "Sadaqa for the operating costs of our current musalla." },
  { number: "03", name: "Zakat", detail: "Direct your zakat through the community's trusted platform." },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="CICSNW home">
          <img className="brand-logo" src="/cicsnw-logo.png" alt="CICSNW — Canadian Islamic Cultural Society, Taiba Musalla" />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#project">The project</a>
          <a href="#milestones">Milestones</a>
          <a href="#prayer-times">Prayer times</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
          <a className="button button-small" href={donationUrl}>Donate</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">A permanent home for New Westminster&apos;s Muslim community</p>
          <h1>Help build<br /><em>New West Masjid.</em></h1>
          <p className="hero-lede">Together, we can secure the land and open the doors to a simple, welcoming masjid built to grow with our community.</p>
          <div className="hero-actions">
            <a className="button" href={donationUrl}>Donate to the masjid</a>
            <a className="text-link" href="#project">See the plan <span aria-hidden="true">↓</span></a>
          </div>
          <p className="receipt-note">Donations are tax-deductible. Official receipts are issued the following year for donations made during the year.</p>
        </div>

        <aside className="fund-card" aria-label="Fundraising goal">
          <p className="card-kicker">Our shared goal</p>
          <p className="goal-amount">$4 million</p>
          <div className="cost-row"><span>Land acquisition</span><strong>$3.2M</strong></div>
          <div className="cost-row"><span>Initial extensible building</span><strong>$800K</strong></div>
          <div className="fund-rule" />
          <p className="next-date">First milestone</p>
          <div className="milestone-callout"><strong>$1 million</strong><span>by Dec. 31, 2026</span></div>
        </aside>
      </section>

      <section className="intro-section section" id="project">
        <div className="section-heading">
          <p className="eyebrow dark">The New West Masjid project</p>
          <h2>A first home for generations to come.</h2>
        </div>
        <div className="project-grid">
          <div className="project-story">
            <p className="large-copy">CICSNW is working to establish the first permanent masjid and Islamic centre in New Westminster, BC.</p>
            <p>Our immediate plan is practical: acquire three adjoining properties, then build a 4,800 sq. ft. single-storey musalla. The initial prefab structure is designed to be extended as the community and its needs grow.</p>
            <a className="inline-link" href="#milestones">Explore the funding plan <span aria-hidden="true">→</span></a>
          </div>
          <div className="project-facts" aria-label="Project facts">
            <div><strong>20,431.5</strong><span>sq. ft. unified site</span></div>
            <div><strong>3</strong><span>adjoining properties</span></div>
            <div><strong>4,800</strong><span>sq. ft. initial musalla</span></div>
          </div>
        </div>
      </section>

      <section className="milestone-section section" id="milestones">
        <div className="section-heading section-heading-light">
          <p className="eyebrow">A transparent path forward</p>
          <h2>Four milestones. One shared destination.</h2>
          <p>Each target moves the project from land acquisition to an open, extensible prayer space.</p>
        </div>
        <ol className="timeline">
          {milestones.map((milestone, index) => (
            <li key={milestone.date}>
              <span className="step">0{index + 1}</span>
              <span className="timeline-dot" aria-hidden="true" />
              <p>{milestone.label}</p>
              <strong>{milestone.amount}</strong>
              <time>{milestone.date}</time>
            </li>
          ))}
        </ol>
      </section>

      <section className="sponsor-section section">
        <div className="sponsor-number" aria-hidden="true">10K</div>
        <div className="sponsor-copy">
          <p className="eyebrow dark">A lasting sadaqa jariya</p>
          <h2>Sponsor a prayer space.</h2>
          <p>With a $10,000 gift, help create a dedicated musalla spot where generations can stand together in salah.</p>
        </div>
        <a className="button" href={donationUrl}>Sponsor a spot — $10,000</a>
      </section>

      <section className="sustain-section section">
        <div className="section-heading">
          <p className="eyebrow dark">Built to sustain itself</p>
          <h2>A responsible plan beyond construction.</h2>
        </div>
        <div className="sustain-grid">
          <article><span>01</span><h3>Daycare</h3><p>Planned daycare revenue will help support ongoing operational costs.</p></article>
          <article><span>02</span><h3>Rental income</h3><p>On-site rental units create a steady source of support for the project.</p></article>
          <article><span>03</span><h3>Community giving</h3><p>Monthly commitments keep capital work moving and strengthen the future masjid.</p></article>
        </div>
      </section>

      <section className="give-section section" id="give">
        <div className="give-intro">
          <p className="eyebrow">Give with purpose</p>
          <h2>One trusted platform. Three ways to give.</h2>
          <p>Choose your fund on the donation platform. Every gift is directed according to your selection.</p>
          <a className="button button-light" href={donationUrl}>Open donation platform</a>
          <small>Official tax receipts are provided the following calendar year.</small>
        </div>
        <div className="fund-list">
          {funds.map((fund) => (
            <a href={donationUrl} key={fund.number}>
              <span>{fund.number}</span><div><h3>{fund.name}</h3><p>{fund.detail}</p></div><b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="community-section section" id="prayer-times">
        <div className="prayer-card">
          <div className="mini-heading"><p className="eyebrow dark">Pray with us</p><h2>Prayer times</h2><p>Live timetable for Taiba Musalla in New Westminster.</p></div>
          <div className="prayer-link-card">
            <div className="live-badge"><span aria-hidden="true" /> Live timetable</div>
            <p>View today&apos;s salah and iqamah times directly on Awqat.</p>
            <div className="prayer-names" aria-label="Daily prayers"><span>Fajr</span><span>Dhuhr</span><span>Asr</span><span>Maghrib</span><span>Isha</span><span>Jumu&apos;ah</span></div>
            <a className="button" href="https://www.awqat.net/masjid/taiba-musallah" target="_blank" rel="noreferrer">View today&apos;s prayer times <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <aside className="classes-card">
          <p className="eyebrow">Learning at Taiba</p>
          <h2>Evening Quran classes</h2>
          <p>Taiba Musalla offers evening Quran classes for children in a welcoming community setting.</p>
          <a className="text-link" href="mailto:taiba@cicsnw.org?subject=Evening%20Quran%20Classes">Ask about registration <span aria-hidden="true">→</span></a>
        </aside>
      </section>

      <section className="gallery-section section" id="gallery">
        <div className="section-heading">
          <p className="eyebrow dark">Our community</p>
          <h2>Moments at Taiba Musalla.</h2>
          <p>Prayer, learning and community life in New Westminster.</p>
        </div>
        {galleryItems.length > 0 ? (
          <div className="gallery-grid">
            {galleryItems.map((item) => (
              <figure key={item.src}>
                <img src={item.src} alt={item.alt} loading="lazy" />
                {item.caption && <figcaption>{item.caption}</figcaption>}
              </figure>
            ))}
          </div>
        ) : (
          <div className="gallery-empty">
            <div><span>01</span></div><div><span>02</span></div><div><span>03</span></div>
            <p>Community photos will be added here soon.</p>
          </div>
        )}
      </section>

      <section className="about-section section" id="about">
        <p className="eyebrow dark">About CICSNW</p>
        <div className="about-grid">
          <h2>Faith, learning and belonging in the heart of New Westminster.</h2>
          <div><p>Canadian Islamic Cultural Society New Westminster operates Taiba Musalla, serving the community through daily prayer, Jumu&apos;ah and Quran learning.</p><p>New West Masjid is the next chapter: a permanent, sustainable home for worship and community life.</p></div>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><img className="footer-logo" src="/cicsnw-logo.png" alt="CICSNW" /></div>
        <div><p className="footer-label">Visit</p><address>1206 Kingston Street<br />New Westminster, BC</address></div>
        <div><p className="footer-label">Contact</p><a href="mailto:taiba@cicsnw.org">taiba@cicsnw.org</a><br /><a href="tel:+17788294786">+1 778 829 4786</a></div>
        <div className="footer-action"><a className="button" href={donationUrl}>Donate now</a></div>
        <p className="copyright">© {new Date().getFullYear()} CICSNW. CRA Registered Charity BN 769877523RR0001.</p>
      </footer>
    </main>
  );
}
