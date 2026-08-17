"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Zap, MessageSquareText, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Product, Category } from "@/types";
import { useCart } from "@/context/CartContext";

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(price);
}

export function ProductPurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(product.minimumOrderQuantity || 1);
  const [feedback, setFeedback] = useState<{ ok: boolean; message?: string } | null>(null);
  const inStock = product.stock > 0;
  const categoryName = typeof product.category === "object" ? (product.category as Category).name : undefined;

  function handleAddToCart(): boolean {
    const result = addItem(product, quantity);
    setFeedback(result);
    return result.ok;
  }

  function handleBuyNow() {
    if (handleAddToCart()) {
      router.push("/cart");
    }
  }

  const quoteHref = `/request-a-quote?category=${encodeURIComponent(categoryName ?? "")}&product=${encodeURIComponent(product.name)}`;

  return (
    <div>
      {categoryName && (
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-bright">{categoryName}</p>
      )}
      <h1 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{product.name}</h1>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
        <span>SKU: {product.sku}</span>
        {product.brand && (
          <>
            <span className="text-ink-faint">•</span>
            <span>Brand: {product.brand}</span>
          </>
        )}
        <span className="text-ink-faint">•</span>
        <Badge variant={inStock ? "success" : "danger"} className="text-[10px]">
          {inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>

      <div className="mt-5">
        {product.isQuoteOnly ? (
          <p className="text-lg font-semibold uppercase tracking-wide text-gold-bright">
            Price available on request
          </p>
        ) : (
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl font-semibold text-white tabular-nums">
              {formatPrice(product.price ?? 0, product.currency)}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-ink-faint line-through tabular-nums">
                {formatPrice(product.compareAtPrice, product.currency)}
              </span>
            )}
          </div>
        )}
      </div>

      {product.shortDescription && <p className="mt-4 text-sm text-ink-muted leading-relaxed">{product.shortDescription}</p>}

      {product.minimumOrderQuantity > 1 && !product.isQuoteOnly && (
        <p className="mt-3 text-xs text-ink-faint">
          Minimum order quantity: <span className="text-white">{product.minimumOrderQuantity} units</span>
        </p>
      )}

      {!product.isQuoteOnly && (
        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center rounded border border-border">
            <button
              onClick={() => setQuantity((q) => Math.max(product.minimumOrderQuantity || 1, q - 1))}
              className="flex h-11 w-11 items-center justify-center text-ink-muted transition-colors hover:text-gold-bright"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-12 text-center text-sm text-white tabular-nums">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              className="flex h-11 w-11 items-center justify-center text-ink-muted transition-colors hover:text-gold-bright"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          <span className="text-xs text-ink-faint">{product.stock} available</span>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        {product.isQuoteOnly ? (
          <Link href={quoteHref}>
            <Button size="lg">
              <MessageSquareText size={16} /> Request a Quote
            </Button>
          </Link>
        ) : (
          <>
            <Button size="lg" disabled={!inStock} onClick={handleAddToCart}>
              {feedback?.ok ? <Check size={16} /> : <ShoppingCart size={16} />}
              {feedback?.ok ? "Added to Cart" : "Add to Cart"}
            </Button>
            <Button size="lg" variant="outline" disabled={!inStock} onClick={handleBuyNow}>
              <Zap size={16} /> Buy Now
            </Button>
            <Link href={quoteHref}>
              <Button size="lg" variant="ghost">
                <MessageSquareText size={16} /> Request a Quote
              </Button>
            </Link>
          </>
        )}
      </div>

      {feedback && !feedback.ok && <p className="mt-3 text-sm text-status-danger">{feedback.message}</p>}
    </div>
  );
}
