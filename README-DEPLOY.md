# Varian B — Situs multi-halaman + gerbang pembayaran Midtrans

Repo: `https://github.com/jupli/contoh2.git`

Varian ini adalah **situs multi-halaman** (8 halaman + 404, HashRouter) dengan pembayaran sungguhan melalui Midtrans, menggantikan simulasi "Saya Sudah Bayar".

## Halaman

`#/` Beranda · `#/tentang` · `#/keutamaan` · `#/mushaf` · `#/penyaluran` · `#/wakaf` · `#/papan-donasi` · `#/kontak` · `#/*` 404

## Alur pembayaran

1. `POST /api/charge` membuat transaksi Midtrans (Core API `/v2/charge`) — QRIS (`qr_string`) atau Virtual Account (`va_numbers`), expiry 15 menit.
2. Modal pembayaran menampilkan **QRIS dinamis dari Midtrans** (tab "QRIS Midtrans") atau daftar VA dengan tombol salin. QRIS resmi AmalQu dan QR invoice tetap tersedia sebagai tab alternatif.
3. Modal mem-polling `GET /api/status?order_id=…` tiap 5 detik. Status `settlement` → donasi berhasil, notifikasi muncul, nama donatur masuk papan donasi. `failure`/`expire` → notifikasi sesuai dan invoice ditutup.
4. `POST /api/webhook` menerima notifikasi server-to-server Midtrans dengan verifikasi **signature SHA-512**; signature tidak cocok dibalas `403`.

Jika `MIDTRANS_SERVER_KEY` belum diisi, API membalas `501` dan aplikasi otomatis turun ke **mode lokal** (badge "Mode lokal" di modal, QRIS resmi AmalQu, konfirmasi manual) — halaman tidak pernah rusak.

## Deploy

```bash
npm install
npm run build

vercel env add MIDTRANS_SERVER_KEY        # Server Key sandbox dulu
vercel env add MIDTRANS_IS_PRODUCTION     # false untuk uji coba
vercel env pull .env.local
vercel dev                                # http://localhost:3000
vercel --prod
```

Lalu pasang webhook di Dashboard Midtrans → **Configuration → Webhook**:

```
https://<project>.vercel.app/api/webhook
```

`vercel.json` varian ini memakai rewrite `"/((?!api/).*)"` agar rute SPA tidak menutupi `/api/*`.

## Uji cepat

```bash
curl -X POST http://localhost:3000/api/charge \
  -H 'Content-Type: application/json' \
  -d '{"orderId":"AMQ-TEST01","amount":99000,"name":"Uji Coba","phone":"081234567890","method":"qris"}'

curl 'http://localhost:3000/api/status?order_id=AMQ-TEST01'
```

Bayar QRIS sandbox dengan simulator Midtrans, lalu status di modal berubah sendiri menjadi berhasil.

## Menuju produksi

- Pakai key produksi dan set `MIDTRANS_IS_PRODUCTION=true`.
- Simpan status lunas dari `api/webhook.ts` ke database bila ingin rekonsiliasi permanen — titik integrasinya sudah ditandai di file itu.
- Gabungkan dengan Varian A (`api/donations.ts`) agar papan donasi tersimpan terpusat: panggil `POST /api/donations` dari webhook saat status `settlement`, sehingga donatur tercatat tanpa mengandalkan klik pengguna.

## Berkas pembeda dari varian dasar

- `api/charge.ts`, `api/status.ts`, `api/webhook.ts` — integrasi Midtrans
- `src/lib/gateway.ts` — klien gerbang pembayaran
- `src/store/donations.tsx` — charge async, `verifyWithGateway()`, polling, `gateway` per invoice
- `src/components/PaymentModal.tsx` — QRIS/VA Midtrans, badge status, polling otomatis
- `vercel.json` — rewrite SPA mengecualikan `/api/*`
