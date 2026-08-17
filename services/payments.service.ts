import { apiFetch } from "@/lib/api";

export type PaymentGatewayId = "razorpay" | "stripe" | "payu";

export function fetchSupportedGateways() {
  return apiFetch<PaymentGatewayId[]>("/payments/gateways");
}

export interface CreatePaymentResponse {
  paymentId: string;
  gateway: PaymentGatewayId;
  clientConfig: Record<string, unknown>;
}

export function createPayment(orderId: string, gateway?: PaymentGatewayId) {
  return apiFetch<CreatePaymentResponse>("/payments/create", {
    method: "POST",
    body: JSON.stringify({ orderId, gateway }),
  });
}

export function verifyPayment(paymentId: string, gatewayPaymentId: string, signature?: string) {
  return apiFetch<{ status: "success" | "failed" | "pending"; orderNumber?: string; reason?: string }>(
    "/payments/verify",
    {
      method: "POST",
      body: JSON.stringify({ paymentId, gatewayPaymentId, signature }),
    }
  );
}
