import { apiFetch } from "@/lib/api";
import { Order, Pagination } from "@/types";

export interface AdminOrderListParams {
  page?: number;
  limit?: number;
  orderStatus?: string;
  paymentStatus?: string;
  search?: string;
  from?: string;
  to?: string;
}

export function fetchAdminOrders(params: AdminOrderListParams = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.set(key, String(value));
  });
  const qs = query.toString();
  return apiFetch<{ items: Order[]; pagination: Pagination }>(`/admin/orders${qs ? `?${qs}` : ""}`);
}

export function fetchAdminOrder(id: string) {
  return apiFetch<Order>(`/admin/orders/${id}`);
}

export function updateAdminOrderStatus(
  id: string,
  payload: { orderStatus?: string; trackingNumber?: string; shippingPartner?: string }
) {
  return apiFetch<Order>(`/admin/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export interface ShippingPartnerOption {
  id: string;
  name: string;
  trackingUrlTemplate: string;
}

export interface ShippingConfig {
  methods: Array<{ id: string; label: string; etaDays: string; price: number }>;
  zones: Array<{ id: string; label: string; countries: string[] }>;
  partners: ShippingPartnerOption[];
}

export function fetchAdminShippingConfig() {
  return apiFetch<ShippingConfig>("/admin/shipping-methods");
}
