// Real feature list derived from cookiecrumbs-v2/manifest.json + README.md
// (extension v5.19). Each entry must describe behavior that exists in the
// current build.
export const features = [
  {
    title: "Cookie Detection",
    description:
      "Sees every cookie a site sets: first-party, third-party, session, persistent, JavaScript-set, and partitioned.",
    icon: "EyeOff",
  },
  {
    title: "Classification & Cookie Table",
    description:
      "Sorts every cookie into five categories by purpose — Strict, Performance, Functionality, Advertising, Unknown — and lists each by name, party, lifespan, and security flags with plain-English details on click.",
    icon: "ListChecks",
  },
  {
    title: "Privacy Score (0–100)",
    description:
      "Scores every site based on cookie category, party, persistence, and known-tracker status, with a plain-English label — an honest number, not a vibe.",
    icon: "BarChart3",
  },
  {
    title: "Tracking Protection",
    description:
      "Blocks tracking cookies automatically as you browse and stops tracker domains at the network level before their requests fire. Essential cookies are preserved. Always on, by design.",
    icon: "Ban",
  },
  {
    title: "Session Guard",
    description:
      "Removes weak session cookies — the ones missing Secure or HttpOnly — after you leave a site, so they can't be hijacked later. Toggleable anytime.",
    icon: "Shield",
  },
  {
    title: "Consent Transparency",
    description:
      "Before you accept a cookie banner, CookieCrumbs pauses and shows what data will be collected and which companies receive it.",
    icon: "ShieldCheck",
  },
  {
    title: "Per-Site Exemptions",
    description:
      "Two independent whitelists — one for Tracking Protection, one for Session Guard. If a site breaks, click “Exempt this site” and it stays fixed.",
    icon: "Zap",
  },
  {
    title: "100% Local",
    description:
      "Analysis, classification, scoring, and the encrypted local storage all happen inside your browser. Disconnect the network and everything keeps working.",
    icon: "Clock",
  },
];
