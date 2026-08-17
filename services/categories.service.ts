import { apiFetch, ApiResult } from "@/lib/api";
import { Category } from "@/types";
import { mockCategories } from "@/lib/mock-data";
import { FORCE_DEMO_MODE } from "@/lib/demo-mode";

export async function fetchCategories(): Promise<ApiResult<Category[]>> {
  if (FORCE_DEMO_MODE) {
    return { success: true, data: mockCategories };
  }
  const result = await apiFetch<Category[]>("/categories");
  if (!result.success || result.data.length === 0) {
    return { success: true, data: mockCategories };
  }
  return result;
}
