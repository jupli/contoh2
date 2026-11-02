import { useState } from "react";
import { cn } from "../utils/cn";
import { Icon, Eyebrow, Ornament, Reveal } from "./common";
import { faqs, WA_NUMBER } from "../data";
import { Logo } from "./Header";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="tanya" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Reveal>
              <Eyebrow>Tanya Jawab</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="mt-6 font-display text-3xl leading-tight text-emerald-900 text-balance sm:text-4xl">
                Masih ada yang ingin kamu pastikan?
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-5 text-[15px] leading-relaxed text-ink/70">
                Admin kami siap membantu memilih paket, menuliskan nama dan doa, hingga mengirim
                laporan penyaluran.
              </p>
            </Reveal>
            <Reveal delay={190}>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                  "Assalamualaikum, saya ingin bertanya tentang program wakaf mushaf AmalQu.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-3 rounded-full border border-emerald-800/20 bg-white px-6 py-3.5 text-sm font-bold text-emerald-900 shadow-sm transition hover:bg-emerald-900 hover:text-white"
              >
                <Icon name="whatsapp" className="h-5 w-5" filled />
                Tanya admin dulu
              </a>
            </Reveal>
          </div>

          <ul className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal as="li" key={f.q} delay={i * 50}>
                  <div
                    className={cn(
                      "overflow-hidden rounded-2xl border transition duration-300",
                      isOpen
                        ? "border-gold-400 bg-white shadow-lg shadow-emerald-900/5"
                        : "border-emerald-800/12 bg-white/70 hover:border-gold-400/50",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                    >
                      <span className="font-display text-base leading-snug text-emerald-900 sm:text-lg">
                        {f.q}
                      </span>
                      <span
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition",
                          isOpen
                            ? "rotate-45 border-gold-400 bg-gold-400 text-emerald-950"
                            : "border-emerald-800/20 text-emerald-800",
                        )}
                      >
                        <Icon name="plus" className="h-4 w-4" />
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-400 ease-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-sm leading-relaxed text-ink/70">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-emerald-950 py-24 sm:py-28">
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/galeri-1.jpg"
          alt=""
          className="h-full w-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/90 via-emerald-950/85 to-emerald-950" />
        <div className="arabesque-grid absolute inset-0 opacity-25" />
      </div>

      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="font-arabic text-2xl leading-loose text-gold-200 sm:text-3xl" dir="rtl">
            مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ
            سَبْعَ سَنَابِلَ
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-8 font-display text-3xl leading-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Mulai dari satu mushaf hari ini
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-cream-200/75">
            Amal jariyah tidak menunggu kita sempurna. Ia hanya menunggu dimulai. Bismillah, wakafkan
            mushaf pertamamu sekarang — untuk orang tua, keluarga, atau dirimu sendiri.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#wakaf"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-8 py-4 text-sm font-bold text-emerald-950 shadow-xl shadow-gold-500/20 transition hover:brightness-110"
            >
              Wakaf Mushaf Sekarang
              <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-cream-100 transition hover:bg-white/10"
            >
              <Icon name="whatsapp" className="h-4 w-4" filled />
              Konsultasi dulu
            </a>
          </div>
        </Reveal>
        <Ornament className="mt-12" />
      </div>
    </section>
  );
}

const footerLinks = [
  {
    title: "Program",
    items: ["Wakaf Mushaf", "Sedekah Mushaf", "Rak Mushaf Masjid", "Patungan Mushaf"],
  },
  {
    title: "Informasi",
    items: ["Laporan Penyaluran", "Cara Berwakaf", "Sertifikat Wakaf", "Mitra Lembaga"],
  },
  {
    title: "Bantuan",
    items: ["Hubungi Admin", "Konfirmasi Donasi", "Syarat & Ketentuan", "Kebijakan Privasi"],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-emerald-900 pt-16 pb-28 sm:pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-200/65">
              AmalQu — Amal Qur'an. Gerakan menyebarkan mushaf Al-Qur'an ke rumah tahfidz, TPQ,
              madrasah, masjid, dan pelosok Nusantara, sebagai wujud amal jariyah bagi para
              muwakif.
            </p>
            <p className="mt-5 font-arabic text-xl text-gold-200/90" dir="rtl">
              خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
            </p>
            <div className="mt-6 flex gap-3">
              {["IG", "FB", "YT", "TT"].map((s) => (
                <span
                  key={s}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[11px] font-bold text-cream-200/70 transition hover:border-gold-300 hover:text-gold-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerLinks.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-bold tracking-[0.22em] text-gold-200/80 uppercase">
                  {col.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#wakaf"
                        className="text-sm text-cream-200/65 transition hover:text-gold-200"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-cream-200/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AmalQu — Amal Qur'an. Semua hak dilindungi.</p>
          <p className="max-w-xl leading-relaxed">
            Halaman ini merupakan demonstrasi desain landing page bertema wakaf mushaf Al-Qur'an.
            Nomor WhatsApp dan angka capaian bersifat contoh.
          </p>
        </div>
      </div>
    </footer>
  );
}
