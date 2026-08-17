import { apiFetch, ApiResult } from "@/lib/api";
import { CartItem, Order, OrderTrackingStep, Pagination, OrderAddress } from "@/types";
import { isBackendUnreachable, FORCE_DEMO_MODE } from "@/lib/demo-mode";
import { createMockOrder, getMockOrderByNumber, completeMockOrderPayment, buildMockTrackingTimeline } from "@/lib/mock-orders";

export interface CreateOrderPayload {
  items: { productId: string; quantity: number }[];
  shippingAddress: OrderAddress;
  billingSameAsShipping: boolean;
  shippingMethodId: "standard" | "express" | "priority";
  paymentMethod: "razorpay" | "stripe" | "payu" | "cod" | "card" | "upi" | "other";
  notes?: string;
}

export async function createOrder(
  payload: CreateOrderPayload,
  // Only used for the demo-mode fallback below (the real API derives order
  // items from `payload.items` server-side using its own product/price data).
  cartItemsForDemo?: CartItem[]
): Promise<ApiResult<Order>> {
  if (FORCE_DEMO_MODE) {
    if (!cartItemsForDemo?.length) {
      return { success: false, message: "Your cart is empty." };
    }
    const order = createMockOrder({
      cartItems: cartItemsForDemo,
      shippingAddress: payload.shippingAddress,
      shippingMethodId: payload.shippingMethodId,
      paymentMethod: payload.paymentMethod,
      notes: payload.notes,
    });
    return { success: true, data: order };
  }

  const result = await apiFetch<Order>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!result.success && cartItemsForDemo?.length) {
    const order = createMockOrder({
      cartItems: cartItemsForDemo,
      shippingAddress: payload.shippingAddress,
      shippingMethodId: payload.shippingMethodId,
      paymentMethod: payload.paymentMethod,
      notes: payload.notes,
    });
    return { success: true, data: order };
  }

  return result;
}

export function fetchMyOrders(page = 1, limit = 10) {
  return apiFetch<{ items: Order[]; pagination: Pagination }>(`/orders/mine?page=${page}&limit=${limit}`);
}

export async function fetchOrderByNumber(orderNumber: string): Promise<ApiResult<Order>> {
  if (FORCE_DEMO_MODE) {
    const order = getMockOrderByNumber(orderNumber);
    if (order) return { success: true, data: order };
    return { success: false, message: "We couldn't find that order." };
  }
  const result = await apiFetch<Order>(`/orders/number/${orderNumber}`);
  if (!result.success) {
    const order = getMockOrderByNumber(orderNumber);
    if (order) return { success: true, data: order };
  }
  return result;
}

export async function trackOrderByNumber(orderNumber: string): Promise<
  ApiResult<{
    orderNumber: string;
    orderStatus: string;
    paymentStatus: string;
    trackingNumber?: string;
    shippingPartner?: string;
    timeline: OrderTrackingStep[];
  }>
> {
  if (FORCE_DEMO_MODE) {
    const order = getMockOrderByNumber(orderNumber);
    if (order) {
      return {
        success: true,
        data: {
          orderNumber: order.orderNumber,
          orderStatus: order.orderStatus,
          paymentStatus: order.paymentStatus,
          trackingNumber: order.trackingNumber,
          shippingPartner: order.shippingPartner,
          timeline: buildMockTrackingTimeline(order),
        },
      };
    }
    return { success: false, message: "We couldn't find that order." };
  }

  const result = await apiFetch<{
    orderNumber: string;
    orderStatus: string;
    paymentStatus: string;
    trackingNumber?: string;
    shippingPartner?: string;
    timeline: OrderTrackingStep[];
  }>(`/orders/number/${orderNumber}/track`);

  if (!result.success && isBackendUnreachable(result.message)) {
    const order = getMockOrderByNumber(orderNumber);
    if (order) {
      return {
        success: true,
        data: {
          orderNumber: order.orderNumber,
          orderStatus: order.orderStatus,
          paymentStatus: order.paymentStatus,
          trackingNumber: order.trackingNumber,
          shippingPartner: order.shippingPartner,
          timeline: buildMockTrackingTimeline(order),
        },
      };
    }
  }
  return result;
}

export function fetchOrderInvoice(orderNumber: string) {
  return apiFetch<Record<string, unknown>>(`/orders/number/${orderNumber}/invoice`);
}

/**
 * Demo checkout: Cash on Delivery, Card and UPI are simulated entirely on
 * the client (there is no real gateway behind them, by design — this is a
 * "show the complete booking flow" demo path, not a live payment
 * integration). Marks the order paid/confirmed and returns the updated
 * order so the confirmation page reflects it immediately.
 */
export async function completeOrderPayment(
  orderNumber: string,
  paymentMethod: "cod" | "card" | "upi" | "netbanking"
): Promise<ApiResult<Order>> {
  const order = completeMockOrderPayment(orderNumber, paymentMethod);
  if (!order) {
    return { success: false, message: "We couldn't find that order to complete payment for." };
  }
  return { success: true, data: order };
}
