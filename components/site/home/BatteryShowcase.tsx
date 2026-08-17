"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BatteryCharging, Check, MessageSquareText, ShoppingCart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/States";
import { ProductCard } from "@/components/site/ProductCard";
import { fetchProducts } from "@/services/products.service";
import { fetchCategories } from "@/services/categories.service";
import { Product, Category } from "@/types";
import { useCart } from "@/context/CartContext";

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(price);
}

export function BatteryShowcase() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const { addItem } = useCart();
  const [feedback, setFeedback] = useState<{ ok: boolean; message?: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchCategories().then(async (catResult) => {
      if (cancelled || !catResult.success) return;
      const targetSlugs = ["lithium-batteries", "energy-solutions"];
      const ids = catResult.data.filter((c: Category) => targetSlugs.includes(c.slug)).map((c) => c._id);
      const results = await Promise.all(ids.map((id) => fetchProducts({ category: id, limit: "10", sort: "bestseller" })));
      if (cancelled) return;
      const merged = new Map<string, Product>();
      results.forEach((r) => {
        if (r.success) r.data.items.forEach((p) => merged.set(p._id, p));
      });
      const list = Array.from(merged.values()).sort((a, b) => Number(b.featured) - Number(a.featured) || Number(b.bestseller) - Number(a.bestseller));
      setProducts(list);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (products !== null && products.length === 0) return null;

  const hero = products?.[0];
  const rest = products?.slice(1, 7) ?? [];

  function handleAddToCart() {
    if (!hero) return;
    const result = addItem(hero);
    setFeedback(result);
    setTimeout(() => setFeedback(null), 2500);
  }

  return (
    <section className="relative overflow-hidden border-t border-border-hairline bg-navy-gradient py-20 md:py-28">
      <div className="pointer-events-none absolute -left-32 top-0 h-[460px] w-[460px] rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-gold/[0.07] blur-3xl" />
      <Container className="relative">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionLabel>Battery &amp; Energy Storage</SectionLabel>
            <h2 className="text-editorial font-bold uppercase text-white">
              Lithium Power,
              <br />
              <span className="text-gradient-gold">Built To Last.</span>
            </h2>
            <p className="mt-5 text-ink-muted leading-relaxed">
              From 12V lithium starter batteries to containerized industrial energy
              storage systems &mdash; our battery division is engineered for safety,
              cycle life and export-ready certification.
            </p>
          </div>
          <Link
            href="/business/energy-solutions"
            className="inline-flex flex-shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-bright"
          >
            Explore Energy Solutions <ArrowRight size={14} />
          </Link>
        </Reveal>

        {/* Large feature battery product */}
        {hero === undefined ? (
          <Skeleton className="mb-14 aspect-[16/8] w-full rounded-[2.5rem]" />
        ) : (
          <Reveal delay={1} className="mb-14">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-bg-secondary/60 shadow-elevated">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-[4/3] lg:aspect-auto">
                  <Image
                    src="/32.jpg"
                    alt={hero.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:bg-gradient-to-r" />
                  <Badge variant="gold" className="absolute left-6 top-6">
                    Featured Battery Solution
                  </Badge>
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold-soft">
                    <BatteryCharging size={20} className="text-gold-bright" />
                  </span>
                  <h3 className="text-editorial-sm font-semibold uppercase text-white">{hero.name}</h3>
                  {hero.shortDescription && (
                    <p className="mt-4 max-w-lg leading-relaxed text-ink-muted">{hero.shortDescription}</p>
                  )}

                  {Object.keys(hero.specifications ?? {}).length > 0 && (
                    <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border-hairline pt-6 sm:grid-cols-2">
                      {Object.entries(hero.specifications)
                        .slice(0, 4)
                        .map(([key, value]) => (
                          <div key={key}>
                            <p className="text-[10px] uppercase tracking-widest text-ink-faint">{key}</p>
                            <p className="mt-0.5 text-sm font-medium text-white">{String(value)}</p>
                          </div>
                        ))}
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    {hero.isQuoteOnly ? (
                      <Link
                        href={`/request-a-quote?product=${encodeURIComponent(hero.name)}`}
                      >
                        <Button size="lg">
                          <MessageSquareText size={16} /> Request a Quote
                        </Button>
                      </Link>
                    ) : (
                      <Button size="lg" onClick={handleAddToCart}>
                        {feedback?.ok ? <Check size={16} /> : <ShoppingCart size={16} />}
                        {feedback?.ok ? "Added to Cart" : "Add to Cart"}
                        {!hero.isQuoteOnly && (
                          <span className="ml-1 font-serif text-base tabular-nums">
                            {formatPrice(hero.price ?? 0, hero.currency)}
                          </span>
                        )}
                      </Button>
                    )}
                    <Link
                      href={`/products/${hero.slug}`}
                      className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:text-gold-bright"
                    >
                      View Full Specification
                      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Supporting battery & energy product grid */}
        {products === null ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
