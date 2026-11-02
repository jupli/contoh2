import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { Eyebrow, Icon, Reveal } from "./common";
import { donationTotals, useDonations } from "../store/donations";
import { JAZAKULLAH } from "../data";
import { rupiah, timeAgo } from "../utils/time";

export default function DonationWall() {
  const donations = useDonations();
  const totals = donationTotals(donations);
  const [now, setNow] = useState(Date.now());
  const [perm, setPerm] = useState<NotificationPermission | "unsupported">(
    typeof Notification !== "undefined" ? Notification.permission : "unsupported",
  );

  // refresh relative times every 30s
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(t);
  }, []);

  const enableNotif = async () => {
    if (typeof Notification === "undefined") return;
    const p = await Notification.requestPermission();
    setPerm(p);
  };

  return (
    <section id="doa" className="relative overflow-hidden bg-emerald-950 py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(195,154,47,0.16),transparent_60%)]" />
      <div className="arabesque-grid absolute inset-0 -z-10 opacity-25" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow tone="light">Dinding Doa #SahabatAmal</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="mt-6 font-display text-3xl leading-tight text-white text-balance sm:text-4xl">
                Setiap donasi langsung tercatat &amp; didoakan di sini
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-[15px] leading-relaxed text-cream-200/70">
                Begitu pembayaran kamu terkonfirmasi, namamu langsung muncul di dinding ini
                beserta notifikasi — sebagai pengingat bahwa kebaikan sekecil apa pun selalu
                tercatat.
              </p>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-white/5 px-4 py-2.5 text-xs font-semibold text-gold-200">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                Diperbarui langsung
              </span>
              {perm !== "granted" && perm !== "unsupported" && (
                <button
                  type="button"
                  onClick={enableNotif}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold text-cream-100 transition hover:bg-white/10"
                >
                  <Icon name="bell" className="h-4 w-4" />
                  Aktifkan notifikasi
                </button>
              )}
              {perm === "granted" && (
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2.5 text-xs font-semibold text-emerald-300">
                  <Icon name="check" className="h-3.5 w-3.5" />
                  Notifikasi aktif
                </span>
              )}
            </div>
          </Reveal>
        </div>

        {/* totals */}
        <Reveal delay={200}>
          <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Donasi tercatat", value: `${totals.count}` },
              { label: "Total donasi", value: rupiah(totals.amount) },
              { label: "Mushaf dari donatur", value: `${totals.mushaf}` },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-5 text-center"
              >
                <dt className="text-[11px] font-bold tracking-[0.2em] text-gold-200/70 uppercase">
                  {s.label}
                </dt>
                <dd className="mt-2 font-display text-2xl text-white sm:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* wall */}
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {donations.map((d, i) => (
            <li
              key={d.id}
              className={cn(
                "animate-wall-in rounded-3xl border p-6 transition hover:border-gold-300/40",
                i === 0
                  ? "border-gold-300/50 bg-gradient-to-br from-gold-400/15 to-white/[0.04] shadow-lg shadow-gold-500/10"
                  : "border-white/10 bg-white/[0.04]",
              )}
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-800 font-display text-lg text-gold-200 ring-1 ring-gold-300/30">
                    {d.name.trim().charAt(0).toUpperCase() || "?"}
                  </span>
                  <div>
                    <p className="font-display text-base leading-snug text-white">{d.name}</p>
                    <p className="mt-0.5 text-[11px] text-cream-200/55">
                      {timeAgo(d.time, now)} • via {d.method}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl text-gold-200">{rupiah(d.amount)}</p>
                  <p className="text-[11px] font-semibold text-cream-200/60">
                    {d.mushaf} mushaf
                  </p>
                </div>
              </div>

              {d.purpose && (
                <p className="mt-3 text-[13px] text-cream-200/65">“{d.purpose}”</p>
              )}

              <p className="mt-4 rounded-2xl border-l-4 border-gold-400 bg-white/[0.05] px-4 py-3 text-[13px] leading-relaxed text-cream-100">
                <strong className="text-gold-200">Jazakumullah Khairan Katsiran</strong> atas
                donasi dari : <strong className="text-gold-200">{d.name}</strong> sebesar :{" "}
                <strong className="text-gold-200">{rupiah(d.amount)}</strong>{" "}
                <em className="text-cream-200/75">{JAZAKULLAH}</em>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
