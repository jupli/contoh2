import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";
import { Icon } from "./common";

export type Toast = {
  id: number;
  title: string;
  body: string;
  variant: "success" | "info";
};

type ToastApi = (t: Omit<Toast, "id">) => void;

const ToastContext = createContext<ToastApi>(() => {});

export function useToast(): ToastApi {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const push = useCallback<ToastApi>((t) => {
    const id = nextId.current++;
    setToasts((ts) => [...ts.slice(-3), { ...t, id }]);
    window.setTimeout(() => {
      setToasts((ts) => ts.filter((x) => x.id !== id));
    }, 8000);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      {/* viewport */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed top-20 right-4 z-[95] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:right-6"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={cn(
              "animate-toast-in pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur",
              t.variant === "success"
                ? "border-gold-400/50 bg-emerald-900/95 shadow-emerald-950/40"
                : "border-white/15 bg-emerald-950/95 shadow-emerald-950/40",
            )}
          >
            <span
              className={cn(
                "grid h-10 w-10 shrink-0 place-items-center rounded-full",
                t.variant === "success"
                  ? "bg-gold-400 text-emerald-950"
                  : "bg-white/10 text-gold-200",
              )}
            >
              <Icon name={t.variant === "success" ? "check" : "star"} className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white">{t.title}</p>
              <p className="mt-1 text-xs leading-relaxed break-words text-cream-200/80">
                {t.body}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToasts((ts) => ts.filter((x) => x.id !== t.id))}
              aria-label="Tutup notifikasi"
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-cream-200/60 transition hover:bg-white/10 hover:text-white"
            >
              <Icon name="plus" className="h-3.5 w-3.5 rotate-45" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
