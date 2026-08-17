import { apiFetch, ApiResult } from "@/lib/api";
import { AuthUser, Address } from "@/types";
import { isBackendUnreachable, FORCE_DEMO_MODE } from "@/lib/demo-mode";
import { mockGetMe, mockLogin, mockRegister, mockLogout } from "@/lib/mock-auth";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  companyName?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function register(payload: RegisterPayload): Promise<ApiResult<{ user: AuthUser }>> {
  if (FORCE_DEMO_MODE) {
    return { success: true, data: { user: mockRegister(payload) } };
  }
  const result = await apiFetch<{ user: AuthUser }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!result.success && isBackendUnreachable(result.message)) {
    return { success: true, data: { user: mockRegister(payload) } };
  }
  return result;
}

export async function login(payload: LoginPayload): Promise<ApiResult<{ user: AuthUser }>> {
  if (FORCE_DEMO_MODE) {
    return { success: true, data: { user: mockLogin(payload.email) } };
  }
  const result = await apiFetch<{ user: AuthUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!result.success && isBackendUnreachable(result.message)) {
    return { success: true, data: { user: mockLogin(payload.email) } };
  }
  return result;
}

export async function logout(): Promise<ApiResult<null>> {
  mockLogout();
  if (FORCE_DEMO_MODE) {
    return { success: true, data: null };
  }
  const result = await apiFetch<null>("/auth/logout", { method: "POST" });
  if (!result.success && isBackendUnreachable(result.message)) {
    return { success: true, data: null };
  }
  return result;
}

export async function getMe(): Promise<ApiResult<{ user: AuthUser }>> {
  if (FORCE_DEMO_MODE) {
    const demoUser = mockGetMe();
    if (demoUser) return { success: true, data: { user: demoUser } };
    return { success: false, message: "Not signed in." };
  }
  const result = await apiFetch<{ user: AuthUser }>("/auth/me");
  if (!result.success && isBackendUnreachable(result.message)) {
    const demoUser = mockGetMe();
    if (demoUser) return { success: true, data: { user: demoUser } };
  }
  return result;
}

export function updateProfile(payload: Partial<Pick<AuthUser, "name" | "phone" | "companyName">>) {
  return apiFetch<{ user: AuthUser }>("/auth/me", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function forgotPassword(email: string) {
  return apiFetch<null>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(token: string, password: string) {
  return apiFetch<null>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, password }),
  });
}

export function fetchAddresses() {
  return apiFetch<Address[]>("/auth/me/addresses");
}

export function addAddress(payload: Omit<Address, "_id">) {
  return apiFetch<Address[]>("/auth/me/addresses", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateAddress(addressId: string, payload: Partial<Address>) {
  return apiFetch<Address[]>(`/auth/me/addresses/${addressId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteAddress(addressId: string) {
  return apiFetch<Address[]>(`/auth/me/addresses/${addressId}`, { method: "DELETE" });
}
