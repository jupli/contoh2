import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "../utils/cn";
import { Icon } from "./common";

const links = [
  { to: "/", label: "Beranda", end: true },
  { to: "/tentang", label: "Tentang Kami" },
  { to: "/wakaf", label: "Wakaf" },
  { to: "/laporan", label: "Laporan & Doa" },
];

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link to="/" className="group flex items-center gap-3">
      <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 shadow-lg shadow-gold-500/25">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-900" aria-hidden="true">
          <path
            d="M12 2.5c1.9 1.9 2.9 3.6 2.9 5.2 0 1.4-.9 2.5-2.1 2.9V20h2.4v1.5H8.8V20h2.4V10.6C10 10.2 9.1 9.1 9.1 7.7c0-1.6 1-3.3 2.9-5.2Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-xl tracking-wide",
            tone === "light" ? "text-white" : "text-emerald-900",
          )}
        >
          Amal<span className="text-gold-300">Qu</span>
        </span>
        <span
          className={cn(
            "mt-1 block text-[10px] font-semibold tracking-[0.28em] uppercase",
            tone === "light" ? "text-gold-200/70" : "text-emerald-700/70",
          )}
        >
          Amal Qur'an
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-dark py-2 shadow-xl shadow-emerald-950/20" : "py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-gold-400/15 text-gold-200"
                    : "text-cream-200/85 hover:bg-white/10 hover:text-white",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/wakaf"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-5 py-2.5 text-sm font-bold text-emerald-950 shadow-lg shadow-gold-500/25 transition hover:brightness-110 sm:inline-flex"
          >
            Wakaf Sekarang
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Buka menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 text-white lg:hidden"
          >
            <span className="space-y-1.5">
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition",
                  open && "translate-y-2 rotate-45",
                )}
              />
              <span className={cn("block h-0.5 w-5 bg-current transition", open && "opacity-0")} />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition",
                  open && "-translate-y-2 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 lg:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="mx-4 mt-3 grid gap-1 rounded-2xl border border-white/10 bg-emerald-900/95 p-3 shadow-2xl">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  "rounded-xl px-4 py-3 text-sm font-medium transition",
                  isActive ? "bg-gold-400/15 text-gold-200" : "text-cream-200 hover:bg-white/10",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/wakaf"
            className="mt-1 rounded-xl bg-gold-400 px-4 py-3 text-center text-sm font-bold text-emerald-950"
          >
            Wakaf Mushaf Sekarang
          </Link>
        </nav>
      </div>
    </header>
  );
}
