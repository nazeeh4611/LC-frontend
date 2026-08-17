"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from "@/components/ui/Table";
import { Badge, BadgeProps } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { LoadingState, ErrorState, EmptyState, Skeleton } from "@/components/ui/States";
import { fetchAdminOrders } from "@/services/admin/orders.service";
import { Order } from "@/types";

const STATUS_VARIANT: Record<string, BadgeProps["variant"]> = {
  delivered: "success",
  shipped: "info",
  confirmed: "info",
  out_for_delivery: "info",
  processing: "warning",
  packed: "warning",
  pending: "neutral",
  payment_pending: "warning",
  cancelled: "danger",
  refunded: "danger",
};

const ORDER_STATUSES = [
  "pending", "payment_pending", "confirmed", "processing", "packed",
  "shipped", "out_for_delivery", "delivered", "cancelled", "refunded",
];

function formatCurrency(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
}

export default function AdminOrdersPage() {
  const [items, setItems] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setStatus("loading");
    fetchAdminOrders({ page, limit: 15, search: search || undefined, orderStatus: orderStatus || undefined }).then(
      (result) => {
        if (!result.success) {
          setStatus("error");
          setErrorMessage(result.message);
          return;
        }
        setItems(result.data.items);
        setTotalPages(result.data.pagination.totalPages);
        setStatus("ready");
      }
    );
  }, [page, search, orderStatus]);

  return (
    <div>
      <AdminPageHeader title="Orders" description="View and manage all customer orders." />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 rounded border border-border bg-bg-elevated px-3 py-2 sm:w-72">
          <Search size={15} className="text-ink-faint" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search order # or customer..."
            className="w-full bg-transparent text-sm text-white placeholder:text-ink-faint focus:outline-none"
          />
        </div>
        <Select value={orderStatus} onChange={(e) => { setOrderStatus(e.target.value); setPage(1); }} className="sm:w-52">
          <option value="">All Statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </Select>
      </div>

      {status === "loading" && <Skeleton className="h-96 w-full rounded-md" />}
      {status === "error" && <ErrorState message={errorMessage} onRetry={() => setPage((p) => p)} />}
      {status === "ready" && items.length === 0 && <EmptyState title="No orders found" />}

      {status === "ready" && items.length > 0 && (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Order ID</TableHeaderCell>
                <TableHeaderCell>Customer</TableHeaderCell>
                <TableHeaderCell>Amount</TableHeaderCell>
                <TableHeaderCell>Payment</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="text-gold-bright">{order.orderNumber}</TableCell>
                  <TableCell>{order.shippingAddress?.fullName}</TableCell>
                  <TableCell className="tabular-nums">{formatCurrency(order.total, order.currency)}</TableCell>
                  <TableCell className="capitalize">
                    <Badge variant={order.paymentStatus === "success" ? "success" : order.paymentStatus === "failed" ? "danger" : "warning"}>
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[order.orderStatus] ?? "neutral"} className="capitalize">
                      {order.orderStatus.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-ink-muted">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Link href={`/admin/orders/${order._id}`} className="text-xs text-gold-bright hover:underline">
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AdminPagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
