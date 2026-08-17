/**
 * DEMO MODE HELPERS
 * --------------------
 * The storefront is designed to work standalone (no backend running) by
 * falling back to a fully-featured, client-side "demo mode" whenever the
 * live API is unreachable — mirroring the product catalogue fallback in
 * lib/mock-data.ts. These helpers back that fallback for auth, orders and
 * payments so the entire browse → cart → checkout → payment → confirmation
 * flow can be demonstrated end-to-end without a backend.
 *
 * `isBackendUnreachable` intentionally checks for the exact network-failure
 * message set by lib/api.ts's catch block, NOT just `!result.success` — a
 * real backend responding with an actual error (e.g. wrong password, out of
 * stock) must still surface that error rather than being silently papered
 * over by demo mode.
 */

const UNREACHABLE_MESSAGE = "Unable to reach the server. Please check your connection.";

export function isBackendUnreachable(message?: string): boolean {
  return message === UNREACHABLE_MESSAGE;
}

/**
 * PRESENTATION / DEMO MODE
 * --------------------
 * When true, the storefront never depends on a live backend at all — the
 * product catalogue, categories, shipping methods, cart, checkout, demo
 * payments (COD / Card / UPI / Net Banking) and order confirmation all run
 * entirely client-side against the mock data in lib/mock-data.ts and
 * lib/mock-orders.ts. This guarantees the full browse → cart → checkout →
 * payment → confirmation flow works reliably for investor demos even if the
 * real backend is unreachable, unseeded, or returns an empty catalogue.
 *
 * Controlled by NEXT_PUBLIC_DEMO_MODE in .env — defaults to "true" so the
 * site is always demo-safe out of the box. Set NEXT_PUBLIC_DEMO_MODE=false
 * once a live backend with real data is ready, and the app will switch back
 * to calling the real API automatically (with the mock data remaining as an
 * automatic fallback if that API ever becomes unreachable).
 */
export const FORCE_DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota / private-browsing errors — demo mode degrades gracefully.
  }
}
