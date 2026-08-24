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
          <a href="#project">Masjid Project</a>
          <a href="#milestones">Milestones</a>
          <a href="#prayer-times">Prayer Times</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
          <a className="button button-small" href={donationUrl}>Donate</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">A permanent home for New Westminster&apos;s Muslim community</p>
          <h1>Help build<br /><em>New West Masjid</em></h1>
          <p className="hero-lede">Your donation makes a lasting legacy</p>
          <div className="hero-actions">
            <a className="button" href={donationUrl}>Donate to the masjid</a>
            <a className="text-link" href="#project">See the plan <span aria-hidden="true">↓</span></a>
          </div>
          <p className="receipt-note">Donations are tax-deductible</p>
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
            <p>Our immediate plan is practical: acquire three adjoining properties, then build a 4,800 sq. ft. single-storey musalla. The initial pre-fabricated structure is designed to be extended as the community and its needs grow.</p>
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
          <h2>Upcoming Payments</h2>
          <p>Each target moves our community closer to a new masjid.</p>
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
          <div className="prayer-widget-card">
            <div className="live-badge"><span aria-hidden="true" /> Live timetable</div>
            <iframe
              className="prayer-widget prayer-widget-large"
              src="https://timing.athanplus.com/masjid/widgets/embed?theme=6&masjid_id=adJkaqKk"
              title="Taiba Musalla live prayer timetable — desktop view"
              loading="lazy"
            />
            <iframe
              className="prayer-widget prayer-widget-small"
              src="https://timing.athanplus.com/masjid/widgets/embed?theme=3&masjid_id=adJkaqKk"
              title="Taiba Musalla live prayer timetable — mobile view"
              loading="lazy"
            />
            <p className="widget-fallback">
              Timetable not appearing? <a href="https://www.awqat.net/masjid/taiba-musallah" target="_blank" rel="noreferrer">Open prayer times in a new tab <span aria-hidden="true">↗</span></a>
            </p>
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
        <div><p className="footer-label">Contact</p><a href="mailto:contact@cicsnw.org">contact@cicsnw.org</a><br /><a href="tel:+16047800048">+1 604 780 0048</a></div>
        <div>
          <p className="footer-label">Connect</p>
          <div className="social-links">
            <a href="https://chat.whatsapp.com/Ecg1NHbuhgQHr5lZ2XxsqH?s=cl&amp;p=a&amp;ilr=1" target="_blank" rel="noreferrer" aria-label="Join CICSNW on WhatsApp">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.4c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.2-3.4-8.4Zm-8.4 18.2c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.7 9.7 0 1 1 8.5 4.7Zm5.3-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.7.1-.2.1-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9 0 1.7 1.3 3.4 1.4 3.6.2.2 2.5 3.8 6 5.3 2.2.9 3.1 1 4.2.8.7-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.4-.2-.7-.4Z" /></svg>
              <span>WhatsApp</span>
            </a>
            <a href="https://www.facebook.com/cicsnw.org" target="_blank" rel="noreferrer" aria-label="Follow CICSNW on Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.1A12 12 0 1 0 10.1 24v-8.4h-3V12h3V9.3c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-1.9.9-1.9 1.8V12h3.3l-.5 3.6h-2.8V24A12 12 0 0 0 24 12.1Z" /></svg>
              <span>Facebook</span>
            </a>
            <a href="https://www.instagram.com/taibamusallah" target="_blank" rel="noreferrer" aria-label="Follow Taiba Musalla on Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2 0 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-1.8-.2-2.2-.4a4.2 4.2 0 0 1-1.4-.9 4.2 4.2 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2ZM12 0C8.7 0 8.3 0 7.1.1 5.8.1 5 .3 4.2.6c-.8.3-1.5.7-2.1 1.4C1.4 2.7 1 3.3.6 4.2.3 5 .1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.2 2.1.5 2.9.3.8.7 1.5 1.4 2.1.7.7 1.3 1.1 2.1 1.4.8.3 1.6.5 2.9.5 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.1-.2 2.9-.5.8-.3 1.5-.7 2.1-1.4.7-.7 1.1-1.3 1.4-2.1.3-.8.5-1.6.5-2.9.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.2-2.1-.5-2.9-.3-.8-.7-1.5-1.4-2.1A5.8 5.8 0 0 0 19.8.6c-.8-.3-1.6-.5-2.9-.5C15.7 0 15.3 0 12 0Zm0 5.8A6.2 6.2 0 1 0 12 18.2 6.2 6.2 0 0 0 12 5.8ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.9-10.4a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0Z" /></svg>
              <span>Instagram</span>
            </a>
            <a href="https://youtube.com/@canadianislamicculturalsociety" target="_blank" rel="noreferrer" aria-label="Subscribe to CICSNW on YouTube">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" /></svg>
              <span>YouTube</span>
            </a>
          </div>
        </div>
        <div className="footer-action"><a className="button" href={donationUrl}>Donate now</a></div>
        <p className="copyright">© {new Date().getFullYear()} CICSNW. CRA Registered Charity BN 769877523RR0001.</p>
      </footer>
    </main>
  );
}
