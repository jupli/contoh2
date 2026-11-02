import { Icon, CountUp, Eyebrow, Ornament, Reveal } from "./common";
import { impacts, gallery, testimonials } from "../data";
import { useDonations, donationTotals } from "../store/donations";

export function Impact() {
  const donations = useDonations();
  const totals = donationTotals(donations);
  const live = impacts.map((s) =>
    s.key === "mushaf" ? { ...s, value: s.value + totals.mushaf } : s,
  );

  return (
    <section className="relative overflow-hidden bg-emerald-800 py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(195,154,47,0.22),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {live.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="text-center">
                <p className="font-display text-4xl text-gold-200 sm:text-5xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="mx-auto mt-3 max-w-[12rem] text-[11px] leading-snug tracking-[0.18em] text-cream-200/70 uppercase">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Penyaluran() {
  return (
    <section id="penyaluran" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Laporan Penyaluran</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="mt-6 font-display text-3xl leading-tight text-emerald-900 text-balance sm:text-4xl">
                Mushaf-mushaf ini telah menemukan pembacanya
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-[15px] leading-relaxed text-ink/70">
                Kami menyalurkan ke rumah tahfidz, TPQ, TPA, madrasah, masjid, dan musholla di
                pelosok. Setiap pengiriman didokumentasikan dan dilaporkan kepada muwakif.
              </p>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-800/15 bg-white px-5 py-4 shadow-sm">
              <Icon name="users" className="h-6 w-6 text-gold-500" />
              <p className="text-[13px] leading-snug text-ink/70">
                <strong className="text-emerald-900">Ribuan #SahabatAmal</strong>
                <br />
                sudah ikut serta mewakafkan mushaf
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g, i) => (
            <Reveal key={g.title} delay={i * 70}>
              <figure className="group relative overflow-hidden rounded-3xl border border-gold-500/20 bg-emerald-950 shadow-lg">
                <img
                  src={g.src}
                  alt={g.title}
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/25 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <p className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-gold-200/85 uppercase">
                    <Icon name="location" className="h-3.5 w-3.5" filled />
                    {g.place}
                  </p>
                  <p className="mt-2 font-display text-lg leading-snug text-white">{g.title}</p>
                  <p className="mt-1 text-[13px] text-cream-200/70">{g.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-cream-200/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>Cerita Sahabat Amal</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="mt-6 font-display text-3xl leading-tight text-emerald-900 text-balance sm:text-4xl">
              Mereka sudah memulai, dan pahalanya sedang mengalir
            </h2>
          </Reveal>
          <Ornament className="mt-8" />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-3xl border border-gold-500/20 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl">
                <Icon name="quote" className="h-8 w-8 text-gold-400/60" filled />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/75">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-emerald-800/10 pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-800 font-display text-lg text-gold-200">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-display text-base text-emerald-900">{t.name}</span>
                    <span className="block text-xs text-ink/55">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
