// Klien gerbang pembayaran Midtrans. Semua kegagalan diturunkan ke mode lokal
// agar halaman tetap bisa dipakai saat MIDTRANS_SERVER_KEY belum diisi.

export type VaNumber = { bank: string; va_number: string };

export type ChargeResult = {
  gateway: 'midtrans' | 'unconfigured';
  orderId: string;
  transactionId?: string;
  status?: string;
  grossAmount?: number;
  qrString?: string | null;
  vaNumbers?: VaNumber[];
  expiryTime?: string | null;
  paymentType?: string;
  error?: string;
};

export type StatusResult = {
  gateway: 'midtrans' | 'unconfigured';
  orderId: string;
  status: 'settlement' | 'pending' | 'failure' | 'expire' | 'not_found' | 'unknown';
  grossAmount?: number;
  paymentType?: string;
  settlementTime?: string | null;
  error?: string;
};

export async function createCharge(input: { orderId: string; amount: number; name: string; phone: string; method: 'qris' | 'bank_transfer' }): Promise<ChargeResult> {
  const res = await fetch('/api/charge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = (await res.json().catch(() => null)) as ChargeResult | null;
  if (!res.ok || !data) throw new Error(data?.error ?? `Gagal membuat transaksi (HTTP ${res.status}).`);
  return data;
}

export async function fetchStatus(orderId: string): Promise<StatusResult> {
  const res = await fetch(`/api/status?order_id=${encodeURIComponent(orderId)}`, { headers: { Accept: 'application/json' } });
  const data = (await res.json().catch(() => null)) as StatusResult | null;
  if (!data) throw new Error(`Gagal memeriksa status (HTTP ${res.status}).`);
  return data;
}
