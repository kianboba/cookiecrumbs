import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { faqCategories, answerText } from "../data/faqData.js";
import { PageShell } from "../components/layout/PageShell.jsx";
import { Accordion } from "../components/common/Accordion.jsx";
import { Icon } from "../components/common/Icon.jsx";

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const totalQuestions = faqCategories.reduce(
  (count, category) => count + category.items.length,
  0
);

export default function FaqPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqCategories;
    return faqCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (it) =>
            it.q.toLowerCase().includes(q) ||
            answerText(it.a).toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query]);

  const shownQuestions = filtered.reduce(
    (count, category) => count + category.items.length,
    0
  );

  return (
    <PageShell title="FAQ">
      <div className="max-w-3xl">
        <h1 className="heading-1">Frequently Asked Questions</h1>
        <p className="mt-2 text-ink-600">
          Detailed answers about installing, using, and troubleshooting
          CookieCrumbs.
        </p>
        <p className="mt-2 text-sm text-ink-500">
          {totalQuestions} questions across {faqCategories.length} topics.
        </p>
      </div>

      <div className="mt-6 max-w-3xl lg:mt-8">
        <div className="relative">
          <Icon name="HelpCircle" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions and answers..."
            aria-label="Search FAQ"
            className="w-full rounded-lg border border-ink-200 bg-surface py-2.5 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-amber-soft"
          />
        </div>

        {query.trim() ? (
          <p className="mt-3 text-sm text-ink-500" role="status">
            Showing {shownQuestions} of {totalQuestions} questions.
          </p>
        ) : (
          <nav aria-label="FAQ topics" className="mt-4 flex flex-wrap gap-2">
            {faqCategories.map((cat) => (
              <a
                key={cat.category}
                href={`#${slugify(cat.category)}`}
                className="rounded-full border border-ink-200 bg-surface px-3 py-1 text-xs font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {cat.category}
              </a>
            ))}
          </nav>
        )}
      </div>

      <div className="mt-8 max-w-3xl space-y-8 lg:mt-10 lg:space-y-10">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-ink-200 bg-surface p-6">
            <p className="font-medium text-ink-900">
              No questions match your search.
            </p>
            <p className="mt-2 text-sm text-ink-600">
              Try a shorter phrase, or{" "}
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-brand-600 underline hover:text-brand-700"
              >
                clear the search
              </button>{" "}
              to browse all topics.
            </p>
          </div>
        ) : (
          filtered.map((cat) => (
            <div key={cat.category}>
              <h2
                id={slugify(cat.category)}
                className="heading-3 scroll-mt-24"
              >
                {cat.category}
              </h2>
              <div className="mt-3">
                <Accordion items={cat.items} />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-10 max-w-3xl lg:mt-14">
        <div className="card">
          <h2 className="heading-3">Still have questions?</h2>
          <p className="mt-2 text-sm text-ink-600">
            If your question is not covered here, the Support page has contact
            details. Include your browser version, the site URL, and what you
            expected to happen so the team can help faster.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/support" className="btn-primary">
              <Icon name="LifeBuoy" className="h-4 w-4" />
              Contact support
            </Link>
            <Link to="/user-guide" className="btn-secondary">
              <Icon name="BookOpen" className="h-4 w-4" />
              Read the User Guide
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
