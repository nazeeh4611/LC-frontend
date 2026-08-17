import { apiFetch } from "@/lib/api";
import { ShippingMethod } from "@/types";
import { FORCE_DEMO_MODE } from "@/lib/demo-mode";
import { MOCK_SHIPPING_METHODS } from "@/lib/mock-orders";

export async function fetchShippingMethods() {
  if (FORCE_DEMO_MODE) {
    return { success: true as const, data: MOCK_SHIPPING_METHODS };
  }
  const result = await apiFetch<ShippingMethod[]>("/shipping-methods");
  if (!result.success) {
    return { success: true as const, data: MOCK_SHIPPING_METHODS };
  }
  return result;
}
