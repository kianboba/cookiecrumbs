import { useEffect, useRef } from "react";

/*
  Floating background cookie — a realistic baked cookie rendered as SVG
  (radial dough shading, chocolate chips with baked shine, toasted speckles,
  flour dust, soft ground shadow) that floats behind all page content.

  - Section-aware placement: IntersectionObserver watches <section>s in
    <main>; whichever section holds the viewport's center band assigns a
    slot from a deterministic side/height cycle, and the cookie glides
    there. Route changes are picked up via a MutationObserver.
  - Idle life: slow bob (rise/fall + gentle rotation) plus a scroll-linked lean.
  - Purely decorative: aria-hidden, not focusable, pointer-events disabled.
  - Reduced motion: static single placement, no motion listeners.
  - Hidden below 480px where gutters disappear (never covers text).
*/

const SIZE = 210;

const SLOTS = [
  { side: "right", y: 0.34 },
  { side: "left", y: 0.52 },
  { side: "right", y: 0.64 },
  { side: "left", y: 0.26 },
  { side: "right", y: 0.44 },
];

/** Chips baked into the dough (viewBox-space positions around center 32,33). */
const CHIPS = [
  [26, 26, -12],
  [37, 24, 20],
  [30, 33, 0],
  [38, 36, -8],
  [25, 38, 14],
  [33.5, 42.5, -20],
];

const SPECKLES_DARK = [
  [22, 29], [35, 29.5], [27.5, 20.5], [24.5, 33.5], [29, 25.5],
  [36.5, 31], [19.5, 33], [28, 43], [38, 28.5], [31.5, 21],
];
const SPECKLES_LIGHT = [[24, 22], [21, 30], [31, 44], [24.5, 40], [35.5, 42]];

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

    let placedOnce = false;
    // Anchor the cookie's center at the gutter edge for a slot.
    const anchor = (slot) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const gutter = Math.max((vw - Math.min(vw * 0.92, 1440)) / 2, 24);
      const half = SIZE / 2;
      const edge = Math.max(gutter * 0.62, half * 0.55);
      const x = slot.side === "right" ? vw - edge : edge;
      if (!placedOnce) {
        // First placement must be instant, not a glide from the origin.
        root.style.transition = "none";
        void root.getBoundingClientRect();
        root.style.translate = `${Math.round(x - half)}px ${Math.round(slot.y * vh - half)}px`;
        requestAnimationFrame(() => {
          root.style.transition = "";
        });
        placedOnce = true;
        return;
      }
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
            anchor(currentSlot >= 0 ? SLOTS[currentSlot] : SLOTS[0]);
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
        <radialGradient id="fcd-dough" cx="42%" cy="38%" r="78%">
          <stop offset="0%" stopColor="#f3cf92" />
          <stop offset="42%" stopColor="#dcae66" />
          <stop offset="75%" stopColor="#c08038" />
          <stop offset="100%" stopColor="#8f5c19" />
        </radialGradient>
        <radialGradient id="fcd-chip" cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#7a4520" />
          <stop offset="55%" stopColor="#4a2105" />
          <stop offset="100%" stopColor="#2a130a" />
        </radialGradient>
        <radialGradient id="fcd-gloss" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,248,230,0.5)" />
          <stop offset="100%" stopColor="rgba(255,248,230,0)" />
        </radialGradient>
        <radialGradient id="fcd-ground" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
          <stop offset="70%" stopColor="rgba(0,0,0,0.1)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <mask id="fcd-bite" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="64" height="64" fill="#fff" />
          <circle cx="47" cy="24" r="7" fill="#000" />
        </mask>
      </defs>

      {/* Soft ground shadow */}
      <ellipse cx="32" cy="48" rx="25" ry="6.5" fill="url(#fcd-ground)" />

      <g ref={rotRef} className="floating-cookie-rot">
        <g className="floating-cookie-float">
          {/* Baked dough with a bite taken out */}
          <circle cx="32" cy="33" r="21" fill="url(#fcd-dough)" mask="url(#fcd-bite)" />
          {/* Baked rim */}
          <circle cx="32" cy="33" r="20" fill="none" stroke="#8a5a1c" strokeOpacity="0.45" strokeWidth="1" mask="url(#fcd-bite)" />

          {/* Chocolate chips: shadow, body, gradient, shine */}
          {CHIPS.map(([cx, cy, r], i) => (
            <g key={i} transform={`translate(${cx} ${cy}) rotate(${r})`}>
              <ellipse cy="1.2" rx="3.1" ry="2.7" fill="#5f3a13" opacity="0.32" />
              <ellipse rx="2.9" ry="2.5" fill="#4a2105" />
              <ellipse rx="2.9" ry="2.5" fill="url(#fcd-chip)" />
              <ellipse cx="-0.9" cy="-0.9" rx="1.1" ry="0.8" fill="#8a5626" opacity="0.6" />
              <ellipse cx="-1" cy="-1" rx="0.5" ry="0.35" fill="#b07a3c" opacity="0.75" />
            </g>
          ))}

          {/* Toasted speckles + flour dust */}
          {SPECKLES_DARK.map(([cx, cy], i) => (
            <circle key={`d${i}`} cx={cx} cy={cy} r={0.55 + (i % 3) * 0.15} fill="#7c4c12" opacity="0.4" />
          ))}
          {SPECKLES_LIGHT.map(([cx, cy], i) => (
            <circle key={`l${i}`} cx={cx} cy={cy} r={0.5 + (i % 2) * 0.2} fill="#f3dcae" opacity="0.5" />
          ))}

          {/* Soft top-left sheen */}
          <ellipse cx="25" cy="24" rx="11" ry="8" fill="url(#fcd-gloss)" opacity="0.3" />
        </g>
      </g>

      {/* Crumbs falling from the bite */}
      <g>
        <circle cx="51.5" cy="15" r="1.7" fill="#c99044" opacity="0.85" />
        <circle cx="56" cy="10.5" r="1.1" fill="#c99044" opacity="0.6" />
        <circle cx="58.8" cy="6.4" r="0.7" fill="#c99044" opacity="0.4" />
      </g>
    </svg>
  );
}
