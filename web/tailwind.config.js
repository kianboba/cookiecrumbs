/** @type {import('tailwindcss').Config} */

// Design tokens ported from the CookieCrumbs static landing page (site/):
// dark-first, cookie-amber accent on privacy-teal base, light fallback via
// prefers-color-scheme in src/index.css. Values resolve to CSS variables so the
// same Tailwind class names work in both themes.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy blue scale replaced in-place: ink = neutral surfaces/text,
        // brand = cookie amber. Semantic extras: surface/teal/red/apiums.
        ink: {
          50: "var(--bg)",        // page background (was near-white)
          100: "var(--surface-2)", // soft section background
          200: "var(--border)",   // hairline borders
          300: "var(--border)",   // hover borders
          400: "var(--muted-dim)", // faint text/placeholders
          500: "var(--muted)",    // muted text
          600: "var(--muted)",    // muted text
          700: "var(--muted)",    // body-muted / nav links
          800: "var(--text)",     // body text
          900: "var(--text-strong)", // headings
        },
        brand: {
          50: "var(--amber-soft)",
          100: "var(--amber-soft)",
          200: "var(--border)",
          300: "var(--muted-dim)",
          400: "var(--amber)",
          500: "var(--amber)",
          600: "var(--amber)",
          700: "var(--amber-strong)",
          800: "var(--amber-strong)",
          900: "var(--amber-strong)",
        },
        // New semantic names used in the ported components.
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        amber: "var(--amber)",
        amberSoft: "var(--amber-soft)",
        "amber-soft": "var(--amber-soft)",
        "amber-strong": "var(--amber-strong)",
        teal: "var(--teal)",
        "teal-soft": "var(--teal-soft)",
        red: "var(--red)",
        "red-soft": "var(--red-soft)",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 8px 30px rgba(0, 0, 0, .35)",
        lift: "0 4px 12px -2px rgb(0 0 0 / 0.25)",
      },
      maxWidth: {
        prose: "72ch",
      },
    },
  },
  plugins: [],
};
