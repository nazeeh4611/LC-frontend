import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS: { key: string; label: string }[] = [
  { key: "pending", label: "Order Placed" },
  { key: "confirmed", label: "Payment Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "packed", label: "Packed" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

export function OrderTimeline({ orderStatus }: { orderStatus: string }) {
  const isTerminalNegative = orderStatus === "cancelled" || orderStatus === "refunded";
  const currentIndex = STEPS.findIndex((s) => s.key === orderStatus);

  if (isTerminalNegative) {
    return (
      <div className="rounded-md border border-status-danger/30 bg-status-danger/5 px-4 py-3 text-sm text-status-danger">
        This order was {orderStatus === "cancelled" ? "cancelled" : "refunded"}.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-start gap-0">
      {STEPS.map((step, i) => {
        const state = i < currentIndex ? "complete" : i === currentIndex ? "current" : "upcoming";
        return (
          <div key={step.key} className="flex min-w-[110px] flex-1 flex-col items-center text-center">
            <div className="flex w-full items-center">
              <div
                className={cn(
                  "h-px flex-1",
                  i === 0 ? "opacity-0" : state === "upcoming" ? "bg-border-hairline" : "bg-gold-bright"
                )}
              />
              <span
                className={cn(
                  "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold",
                  state === "complete" && "border-status-success bg-status-success text-bg",
                  state === "current" && "border-gold-bright bg-gold-bright text-bg",
                  state === "upcoming" && "border-border-hairline bg-bg-elevated text-ink-faint"
                )}
              >
                {state === "complete" ? <Check size={14} /> : i + 1}
              </span>
              <div
                className={cn(
                  "h-px flex-1",
                  i === STEPS.length - 1 ? "opacity-0" : state === "complete" ? "bg-gold-bright" : "bg-border-hairline"
                )}
              />
            </div>
            <p className={cn("mt-2 text-[11px]", state === "upcoming" ? "text-ink-faint" : "text-white")}>
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
