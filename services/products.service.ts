import { apiFetch, ApiResult } from "@/lib/api";
import { Product, Pagination } from "@/types";
import { queryMockProducts, findMockProductBySlug, searchMockSuggestions } from "@/lib/mock-data";
import { FORCE_DEMO_MODE } from "@/lib/demo-mode";

export interface ProductListParams {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  availability?: string;
  type?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

export interface ProductListResponse {
  items: Product[];
  pagination: Pagination;
}

export async function fetchProducts(params: ProductListParams = {}): Promise<ApiResult<ProductListResponse>> {
  // Demo mode: always serve the local catalogue, no backend round-trip.
  if (FORCE_DEMO_MODE) {
    return { success: true, data: queryMockProducts(params) };
  }

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.set(key, value);
  });
  const qs = query.toString();
  const result = await apiFetch<ProductListResponse>(`/products${qs ? `?${qs}` : ""}`);

  // Fall back to the local catalogue (structured identically to the API
  // response) whenever the live backend is unreachable or returns an empty
  // catalogue, so the storefront always shows a complete, populated
  // catalogue.
  if (!result.success || result.data.items.length === 0) {
    return { success: true, data: queryMockProducts(params) };
  }
  return result;
}

export async function fetchProductBySlug(
  slug: string
): Promise<ApiResult<{ product: Product; related: Product[] }>> {
  if (FORCE_DEMO_MODE) {
    const mock = findMockProductBySlug(slug);
    if (mock) return { success: true, data: mock };
    return { success: false, message: "Product not found." };
  }

  const result = await apiFetch<{ product: Product; related: Product[] }>(`/products/slug/${slug}`);
  if (!result.success) {
    const mock = findMockProductBySlug(slug);
    if (mock) return { success: true, data: mock };
    return result;
  }
  return result;
}

export async function fetchSearchSuggestions(q: string): Promise<ApiResult<Product[]>> {
  if (FORCE_DEMO_MODE) {
    return { success: true, data: searchMockSuggestions(q) };
  }
  const result = await apiFetch<Product[]>(`/products/search/suggestions?q=${encodeURIComponent(q)}`);
  if (!result.success) {
    return { success: true, data: searchMockSuggestions(q) };
  }
  return result;
}
