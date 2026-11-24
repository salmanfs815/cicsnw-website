# CICSNW website

[![Deploy to Bluehost](https://github.com/salmanfs815/cicsnw-website/actions/workflows/deploy-bluehost.yml/badge.svg)](https://github.com/salmanfs815/cicsnw-website/actions/workflows/deploy-bluehost.yml)
[![Deploy to GitHub Pages](https://github.com/salmanfs815/cicsnw-website/actions/workflows/deploy-pages.yml/badge.svg?branch=main)](https://github.com/salmanfs815/cicsnw-website/actions/workflows/deploy-pages.yml)
[![cicsnw.org](https://img.shields.io/website?url=https%3A%2F%2Fcicsnw.org&label=cicsnw.org)](https://cicsnw.org)
[![Last commit](https://img.shields.io/github/last-commit/salmanfs815/cicsnw-website/main)](https://github.com/salmanfs815/cicsnw-website/commits/main)

Static fundraising and community website for CICSNW, Taiba Musalla, and the New West Masjid project.

The site has no backend, database, accounts, or login requirement. A production build consists entirely of static HTML, CSS, JavaScript, and image files that can be hosted by any normal static hosting service.

## Technology

- React 19 for page components
- TypeScript for type checking
- Vite 8 for local development and production builds
- Plain CSS in `app/globals.css` for the visual design and responsive layout
- JSON in `content/gallery.json` and `content/ambassadors.json` for maintainable content lists

The site is a small multi-page Vite build. The main page component is `app/page.tsx`, with browser entry point `src/main.tsx` and HTML entry `index.html`. The Ambassador Program page component is `app/ambassador/page.tsx`, with browser entry point `src/ambassador.tsx` and HTML entry `ambassador.html`. Both pages share the header, footer, and scroll-to-top button in `app/components/`. Files placed in `public/` are copied unchanged to the root of the production site.

## Requirements

- Node.js 22.13 or newer
- npm

## First-time setup

```bash
npm install
```

Site configuration lives in `.env`, which is committed to the repository. Edit it, push to `main`, then deploy (see [Deployment](#deployment)). For example:

```env
VITE_DONATION_URL=https://your-fundraising-platform.example/donate
VITE_FUNDS_RAISED=10000
VITE_CONTACT_EMAIL=contact@cicsnw.org
```

To try values locally without committing them, put overrides in `.env.local` (git-ignored).

The environment file controls the fundraising totals and milestones, sponsorship amount, contact details, address, CRA registration number, social links, and prayer-time URLs. Monetary values are entered as plain numbers without `$` signs or commas. Restart the development server after changing an environment variable.

All variables exposed to the browser must begin with `VITE_`. These values are public configuration, not secrets, which is why `.env` can be committed. Never put a real secret in `.env`.

## Local development

Start the development server:

```bash
npm run dev
```

Vite prints the local URL in the terminal, normally `http://localhost:5173`. Changes to the page, styles, gallery data, and images update automatically during development.

## Production build

Create the deployable site:

```bash
npm run build
```

The finished website is written to the `dist/` folder.

To check the production build locally:

```bash
npm run preview
```

## Deployment

There are two deployments:

| Site | URL | When it updates |
| --- | --- | --- |
| Preview (GitHub Pages) | `https://salmanfs815.github.io/cicsnw-website/` | Automatically on every push to `main` |
| Live (Bluehost) | `https://cicsnw.org` | Only when you run it by hand |

The usual flow is: push to `main`, check the preview, then deploy to Bluehost.

### GitHub Pages (preview)

Every push to `main` runs **Actions → Deploy to GitHub Pages** (`.github/workflows/deploy-pages.yml`). It can also be run by hand with **Run workflow**. **Settings → Pages → Source** must be set to **GitHub Actions**.

Local and live builds use the `/` base path from `.env`; the GitHub Pages workflow overrides `VITE_BASE_PATH` with `/cicsnw-website/`. The prayer timetable will only load on the preview if `salmanfs815.github.io` is an allowed domain for the Masjidal key.

### Bluehost (live)

Open **Actions → Deploy to Bluehost** (`.github/workflows/deploy-bluehost.yml`), select **Run workflow**, and run it from `main`. It builds the site and uploads `dist/` over FTPS. Pushing to `main` alone does not change the live site.

Only changed files are uploaded. The action keeps a `.ftp-deploy-sync-state.json` file in the server directory to track what it uploaded last time; don't delete it (if it goes missing, the next deploy simply re-uploads everything). Files on the server that the action never uploaded, such as `.htaccess`, are left alone.

#### One-time setup

In the repository on GitHub, open **Settings → Secrets and variables → Actions** and add:

| Kind | Name | Value |
| --- | --- | --- |
| Secret | `FTP_SERVER` | FTP host name, e.g. `ftp.cicsnw.org` |
| Secret | `FTP_USERNAME` | FTP account user name (from Bluehost cPanel → FTP Accounts) |
| Secret | `FTP_PASSWORD` | That account's password |
| Variable | `FTP_SERVER_DIR` | Folder to upload into, relative to the FTP account's home, ending in `/` — e.g. `public_html/`, or `./` if the account opens directly in the site folder |

Use the same folder you currently upload `dist/` into by hand. A dedicated FTP account limited to that folder is safest.

## Uploading to another hosting service

Upload the **contents of `dist/`** to the hosting service's public web root. Do not upload `src/`, `app/`, `node_modules/`, or the project root as the public website.

Common platform settings:

- Build command: `npm run build`
- Publish/output directory: `dist`
- Framework preset: Vite, React, or Static Site
- Node version: 22.13 or newer

This works with services such as Cloudflare Pages, Netlify, Vercel static hosting, GitHub Pages with an appropriate base path, or conventional hosting where files are uploaded by SFTP/FTP.

If the site is hosted below a subdirectory instead of at the domain root, set `VITE_BASE_PATH` to that path before building.

## Adding gallery photos

1. Add an optimized `.jpg`, `.png`, `.webp`, or `.avif` image to `public/gallery/`.
2. Add an entry to `content/gallery.json`:

```json
[
  {
    "src": "/gallery/community-iftar.webp",
    "alt": "Families gathering for a community iftar at Taiba Musalla",
    "caption": "Community iftar"
  }
]
```

`alt` text is required and should briefly describe what is visible for people using screen readers. `caption` is optional. Keep filenames lowercase, use hyphens instead of spaces, and resize large camera photos before adding them. WebP or AVIF is preferred for smaller downloads.

The gallery automatically includes each valid entry in its carousel. Push the change to `main`, then [deploy to Bluehost](#bluehost-live) to publish it.

## Recognizing ambassadors

Once an ambassador's combined donations and pledges reach $10,000, add them to the recognition wall on the Ambassador Program page by adding an entry to `content/ambassadors.json`:

```json
[
  {
    "name": "Jane Doe",
    "recognizedDate": "September 2026"
  }
]
```

Push the change to `main`, then [deploy to Bluehost](#bluehost-live) to publish it.

## Logo and other public files

The supplied logo is stored at `public/cicsnw-logo.png`. Replace that file with the same filename to update the logo everywhere without editing the page component.

## Prayer times

The live timetable (`app/components/PrayerTimes.tsx`) is the site's own design, filled with data from the Masjidal API. Set the public Masjidal API key (`msj_pk_…`, from Masjidal **Integrations → Widgets → Publish → Embed**) as `VITE_MASJIDAL_API_KEY` in `.env`. The key only works on the domains allowed for it in Masjidal, so the timetable cannot load on `localhost`. If the key is blank or the request fails, only the Awqat link (`VITE_AWQAT_URL`) is shown; that page is also the card's monthly timetable link.

## Analytics

The site uses [Umami Cloud](https://cloud.umami.is) for privacy-friendly, cookieless analytics: page views, traffic sources, locations, and donate-button clicks. Because it sets no cookies and collects no personal information, no cookie banner is needed.

To enable it, add the site in Umami, copy its website ID, and set `VITE_UMAMI_WEBSITE_ID` in `.env`. The tracker is only added to production builds, so `npm run dev` never records visits. Leaving the variable blank builds the site without analytics.

Every donate link sends a **Donate click** event with a `location` property (`header`, `header-mobile`, `mobile-menu`, `hero`, `sponsor`, `ambassador-pledge`, or `footer`). New donate links should use the same tracking:

```tsx
<a href={siteConfig.donationUrl} {...donateTracking("new-location")}>Donate</a>
```

Umami records the click, not the donation itself; completed donations are reported by the donation platform.

Visits from WhatsApp, Instagram, and email often arrive without referrer information and appear as direct traffic. Add UTM parameters to links shared there so Umami can attribute them, for example `https://cicsnw.org/?utm_source=whatsapp&utm_campaign=masjid-launch`.

### Flyer tracking

Flyers use two addresses, so their traffic can be separated from other visits:

- **QR code: `https://cicsnw.org/qr/`.** This page (`qr/index.html`) lets Umami record the visit, then sends the person to `VITE_DONATION_URL`. In Umami, visits to `/qr/` are the scan count. The page still continues to the donation page if Umami is slow or blocked, but those scans are not counted. The print-ready codes are `flyer/donate-qr-code.svg` and `flyer/donate-qr-code.png`.
- **Printed web address: `cicsnw.org/masjid`.** This page (`public/masjid/index.html`) forwards to the home page with `utm_source=flyer`, `utm_medium=print`, and `utm_campaign=new-masjid`, so the visit appears under those UTM values in Umami.

Keep both pages on the site for as long as flyers are in circulation. Removing or renaming either one breaks the printed flyers.

### Donation links for social media

To count donation-page visits from a channel, link to `https://cicsnw.org/donate/` with UTM parameters instead of linking to the donation platform directly. This page (`donate/index.html`) works like `/qr/`: Umami records the visit with its UTM values, then the page sends the person to `VITE_DONATION_URL`. For example, the Instagram donation link is:

```text
https://cicsnw.org/donate/?utm_source=instagram&utm_medium=social&utm_campaign=new-masjid
```

In Umami, visits to `/donate/` are donation-link clicks, and UTM Source shows which channel they came from. Keep this page on the site while any of these links are posted.

### Arabic Studies link

`https://cicsnw.org/arabic/` (`arabic/index.html`) works the same way for the Arabic Studies program: Umami records the visit with its UTM values, then the page sends the person to `VITE_ARABIC_STUDIES_URL`. For example:

```text
https://cicsnw.org/arabic/?utm_source=whatsapp&utm_medium=social&utm_campaign=arabic-studies
```

## Important maintenance notes

- This is a static multi-page site with two content pages (`index.html` and `ambassador.html`) plus the redirect pages described under [Flyer tracking](#flyer-tracking) and [Donation links for social media](#donation-links-for-social-media). Within each content page, navigation links scroll to sections on that same page.
- There is no server-side code, authentication, database, or content-management system.
- Never place secrets in `VITE_` environment variables; Vite includes those values in public browser code.
- The values in `.env` are not secret, which is why it is committed. FTP credentials live only in GitHub Actions secrets.
- Deployments build automatically; a failed build (including TypeScript errors) stops the upload, so a broken change never reaches the live site.
- Preserve meaningful image `alt` text and visible keyboard focus when changing the interface.
