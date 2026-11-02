import { Icon, Eyebrow, Reveal } from "./common";
import { reasons, specs } from "../data";

export function WhyUs() {
  return (
    <section id="mengapa" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow>Mengapa wakaf di sini</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="mt-6 font-display text-3xl leading-tight text-emerald-900 text-balance sm:text-4xl">
                Amanahmu kami jaga dari halaman pertama sampai tangan penerima
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-5 text-[15px] leading-relaxed text-ink/70">
                Program AmalQu — Amal Qur'an adalah bagian dari gerakan menyebarkan mushaf
                Al-Qur'an ke seluruh Indonesia. Setiap rupiah dicatat, setiap mushaf didokumentasi,
                setiap muwakif diberi laporan.
              </p>
            </Reveal>
            <Reveal delay={190}>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Laporan Terbuka", "Sertifikat Wakaf", "Tim Lapangan", "Layanan Cepat"].map(
                  (t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-2 rounded-full border border-emerald-800/15 bg-white px-4 py-2 text-xs font-semibold text-emerald-800 shadow-sm"
                    >
                      <Icon name="check" className="h-3.5 w-3.5 text-gold-500" />
                      {t}
                    </span>
                  ),
                )}
              </div>
            </Reveal>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.no} delay={i * 60}>
                <div className="card-sheen group h-full rounded-3xl border border-gold-500/20 p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-3xl text-gold-500/45">{r.no}</span>
                    <span className="h-px flex-1 mx-4 bg-gradient-to-r from-gold-400/40 to-transparent" />
                  </div>
                  <h3 className="mt-4 font-display text-lg leading-snug text-emerald-900">
                    {r.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Mushaf() {
  return (
    <section id="mushaf" className="relative overflow-hidden bg-emerald-900 py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_30%,rgba(195,154,47,0.2),transparent_55%)]" />

      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-4 rounded-[2.5rem] border border-gold-300/25" />
            <img
              src="/images/mushaf.jpg"
              alt="Mushaf Al-Qur'an wakaf ukuran A5"
              className="relative w-full rounded-[2rem] object-cover shadow-2xl shadow-emerald-950/60"
              loading="lazy"
            />
            <div className="absolute -right-3 bottom-6 rounded-2xl bg-gold-400 px-5 py-3 text-center shadow-xl">
              <p className="font-display text-2xl leading-none text-emerald-950">A5</p>
              <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-emerald-900 uppercase">
                Praktis
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow tone="light">Spesifikasi Mushaf</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="mt-6 font-display text-3xl leading-tight text-white text-balance sm:text-4xl">
              Mushaf yang nyaman dibaca santri, orang tua, dan anak-anak
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream-200/75">
              Kami memilih mushaf dengan kertas tebal dan rasm usmani yang jelas, agar mudah dibaca
              oleh siapa pun — dari santri tahfidz hingga orang tua yang mulai rabun dekat.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {specs.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 70}>
                <div className="flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold-400/15 text-gold-200 ring-1 ring-gold-300/30">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display text-base text-white">{s.title}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-cream-200/70">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200}>
            <a
              href="#wakaf"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-cream px-7 py-4 text-sm font-bold text-emerald-900 transition hover:bg-gold-300"
            >
              Lihat paket wakaf
              <Icon name="arrow" className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
