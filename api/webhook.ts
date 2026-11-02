// Vercel Edge Function: notifikasi server-to-server dari Midtrans.
// Pasang URL ini di Dashboard Midtrans -> Configuration -> Webhook:
//   https://<project>.vercel.app/api/webhook
export const config = { runtime: 'edge' };

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

async function sha512Hex(value: string) {
  const digest = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') return json({ error: 'Metode tidak diizinkan.' }, 405);
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) return json({ error: 'MIDTRANS_SERVER_KEY belum diisi.' }, 501);

  const body = (await req.json().catch(() => null)) as Record<string, any> | null;
  if (!body?.order_id) return json({ error: 'Payload tidak valid.' }, 400);

  const expected = await sha512Hex(`${body.order_id}${body.status_code}${body.gross_amount}${serverKey}`);
  if (String(body.signature_key ?? '').toLowerCase() !== expected) {
    return json({ error: 'Signature tidak cocok.' }, 403);
  }

  const settled = ['settlement', 'capture'].includes(String(body.transaction_status)) && String(body.fraud_status ?? 'accept') !== 'challenge';
  const status = settled ? 'settlement' : ['deny', 'failure'].includes(String(body.transaction_status)) ? 'failure' : ['expire', 'cancel'].includes(String(body.transaction_status)) ? 'expire' : 'pending';

  // Tempat menandai invoice lunas di database (Vercel KV/Postgres) bila diperlukan.
  // Modal pembayaran juga mem-polling /api/status, jadi donasi tetap tercatat tanpa DB.
  console.log(JSON.stringify({ event: 'midtrans.notification', order_id: body.order_id, status, payment_type: body.payment_type, gross_amount: body.gross_amount }));

  return json({ ok: true, order_id: body.order_id, status });
}
