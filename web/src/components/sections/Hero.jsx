import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../data/siteConfig.js";
import { Icon } from "../common/Icon.jsx";
import { HeroCookieScene } from "../HeroCookieScene.jsx";
import logoUrl from "../../assets/cookiecrumbs-logo.svg";

const cookieRows = [
  { name: "_ga", party: "3rd", category: "Advertising", chip: "chip-adv", life: "2 y" },
  { name: "_fbp", party: "3rd", category: "Advertising", chip: "chip-adv", life: "3 mo" },
  { name: "_pk_id", party: "1st", category: "Performance", chip: "chip-perf", life: "397 d" },
  { name: "csrftoken", party: "1st", category: "Functionality", chip: "chip-func", life: "1 y" },
  { name: "ccx_lower", party: "1st", category: "Performance", chip: "chip-perf", life: "1 mo" },
  { name: "__trace_ux", party: "3rd", category: "Blocked", chip: "chip-blocked", life: "—" },
];

function ScoreRing({ score }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(score);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 900;
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(score * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [score]);

  return (
    <div ref={ref} className="score-ring" style={{ "--p": score }} aria-hidden="true">
      <span>{display}</span>
    </div>
  );
}

function PanelMock() {
  return (
    <div
      className="filter drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
      role="img"
      aria-label="Mock of the CookieCrumbs side panel showing a cookie table and a privacy score of 34 out of 100 labelled 'Poor'"
    >
      <div className="panel">
        <div className="panel-head">
          <img src={logoUrl} alt="" width="20" height="20" />
          <strong>CookieCrumbs</strong>
          <span className="panel-domain font-mono">example-shop.test</span>
        </div>
        <div className="panel-score">
          <ScoreRing score={34} />
          <div>
            <p className="score-label">Privacy score</p>
            <p className="score-verdict score-poor">Poor</p>
            <p className="score-detail">11 third-party · 6 advertising · 4 persistent</p>
          </div>
        </div>
        <table className="panel-table" aria-hidden="true">
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Party</th>
              <th>Category</th>
              <th>Expires</th>
            </tr>
          </thead>
          <tbody>
            {cookieRows.map((row) => (
              <tr key={row.name}>
                <td className="font-mono">{row.name}</td>
                <td className="font-mono">{row.party}</td>
                <td><span className={`chip ${row.chip}`}>{row.category}</span></td>
                <td className="font-mono">{row.life}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero-wrap relative overflow-hidden">
      <div className="container-page grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div className="max-w-3xl">
          <p className="version-badge">
            <span className="badge-dot" aria-hidden="true"></span>
            v{siteConfig.version} · actively maintained
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
            See every cookie.
            <br />
            Understand your privacy.
          </h1>
          <p className="mt-4 max-w-prose text-lg text-ink-600">
            CookieCrumbs watches every cookie a site sets, classifies what each one is
            for, blocks trackers before they load, and gives every website a privacy
            score — all on your machine.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/downloads" className="btn-primary">
              <Icon name="Download" className="h-4 w-4" />
              Install for Chrome
            </Link>
            <a href="#how-it-works" className="btn-secondary">
              See how it works
              <Icon name="ArrowRight" className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-3 text-sm text-ink-500">
            Free · Manifest V3 · No sign-up
          </p>
        </div>
        <PanelMock />
      </div>

      {/* Shattered-cookie centerpiece: broken pieces reassemble as you scroll. */}
      <div className="hero-cookie-band">
        <HeroCookieScene />
      </div>
    </section>
  );
}
