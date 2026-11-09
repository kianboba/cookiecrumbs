import { Link } from "react-router-dom";
import { Icon } from "../common/Icon.jsx";

const neverThings = [
  "Doesn't collect, transmit, or sell any data",
  "Has no servers — there's nothing to log in to",
  "No accounts, no telemetry, no analytics",
  "Sets no cookies of its own",
];

export function PrivacyBlock() {
  return (
    <section className="hero-wrap">
      <div className="container-page section max-w-4xl">
        <h2 className="heading-2">What CookieCrumbs never does</h2>
        <p className="privacy-lead mt-4 max-w-prose text-ink-600">
          A tool about cookies shouldn't come with cookies of its own. CookieCrumbs
          is <strong>local-first</strong>: every analysis happens on your machine,
          inside your browser.
        </p>
        <ul className="never-list mt-6">
          {neverThings.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-500">
          The source of truth is your own browser: disconnect any network and
          everything keeps working.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/faq" className="btn-primary">
            <Icon name="HelpCircle" className="h-4 w-4" />
            Read the FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}
