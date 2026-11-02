// Vercel Edge Function: cek status pembayaran Midtrans (dipakai polling dari modal).
// GET /api/status?order_id=AMQ-XXXXXX
export const config = { runtime: 'edge' };

const base = () => (process.env.MIDTRANS_IS_PRODUCTION === 'true' ? 'https://api.midtrans.com' : 'https://api.sandbox.midtrans.com');
const auth = () => 'Basic ' + btoa(`${process.env.MIDTRANS_SERVER_KEY ?? ''}:`);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

// Normalisasi status Midtrans -> status internal aplikasi
export const normalize = (transactionStatus: string, fraudStatus = 'accept') => {
  if (transactionStatus === 'capture' && fraudStatus === 'challenge') return 'pending';
  if (['capture', 'settlement'].includes(transactionStatus)) return 'settlement';
  if (transactionStatus === 'pending') return 'pending';
  if (['deny', 'failure'].includes(transactionStatus)) return 'failure';
  if (['expire', 'cancel'].includes(transactionStatus)) return 'expire';
  return 'pending';
};

export default async function handler(req: Request) {
  const orderId = new URL(req.url).searchParams.get('order_id') ?? '';
  if (!/^AMQ-[A-Z0-9]{6}$/.test(orderId)) return json({ error: 'order_id tidak valid.' }, 400);
  if (!process.env.MIDTRANS_SERVER_KEY) return json({ gateway: 'unconfigured', error: 'MIDTRANS_SERVER_KEY belum diisi.' }, 501);

  try {
    const res = await fetch(`${base()}/v2/${orderId}/status`, { headers: { Authorization: auth(), Accept: 'application/json' } });
    const data = (await res.json()) as Record<string, any>;
    if (res.status === 404) return json({ gateway: 'midtrans', orderId, status: 'not_found' });
    if (!res.ok) return json({ gateway: 'midtrans', orderId, status: 'unknown', error: data.status_message }, 502);
    return json({
      gateway: 'midtrans',
      orderId,
      status: normalize(String(data.transaction_status), String(data.fraud_status ?? 'accept')),
      transactionStatus: data.transaction_status,
      grossAmount: Number(data.gross_amount),
      paymentType: data.payment_type,
      settlementTime: data.settlement_time ?? null,
    });
  } catch (error) {
    return json({ gateway: 'midtrans', orderId, status: 'unknown', error: error instanceof Error ? error.message : 'unknown' }, 502);
  }
}
