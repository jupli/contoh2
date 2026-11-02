// Vercel Edge Function: buat transaksi Midtrans (QRIS atau Virtual Account).
// POST /api/charge -> { qrString } | { vaNumbers } untuk ditampilkan di modal pembayaran
export const config = { runtime: 'edge' };

const DONATIONS = [99000, 200000, 198000, 400000, 297000, 600000, 497000, 1000000, 990000, 2000000, 4950000, 10000000];

const base = () => (process.env.MIDTRANS_IS_PRODUCTION === 'true' ? 'https://api.midtrans.com' : 'https://api.sandbox.midtrans.com');
const auth = () => 'Basic ' + btoa(`${process.env.MIDTRANS_SERVER_KEY ?? ''}:`);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export default async function handler(req: Request) {
  if (req.method !== 'POST') return json({ error: 'Metode tidak diizinkan.' }, 405);
  if (!process.env.MIDTRANS_SERVER_KEY) {
    return json({ gateway: 'unconfigured', error: 'MIDTRANS_SERVER_KEY belum diisi.' }, 501);
  }

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  const orderId = String(body?.orderId ?? '');
  const amount = Number(body?.amount);
  const method = body?.method === 'bank_transfer' ? 'bank_transfer' : 'qris';
  const name = String(body?.name ?? '').trim().slice(0, 40) || 'Sahabat Amal';
  const phone = String(body?.phone ?? '').replace(/[^\d+]/g, '').slice(0, 19);

  if (!/^AMQ-[A-Z0-9]{6}$/.test(orderId)) return json({ gateway: 'midtrans', error: 'ID invoice tidak valid.' }, 400);
  if (!DONATIONS.includes(amount)) return json({ gateway: 'midtrans', error: 'Nominal tidak dikenal.' }, 400);

  const payload = {
    payment_type: method,
    transaction_details: { order_id: orderId, gross_amount: amount },
    customer_details: { first_name: name, ...(phone ? { phone } : {}) },
    ...(method === 'qris' ? { qris: { acquirer: process.env.MIDTRANS_QRIS_ACQUIRER ?? 'shopeepay' } } : { bank_transfer: { bank: process.env.MIDTRANS_VA_BANK ?? 'bca' } }),
    expiry: { unit: 'minute', duration: 15 },
  };

  try {
    const res = await fetch(`${base()}/v2/charge`, {
      method: 'POST',
      headers: { Authorization: auth(), 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as Record<string, any>;
    if (!res.ok || data.status_code !== '201') {
      return json({ gateway: 'midtrans', error: data.status_message || 'Pembuatan transaksi gagal.', detail: data }, 502);
    }
    return json({
      gateway: 'midtrans',
      orderId,
      transactionId: data.transaction_id,
      status: data.transaction_status,
      grossAmount: Number(data.gross_amount),
      qrString: data.qr_string ?? null,
      vaNumbers: data.va_numbers ?? [],
      expiryTime: data.expiry_time ?? null,
      paymentType: data.payment_type ?? method,
    });
  } catch (error) {
    return json({ gateway: 'midtrans', error: `Midtrans tidak terjangkau: ${error instanceof Error ? error.message : 'unknown'}` }, 502);
  }
}
