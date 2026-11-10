import { useEffect, useState } from "react";

/*
  Entry splash — a short branded moment (shield ripples in, the white ✕ draws
  itself, crumb dots pop, wordmark fades in) before the site is revealed.

  Guardrails:
  - Shown once per browser session (sessionStorage).
  - Skipped entirely for prefers-reduced-motion users.
  - Hard time cap (~1.85s) with the real page rendered underneath the whole
    time; the overlay is position:fixed so there is zero layout shift.
  - aria-hidden while present; removed from the DOM after the fade so it can
    never trap focus or linger for assistive tech.
*/

const SESSION_KEY = "cc-splash-seen";
const REVEAL_MS = 1500; // overlay starts fading (CSS handles the fade at 1.4s)
const UNMOUNT_MS = 1900; // overlay fully gone from the DOM

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
      <div className="splash-inner">
        <svg className="splash-logo" viewBox="0 0 64 64" width="76" height="76" fill="none">
          <defs>
            <linearGradient id="splash-shield" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          <path
            className="splash-shield"
            d="M32 4 L56 14 V34 C56 48 32 60 32 60 C32 60 8 48 8 34 V14 Z"
            fill="url(#splash-shield)"
            stroke="#1e3a8a"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <line className="splash-x" x1="23" y1="25" x2="41" y2="43" pathLength="100" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
          <line className="splash-x splash-x-2" x1="41" y1="25" x2="23" y2="43" pathLength="100" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
          <circle className="splash-dot" style={{ animationDelay: "780ms" }} cx="18" cy="20" r="1.4" fill="#fbbf24" />
          <circle className="splash-dot" style={{ animationDelay: "900ms" }} cx="47" cy="22" r="1.2" fill="#fbbf24" />
          <circle className="splash-dot" style={{ animationDelay: "1020ms" }} cx="50" cy="46" r="1.3" fill="#fbbf24" />
          <circle className="splash-dot" style={{ animationDelay: "1140ms" }} cx="15" cy="44" r="1.1" fill="#fbbf24" />
        </svg>
        <p className="splash-wordmark">CookieCrumbs</p>
      </div>
    </div>
  );
}
