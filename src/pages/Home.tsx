import Hero from "../components/Hero";
import Story from "../components/Story";
import { Impact, Testimonials } from "../components/Impact";
import { ClosingCta } from "../components/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <Impact />
      <Story />
      <Testimonials />
      <ClosingCta />
    </>
  );
}
