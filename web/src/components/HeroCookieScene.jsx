import { useEffect, useRef } from "react";

/*
  Hero centerpiece — the shattered-cookie story.

  A large, realistic cookie starts broken into six baked chunks (plus loose
  crumbs) scattered around an empty band in the hero. As the user scrolls,
  progress (0→1) is derived purely from scroll position; chunks fly home with
  an easeOutBack settle (slight overshoot, then click into place), sharpening
  out of a depth-of-field blur as they align. Once assembled, the cookie
  settles into a soft ghost so it becomes atmosphere rather than a sticker.

  Geometry is authored 1:1 with CSS pixels (viewBox 500 units ↔ rendered px),
  so chunk transforms read directly in "scene pixels". Everything is static
  unless the user scrolls; nothing is timed. Reduced-motion users get the
  finished, ghosted cookie with no listeners at all.
*/

const CHUNK_D =
  "M0 0 L81.9 -39.6 L133.2 -75.6 L154.8 -90.9 A180 180 0 0 1 154.8 90.9 L137.7 78.3 L80.1 46.8 Z";
const RIM_D = "M154.8 -90.9 A180 180 0 0 1 154.8 90.9";

const CHUNKS = [
  { rot: 0, s: 0.9, dx: -150, dy: -120, srot: -95, delay: 0, chips: [[117, -23.4], [74, -19.8]] },
  { rot: 61, s: 1.05, dx: 170, dy: -90, srot: 70, delay: 0.05, chips: [[100.8, 39.6], [73.8, -19.8]] },
  { rot: 118, s: 0.85, dx: 200, dy: 60, srot: 130, delay: 0.08, chips: [] },
  { rot: 180, s: 1.1, dx: -100, dy: 150, srot: -55, delay: 0.02, chips: [[117, 23.4], [142.2, -8.1]] },
  { rot: 242, s: 0.9, dx: 140, dy: 168, srot: 95, delay: 0.12, chips: [[82.8, 27.9]] },
  { rot: 299, s: 1.0, dx: -180, dy: 30, srot: -150, delay: 0.07, chips: [[100.8, 39.6], [117, -23.4]] },
];

const CRUMBS = [
  { sx: -170, sy: -150, fx: -108, fy: -36, r: 13, srot: -190, prot: 40 },
  { sx: -120, sy: 40, fx: -54, fy: 99, r: 10, srot: 120, prot: -70 },
  { sx: 180, sy: -120, fx: 90, fy: -81, r: 11, srot: -80, prot: 150 },
  { sx: 160, sy: 90, fx: 36, fy: 108, r: 9, srot: 200, prot: -30 },
  { sx: -60, sy: 170, fx: -135, fy: 27, r: 8, srot: -140, prot: 66 },
  { sx: 70, sy: 190, fx: -18, fy: -126, r: 11, srot: 170, prot: -110 },
  { sx: -200, sy: -30, fx: 117, fy: 45, r: 8, srot: 90, prot: -15 },
  { sx: 214, sy: 10, fx: -81, fy: -90, r: 7.5, srot: -60, prot: 80 },
];

const easeOutBack = (t) => {
  const c1 = 0.9;
  const c3 = c1 + 1;
  const x = t - 1;
  return 1 + c3 * x * x * x + c1 * x * x;
};

/** Shared realistic-cookie surface details, drawn in local chunk space. */
function ChunkDetails({ chips }) {
  return (
    <>
      {/* Baked rim glaze */}
      <path d={RIM_D} fill="none" stroke="#b8842f" strokeOpacity="0.55" strokeWidth="7" strokeLinecap="round" />
      {/* Chocolate chips with baked shine + shadowed base */}
      {chips.map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx} ${cy}) rotate(${(i * 47) % 360})`}>
          <ellipse rx="21" ry="18" cy="3" fill="#5f3a13" opacity="0.3" />
          <ellipse rx="19" ry="16.5" fill="#4a2105" />
          <ellipse rx="19" ry="16.5" fill="url(#hc-chip)" />
          <ellipse cx="-5.5" cy="-5.5" rx="7" ry="5" fill="#8a5626" opacity="0.55" />
          <ellipse cx="-6.5" cy="-6.5" rx="3" ry="2.2" fill="#b07a3c" opacity="0.7" />
        </g>
      ))}
      {/* Toasted speckles + flour dots */}
      <circle cx="45" cy="-13.5" r="4.5" fill="#7c4c12" opacity="0.4" />
      <circle cx="94.5" cy="19.8" r="3.6" fill="#6d3d0d" opacity="0.4" />
      <circle cx="31.5" cy="27" r="3.2" fill="#f3dcae" opacity="0.55" />
      <circle cx="85.5" cy="-27" r="3" fill="#f3dcae" opacity="0.45" />
      <circle cx="121.5" cy="29.7" r="2.6" fill="#9a6218" opacity="0.4" />
      <path d="M40.5 25 L58 34" stroke="#7c4c12" strokeWidth="2.6" strokeLinecap="round" opacity="0.3" fill="none" />
    </>
  );
}

export function HeroCookieScene() {
  const rootRef = useRef(null);
  const glowRef = useRef(null);
  const chunkRefs = useRef([]);
  const crumbRefs = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    const glow = glowRef.current;
    if (!root) return undefined;
    const pieces = chunkRefs.current;
    const crumbs = crumbRefs.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finalize = () => {
      pieces.forEach((el, i) => {
        if (!el) return;
        const c = CHUNKS[i];
        el.style.transform = "translate(0px, 0px) rotate(0deg) scale(1)";
        el.style.opacity = "1";
        el.style.filter = "none";
      });
      crumbs.forEach((el) => {
        if (!el) return;
        el.style.transform = "translate(0px, 0px) rotate(0deg)";
        el.style.opacity = "1";
        el.style.filter = "none";
      });
      root.style.opacity = "0.38";
      if (glow) glow.style.opacity = "0";
    };

    if (reduced) {
      finalize();
      return undefined;
    }

    let raf = 0;
    const render = () => {
      const rect = root.getBoundingClientRect();
      if (rect.width > 0) {
        const vh = window.innerHeight;
        const t = Math.min(1, Math.max(0, (vh * 0.66 - (rect.top + rect.height / 2)) / (vh * 0.95)));
        const settle = Math.min(1, Math.max(0, (t - 0.82) / 0.18));

        CHUNKS.forEach((c, i) => {
          const el = pieces[i];
          if (!el) return;
          const tk = Math.min(1, Math.max(0, (t - c.delay) / (1 - c.delay)));
          const e = easeOutBack(tk);
          const e0 = Math.min(e, 1);
          el.style.transform =
            `translate(${(c.dx * (1 - e)).toFixed(2)}px, ${(c.dy * (1 - e)).toFixed(2)}px) ` +
            `rotate(${(c.srot * (1 - e)).toFixed(2)}deg) ` +
            `scale(${(1 + (c.s - 1) * (1 - e)).toFixed(3)})`;
          el.style.opacity = (0.5 + 0.5 * e0).toFixed(3);
          el.style.filter = e0 > 0.97 ? "none" : `blur(${((1 - e0) * 2.4).toFixed(2)}px)`;
        });

        CRUMBS.forEach((cr, i) => {
          const el = crumbs[i];
          if (!el) return;
          const e = easeOutBack(Math.min(1, t * 1.15));
          const e0 = Math.min(e, 1);
          el.style.transform =
            `translate(${(cr.sx * (1 - e)).toFixed(2)}px, ${(cr.sy * (1 - e)).toFixed(2)}px) ` +
            `rotate(${(cr.srot * (1 - e)).toFixed(2)}deg)`;
          el.style.opacity = (0.35 + 0.65 * e0).toFixed(3);
          el.style.filter = e0 > 0.97 ? "none" : `blur(${((1 - e0) * 1.6).toFixed(2)}px)`;
        });

        root.style.opacity = (1 - 0.62 * settle).toFixed(3);
        if (glow) glow.style.opacity = (0.5 * Math.min(1, t * 2) * (1 - settle)).toFixed(3);
      }
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(render);
    };

    // Render initial (shattered) state once laid out, then follow scrolling.
    requestAnimationFrame(render);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={rootRef}
      className="hero-cookie-scene"
      viewBox="-250 -250 500 500"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="hc-dough" cx="42%" cy="38%" r="75%">
          <stop offset="0%" stopColor="#f3cf92" />
          <stop offset="42%" stopColor="#dcae66" />
          <stop offset="75%" stopColor="#c08038" />
          <stop offset="100%" stopColor="#96631d" />
        </radialGradient>
        <radialGradient id="hc-chip" cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#7a4520" />
          <stop offset="55%" stopColor="#4a2105" />
          <stop offset="100%" stopColor="#2a130a" />
        </radialGradient>
        <radialGradient id="hc-ground" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
          <stop offset="70%" stopColor="rgba(0,0,0,0.1)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id="hc-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(250,226,170,0.28)" />
          <stop offset="60%" stopColor="rgba(250,226,170,0.08)" />
          <stop offset="100%" stopColor="rgba(250,226,170,0)" />
        </radialGradient>
      </defs>

      {/* Soft ground shadow where the cookie will land */}
      <ellipse cx="0" cy="212" rx="205" ry="30" fill="url(#hc-ground)" opacity="0.5" />
      {/* Gathering glow during reassembly */}
      <circle ref={glowRef} r="235" fill="url(#hc-glow)" opacity="0" />

      {/* The six baked chunks that fly home */}
      {CHUNKS.map((c, i) => (
        <g
          key={i}
          ref={(el) => {
            chunkRefs.current[i] = el;
          }}
          className="hero-chunk"
          style={{ willChange: "transform, opacity, filter" }}
        >
          <g transform={`rotate(${c.rot})`}>
            <path d={CHUNK_D} fill="url(#hc-dough)" stroke="#8a5a1c" strokeOpacity="0.35" strokeWidth="3" strokeLinejoin="round" />
            <ChunkDetails chips={c.chips} />
          </g>
        </g>
      ))}

      {/* Loose crumbs that gather back onto the surface */}
      {CRUMBS.map((cr, i) => (
        <g
          key={i}
          ref={(el) => {
            crumbRefs.current[i] = el;
          }}
          className="hero-crumb"
          style={{ willChange: "transform, opacity, filter" }}
        >
          <g transform={`translate(${cr.fx} ${cr.fy}) rotate(${cr.prot}) scale(${cr.r / 13})`}>
            <ellipse rx="13" ry="11" fill="#c99044" />
            <ellipse rx="13" ry="11" cy="2" fill="#8a5a1c" opacity="0.25" />
            <ellipse cx="-4" cy="-3.5" rx="4.5" ry="3.2" fill="#e8c17c" opacity="0.8" />
            <circle cx="3" cy="1.5" r="2" fill="#7c4c12" opacity="0.45" />
          </g>
        </g>
      ))}
    </svg>
  );
}
