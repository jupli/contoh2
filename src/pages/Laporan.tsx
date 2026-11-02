import PageHero from "../components/PageHero";
import { Penyaluran } from "../components/Impact";
import DonationWall from "../components/DonationWall";

export default function Laporan() {
  return (
    <>
      <PageHero
        eyebrow="Transparansi"
        title="Laporan penyaluran & dinding doa"
        subtitle="Dokumentasi penyaluran mushaf ke lembaga binaan, serta ucapan Jazakumullah Khairan Katsiran untuk setiap Sahabat Amal yang telah berdonasi."
      />
      <Penyaluran />
      <DonationWall />
    </>
  );
}
