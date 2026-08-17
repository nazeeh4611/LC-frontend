import { CartItem, Order, OrderAddress, OrderItem, OrderTrackingStep, PaymentStatus } from "@/types";
import { readJSON, writeJSON } from "@/lib/demo-mode";
import { TAX_RATE } from "@/lib/pricing";

/**
 * TEMPORARY DEMO ORDERS
 * --------------------
 * Used only as a fallback (see services/orders.service.ts) when the backend
 * API is unreachable, so the full cart → checkout → payment → confirmation
 * flow can be demonstrated end-to-end without a running server. Orders are
 * persisted to localStorage on this device only, structured identically to
 * the real backend Order model.
 */

const ORDERS_KEY = "lc_demo_orders";

export interface MockShippingMethodOption {
  id: "standard" | "express" | "priority";
  label: string;
  description: string;
  etaDays: string;
  price: number;
}

// Mirrors backend/src/config/shipping.ts so the demo experience matches
// production pricing exactly.
export const MOCK_SHIPPING_METHODS: MockShippingMethodOption[] = [
  { id: "standard", label: "Standard Shipping", description: "Economical shipping for non-urgent orders.", etaDays: "7–10 Days", price: 50 },
  { id: "express", label: "Express Shipping", description: "Faster delivery for time-sensitive orders.", etaDays: "3–5 Days", price: 85 },
  { id: "priority", label: "Priority Shipping", description: "Our fastest option for urgent shipments.", etaDays: "1–2 Days", price: 150 },
];

function readOrders(): Order[] {
  return readJSON<Order[]>(ORDERS_KEY, []);
}

function writeOrders(orders: Order[]): void {
  writeJSON(ORDERS_KEY, orders);
}

function generateOrderNumber(): string {
  const now = new Date();
  const y = now.getFullYear();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `LC-${y}-${rand}`;
}

export interface CreateMockOrderPayload {
  cartItems: CartItem[];
  shippingAddress: OrderAddress;
  shippingMethodId: "standard" | "express" | "priority";
  paymentMethod: Order["paymentMethod"];
  notes?: string;
}

export function createMockOrder(payload: CreateMockOrderPayload): Order {
  const shippingMethod =
    MOCK_SHIPPING_METHODS.find((m) => m.id === payload.shippingMethodId) ?? MOCK_SHIPPING_METHODS[0];

  const items: OrderItem[] = payload.cartItems.map((item) => ({
    product: item.productId,
    name: item.name,
    sku: item.sku,
    image: item.image,
    unitPrice: item.price,
    quantity: item.quantity,
    subtotal: item.price * item.quantity,
  }));

  const subtotal = items.reduce((sum, i) => sum + i.subtotal, 0);
  const shippingAmount = shippingMethod.price;
  const taxAmount = Math.round(subtotal * TAX_RATE * 100) / 100;
  const discountAmount = 0;
  const total = Math.round((subtotal + shippingAmount + taxAmount - discountAmount) * 100) / 100;

  const now = new Date().toISOString();

  const order: Order = {
    _id: `demo-${Date.now()}`,
    orderNumber: generateOrderNumber(),
    customer: "demo-buyer",
    items,
    shippingAddress: payload.shippingAddress,
    billingAddress: payload.shippingAddress,
    shippingMethod: { id: shippingMethod.id, label: shippingMethod.label, etaDays: shippingMethod.etaDays },
    subtotal,
    shippingAmount,
    taxAmount,
    discountAmount,
    total,
    currency: "USD",
    paymentMethod: payload.paymentMethod,
    paymentStatus: "pending",
    orderStatus: "pending",
    notes: payload.notes,
    createdAt: now,
    updatedAt: now,
  };

  const orders = readOrders();
  orders.unshift(order);
  writeOrders(orders);
  return order;
}

export function getMockOrderByNumber(orderNumber: string): Order | null {
  return readOrders().find((o) => o.orderNumber === orderNumber) ?? null;
}

export function listMockOrders(): Order[] {
  return readOrders();
}

/**
 * Marks a demo order as paid (or, for Cash on Delivery, confirmed but
 * awaiting payment on delivery) and simulates the order moving into
 * fulfilment — enough to show investors a fully completed booking.
 */
export function completeMockOrderPayment(
  orderNumber: string,
  paymentMethod: Order["paymentMethod"]
): Order | null {
  const orders = readOrders();
  const index = orders.findIndex((o) => o.orderNumber === orderNumber);
  if (index === -1) return null;

  const isCod = paymentMethod === "cod";
  const paymentStatus: PaymentStatus = isCod ? "pending" : "success";

  orders[index] = {
    ...orders[index],
    paymentMethod,
    paymentStatus,
    orderStatus: "confirmed",
    trackingNumber: orders[index].trackingNumber ?? `TRK${Date.now().toString().slice(-9)}`,
    shippingPartner: orders[index].shippingPartner ?? "dhl",
    updatedAt: new Date().toISOString(),
  };

  writeOrders(orders);
  return orders[index];
}

export function buildMockTrackingTimeline(order: Order): OrderTrackingStep[] {
  const stages: { step: string; reached: (o: Order) => boolean }[] = [
    { step: "Order Placed", reached: () => true },
    { step: "Payment Confirmed", reached: (o) => o.paymentStatus === "success" || o.paymentMethod === "cod" },
    { step: "Processing", reached: (o) => ["confirmed", "processing", "packed", "shipped", "out_for_delivery", "delivered"].includes(o.orderStatus) },
    { step: "Shipped", reached: (o) => ["shipped", "out_for_delivery", "delivered"].includes(o.orderStatus) },
    { step: "Delivered", reached: (o) => o.orderStatus === "delivered" },
  ];

  let currentFound = false;
  return stages.map((s) => {
    const reached = s.reached(order);
    if (reached) return { step: s.step, status: "complete" as const };
    if (!currentFound) {
      currentFound = true;
      return { step: s.step, status: "current" as const };
    }
    return { step: s.step, status: "upcoming" as const };
  });
}
