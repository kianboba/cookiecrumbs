import { useEffect, useRef } from "react";

/*
  Floating background cookie — a ghosted watermark of the bitten cookie from
  the logo that lives behind all page content and drifts slightly slower than
  the page while scrolling (parallax), plus a very slow idle bob.

  Purely decorative: aria-hidden, not focusable, pointer-events disabled,
  sits at a negative z-index so opaque cards hide it while it peeks through
  open areas. Reduced-motion users get a static, non-scrolling cookie.
*/

export function FloatingCookie() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        // Drift down at ~4% of scroll depth, capped so it stays on screen.
        el.style.setProperty("--cookie-drift", `${Math.min(window.scrollY * 0.04, 110)}px`);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={ref}
      className="floating-cookie"
      viewBox="0 0 64 64"
      width="180"
      height="180"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <mask id="fc-bite" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="64" height="64" fill="#fff" />
          <circle cx="43.2" cy="26.2" r="4.8" fill="#000" />
        </mask>
      </defs>
      <g className="floating-cookie-bob">
        <circle cx="32" cy="33" r="9.4" fill="#45a3da" mask="url(#fc-bite)" />
        <circle cx="28.6" cy="30.2" r="1.25" fill="#fff" />
        <circle cx="34.6" cy="31.6" r="1.1" fill="#fff" />
        <circle cx="31.2" cy="37" r="1.15" fill="#fff" />
        <circle cx="36" cy="36.4" r="0.85" fill="#fff" />
      </g>
    </svg>
  );
}
