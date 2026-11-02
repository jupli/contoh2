import Header from "./components/Header";
import Hero from "./components/Hero";
import Story from "./components/Story";
import { WhyUs, Mushaf } from "./components/WhyMushaf";
import WakafForm from "./components/WakafForm";
import { Impact, Penyaluran, Testimonials } from "./components/Impact";
import DonationWall from "./components/DonationWall";
import { Faq, ClosingCta, Footer } from "./components/Faq";
import { ToastProvider } from "./components/Toasts";
import { Icon } from "./components/common";
import { WA_NUMBER } from "./data";

export default function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-cream font-sans antialiased">
        <Header />
        <main>
          <Hero />
          <Story />
          <Impact />
          <WhyUs />
          <Mushaf />
          <WakafForm />
          <Penyaluran />
          <DonationWall />
          <Testimonials />
          <Faq />
          <ClosingCta />
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
            <a
              href="#wakaf"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-300 to-gold-500 text-sm font-bold text-emerald-950"
            >
              Wakaf Mushaf — Rp 99.000
            </a>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
