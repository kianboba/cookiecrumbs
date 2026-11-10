import { Link } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell.jsx";

/*
  Themed 404 — a cookie snapped in two. Two jagged dough halves lean away
  from each other with chips, falling crumbs and a ground shadow, echoing
  the product: the mess of broken cookies is exactly what CookieCrumbs
  cleans up. Pure inline SVG, no assets, no gradients that clash with the
  design tokens' id space (nf-*).
*/

function BrokenCookie() {
  return (
    <svg
      viewBox="0 0 220 170"
      width="220"
      height="170"
      className="mx-auto h-auto w-56 max-w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="nf-dough" cx="42%" cy="38%" r="78%">
          <stop offset="0%" stopColor="#f3cf92" />
          <stop offset="45%" stopColor="#dcae66" />
          <stop offset="78%" stopColor="#c08038" />
          <stop offset="100%" stopColor="#96631d" />
        </radialGradient>
        <radialGradient id="nf-chip" cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#7a4520" />
          <stop offset="55%" stopColor="#4a2105" />
          <stop offset="100%" stopColor="#2a130a" />
        </radialGradient>
        <radialGradient id="nf-ground" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.32)" />
          <stop offset="70%" stopColor="rgba(0,0,0,0.1)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="110" cy="152" rx="86" ry="12" fill="url(#nf-ground)" />

      {/* Left half — jagged break edge, leans left */}
      <g transform="translate(62 92) rotate(-14)">
        <path
          d="M0 -52 L20 -54 L14 -30 L26 -22 L12 -4 L22 10 L4 26 L8 44 L-12 50 L-30 38 L-44 46 L-56 28 L-46 12 L-58 -2 L-42 -16 L-50 -34 L-30 -44 L-18 -36 Z"
          fill="url(#nf-dough)"
          stroke="#8a5a1c"
          strokeOpacity="0.4"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Chips on left half */}
        <g transform="translate(-34 -18) rotate(18)">
          <ellipse cy="1.2" rx="7" ry="6" fill="#5f3a13" opacity="0.32" />
          <ellipse rx="6.4" ry="5.6" fill="#4a2105" />
          <ellipse rx="6.4" ry="5.6" fill="url(#nf-chip)" />
          <ellipse cx="-2" cy="-2" rx="2.4" ry="1.7" fill="#8a5626" opacity="0.6" />
        </g>
        <g transform="translate(-22 18) rotate(-24)">
          <ellipse cy="1" rx="5.6" ry="4.8" fill="#5f3a13" opacity="0.3" />
          <ellipse rx="5" ry="4.4" fill="#4a2105" />
          <ellipse rx="5" ry="4.4" fill="url(#nf-chip)" />
          <ellipse cx="-1.6" cy="-1.6" rx="2" ry="1.4" fill="#8a5626" opacity="0.55" />
        </g>
        {/* Toasted speckles */}
        <circle cx="-40" cy="24" r="2.6" fill="#7c4c12" opacity="0.4" />
        <circle cx="-10" cy="-34" r="2.2" fill="#6d3d0d" opacity="0.4" />
        <circle cx="14" cy="30" r="2" fill="#f3dcae" opacity="0.5" />
        {/* Jagged edge shading */}
        <path d="M20 -54 L14 -30 L26 -22 L12 -4 L22 10 L4 26 L8 44" fill="none" stroke="#96631d" strokeOpacity="0.5" strokeWidth="3" strokeLinejoin="round" />
      </g>

      {/* Right half — leans right, small gap between halves */}
      <g transform="translate(158 90) rotate(11)">
        <path
          d="M-18 -50 L16 -54 L36 -42 L28 -26 L42 -14 L32 2 L44 18 L26 34 L32 50 L10 46 L-2 44 L-16 30 L-6 12 L-18 0 L-8 -16 L-20 -32 Z"
          fill="url(#nf-dough)"
          stroke="#8a5a1c"
          strokeOpacity="0.4"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Chips on right half */}
        <g transform="translate(20 -16) rotate(-10)">
          <ellipse cy="1.2" rx="6.4" ry="5.6" fill="#5f3a13" opacity="0.32" />
          <ellipse rx="5.8" ry="5" fill="#4a2105" />
          <ellipse rx="5.8" ry="5" fill="url(#nf-chip)" />
          <ellipse cx="-1.9" cy="-1.9" rx="2.3" ry="1.6" fill="#8a5626" opacity="0.6" />
        </g>
        <g transform="translate(6 22) rotate(28)">
          <ellipse cy="1" rx="5" ry="4.4" fill="#5f3a13" opacity="0.3" />
          <ellipse rx="4.6" ry="4" fill="#4a2105" />
          <ellipse rx="4.6" ry="4" fill="url(#nf-chip)" />
        </g>
        {/* Toasted speckles */}
        <circle cx="30" cy="28" r="2.4" fill="#7c4c12" opacity="0.4" />
        <circle cx="-6" cy="-32" r="2" fill="#6d3d0d" opacity="0.4" />
        <circle cx="34" cy="-4" r="1.8" fill="#f3dcae" opacity="0.5" />
        {/* Jagged edge shading (mirrored) */}
        <path d="M-18 -50 L-8 -16 L-18 0 L-6 12 L-16 30" fill="none" stroke="#96631d" strokeOpacity="0.5" strokeWidth="3" strokeLinejoin="round" />
      </g>

      {/* Crumbs falling in the gap */}
      <circle cx="110" cy="58" r="4.5" fill="#c99044" opacity="0.9" />
      <circle cx="104" cy="40" r="2.8" fill="#c99044" opacity="0.65" />
      <circle cx="116" cy="28" r="1.8" fill="#c99044" opacity="0.45" />
      <circle cx="108" cy="14" r="1.2" fill="#c99044" opacity="0.3" />
      {/* A couple of escaped crumbs at the sides */}
      <circle cx="38" cy="132" r="3" fill="#c99044" opacity="0.7" />
      <circle cx="188" cy="126" r="2.6" fill="#c99044" opacity="0.6" />
    </svg>
  );
}

export default function NotFoundPage() {
  return (
    <PageShell title="Page not found">
      <div className="text-center">
        <BrokenCookie />
        <h1 className="heading-1 mt-2">404</h1>
        <p className="mt-2 text-ink-600">This cookie left crumbs.</p>
        <p className="mx-auto mt-1 max-w-md text-ink-500">
          The page you're looking for crumbled — maybe it was moved, renamed, or
          never baked in the first place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn-primary inline-flex">
            Go home
          </Link>
          <Link to="/faq" className="btn-secondary inline-flex">
            Browse the FAQ
          </Link>
          <Link to="/downloads" className="btn-secondary inline-flex">
            Get the extension
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
