import { siteConfig } from "../data/siteConfig.js";
import { releaseNotes } from "../data/releaseNotes.js";
import { PageShell } from "../components/layout/PageShell.jsx";
import { Card } from "../components/common/Card.jsx";
import { Badge } from "../components/common/Badge.jsx";
import { Icon } from "../components/common/Icon.jsx";

export default function DownloadsPage() {
  const hasDownload = Boolean(siteConfig.downloadUrl);

  return (
    <PageShell title="Downloads">
      <div className="max-w-3xl">
        <h1 className="heading-1">Downloads</h1>
        <p className="mt-2 text-ink-600">
          Download the latest version of CookieCrumbs for your Chromium-based browser.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:mt-10 lg:gap-8 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="heading-3">{siteConfig.productName}</h2>
            <Badge tone="brand">v{siteConfig.version}</Badge>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-500">Version</dt>
              <dd className="font-medium text-ink-900">{siteConfig.version}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">Released</dt>
              <dd className="font-medium text-ink-900">{siteConfig.releaseDate}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">Installer</dt>
              <dd className="font-medium text-ink-900">{siteConfig.installerFileName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">Size</dt>
              <dd className="font-medium text-ink-900">{siteConfig.installerSize}</dd>
            </div>
          </dl>

          <div className="mt-6">
            {hasDownload ? (
              <a href={siteConfig.downloadUrl} className="btn-primary w-full sm:w-auto" download>
                <Icon name="Download" className="h-4 w-4" />
                Download installer
              </a>
            ) : (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-center gap-2 text-amber-800">
                  <Icon name="AlertTriangle" className="h-5 w-5" />
                  <span className="font-medium">Download not available yet</span>
                </div>
                <p className="mt-2 text-sm text-amber-700">
                  The CookieCrumbs extension package is being prepared. Please check back soon
                  or follow the manual installation steps in the Installation Guide.
                </p>
                <button type="button" className="btn-secondary mt-3" disabled>
                  <Icon name="Download" className="h-4 w-4" />
                  Download (coming soon)
                </button>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="heading-3">System requirements</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-700">
            {siteConfig.platforms.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <Icon name="CheckCircle2" className="mt-0.5 h-4 w-4 text-brand-600" />
                {p}
              </li>
            ))}
            <li className="flex items-start gap-2">
              <Icon name="CheckCircle2" className="mt-0.5 h-4 w-4 text-brand-600" />
              Manifest V3 compatible
            </li>
            <li className="flex items-start gap-2">
              <Icon name="CheckCircle2" className="mt-0.5 h-4 w-4 text-brand-600" />
              No external server required — runs fully in-browser
            </li>
          </ul>
        </Card>
      </div>

      <div className="mt-10 lg:mt-14">
        <h2 className="heading-2">Release notes</h2>
        <div className="mt-4 space-y-4">
          {releaseNotes.map((r) => (
            <Card key={r.version}>
              <div className="flex items-center gap-2">
                <Badge tone="brand">v{r.version}</Badge>
                <span className="text-sm text-ink-500">{r.date}</span>
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-700">
                {r.changes.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
