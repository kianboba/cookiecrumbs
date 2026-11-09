# CookieCrumbs — Landing Page

Static single-page site for the CookieCrumbs extension. Plain HTML/CSS/vanilla JS —
no framework, no build step, no third-party requests, no analytics.

Live URL (post-deploy): `https://cookiecrumbs-*.vercel.app` (exact subdomain set at deploy time).

## Local preview

Double-click `start-server.cmd` (starts a hidden background server on
`http://127.0.0.1:8710`; safe to re-run — a copy already serving exits quietly), or serve
the folder any way you like:

```sh
# any static file server pointed at this folder
powershell -NoProfile -ExecutionPolicy Bypass -File serve.ps1   # http://127.0.0.1:8710
```

## Structure

- `index.html` — all 9 sections (nav, hero, trust strip, how it works, features, privacy, install, FAQ, footer)
- `css/styles.css` — dark-mode-first design (amber × privacy-teal), light fallback via `prefers-color-scheme`, mobile-first breakpoints at 768/1080px, reduced-motion + print support
- `js/main.js` — mobile nav toggle + hero score count-up (IntersectionObserver, reduced-motion aware)
- `assets/` — extension icons (copied from `cookiecrumbs-v2/icons/`)

## Notes

- The hero "panel" is a CSS mock of the side panel. Per the plan (Phase 0), swap it
  for an annotated real screenshot against a synthetic test site; keep it ≤ 150 KB.
- FAQ uses native `<details>` elements (no JS needed).
- Placeholder links: GitHub URLs currently point to `https://github.com/` — update to
  the real repo URL before launch.
- Deploy: import this repo into Vercel with **Root Directory = `site`** (framework: other),
  or run `npx vercel --prod` from this folder.
