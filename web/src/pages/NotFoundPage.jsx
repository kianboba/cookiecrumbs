import { Link } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell.jsx";

export default function NotFoundPage() {
  return (
    <PageShell title="Page not found">
      <div className="text-center">
        <h1 className="heading-1">404</h1>
        <p className="mt-2 text-ink-600">Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary mt-6 inline-flex">
          Go home
        </Link>
      </div>
    </PageShell>
  );
}
