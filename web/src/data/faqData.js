// Comprehensive FAQ for CookieCrumbs.
// Answers are arrays of blocks so the accordion can render paragraphs,
// bullet lists, numbered steps, and callouts. A plain string is still valid.

export const faqCategories = [
  {
    category: "General",
    items: [
      {
        q: "What is CookieCrumbs?",
        a: [
          "CookieCrumbs is a cybersecurity browser extension that analyzes the cookies and trackers a website uses, explains what it finds, and gives the site a privacy score from 0 to 100.",
          "It runs in a side panel beside the page you are viewing. As you browse, it inspects cookies, page elements, server headers, and external resources, then classifies what it finds and updates the score automatically — there is no manual scan button to press.",
          "Beyond analysis, CookieCrumbs can warn you about tracking before you accept a cookie banner, block requests to high-risk tracker domains, and remove insecure session cookies when you leave a site.",
        ],
      },
      {
        q: "Who is CookieCrumbs for?",
        a: [
          "It is designed for anyone who wants to understand what a website is doing with their data before they click “Accept” on a cookie banner.",
          { list: [
            "Everyday users who want a plain-language explanation of a site's tracking.",
            "Privacy-conscious users who want selective, risk-based protection rather than blanket blocking.",
            "Students, researchers, and IT teams who need a transparent, explainable view of cookie behavior.",
          ] },
          "You do not need a technical background to use the side panel. The score summary is written in plain language, while the cookie list and details are available if you want to dig deeper.",
        ],
      },
      {
        q: "Is CookieCrumbs free?",
        a: "Yes. CookieCrumbs is a free capstone project. There is no account, subscription, paywall, or in-app purchase. The extension is distributed as an unpacked package for the project demo rather than through a browser add-on store.",
      },
      {
        q: "Which browsers are supported?",
        a: [
          "CookieCrumbs supports desktop Chromium-based browsers: Google Chrome, Microsoft Edge, and Brave. It is built on Manifest V3.",
          { note: "Firefox, Safari, and mobile browsers are not supported. The side panel and extension APIs it relies on are Chromium-specific." },
        ],
      },
      {
        q: "Do I need an account or sign-in?",
        a: "No. There is no account, login, or cloud sync. Everything runs locally in your browser profile, and your settings and exemptions stay on that device.",
      },
      {
        q: "Does CookieCrumbs replace my ad blocker or antivirus?",
        a: [
          "No. CookieCrumbs is complementary to those tools, not a replacement.",
          "It focuses on cookie and tracker privacy risk: classifying cookies, scoring a site's privacy posture, estimating tracking before consent, and selectively blocking high-risk tracker domains. It is not a general ad blocker, malware scanner, or antivirus, and it does not attempt to detect malicious downloads or phishing pages.",
          "You can run it alongside an ad blocker, though two extensions that both modify requests may occasionally interact. If a site behaves oddly, try exempting it or temporarily disabling one extension to isolate the cause.",
        ],
      },
      {
        q: "How is it different from my browser's built-in cookie settings?",
        a: [
          "Browser settings are usually broad and binary: allow or block cookies, per site or globally. CookieCrumbs adds context and selective protection.",
          { list: [
            "It classifies each cookie into a meaningful category instead of treating all cookies the same.",
            "It explains why a site scored the way it did, with a breakdown of the cookies and trackers involved.",
            "It estimates tracking before you accept a consent banner.",
            "It can block requests to high-risk tracker domains while keeping authentication and site-essential services working.",
            "It can remove insecure session cookies when you navigate away or close the browser.",
          ] },
          "You can use both together. CookieCrumbs does not change your browser's global cookie settings.",
        ],
      },
      {
        q: "What version is this and when was it released?",
        a: "The current release is version 5.19. The version number is shown on the Downloads page along with the release notes.",
      },
    ],
  },
  {
    category: "Installation & Setup",
    items: [
      {
        q: "How do I install CookieCrumbs?",
        a: [
          "CookieCrumbs is installed as an unpacked extension. The whole process takes about two minutes:",
          { steps: [
            "Download the CookieCrumbs package (cookiecrumbs.zip) from the Downloads page.",
            "Extract the ZIP to a folder you can find again, for example your Documents folder.",
            "Open your browser's extensions page: chrome://extensions in Chrome, edge://extensions in Edge, or brave://extensions in Brave.",
            "Turn on Developer mode in the top-right corner of that page.",
            "Click Load unpacked and select the folder that contains manifest.json.",
            "Pin the CookieCrumbs icon to the toolbar, then open any website and click the icon to launch the side panel.",
          ] },
          "The Installation Guide page walks through the same steps with screenshots.",
        ],
      },
      {
        q: "Why does CookieCrumbs require Developer mode?",
        a: [
          "CookieCrumbs is distributed as an unpacked extension for the capstone demo, and Chromium browsers only allow unpacked extensions to load when Developer mode is enabled.",
          "This is a distribution choice, not a sign that the extension is unsafe. The extension files are plain, readable files on your computer, so you or your instructor can review them. Once loaded, it behaves like any other extension.",
        ],
      },
      {
        q: "Which folder do I select when I click “Load unpacked”?",
        a: [
          "Select the folder that directly contains manifest.json — not the ZIP file and not a parent folder that contains another folder.",
          "If you extracted the ZIP and see a folder named something like cookiecrumbs-5.19, open it and confirm manifest.json is inside. If you see a single nested folder, go one level deeper. Selecting the wrong level is the most common cause of a manifest error.",
        ],
      },
      {
        q: "“Load unpacked” is greyed out. What should I do?",
        a: "Developer mode is turned off. On chrome://extensions (or edge://extensions / brave://extensions), toggle Developer mode on in the top-right corner. The Load unpacked button should become clickable immediately. If it is still disabled, make sure the extensions page is not showing a managed-policy message that blocks developer extensions.",
      },
      {
        q: "I get a manifest error when loading the extension.",
        a: [
          "A manifest error almost always means the wrong folder was selected or the ZIP did not extract completely.",
          { list: [
            "Confirm manifest.json sits directly inside the folder you selected.",
            "If you selected a parent folder, go one level deeper and try again.",
            "Re-extract the ZIP with the built-in extractor or 7-Zip; some tools create an extra nested folder.",
            "Check that the ZIP finished downloading and is about 1.7 MB. A partial download cannot extract correctly.",
          ] },
          "After fixing the folder, click Load unpacked again. If the extension was partially loaded, remove it first from the extensions page.",
        ],
      },
      {
        q: "The extension installed, but I don't see its icon.",
        a: "Open the extensions menu (the puzzle-piece icon next to the address bar), find CookieCrumbs, and click the pin icon. The icon should then stay in the toolbar. If CookieCrumbs is not listed at all, it did not load successfully — return to the extensions page and check for an error message.",
      },
      {
        q: "Does CookieCrumbs work in Incognito mode?",
        a: [
          "Only if you explicitly allow it. Open the extensions page, choose CookieCrumbs → Details, and enable “Allow in Incognito”.",
          "Even then, Incognito restricts some browser data and storage behavior, so the panel may show fewer cookies or reset between sessions. This is a browser limitation, not a bug in CookieCrumbs.",
        ],
      },
      {
        q: "Does it work on every website?",
        a: [
          "It works on ordinary http:// and https:// pages. Some pages are off-limits because the browser blocks extensions from running there:",
          { list: [
            "Browser-internal pages such as chrome://settings, edge://extensions, and brave://settings.",
            "The browser's own add-on or extension store pages.",
            "Some built-in PDF viewers and error pages.",
          ] },
          "On those pages the panel may show no data. That is expected behavior enforced by the browser, not a failure of the extension.",
        ],
      },
      {
        q: "Does CookieCrumbs need an internet connection?",
        a: "Not for analysis. The cookie reference database and the machine-learning model are bundled with the extension and run locally, so classification and scoring work offline. You only need a connection to download the package or fetch an updated build.",
      },
      {
        q: "How do I update or uninstall CookieCrumbs?",
        a: [
          "To update: download the new package, extract it over your existing folder (or to a new folder), then open the extensions page and click the reload arrow on the CookieCrumbs card. Refresh any open tabs so the new version is used. There is no automatic update channel.",
          "To uninstall: open the extensions page, click Remove on the CookieCrumbs card, and confirm. You can then delete the extracted folder. Removing the extension also removes its locally stored settings and exemptions.",
        ],
      },
    ],
  },
  {
    category: "Using the Side Panel",
    items: [
      {
        q: "How do I open the side panel?",
        a: "Pin the CookieCrumbs icon to the toolbar, open the website you want to inspect, and click the icon. The side panel opens beside the page and analyzes the current site automatically. You do not need to start a scan or refresh first, although refreshing after installation is a good idea so the extension can observe the page from the beginning.",
      },
      {
        q: "What does the side panel show?",
        a: [
          "The panel is organized around the current site:",
          { list: [
            "A privacy score from 0 to 100 with a plain-language summary.",
            "Risk composition, showing what is contributing to the score.",
            "A Cookie List tab with every detected cookie, its origin, lifetime, and security flags.",
            "Cookie details for the cookie you select, including vendor, domain, data collected, and destination.",
            "Session Guard status for the site.",
            "A tier list that groups third-party destinations by risk when trackers are present.",
            "A settings view for toggles and exempt-site lists.",
          ] },
        ],
      },
      {
        q: "Why does a site show zero cookies?",
        a: [
          "There are a few common reasons:",
          { list: [
            "The site genuinely sets no cookies until you interact with it, for example after logging in or adding an item to a cart.",
            "The page loaded before the extension was installed or enabled, so it never observed the initial requests. Refresh the page.",
            "You are on a browser-restricted page such as chrome://settings, where extensions cannot inspect the page.",
            "A consent banner is blocking scripts; accept or dismiss it and reopen the panel.",
          ] },
          "Try refreshing, interacting with the page, then reopening the panel before assuming something is broken.",
        ],
      },
      {
        q: "What is the Cookie List tab?",
        a: "The Cookie List tab shows every cookie CookieCrumbs detected on the current page. Each row includes the cookie name, whether it is first- or third-party, how long it lives (session or a specific duration), and its security flags. Select a row to open the detailed view for that cookie.",
      },
      {
        q: "What do the cookie details include?",
        a: [
          "The detail view is meant to answer “what is this cookie and where does it go?” It typically shows:",
          { list: [
            "The vendor or company associated with the cookie.",
            "The domain that set it.",
            "The kind of data it collects, such as a session identifier or security token.",
            "The destination the data is associated with.",
            "Its origin (first- or third-party), lifetime, and security flags.",
          ] },
          "This is the view to use when you want to understand a specific cookie rather than the site as a whole.",
        ],
      },
      {
        q: "What do the HttpOnly, Secure, and SameSite flags mean?",
        a: [
          { list: [
            "HttpOnly: the cookie cannot be read by page JavaScript. This reduces the impact of cross-site scripting, because a script cannot simply steal the cookie value.",
            "Secure: the cookie is only sent over HTTPS connections, so it is not exposed over plain HTTP.",
            "SameSite: controls whether the cookie is sent with cross-site requests. Stricter values reduce cross-site request forgery risk.",
          ] },
          "A cookie without these flags is not automatically malicious, but missing flags on sensitive cookies are worth noticing. CookieCrumbs displays the flags so you can make that judgment.",
        ],
      },
      {
        q: "What is the difference between first-party and third-party cookies?",
        a: [
          "A first-party cookie is set by the site you are actually visiting — for example, the store you opened sets a cookie on its own domain.",
          "A third-party cookie is set by a different domain whose content is embedded in the page, such as an advertising network, analytics service, or social widget. Third-party cookies are generally the higher tracking risk because the same company can recognize you across many unrelated sites.",
          "CookieCrumbs labels each cookie's origin so you can tell the two apart at a glance.",
        ],
      },
      {
        q: "What does cookie lifetime mean?",
        a: "Lifetime is how long the cookie stays on your device. A session cookie is removed when you close the browser session. A persistent cookie has an expiry date and can remain for days, months, or even years. Longer-lived tracking cookies are a bigger privacy concern because they can identify you across many visits.",
      },
      {
        q: "What is risk composition?",
        a: "Risk composition is the breakdown of what is driving a site's score. Instead of only showing a single number, it shows which kinds of cookies and behaviors contribute to the result — for example, how much comes from advertising cookies, long-lived cookies, or third-party origins. It is the quickest way to understand why a score is high or low.",
      },
      {
        q: "What are the threat alerts and the on-page widget?",
        a: [
          "The on-page widget is a small overlay that updates continuously as cookies and tracking activity are detected. It is designed to give you feedback while you browse, without requiring you to open the side panel or run a scan.",
          "It can be turned off in Settings if you find it distracting. Turning it off does not disable analysis in the side panel.",
        ],
      },
      {
        q: "What is pre-consent estimation?",
        a: [
          "Cookie banners usually ask you to accept before the site has set all of its tracking cookies. Pre-consent estimation looks at script sources and tracker references on the page to estimate what tracking is likely to happen if you accept.",
          "It is an estimate, not a guarantee: a site may load trackers in ways the page does not reveal up front. Treat the estimate as an early warning, and use the side panel after consent for the concrete cookie list.",
        ],
      },
      {
        q: "Can I delete or block one specific cookie?",
        a: "CookieCrumbs is not a full cookie manager. It selectively identifies, restricts, and removes high-risk cookies and blocks future requests to high-risk tracker domains, while excluding authentication and site-essential services. For per-cookie deletion, use your browser's own developer tools or site-data settings. For protection that is too aggressive on a particular site, add that site to an exemption list instead.",
      },
    ],
  },
  {
    category: "Privacy Score & Classification",
    items: [
      {
        q: "How is the privacy score calculated?",
        a: [
          "The score is a 0-100 estimate of a site's privacy stance. Higher is better.",
          "It is built from several signals: the categories of cookies the site sets (strict, functionality, performance, advertising, unknown), how long those cookies live, whether they are first- or third-party, and the overall tracking risk those cookies represent.",
          "The result is a summary, not a formula you can reverse-engineer from a single cookie. Two sites with the same number of cookies can score differently because of what the cookies do and how long they persist.",
        ],
      },
      {
        q: "What do the score labels such as Poor or Good mean?",
        a: "The labels group ranges of the 0-100 score into plain-language bands, so you do not have to interpret a raw number. They are guidance, not a formal certification. A site labeled Poor is not necessarily unsafe or malicious — it may simply use many long-lived or third-party tracking cookies. Read the summary and risk composition for the reason behind the label.",
      },
      {
        q: "Why did a site's score change between visits?",
        a: [
          "Scores are computed from what is happening on the page at the moment you open it, so they can change for legitimate reasons:",
          { list: [
            "Advertising and analytics scripts rotate between visits, adding or removing cookies.",
            "You logged in, accepted a consent banner, or added something to a cart, which changes which cookies exist.",
            "A site updated its cookie policy or switched vendors.",
            "Your previous session expired, removing some cookies.",
          ] },
          "A small change is normal. A large, persistent change is worth investigating with the cookie list.",
        ],
      },
      {
        q: "Why does a site I trust get a poor score?",
        a: "The score measures cookie and tracking posture, not whether a company is trustworthy or whether its servers are secure. Many well-known sites embed advertising, analytics, and social widgets that set numerous third-party or long-lived cookies, which lowers the score. A poor score is a prompt to look at what the site collects — not proof that the site is dangerous.",
      },
      {
        q: "Why are some cookies labeled Unknown?",
        a: [
          "A cookie is labeled Unknown when CookieCrumbs cannot confidently place it in one of the known categories. That can happen when:",
          { list: [
            "The cookie is new or custom and is not in the reference database.",
            "It does not match a known wildcard prefix or blocklist entry.",
            "The local machine-learning model is not confident enough to assign a category.",
          ] },
          "Unknown does not mean malicious. It means “we could not classify this confidently,” and it is flagged so you can review the cookie details yourself.",
        ],
      },
      {
        q: "What are the five cookie categories?",
        a: [
          { list: [
            "Strict: necessary for the site to function, such as authentication or security cookies. These are normally excluded from blocking.",
            "Functionality: remember preferences and choices, such as language or display settings.",
            "Performance: measure how the site is used, such as analytics and diagnostics.",
            "Advertising: support ad delivery, targeting, and measurement, and are usually the highest tracking risk.",
            "Unknown: could not be confidently classified; worth reviewing manually.",
          ] },
        ],
      },
      {
        q: "How does CookieCrumbs classify cookies?",
        a: [
          "Classification uses a four-layer cascade, and the first confident match wins:",
          { steps: [
            "An exact match against the bundled cookie database.",
            "A wildcard prefix match for cookie families that share a naming pattern.",
            "Blocklist detection for known tracker or high-risk patterns.",
            "A local Random Forest model that classifies cookies not covered by the earlier layers.",
          ] },
          "This layered approach favors known, explainable matches first and only falls back to machine learning when the earlier layers cannot decide.",
        ],
      },
      {
        q: "Does the machine-learning model send my data anywhere?",
        a: "No. The Random Forest model is bundled with the extension and runs locally in your browser. Cookie data used for classification does not leave your device. This is why classification continues to work offline.",
      },
      {
        q: "How accurate is the classification and score?",
        a: "CookieCrumbs aims to be useful and explainable rather than perfect. Known cookies are matched against a curated database, which is reliable for common vendors. Custom or newly introduced cookies may fall through to wildcard, blocklist, or machine-learning layers, and some will end up Unknown. The score is an estimate built from those classifications. Treat both as informed guidance, not as an audit or a legal compliance determination.",
      },
      {
        q: "Is the privacy score a security rating?",
        a: "No. It is a privacy and cookie-tracking estimate. It does not test for malware, vulnerabilities, phishing, or server misconfiguration, and a high score does not mean a site is safe to enter sensitive information into. Use it to understand data collection, not as a substitute for safe browsing practices.",
      },
    ],
  },
  {
    category: "Tracking Protection & Session Guard",
    items: [
      {
        q: "What is Tracking Protection?",
        a: "Tracking Protection is CookieCrumbs' risk-based tracker blocking. When it identifies a high-risk tracker domain, it blocks future requests to that domain while keeping authentication and site-essential services working. It is selective by design: the goal is to reduce the highest-risk tracking without breaking the site.",
      },
      {
        q: "How is it different from blocking all third-party cookies?",
        a: "Blocking all third-party cookies is a blanket rule. It is effective at reducing tracking but often breaks logins, payments, embeds, and single sign-on. CookieCrumbs instead classifies destinations and blocks those judged high risk, while allowing services the site needs to function. This reduces breakage, at the cost of allowing some lower-risk third parties through.",
      },
      {
        q: "What is Session Guard?",
        a: [
          "Session Guard removes insecure session cookies when you navigate away from a site, close its tab, or exit the browser.",
          "Session cookies are meant to be short-lived. If one is stored insecurely, it can remain available longer than it should and be reused to hijack a session. Session Guard shortens that window by clearing those cookies when the session ends.",
        ],
      },
      {
        q: "Will Session Guard log me out of websites?",
        a: "It can, because clearing a session cookie ends the session it represents. Session Guard targets insecure session cookies rather than every login cookie, but some sites rely on cookies that look insecure. If a site logs you out more often than you want, add that site to the Session Guard exemption list.",
      },
      {
        q: "What do the tier-list groups mean?",
        a: [
          "The tier list appears on pages that load third-party destinations and groups them by risk:",
          { list: [
            "High Risk: destinations associated with aggressive tracking or fingerprinting. These are the strongest candidates for blocking.",
            "Advertising: ad delivery, targeting, and measurement domains.",
            "Safe Utilities: services the page needs to work, such as content delivery or embedded functionality.",
          ] },
          "The grouping is a prioritization aid. It helps you see which destinations are worth reviewing first instead of treating every third party the same.",
        ],
      },
      {
        q: "Does CookieCrumbs stop browser fingerprinting?",
        a: "It flags high-risk fingerprinting scripts and can block requests to high-risk domains, which reduces exposure. It is not a complete anti-fingerprinting solution: a determined site can use many signals, and blocking everything that could contribute would break normal browsing. Treat fingerprinting protection as risk reduction, not invisibility.",
      },
      {
        q: "Why did a website break after enabling protection?",
        a: [
          "Selective blocking still has edge cases. A site may depend on a domain that looks like a tracker but is also used for login, checkout, video, or another essential feature.",
          { list: [
            "Add the site to the Tracking Protection exemption list in Settings and reload.",
            "If you need to diagnose further, temporarily disable the extension and re-enable features one at a time.",
            "Report the site with its URL so the classification or blocklist can be reviewed.",
          ] },
          "Exempting a site is per-feature: adding it to the Tracking Protection list does not exempt it from Session Guard.",
        ],
      },
    ],
  },
  {
    category: "Privacy, Security & Data Handling",
    items: [
      {
        q: "Is my data sent to any server?",
        a: "No. Cookie analysis, classification, scoring, and storage all happen locally in your browser. The reference database and machine-learning model are bundled with the extension. CookieCrumbs does not upload your browsing data to a backend.",
      },
      {
        q: "What does CookieCrumbs store, and where?",
        a: [
          "It stores what it needs to work on your device, typically in the browser's extension storage for the current profile:",
          { list: [
            "Your settings, such as feature toggles.",
            "Your exempt-site lists for Tracking Protection and Session Guard.",
            "Cached analysis and classification data for pages you have visited.",
          ] },
          "Sensitive cookie-related data is processed and stored locally in encrypted form. It is tied to your browser profile, not to a CookieCrumbs account.",
        ],
      },
      {
        q: "Does CookieCrumbs collect telemetry or analytics?",
        a: "No. The extension does not include telemetry or usage analytics, and the project website is a static site without tracking scripts. There is no account system and no remote logging of your browsing.",
      },
      {
        q: "Does CookieCrumbs read my passwords or form data?",
        a: [
          "CookieCrumbs inspects the cookie and page metadata it needs to analyze tracking: cookies, page elements, server headers, and external resource references. It is not designed to collect the contents of password fields or form submissions, and it does not transmit page content off your device.",
          "As with any extension, you should still review the permissions before installing and avoid using extensions on sites where policy forbids them. Unpacked extensions are plain files, so the code can be reviewed.",
        ],
      },
      {
        q: "Does it work offline?",
        a: "Yes, for analysis. Because the database and model are bundled, CookieCrumbs can classify cookies and compute scores without a network connection. Only downloading or updating the package requires internet access.",
      },
      {
        q: "How do I clear CookieCrumbs data?",
        a: "Removing the extension from the extensions page deletes its locally stored settings, exemptions, and cached analysis for that browser profile. Reinstalling gives you a clean state. If you only want to reset a specific site, remove it from the exemption lists or clear that site's cookies in your browser's site-data settings.",
      },
      {
        q: "Why does CookieCrumbs need access to websites?",
        a: "To analyze a page, the extension must be able to read its cookies and inspect page-level metadata such as scripts and external resource references. That access is what powers classification, scoring, pre-consent estimation, and tracker detection. The analysis stays local; access to the page is not the same as sending the page to a server.",
      },
    ],
  },
  {
    category: "Settings & Exemptions",
    items: [
      {
        q: "What can I configure in Settings?",
        a: [
          "Settings brings the main controls together:",
          { list: [
            "A master toggle to turn CookieCrumbs on or off.",
            "A toggle for cookie consent analysis (the pre-consent estimation feature).",
            "A toggle for the on-page score widget.",
            "Exempt-site lists for Tracking Protection and Session Guard.",
          ] },
          "Changes apply to the current browser profile. There is no cloud sync.",
        ],
      },
      {
        q: "How do I exempt a site?",
        a: "Open the CookieCrumbs side panel on the site you want to exempt, go to Settings, and add the site's domain to the relevant exemption list. Reload the page so the change takes effect. Exemptions are useful when protection is too aggressive for a login, checkout, or web app you rely on.",
      },
      {
        q: "What is the difference between the Tracking Protection and Session Guard exemption lists?",
        a: [
          "The two features protect against different things, so they keep separate lists:",
          { list: [
            "Tracking Protection exemptions stop tracker blocking for that site, which is useful when a blocked domain breaks functionality.",
            "Session Guard exemptions stop insecure session cookies from being cleared for that site, which is useful when you want to stay logged in.",
          ] },
          "Exempting a site from one does not exempt it from the other. If a site needs both, add it to both lists.",
        ],
      },
      {
        q: "When should I exempt a site?",
        a: "Exempt a site when a feature you need stops working — a login loop, a checkout that will not complete, a payment form that fails, or a web app that loses state. Start with the narrowest exemption: if only staying logged in is the problem, exempt from Session Guard; if a blocked request is the problem, exempt from Tracking Protection.",
      },
      {
        q: "How do I remove an exemption?",
        a: "Open Settings, find the site in the relevant exemption list, and remove it. Reload the page. The feature will apply to that site again on the next visit.",
      },
      {
        q: "What happens if I turn off cookie consent analysis?",
        a: "Cookie consent analysis controls the pre-consent estimation that looks at script sources and tracker references before you accept a banner. Turning it off stops that estimate. The side panel's post-consent cookie list, classification, and scoring continue to work unless you also turn off the master toggle.",
      },
      {
        q: "What does the score widget toggle do?",
        a: "It shows or hides the on-page widget that updates as cookies and trackers are detected. Hiding the widget reduces on-screen clutter; it does not stop analysis or change the privacy score in the side panel.",
      },
      {
        q: "Are my settings synced across devices?",
        a: "No. Settings, exemptions, and cached analysis live in the browser profile where the extension is installed. They are not synced to an account or across devices. If you install CookieCrumbs in another browser profile, configure it there separately.",
      },
    ],
  },
  {
    category: "Troubleshooting",
    items: [
      {
        q: "The panel shows no data or zero cookies on a site.",
        a: [
          "Work through these checks in order:",
          { steps: [
            "Refresh the page after installing or updating the extension.",
            "Interact with the site — accept or dismiss the consent banner, log in, or open a product page — then reopen the panel.",
            "Confirm the extension is enabled and the current site is not on an exemption list.",
            "Check that you are on a normal http:// or https:// page, not a browser-internal page.",
            "Temporarily disable other privacy extensions to rule out a conflict.",
          ] },
          "If the site still shows nothing, it may genuinely set no cookies until a later step, or a browser policy may be restricting the page.",
        ],
      },
      {
        q: "A site stopped working after I enabled protection.",
        a: "Add the site to the Tracking Protection exemption list in Settings and reload. If you are being logged out, add it to the Session Guard list instead. If you are unsure which feature caused it, turn off the master toggle to confirm the extension is involved, then re-enable features one at a time. Report the site with its URL so the blocklist can be reviewed.",
      },
      {
        q: "The side panel will not open when I click the icon.",
        a: [
          "Check the following:",
          { list: [
            "The extension is enabled on the extensions page.",
            "You are on a page where extensions are allowed — not chrome://, edge://, or the add-on store.",
            "The browser window is wide enough for the side panel; very narrow windows may hide it.",
            "No other extension is capturing the same toolbar click.",
          ] },
          "If the icon is unresponsive everywhere, remove and reload the extension from its folder, then refresh the tab.",
        ],
      },
      {
        q: "The toolbar icon looks greyed out or inactive.",
        a: "A greyed-out icon usually means the extension cannot run on the current page, often because it is a browser-internal page or a restricted store page. Open a normal website and try again. If it is greyed out on every site, the extension may be disabled or failed to load — check the extensions page for an error.",
      },
      {
        q: "The on-page score widget is missing.",
        a: "Open Settings and confirm the score widget toggle is on. Also check that the site is not exempted and that the page is a normal website. Some pages with strict content-security policies or unusual layouts may prevent overlays from appearing; the side panel still works in that case.",
      },
      {
        q: "The extension disappeared after restarting the browser.",
        a: [
          "Unpacked extensions can be affected by browser policies and profile changes. Check the extensions page first.",
          { list: [
            "If CookieCrumbs is listed but disabled, enable it.",
            "If it is missing, click Load unpacked and select the same folder again.",
            "Make sure the extracted folder has not been moved, renamed, or deleted — the browser loads it from that path.",
          ] },
          "Keeping the folder in a stable location such as Documents avoids this problem.",
        ],
      },
      {
        q: "Could another extension be interfering?",
        a: "Yes. Two extensions that both block or modify requests can conflict, producing broken pages or inconsistent results. To isolate the cause, temporarily disable other privacy or ad-blocking extensions and reload the site. If the problem disappears, re-enable them one at a time to find the combination that conflicts, then exempt the site in one of the extensions.",
      },
      {
        q: "CookieCrumbs seems to slow down browsing.",
        a: "Analysis is designed to run locally and incrementally, so it should not noticeably slow normal browsing. If you see a persistent slowdown, check whether another extension is also scanning every request, try disabling the on-page widget, and test in a fresh tab. Report the site and browser version if the issue is reproducible so it can be investigated.",
      },
      {
        q: "I updated the extension but still see the old behavior.",
        a: "After reloading the extension, already-open tabs keep the old content script until they are refreshed. Refresh the tab, or close and reopen it. If the change still does not appear, remove the extension and load the updated folder again, then confirm the version shown on the Downloads page matches.",
      },
      {
        q: "Why can't CookieCrumbs analyze chrome:// or edge:// pages?",
        a: "Chromium browsers block extensions from injecting into their own internal pages, the add-on store, and some built-in viewers. This is a browser security boundary, not a CookieCrumbs limitation you can configure away. Use a normal website to see analysis.",
      },
    ],
  },
  {
    category: "Support & Reporting",
    items: [
      {
        q: "How do I get help?",
        a: "Start with the Installation Guide for setup problems and the User Guide for how to read the panel. If you still need help, use the Support page to contact the team. Include your browser and version, the site URL, and what you expected versus what happened — that makes the issue much faster to diagnose.",
      },
      {
        q: "How do I report a cookie that was classified incorrectly?",
        a: [
          "A useful report includes enough detail to reproduce the classification:",
          { list: [
            "The site URL and the cookie name.",
            "The category CookieCrumbs assigned and the category you expected.",
            "A screenshot of the cookie details view if possible.",
            "Your browser and CookieCrumbs version.",
          ] },
          "Send it through the Support page. Reports help improve the reference database, wildcard rules, and blocklist over time.",
        ],
      },
      {
        q: "How do I report a site that broke because of protection?",
        a: "Send the site URL, which feature was active (Tracking Protection or Session Guard), what broke, and whether exempting the site fixed it. Mention your browser and version. This helps distinguish a bad blocklist entry from a genuine trade-off that needs a more precise rule.",
      },
      {
        q: "How do I request a feature or change?",
        a: "Use the Support page to describe the feature, the problem it solves, and how you would expect it to behave. Concrete examples — a site, a workflow, or a comparison with another tool — are more actionable than a general request.",
      },
      {
        q: "How should I report a security issue?",
        a: "Contact the team privately through the Support page rather than posting details publicly. Include the affected version, steps to reproduce, and the potential impact. Avoid including real passwords, session tokens, or other sensitive data in the report.",
      },
      {
        q: "Where can I find the guides and release notes?",
        a: "The Installation Guide covers setup and common install errors. The User Guide walks through the side panel, privacy score, cookie details, tracking protection, and settings using real screenshots. Release notes and the current version are on the Downloads page.",
      },
    ],
  },
];

// Flatten a rich answer (string or array of blocks) into plain text for search.
export function answerText(answer) {
  if (typeof answer === "string") return answer;
  return answer
    .map((block) => {
      if (typeof block === "string") return block;
      if (block.list) return block.list.join(" ");
      if (block.steps) return block.steps.join(" ");
      if (block.note) return block.note;
      return "";
    })
    .join(" ");
}
