# Changelog

## 5.19

### Fixed (security: consent overlay postMessage spoofing)
- The cross-frame consent listener in `content.js` validated the payload label
  (`source: "CookieCrumbs"`) but not the sender. Any page script could call
  `window.postMessage({source: "CookieCrumbs", type: "CC_SHOW_CONSENT_OVERLAY",
  ...}, "*")` and trigger the consent overlay with attacker-chosen content,
  including the replayed accept path.
- Fix: one guard, `if (e.source === window) return;`, as the first line of the
  listener. Both legitimate senders are cross-frame: `CC_SHOW_CONSENT_OVERLAY`
  is sent only from an iframe to `window.top` (`content.js`, the
  `!IS_TOP_FRAME` branch of `showConsentOverlay`), and
  `CC_REPLAY_CONSENT_ACTION` is sent only from the top frame to the stored
  iframe window. A same-window message can only be a page-script forgery.
- Same-window identity across the isolated world is already relied on by the
  `CC_DOC_COOKIE_CHANGED` listener, which accepts same-window messages from the
  injected `doc_cookie_hook.js`; that path works in the shipped build.
- No origin validation was added: legitimate CMP iframes come from arbitrary
  vendor domains.

### Known limitation (accepted, disclosed)
- The iframe vector remains open. A hostile page that embeds its own iframe can
  post `CC_SHOW_CONSENT_OVERLAY` through it; `e.source` is then the iframe
  window, not the same window, so the guard does not reject it. Closing it
  would require an origin allowlist of known CMP domains, which would break on
  any site using a different consent vendor.

### Documentation
- Updated the listener docstring in `content.js` to describe the sender check
  and to state the accepted cross-frame limitation, so the comment matches the
  code.

## 5.18

### Fixed (dataset: domain category mapping)
- `hosting` was mapped to Strict in `CAT_MAP_WTM`. WhoTracksMe's hosting class
  describes what a domain serves, not whether the cookies it sets are
  necessary, and Strict is the zero-penalty class, so 4,156 third-party
  domains were treated as harmless. tiktok.com, bing.com, twitter.com,
  reddit.com, pinterest.com, github.com, stripe.com, shopify.com and every
  Amazon locale were among them. `hosting` now has no mapping and is skipped,
  like `misc`.
- WhoTracksMe no longer replaces a category already set by OCD or Disconnect.
  The module's own `SOURCE_PRIORITY` ranks OCD above Disconnect above
  WhoTracksMe, and the merge loop bypassed it, overwriting 272 records in
  5.17. WhoTracksMe now fills a missing category only.
- OCD domain categories are now the majority category across the rows that
  name a domain, not the first row in the CSV. First-row-wins had branded
  google.com Functionality off a single reCAPTCHA row against 25 Marketing
  rows. pinterest.com and taboola.com were wrong the same way.
- `utilities` maps to Functionality. `consent` maps to Strict.

### Dataset counts
- Domain records 14,353 to 10,296. Strict 4,184 to 32, Advertising 9,068 to
  9,043, Performance 669 to 683, Functionality 432 to 538.
- `lookup`, `wildcards`, `cmp_selectors` and `cmp_selector_entries` are
  unchanged, and no name-based cookie classification changed.
- 5.17 datasets retained for the record: `backups/cookie_db.v5.17.json` (as
  shipped) and `backups/cookie_db.v5.17.domains-only.json`.

### Unchanged
- ML model unchanged. `model_weights.json` stays at meta.version 5.16 and the
  training corpus was not regenerated.

### Effect on measurement
- Cookies from the affected domains no longer fall into the zero-penalty
  Strict class. They take their OCD or Disconnect category, or fall through to
  the ML tier. Privacy scores on sites that load those vendors are lower.
- Any results recorded against 5.17 must be re-run against 5.18.

## 5.17

### Fixed
- Consent interception now fires on accept-only cookie banners. Previously the
  weak-accept path required a reject control inside the same container, so a
  banner offering only "Accept" could never be intercepted. A fixed or sticky
  container whose markup is cookie-attributed now satisfies that corroboration
  in place of the reject button.
- Root cause identified on a custom, non-CMP banner that renders
  `a.cta "Accept"` inside a `div.cookie-bar` with `position: fixed`.
- Added `isFixedOrSticky()` in `content.js`; no label patterns, score
  thresholds, or CMP selectors were changed.

### Also fixed
- `mouseover` is now handled in the same branch as `pointerover`. It previously
  fell through to the activation branch, so a weak-but-passing consent control
  could raise the overlay on hover, before any click. Hover remains a preview
  for strong matches only.

### Documentation
- The model card `approach` string and the `ml_inference.js` header claimed "no
  hardcoded keywords". Both featurisers contain eight keyword regexes plus one
  keyword-derived interaction, nine of the sixty numerical features, so the
  claim was removed rather than softened. No code, model weight, or inference
  path changed. Feature-count comments corrected from 58 to 60 in `train.py`
  and `ml_inference.js`.

### Scope and limitations
- Banners that expose consent only through a preference centre (for example a
  "Cookie settings" button with the accept action one level deeper) are not
  intercepted. This is unchanged from 5.16 and is documented as a limitation.
- Accept labels remain English-only.

## 5.16 and earlier
- Prior releases: cookie detection, four-tier classification, privacy scoring,
  tracker blocking, Session Guard, consent interception, and threat overlay.
