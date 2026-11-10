import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { ErrorBoundary } from "./components/common/ErrorBoundary.jsx";
import { SplashScreen } from "./components/SplashScreen.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const DownloadsPage = lazy(() => import("./pages/DownloadsPage.jsx"));
const InstallationGuidePage = lazy(() => import("./pages/InstallationGuidePage.jsx"));
const UserGuidePage = lazy(() => import("./pages/UserGuidePage.jsx"));
const FaqPage = lazy(() => import("./pages/FaqPage.jsx"));
const SupportPage = lazy(() => import("./pages/SupportPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

function Loading() {
  return (
    <div className="container-page py-16" role="status" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <div className="mx-auto max-w-3xl" aria-hidden="true">
        <span className="skeleton-line w-1/3" />
        <span className="skeleton-line mt-4 w-2/3" />
        <div className="skeleton-panel mt-8" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="skeleton-panel !h-40" />
          <div className="skeleton-panel !h-40" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <SplashScreen />
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
