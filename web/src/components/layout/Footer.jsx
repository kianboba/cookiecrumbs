import { Link } from "react-router-dom";
import { footerLinks } from "../../data/navigation.js";
import { siteConfig } from "../../data/siteConfig.js";

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-ink-50">
      <div className="container-page py-10 lg:py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div>
            <p className="font-bold text-ink-900">{siteConfig.productName}</p>
            <p className="mt-2 text-sm text-ink-500 max-w-prose">
              {siteConfig.tagline}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-900">Resources</p>
            <ul className="mt-3 space-y-2">
              {footerLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-ink-600 hover:text-brand-600">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-900">Support</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="text-sm text-ink-600 hover:text-brand-600"
                >
                  {siteConfig.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-ink-200 pt-6 text-xs text-ink-500">
          {siteConfig.copyright}
          <span className="ml-2">
            · <span className="italic">Placeholder content — replace before launch.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
