import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { CartItem } from "@/types";

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(price);
}

export function OrderSummaryCard({
  items,
  subtotal,
  shippingAmount,
  taxAmount,
  total,
  currency = "USD",
}: {
  items: CartItem[];
  subtotal: number;
  shippingAmount: number;
  taxAmount: number;
  total: number;
  currency?: string;
}) {
  return (
    <Card className="p-6">
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-gold-bright">Order Summary</h3>

      <div className="max-h-72 space-y-4 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-3">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded border border-border bg-bg-elevated">
              {item.image ? (
                <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-white">{item.name}</p>
              <p className="text-xs text-ink-faint">
                Qty {item.quantity} × {formatPrice(item.price, currency)}
              </p>
            </div>
            <p className="text-sm font-medium text-white tabular-nums">
              {formatPrice(item.price * item.quantity, currency)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2.5 border-t border-border-hairline pt-5 text-sm">
        <div className="flex justify-between text-ink-muted">
          <span>Subtotal ({items.length} item{items.length === 1 ? "" : "s"})</span>
          <span className="tabular-nums text-white">{formatPrice(subtotal, currency)}</span>
        </div>
        <div className="flex justify-between text-ink-muted">
          <span>Shipping</span>
          <span className="tabular-nums text-white">{formatPrice(shippingAmount, currency)}</span>
        </div>
        <div className="flex justify-between text-ink-muted">
          <span>Tax (18%)</span>
          <span className="tabular-nums text-white">{formatPrice(taxAmount, currency)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between border-t border-border-hairline pt-4">
        <span className="text-sm font-semibold uppercase tracking-wide text-white">Total</span>
        <span className="font-serif text-2xl font-semibold text-gold-bright tabular-nums">
          {formatPrice(total, currency)}
        </span>
      </div>
    </Card>
  );
}
