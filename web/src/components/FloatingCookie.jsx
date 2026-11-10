import { useEffect, useRef } from "react";

/*
  Floating background cookie — a ghosted, always-present scroll companion.

  Behavior:
  - Fixed to the viewport at a negative z-index so it peeks through open
    areas (gutters, hero, page margins) while opaque cards slide over it —
    visible throughout the whole scroll without ever carrying content.
  - Section-aware placement: an IntersectionObserver watches <section>s in
    <main>; whichever section holds the viewport's center band assigns a
    slot from a deterministic side/height cycle (right → left → right →
    left …), and the cookie glides there smoothly. Route changes are picked
    up via a MutationObserver so every page gets the treatment.
  - Idle life: a slow bob (rise/fall + gentle rotation) on the artwork,
    plus a scroll-linked lean while you scroll.
  - Purely decorative: aria-hidden, not focusable, pointer-events disabled.
  - Reduced motion: static single placement, no listeners driving motion.

  Slot geometry is recomputed on resize, and the cookie hides below 480px
  where gutters disappear (no risk of covering text on small screens).
*/

const SIZE = 170;

const SLOTS = [
  { side: "right", y: 0.34 },
  { side: "left", y: 0.52 },
  { side: "right", y: 0.64 },
  { side: "left", y: 0.26 },
  { side: "right", y: 0.44 },
];

export function FloatingCookie() {
  const rootRef = useRef(null);
  const rotRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const rot = rotRef.current;
    if (!root || !rot) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io = null;
    let mo = null;
    let raf = 0;
    let currentSlot = 0;

    // Anchor the cookie's center at the gutter edge for a slot.
    const anchor = (slot) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const gutter = Math.max((vw - Math.min(vw * 0.92, 1440)) / 2, 24);
      const half = SIZE / 2;
      const edge = Math.max(gutter * 0.62, half * 0.55);
      const x = slot.side === "right" ? vw - edge : edge;
      root.style.translate = `${Math.round(x - half)}px ${Math.round(slot.y * vh - half)}px`;
    };

    let sections = [];
    const rescan = () => {
      sections = Array.from(document.querySelectorAll("main section"));
      if (!sections.length || !("IntersectionObserver" in window)) return;
      if (io) io.disconnect();
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const idx = sections.indexOf(entry.target);
            if (idx === -1) continue;
            currentSlot = idx % SLOTS.length;
            anchor(SLOTS[currentSlot]);
          }
        },
        // Band around the viewport's vertical center decides the active section.
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      sections.forEach((s) => io.observe(s));
    };

    const onScroll = () => {
      if (raf || reduced) return;
      raf = requestAnimationFrame(() => {
        rot.style.rotate = `${Math.min(window.scrollY * 0.02, 26)}deg`;
        raf = 0;
      });
    };
    const onResize = () => anchor(SLOTS[currentSlot]);

    anchor(SLOTS[0]);

    if (reduced) {
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    rescan();
    const main = document.querySelector("main");
    if (main && "MutationObserver" in window) {
      mo = new MutationObserver(rescan);
      mo.observe(main, { childList: true, subtree: true });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (io) io.disconnect();
      if (mo) mo.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={rootRef}
      className="floating-cookie"
      viewBox="0 0 64 64"
      width={SIZE}
      height={SIZE}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <mask id="fcookie-bite" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="64" height="64" fill="#fff" />
          <circle cx="43.2" cy="26.2" r="4.8" fill="#000" />
        </mask>
      </defs>
      <g ref={rotRef} className="floating-cookie-rot">
        <g className="floating-cookie-float">
          {/* Bitten cookie */}
          <circle cx="32" cy="33" r="9.4" fill="#45a3da" mask="url(#fcookie-bite)" />
          <circle cx="28.6" cy="30.2" r="1.25" fill="#fff" />
          <circle cx="34.6" cy="31.6" r="1.1" fill="#fff" />
          <circle cx="31.2" cy="37" r="1.15" fill="#fff" />
          <circle cx="36" cy="36.4" r="0.85" fill="#fff" />
          {/* Trailing crumbs falling from the bite */}
          <circle cx="45.5" cy="24.5" r="1.5" fill="#45a3da" opacity="0.75" />
          <circle cx="49" cy="21" r="1" fill="#45a3da" opacity="0.55" />
          <circle cx="52" cy="17.5" r="0.7" fill="#45a3da" opacity="0.4" />
        </g>
      </g>
    </svg>
  );
}
