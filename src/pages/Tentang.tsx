import PageHero from "../components/PageHero";
import { WhyUs, Mushaf } from "../components/WhyMushaf";
import { Faq } from "../components/Faq";

export default function Tentang() {
  return (
    <>
      <PageHero
        eyebrow="Tentang Kami"
        title="AmalQu — Amal Qur'an"
        subtitle="Gerakan menyebarkan mushaf Al-Qur'an ke rumah tahfidz, TPQ, madrasah, masjid, dan pelosok Nusantara — sebagai wujud amal jariyah bagi para muwakif dan keluarga mereka."
      />
      <WhyUs />
      <Mushaf />
      <Faq />
    </>
  );
}
