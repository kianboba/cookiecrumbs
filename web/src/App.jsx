import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { ErrorBoundary } from "./components/common/ErrorBoundary.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const DownloadsPage = lazy(() => import("./pages/DownloadsPage.jsx"));
const InstallationGuidePage = lazy(() => import("./pages/InstallationGuidePage.jsx"));
const UserGuidePage = lazy(() => import("./pages/UserGuidePage.jsx"));
const FaqPage = lazy(() => import("./pages/FaqPage.jsx"));
const SupportPage = lazy(() => import("./pages/SupportPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

function Loading() {
  return (
    <div className="container-page py-16 text-center text-ink-500">Loading…</div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="" element={<HomePage />} />
              <Route path="/downloads" element={<DownloadsPage />} />
              <Route path="/installation-guide" element={<InstallationGuidePage />} />
              <Route path="/user-guide" element={<UserGuidePage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
