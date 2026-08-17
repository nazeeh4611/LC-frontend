import { apiFetch } from "@/lib/api";
import { Pagination } from "@/types";

export interface AdminContactRequest {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  notes?: string;
  createdAt: string;
}

export function fetchAdminContactRequests(params: { page?: number; status?: string; search?: string } = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.set(key, String(value));
  });
  const qs = query.toString();
  return apiFetch<{ items: AdminContactRequest[]; pagination: Pagination }>(
    `/admin/contact-requests${qs ? `?${qs}` : ""}`
  );
}

export function updateAdminContactRequest(id: string, payload: { status?: string; notes?: string }) {
  return apiFetch<AdminContactRequest>(`/admin/contact-requests/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
