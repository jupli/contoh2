import PageHero from "../components/PageHero";
import WakafForm from "../components/WakafForm";

export default function WakafPage() {
  return (
    <>
      <PageHero
        eyebrow="Wakaf & Sedekah Mushaf"
        title="Wakafkan mushaf hari ini"
        subtitle="Pilih paket, tuliskan nama & doa, lalu bayar via QRIS, transfer bank, e-wallet, atau marketplace. Nama Anda langsung muncul di Dinding Doa beserta notifikasi Jazakumullah Khairan Katsiran."
      />
      <WakafForm />
    </>
  );
}
