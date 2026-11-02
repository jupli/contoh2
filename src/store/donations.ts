import { useSyncExternalStore } from "react";
import { JAZAKULLAH, seedDonations, type Donation } from "../data";
import { rupiah } from "../utils/time";

const KEY = "amalqu_donations_v1";

let donations: Donation[] = load();
const listeners = new Set<() => void>();

function load(): Donation[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Donation[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    /* ignore corrupted storage */
  }
  const seeds = seedDonations();
  try {
    localStorage.setItem(KEY, JSON.stringify(seeds));
  } catch {
    /* storage unavailable */
  }
  return seeds;
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(donations));
  } catch {
    /* storage unavailable */
  }
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getDonations(): Donation[] {
  return donations;
}

export function useDonations(): Donation[] {
  return useSyncExternalStore(subscribe, getDonations, getDonations);
}

export function addDonation(input: Omit<Donation, "id" | "time">): Donation {
  const d: Donation = {
    ...input,
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `d-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    time: Date.now(),
  };
  donations = [d, ...donations].slice(0, 120);
  persist();
  listeners.forEach((l) => l());

  // OS-level notification (if the visitor allowed it)
  if (typeof Notification !== "undefined" && Notification.permission === "granted") {
    try {
      new Notification("Donasi baru diterima — terima kasih! 🙏", {
        body: `Jazakumullah Khairan Katsiran atas donasi dari : ${d.name} sebesar : ${rupiah(
          d.amount,
        )} ${JAZAKULLAH}`,
        icon: "/images/mushaf.jpg",
      });
    } catch {
      /* ignore */
    }
  }
  return d;
}

export function donationTotals(list: Donation[] = donations) {
  return {
    count: list.length,
    amount: list.reduce((a, d) => a + d.amount, 0),
    mushaf: list.reduce((a, d) => a + d.mushaf, 0),
  };
}
