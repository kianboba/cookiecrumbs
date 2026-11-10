import { useEffect, useState } from "react";

/*
  Entry splash — "lock the shield" choreography built on the current logo:
  the shield outline draws itself, the padlock drops in with a click bounce,
  the bitten cookie pops into the center, and the four satellite icons stagger
  into their corners before the wordmark settles.

  Guardrails:
  - Shown once per browser session (sessionStorage).
  - Skipped entirely for prefers-reduced-motion users.
  - Hard time cap (~2s) with the real page rendered underneath the whole
    time; the overlay is position:fixed so there is zero layout shift.
  - aria-hidden while present; removed from the DOM after the fade so it can
    never trap focus or linger for assistive tech.
*/

const SESSION_KEY = "cc-splash-seen";
const REVEAL_MS = 1950; // component unmounts just after the backdrop fade ends
const UNMOUNT_MS = 2200; // safety cap

export function SplashScreen() {
  // Compute once, synchronously, so a returning session never flashes.
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
      if (window.sessionStorage.getItem(SESSION_KEY)) return false;
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Storage/media-query failures should never block the site.
      return false;
    }
    return true;
  });
  const [mounted, setMounted] = useState(enabled);

  useEffect(() => {
    if (mounted) return undefined;
    // Splash is no longer in the DOM — make sure scrolling is always restored,
    // regardless of how quickly the timers were reached.
    document.body.style.overflow = "";
    return undefined;
  }, [mounted]);

  useEffect(() => {
    if (!enabled) return undefined;
    document.body.style.overflow = "hidden";
    const revealTimer = window.setTimeout(() => setMounted(false), REVEAL_MS);
    const safetyTimer = window.setTimeout(() => setMounted(false), UNMOUNT_MS);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(revealTimer);
      window.clearTimeout(safetyTimer);
    };
  }, [enabled]);

  if (!mounted) return null;

  return (
    <div className="splash" aria-hidden="true" role="presentation">
      {/* Plain backdrop fades out on its own — it contains no text, so the
          color-contrast audit never sees semi-transparent text. */}
      <div className="splash-backdrop" />
      <div className="splash-content">
        <svg className="splash-logo" viewBox="0 0 64 64" width="80" height="80" fill="none" aria-hidden="true">
          <defs>
            <mask id="splash-bite" maskUnits="userSpaceOnUse">
              <rect x="0" y="0" width="64" height="64" fill="#fff" />
              <circle cx="43.2" cy="26.2" r="4.8" fill="#000" />
            </mask>
          </defs>
          {/* Shield outline draws itself */}
          <path
            className="splash-shield"
            d="M32 6.6 L54.5 14.6 V32.6 C54.5 45.4 32 57.6 32 57.6 C32 57.6 9.5 45.4 9.5 32.6 V14.6 Z"
            pathLength="100"
            stroke="#45a3da"
            strokeWidth="4.2"
            strokeLinejoin="round"
          />
          {/* Padlock drops in and clicks shut */}
          <g className="splash-lock">
            <path d="M28.2 10.6 V7.7 a3.8 3.8 0 0 1 7.6 0 V10.6" stroke="#45a3da" strokeWidth="2.5" />
            <rect x="25.7" y="10.2" width="12.6" height="9.4" rx="2.2" fill="#45a3da" />
            <circle cx="32" cy="14" r="1.7" fill="#fff" />
            <rect x="31.3" y="14.6" width="1.4" height="2.7" rx="0.7" fill="#fff" />
          </g>
          {/* Cookie pops into the center */}
          <g className="splash-pop" style={{ animationDelay: "1000ms" }}>
            <circle cx="32" cy="33" r="9.4" fill="#45a3da" mask="url(#splash-bite)" />
            <circle cx="28.6" cy="30.2" r="1.25" fill="#fff" />
            <circle cx="34.6" cy="31.6" r="1.1" fill="#fff" />
            <circle cx="31.2" cy="37" r="1.15" fill="#fff" />
            <circle cx="36" cy="36.4" r="0.85" fill="#fff" />
          </g>
          {/* Info + magnifier (upper left) */}
          <g className="splash-pop" style={{ animationDelay: "1040ms" }}>
            <circle cx="14.6" cy="19.4" r="3" fill="#45a3da" />
            <circle cx="14.6" cy="18" r="0.7" fill="#fff" />
            <rect x="14.1" y="19" width="1" height="2.4" rx="0.5" fill="#fff" />
            <circle cx="19.4" cy="22.2" r="2.4" stroke="#45a3da" strokeWidth="1.4" />
            <line x1="21.2" y1="24" x2="23.4" y2="26.2" stroke="#45a3da" strokeWidth="1.7" strokeLinecap="round" />
          </g>
          {/* Bell (upper right) */}
          <g className="splash-pop" style={{ animationDelay: "1100ms" }}>
            <path d="M46 14.4 c-2.3 0-3.7 1.8-3.7 3.9 v2.2 l-1.1 1.4 h9.6 l-1.1-1.4 v-2.2 c0-2.1-1.4-3.9-3.7-3.9 z" fill="#45a3da" />
            <circle cx="46" cy="22.9" r="0.85" fill="#45a3da" />
          </g>
          {/* Small padlock (lower left) */}
          <g className="splash-pop" style={{ animationDelay: "1160ms" }}>
            <path d="M23.7 42.9 v-1.5 a1.8 1.8 0 0 1 3.6 0 v1.5" stroke="#45a3da" strokeWidth="1.5" />
            <rect x="22.7" y="42.6" width="5.6" height="4.5" rx="1.1" fill="#45a3da" />
            <circle cx="25.5" cy="44.4" r="0.75" fill="#fff" />
            <rect x="25.2" y="44.8" width="0.6" height="1.1" rx="0.3" fill="#fff" />
          </g>
          {/* Pie chart (lower right) */}
          <g className="splash-pop" style={{ animationDelay: "1220ms" }}>
            <circle cx="45.5" cy="44" r="3.4" fill="#45a3da" />
            <line x1="45.5" y1="44" x2="45.5" y2="40.6" stroke="#fff" strokeWidth="0.9" />
            <line x1="45.5" y1="44" x2="48.9" y2="44" stroke="#fff" strokeWidth="0.9" />
          </g>
        </svg>
        <p className="splash-wordmark">CookieCrumbs</p>
      </div>
    </div>
  );
}
