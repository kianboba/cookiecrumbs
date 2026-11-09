# CookieCrumbs Website (merged)

The merged landing page + support portal: the UI/UX of the original static
hand-rolled landing (`../site/`) carrying the features of the React support
portal — homepage, downloads, installation guide, user guide, searchable FAQ,
support.

- **Stack:** Vite + React 19 + react-router 7 + Tailwind 3.4 (bundled locally;
  zero third-party runtime requests — no analytics, no external fonts)
- **Design:** dark-first cookie-amber × privacy-teal tokens (CSS variables in
  `src/index.css`), light fallback via `prefers-color-scheme`
- **Content source of truth:** `cookiecrumbs-v2/manifest.json` + README
  (extension v5.19)

## Development

```sh
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the build
npx serve -s -l 8711 dist   # SPA-fallback preview (used in QA)
```

Deployment instructions: see `DEPLOYMENT.md` (Vercel, one import).

## Key files

| File | Purpose |
|---|---|
| `src/index.css` | design tokens + components (panel mock, chips, score ring) |
| `tailwind.config.js` | token mappings from the old static palette |
| `src/data/siteConfig.js` | version, tagline, download URL |
| `src/data/features.js` | feature grid (kept in sync with the extension) |
| `src/data/releaseNotes.js` | generated from `cookiecrumbs-v2/CHANGELOG.md` |
| `src/data/faqData.js` | 40+ categorized, searchable Q&As |
| `public/downloads/cookiecrumbs.zip` | the real extension package (regenerated each release) |
| `src/assets/guide/` | real side-panel screenshots used by the User Guide |

## Placeholders still to replace before launch

- `support@example.com` in `src/data/siteConfig.js`
