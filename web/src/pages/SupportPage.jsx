import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig.js";
import { PageShell } from "../components/layout/PageShell.jsx";
import { Card } from "../components/common/Card.jsx";
import { Icon } from "../components/common/Icon.jsx";

export default function SupportPage() {
  return (
    <PageShell title="Support">
      <div className="max-w-3xl">
        <h1 className="heading-1">Support</h1>
        <p className="mt-2 text-ink-600">
          We're here to help. Reach out and we'll get back to you.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-2 lg:gap-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
              <Icon name="Mail" className="h-5 w-5" />
            </div>
            <h2 className="heading-3">Email us</h2>
          </div>
          <p className="mt-3 text-sm text-ink-600">
            Send a message to our support team. Please include your software version and a
            description of the issue.
          </p>
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="btn-primary mt-4 inline-flex"
          >
            <Icon name="Mail" className="h-4 w-4" />
            {siteConfig.supportEmail}
          </a>
        </Card>

        <Card>
          <h2 className="heading-3">What to expect</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-700">
            <li className="flex items-start gap-2">
              <Icon name="CheckCircle2" className="mt-0.5 h-4 w-4 text-brand-600" />
              Response within 1–2 business days
            </li>
            <li className="flex items-start gap-2">
              <Icon name="CheckCircle2" className="mt-0.5 h-4 w-4 text-brand-600" />
              Please check the FAQ and User Guide first — many answers are there
            </li>
            <li className="flex items-start gap-2">
              <Icon name="CheckCircle2" className="mt-0.5 h-4 w-4 text-brand-600" />
              Include screenshots when reporting a problem
            </li>
          </ul>
          <p className="mt-4 text-xs text-ink-500 italic">PLACEHOLDER — adjust expectations to real SLA.</p>
        </Card>
      </div>

      <div className="mt-8 lg:mt-10">
        <Card>
          <h2 className="heading-3">Helpful resources</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/installation-guide" className="text-brand-600 hover:underline">
                Installation Guide
              </Link>
            </li>
            <li>
              <Link to="/user-guide" className="text-brand-600 hover:underline">
                User Guide
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-brand-600 hover:underline">
                FAQ
              </Link>
            </li>
          </ul>
          <p className="mt-3 text-xs text-ink-500 italic">
            PLACEHOLDER — adjust as needed.
          </p>
        </Card>
      </div>
    </PageShell>
  );
}
