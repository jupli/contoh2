# Varian B — Gerbang pembayaran Midtrans (QRIS & Virtual Account)

Repo: `https://github.com/jupli/contoh2.git`

Varian ini mengganti simulasi "Saya Sudah Bayar" dengan **pembayaran sungguhan**:

1. `POST /api/charge` membuat transaksi Midtrans (Core API `/v2/charge`).
2. QRIS dari Midtrans (`qr_string`) dirender sebagai kode QR di modal — bukan lagi gambar statis. Untuk transfer bank, `va_numbers` ditampilkan lengkap dengan tombol salin.
3. Modal mem-polling `GET /api/status?order_id=…` setiap 5 detik. Begitu status `settlement`, donasi ditandai berhasil, notifikasi muncul, dan nama donatur masuk papan donasi.
4. `POST /api/webhook` menerima notifikasi server-to-server Midtrans dengan **verifikasi signature SHA-512**.

Jika `MIDTRANS_SERVER_KEY` belum diisi, API membalas `501` dan aplikasi otomatis kembali ke mode lokal (QRIS resmi AmalQu + konfirmasi manual) — jadi halaman tidak pernah rusak.

## Deploy

```bash
npm install
npm run build

vercel env add MIDTRANS_SERVER_KEY          # isi dengan Server Key (sandbox dulu)
vercel env add MIDTRANS_IS_PRODUCTION       # false untuk uji coba
vercel env pull .env.local
vercel dev                                  # uji lokal: http://localhost:3000
vercel --prod
```

Lalu pasang webhook di Dashboard Midtrans → **Configuration → Webhook**:

```
https://<project>.vercel.app/api/webhook
```

## Uji cepat

```bash
# buat transaksi QRIS sandbox
curl -X POST http://localhost:3000/api/charge \
  -H 'Content-Type: application/json' \
  -d '{"orderId":"AMQ-TEST01","amount":99000,"name":"Uji Coba","phone":"081234567890","method":"qris"}'

# cek status
curl 'http://localhost:3000/api/status?order_id=AMQ-TEST01'
```

Bayar QRIS sandbox memakai aplikasi simulator Midtrans, lalu status di modal berubah sendiri menjadi berhasil.

## Menuju produksi

- Ganti ke key produksi dan set `MIDTRANS_IS_PRODUCTION=true`.
- Simpan status lunas dari `api/webhook.ts` ke database (Vercel KV/Postgres) bila ingin rekonsiliasi permanen — titik integrasinya sudah ditandai di file itu.
- Gabungkan dengan Varian A (`api/donations.ts`) agar papan donasi tersimpan terpusat untuk semua pengunjung.

## Berkas yang berbeda dari varian dasar

- `api/charge.ts`, `api/status.ts`, `api/webhook.ts` — integrasi Midtrans
- `src/lib/gateway.ts` — klien gerbang pembayaran
- `src/store/donations.tsx` — charge async, polling status, `gateway` per invoice
- `src/components/PaymentModal.tsx` — QRIS/VA dari Midtrans + indikator polling
- `vercel.json` — rewrite SPA mengecualikan `/api/*`
