# CookieCrumbs — Landing Page Development Plan

> Plan for a single-page marketing/landing site for the CookieCrumbs Chrome extension.
> Status: approved (Nov 2026 review — open questions in §8 are resolved). Owner: TBD.

## 1. Context

CookieCrumbs is a local-first Chrome (Manifest V3) extension that:

- Detects and classifies every cookie a site sets (first/third-party, JS-set, partitioned) into 5 categories
- Renders a full cookie table (name, party, lifespan, security flags) in a side panel
- Computes a 0–100 privacy score per site with a plain-English label
- Blocks tracking cookies + tracker domains at network level (automatic, no off switch)
- Offers Session Guard (removes hijackable weak session cookies)
- Shows Consent Transparency before a banner is accepted

Fact-finding notes that shape this plan:

- **No Web Store listing yet.** The README install flow is "download folder → chrome://extensions → Load unpacked". The page must present this cleanly as a first-class CTA, with a store badge as a future slot.
- **Credibility is built-in:** classification is powered by public datasets — CookieBlock (USENIX 2022), Open Cookie Database, Disconnect.me, Consent-O-Matic (from `manifest.json`). This is prime landing-page material.
- **Nothing else is public-facing yet**, so this page doubles as the project's first web presence.

## 2. Goals

1. Get a visitor to **install CookieCrumbs** (primary CTA).
2. Communicate "privacy analysis + protection, runs 100% locally" in under 10 seconds.
3. Serve as the permanent URL for the extension (`cookiecrumbs...` — final domain TBD) and the future Web Store listing "website" field.

**Success metrics (first 90 days):** download clicks, install-page drop-off, Lighthouse ≥ 90 across all four categories, no third-party requests.

**Non-goals (v1):** docs site, blog, changelog page, sign-up/accounts, analytics beyond a privacy-friendly counter.

## 3. Audience & messaging

- **Primary:** privacy-conscious Chrome users who saw the extension recommended somewhere.
- **Secondary:** technical users who want proof (datasets, how classification works, what runs where).

Core message ladder:
1. "See every cookie. Understand your privacy.
2. "Score, classify, block — automatically."
3. "100% local. No accounts, no telemetry."

## 4. Page structure (v1, single page)

| # | Section | Content source | Notes |
|---|---------|----------------|-------|
| 1 | **Nav** | — | Logo (existing `icon128.png`), anchors: Features, How it works, Privacy, FAQ; CTA button right |
| 2 | **Hero** | — | Headline + subline + primary CTA ("Install manually") + secondary ("See how it works ↓") + "v5.19 · actively maintained" version badge (moved up from Phase 5). Hero visual: annotated screenshot of the side panel showing the cookie table + score |
| 3 | **Trust strip** | manifest description | Datasets badges: CookieBlock · Open Cookie Database · Disconnect.me · Consent-O-Matic; "Runs entirely in your browser" |
| 4 | **How it works** | README | 3 steps: Browse → CookieCrumbs watches locally → Score + auto-protection. Optionally an interactive privacy-score demo (Section 8) |
| 5 | **Features grid** | README "Detection" + "Protection" + "Control" | 6 cards: Cookie Detection, Classification + Cookie Table, Privacy Score, Tracking Protection, Session Guard, Consent Transparency |
| 6 | **Privacy statement block** | this plan | "What CookieCrumbs never does" — no telemetry, no servers, no accounts, no cookies of its own. Address the irony of a cookie extension sending cookies |
| 7 | **Install section** | README Install | Steps 1–4 from README restyled with numbered visuals; link to GitHub repo/zip; "Chrome-based browsers, Manifest V3" requirement |
| 8 | **FAQ** | below, drafted here | 6–10 questions (see `FAQ draft`) |
| 9 | **Footer** | TBD | Copyright, GitHub link, disclaimer, future Web Store badge placeholder |

### FAQ draft (to finalize)
- Does CookieCrumbs collect my data? (No — everything runs in the browser; why each Chrome permission is needed.)
- Will it break websites? (Per-site exemptions exist for both Protection systems.)
- Can I turn off blocking? (Tracking Protection is always on by design; Session Guard is toggleable.)
- What powers the classification? (ML model trained on public datasets — link them.)
- Why "Load unpacked" / will it be on the Web Store? (Yes-planned; card slot reserved.)
- What browsers are supported? (Any Chromium browser with MV3.)

## 5. Tech stack decisions

- **Static hand-rolled HTML + CSS + a little vanilla JS** — matches the extension's own stack; no framework, no build step, trivially maintainable.
- **Zero third-party requests:** system font stack (or self-hosted font if needed), inline SVG icons, self-hosted screenshots. The page must pass the same standard the extension promises.
- No analytics at launch; if added later: a self-hosted, cookie-free counter only, disclosed on the page.
- **Hosting:** Vercel (decided Nov 2026) — static deploy from the repo, Root Directory = `site/`, no build command. Free Hobby tier covers this project; a custom domain can be attached later in the Vercel dashboard. The page stays plain static HTML so it remains portable to any host. No analytics or Vercel scripts beyond asset serving.

## 6. Design direction

- **Personality:** warm cookie amber/crumbs accent on a calm privacy-teal/dark base — "friendly, not alarmist".
- Dark-mode-first (matches a privacy tool's aesthetic), readable light fallback. CSS custom properties for theming.
- Typography: system stack (`Inter`-like fallback), tight hero display size.
- Visual evidence: real, annotated screenshots of the side panel (cookie table, score, banner transparency prompt) — these carry the page and must be captured first (Section 8, Phase 2).
- Responsibility: `prefers-reduced-motion` support, semantic headings, visible focus states.

## 7. Milestones & deliverables

### Phase 0 — Discovery & setup (0.5 day)
- [x] Hosting decided: Vercel; page lives in `site/` subfolder of this repo
- [ ] Confirm the vercel.app subdomain at deploy time (e.g. `cookiecrumbs-x.vercel.app`); custom domain optional later
- [ ] Create/confirm public repo for the download
- [ ] Capture the 3–4 key side-panel screenshots against a **synthetic test site** with dummy cookies/domains (decided — no real browsing data)

### Phase 1 — Content & copy (0.5–1 day)
- [ ] Write all copy into the sections above (single source: this file → then HTML)
- [ ] Finalize FAQ list
- [ ] Choose visuals per section

### Phase 2 — Build (2–3 days)
- [x] `site/index.html` skeleton with semantic structure + OG/meta tags
- [x] CSS (custom properties, dark-first + light fallback, responsive: mobile-first, breakpoints 768px/1080px)
- [x] Sections 1–4 (nav, hero + panel mock, trust strip, how it works)
- [x] Sections 5–9 (features grid, privacy block, install steps, FAQ accordion via native `<details>`, footer)
- [x] Interactive extras: hero score count-up (reduced-motion aware); "hover to reveal rows" dropped in favor of the always-visible mock table

### Phase 3 — Polish & QA (1 day)
- [x] Lighthouse audit: Accessibility 1.0, Best Practices 1.0, SEO 1.0 (light-mode contrast fixes: chip + button ink; `robots.txt` added)
- [x] Screenshots → replaced by self-contained CSS mock of the side panel (zero images on the page); swap for annotated real screenshot in Phase 0 when captured
- [ ] Check: keyboard nav, screen-reader labels (audit-clean, manual pass pending), reduced motion (CSS + JS honored), mobile layout
- [x] Favicon + OG tags in place
- [ ] Performance re-audit on live deploy (local file audit can't measure perf)

### Phase 4 — Launch (0.5 day)
- [ ] Import repo to Vercel (Root Directory: `site/`, framework: "Other") or run `npx vercel --prod` from `site/`
- [ ] Verify the live `*.vercel.app` URL serves the page
- [ ] Verify no third-party requests (DevTools Network); only own origin + asset-serving origin
- [ ] Point README ("Project website") and any link-holders at the live URL
- [ ] Announce where extension currently gets shared

### Phase 5 — Post-launch backlog
- [x] Livesite merged: static landing design (UI) + React support-portal features (see `web/`) — Dec 2026
- [ ] Web Store listing; swap hero CTA to store badge, keep manual install as tertiary
- [ ] Attach custom domain in Vercel dashboard

> **Nov 2026 update:** the proposed single static page was superseded by a merge of
> two sites — the static `site/` landing (design foundation) and a React support
> portal (features: downloads, guides, searchable FAQ, support page). The merged
> app lives in `web/`, theming was ported to the landing's design tokens, content
> reconciled to extension v5.19, and all six routes audit at Lighthouse
> Accessibility/Best-Practices/SEO 1.0 with zero third-party requests.

## 8. Resolved decisions (Nov 2026 review)

| Question | Decision |
|---|---|
| Hosting | Vercel; `site/` subfolder, Root Directory deploy |
| URL | `*.vercel.app` subdomain at launch; custom domain attachable later |
| Screenshots | Synthetic test site with dummy cookies only |
| Analytics | Zero — no counter, no Vercel Analytics (would break the no-third-party rule) |
| Version badge | v5.19 badge lives in the hero at v1 (was Phase 5 backlog) |
| FAQ source | Answers lifted largely from the README's Detection/Protection/Control sections |

## 9. Risks

| Risk | Mitigation |
|---|---|
| No Web Store link at launch looks second-rate | Manual install steps get a polished, guided treatment; explicit "Web Store listing coming" note |
| Screenshots leak real browsing data | Shoot against local/sandbox test pages |
| Page undermines privacy promise | Hard rule: no third-party requests, self-audit at launch |
| Vercel Hobby banner/limits change | Page is plain static HTML — portable to any static host in minutes; no vendor lock-in |
| Scope creep into full docs site | v1 is one page; docs go on the repo README/issue tracker |
