export const WA_NUMBER = "6281234567890";

/* ------------------------------------------------------------------ */
/* Donations                                                           */
/* ------------------------------------------------------------------ */

export type Donation = {
  id: string;
  name: string;
  purpose: string;
  amount: number;
  mushaf: number;
  method: string;
  time: number;
};

export const JAZAKULLAH =
  "semoga ALLAH melipat gandakan amal sholeh saudara/saudari...";

export function seedDonations(): Donation[] {
  const now = Date.now();
  return [
    {
      id: "seed-1",
      name: "Almarhumah Hj. Sitti Aminah binti Abdullah",
      purpose: "Wakaf mushaf untuk ibunda tercinta",
      amount: 1000000,
      mushaf: 10,
      method: "QRIS",
      time: now - 1000 * 60 * 7,
    },
    {
      id: "seed-2",
      name: "Hamba Allah",
      purpose: "Sedekah mushaf untuk santri tahfidz",
      amount: 198000,
      mushaf: 2,
      method: "Transfer Bank",
      time: now - 1000 * 60 * 26,
    },
    {
      id: "seed-3",
      name: "Bapak Ahmad Fauzi",
      purpose: "Atas nama almarhum ayahanda",
      amount: 500000,
      mushaf: 5,
      method: "QRIS",
      time: now - 1000 * 60 * 61,
    },
    {
      id: "seed-4",
      name: "Ibu Nurhayati",
      purpose: "Untuk masjid kampung halaman",
      amount: 99000,
      mushaf: 1,
      method: "DANA",
      time: now - 1000 * 60 * 60 * 5,
    },
    {
      id: "seed-5",
      name: "Keluarga Besar H. Dahlan",
      purpose: "Satu box mushaf untuk TPQ",
      amount: 1000000,
      mushaf: 20,
      method: "QRIS",
      time: now - 1000 * 60 * 60 * 26,
    },
    {
      id: "seed-6",
      name: "Hamba Allah",
      purpose: "Semoga menjadi amal jariyah",
      amount: 250000,
      mushaf: 3,
      method: "GoPay",
      time: now - 1000 * 60 * 60 * 50,
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Payment methods                                                     */
/* ------------------------------------------------------------------ */

export type PaymentMethod = {
  id: string;
  label: string;
  desc: string;
  icon: string;
};

export const paymentMethods: PaymentMethod[] = [
  { id: "qris", label: "QRIS", desc: "Scan dari semua bank & e-wallet", icon: "qr" },
  { id: "bank", label: "Transfer Bank", desc: "BSI · Mandiri Syariah", icon: "bank" },
  { id: "ewallet", label: "E-Wallet", desc: "DANA · OVO · GoPay", icon: "wallet" },
  { id: "marketplace", label: "Marketplace", desc: "Shopee · Tokopedia", icon: "store" },
];

export const bankAccounts = [
  { bank: "BSI", number: "7001234567", holder: "Yayasan Amal Qur'an" },
  { bank: "Mandiri Syariah", number: "1420098765", holder: "Yayasan Amal Qur'an" },
];

export const ewallets = [
  { name: "DANA", number: "081234567890", holder: "Yayasan Amal Qur'an" },
  { name: "OVO", number: "081234567891", holder: "Yayasan Amal Qur'an" },
  { name: "GoPay", number: "081234567892", holder: "Yayasan Amal Qur'an" },
];

export const MARKETPLACE_STORE = "Safwan Quran Store / AmalQu Official";

/* ------------------------------------------------------------------ */
/* Packages                                                            */
/* ------------------------------------------------------------------ */

export type Package = {
  id: string;
  label: string;
  qty: string;
  mushaf: number;
  price: number;
  badge?: string;
  highlight?: boolean;
  perks: string[];
};

export const packages: Package[] = [
  {
    id: "satu",
    label: "1 Mushaf",
    qty: "1 Mushaf Al-Qur'an",
    mushaf: 1,
    price: 99000,
    perks: [
      "1 mushaf ukuran A5, rasm usmani",
      "Nama wakif tertulis di halaman awal",
      "Sertifikat wakaf digital",
      "Laporan penyaluran via grup donatur",
    ],
  },
  {
    id: "keluarga",
    label: "2 Mushaf",
    qty: "2 Mushaf Al-Qur'an",
    mushaf: 2,
    price: 198000,
    badge: "Terfavorit",
    highlight: true,
    perks: [
      "2 mushaf untuk 2 lembaga berbeda",
      "Nama & doa keluarga di mushaf",
      "Sertifikat + foto serah terima",
      "Didoakan santri & anak yatim",
    ],
  },
  {
    id: "kampung",
    label: "1 Box",
    qty: "20 Mushaf Al-Qur'an",
    mushaf: 20,
    price: 1000000,
    badge: "Satu Kampung Ngaji",
    perks: [
      "20 mushaf untuk satu lembaga",
      "Papan nama wakaf di perpustakaan",
      "Dokumentasi video penyaluran",
      "Laporan keuangan transparan",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Page content                                                        */
/* ------------------------------------------------------------------ */

export const virtues = [
  {
    icon: "infinity",
    title: "Amal Jariyah Tanpa Henti",
    text: "Setiap huruf yang dibaca dari mushaf itu terus menulis pahala untukmu — bahkan saat kamu tidur, sakit, atau telah tiada.",
  },
  {
    icon: "heart",
    title: "Hadiah untuk Orang Tua",
    text: "Raga mereka sudah tidak ada, tetapi doa dan pahala tetap bisa kita kirimkan. Wakaf mushaf adalah hadiah yang tak lekang oleh waktu.",
  },
  {
    icon: "book",
    title: "Menumbuhkan Penghafal Qur'an",
    text: "Mushaf yang kamu wakafkan menjadi fasilitas santri membaca, menghafal, dan memahami Al-Qur'an secara lebih dalam.",
  },
  {
    icon: "school",
    title: "Memajukan Pendidikan Islam",
    text: "Penyaluran diarahkan ke rumah tahfidz, TPQ, TPA, madrasah dan musholla yang paling membutuhkan mushaf.",
  },
  {
    icon: "hand",
    title: "Didoakan Para Santri",
    text: "Muwakif mendapatkan doa dari anak yatim dan santri penghafal Al-Qur'an di lembaga binaan.",
  },
  {
    icon: "star",
    title: "Investasi Akhirat",
    text: "Wakaf adalah salah satu amalan terbaik yang nilainya terus bertambah, bukan berkurang, sepanjang masa.",
  },
];

export const reasons = [
  {
    no: "01",
    title: "Nama Tertulis di Dalam Mushaf",
    text: "Nama muwakif atau orang yang diwakafkan dituliskan rapi pada halaman awal mushaf, lengkap dengan doa yang kamu tuliskan.",
  },
  {
    no: "02",
    title: "Penyaluran Transparan",
    text: "Tim lapangan kami mendokumentasikan setiap serah terima. Muwakif menerima tautan laporan penyaluran berisi foto, lokasi, dan jumlah mushaf.",
  },
  {
    no: "03",
    title: "Jaringan Lembaga Terkurasi",
    text: "Kami bekerja sama dengan pengasuh rumah tahfidz, guru TPQ, dan pengurus masjid agar mushaf sampai ke yang benar-benar membutuhkan.",
  },
  {
    no: "04",
    title: "Mushaf Berkualitas & Mudah Dibaca",
    text: "Ukuran A5, kertas tebal nyaman, rasm usmani standar, cocok untuk santri, orang tua, maupun anak-anak.",
  },
  {
    no: "05",
    title: "Sertifikat & Dokumentasi",
    text: "Setiap muwakif menerima sertifikat wakaf atas nama yang dituju beserta dokumentasi penyaluran dalam bentuk foto.",
  },
  {
    no: "06",
    title: "Layanan Donatur Responsif",
    text: "Admin siap membantu memilih paket, menuliskan nama & doa, hingga mengirim laporan penyaluran dengan cepat.",
  },
];

export const specs = [
  { title: "Ukuran A5", desc: "Ringan, mudah dibawa ke masjid, majelis, dan kelas tahfidz." },
  { title: "Rasm Usmani", desc: "Tulisan Arab standar yang jelas dan nyaman dipandang." },
  { title: "Kertas Premium", desc: "Tebal, tidak tembus pandang, tahan dipakai setiap hari." },
  { title: "Nama & Doa Wakif", desc: "Dicantumkan pada halaman persembahan mushaf." },
];

export const impacts = [
  { key: "mushaf", value: 24380, suffix: "+", label: "Mushaf tersalurkan" },
  { key: "lembaga", value: 412, suffix: "", label: "Lembaga dibina" },
  { key: "provinsi", value: 34, suffix: "", label: "Provinsi terjangkau" },
  { key: "donatur", value: 96, suffix: "%", label: "Donatur puas & repeat" },
];

export const gallery = [
  {
    src: "/images/santri.jpg",
    title: "Rumah Tahfidz Al-Ikhlas",
    place: "Pidie Jaya, Aceh",
    note: "120 mushaf untuk santri tahfidz",
  },
  {
    src: "/images/galeri-1.jpg",
    title: "Masjid Jami' Al-Hidayah",
    place: "Sukabumi, Jawa Barat",
    note: "Rak mushaf baru untuk jamaah",
  },
  {
    src: "/images/galeri-2.jpg",
    title: "TPQ Nurul Iman",
    place: "Lombok Timur, NTB",
    note: "60 mushaf untuk kelas anak",
  },
  {
    src: "/images/distribusi.jpg",
    title: "Gerakan Sebar Cahaya",
    place: "Bima, NTT",
    note: "200 mushaf untuk pelosok",
  },
  {
    src: "/images/galeri-3.jpg",
    title: "Paket Mushaf Siap Antar",
    place: "Gudang AmalQu",
    note: "Dikemas & ditulis nama wakif",
  },
  {
    src: "/images/doa-ortu.jpg",
    title: "Doa Untuk Almarhumah",
    place: "Program khusus wakif",
    note: "Atas nama orang tua tersayang",
  },
];

export const testimonials = [
  {
    name: "Hj. Ratna Dewi",
    role: "Wakaf 10 mushaf — untuk almarhumah ibunda",
    quote:
      "Saya ingin sekali memberi sesuatu untuk ibu yang sudah wafat. Ternyata caranya masih banyak. Ketika laporan foto mushaf sampai, saya menangis. Nama ibu kini terus dibaca orang lain setiap hari.",
  },
  {
    name: "Ust. Fajar Ramadhan",
    role: "Pengasuh Rumah Tahfidz",
    quote:
      "Santri kami sebelumnya bergantian memakai mushaf. Setelah wakaf dari Sahabat AmalQu tiba, setiap santri punya mushaf sendiri. Hafalan mereka jauh lebih lancar.",
  },
  {
    name: "Bagas Prasetyo",
    role: "Donatur rutin bulanan",
    quote:
      "Prosesnya cepat dan jelas. Saya dapat sertifikat, tahu mushafnya dikirim ke mana, dan bisa minta doa khusus. Jadi semangat untuk wakaf lagi bulan depan.",
  },
];

export const faqs = [
  {
    q: "Boleh wakaf atas nama orang tua yang sudah wafat?",
    a: "Boleh, dan sangat dianjurkan. Wakaf adalah amal jariyah yang pahalanya terus mengalir kepada orang yang dituju. Tuliskan nama lengkap beserta keterangan Almarhum/Almarhumah, contoh: Almarhumah Fulanah binti Fulan.",
  },
  {
    q: "Bagaimana nama dan doa saya dicantumkan?",
    a: "Isi kolom nama dan doa pada formulir wakaf. Tim kami akan mencetak halaman persembahan tersebut dan menempelkannya di dalam mushaf sebelum disalurkan — dan nama donatur juga langsung tampil di Dinding Doa situs ini.",
  },
  {
    q: "Kapan nama saya muncul di website?",
    a: "Segera setelah kamu menekan tombol konfirmasi pembayaran pada jendela pembayaran. Donasi kamu akan muncul paling atas di Dinding Doa lengkap dengan ucapan Jazakumullah Khairan Katsiran dan notifikasi akan muncul otomatis.",
  },
  {
    q: "Ke mana mushaf disalurkan?",
    a: "Prioritas kami adalah rumah tahfidz, TPQ, TPA, madrasah diniyah, masjid dan musholla di daerah yang kekurangan mushaf. Kamu juga bisa mengusulkan lembaga tertentu.",
  },
  {
    q: "Apakah saya menerima bukti penyaluran?",
    a: "Ya. Setiap muwakif menerima sertifikat wakaf, foto serah terima, serta tautan laporan penyaluran yang memuat lokasi, jumlah mushaf, dan nama lembaga penerima.",
  },
  {
    q: "Metode pembayarannya apa saja?",
    a: "QRIS (bisa di-scan dari aplikasi bank atau e-wallet mana pun), transfer bank, e-wallet (DANA/OVO/GoPay), maupun marketplace resmi. Semua metode menampilkan jendela pembayaran dan notifikasi saat donasi tercatat.",
  },
  {
    q: "Berapa minimal wakaf?",
    a: "Tidak ada batas minimal. Kamu bisa memulai dari satu mushaf, atau bergabung pada program patungan mushaf bersama Sahabat Amal lainnya.",
  },
];

export const marqueeWords = [
  "Amal Jariyah",
  "Pahala Mengalir",
  "Untuk Almarhum",
  "Santri Penghafal",
  "Rumah Tahfidz",
  "TPQ & TPA",
  "Pelosok Nusantara",
  "Transparan",
];
