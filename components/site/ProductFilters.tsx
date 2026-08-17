"use client";

import { Category } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface ProductFilterState {
  category: string;
  minPrice: string;
  maxPrice: string;
  availability: string;
  type: string;
}

export function ProductFilters({
  categories,
  filters,
  onChange,
  onReset,
}: {
  categories: Category[];
  filters: ProductFilterState;
  onChange: (patch: Partial<ProductFilterState>) => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-bright">Categories</p>
        <div className="space-y-1">
          <button
            onClick={() => onChange({ category: "" })}
            className={cn(
              "block w-full rounded px-3 py-2 text-left text-sm transition-colors",
              filters.category === "" ? "bg-gold-soft text-gold-bright" : "text-ink-muted hover:text-white"
            )}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => onChange({ category: cat._id })}
              className={cn(
                "block w-full rounded px-3 py-2 text-left text-sm transition-colors",
                filters.category === cat._id ? "bg-gold-soft text-gold-bright" : "text-ink-muted hover:text-white"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="hairline" />

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-bright">Price Range (USD)</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            className="w-full rounded border border-border bg-bg-elevated px-3 py-2 text-sm text-white placeholder:text-ink-faint focus:outline-none focus-visible:border-gold-bright"
          />
          <span className="text-ink-faint">–</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            className="w-full rounded border border-border bg-bg-elevated px-3 py-2 text-sm text-white placeholder:text-ink-faint focus:outline-none focus-visible:border-gold-bright"
          />
        </div>
      </div>

      <div className="hairline" />

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-bright">Availability</p>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "", label: "All" },
            { value: "in_stock", label: "In Stock" },
            { value: "out_of_stock", label: "Out of Stock" },
          ].map((opt) => (
            <button key={opt.value} onClick={() => onChange({ availability: opt.value })}>
              <Badge variant={filters.availability === opt.value ? "gold" : "neutral"}>{opt.label}</Badge>
            </button>
          ))}
        </div>
      </div>

      <div className="hairline" />

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-bright">Product Type</p>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "", label: "All" },
            { value: "featured", label: "Featured" },
            { value: "bestseller", label: "Bestseller" },
            { value: "quote_only", label: "Quote Only" },
          ].map((opt) => (
            <button key={opt.value} onClick={() => onChange({ type: opt.value })}>
              <Badge variant={filters.type === opt.value ? "gold" : "neutral"}>{opt.label}</Badge>
            </button>
          ))}
        </div>
      </div>

      <Button size="sm" variant="outline" className="w-full" onClick={onReset}>
        Reset Filters
      </Button>
    </div>
  );
}
