"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { ErrorState, LoadingState } from "@/components/ui/States";
import { OrderSummaryCard } from "@/components/site/OrderSummaryCard";
import { PaymentMethodSelector } from "@/components/site/PaymentMethodSelector";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { fetchShippingMethods } from "@/services/shipping.service";
import { createOrder } from "@/services/orders.service";
import { ShippingMethod, Order } from "@/types";
import { TAX_RATE } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const STEPS = ["Shipping Details", "Shipping Method", "Review Order", "Payment"];

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();

  const [step, setStep] = useState(0);
  const [methods, setMethods] = useState<ShippingMethod[]>([]);
  const [selectedMethodId, setSelectedMethodId] = useState<string>("");
  const [address, setAddress] = useState({
    fullName: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    companyName: user?.companyName ?? "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    taxId: "",
  });
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchShippingMethods().then((result) => {
      if (result.success) {
        setMethods(result.data);
        if (result.data[0]) setSelectedMethodId(result.data[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (items.length === 0 && !order) {
      router.replace("/products");
    }
  }, [items.length, order, router]);

  if (items.length === 0 && !order) return <LoadingState label="Loading checkout..." />;

  const selectedMethod = methods.find((m) => m.id === selectedMethodId);
  const shippingAmount = selectedMethod?.price ?? 0;
  const taxAmount = subtotal * TAX_RATE;
  const total = subtotal + shippingAmount + taxAmount;

  function updateAddress(field: string, value: string) {
    setAddress((prev) => ({ ...prev, [field]: value }));
  }

  const addressComplete =
    address.fullName && address.email && address.phone && address.addressLine1 &&
    address.country && address.state && address.city && address.postalCode;

  async function handlePlaceOrder() {
    setStatus("submitting");
    setErrorMessage("");

    const result = await createOrder(
      {
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        shippingAddress: address,
        billingSameAsShipping: true,
        shippingMethodId: (selectedMethodId || "standard") as "standard" | "express" | "priority",
        paymentMethod: "other",
      },
      items
    );

    setStatus("idle");

    if (!result.success) {
      setErrorMessage(result.message);
      return;
    }

    setOrder(result.data);
    clearCart();
    setStep(3);
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "Checkout" }]} />

      <section className="py-12 md:py-16">
        <Container>
          {/* Stepper */}
          <div className="mb-10 flex items-center justify-center gap-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold",
                      i < step && "border-status-success bg-status-success text-bg",
                      i === step && "border-gold-bright bg-gold-bright text-bg",
                      i > step && "border-border-hairline bg-bg-elevated text-ink-faint"
                    )}
                  >
                    {i < step ? <Check size={14} /> : i + 1}
                  </span>
                  <span className={cn("mt-2 hidden text-[11px] sm:block", i <= step ? "text-white" : "text-ink-faint")}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn("mx-2 h-px w-8 sm:w-16", i < step ? "bg-gold-bright" : "bg-border-hairline")} />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="p-6 md:p-8">
                {step === 0 && (
                  <div>
                    <h2 className="mb-6 text-lg font-semibold text-white">Shipping Details</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Input label="Full Name" value={address.fullName} onChange={(e) => updateAddress("fullName", e.target.value)} required />
                      <Input label="Email" type="email" value={address.email} onChange={(e) => updateAddress("email", e.target.value)} required />
                      <Input label="Phone" type="tel" value={address.phone} onChange={(e) => updateAddress("phone", e.target.value)} required />
                      <Input label="Company Name (optional)" value={address.companyName} onChange={(e) => updateAddress("companyName", e.target.value)} />
                      <Input className="sm:col-span-2" label="Address Line 1" value={address.addressLine1} onChange={(e) => updateAddress("addressLine1", e.target.value)} required />
                      <Input className="sm:col-span-2" label="Address Line 2 (optional)" value={address.addressLine2} onChange={(e) => updateAddress("addressLine2", e.target.value)} />
                      <Input label="Country" value={address.country} onChange={(e) => updateAddress("country", e.target.value)} required />
                      <Input label="State" value={address.state} onChange={(e) => updateAddress("state", e.target.value)} required />
                      <Input label="City" value={address.city} onChange={(e) => updateAddress("city", e.target.value)} required />
                      <Input label="Postal Code" value={address.postalCode} onChange={(e) => updateAddress("postalCode", e.target.value)} required />
                      <Input label="Tax / VAT / GST (optional)" value={address.taxId} onChange={(e) => updateAddress("taxId", e.target.value)} />
                    </div>
                    <Button size="lg" className="mt-6" disabled={!addressComplete} onClick={() => setStep(1)}>
                      Save &amp; Continue
                    </Button>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h2 className="mb-6 text-lg font-semibold text-white">Shipping Method</h2>
                    <div className="space-y-3">
                      {methods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethodId(method.id)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-md border px-5 py-4 text-left transition-colors",
                            selectedMethodId === method.id
                              ? "border-gold-bright bg-gold-soft"
                              : "border-border bg-bg-elevated hover:border-border-strong"
                          )}
                        >
                          <div>
                            <p className="text-sm font-semibold text-white">{method.label}</p>
                            <p className="text-xs text-ink-muted">{method.description} · {method.etaDays}</p>
                          </div>
                          <p className="font-serif text-base font-semibold text-gold-bright tabular-nums">
                            ${method.price.toFixed(2)}
                          </p>
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 flex gap-3">
                      <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
                      <Button onClick={() => setStep(2)}>Continue to Review</Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="mb-6 text-lg font-semibold text-white">Review Your Order</h2>
                    <div className="space-y-2 text-sm text-ink-muted">
                      <p><span className="text-white">{address.fullName}</span> · {address.email} · {address.phone}</p>
                      <p>{address.addressLine1}{address.addressLine2 ? `, ${address.addressLine2}` : ""}</p>
                      <p>{address.city}, {address.state} {address.postalCode}, {address.country}</p>
                      <p className="pt-2">Shipping: <span className="text-white">{selectedMethod?.label}</span></p>
                    </div>

                    {status === "error" && <ErrorState message={errorMessage} className="mt-4 py-8" />}

                    <div className="mt-6 flex gap-3">
                      <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                      <Button disabled={status === "submitting"} onClick={handlePlaceOrder}>
                        {status === "submitting" ? "Placing Order..." : "Place Order & Continue to Payment"}
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && order && (
                  <div>
                    <h2 className="mb-6 text-lg font-semibold text-white">Payment</h2>
                    <PaymentMethodSelector
                      orderNumber={order.orderNumber}
                      amount={order.total}
                      currency={order.currency}
                      onPaymentComplete={() => router.push(`/order-confirmation/${order.orderNumber}`)}
                    />
                  </div>
                )}
              </Card>
            </div>

            <div>
              <OrderSummaryCard
                items={items.length > 0 ? items : order?.items.map((i) => ({
                  productId: i.product,
                  slug: "",
                  name: i.name,
                  sku: i.sku,
                  image: i.image,
                  price: i.unitPrice,
                  quantity: i.quantity,
                  minimumOrderQuantity: 1,
                  stock: 0,
                })) ?? []}
                subtotal={order?.subtotal ?? subtotal}
                shippingAmount={order?.shippingAmount ?? shippingAmount}
                taxAmount={order?.taxAmount ?? taxAmount}
                total={order?.total ?? total}
                currency={order?.currency ?? "USD"}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
