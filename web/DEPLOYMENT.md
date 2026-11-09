# Deployment Guide — CookieCrumbs Website

The site is a static SPA (Vite + React + Tailwind). It deliberately contains no
analytics, no external fonts, and no third-party scripts — self-verify after
every deploy with DevTools → Network (only own-origin requests + `data:` URIs
should appear).

## 1. Production Build

```bash
npm install
npm run build
```

Output is written to `dist/`. Preview locally before deploying:

```bash
npm run preview
```

## 2. Vercel Deployment (decided in Nov 2026 planning)

1. Import this repo into Vercel.
2. Set **Root Directory** to `web`, **Framework Preset** to "Vite".
3. Build command `npm run build`, output directory `web/dist` (Vercel defaults).
4. The `base: '/'` setting in `vite.config.js` matches a root deploy; the router
   derives its basename from `BASE_URL`, so subpath deployments also work.
5. SPA fallback: Vercel serves `index.html` for unknown routes when the output
   is Vite's — verify `/faq` resolves after the first deploy. If it 404s, add a
   `vercel.json` rewrites rule:

   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```

6. A custom domain can be attached later in the Vercel dashboard.

## 3. Content / Package Updates

All copy, version numbers, and release notes live in `src/data/*.js`. When the
extension is updated: bump `siteConfig.version`, update `releaseNotes.js`, and
replace `public/downloads/cookiecrumbs.zip` with the freshly built package
(the zip is generated from the `cookiecrumbs-v2` extension folder).

Support email is still a placeholder (`support@example.com`) — set a real
address in `src/data/siteConfig.js` before launch.

## 4. Deployment Checklist

- [ ] `npm run build` succeeds with no errors
- [ ] Support email updated
- [ ] Download button serves the correct `cookiecrumbs.zip`
- [ ] All routes tested on desktop and mobile (/, /downloads,
      /installation-guide, /user-guide, /faq, /support, /404)
- [ ] FAQ search verified
- [ ] Lighthouse: Accessibility / Best Practices / SEO = 100 (Performance
      ≥ 90)
- [ ] DevTools Network audit: no third-party requests

## 5. Post-Deploy Verification

- Homepage hero + side-panel mock render
- Nav links resolve (no 404s)
- Downloads page shows v5.19 and a working download
- FAQ search works
- Mobile drawer works and closes on Escape
