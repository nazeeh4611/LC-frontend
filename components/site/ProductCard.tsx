"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye, MessageSquareText, Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Product, Category } from "@/types";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(price);
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [feedback, setFeedback] = useState<{ ok: boolean; message?: string } | null>(null);
  const categoryName = typeof product.category === "object" ? (product.category as Category).name : undefined;
  const inStock = product.stock > 0;

  function handleAddToCart() {
    const result = addItem(product);
    setFeedback(result);
    setTimeout(() => setFeedback(null), 2500);
  }

  return (
    <Card className="group flex flex-col overflow-hidden rounded-2xl border-border-hairline bg-bg-secondary/50 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-gold/30 hover:shadow-elevated">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-bg-elevated">
        {product.thumbnail || product.images[0]?.url ? (
          <Image
            src={product.thumbnail || product.images[0]?.url || "/1.png"}
            alt={product.images[0]?.alt ?? product.name}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-ink-faint">No image available</div>
        )}
        {product.bestseller && (
          <Badge variant="gold" className="absolute left-3 top-3">
            Bestseller
          </Badge>
        )}
        {!inStock && !product.isQuoteOnly && (
          <Badge variant="danger" className="absolute right-3 top-3">
            Out of Stock
          </Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {categoryName && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-bright">{categoryName}</p>
        )}
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-gold-bright">
            {product.name}
          </h3>
        </Link>
        {product.shortDescription && (
          <p className="mt-1.5 line-clamp-2 text-xs text-ink-muted">{product.shortDescription}</p>
        )}
        <p className="mt-2 text-[11px] text-ink-faint">SKU: {product.sku}</p>

        <div className="mt-3 flex items-center justify-between">
          {product.isQuoteOnly ? (
            <span className="text-xs font-semibold uppercase tracking-wide text-gold-bright">Quote Only</span>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg font-semibold text-white tabular-nums">
                {formatPrice(product.price ?? 0, product.currency)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-ink-faint line-through tabular-nums">
                  {formatPrice(product.compareAtPrice, product.currency)}
                </span>
              )}
            </div>
          )}
          <Badge variant={inStock ? "success" : "danger"} className="text-[10px]">
            {inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>

        <div className="mt-4 flex gap-2">
          {product.isQuoteOnly ? (
            <Link href={`/request-a-quote?category=${encodeURIComponent(categoryName ?? "")}&product=${encodeURIComponent(product.name)}`} className="flex-1">
              <Button size="sm" variant="outline" className="w-full">
                <MessageSquareText size={14} /> Request Quote
              </Button>
            </Link>
          ) : (
            <Button
              size="sm"
              className="flex-1"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              {feedback?.ok ? <Check size={14} /> : <ShoppingCart size={14} />}
              {feedback?.ok ? "Added" : "Add to Cart"}
            </Button>
          )}
          <Link href={`/products/${product.slug}`}>
            <Button size="sm" variant="ghost" aria-label="View details">
              <Eye size={16} />
            </Button>
          </Link>
        </div>

        {feedback && !feedback.ok && (
          <p className={cn("mt-2 text-xs text-status-danger")}>{feedback.message}</p>
        )}
      </div>
    </Card>
  );
}
