"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge, BadgeProps } from "@/components/ui/Badge";
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from "@/components/ui/Table";
import { LoadingState, ErrorState } from "@/components/ui/States";
import { OrderTimeline } from "@/components/admin/OrderTimeline";
import { OrderOperationsPanel } from "@/components/admin/OrderOperationsPanel";
import { fetchAdminOrder, fetchAdminShippingConfig, ShippingPartnerOption } from "@/services/admin/orders.service";
import { Order } from "@/types";

const PAYMENT_STATUS_VARIANT: Record<string, BadgeProps["variant"]> = {
  success: "success",
  pending: "warning",
  processing: "warning",
  failed: "danger",
  refunded: "danger",
  partially_refunded: "warning",
};

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
}

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [partners, setPartners] = useState<ShippingPartnerOption[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  function load() {
    setStatus("loading");
    Promise.all([fetchAdminOrder(params.id), fetchAdminShippingConfig()]).then(([orderResult, shippingResult]) => {
      if (!orderResult.success) {
        setStatus("error");
        setErrorMessage(orderResult.message);
        return;
      }
      setOrder(orderResult.data);
      if (shippingResult.success) setPartners(shippingResult.data.partners);
      setStatus("ready");
    });
  }

  useEffect(load, [params.id]);

  if (status === "loading") return <LoadingState label="Loading order..." />;
  if (status === "error" || !order) {
    return <ErrorState title="Couldn't load order" message={errorMessage} onRetry={load} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/admin/orders" className="mb-2 flex items-center gap-1 text-xs text-ink-muted hover:text-gold-bright">
            <ArrowLeft size={13} /> Back to Orders
          </Link>
          <h1 className="text-xl font-semibold text-white">Order {order.orderNumber}</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Placed {new Date(order.createdAt).toLocaleString()} via {order.paymentMethod}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={PAYMENT_STATUS_VARIANT[order.paymentStatus] ?? "neutral"} className="capitalize">
            Payment: {order.paymentStatus.replace(/_/g, " ")}
          </Badge>
          {order.paymentStatus === "success" && (
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1"}/orders/number/${order.orderNumber}/invoice/pdf`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs font-medium text-gold-bright hover:underline"
            >
              <Download size={13} /> Download Invoice
            </a>
          )}
        </div>
      </div>

      <Card>
        <div className="border-b border-border-hairline p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gold-bright">Order Timeline</h2>
        </div>
        <CardContent className="overflow-x-auto pt-6">
          <div className="min-w-[640px]">
            <OrderTimeline orderStatus={order.orderStatus} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="border-b border-border-hairline p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gold-bright">Items</h2>
          </div>
          <div className="p-6 pt-0">
            <Table className="border-0">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Product</TableHeaderCell>
                  <TableHeaderCell>SKU</TableHeaderCell>
                  <TableHeaderCell>Qty</TableHeaderCell>
                  <TableHeaderCell>Unit Price</TableHeaderCell>
                  <TableHeaderCell>Subtotal</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-ink-muted">{item.sku}</TableCell>
                    <TableCell className="tabular-nums">{item.quantity}</TableCell>
                    <TableCell className="tabular-nums">{formatCurrency(item.unitPrice, order.currency)}</TableCell>
                    <TableCell className="tabular-nums">{formatCurrency(item.subtotal, order.currency)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 space-y-2 border-t border-border-hairline pt-4 text-sm">
              <div className="flex justify-between text-ink-muted"><span>Subtotal</span><span className="tabular-nums text-white">{formatCurrency(order.subtotal, order.currency)}</span></div>
              <div className="flex justify-between text-ink-muted"><span>Shipping</span><span className="tabular-nums text-white">{formatCurrency(order.shippingAmount, order.currency)}</span></div>
              <div className="flex justify-between text-ink-muted"><span>Tax</span><span className="tabular-nums text-white">{formatCurrency(order.taxAmount, order.currency)}</span></div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-ink-muted"><span>Discount</span><span className="tabular-nums text-white">-{formatCurrency(order.discountAmount, order.currency)}</span></div>
              )}
              <div className="flex justify-between border-t border-border-hairline pt-2 text-base font-semibold"><span className="text-white">Total</span><span className="tabular-nums text-gold-bright">{formatCurrency(order.total, order.currency)}</span></div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-bright">Customer</h2>
            <p className="text-sm text-white">{order.shippingAddress.fullName}</p>
            <p className="text-xs text-ink-muted">{order.shippingAddress.email}</p>
            <p className="text-xs text-ink-muted">{order.shippingAddress.phone}</p>
            {order.shippingAddress.companyName && (
              <p className="mt-1 text-xs text-ink-faint">{order.shippingAddress.companyName}</p>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-bright">Shipping Address</h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              {order.shippingAddress.addressLine1}
              {order.shippingAddress.addressLine2 && <>, {order.shippingAddress.addressLine2}</>}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              <br />
              {order.shippingAddress.country}
            </p>
            <p className="mt-3 text-xs text-ink-faint">
              Method: {order.shippingMethod.label} ({order.shippingMethod.etaDays})
            </p>
            {order.trackingNumber && (
              <p className="mt-1 text-xs text-ink-faint">
                Tracking: <span className="text-white">{order.trackingNumber}</span>
              </p>
            )}
          </Card>
        </div>
      </div>

      <Card>
        <div className="border-b border-border-hairline p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gold-bright">Order Operations</h2>
        </div>
        <CardContent className="pt-6">
          <OrderOperationsPanel order={order} shippingPartners={partners} onUpdated={setOrder} />
        </CardContent>
      </Card>
    </div>
  );
}
