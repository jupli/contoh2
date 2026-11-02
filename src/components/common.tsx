import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------ */
/* Icons — thin inline SVG set (no external dependency)                */
/* ------------------------------------------------------------------ */

const paths: Record<string, ReactNode> = {
  infinity: (
    <path d="M6.5 9c-1.9 0-3.5 1.6-3.5 3.5S4.6 16 6.5 16c2.6 0 4-3.5 5.5-3.5S14.9 16 17.5 16c1.9 0 3.5-1.6 3.5-3.5S19.4 9 17.5 9c-2.6 0-4 3.5-5.5 3.5S9.1 9 6.5 9Z" />
  ),
  heart: (
    <path d="M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 3C19.5 15.6 12 20 12 20Z" />
  ),
  book: (
    <path d="M4 5.5C4 4.7 4.7 4 5.5 4H10a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H5.5A1.5 1.5 0 0 1 4 15.5v-10Zm16 0c0-.8-.7-1.5-1.5-1.5H14a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h4.5a1.5 1.5 0 0 0 1.5-1.5v-10Z" />
  ),
  school: (
    <path d="M12 4 2.8 8.6 12 13.2l9.2-4.6L12 4Zm-6 7.6v4.1c0 1.9 2.7 3.3 6 3.3s6-1.4 6-3.3v-4.1l-6 3-6-3Z" />
  ),
  hand: (
    <path d="M8 11V6.5a1.5 1.5 0 0 1 3 0V11m0-1V4.8a1.5 1.5 0 0 1 3 0V11m0-.5V6.8a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-.6a5 5 0 0 1-3.6-1.6L4 15.5a1.6 1.6 0 0 1 2.3-2.2L8 15" />
  ),
  star: (
    <path d="m12 4 2.3 5 5.2.6-3.9 3.6 1 5.3L12 15.9 7.4 18.5l1-5.3L4.5 9.6 9.7 9 12 4Z" />
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  mosque: (
    <path d="M12 3c2.6 2 4 3.6 4 5.2 0 1.4-1 2.4-2.3 2.6V14h4.6v-2.2A2.3 2.3 0 0 1 20 9.6V20H4V9.6a2.3 2.3 0 0 1 1.7 2.2V14h4.6v-3.2C9 10.6 8 9.6 8 8.2 8 6.6 9.4 5 12 3Zm-8 17h16v2H4v-2Z" />
  ),
  shield: (
    <path d="M12 3.5 5.5 6v5.5c0 4 2.7 7.4 6.5 9 3.8-1.6 6.5-5 6.5-9V6L12 3.5Zm-1 9.9 4-4 1.3 1.3L11 15.9 8.2 13l1.3-1.3 1.5 1.7Z" />
  ),
  quote: (
    <path d="M9.5 6C6.5 7.5 5 9.9 5 13.2V18h5.6v-5.4H8.2c0-2 .8-3.4 2.6-4.4L9.5 6Zm9 0c-3 1.5-4.5 3.9-4.5 7.2V18h5.6v-5.4h-2.4c0-2 .8-3.4 2.6-4.4L18.5 6Z" />
  ),
  whatsapp: (
    <path d="M12.03 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.3A8.4 8.4 0 1 0 12.03 3.5Zm4.6 11.6c-.2.5-1 1-1.5 1.1-.4 0-.9.1-2.9-.8a10.3 10.3 0 0 1-4.1-4c-.4-.7-.9-1.7-.9-2.6 0-.9.5-1.4.7-1.6.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.8 1.9c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6.2.4.7 1.2 1.4 1.8.9.8 1.6 1.1 1.9 1.2.2.1.4.1.6-.1l.7-.8c.2-.2.4-.1.6 0l1.7.9c.2.1.4.2.4.3.1.2.1.6-.1 1.1Z" />
  ),
  qr: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" />
      <path d="M13.5 13.5h3v3h-3zM20 13.5v.01M17 17h3v3h-3zM13.5 20v.01" />
    </>
  ),
  bank: (
    <path d="M12 3 3.5 8h17L12 3ZM5 10v7m4.7-7v7m4.6-7v7M19 10v7M3 20.5h18M3 17h18" />
  ),
  wallet: (
    <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3M4 7.5V17a2.5 2.5 0 0 0 2.5 2.5H19a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 19 8.5H6.5A2.5 2.5 0 0 1 4 7.5Zm12.5 6h3" />
  ),
  store: (
    <path d="M4.5 9 6 4h12l1.5 5M4.5 9h15M4.5 9v11h15V9M9.5 20v-5.5h5V20" />
  ),
  bell: (
    <path d="M18 15.5H6c1.2-1.3 1.8-2.5 1.8-5a4.2 4.2 0 0 1 8.4 0c0 2.5.6 3.7 1.8 5ZM10.5 18.5a1.6 1.6 0 0 0 3 0" />
  ),
  location: (
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Zm0-8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
  ),
  users: (
    <path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 19c0-2.9 3.1-5 7-5s7 2.1 7 5v1H2v-1Zm16.4-4.6c2.1.6 3.6 2 3.6 4.1V19h-4v-1c0-1.4-.5-2.6-1.3-3.5l1.7-.1Z" />
  ),
};

export function Icon({
  name,
  className,
  filled = false,
}: {
  name: keyof typeof paths | string;
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      {paths[name] ?? paths.check}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as "div";

  return (
    <Component
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}

/* ------------------------------------------------------------------ */
/* Count-up on view                                                    */
/* ------------------------------------------------------------------ */

export function CountUp({
  value,
  suffix = "",
  duration = 1600,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  // keep displayed value in sync if `value` changes while visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setDisplay(value);
    }
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Decorative section heading                                          */
/* ------------------------------------------------------------------ */

export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-400 sm:w-16" />
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold-400" aria-hidden="true">
        <path
          d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"
          fill="currentColor"
        />
      </svg>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-400 sm:w-16" />
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase",
        tone === "dark"
          ? "border-gold-500/40 bg-gold-50 text-gold-500"
          : "border-gold-300/40 bg-white/10 text-gold-200",
        className,
      )}
    >
      {children}
    </span>
  );
}
