import ambassadorData from "../../content/ambassadors.json";
import { siteConfig } from "../siteConfig";
import { assetPath } from "../assetPath";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ScrollToTopButton from "../components/ScrollToTopButton";

type Ambassador = { name: string; recognizedDate: string };
const ambassadors = ambassadorData as Ambassador[];

const phoneHref = `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`;
const ambassadorEmailHref = `mailto:${siteConfig.contactEmail}?subject=Ambassador%20Program`;
const currentYear = new Date().getFullYear();

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#why-join", label: "Why join" },
  { href: "#recognition", label: "Recognition" },
  { href: "#signup", label: "Sign up" },
];

const steps = [
  {
    title: "Sign up",
    detail: "Let us know you're interested by message, email, or in person. No forms, no fees, and no ongoing commitment beyond your own pace.",
  },
  {
    title: "Get equipped",
    detail: "We'll give you a short orientation along with brochures and pledge forms so you feel confident explaining the project.",
  },
  {
    title: "Reach $10,000",
    detail: "Donate or pledge $10,000 yourself, or share the brochure with your network and collect $10,000 in donations and pledges, before year end.",
  },
  {
    title: "Bring it back",
    detail: "Return any pledge forms you collect to the committee so gifts can be receipted and pledges followed up on.",
  },
];

const qualifyingPaths = [
  { title: "Donate or pledge $10,000", detail: "Yourself, as a personal gift or pledge." },
  { title: "Fundraise $10,000", detail: "From your family, friends, and network." },
];

const benefits = [
  { title: "No regular meetings", detail: "There's no schedule to keep. Ambassadors share the project whenever it naturally comes up in conversation." },
  { title: "A lasting sadaqa jariya", detail: "Connecting someone to a masjid that will serve generations carries its own ongoing reward." },
  { title: "Support when you need it", detail: "The committee provides brochures, talking points, and answers to common questions before you meet anyone." },
];

export default function AmbassadorPage() {
  return (
    <main id="top">
      <SiteHeader navLinks={navLinks} homeHref={assetPath("")} />

      <section className="ambassador-hero">
        <p className="eyebrow">Now recruiting ambassadors</p>
        <h1>Become an <em>Ambassador</em></h1>
        <p className="hero-lede">
          Ambassadors help spread the word about New West Masjid within their own social circles &mdash; family, friends,
          neighbours, and coworkers. You become an Ambassador by donating or pledging $10,000 yourself, or by
          fundraising $10,000 from your network, before the end of {currentYear}. There are no regular meetings or
          targets to hit on a schedule; you simply carry a few brochures and share them as opportunities come up in
          daily life.
        </p>
        <div className="ambassador-qualify-row">
          {qualifyingPaths.map((path) => (
            <div className="ambassador-qualify-item" key={path.title}>
              <strong>{path.title}</strong>
              <span>{path.detail}</span>
            </div>
          ))}
        </div>
        <div className="hero-actions">
          <a className="button" href={ambassadorEmailHref}>Sign up as an ambassador</a>
          <a className="text-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="section-heading">
          <p className="eyebrow dark">How it works</p>
          <h2>Four simple steps.</h2>
          <p>Being an ambassador fits around your life, not the other way around.</p>
        </div>
        <ol className="ambassador-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="step">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="sustain-section section" id="why-join">
        <div className="section-heading">
          <p className="eyebrow dark">Why join</p>
          <h2>An easy way to make a lasting impact.</h2>
        </div>
        <div className="sustain-grid">
          {benefits.map((benefit, index) => (
            <article key={benefit.title}>
              <span>0{index + 1}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="recognition">
        <div className="section-heading">
          <p className="eyebrow dark">Ambassador recognition</p>
          <h2>Reach $10,000 and you&apos;re recognized here.</h2>
          <p>Whether you donate or pledge $10,000 yourself, or fundraise a combined $10,000 from your network before year end, we recognize your effort on this page.</p>
        </div>
        {ambassadors.length > 0 ? (
          <ul className="ambassador-wall">
            {ambassadors.map((ambassador) => (
              <li key={ambassador.name}>
                <strong>{ambassador.name}</strong>
                <span>{ambassador.recognizedDate}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="ambassador-wall-empty">
            <strong>No ambassadors recognized yet</strong>
            <p>Sign up today and your name could be the first one on this wall.</p>
          </div>
        )}
      </section>

      <section className="ambassador-signup section" id="signup">
        <div className="section-heading">
          <p className="eyebrow">Ready to help?</p>
          <h2>Sign up as an ambassador.</h2>
          <p>Reach out any way that&apos;s easiest for you. We&apos;ll set up a short orientation and get you brochures and pledge forms to take with you.</p>
        </div>
        <div className="contact-options">
          <a href={ambassadorEmailHref}>
            <span className="contact-label">Email us</span>
            <span className="contact-value">{siteConfig.contactEmail}</span>
            <p>Send us a short message and we&apos;ll follow up.</p>
          </a>
          <a href={phoneHref}>
            <span className="contact-label">Call or WhatsApp</span>
            <span className="contact-value">{siteConfig.phone}</span>
            <p>Message or call the Fundraising Committee directly.</p>
          </a>
          <div>
            <span className="contact-label">In person</span>
            <span className="contact-value">Taiba Musalla</span>
            <p>Speak to a committee member at {siteConfig.addressLine1}, {siteConfig.addressLine2}.</p>
          </div>
        </div>
      </section>

      <ScrollToTopButton />
      <SiteFooter />
    </main>
  );
}
