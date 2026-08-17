"use client";

import { FormEvent, useState } from "react";
import { ShieldCheck, Truck, CreditCard, Smartphone, Landmark, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ErrorState } from "@/components/ui/States";
import { cn } from "@/lib/utils";
import { completeOrderPayment } from "@/services/orders.service";
import { Order } from "@/types";

export type DemoPaymentMethod = "cod" | "card" | "upi" | "netbanking";

const PAYMENT_OPTIONS: { id: DemoPaymentMethod; label: string; description: string; icon: typeof Truck }[] = [
  { id: "card", label: "Credit / Debit Card", description: "Visa, Mastercard, American Express", icon: CreditCard },
  { id: "upi", label: "UPI", description: "Pay via any UPI app using a UPI ID", icon: Smartphone },
  { id: "netbanking", label: "Net Banking", description: "Pay directly from your bank account", icon: Landmark },
  { id: "cod", label: "Cash on Delivery", description: "Pay in cash when your order arrives", icon: Truck },
];

const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Emirates NBD", "Standard Chartered"];

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function PaymentMethodSelector({
  orderNumber,
  amount,
  currency,
  onPaymentComplete,
}: {
  orderNumber: string;
  amount: number;
  currency: string;
  /** Called once the (simulated) payment has completed and the order is confirmed. */
  onPaymentComplete?: (order: Order) => void;
}) {
  const [selected, setSelected] = useState<DemoPaymentMethod>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState(BANKS[0]);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);

  function validate(): string | null {
    if (selected === "card") {
      const digits = cardNumber.replace(/\s/g, "");
      if (digits.length < 13 || digits.length > 16) return "Enter a valid card number.";
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) return "Enter the expiry as MM/YY.";
      if (!/^\d{3,4}$/.test(cardCvv)) return "Enter a valid CVV.";
      if (!cardName.trim()) return "Enter the name on the card.";
    }
    if (selected === "upi" && !/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upiId)) {
      return "Enter a valid UPI ID, e.g. name@bank.";
    }
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setStatus("processing");
    setErrorMessage("");

    // Simulated gateway round-trip so the flow feels real for a live demo.
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const result = await completeOrderPayment(orderNumber, selected);

    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.message);
      return;
    }

    setStatus("idle");
    onPaymentComplete?.(result.data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex items-center justify-between rounded-md border border-border bg-bg-elevated px-5 py-4">
        <span className="text-sm text-ink-muted">Amount Payable</span>
        <span className="font-serif text-2xl font-semibold text-gold-bright tabular-nums">{formattedAmount}</span>
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-bright">Choose Payment Method</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PAYMENT_OPTIONS.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelected(option.id)}
              className={cn(
                "flex items-center gap-4 rounded-md border px-5 py-4 text-left transition-colors",
                selected === option.id
                  ? "border-gold-bright bg-gold-soft"
                  : "border-border bg-bg-elevated hover:border-border-strong"
              )}
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded border border-border-hairline bg-bg text-gold-bright">
                <Icon size={17} />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-white">{option.label}</span>
                <span className="block text-xs text-ink-muted">{option.description}</span>
              </span>
              <span
                className={cn(
                  "h-4 w-4 flex-shrink-0 rounded-full border-2",
                  selected === option.id ? "border-gold-bright bg-gold-bright" : "border-border"
                )}
              />
            </button>
          );
        })}
      </div>

      {selected === "card" && (
        <div className="mt-5 grid grid-cols-1 gap-4 rounded-md border border-border-hairline bg-bg-secondary/40 p-5 sm:grid-cols-2">
          <Input
            className="sm:col-span-2"
            label="Card Number"
            placeholder="4111 1111 1111 1111"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            inputMode="numeric"
            required
          />
          <Input
            className="sm:col-span-2"
            label="Name on Card"
            placeholder="Full name as on card"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />
          <Input
            label="Expiry (MM/YY)"
            placeholder="12/28"
            value={cardExpiry}
            onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
            inputMode="numeric"
            required
          />
          <Input
            label="CVV"
            placeholder="123"
            value={cardCvv}
            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
            inputMode="numeric"
            type="password"
            required
          />
          <p className="text-[11px] text-ink-faint sm:col-span-2">
            Demo checkout — no real card is charged. Any card number, e.g. 4111 1111 1111 1111, works here.
          </p>
        </div>
      )}

      {selected === "upi" && (
        <div className="mt-5 space-y-4 rounded-md border border-border-hairline bg-bg-secondary/40 p-5">
          <Input
            label="UPI ID"
            placeholder="yourname@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            required
          />
          <p className="text-[11px] text-ink-faint">
            Demo checkout — no real UPI request is sent. Any UPI ID, e.g. demo@upi, works here.
          </p>
        </div>
      )}

      {selected === "netbanking" && (
        <div className="mt-5 space-y-4 rounded-md border border-border-hairline bg-bg-secondary/40 p-5">
          <Select label="Select Bank" value={bank} onChange={(e) => setBank(e.target.value)}>
            {BANKS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
          <p className="text-[11px] text-ink-faint">Demo checkout — you will not be redirected to your bank.</p>
        </div>
      )}

      {selected === "cod" && (
        <div className="mt-5 rounded-md border border-border-hairline bg-bg-secondary/40 p-5">
          <p className="text-sm text-ink-muted">
            Pay in cash to our courier when your order is delivered. Please keep the exact amount of{" "}
            <span className="text-white">{formattedAmount}</span> ready.
          </p>
        </div>
      )}

      <div className="mt-6 flex items-start gap-3 rounded-md border border-border-hairline bg-bg-secondary/50 px-4 py-3">
        <Lock size={15} className="mt-0.5 flex-shrink-0 text-gold-bright" />
        <p className="text-xs text-ink-muted">
          Your payment details are encrypted and never stored on our servers. Louis CALTEN International LLP does
          not have access to your card, UPI or banking credentials.
        </p>
      </div>

      <label className="mt-5 flex items-start gap-3 text-xs text-ink-muted">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-border bg-bg-elevated accent-[#C9A24A]"
        />
        <span>
          I agree to the <a href="/legal/terms" className="text-gold-bright hover:underline">Terms &amp; Conditions</a>{" "}
          and <a href="/legal/refund-policy" className="text-gold-bright hover:underline">Refund Policy</a>.
        </span>
      </label>

      {status === "error" && (
        <ErrorState title="Couldn't complete payment" message={errorMessage} className="mt-4 py-8" />
      )}

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={!agreed || status === "processing"}>
        <ShieldCheck size={16} />
        {status === "processing"
          ? "Processing payment..."
          : selected === "cod"
            ? "Confirm Order"
            : `Pay ${formattedAmount}`}
      </Button>
    </form>
  );
}
