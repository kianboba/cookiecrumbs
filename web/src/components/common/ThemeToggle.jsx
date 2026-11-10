import { useEffect, useState } from "react";

/*
  Tri-state theme toggle: auto (follow OS) → light → dark → auto.
  Persisted in localStorage under "cc-theme"; a boot script in index.html
  applies the stored choice pre-render, so there is never a theme flash.
*/

const ORDER = ["auto", "light", "dark"];

const ICONS = {
  auto: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
    </svg>
  ),
  light: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  ),
};

function readInitialMode() {
  try {
    const v = window.localStorage.getItem("cc-theme");
    if (v === "light" || v === "dark") return v;
  } catch {
    /* storage unavailable — stay in auto */
  }
  return "auto";
}

export function ThemeToggle() {
  const [mode, setMode] = useState(readInitialMode);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "auto") {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = mode;
    }
    try {
      if (mode === "auto") window.localStorage.removeItem("cc-theme");
      else window.localStorage.setItem("cc-theme", mode);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }, [mode]);

  const labels = {
    auto: "Theme: auto (switch to light)",
    light: "Theme: light (switch to dark)",
    dark: "Theme: dark (switch to auto)",
  };

  return (
    <button
      type="button"
      className="btn-icon"
      onClick={() => setMode(ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length])}
      aria-label={labels[mode]}
      title={labels[mode]}
    >
      {ICONS[mode]}
    </button>
  );
}
