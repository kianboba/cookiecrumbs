import { Icon } from "../common/Icon.jsx";

const steps = [
  {
    title: "Browse normally",
    body: "Cookies are set as they always are — you don't change a thing.",
    icon: "Download",
  },
  {
    title: "CookieCrumbs watches locally",
    body: "Every cookie is detected and classified on-device into five categories, from Strict to Advertising.",
    icon: "BookOpen",
  },
  {
    title: "Score & automatic protection",
    body: "Each site gets a 0–100 privacy score while tracking cookies and tracker domains are blocked automatically.",
    icon: "CheckCircle2",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ink-100">
      <div className="container-page section">
        <h2 className="heading-2">Get up and running in minutes</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3 lg:gap-8">
          {steps.map((s, i) => (
            <div key={s.title} className="card">
              <div className="flex items-center gap-3">
                <span className="step-badge">{i + 1}</span>
                <Icon name={s.icon} className="h-5 w-5 text-brand-600" />
              </div>
              <h3 className="mt-4 font-semibold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-600">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
