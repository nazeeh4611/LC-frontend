import { apiFetch } from "@/lib/api";
import { Pagination } from "@/types";

export interface AdminPayment {
  _id: string;
  paymentId: string;
  order: { _id: string; orderNumber: string } | string;
  customer: { _id: string; name: string; email: string } | string;
  gateway: string;
  amount: number;
  currency: string;
  status: string;
  method?: string;
  createdAt: string;
}

export interface AdminPaymentListParams {
  page?: number;
  limit?: number;
  status?: string;
  gateway?: string;
  from?: string;
  to?: string;
}

export function fetchAdminPayments(params: AdminPaymentListParams = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.set(key, String(value));
  });
  const qs = query.toString();
  return apiFetch<{ items: AdminPayment[]; pagination: Pagination }>(`/payments/admin${qs ? `?${qs}` : ""}`);
}

export function fetchAdminPayment(id: string) {
  return apiFetch<AdminPayment>(`/payments/admin/${id}`);
}

export function refundAdminPayment(id: string, amount: number, reason: string) {
  return apiFetch<AdminPayment>(`/payments/admin/${id}/refund`, {
    method: "POST",
    body: JSON.stringify({ amount, reason }),
  });
}
