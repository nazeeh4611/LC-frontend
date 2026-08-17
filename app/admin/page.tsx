"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  DollarSign,
  Users,
  Package,
  AlertTriangle,
  Plus,
  FolderPlus,
  UserPlus,
  Ticket,
  BarChart3,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge, BadgeProps } from "@/components/ui/Badge";
import { LoadingState, ErrorState } from "@/components/ui/States";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from "@/components/ui/Table";
import { fetchDashboard, DashboardData } from "@/services/admin/dashboard.service";

const GATEWAY_COLORS: Record<string, string> = {
  razorpay: "#3395FF",
  stripe: "#8C7FF2",
  payu: "#4CB944",
};

const ORDER_STATUS_VARIANT: Record<string, BadgeProps["variant"]> = {
  delivered: "success",
  shipped: "info",
  confirmed: "info",
  processing: "warning",
  packed: "warning",
  pending: "neutral",
  payment_pending: "warning",
  cancelled: "danger",
  refunded: "danger",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

const quickActions = [
  { label: "Add Product", href: "/admin/products/new", icon: Plus },
  { label: "Create Category", href: "/admin/categories", icon: FolderPlus },
  { label: "New Order", href: "/admin/orders", icon: ShoppingCart },
  { label: "Add Customer", href: "/admin/customers", icon: UserPlus },
  { label: "Generate Coupon", href: "/admin/coupons", icon: Ticket },
  { label: "View Reports", href: "/admin/reports", icon: BarChart3 },
];

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [days, setDays] = useState(7);

  useEffect(() => {
    setStatus("loading");
    fetchDashboard(days).then((result) => {
      if (!result.success) {
        setStatus("error");
        setErrorMessage(result.message);
        return;
      }
      setData(result.data);
      setStatus("ready");
    });
  }, [days]);

  if (status === "loading") return <LoadingState label="Loading dashboard..." />;
  if (status === "error" || !data) {
    return (
      <ErrorState
        title="Couldn't load dashboard"
        message={errorMessage || "Make sure the backend API and database are running and reachable."}
        onRetry={() => setDays((d) => d)}
      />
    );
  }

  const { metrics, recentOrders, salesOverview, paymentOverview, inventorySummary, topSellingProducts, recentActivities } = data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Welcome back 👋</h1>
          <p className="mt-1 text-sm text-ink-muted">Here&apos;s what&apos;s happening with your store today.</p>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="h-10 rounded border border-border bg-bg-elevated px-3 text-sm text-white focus:outline-none"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <AdminStatCard label="Total Orders" value={String(metrics.totalOrders.value)} changePct={metrics.totalOrders.changePct} icon={ShoppingCart} />
        <AdminStatCard label="Total Sales" value={formatCurrency(metrics.totalSales.value)} changePct={metrics.totalSales.changePct} icon={DollarSign} />
        <AdminStatCard label="Total Customers" value={String(metrics.totalCustomers.value)} changePct={metrics.totalCustomers.changePct} icon={Users} />
        <AdminStatCard label="Products" value={String(metrics.totalProducts.value)} changePct={metrics.totalProducts.changePct} icon={Package} />
        <AdminStatCard label="Low Stock Items" value={String(metrics.lowStockItems.value)} icon={AlertTriangle} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border-hairline p-6">
            <h2 className="text-base font-semibold text-white">Sales Overview</h2>
          </div>
          <CardContent className="pt-6">
            {salesOverview.length === 0 ? (
              <p className="py-16 text-center text-sm text-ink-muted">No sales in this period yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={salesOverview}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C9A24A" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#C9A24A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,245,245,0.06)" />
                  <XAxis dataKey="date" stroke="#A7AFB8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#A7AFB8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#0A1118", border: "1px solid rgba(201,162,74,0.2)", borderRadius: 6 }}
                    labelStyle={{ color: "#F5F5F5" }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#C9A24A" fill="url(#salesGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <div className="flex items-center justify-between border-b border-border-hairline p-6">
            <h2 className="text-base font-semibold text-white">Payment Overview</h2>
          </div>
          <CardContent className="pt-6">
            {paymentOverview.length === 0 ? (
              <p className="py-16 text-center text-sm text-ink-muted">No successful payments yet.</p>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={paymentOverview} dataKey="total" nameKey="gateway" innerRadius={45} outerRadius={70} paddingAngle={3}>
                      {paymentOverview.map((entry) => (
                        <Cell key={entry.gateway} fill={GATEWAY_COLORS[entry.gateway] ?? "#A57E40"} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#0A1118", border: "1px solid rgba(201,162,74,0.2)", borderRadius: 6 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {paymentOverview.map((entry) => (
                    <div key={entry.gateway} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 capitalize text-ink-muted">
                        <span className="h-2 w-2 rounded-full" style={{ background: GATEWAY_COLORS[entry.gateway] ?? "#A57E40" }} />
                        {entry.gateway}
                      </span>
                      <span className="text-white tabular-nums">{formatCurrency(entry.total)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between border-b border-border-hairline p-6">
          <h2 className="text-base font-semibold text-white">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs font-medium uppercase tracking-wider text-gold-bright">
            View All Orders
          </Link>
        </div>
        <div className="p-6 pt-0">
          {recentOrders.length === 0 ? (
            <p className="py-10 text-center text-sm text-ink-muted">No orders yet.</p>
          ) : (
            <Table className="border-0">
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
                {recentOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="text-gold-bright">{order.orderNumber}</TableCell>
                    <TableCell>{order.shippingAddress?.fullName}</TableCell>
                    <TableCell className="tabular-nums">{formatCurrency(order.total)}</TableCell>
                    <TableCell className="capitalize">{order.paymentMethod}</TableCell>
                    <TableCell>
                      <Badge variant={ORDER_STATUS_VARIANT[order.orderStatus] ?? "neutral"} className="capitalize">
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
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <div className="border-b border-border-hairline p-6">
            <h2 className="text-base font-semibold text-white">Inventory Summary</h2>
          </div>
          <CardContent className="space-y-3 pt-6">
            <div className="flex justify-between text-sm"><span className="text-ink-muted">Total Products</span><span className="text-white tabular-nums">{inventorySummary.totalProducts}</span></div>
            <div className="flex justify-between text-sm"><span className="text-ink-muted">In Stock</span><span className="text-status-success tabular-nums">{inventorySummary.inStock}</span></div>
            <div className="flex justify-between text-sm"><span className="text-ink-muted">Low Stock</span><span className="text-status-warning tabular-nums">{inventorySummary.lowStock}</span></div>
            <div className="flex justify-between text-sm"><span className="text-ink-muted">Out of Stock</span><span className="text-status-danger tabular-nums">{inventorySummary.outOfStock}</span></div>
          </CardContent>
        </Card>

        <Card>
          <div className="flex items-center justify-between border-b border-border-hairline p-6">
            <h2 className="text-base font-semibold text-white">Top Selling Products</h2>
          </div>
          <CardContent className="space-y-3 pt-6">
            {topSellingProducts.length === 0 ? (
              <p className="text-sm text-ink-muted">No sales yet.</p>
            ) : (
              topSellingProducts.map((p) => (
                <div key={p._id} className="flex items-center justify-between text-sm">
                  <span className="truncate text-white">{p.name}</span>
                  <span className="flex-shrink-0 text-ink-muted tabular-nums">{p.unitsSold} sold</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <div className="border-b border-border-hairline p-6">
            <h2 className="text-base font-semibold text-white">Recent Activities</h2>
          </div>
          <CardContent className="space-y-3 pt-6">
            {recentActivities.length === 0 ? (
              <p className="text-sm text-ink-muted">No activity recorded yet.</p>
            ) : (
              recentActivities.map((a) => (
                <div key={a._id} className="text-xs">
                  <p className="text-white">{a.action.replace(/_/g, " ")} <span className="text-ink-faint">· {a.entity}</span></p>
                  <p className="text-ink-faint">{new Date(a.createdAt).toLocaleString()}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="border-b border-border-hairline p-6">
          <h2 className="text-base font-semibold text-white">Quick Actions</h2>
        </div>
        <CardContent className="grid grid-cols-2 gap-3 pt-6 sm:grid-cols-3 lg:grid-cols-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 rounded-md border border-border-hairline bg-bg-elevated px-4 py-5 text-center transition-colors hover:border-gold-bright"
              >
                <Icon size={18} className="text-gold-bright" />
                <span className="text-xs text-white">{action.label}</span>
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
