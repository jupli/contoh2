import { useEffect } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { ToastProvider } from "./components/Toasts";
import { Icon } from "./components/common";
import { Footer } from "./components/Faq";
import Home from "./pages/Home";
import Tentang from "./pages/Tentang";
import WakafPage from "./pages/Wakaf";
import Laporan from "./pages/Laporan";
import { WA_NUMBER } from "./data";

/** Scroll ke atas tiap pindah halaman; hormati anchor #hash */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = window.setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }, 90);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-cream font-sans antialiased">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tentang" element={<Tentang />} />
              <Route path="/wakaf" element={<WakafPage />} />
              <Route path="/laporan" element={<Laporan />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />

          {/* mobile sticky action bar */}
          <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold-500/25 bg-emerald-950/95 px-4 py-3 backdrop-blur sm:hidden">
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/20 text-gold-200"
                aria-label="Hubungi admin via WhatsApp"
              >
                <Icon name="whatsapp" className="h-6 w-6" filled />
              </a>
              <Link
                to="/wakaf"
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-300 to-gold-500 text-sm font-bold text-emerald-950"
              >
                Wakaf Mushaf — Rp 99.000
              </Link>
            </div>
          </div>
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}
