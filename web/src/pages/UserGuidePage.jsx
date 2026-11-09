import { userGuideSteps, quickTips } from "../data/userGuide.js";
import { PageShell } from "../components/layout/PageShell.jsx";
import { Card } from "../components/common/Card.jsx";

function GuideMedia({ step }) {
  if (step.images) {
    return (
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {step.images.map((img) => (
          <figure key={img.src} className="min-w-0">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="mx-auto w-full max-w-xs rounded-lg border border-ink-200 bg-ink-50"
            />
            <figcaption className="mt-2 text-center text-xs text-ink-500">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  const widthClass = step.layout === "narrow" ? "mx-auto w-full max-w-sm" : "w-full";

  return (
    <figure className="mt-5">
      <img
        src={step.image}
        alt={step.alt}
        loading="lazy"
        decoding="async"
        className={`${widthClass} rounded-lg border border-ink-200 bg-ink-50`}
      />
      <figcaption className="mt-2 text-center text-xs text-ink-500">
        {step.caption}
      </figcaption>
    </figure>
  );
}

export default function UserGuidePage() {
  return (
    <PageShell title="User Guide">
      <div className="max-w-3xl">
        <h1 className="heading-1">User Guide</h1>
        <p className="mt-2 text-ink-600">
          Learn how to read CookieCrumbs, inspect cookies, review trackers, and
          configure protection.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-3 lg:gap-8">
        <div className="min-w-0 space-y-6 lg:col-span-2 lg:space-y-8">
          {userGuideSteps.map((step, i) => (
            <Card key={step.id} id={step.id} className="scroll-mt-24">
              <div className="flex items-start gap-3">
                <span className="step-badge">{i + 1}</span>
                <div>
                  <h2 className="heading-3">{step.title}</h2>
                  <p className="mt-2 text-sm text-ink-600">{step.body}</p>
                </div>
              </div>
              <GuideMedia step={step} />
            </Card>
          ))}
        </div>

        <aside className="min-w-0">
          <div className="space-y-6 lg:sticky lg:top-24">
            <Card>
              <h2 className="heading-3">On this page</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {userGuideSteps.map((step) => (
                  <li key={step.id}>
                    <a href={`#${step.id}`} className="text-brand-600 hover:underline">
                      {step.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h2 className="heading-3">Quick tips</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-600">
                {quickTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </Card>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
