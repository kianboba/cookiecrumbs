// CookieCrumbs landing page — minimal, dependency-free JS.
// 1) Mobile nav toggle  2) Hero privacy-score count-up (reduced-motion aware).

(function () {
  "use strict";

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Count-up for the score ring number, honors prefers-reduced-motion.
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ring = document.querySelector(".score-ring[data-score]");
  if (!ring) return;

  const target = parseInt(ring.dataset.score, 10) || 0;
  const label = ring.querySelector("span");

  if (reduced || !("IntersectionObserver" in window)) {
    label.textContent = String(target);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    const start = performance.now();
    const duration = 900;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      label.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  observer.observe(ring);
})();
