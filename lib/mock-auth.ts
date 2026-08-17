import { AuthUser } from "@/types";
import { readJSON, writeJSON } from "@/lib/demo-mode";

/**
 * TEMPORARY DEMO AUTH
 * --------------------
 * Used only as a fallback (see services/auth.service.ts) when the backend
 * API is unreachable, so the checkout flow can always be walked through
 * end-to-end for demos. Sessions live in localStorage on this device only —
 * there is no real password check, since there is nothing to check it
 * against without a backend.
 */

const USER_KEY = "lc_demo_user";

function makeDemoUser(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: overrides.id ?? "demo-buyer",
    name: overrides.name || "Demo Buyer",
    email: overrides.email || "demo.buyer@example.com",
    phone: overrides.phone,
    companyName: overrides.companyName,
    role: "customer",
    addresses: overrides.addresses ?? [],
    createdAt: overrides.createdAt ?? new Date().toISOString(),
  };
}

export function mockGetMe(): AuthUser | null {
  return readJSON<AuthUser | null>(USER_KEY, null);
}

export function mockLogin(email: string): AuthUser {
  const existing = mockGetMe();
  const user = makeDemoUser({
    ...existing,
    email: email || existing?.email,
    name: existing?.name || email.split("@")[0] || "Demo Buyer",
  });
  writeJSON(USER_KEY, user);
  return user;
}

export function mockRegister(payload: { name: string; email: string; phone?: string; companyName?: string }): AuthUser {
  const user = makeDemoUser(payload);
  writeJSON(USER_KEY, user);
  return user;
}

export function mockLogout(): void {
  writeJSON(USER_KEY, null);
}
