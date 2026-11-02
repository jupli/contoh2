import { useEffect, useState, type ReactNode } from 'react';
import { ArrowUp, Camera as Instagram, Check, ExternalLink, HandHeart, Mail, MapPin, MessageCircle, Music2, Play, Quote, ZoomIn } from 'lucide-react';
import { BENEFITS, CONTACT, GALLERY, IMAGES, LEGAL, PROOFS, REASONS, STORY } from './data';
import { formatRupiah } from './data';
import { Dialog } from './components/Dialog';
import { Celebration } from './components/Celebration';
import { DonationForm } from './components/DonationForm';
import { DonationWall } from './components/DonationWall';
import { Gallery } from './components/Gallery';
import { PaymentMethods } from './components/PaymentMethods';
import { PaymentModal } from './components/PaymentModal';
import { SourceImage } from './components/SourceImage';
import { Toaster } from './components/Toaster';
import { DonationProvider, relativeTime, useDonations } from './store/donations';

function WakafButton({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <a href="#wakaf" className={`cta-button ${className}`}><HandHeart size={20} strokeWidth={1.8} />{children}</a>;
}

function LiveRibbon() {
  const { entries, totals } = useDonations();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (entries.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = setInterval(() => setIndex((value) => (value + 1) % Math.min(entries.length, 8)), 4200);
    return () => clearInterval(interval);
  }, [entries.length]);
  const entry = entries[index];
  if (!entry) return null;
  return (
    <div className="ribbon">
      <div className="page-width flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 font-body text-[10.5px] text-white/85">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"><span className="live-dot" />Langsung</span>
        <span key={entry.id} className="ribbon-line flex min-w-0 items-center gap-1.5">
          <Quote size={11} className="shrink-0 text-[#ffd9a8]" />
          <span className="truncate"><b className="text-white">{entry.name}</b> · {relativeTime(entry.createdAt)} · <b className="text-[#ffd9a8]">Rp {formatRupiah(entry.amount)}</b></span>
        </span>
        <span className="hidden min-[560px]:inline">{totals.count} donatur · {totals.mushaf} mushaf tercatat</span>
      </div>
    </div>
  );
}

function Page() {
  const { entries } = useDonations();
  const [videoOpen, setVideoOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('beranda');
      const form = document.getElementById('wakaf');
      if (!hero || !form) return;
      const heroRect = hero.getBoundingClientRect();
      const formRect = form.getBoundingClientRect();
      setShowSticky(heroRect.top < 80 && !(formRect.top < window.innerHeight && formRect.bottom > 80));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver((observerEntries) => {
      observerEntries.forEach((item) => { if (item.isIntersecting) { item.target.classList.add('is-visible'); observer.unobserve(item.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -25px 0px' });
    elements.forEach((element) => { element.classList.add('reveal-ready'); observer.observe(element); });
    return () => { observer.disconnect(); elements.forEach((element) => element.classList.remove('reveal-ready')); };
  }, []);

  return (
    <>
      <a href="#wakaf" className="skip-link">Langsung ke formulir wakaf</a>
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur-sm">
        <div className="page-width flex h-[70px] items-center justify-between gap-4">
          <a href="#beranda" aria-label="AmalQu, kembali ke awal" className="shrink-0 transition hover:opacity-80"><SourceImage src={IMAGES.logo} alt="AmalQu — Amal Qur'an" width={125} height={36} className="h-9 w-auto object-contain" /></a>
          <nav aria-label="Navigasi utama" className="flex items-center gap-4 font-body text-[11px] font-semibold text-muted">
            <a href="#keutamaan" className="hidden transition hover:text-brand sm:inline">Keutamaan</a>
            <a href="#papan-donasi" className="hidden transition hover:text-brand min-[560px]:inline">Papan Donasi{entries.length ? ` · ${entries.length}` : ''}</a>
            <a href="#kontak" className="inline-flex items-center gap-1.5 rounded-full border border-teal/20 px-3 py-2 text-teal transition hover:bg-teal hover:text-white"><MessageCircle size={14} />Kontak</a>
          </nav>
        </div>
      </header>

      <LiveRibbon />

      <main id="beranda" className="site-pattern scroll-mt-20 pb-16">
        <div className="page-width">
          <section aria-labelledby="hero-title" className="pb-7 pt-6">
            <a href="#wakaf" className="hero-image group block overflow-hidden rounded-lg shadow-[0_5px_20px_rgba(30,60,50,0.12)]" aria-label="Amal Jariyah Hidup Abadi Melalui Wakaf Al-Qur'an — mulai berwakaf">
              <SourceImage src={IMAGES.hero} alt="Amal Jariyah Hidup Abadi, Melalui Wakaf Al-Qur'an. Tiap Al-Qur'an yang dibaca menjadi saksi amal kebaikan yang akan terus mengalir meski pewakaf telah tiada!" width={2000} height={999} fetchPriority="high" className="aspect-[2000/999] w-full object-cover transition duration-700 group-hover:scale-[1.015]" />
            </a>
            <h1 id="hero-title" className="mx-auto mt-8 max-w-[590px] text-center font-display text-[26px] font-bold leading-[1.55] text-brand sm:text-[31px]">Mari Datangkan Pahala Jariyah Berlipat untuk Orang Tua!</h1>
            <div className="mx-auto mt-6 max-w-[590px] space-y-5 text-center font-display text-[17px] leading-[1.85] text-[#303632] sm:text-[19px]">
              <p>Berwakaf mushaf Al-Qur’an atas nama orang tua adalah cara indah untuk melengkapi amalan mereka.</p>
              <p>Amal Jariyah yang didapat tidak akan pernah putus ketika Al Quran terus di baca dan dihafal.</p>
            </div>
            <div className="mt-7 flex justify-center"><WakafButton>Klik untuk sedekahkan sekarang</WakafButton></div>
          </section>

          <section id="tentang" aria-label="Tentang wakaf mushaf untuk orang tua" className="scroll-mt-24 pt-6" data-reveal>
            <div className="paper-card grid overflow-hidden sm:grid-cols-[32%_1fr]">
              <SourceImage src={IMAGES.story} alt="Hadiah terbaik — mewakafkan Al-Qur'an untuk orang tua" loading="lazy" className="h-72 w-full object-cover sm:h-full" />
              <div className="space-y-5 p-6 font-display text-[13px] leading-[1.95] text-[#303632] sm:p-7">
                <p>{STORY[0]}</p>
                <p className="rounded-sm bg-brand px-4 py-3 font-bold text-white">{STORY[1]}</p>
                <p>{STORY[2]}</p>
              </div>
            </div>
            <div className="mt-7 flex justify-center"><WakafButton>Saya Mau Wakaf untuk Orang Tua</WakafButton></div>
          </section>

          <section id="keutamaan" aria-labelledby="benefits-title" className="mt-12 scroll-mt-24 overflow-hidden rounded-[10px] bg-brand p-7 text-white shadow-[0_6px_22px_rgba(230,81,0,0.16)] sm:p-9" data-reveal>
            <h2 id="benefits-title" className="text-center font-display text-[26px] font-bold leading-[1.5] sm:text-[29px]">Keutamaan Wakaf Al Qur'an</h2>
            <p className="mt-5 font-display text-[14px] leading-[1.95] text-white/95 sm:text-[15px]">Wakaf Mushaf adalah salah satu amalan terbaik karena menjadi investasi bagi kita di akhirat kelak. Berikut beberapa keutamaan yang didapat bagi siapa saja yang wakaf mushaf untuk orang tua:</p>
            <ol className="mt-6 space-y-4">
              {BENEFITS.map((benefit, benefitIndex) => <li key={benefit} className="flex items-start gap-3.5 border-b border-white/15 pb-4 last:border-0 last:pb-0"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 font-body text-xs font-bold">{benefitIndex + 1}</span><p className="font-display text-[13px] leading-[1.9] sm:text-sm">{benefit}</p></li>)}
            </ol>
          </section>

          <section aria-label="Video penyaluran AmalQu" className="mt-12 flex justify-center" data-reveal>
            <div className="w-full max-w-[340px]">
              <div className="paper-card !rounded-xl p-2.5">
                <button type="button" onClick={() => setVideoOpen(true)} className="group relative block aspect-[9/16] w-full overflow-hidden rounded-lg bg-[#dce6df]" aria-label="Putar video penyaluran AmalQu">
                  <SourceImage src={IMAGES.video} alt="Video penyaluran mushaf AmalQu" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />
                  <span className="absolute left-1/2 top-1/2 flex h-12 w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-[#f00] text-white shadow-lg transition group-hover:scale-110 group-hover:bg-[#d90000]"><Play size={25} fill="currentColor" className="ml-1" /></span>
                  <span className="absolute bottom-5 left-0 right-0 font-body text-sm font-bold text-white">DKM masjid</span>
                </button>
              </div>
              <a href={CONTACT.youtube} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-1.5 font-body text-[11px] font-semibold text-muted transition hover:text-brand">Lihat di YouTube<ExternalLink size={12} /></a>
            </div>
          </section>

          <section aria-labelledby="reasons-title" className="paper-card mt-12 p-6 sm:p-8" data-reveal>
            <h2 id="reasons-title" className="text-center font-display text-[24px] font-bold leading-[1.6] text-brand sm:text-[27px]">Mengapa Harus di Yayasan Sahabat Berbagi Safwan?</h2>
            <div className="mt-8 space-y-7">
              {REASONS.map((reason, reasonIndex) => <article key={reason.title} className="flex items-start gap-3.5"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 font-body text-xs font-bold text-brand">{reasonIndex + 1}</span><div><h3 className="font-body text-[11px] font-extrabold leading-[1.7] text-ink sm:text-xs">{reason.title}</h3><p className="mt-2 whitespace-pre-line font-display text-[12px] leading-[1.95] text-[#4c534f] sm:text-[13px]">{reason.body}</p></div></article>)}
            </div>
          </section>

          <section id="penyaluran" aria-labelledby="gallery-title" className="mt-10 scroll-mt-24" data-reveal>
            <h2 id="gallery-title" className="sr-only">Laporan Penyaluran</h2>
            <Gallery images={GALLERY} label="Dokumentasi penyaluran AmalQu" />
          </section>

          <section aria-label="Ajakan sedekah mushaf" className="mt-12 px-1 text-center font-display text-[17px] leading-[1.95] text-[#303632] sm:text-[18px]" data-reveal>
            <p>Dengan bersedekah mushaf Al-Qur’an, kita memberikan hadiah yang terus bernilai bagi orang tua hingga akhir zaman. Ini adalah langkah kecil yang membawa kebahagiaan besar dan abadi.</p>
            <p className="mt-6"><mark className="box-decoration-clone bg-brand px-1.5 py-1 font-bold leading-[2] text-white">Mari sedekah mushaf Al-Qur'an hari ini untuk mereka yang kita cintai.</mark></p>
          </section>

          <section aria-labelledby="product-title" className="paper-card mt-10 p-6 sm:p-8" data-reveal>
            <h2 id="product-title" className="text-center font-display text-[28px] font-bold text-brand">Al-Qur'an</h2>
            <div className="mt-6 grid items-center gap-6 sm:grid-cols-[42%_1fr]">
              <button type="button" onClick={() => setProductOpen(true)} className="group relative aspect-square overflow-hidden rounded-lg bg-[#f2f1ec]" aria-label="Perbesar foto mushaf Al-Qur'an">
                <SourceImage src={IMAGES.product} alt="Mushaf Al-Qur'an Rasm Usmani yang disalurkan AmalQu" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink shadow transition group-hover:bg-brand group-hover:text-white"><ZoomIn size={16} /></span>
              </button>
              <ul className="space-y-4 font-display text-[14px] leading-relaxed text-[#303632]">
                {['Ukuran A5', 'Rasm Usmani Mudah di Baca', '604 Video Syaikh Sudais', 'Nama Wakif dan Doa dicantumkan di Mushaf'].map((item) => <li key={item} className="flex items-start gap-2.5"><Check size={17} className="mt-1 shrink-0 text-teal" />{item}</li>)}
              </ul>
            </div>
          </section>

          <section id="wakaf" aria-label="Formulir wakaf mushaf Al-Qur'an" className="mt-12 scroll-mt-24" data-reveal>
            <DonationForm />
          </section>

          <div className="my-7 flex items-center justify-center gap-7 text-brand" aria-hidden="true"><ArrowUp className="animated-arrow -rotate-12" size={34} strokeWidth={3} /><ArrowUp className="animated-arrow" size={38} strokeWidth={3} /><ArrowUp className="animated-arrow rotate-12" size={34} strokeWidth={3} /></div>

          <section aria-label="Rekening donasi AmalQu" className="rounded-lg bg-white p-5 shadow-[0_3px_16px_rgba(30,60,50,0.06)] sm:p-6" data-reveal><PaymentMethods /></section>

          <div className="mt-14" data-reveal><DonationWall /></div>

          <section aria-labelledby="proofs-title" className="mt-12" data-reveal>
            <h2 id="proofs-title" className="text-center font-body text-[15px] font-extrabold uppercase tracking-[0.16em] text-teal">Bukti transfer #SahabatAmal</h2>
            <p className="mx-auto mt-2 max-w-[440px] text-center font-display text-[12px] leading-relaxed text-muted">Setiap donasi yang masuk dikonfirmasi dan dicatat oleh Admin AmalQu.</p>
            <div className="mt-6"><Gallery images={PROOFS} variant="proofs" label="Bukti donasi SahabatAmal" /></div>
          </section>
        </div>
      </main>

      <footer id="kontak" className="scroll-mt-20 border-t border-black/5 bg-[#f5f5f5] px-5 pb-28 pt-12 font-body text-[#616161]">
        <div className="mx-auto grid max-w-[1000px] gap-9 sm:grid-cols-2 lg:grid-cols-[1fr_1.1fr_1.1fr_.8fr]">
          <section><h2 className="mb-4 text-sm font-bold text-brand">Kontak</h2><ul className="space-y-3 text-xs leading-relaxed">
            <li><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 transition hover:text-teal"><MessageCircle size={15} className="mt-0.5 shrink-0" />{CONTACT.phone}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="flex items-start gap-2 break-all transition hover:text-teal"><Mail size={15} className="mt-0.5 shrink-0" />{CONTACT.email}</a></li>
            <li><a href={CONTACT.maps} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 transition hover:text-teal"><MapPin size={15} className="mt-0.5 shrink-0" />{CONTACT.address}</a></li>
          </ul></section>
          <section><h2 className="mb-4 text-sm font-bold text-brand">Tentang</h2><p className="text-xs leading-[1.9]">Program AmalQu - Amal Qur'an merupakan bagian dari Yayasan Amalqu Peduli Indonesia yang bertujuan menyebarkan Sedekah 2 Juta Mushaf Alquran ke Seluruh Indonesia.</p><p className="mt-4 text-xs leading-relaxed">Semoga Allah wujudkan mimpi kita.</p></section>
          <section><h2 className="mb-4 text-sm font-bold text-brand">Legalitas</h2><ul className="space-y-3 text-xs leading-[1.9]">{LEGAL.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><h2 className="mb-4 text-sm font-bold text-brand">Laporan Penyaluran</h2><div className="flex flex-col gap-3 text-xs"><a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition hover:text-teal"><Instagram size={16} />Instagram</a><a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition hover:text-teal"><Music2 size={16} />TikTok</a><a href="#penyaluran" className="mt-1 inline-flex items-center gap-1.5 font-semibold text-teal transition hover:text-brand">Lihat dokumentasi<ExternalLink size={12} /></a></div></section>
        </div>
        <div className="mx-auto mt-10 max-w-[1000px] border-t border-black/5 pt-5 text-center text-[11px] text-muted">© {new Date().getFullYear()} Sahabat Berbagi Safwan</div>
      </footer>

      <div className={`fixed bottom-3 left-1/2 z-40 w-[calc(100%-24px)] max-w-[960px] -translate-x-1/2 transition duration-300 ${showSticky ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-24 opacity-0'}`} aria-hidden={!showSticky}>
        <a href="#wakaf" tabIndex={showSticky ? 0 : -1} className="cta-button w-full !rounded-lg !py-3.5 !text-[11px] shadow-[0_4px_20px_rgba(0,80,65,0.25)] sm:!text-sm"><HandHeart size={18} />Bismillah Saya Mau Sedekah Mushaf Sekarang</a>
      </div>

      <Dialog open={videoOpen} onClose={() => setVideoOpen(false)} title="Video penyaluran AmalQu" className="max-w-[400px]">
        <iframe src="https://www.youtube-nocookie.com/embed/rprmBubao1I?autoplay=1&playsinline=1&rel=0" title="Video penyaluran mushaf AmalQu" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="aspect-[9/16] w-full bg-black" />
        <a href={CONTACT.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-4 font-body text-xs font-semibold text-teal">Lihat di YouTube<ExternalLink size={13} /></a>
      </Dialog>
      <Dialog open={productOpen} onClose={() => setProductOpen(false)} title="Mushaf Al-Qur'an AmalQu" className="max-w-2xl">
        <SourceImage src={IMAGES.product} alt="Mushaf Al-Qur'an Rasm Usmani AmalQu" className="max-h-[72dvh] w-full bg-[#f4f6f5] object-contain p-3" />
      </Dialog>
      <PaymentModal />
      <Celebration />
    </>
  );
}

export default function App() {
  return (
    <Toaster>
      <DonationProvider>
        <Page />
      </DonationProvider>
    </Toaster>
  );
}
