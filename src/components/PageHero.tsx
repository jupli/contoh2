import { Eyebrow, Ornament } from "./common";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-emerald-950 pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(195,154,47,0.25),transparent_60%)]" />
      <div className="arabesque-grid absolute inset-0 -z-10 opacity-30" />
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Eyebrow tone="light">{eyebrow}</Eyebrow>
        <h1 className="mt-5 font-display text-4xl leading-tight text-white text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-cream-200/75">{subtitle}</p>
        <Ornament className="mt-7" />
      </div>
    </section>
  );
}
