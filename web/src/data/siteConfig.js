// Product configuration for CookieCrumbs.
// Single source of truth: cookiecrumbs-v2/manifest.json + README.md.
// Items still marked PLACEHOLDER need real values before final submission.

export const siteConfig = {
  productName: "CookieCrumbs",
  tagline:
    "A Chrome extension that analyzes the cookies any site sets, scores its privacy, and protects you while you browse.",
  description:
    "CookieCrumbs detects, classifies, and blocks tracking cookies as you browse, and gives every website a privacy score from 0-100. It runs 100% locally — no accounts, no telemetry, no cookies of its own.",
  version: "5.19",
  releaseDate: "2026-11-08",
  // Downloadable extension package (served from /public/downloads/).
  downloadUrl: `${import.meta.env.BASE_URL}downloads/cookiecrumbs.zip`,
  installerFileName: "cookiecrumbs.zip",
  installerSize: "~1.7 MB",
  platforms: [
    "Google Chrome (desktop)",
    "Microsoft Edge (desktop)",
    "Brave (desktop)",
  ],
  supportEmail: "support@example.com", // PLACEHOLDER
  copyright: "© 2026 CookieCrumbs. All rights reserved.",
};
