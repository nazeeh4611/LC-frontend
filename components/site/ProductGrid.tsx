"use client";

import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductFilters, ProductFilterState } from "@/components/site/ProductFilters";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { LoadingState, ErrorState, EmptyState, Skeleton } from "@/components/ui/States";
import { fetchProducts } from "@/services/products.service";
import { fetchCategories } from "@/services/categories.service";
import { Product, Category } from "@/types";

const DEFAULT_FILTERS: ProductFilterState = {
  category: "",
  minPrice: "",
  maxPrice: "",
  availability: "",
  type: "",
};

export function ProductGrid({ initialCategorySlug }: { initialCategorySlug?: string }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [filters, setFilters] = useState<ProductFilterState>(DEFAULT_FILTERS);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchCategories().then((result) => {
      if (!result.success) return;
      setCategories(result.data);
      if (initialCategorySlug) {
        const match = result.data.find((c) => c.slug === initialCategorySlug);
        if (match) setFilters((f) => ({ ...f, category: match._id }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    fetchProducts({
      search: search || undefined,
      category: filters.category || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      availability: filters.availability || undefined,
      type: filters.type || undefined,
      sort,
      page: String(page),
      limit: "12",
    }).then((result) => {
      if (cancelled) return;
      if (!result.success) {
        setStatus("error");
        setErrorMessage(result.message);
        return;
      }
      setProducts(result.data.items);
      setTotal(result.data.pagination.total);
      setTotalPages(result.data.pagination.totalPages);
      setStatus("ready");
    });

    return () => {
      cancelled = true;
    };
  }, [search, filters, sort, page]);

  function updateFilters(patch: Partial<ProductFilterState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
    setSearch("");
    setSort("newest");
    setPage(1);
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <aside className="lg:col-span-1">
        <div className="rounded-md border border-border bg-bg-secondary/40 p-5">
          <ProductFilters categories={categories} filters={filters} onChange={updateFilters} onReset={resetFilters} />
        </div>
      </aside>

      <div className="lg:col-span-3">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded border border-border bg-bg-elevated px-3 py-2 sm:w-80">
            <Search size={15} className="text-ink-faint" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm text-white placeholder:text-ink-faint focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-ink-muted">
              {status === "ready" ? `${total} product${total === 1 ? "" : "s"}` : "\u00A0"}
            </span>
            <Select value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 w-44">
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A–Z</option>
              <option value="popularity">Popularity</option>
            </Select>
          </div>
        </div>

        {status === "loading" && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-md" />
            ))}
          </div>
        )}

        {status === "error" && (
          <ErrorState
            title="Couldn't load products"
            message={errorMessage || "Please try again, or make sure the backend API is running and reachable."}
            onRetry={() => setPage((p) => p)}
          />
        )}

        {status === "ready" && products.length === 0 && (
          <EmptyState
            title="No products found"
            message="Try adjusting your filters or search term."
            actionLabel="Reset Filters"
            onAction={resetFilters}
          />
        )}

        {status === "ready" && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={14} />
                </Button>
                <span className="px-3 text-sm text-ink-muted">
                  Page {page} of {totalPages}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight size={14} />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
