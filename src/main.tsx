import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import IndexPage from "./pages/index";
import ArticlePage from "./pages/article";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/article" element={<ArticlePage />} />
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center bg-background px-4">
              <div className="max-w-md text-center">
                <h1 className="text-7xl font-bold text-foreground">404</h1>
                <h2 className="mt-4 text-xl font-semibold text-foreground">Page non trouvée</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  La page que vous recherchez n'existe pas ou a été déplacée.
                </p>
                <div className="mt-6">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Retourner à l'accueil
                  </a>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
