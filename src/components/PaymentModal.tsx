import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { cn } from "../utils/cn";
import { Icon } from "./common";
import { buildQrisPayload } from "../utils/qris";
import { rupiah } from "../utils/time";
import {
  bankAccounts,
  ewallets,
  JAZAKULLAH,
  MARKETPLACE_STORE,
  paymentMethods,
  type Donation,
} from "../data";

export type PendingDonation = {
  name: string;
  purpose: string;
  amount: number;
  mushaf: number;
};

const methodLabel = (id: string) =>
  paymentMethods.find((m) => m.id === id)?.label ?? id.toUpperCase();

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      return true;
    } catch {
      return false;
    }
  }
}

/* ------------------------------------------------------------------ */
/* Payment modal                                                       */
/* ------------------------------------------------------------------ */

export default function PaymentModal({
  open,
  pending,
  onClose,
  onPaid,
}: {
  open: boolean;
  pending: PendingDonation | null;
  onClose: () => void;
  onPaid: (method: string) => void;
}) {
  const [method, setMethod] = useState("qris");
  const [qr, setQr] = useState("");
  const [payload, setPayload] = useState("");
  const [copied, setCopied] = useState("");
  const [secs, setSecs] = useState(15 * 60);
  const [busy, setBusy] = useState(false);

  const amount = pending?.amount ?? 0;

  // generate a real, scannable QRIS QR whenever amount/method changes
  useEffect(() => {
    if (!open || method !== "qris" || !pending) return;
    let alive = true;
    const p = buildQrisPayload(amount);
    setPayload(p);
    QRCode.toDataURL(p, {
      width: 264,
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#04211a", light: "#ffffff" },
    }).then((url) => {
      if (alive) setQr(url);
    });
    setSecs(15 * 60);
    return () => {
      alive = false;
    };
  }, [open, method, amount, pending]);

  // countdown for the QR validity window
  useEffect(() => {
    if (!open || method !== "qris") return;
    const t = window.setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => window.clearInterval(t);
  }, [open, method]);

  // lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const doCopy = async (text: string, key: string) => {
    const ok = await copyText(text);
    if (ok) {
      setCopied(key);
      window.setTimeout(() => setCopied(""), 2000);
    }
  };

  const confirmLabel = useMemo(() => {
    switch (method) {
      case "qris":
        return "Saya Sudah Scan & Bayar";
      case "bank":
        return "Saya Sudah Transfer";
      case "ewallet":
        return "Saya Sudah Bayar via E-Wallet";
      default:
        return "Saya Sudah Order";
    }
  }, [method]);

  if (!open || !pending) return null;

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[80] flex items-end justify-center bg-emerald-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Jendela pembayaran donasi"
    >
      <div
        className="animate-scale-in max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-cream shadow-2xl sm:rounded-[2rem]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="relative bg-emerald-950 px-6 pt-7 pb-6 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full border border-white/20 text-cream-200 transition hover:bg-white/10"
          >
            <Icon name="plus" className="h-4 w-4 rotate-45" />
          </button>
          <p className="text-[11px] font-bold tracking-[0.24em] text-gold-200/80 uppercase">
            Pembayaran Donasi
          </p>
          <p className="mt-2 font-display text-3xl text-gold-200">{rupiah(amount)}</p>
          <p className="mt-1 text-xs text-cream-200/65">
            {pending.mushaf} mushaf • atas nama <span className="text-cream-100">{pending.name}</span>
          </p>
        </div>

        {/* method selector */}
        <div className="grid grid-cols-2 gap-2.5 px-6 pt-6 sm:grid-cols-4 sm:px-8">
          {paymentMethods.map((m) => {
            const active = method === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id)}
                aria-pressed={active}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-center transition",
                  active
                    ? "border-gold-400 bg-white shadow-md ring-2 ring-gold-300/40"
                    : "border-emerald-800/12 bg-white/60 hover:border-gold-400/50",
                )}
              >
                <Icon
                  name={m.icon}
                  className={cn("h-5 w-5", active ? "text-gold-500" : "text-emerald-800/60")}
                />
                <span
                  className={cn(
                    "text-[11px] font-bold",
                    active ? "text-emerald-900" : "text-ink/60",
                  )}
                >
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* method body */}
        <div className="px-6 pt-5 pb-6 sm:px-8 sm:pb-8">
          {method === "qris" && (
            <div className="text-center">
              <div className="mx-auto inline-block rounded-3xl border-4 border-white bg-white p-4 shadow-lg">
                {qr ? (
                  <img
                    src={qr}
                    alt={`QRIS ${rupiah(amount)}`}
                    className="h-56 w-56 sm:h-64 sm:w-64"
                  />
                ) : (
                  <div className="grid h-56 w-56 place-items-center text-xs text-ink/40 sm:h-64 sm:w-64">
                    Membuat QRIS...
                  </div>
                )}
              </div>
              <p className="mt-4 text-sm font-semibold text-emerald-900">
                Scan dengan aplikasi bank / e-wallet mana pun
              </p>
              <p className="mt-1 text-xs text-ink/55">
                Nominal <strong className="text-emerald-800">{rupiah(amount)}</strong> sudah
                tertanam di dalam kode. Kode berlaku{" "}
                <span className={cn("font-bold", secs < 60 && "text-red-500")}>
                  {mm}:{ss}
                </span>
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => doCopy(payload, "payload")}
                  className="rounded-full border border-emerald-800/20 bg-white px-4 py-2 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-50"
                >
                  {copied === "payload" ? "✓ Payload tersalin" : "Salin payload QRIS"}
                </button>
                {qr && (
                  <a
                    href={qr}
                    download={`qris-amalqu-${amount}.png`}
                    className="rounded-full border border-emerald-800/20 bg-white px-4 py-2 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-50"
                  >
                    Unduh gambar QRIS
                  </a>
                )}
                {secs === 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const p = buildQrisPayload(amount) + " ";
                      setPayload(p.trim());
                      setSecs(15 * 60);
                      QRCode.toDataURL(p.trim(), { width: 264, margin: 1 }).then(setQr);
                    }}
                    className="rounded-full bg-gold-400 px-4 py-2 text-xs font-bold text-emerald-950"
                  >
                    Buat ulang kode
                  </button>
                )}
              </div>
            </div>
          )}

          {method === "bank" && (
            <div className="space-y-3">
              <p className="text-center text-sm text-ink/65">
                Transfer tepat <strong className="text-emerald-900">{rupiah(amount)}</strong> ke
                salah satu rekening berikut:
              </p>
              {bankAccounts.map((a) => (
                <div
                  key={a.number}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-800/12 bg-white p-4"
                >
                  <div>
                    <p className="text-sm font-bold text-emerald-900">{a.bank}</p>
                    <p className="font-mono text-base tracking-wider text-ink">{a.number}</p>
                    <p className="text-[11px] text-ink/50">a.n. {a.holder}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => doCopy(a.number, `bank-${a.number}`)}
                    className="rounded-full bg-emerald-800 px-4 py-2 text-xs font-bold text-gold-200 transition hover:bg-emerald-700"
                  >
                    {copied === `bank-${a.number}` ? "✓ Tersalin" : "Salin"}
                  </button>
                </div>
              ))}
              <p className="text-center text-[11px] leading-relaxed text-ink/50">
                Cantumkan nama <strong>{pending.name}</strong> pada berita transfer agar admin
                mudah memverifikasi.
              </p>
            </div>
          )}

          {method === "ewallet" && (
            <div className="space-y-3">
              <p className="text-center text-sm text-ink/65">
                Kirim <strong className="text-emerald-900">{rupiah(amount)}</strong> ke:
              </p>
              {ewallets.map((w) => (
                <div
                  key={w.number}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-800/12 bg-white p-4"
                >
                  <div>
                    <p className="text-sm font-bold text-emerald-900">{w.name}</p>
                    <p className="font-mono text-base tracking-wider text-ink">{w.number}</p>
                    <p className="text-[11px] text-ink/50">a.n. {w.holder}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => doCopy(w.number, `ew-${w.number}`)}
                    className="rounded-full bg-emerald-800 px-4 py-2 text-xs font-bold text-gold-200 transition hover:bg-emerald-700"
                  >
                    {copied === `ew-${w.number}` ? "✓ Tersalin" : "Salin"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {method === "marketplace" && (
            <div className="rounded-2xl border border-gold-400/40 bg-white p-5 text-center">
              <Icon name="store" className="mx-auto h-9 w-9 text-gold-500" />
              <p className="mt-3 text-sm font-bold text-emerald-900">
                Toko resmi: {MARKETPLACE_STORE}
              </p>
              <ol className="mx-auto mt-3 max-w-xs space-y-1.5 text-left text-xs leading-relaxed text-ink/65">
                <li>1. Buka Shopee / Tokopedia, cari toko di atas.</li>
                <li>2. Pilih produk program AmalQu sesuai paketmu.</li>
                <li>3. Pada catatan tulis: “{pending.name}”.</li>
                <li>4. Selesaikan pembayaran, lalu klik tombol di bawah.</li>
              </ol>
            </div>
          )}

          {/* confirm */}
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              setBusy(true);
              window.setTimeout(() => onPaid(methodLabel(method)), 450);
            }}
            className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-gold-300 to-gold-500 px-6 py-4 text-sm font-bold text-emerald-950 shadow-lg shadow-gold-500/20 transition hover:brightness-110 disabled:opacity-60"
          >
            <Icon name="check" className="h-4 w-4" />
            {busy ? "Memproses..." : confirmLabel}
          </button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-ink/50">
            Setelah pembayaran, klik tombol di atas. Donasi akan langsung tercatat di Dinding Doa
            beserta notifikasi, lalu admin memverifikasi & menyalurkan mushaf.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Success modal — Jazakumullah message                                */
/* ------------------------------------------------------------------ */

export function SuccessModal({
  donation,
  onClose,
  onViewWall,
}: {
  donation: Donation | null;
  onClose: () => void;
  onViewWall: () => void;
}) {
  useEffect(() => {
    if (!donation) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [donation, onClose]);

  if (!donation) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[90] flex items-center justify-center bg-emerald-950/75 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Konfirmasi donasi"
    >
      <div
        className="animate-scale-in w-full max-w-md rounded-[2rem] border border-gold-400/40 bg-emerald-950 p-8 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="animate-pop-in mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 shadow-xl shadow-gold-500/30">
          <Icon name="check" className="h-10 w-10 text-emerald-950" />
        </span>

        <h3 className="mt-6 font-display text-3xl text-gold-200">
          Jazakumullah Khairan Katsiran!
        </h3>

        <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-sm leading-relaxed text-cream-100">
          atas donasi dari : <strong className="text-gold-200">{donation.name}</strong>
          <br />
          sebesar : <strong className="text-gold-200">{rupiah(donation.amount)}</strong>{" "}
          <span className="text-cream-200/60">
            ({donation.mushaf} mushaf • via {donation.method})
          </span>
          <br />
          <em className="text-cream-200/80">{JAZAKULLAH}</em>
        </p>

        <p className="mt-4 text-xs text-cream-200/60">
          Namamu kini tertera di Dinding Doa dan notifikasi telah terkirim. Mushaf akan
          disalurkan ke lembaga binaan, dan kamu akan menerima laporan penyaluran.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onViewWall}
            className="flex-1 rounded-2xl bg-gradient-to-r from-gold-300 to-gold-500 px-5 py-3.5 text-sm font-bold text-emerald-950 transition hover:brightness-110"
          >
            Lihat di Dinding Doa
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-white/20 px-5 py-3.5 text-sm font-semibold text-cream-100 transition hover:bg-white/10"
          >
            Wakaf Lagi
          </button>
        </div>
      </div>
    </div>
  );
}
