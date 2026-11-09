import guideSidePanel from "../assets/guide/guide-side-panel.png";
import guideScoreSummary from "../assets/guide/guide-score-summary.png";
import guideCookieList from "../assets/guide/guide-cookie-list.png";
import guideCookieDetails from "../assets/guide/guide-cookie-details.png";
import guideTrackingProtection from "../assets/guide/guide-tracking-protection.png";
import guideSettings from "../assets/guide/guide-settings.png";

// Step-by-step guide derived from real CookieCrumbs screenshots.
export const userGuideSteps = [
  {
    id: "open-panel",
    title: "Open the side panel",
    body: "After installing CookieCrumbs, pin its icon to the toolbar. Open any website and click the icon to launch the side panel. The current page is analyzed automatically, so there is nothing to scan or refresh.",
    image: guideSidePanel,
    alt: "The CookieCrumbs side panel open next to a GitHub dashboard, showing a privacy score of 49 out of 100, risk composition, Session Guard status, and a cookie list.",
    caption: "The side panel opens beside the page and analyzes the current site automatically.",
    layout: "wide",
  },
  {
    id: "privacy-score",
    title: "Read the privacy score",
    body: "The 0-100 score summarizes cookie categories, lifespans, first- and third-party origin, and tracking risk. Higher is better. A plain-language summary explains what the score means and which kinds of cookies the site sets.",
    image: guideScoreSummary,
    alt: "CookieCrumbs summary showing a 49 out of 100 Poor score, 16 cookies, and an explanation of functional, analytics, and essential cookies.",
    caption: "The summary explains the score and the kinds of cookies the site uses.",
    layout: "narrow",
  },
  {
    id: "cookie-list",
    title: "Inspect cookies and their details",
    body: "The Cookie List tab lists every cookie with its origin (first- or third-party), lifetime, and security flags such as HttpOnly and Secure. Select a cookie to see its vendor, domain, data collected, and destination.",
    images: [
      {
        src: guideCookieList,
        alt: "Cookie list showing cookie names, first-party origin, session and long lifetimes, and HttpOnly/Secure flags.",
        caption: "The list shows origin, lifetime, and security flags at a glance.",
      },
      {
        src: guideCookieDetails,
        alt: "Cookie details for a GitHub cookie showing vendor, domain, data collected, destination, origin, lifetime, and flags.",
        caption: "Details show the vendor, data collected, destination, and flags.",
      },
    ],
    layout: "pair",
  },
  {
    id: "tracking-protection",
    title: "Review tracking protection",
    body: "On sites that load third-party trackers, the on-page tier list groups destinations by risk. High-risk fingerprinting scripts and advertising trackers are flagged so you can decide whether to block them. The summary shows how many trackers were found and whether any are invasive.",
    image: guideTrackingProtection,
    alt: "A sports website with the CookieCrumbs tier list open, grouping third-party destinations into High Risk, Advertising, and Safe Utilities.",
    caption: "The tier list groups third-party destinations by risk on the page.",
    layout: "wide",
  },
  {
    id: "settings",
    title: "Configure settings and exemptions",
    body: "Open Settings to turn CookieCrumbs on or off, toggle cookie consent analysis and the score widget, and manage exempt sites. Tracking Protection and Session Guard keep separate exemption lists, so a site can be exempt from one feature but not the other.",
    image: guideSettings,
    alt: "CookieCrumbs settings with toggles for the extension, cookie consent, and widget, plus separate Tracking Protection and Session Guard exempt-site lists.",
    caption: "Settings control the extension and per-feature exemption lists.",
    layout: "narrow",
  },
];

export const quickTips = [
  "Pin the CookieCrumbs icon so the side panel is one click away.",
  "Treat the privacy score as an estimate, not a guarantee of safety.",
  "Exempt a site from Tracking Protection if a login or checkout breaks.",
  "Session Guard exemptions are separate — add the site to both lists if needed.",
];
