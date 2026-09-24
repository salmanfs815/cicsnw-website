import { useEffect, useState } from "react";
import faqData from "../content/faqs.json";
import galleryData from "../content/gallery.json";
import SliderModule from "react-slick";
import type { CustomArrowProps, Settings } from "react-slick";
import { siteConfig } from "./siteConfig";
import { assetPath } from "./assetPath";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import ScrollToTopButton from "./components/ScrollToTopButton";

type GalleryItem = { src: string; alt: string; caption?: string };
type FaqItem = { question: string; answer: string };
const galleryItems = (galleryData as GalleryItem[]).map((item) => ({
  ...item,
  src: assetPath(item.src),
}));
const faqItems = faqData as FaqItem[];
const initialFaqCount = 3;
const Slider = (SliderModule as unknown as { default?: typeof SliderModule }).default ?? SliderModule;
const currency = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

function compactAmount(amount: number) {
  if (amount >= 1_000_000) return `$${Number((amount / 1_000_000).toFixed(1))} million`;
  if (amount >= 1_000) return `$${Number((amount / 1_000).toFixed(1))}K`;
  return currency.format(amount);
}

function compactNumber(amount: number) {
  if (amount >= 1_000_000) return `${Number((amount / 1_000_000).toFixed(1))}M`;
  if (amount >= 1_000) return `${Number((amount / 1_000).toFixed(1))}K`;
  return String(amount);
}

const progressPercent = siteConfig.fundraisingGoal > 0
  ? Math.min(100, (siteConfig.fundsRaised / siteConfig.fundraisingGoal) * 100)
  : 0;
const progressLabel = `${Number(progressPercent.toFixed(2))}%`;
const classesEmailHref = `mailto:${siteConfig.classesEmail}?subject=Evening%20Quran%20Classes`;

const currentYear = new Date().getFullYear();

const ambassadorPaths = [
  { number: "01", name: "Donate or pledge $10,000", detail: "Become an ambassador yourself with a personal gift or pledge.", href: siteConfig.donationUrl },
  { number: "02", name: "Fundraise $10,000", detail: "Share the project with your network and collect donations and pledges.", href: assetPath("ambassador.html") },
];

const primaryLinks = [
  { href: "#project", label: "Masjid Project" },
  { href: "#milestones", label: "Milestones" },
  { href: "#prayer-times", label: "Prayer Times" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#ambassador", label: "Ambassador Program" },
];

function gallerySlidesForViewport() {
  const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
  if (viewportWidth < 600) return 1;
  if (viewportWidth < 900) return 2;
  return 3;
}

function GalleryArrow({ className, onClick, direction }: CustomArrowProps & { direction: "previous" | "next" }) {
  return (
    <button className={className} type="button" onClick={onClick} aria-label={`${direction === "previous" ? "Previous" : "Next"} gallery photos`}>
      <span aria-hidden="true">{direction === "previous" ? "←" : "→"}</span>
    </button>
  );
}

const gallerySettings: Settings = {
  accessibility: true,
  dots: true,
  infinite: false,
  lazyLoad: "ondemand",
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  swipeToSlide: true,
  prevArrow: <GalleryArrow direction="previous" />,
  nextArrow: <GalleryArrow direction="next" />,
};

export default function Home() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [gallerySlidesToShow, setGallerySlidesToShow] = useState(gallerySlidesForViewport);
  const visibleFaqs = showAllFaqs ? faqItems : faqItems.slice(0, initialFaqCount);

  useEffect(() => {
    const updateGallerySlides = () => setGallerySlidesToShow(gallerySlidesForViewport());
    updateGallerySlides();
    window.addEventListener("resize", updateGallerySlides);
    window.visualViewport?.addEventListener("resize", updateGallerySlides);

    return () => {
      window.removeEventListener("resize", updateGallerySlides);
      window.visualViewport?.removeEventListener("resize", updateGallerySlides);
    };
  }, []);

  return (
    <main id="top">
      <SiteHeader navLinks={primaryLinks} />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A permanent home for New Westminster&apos;s Muslim community</p>
          <h1>Help build<br /><em>New West Masjid</em></h1>
          <p className="hero-lede">Your donation makes a lasting legacy</p>
          <div className="hero-actions">
            <a className="button" href={siteConfig.donationUrl}>Donate to the masjid</a>
            <a className="text-link" href="#project">See the plan <span aria-hidden="true">↓</span></a>
          </div>
          <p className="receipt-note">Donations are tax-deductible</p>
        </div>

        <aside className="fund-card" aria-label="Fundraising goal">
          <p className="card-kicker">Our shared goal</p>
          <p className="goal-amount">{compactAmount(siteConfig.fundraisingGoal)}</p>
          <div className="cost-row"><span>Land acquisition</span><strong>{compactAmount(siteConfig.landAcquisitionCost)}</strong></div>
          <div className="cost-row"><span>Initial extensible building</span><strong>{compactAmount(siteConfig.initialBuildingCost)}</strong></div>
          <div className="progress-summary">
            <div><span>Raised so far</span><strong>{currency.format(siteConfig.fundsRaised)}</strong></div>
            <span>{progressLabel} of goal</span>
          </div>
          <div className="fund-rule" role="progressbar" aria-label="Fundraising progress" aria-valuemin={0} aria-valuemax={siteConfig.fundraisingGoal} aria-valuenow={siteConfig.fundsRaised} aria-valuetext={`${currency.format(siteConfig.fundsRaised)} raised of ${currency.format(siteConfig.fundraisingGoal)}`}>
            <span style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="next-date">First milestone</p>
          <div className="milestone-callout"><strong>{compactAmount(siteConfig.milestones[0].amount)}</strong><span>by {siteConfig.milestones[0].date}</span></div>
        </aside>
      </section>

      <section className="intro-section section" id="project">
        <div className="section-heading">
          <p className="eyebrow dark">The New West Masjid project</p>
          <h2>A first home for generations to come.</h2>
        </div>
        <div className="project-grid">
          <div className="project-story">
            <p className="large-copy">CICS is working to establish the first permanent masjid and Islamic centre in New Westminster, BC.</p>
            <p>Our immediate plan is practical: acquire three adjoining properties, then build a 4,800 sq. ft. single-storey masjid. The initial pre-fabricated structure is designed to be extended as the community and its needs grow.</p>
            <a className="inline-link" href={assetPath("new-westminster-masjid-project-plan.pdf")} target="_blank" rel="noopener noreferrer">
              Explore the project plan <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="project-facts" aria-label="Project facts">
            <div><strong>20,431.5</strong><span>sq. ft. unified site</span></div>
            <div><strong>3</strong><span>adjoining properties</span></div>
            <div><strong>4,800</strong><span>sq. ft. initial building</span></div>
          </div>
        </div>
        <article className="site-location-card">
          <div className="site-location-image">
            <img
              src={assetPath("new-masjid-site-location.png")}
              alt="Aerial map showing the new masjid site outlined in red at Eighth Avenue and Eighth Street in New Westminster"
            />
          </div>
          <div className="site-location-copy">
            <p className="eyebrow dark">New masjid site</p>
            <h3>{siteConfig.newMasjidLocationLine1}</h3>
            <p>{siteConfig.newMasjidLocationLine2}</p>
            <p className="site-location-detail">The three adjoining properties outlined on the map will form the future home of New West Masjid.</p>
            <a className="inline-link" href={siteConfig.newMasjidMapsUrl} target="_blank" rel="noreferrer">
              View location on Google Maps <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </section>

      <section className="milestone-section section" id="milestones">
        <div className="section-heading section-heading-light">
          <p className="eyebrow">A transparent path forward</p>
          <h2>Upcoming Payments</h2>
          <p>Each target moves our community closer to a new masjid.</p>
        </div>
        <ol className="timeline">
          {siteConfig.milestones.map((milestone, index) => (
            <li key={milestone.date}>
              <span className="step">0{index + 1}</span>
              <span className="timeline-dot" aria-hidden="true" />
              <p>{milestone.label}</p>
              <strong>{compactAmount(milestone.amount)}</strong>
              <time>{milestone.date}</time>
            </li>
          ))}
        </ol>
      </section>

      <section className="sponsor-section section">
        <div className="sponsor-number" aria-hidden="true">{compactNumber(siteConfig.sponsorshipAmount)}</div>
        <div className="sponsor-copy">
          <p className="eyebrow dark">A lasting sadaqa jariya</p>
          <h2>Sponsor a prayer space.</h2>
          <p>With a {currency.format(siteConfig.sponsorshipAmount)} gift, help create a dedicated musalla spot where generations can stand together in salah.</p>
        </div>
        <a className="button" href={siteConfig.donationUrl}>Sponsor a spot — {currency.format(siteConfig.sponsorshipAmount)}</a>
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

      <section className="give-section section" id="ambassador">
        <div className="give-intro">
          <p className="eyebrow">Now recruiting ambassadors</p>
          <h2>Become an Ambassador</h2>
          <p>
            Ambassadors are individuals who donate or pledge $10,000 themselves, or fundraise $10,000 from their
            family, friends, and network, before the end of {currentYear}. It&apos;s a low-effort way to make a
            lasting impact &mdash; no regular meetings required.
          </p>
          <a className="button button-light" href={assetPath("ambassador.html")}>Learn more &amp; sign up</a>
          <small>We&apos;ll provide orientation and brochures to help you get started.</small>
        </div>
        <div className="fund-list">
          {ambassadorPaths.map((path) => (
            <a href={path.href} key={path.number}>
              <span>{path.number}</span><div><h3>{path.name}</h3><p>{path.detail}</p></div><b aria-hidden="true">↗</b>
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
              src={siteConfig.athanDesktopEmbedUrl}
              title="Taiba Musalla live prayer timetable — desktop view"
              loading="lazy"
            />
            <iframe
              className="prayer-widget prayer-widget-small"
              src={siteConfig.athanMobileEmbedUrl}
              title="Taiba Musalla live prayer timetable — mobile view"
              loading="lazy"
            />
            <p className="widget-fallback">
              Timetable not appearing? <a href={siteConfig.awqatUrl} target="_blank" rel="noreferrer">Open prayer times in a new tab <span aria-hidden="true">↗</span></a>
            </p>
          </div>
        </div>
        <aside className="classes-card">
          <p className="eyebrow">Learning at Taiba</p>
          <h2>Evening Quran classes</h2>
          <p>Taiba Musalla offers evening Quran classes for children in a welcoming community setting.</p>
          <a className="text-link" href={classesEmailHref}>Ask about registration <span aria-hidden="true">→</span></a>
        </aside>
      </section>

      <section className="gallery-section section" id="gallery">
        <div className="section-heading">
          <p className="eyebrow dark">Our community</p>
          <h2>Moments at Taiba Musalla.</h2>
          <p>Prayer, learning and community life in New Westminster.</p>
        </div>
        {galleryItems.length > 0 ? (
          <div className="gallery-carousel" role="region" aria-label="Taiba Musalla community photo gallery">
            <Slider
              {...gallerySettings}
              key={gallerySlidesToShow}
              slidesToShow={gallerySlidesToShow}
              slidesToScroll={gallerySlidesToShow}
            >
              {galleryItems.map((item) => (
                <div className="gallery-slide" key={item.src}>
                  <figure>
                    <img src={item.src} alt={item.alt} loading="lazy" />
                    {item.caption && <figcaption>{item.caption}</figcaption>}
                  </figure>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="gallery-empty">
            <div><span>01</span></div><div><span>02</span></div><div><span>03</span></div>
            <p>Community photos will be added here soon.</p>
          </div>
        )}
      </section>

      <ScrollToTopButton />

      <section className="faq-section section" id="faq">
        <div className="section-heading">
          <p className="eyebrow dark">Questions about the project</p>
          <h2>Frequently asked questions.</h2>
        </div>
        <div className="faq-list">
          {visibleFaqs.map((faq, index) => (
            <details className="faq-item" key={faq.question}>
              <summary>
                <span className="faq-number">{String(index + 1).padStart(2, "0")}</span>
                <span>{faq.question}</span>
                <span className="faq-arrow" aria-hidden="true">↓</span>
              </summary>
              <div className="faq-answer"><p>{faq.answer}</p></div>
            </details>
          ))}
        </div>
        {faqItems.length > initialFaqCount && (
          <button
            className="faq-toggle"
            type="button"
            aria-expanded={showAllFaqs}
            onClick={() => setShowAllFaqs((current) => !current)}
          >
            {showAllFaqs ? "Show fewer questions" : `Show all ${faqItems.length} questions`}
            <span aria-hidden="true">{showAllFaqs ? "↑" : "↓"}</span>
          </button>
        )}
      </section>

      <section className="about-section section" id="about">
        <p className="eyebrow dark">About CICS</p>
        <div className="about-grid">
          <h2>Faith, learning and belonging in the heart of New Westminster.</h2>
          <div><p>Canada Islamic Cultural Society operates Taiba Musalla, serving the community through daily prayer, Jumu&apos;ah and Quran learning.</p><p>New West Masjid is the next chapter: a permanent, sustainable home for worship and community life.</p></div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
