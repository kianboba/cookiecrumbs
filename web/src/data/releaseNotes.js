// Release notes generated from cookiecrumbs-v2/CHANGELOG.md (trimmed for a
// general audience; internal file names and counts omitted).
export const releaseNotes = [
  {
    version: "5.19",
    date: "2026-11-08",
    changes: [
      "Security fix: hardens the consent overlay against spoofed messages from page scripts.",
      "Consent Transparency works on accept-only cookie banners, and treats fixed cookie bars as consent controls.",
    ],
  },
  {
    version: "5.18",
    date: "2026-10-26",
    changes: [
      "Dataset corrections: third-party hosting domains are no longer treated as strictly necessary cookies.",
      "Domain categories now follow the majority evidence across the Open Cookie Database and Disconnect.me.",
      "Privacy scores on sites that load major vendors are now more honest (lower where deserved).",
    ],
  },
  {
    version: "5.17",
    date: "2026-10-19",
    changes: [
      "Consent interception now fires on accept-only cookie banners.",
      "Hover previews become less trigger-happy: weak consent matches require a click instead of a hover.",
    ],
  },
  {
    version: "5.16 and earlier",
    date: "2026-09",
    changes: [
      "Cookie detection, five-category classification, privacy scoring, tracker blocking, Session Guard, consent interception, and the threat overlay.",
    ],
  },
];
