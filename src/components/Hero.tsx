import { Link } from "react-router-dom";
import { Icon, Eyebrow, Reveal } from "./common";
import { marqueeWords } from "../data";

const quickStats = [
  { value: "24.380+", label: "Mushaf tersalurkan" },
  { value: "412", label: "Lembaga dibina" },
  { value: "34", label: "Provinsi" },
];

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-emerald-950 pt-28 pb-0">
      {/* background layers */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero.jpg"
          alt="Mushaf Al-Qur'an terbuka di atas rehal kayu"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/92 via-emerald-950/85 to-emerald-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(195,154,47,0.22),transparent_55%)]" />
        <div className="arabesque-grid absolute inset-0 opacity-30" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 pt-10 pb-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-16">
        <div>
          <Reveal>
            <Eyebrow tone="light">Gerakan 2 Juta Mushaf</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-4xl leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
              Mari Haturkan{" "}
              <span className="relative inline-block">
                <span className="shimmer-text">Pahala Jariyah</span>
                <svg
                  viewBox="0 0 300 14"
                  className="absolute -bottom-2 left-0 w-full text-gold-400/70"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9c60-6 120-6 180-3s80 3 116-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              untuk Orang Tua Tercinta
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-cream-200/85 sm:text-lg">
              Hadiah paling indah untuk orang tua yang telah pergi bukanlah benda, melainkan amal
              yang terus mengalir. Wakafkan mushaf Al-Qur'an atas namanya — maka setiap huruf yang
              dibaca para santri akan menulis pahala untuknya, dan untukmu.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 font-arabic text-2xl leading-loose text-gold-200 sm:text-3xl" dir="rtl">
              إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/wakaf"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-7 py-4 text-sm font-bold text-emerald-950 shadow-xl shadow-gold-500/25 transition hover:brightness-110"
              >
                Bismillah, Saya Wakaf
                <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <a
                href="#cerita"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-cream-100 transition hover:bg-white/10"
              >
                Baca ceritanya
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-7">
              {quickStats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl text-gold-200 sm:text-3xl">{s.value}</dt>
                  <dd className="mt-1 text-[11px] leading-snug tracking-wide text-cream-200/60 uppercase">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* floating card stack */}
        <Reveal delay={180} className="relative">
          <div className="relative mx-auto max-w-md">
            <div className="animate-floaty overflow-hidden rounded-[2rem] border border-gold-300/25 bg-white/5 p-3 shadow-2xl shadow-emerald-950/60 backdrop-blur">
              <img
                src="/images/santri.jpg"
                alt="Para santri membaca mushaf Al-Qur'an wakaf"
                className="h-72 w-full rounded-[1.6rem] object-cover sm:h-96"
                loading="eager"
              />
              <div className="flex items-center justify-between gap-4 px-3 py-4">
                <div>
                  <p className="text-xs tracking-[0.2em] text-gold-200/70 uppercase">
                    Penyaluran terbaru
                  </p>
                  <p className="mt-1 font-display text-lg text-white">
                    120 mushaf • Rumah Tahfidz, Aceh
                  </p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-400 text-emerald-950">
                  <Icon name="check" className="h-5 w-5" />
                </span>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-4 hidden w-52 rounded-2xl border border-gold-300/25 bg-emerald-900/90 p-4 shadow-xl backdrop-blur sm:block">
              <div className="flex items-center gap-2">
                <Icon name="shield" className="h-5 w-5 text-gold-300" filled />
                <p className="text-xs font-bold tracking-wide text-gold-200 uppercase">
                  Transparan
                </p>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-cream-200/75">
                Laporan penyaluran berupa foto, lokasi, dan jumlah mushaf dikirim ke setiap
                muwakif.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* marquee */}
      <div className="relative border-y border-white/10 bg-emerald-900/60 py-4">
        <div className="flex w-max marquee-track">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="flex items-center gap-6 px-6 text-xs font-semibold tracking-[0.28em] text-gold-200/70 uppercase"
            >
              {w}
              <svg viewBox="0 0 24 24" className="h-3 w-3 text-gold-400/70" aria-hidden="true">
                <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" fill="currentColor" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
