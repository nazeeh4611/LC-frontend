import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FolderTree,
  Boxes,
  Users,
  CreditCard,
  BarChart3,
  Ticket,
  Truck,
  UserCog,
  ShieldCheck,
  History,
  Settings,
  FileText,
  Mail,
  LucideIcon,
} from "lucide-react";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export const adminNav: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Inventory", href: "/admin/inventory", icon: Boxes },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  { label: "Coupons", href: "/admin/coupons", icon: Ticket },
  { label: "Shipping", href: "/admin/shipping", icon: Truck },
  { label: "Quote Requests", href: "/admin/quote-requests", icon: FileText },
  { label: "Contact Requests", href: "/admin/contact-requests", icon: Mail },
  { label: "Users", href: "/admin/users", icon: UserCog },
  { label: "Roles & Permissions", href: "/admin/roles", icon: ShieldCheck },
  { label: "Activity Log", href: "/admin/activity-log", icon: History },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];
