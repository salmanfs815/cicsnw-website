# CICSNW website

Static fundraising and community website for CICSNW, Taiba Musalla, and the New West Masjid project.

The site has no backend, database, accounts, or login requirement. A production build consists entirely of static HTML, CSS, JavaScript, and image files that can be hosted by any normal static hosting service.

## Technology

- React 19 for page components
- TypeScript for type checking
- Vite 8 for local development and production builds
- Plain CSS in `app/globals.css` for the visual design and responsive layout
- JSON in `content/gallery.json` for the maintainable gallery list

The main page component is `app/page.tsx`. The browser entry point is `src/main.tsx`. Files placed in `public/` are copied unchanged to the root of the production site.

## Requirements

- Node.js 22.13 or newer
- npm

## First-time setup

```bash
npm install
```

Copy `.env.example` to `.env.local`, then update the public site configuration values. For example:

```env
VITE_DONATION_URL=https://your-fundraising-platform.example/donate
VITE_FUNDS_RAISED=10000
VITE_CONTACT_EMAIL=contact@cicsnw.org
```

The environment file controls the fundraising totals and milestones, sponsorship amount, contact details, address, CRA registration number, social links, and prayer-time URLs. Monetary values are entered as plain numbers without `$` signs or commas. Restart the development server after changing an environment variable.

All variables exposed to the browser must begin with `VITE_`. These values are public configuration, not secrets. When deploying through a hosting provider, add the same variables in that provider's environment-variable settings before building.

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

## Uploading to a hosting service

Upload the **contents of `dist/`** to the hosting service's public web root. Do not upload `src/`, `app/`, `node_modules/`, or the project root as the public website.

Common platform settings:

- Build command: `npm run build`
- Publish/output directory: `dist`
- Framework preset: Vite, React, or Static Site
- Node version: 22.13 or newer

This works with services such as Cloudflare Pages, Netlify, Vercel static hosting, GitHub Pages with an appropriate base path, or conventional hosting where files are uploaded by SFTP/FTP.

If the site is hosted below a subdirectory instead of at the domain root, update Vite's `base` option in `vite.config.ts` before building.

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

The gallery automatically switches from its empty state to the photo grid when at least one valid entry is present. Run `npm run build` and upload the refreshed `dist/` contents after changing photos.

## Logo and other public files

The supplied logo is stored at `public/cicsnw-logo.png`. Replace that file with the same filename to update the logo everywhere without editing the page component.

## Prayer times

The two Athan+ widget URLs and the Awqat fallback URL are configured through `VITE_ATHAN_DESKTOP_EMBED_URL`, `VITE_ATHAN_MOBILE_EMBED_URL`, and `VITE_AWQAT_URL`.

## Important maintenance notes

- This is a single-page static site. Navigation links scroll to sections on the same page.
- There is no server-side code, authentication, database, or content-management system.
- Never place secrets in `VITE_` environment variables; Vite includes those values in public browser code.
- The values in `.env.example` are not secret and are safe to configure in the hosting provider.
- Run `npm run build` before every deployment. A successful build performs TypeScript checking first.
- Preserve meaningful image `alt` text and visible keyboard focus when changing the interface.
