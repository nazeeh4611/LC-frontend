import { apiFetch } from "@/lib/api";
import { Pagination } from "@/types";

export interface AdminQuoteRequest {
  _id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  productCategory: string;
  quantity: string;
  targetPrice?: string;
  shippingDestination: string;
  message?: string;
  attachment?: { originalName: string; url?: string };
  status: string;
  notes?: string;
  createdAt: string;
}

export function fetchAdminQuoteRequests(params: { page?: number; status?: string; search?: string } = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.set(key, String(value));
  });
  const qs = query.toString();
  return apiFetch<{ items: AdminQuoteRequest[]; pagination: Pagination }>(`/admin/quote-requests${qs ? `?${qs}` : ""}`);
}

export function updateAdminQuoteRequest(id: string, payload: { status?: string; notes?: string }) {
  return apiFetch<AdminQuoteRequest>(`/admin/quote-requests/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
