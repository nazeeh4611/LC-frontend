export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  displayOrder: number;
  active: boolean;
}

export interface ProductImage {
  url: string;
  alt?: string;
}

export interface ProductDocument {
  label: string;
  url: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  category: Category | string;
  subcategory?: string;
  brand?: string;
  shortDescription?: string;
  description: string;
  price?: number;
  compareAtPrice?: number;
  currency: string;
  stock: number;
  lowStockThreshold: number;
  minimumOrderQuantity: number;
  images: ProductImage[];
  thumbnail?: string;
  specifications: Record<string, string>;
  applications: string[];
  compatibleVehicles: string[];
  documents: ProductDocument[];
  tags: string[];
  featured: boolean;
  bestseller: boolean;
  active: boolean;
  isQuoteOnly: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Address {
  _id?: string;
  label?: string;
  fullName: string;
  phone: string;
  companyName?: string;
  addressLine1: string;
  addressLine2?: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  taxId?: string;
  isDefault: boolean;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  role: string;
  addresses: Address[];
  createdAt: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  sku: string;
  image?: string;
  price: number;
  quantity: number;
  minimumOrderQuantity: number;
  stock: number;
}

export interface ShippingMethod {
  id: "standard" | "express" | "priority";
  label: string;
  description: string;
  etaDays: string;
  price: number;
}

export type OrderStatus =
  | "pending"
  | "payment_pending"
  | "confirmed"
  | "processing"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus =
  | "pending"
  | "processing"
  | "success"
  | "failed"
  | "refunded"
  | "partially_refunded";

export interface OrderItem {
  product: string;
  name: string;
  sku: string;
  image?: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface OrderAddress {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  addressLine1: string;
  addressLine2?: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  taxId?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customer: string;
  items: OrderItem[];
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  shippingMethod: { id: string; label: string; etaDays: string };
  subtotal: number;
  shippingAmount: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  currency: string;
  paymentMethod: "razorpay" | "stripe" | "payu" | "cod" | "card" | "upi" | "netbanking" | "other";
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  shippingPartner?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderTrackingStep {
  step: string;
  status: "complete" | "current" | "upcoming" | "skipped";
}
