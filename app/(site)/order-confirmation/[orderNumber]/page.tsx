"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LoadingState, ErrorState } from "@/components/ui/States";
import { fetchOrderByNumber } from "@/services/orders.service";
import { Order } from "@/types";

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(price);
}

export default function OrderConfirmationPage({ params }: { params: { orderNumber: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchOrderByNumber(params.orderNumber).then((result) => {
      if (!result.success) {
        setStatus("error");
        setErrorMessage(result.message);
        return;
      }
      setOrder(result.data);
      setStatus("ready");
    });
  }, [params.orderNumber]);

  if (status === "loading") return <LoadingState label="Loading your order..." />;
  if (status === "error" || !order) {
    return (
      <Container className="py-24">
        <ErrorState title="Couldn't load order" message={errorMessage} />
      </Container>
    );
  }

  const isPaid = order.paymentStatus === "success";
  const isCodConfirmed = order.paymentMethod === "cod" && order.orderStatus !== "pending";
  const isConfirmed = isPaid || isCodConfirmed;

  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-2xl">
        <div className="flex flex-col items-center text-center">
          <span
            className={`flex h-16 w-16 items-center justify-center rounded-full ${
              isConfirmed ? "bg-status-success/15 text-status-success" : "bg-status-warning/15 text-status-warning"
            }`}
          >
            {isConfirmed ? <CheckCircle2 size={32} /> : <Clock size={32} />}
          </span>
          <h1 className="mt-5 text-2xl font-semibold text-white">
            {isPaid
              ? "Order Placed Successfully!"
              : isCodConfirmed
                ? "Order Confirmed — Pay on Delivery"
                : "Order Received — Awaiting Payment"}
          </h1>
          <p className="mt-2 max-w-md text-sm text-ink-muted">
            {isPaid
              ? "Thank you for your order with Louis CALTEN International LLP."
              : isCodConfirmed
                ? "Your order is confirmed. Please keep the exact amount ready in cash for our courier on delivery."
                : "Your order has been created. Complete payment to confirm it — you can check its status any time from your account."}
          </p>
        </div>

        <Card className="mt-8 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-hairline pb-4">
            <div>
              <p className="text-xs text-ink-faint">Order Number</p>
              <p className="font-serif text-lg font-semibold text-gold-bright">{order.orderNumber}</p>
            </div>
            <Badge variant={isPaid ? "success" : "warning"} className="capitalize">
              Payment: {order.paymentStatus.replace(/_/g, " ")}
            </Badge>
          </div>

          <div className="mt-4 space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-white">
                  {item.name} <span className="text-ink-faint">× {item.quantity}</span>
                </span>
                <span className="tabular-nums text-ink-muted">{formatPrice(item.subtotal, order.currency)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-baseline justify-between border-t border-border-hairline pt-4">
            <span className="text-sm font-semibold uppercase text-white">Total</span>
            <span className="font-serif text-xl font-semibold text-gold-bright tabular-nums">
              {formatPrice(order.total, order.currency)}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border-hairline pt-4 text-xs">
            <div>
              <p className="text-ink-faint">Payment Method</p>
              <p className="capitalize text-white">{order.paymentMethod}</p>
            </div>
            <div>
              <p className="text-ink-faint">Expected Delivery</p>
              <p className="text-white">{order.shippingMethod.etaDays}</p>
            </div>
          </div>
        </Card>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/products">
            <Button size="lg" variant="outline">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg">
              Contact Support <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
