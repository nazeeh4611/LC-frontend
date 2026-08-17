"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { Skeleton } from "@/components/ui/States";
import { fetchProducts } from "@/services/products.service";
import { fetchCategories } from "@/services/categories.service";
import { Product, Category } from "@/types";
import { cn } from "@/lib/utils";

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    fetchCategories().then((result) => {
      if (result.success) setCategories(result.data);
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchProducts({
      category: activeCategory || undefined,
      sort: activeCategory ? "newest" : "bestseller",
      limit: "12",
    }).then((result) => {
      if (cancelled) return;
      setProducts(result.success ? result.data.items : []);
    });
    return () => {
      cancelled = true;
    };
  }, [activeCategory]);

  return (
    <section className="relative overflow-hidden border-t border-border-hairline bg-bg-secondary/40 py-20 md:py-28">
      <Container>
        <Reveal className="mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <div className="max-w-xl">
            <SectionLabel>Catalogue</SectionLabel>
            <h2 className="text-editorial font-bold uppercase text-white">
              Featured
              <br />
              <span className="text-gradient-gold">Products.</span>
            </h2>
            <p className="mt-5 text-ink-muted leading-relaxed">
              A wide selection from our automotive parts, EV component and lithium battery
              catalogue &mdash; full specifications and pricing on request.
            </p>
          </div>
        </Reveal>

        {/* Category tabs */}
        <Reveal delay={1} className="mb-10 flex flex-wrap gap-2 border-b border-border-hairline pb-6">
          <button
            onClick={() => setActiveCategory("")}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
              activeCategory === ""
                ? "border-gold-bright bg-gold-soft text-gold-bright"
                : "border-border text-ink-muted hover:border-gold/40 hover:text-white"
            )}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat._id)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                activeCategory === cat._id
                  ? "border-gold-bright bg-gold-soft text-gold-bright"
                  : "border-border text-ink-muted hover:border-gold/40 hover:text-white"
              )}
            >
              {cat.name}
            </button>
          ))}
        </Reveal>

        {products === null ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] w-full" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="py-12 text-center text-sm text-ink-muted">No products found in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-bright"
          >
            View Full Catalogue <ArrowRight size={14} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
