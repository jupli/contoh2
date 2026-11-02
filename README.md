# AmalQu — Landing Page Wakaf Mushaf Al-Qur'an

Landing page wakaf/sedekah mushaf Al-Qur'an dengan gerbang pembayaran (QRIS & transfer bank), notifikasi donasi, dan papan donasi langsung.

## Menjalankan lokal

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output: dist/index.html (semua JS & CSS di-inline)
npm run preview  # pratinjau hasil build
```

Butuh **Node 22.x** (Vite 7 memerlukan `^20.19.0 || >=22.12.0`). Versi sudah dikunci lewat `engines` di `package.json`.

## Deploy ke Vercel

**Cara 1 — Dashboard**

1. Push repo ini ke GitHub/GitLab/Bitbucket.
2. Vercel → *Add New… → Project* → impor repo.
3. Framework terdeteksi otomatis: **Vite**. `vercel.json` sudah mengatur sisanya:
   - Build Command `npm run build`, Output Directory `dist`
   - Rewrite SPA `/(.*) → /index.html`, `cleanUrls`, header keamanan + CSP
4. Deploy.

**Cara 2 — CLI**

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production
```

Tidak ada environment variable yang wajib diisi.

## Catatan penting sebelum produksi

**1. Data donasi masih per-perangkat.** Rekap donasi, invoice, dan nama di papan donasi disimpan di `localStorage` browser masing-masing pengunjung — jadi nama donatur **tidak** terlihat oleh pengunjung lain. Agar semua donatur tampil untuk semua orang, sambungkan ke backend, misalnya:

- **Vercel Postgres / KV** + Route Handlers (`app/api/donations`) untuk menyimpan & membaca daftar donatur, atau
- **Supabase / Firebase** langsung dari client.

Strukturnya sudah rapi: seluruh logika ada di `src/store/donations.tsx` (`startPayment`, `confirmPayment`, `entries`, `totals`). Ganti bagian baca/tulis `localStorage` di file itu dengan panggilan API — komponen lain tidak perlu diubah.

**2. Pembayaran masih simulasi.** Status "berhasil" dipicu tombol *Saya Sudah Bayar*, bukan webhook. Untuk pembayaran sungguhan pakai **Midtrans** atau **Xendit**: buat invoice di server, tampilkan QRIS dari API mereka, lalu perbarui status lewat webhook. Nomor rekening & QRIS resmi AmalQu yang tampil diambil dari amalqu.com dan tetap bisa dipakai untuk transfer manual.

**3. Gambar di-hotlink dari CDN AmalQu** (`brdsg.com`) dan pola latar dari `berduflare.com`. Jika origin itu berubah atau memblokir hotlink, gambar akan hilang — komponen `SourceImage` sudah punya fallback, tetapi untuk produksi sebaiknya unduh aset ke folder `public/images/` dan perbarui `src/data.ts`.

**4. `script-src 'unsafe-inline'` pada CSP** diperlukan karena `vite-plugin-singlefile` meng-inline seluruh bundle ke dalam `index.html`. Jika Anda mematikan plugin itu (agar aset terpisah & ter-hash), hapus `'unsafe-inline'` dari `script-src` untuk CSP yang lebih ketat.

## Menjalankan tes QA (opsional)

Playwright sengaja **tidak** dimasukkan ke `package.json` agar instalasi di Vercel cepat dan ringan. Untuk menjalankan skrip verifikasi di folder `tests/`:

```bash
npm i -D playwright
npx playwright install --with-deps chromium
node tests/csp-check.mjs    # menguji dist/ dengan header & CSP persis dari vercel.json
node tests/check2.mjs       # alur donasi QRIS + transfer (butuh: npm run preview -- --port 4173)
```

`tests/csp-check.mjs` membangun server lokal sendiri di port 4321; skrip lain memakai `vite preview` di port 4173.

## Struktur

```
src/
  App.tsx                    # halaman: hero, keutamaan, dokumentasi, produk, footer
  data.ts                    # teks, harga, kontak, rekening & URL gambar dari amalqu.com
  index.css                  # design token, ambient background, animasi
  store/donations.tsx        # invoice, status pembayaran, papan donasi, persistensi
  components/
    DonationForm.tsx         # alur 3 langkah: data diri → pembayaran → tercatat
    PaymentModal.tsx         # modal QRIS/transfer, hitung mundur 15 menit, salin nominal
    Celebration.tsx          # notifikasi sukses + confetti + ucapan terima kasih
    DonationWall.tsx         # ticker berjalan, total animasi, daftar donatur
    Toaster.tsx              # notifikasi toast
    Gallery.tsx              # karusel + lightbox dokumentasi & bukti transfer
    PaymentMethods.tsx       # rekening resmi + QRIS
    Dialog.tsx               # dialog aksesibel (focus trap, Escape, portal)
    SourceImage.tsx          # <img> dengan fallback + retry CDN
tests/                       # skrip QA Playwright (lihat catatan di bawah)
```
