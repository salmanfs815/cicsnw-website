import { useEffect, useState } from "react";
import { assetPath } from "../assetPath";
import { siteConfig } from "../siteConfig";

export type NavLink = { href: string; label: string };

export default function SiteHeader({ navLinks, homeHref = "#top" }: { navLinks: NavLink[]; homeHref?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenuWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", closeMenuWithEscape);
    return () => window.removeEventListener("keydown", closeMenuWithEscape);
  }, []);

  return (
    <header className="site-header">
      <a className="brand" href={homeHref} aria-label="CICSNW home">
        <img className="brand-logo" src={assetPath("cicsnw-logo.png")} alt="CICSNW — Canada Islamic Cultural Society, Taiba Musalla" />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
        <a className="button button-small" href={siteConfig.donationUrl}>Donate</a>
      </nav>
      <div className="mobile-header-actions">
        <a className="button button-small mobile-donate" href={siteConfig.donationUrl}>Donate</a>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={`${mobileMenuOpen ? "Close" : "Open"} navigation menu`}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      {mobileMenuOpen && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href} onClick={() => setMobileMenuOpen(false)}>{link.label}</a>
          ))}
          <a className="mobile-nav-donate" href={siteConfig.donationUrl} onClick={() => setMobileMenuOpen(false)}>Donate</a>
        </nav>
      )}
    </header>
  );
}
