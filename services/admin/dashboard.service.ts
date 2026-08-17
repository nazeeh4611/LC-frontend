import { apiFetch } from "@/lib/api";

export interface DashboardMetric {
  value: number;
  changePct: number | null;
}

export interface DashboardData {
  metrics: {
    totalOrders: DashboardMetric;
    totalSales: DashboardMetric;
    totalCustomers: DashboardMetric;
    totalProducts: DashboardMetric;
    lowStockItems: DashboardMetric;
  };
  recentOrders: Array<{
    _id: string;
    orderNumber: string;
    shippingAddress: { fullName: string };
    total: number;
    paymentStatus: string;
    orderStatus: string;
    paymentMethod: string;
    createdAt: string;
  }>;
  salesOverview: Array<{ date: string; sales: number; orders: number }>;
  paymentOverview: Array<{ gateway: string; total: number; count: number }>;
  inventorySummary: { totalProducts: number; inStock: number; lowStock: number; outOfStock: number };
  topSellingProducts: Array<{ _id: string; name: string; unitsSold: number; revenue: number }>;
  recentActivities: Array<{ _id: string; action: string; entity: string; userName?: string; createdAt: string }>;
}

export function fetchDashboard(days = 7) {
  return apiFetch<DashboardData>(`/admin/dashboard?days=${days}`);
}
