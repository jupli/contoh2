# AmalQu — Varian B: situs multi-halaman + gerbang pembayaran Midtrans

Landing page wakaf/sedekah mushaf Al-Qur'an yang dikembangkan menjadi **situs multi-halaman** (8 halaman + 404), dengan satu pembeda utama varian ini: **pembayaran sungguhan melalui Midtrans** (QRIS dinamis & Virtual Account), menggantikan simulasi "Saya Sudah Bayar".

Teks, warna, dan gambar diambil dari amalqu.com.

## Yang membuat ini Varian B

| Bagian | Berkas | Peran |
| --- | --- | --- |
| Buat transaksi | `api/charge.ts` | Core API `/v2/charge` → `qr_string` (QRIS) atau `va_numbers` (VA), expiry 15 menit |
| Cek status | `api/status.ts` | `/v2/{order_id}/status` → normalisasi `settlement`/`pending`/`failure`/`expire` |
| Webhook | `api/webhook.ts` | Notifikasi server-to-server Midtrans, verifikasi **signature SHA-512** (tidak cocok → `403`) |
| Klien gerbang | `src/lib/gateway.ts` | `createCharge()`, `fetchStatus()` |
| Logika donasi | `src/store/donations.tsx` | charge async, `verifyWithGateway()`, polling, `gateway` per invoice |
| Modal bayar | `src/components/PaymentModal.tsx` | QRIS/VA Midtrans, badge status, polling otomatis 5 detik |
| Routing | `vercel.json` | Rewrite SPA `"/((?!api/).*)"` agar `/api/*` tidak tertutup |

Tanpa `MIDTRANS_SERVER_KEY`, API membalas `501` dan aplikasi otomatis turun ke **mode lokal** (badge "Mode lokal", QRIS resmi AmalQu, konfirmasi manual ke admin) — halaman tidak pernah rusak.

## Halaman

| Rute | Isi |
| --- | --- |
| `#/` | Banner program, headline, panel statistik langsung, tiga langkah berwakaf, donasi terbaru, teaser mushaf & galeri |
| `#/tentang` | Cerita wakaf untuk orang tua, profil Yayasan, 6 alasan (akordeon), legalitas |
| `#/keutamaan` | 8 keutamaan wakaf Al-Qur'an, video penyaluran, ajakan |
| `#/mushaf` | Spesifikasi mushaf + 12 pilihan nominal; memilih nominal langsung mengisi formulir wakaf |
| `#/penyaluran` | Tab dokumentasi (19 foto) dan bukti transfer (12), dengan lightbox |
| `#/wakaf` | Formulir 3 langkah, metode pembayaran, rekening resmi & QRIS |
| `#/papan-donasi` | Ticker berjalan, total animasi, daftar donatur + ucapan, bukti transfer |
| `#/kontak` | Kanal kontak, sosial media, legalitas, FAQ |
| `#/*` | 404 dengan tautan ke semua halaman |

Routing memakai **HashRouter** sehingga jalan di host statis mana pun tanpa konfigurasi server. Untuk URL bersih (`/tentang`), ganti `HashRouter` menjadi `BrowserRouter` di `src/App.tsx` — rewrite SPA-nya sudah tersedia di `vercel.json`.

## Alur pembayaran

1. Isi data diri & niat sedekah → pilih **QRIS** atau **Transfer Bank**.
2. `POST /api/charge` membuat transaksi Midtrans dengan `order_id` = ID invoice `AMQ-XXXXXX`.
3. Modal menampilkan **QRIS dinamis dari Midtrans** (tab "QRIS Midtrans") atau daftar **Virtual Account** dengan tombol salin. QRIS resmi AmalQu dan QR invoice tetap tersedia sebagai tab alternatif.
4. Modal mem-polling `GET /api/status?order_id=…` tiap 5 detik. `settlement` → donasi berhasil; `failure`/`expire` → notifikasi sesuai dan invoice ditutup.
5. Pembayaran berhasil → **notifikasi** (toast, layar perayaan dengan confetti, notifikasi sistem bila diizinkan) dan nama donatur **langsung tertera** di papan donasi dengan ucapan:

   > Jazakumullah Khairan Katsiran atas donasi dari : … sebesar : … semoga ALLAH melipat gandakan amal sholeh saudara/saudari…

## Uji cepat

```bash
curl -X POST http://localhost:3000/api/charge \
  -H 'Content-Type: application/json' \
  -d '{"orderId":"AMQ-TEST01","amount":99000,"name":"Uji Coba","phone":"081234567890","method":"qris"}'

curl 'http://localhost:3000/api/status?order_id=AMQ-TEST01'
```

Bayar QRIS sandbox dengan simulator Midtrans, lalu status di modal berubah sendiri menjadi berhasil.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/index.html (semua JS & CSS di-inline)
npm run preview
```

Butuh **Node 22.x** (dikunci lewat `engines`).

## Deploy ke Vercel

```bash
vercel env add MIDTRANS_SERVER_KEY       # Server Key sandbox lebih dulu
vercel env add MIDTRANS_IS_PRODUCTION    # false untuk uji coba
vercel env pull .env.local
vercel dev                               # http://localhost:3000
vercel --prod
```

Lalu pasang webhook di Dashboard Midtrans → **Configuration → Webhook**:

```
https://<project>.vercel.app/api/webhook
```

Menuju produksi: pakai key produksi, set `MIDTRANS_IS_PRODUCTION=true`, dan simpan status lunas dari `api/webhook.ts` ke database bila ingin rekonsiliasi permanen (titik integrasinya sudah ditandai di file itu). Rincian lengkap ada di `README-DEPLOY.md`.

## Tes QA (opsional)

Playwright sengaja tidak dimasukkan ke `package.json` agar instalasi di Vercel ringan.

```bash
npm i -D playwright
npx playwright install --with-deps chromium
npm run preview -- --port 4173 &
node tests/routes.mjs     # semua rute, menu mobile, alur donasi, deep link, back/forward, overflow
node tests/csp-check.mjs  # menguji dist/ dengan header & CSP persis dari vercel.json
```

## Struktur

```
api/charge.ts  api/status.ts  api/webhook.ts   # integrasi Midtrans
src/
  App.tsx                    # HashRouter + 9 rute + provider
  lib/gateway.ts             # klien gerbang pembayaran
  data.ts                    # teks, harga, kontak, rekening, navigasi, FAQ, URL gambar
  index.css                  # design token, ambient background, komponen & animasi
  pages/                     # Home, Tentang, Keutamaan, Mushaf, Penyaluran, Wakaf, PapanDonasi, Kontak, NotFound
  store/donations.tsx        # invoice, status, charge async, verifyWithGateway, polling
  utils/page.ts              # judul & meta description per halaman
  components/
    Layout.tsx               # header + nav aktif, menu mobile, ribbon langsung, footer, CTA melayang
    PageHero.tsx             # kepala halaman editorial + breadcrumb
    DonationForm.tsx  PaymentModal.tsx  Celebration.tsx  DonationWall.tsx
    Gallery.tsx  PaymentMethods.tsx  Toaster.tsx  Dialog.tsx  SourceImage.tsx
tests/                       # skrip QA Playwright
```

## Menyatukan dengan Varian A

Salin `api/donations.ts` dari Varian A, lalu panggil `POST /api/donations` dari `api/webhook.ts` saat status `settlement` — papan donasi tersimpan terpusat untuk semua pengunjung dan terisi otomatis dari webhook, tanpa mengandalkan klik pengguna.
