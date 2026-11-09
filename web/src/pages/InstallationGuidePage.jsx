import { installationSteps, troubleshooting } from "../data/installationSteps.js";
import { PageShell } from "../components/layout/PageShell.jsx";
import { Card } from "../components/common/Card.jsx";
import { Icon } from "../components/common/Icon.jsx";

export default function InstallationGuidePage() {
  return (
    <PageShell title="Installation Guide">
      <div className="max-w-3xl">
        <h1 className="heading-1">Installation Guide</h1>
        <p className="mt-2 text-ink-600">
          Follow these steps to install CookieCrumbs in a Chromium-based browser.
        </p>
      </div>

      <div className="mt-8 space-y-4 lg:mt-10">
        {installationSteps.map((step, i) => (
          <Card key={step.title}>
            <div className="flex gap-4">
              <span className="step-badge">{i + 1}</span>
              <div>
                <h2 className="font-semibold text-ink-900">{step.title}</h2>
                <p className="mt-1 text-sm text-ink-600">{step.body}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 lg:mt-14">
        <h2 className="heading-2">Troubleshooting</h2>
        <div className="mt-4 space-y-3">
          {troubleshooting.map((t) => (
            <Card key={t.problem}>
              <div className="flex items-start gap-3">
                <Icon name="AlertTriangle" className="mt-0.5 h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium text-ink-900">{t.problem}</p>
                  <p className="mt-1 text-sm text-ink-600">{t.solution}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
