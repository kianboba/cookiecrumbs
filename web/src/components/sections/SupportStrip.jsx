import { Link } from "react-router-dom";
import { siteConfig } from "../../data/siteConfig.js";
import { Icon } from "../common/Icon.jsx";

export function SupportStrip() {
  return (
    <section className="container-page section">
      <div className="card flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between lg:gap-6">
        <div>
          <h2 className="heading-3">Need help?</h2>
          <p className="mt-1 text-sm text-ink-600">
            Our support team is here to help. Reach out by email and we'll get back to you.
          </p>
        </div>
        <div className="flex gap-3">
          <a href={`mailto:${siteConfig.supportEmail}`} className="btn-primary">
            <Icon name="Mail" className="h-4 w-4" />
            Email support
          </a>
          <Link to="/faq" className="btn-secondary">
            <Icon name="HelpCircle" className="h-4 w-4" />
            Browse FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}
