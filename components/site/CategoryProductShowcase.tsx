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
import { Product } from "@/types";

export function CategoryProductShowcase({
  categorySlug,
  title = "Related Products",
  eyebrow = "Catalogue",
  limit = 8,
}: {
  categorySlug: string;
  title?: string;
  eyebrow?: string;
  limit?: number;
}) {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchCategories().then((catResult) => {
      if (cancelled || !catResult.success) return;
      const match = catResult.data.find((c) => c.slug === categorySlug);
      fetchProducts({ category: match?._id, limit: String(limit), sort: "bestseller" }).then((result) => {
        if (cancelled) return;
        setProducts(result.success ? result.data.items : []);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [categorySlug, limit]);

  if (products !== null && products.length === 0) return null;

  return (
    <section className="border-t border-border-hairline py-20 md:py-28">
      <Container>
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 className="text-editorial font-bold uppercase text-white">{title}</h2>
          </div>
          <Link
            href="/products"
            className="inline-flex flex-shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-bright"
          >
            View Full Catalogue <ArrowRight size={14} />
          </Link>
        </Reveal>

        {products === null ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
