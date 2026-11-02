import { Icon, Eyebrow, Ornament, Reveal } from "./common";
import { virtues } from "../data";

export default function Story() {
  return (
    <>
      {/* ---------- CERITA ---------- */}
      <section id="cerita" className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream via-cream-200/60 to-cream" />
        <div className="arabesque-grid absolute inset-0 -z-10 opacity-40" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <Reveal className="order-2 lg:order-1">
              <div className="relative">
                <div className="overflow-hidden rounded-[2rem] border border-gold-500/25 bg-white shadow-2xl shadow-emerald-950/10">
                  <img
                    src="/images/doa-ortu.jpg"
                    alt="Tangan seorang ibu mengangkat doa"
                    className="h-[26rem] w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -top-6 -right-4 rounded-2xl bg-emerald-800 px-6 py-5 text-center shadow-xl">
                  <p className="font-arabic text-2xl leading-none text-gold-200" dir="rtl">
                    وَقُل رَّبِّ ٱرْحَمْهُمَا
                  </p>
                  <p className="mt-2 text-[11px] tracking-wide text-cream-200/70">
                    “Ya Rabbku, rahmatilah keduanya”
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="order-1 lg:order-2">
              <Reveal>
                <Eyebrow>Mengapa wakaf mushaf?</Eyebrow>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="mt-6 font-display text-3xl leading-tight text-emerald-900 text-balance sm:text-4xl lg:text-[2.75rem]">
                  Pernahkah kamu terpikir, hadiah apa yang masih bisa kita kirim untuk mereka?
                </h2>
              </Reveal>
              <Reveal delay={130}>
                <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-ink/75 sm:text-base">
                  <p>
                    Pertanyaan itu selalu dimulai dengan kebingungan. Ingin memberi sesuatu, tetapi
                    raga orang tua sudah tiada. Belanja tidak lagi berguna, panggilan tidak lagi
                    terjawab.
                  </p>
                  <p>
                    Namun hubungan anak dengan orang tuanya tidak berhenti di kematian. Jembatan
                    yang tersisa adalah <strong className="text-emerald-800">doa</strong> dan{" "}
                    <strong className="text-emerald-800">amal jariyah</strong> — amal yang pahalanya
                    terus mengalir meski penfaatnya telah tiada.
                  </p>
                  <p>
                    Salah satu jalannya: mewakafkan mushaf Al-Qur'an atas nama mereka. Mushaf itu
                    akan dibaca santri, dianak yatim, dijamaah masjid — dan setiap huruf yang
                    dilantunkan menjadi hasanah yang terus mengalir ke orang yang kita cintai.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={190}>
                <blockquote className="mt-9 rounded-2xl border-l-4 border-gold-400 bg-white/80 p-6 shadow-sm">
                  <p className="font-display text-lg leading-snug text-emerald-900">
                    Wakaf mushaf adalah cara indah untuk melengkapi amalan orang tua — bukan
                    menggantikannya, tetapi menemaninya sampai akhirat.
                  </p>
                  <footer className="mt-3 text-xs font-semibold tracking-[0.2em] text-gold-500 uppercase">
                    Tim AmalQu
                  </footer>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- KEUTAMAAN ---------- */}
      <section id="keutamaan" className="relative overflow-hidden bg-emerald-950 py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_0%,rgba(195,154,47,0.18),transparent_55%)]" />
        <div className="arabesque-grid absolute inset-0 -z-10 opacity-25" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow tone="light">Keutamaan Wakaf Al-Qur'an</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="mt-6 font-display text-3xl leading-tight text-white text-balance sm:text-4xl lg:text-[2.75rem]">
                Investasi akhirat yang pahalanya tidak pernah berhenti
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-[15px] leading-relaxed text-cream-200/75">
                Berwakaf mushaf termasuk amalan terbaik yang bisa dilakukan siapa pun, kapan pun —
                termasuk untuk orang tua, keluarga, atau dirimu sendiri.
              </p>
            </Reveal>
            <Ornament className="mt-8" />
          </div>

          <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {virtues.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 70}>
                <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition duration-500 hover:-translate-y-1.5 hover:border-gold-300/40 hover:bg-white/[0.07]">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-300/25 to-gold-500/10 text-gold-200 ring-1 ring-gold-300/30 transition group-hover:from-gold-300 group-hover:to-gold-500 group-hover:text-emerald-950">
                    <Icon name={v.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-display text-xl text-white">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream-200/70">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
