import { features } from "../../data/features.js";
import { Card } from "../common/Card.jsx";
import { Icon } from "../common/Icon.jsx";

export function FeaturesGrid() {
  return (
    <section className="container-page section">
      <div className="max-w-2xl">
        <h2 className="heading-2">What you can do</h2>
        <p className="mt-2 text-ink-600">
          Everything CookieCrumbs does to keep your browsing private.
        </p>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-4">
        {features.map((f) => (
          <Card key={f.title}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
              <Icon name={f.icon} className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold text-ink-900">{f.title}</h3>
            <p className="mt-2 text-sm text-ink-600">{f.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
