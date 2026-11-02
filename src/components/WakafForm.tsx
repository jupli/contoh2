import { useMemo, useState } from "react";
import { cn } from "../utils/cn";
import { Icon, Eyebrow, Ornament, Reveal } from "./common";
import PaymentModal, { SuccessModal, type PendingDonation } from "./PaymentModal";
import { useToast } from "./Toasts";
import { addDonation } from "../store/donations";
import { packages, paymentMethods, WA_NUMBER, JAZAKULLAH } from "../data";
import { rupiah } from "../utils/time";

export default function WakafForm() {
  const toast = useToast();

  const [selected, setSelected] = useState(packages[1].id);
  const [method, setMethod] = useState("qris");
  const [name, setName] = useState("");
  const [dedication, setDedication] = useState("");
  const [phone, setPhone] = useState("");
  const [customQty, setCustomQty] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [payOpen, setPayOpen] = useState(false);
  const [pending, setPending] = useState<PendingDonation | null>(null);
  const [success, setSuccess] = useState<ReturnType<typeof addDonation> | null>(null);

  const pkg = useMemo(() => packages.find((p) => p.id === selected)!, [selected]);
  const isCustom = selected === "custom";
  const mushafCount = isCustom ? customQty : pkg.mushaf;
  const total = isCustom ? customQty * 99000 : pkg.price;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Mohon isi nama wakif / nama yang diwakafkan.";
    if (!phone.trim()) next.phone = "Mohon isi nomor WhatsApp agar admin dapat menghubungi.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setPending({
      name: name.trim(),
      purpose: dedication.trim() || "Wakaf mushaf Al-Qur'an",
      amount: total,
      mushaf: mushafCount,
    });
    setPayOpen(true);
  };

  const handlePaid = (methodId: string) => {
    if (!pending) return;
    const label = paymentMethods.find((m) => m.id === methodId)?.label ?? methodId;
    const d = addDonation({
      name: pending.name,
      purpose: pending.purpose,
      amount: pending.amount,
      mushaf: pending.mushaf,
      method: label,
    });
    setPayOpen(false);
    setPending(null);
    setSuccess(d);
    toast({
      variant: "success",
      title: "Donasi diterima — terima kasih! 🙏",
      body: `Jazakumullah Khairan Katsiran atas donasi dari : ${d.name} sebesar : ${rupiah(
        d.amount,
      )} ${JAZAKULLAH}`,
    });
    // reset form for the next donation
    setName("");
    setDedication("");
    setPhone("");
    setCustomQty(1);
  };

  const field =
    "w-full rounded-2xl border border-emerald-800/15 bg-white px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-gold-400 focus:ring-4 focus:ring-gold-300/25";

  return (
    <section id="wakaf" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream via-gold-50/60 to-cream" />
      <div className="arabesque-grid absolute inset-0 -z-10 opacity-40" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>Formulir Wakaf</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="mt-6 font-display text-3xl leading-tight text-emerald-900 text-balance sm:text-4xl lg:text-[2.75rem]">
              Sedekahkan mushaf, dan saksikan kebaikan yang lahir darinya
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 text-[15px] leading-relaxed text-ink/70">
              Pilih paket, tuliskan nama dan doa, lalu pilih metode pembayaran — QRIS bisa langsung
              di-scan. Setelah pembayaran, namamu langsung muncul di Dinding Doa.
            </p>
          </Reveal>
          <Ornament className="mt-8" />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* ---------- Packages ---------- */}
          <div className="space-y-4">
            {packages.map((p, i) => {
              const active = selected === p.id;
              return (
                <Reveal key={p.id} delay={i * 60}>
                  <button
                    type="button"
                    onClick={() => setSelected(p.id)}
                    aria-pressed={active}
                    className={cn(
                      "w-full rounded-3xl border p-6 text-left transition duration-300",
                      active
                        ? "border-gold-400 bg-white shadow-2xl shadow-emerald-900/10 ring-4 ring-gold-300/25"
                        : "border-emerald-800/12 bg-white/70 hover:border-gold-400/60 hover:bg-white",
                    )}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "grid h-5 w-5 place-items-center rounded-full border transition",
                              active
                                ? "border-gold-500 bg-gold-400 text-emerald-950"
                                : "border-emerald-800/25 bg-transparent",
                            )}
                          >
                            {active && <Icon name="check" className="h-3 w-3" />}
                          </span>
                          <p className="font-display text-xl text-emerald-900">{p.label}</p>
                          {p.badge && (
                            <span className="rounded-full bg-emerald-800 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-gold-200 uppercase">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <ul className="mt-4 grid gap-2">
                          {p.perks.map((perk) => (
                            <li key={perk} className="flex gap-2.5 text-[13px] text-ink/70">
                              <Icon
                                name="check"
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500"
                              />
                              {perk}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="ml-auto font-display text-2xl text-emerald-800">
                        {rupiah(p.price)}
                      </p>
                    </div>
                  </button>
                </Reveal>
              );
            })}

            <Reveal delay={180}>
              <button
                type="button"
                onClick={() => setSelected("custom")}
                className={cn(
                  "w-full rounded-3xl border border-dashed p-5 text-left transition",
                  isCustom
                    ? "border-gold-400 bg-white ring-4 ring-gold-300/25"
                    : "border-emerald-800/20 hover:border-gold-400/60",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-lg text-emerald-900">Jumlah lain</p>
                    <p className="mt-1 text-[13px] text-ink/60">
                      Tentukan sendiri banyaknya mushaf (Rp 99.000 / mushaf)
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCustomQty((q) => Math.max(1, q - 1));
                      }}
                      className="grid h-9 w-9 place-items-center rounded-full border border-emerald-800/20 text-emerald-800"
                      aria-label="Kurangi"
                    >
                      <Icon name="minus" className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-display text-xl text-emerald-900">
                      {customQty}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCustomQty((q) => Math.min(500, q + 1));
                      }}
                      className="grid h-9 w-9 place-items-center rounded-full border border-emerald-800/20 text-emerald-800"
                      aria-label="Tambah"
                    >
                      <Icon name="plus" className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </button>
            </Reveal>
          </div>

          {/* ---------- Form ---------- */}
          <Reveal delay={120}>
            <form
              onSubmit={submit}
              className="sticky top-24 rounded-[2rem] border border-gold-500/25 bg-emerald-950 p-7 shadow-2xl shadow-emerald-950/25 sm:p-9"
            >
              <p className="font-arabic text-xl text-gold-200" dir="rtl">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <h3 className="mt-3 font-display text-2xl text-white">Lengkapi data wakaf</h3>
              <p className="mt-2 text-[13px] text-cream-200/65">
                Nama akan dicantumkan di dalam mushaf &amp; langsung tampil di Dinding Doa.
              </p>

              <div className="mt-7 space-y-4">
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold tracking-[0.18em] text-gold-200/80 uppercase">
                    Atas nama / peruntukan
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="cth. Almarhumah Aminah binti Abdullah"
                    className={field}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-gold-300">{errors.name}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold tracking-[0.18em] text-gold-200/80 uppercase">
                    Doa yang ingin dicantumkan
                  </label>
                  <textarea
                    value={dedication}
                    onChange={(e) => setDedication(e.target.value)}
                    rows={3}
                    placeholder="cth. Semoga Allah merahmati kedua orang tuaku dan menjadikan ini amal jariyah"
                    className={cn(field, "resize-none")}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold tracking-[0.18em] text-gold-200/80 uppercase">
                    Nomor WhatsApp
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputMode="tel"
                    placeholder="08xxxxxxxxxx"
                    className={field}
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-gold-300">{errors.phone}</p>}
                </div>
              </div>

              {/* payment method picker */}
              <div className="mt-6">
                <p className="mb-2 text-[11px] font-bold tracking-[0.18em] text-gold-200/80 uppercase">
                  Metode pembayaran
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {paymentMethods.map((m) => {
                    const active = method === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMethod(m.id)}
                        aria-pressed={active}
                        className={cn(
                          "flex flex-col items-center gap-1 rounded-2xl border px-2 py-2.5 transition",
                          active
                            ? "border-gold-300 bg-gold-400/15 ring-1 ring-gold-300/60"
                            : "border-white/10 bg-white/[0.04] hover:border-gold-300/40",
                        )}
                      >
                        <Icon
                          name={m.icon}
                          className={cn("h-4.5 w-4.5 h-5 w-5", active ? "text-gold-200" : "text-cream-200/50")}
                        />
                        <span
                          className={cn(
                            "text-[10px] font-bold sm:text-[11px]",
                            active ? "text-gold-200" : "text-cream-200/60",
                          )}
                        >
                          {m.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {method === "qris" && (
                  <p className="mt-2 text-[11px] leading-relaxed text-emerald-300/80">
                    QRIS akan ditampilkan dalam modal dan bisa di-scan dari bank / e-wallet mana pun.
                  </p>
                )}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <div className="flex items-center justify-between text-sm text-cream-200/70">
                  <span>{isCustom ? `${customQty} Mushaf` : pkg.label}</span>
                  <span>{rupiah(total)}</span>
                </div>
                <div className="mt-3 flex items-end justify-between border-t border-white/10 pt-3">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-gold-200/80 uppercase">
                    Total wakaf
                  </span>
                  <span className="font-display text-3xl text-gold-200">{rupiah(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="animate-pulse-ring mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-gold-300 to-gold-500 px-6 py-4 text-sm font-bold text-emerald-950 transition hover:brightness-110"
              >
                {method === "qris" ? (
                  <>
                    <Icon name="qr" className="h-5 w-5" />
                    Lanjut Bayar via QRIS
                  </>
                ) : (
                  <>
                    Lanjut Pembayaran — {paymentMethods.find((m) => m.id === method)?.label}
                    <Icon name="arrow" className="h-4 w-4" />
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                  "Assalamualaikum, saya butuh bantuan untuk wakaf mushaf via AmalQu.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-cream-200/55 transition hover:text-gold-200"
              >
                <Icon name="whatsapp" className="h-3.5 w-3.5" filled />
                Butuh bantuan? Chat admin via WhatsApp
              </a>
            </form>
          </Reveal>
        </div>
      </div>

      {/* payment gateway modal (QRIS / bank / e-wallet / marketplace) */}
      <PaymentModal
        open={payOpen}
        pending={pending}
        onClose={() => {
          setPayOpen(false);
          setPending(null);
        }}
        onPaid={handlePaid}
      />

      {/* success modal with Jazakumullah message */}
      <SuccessModal
        donation={success}
        onClose={() => setSuccess(null)}
        onViewWall={() => {
          setSuccess(null);
          document.getElementById("doa")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </section>
  );
}
