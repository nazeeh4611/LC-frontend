"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { useCart } from "@/context/CartContext";
import { TAX_RATE, DEFAULT_SHIPPING_ESTIMATE } from "@/lib/pricing";

function formatPrice(price: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(price);
}

export default function CartPage() {
  const router = useRouter();
  const { items, subtotal, removeItem, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  const shippingEstimate = items.length > 0 ? DEFAULT_SHIPPING_ESTIMATE : 0;
  const taxEstimate = subtotal * TAX_RATE;
  const total = subtotal + shippingEstimate + taxEstimate;

  function handleCheckout() {
    router.push("/checkout");
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "Cart" }]} />

      <section className="py-12 md:py-16">
        <Container>
          <h1 className="mb-8 text-2xl font-semibold text-white">
            Your Cart {items.length > 0 && <span className="text-ink-muted">({items.length} item{items.length === 1 ? "" : "s"})</span>}
          </h1>

          {items.length === 0 ? (
            <EmptyState
              title="Your cart is empty"
              message="Browse our catalog to add automotive parts and battery systems to your cart."
              actionLabel="Explore Products"
              onAction={() => router.push("/products")}
              className="py-24"
            />
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                {items.map((item) => (
                  <Card key={item.productId} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                    <Link
                      href={`/products/${item.slug}`}
                      className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded border border-border bg-bg-elevated"
                    >
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      ) : null}
                    </Link>

                    <div className="min-w-0 flex-1">
                      <Link href={`/products/${item.slug}`} className="text-sm font-medium text-white hover:text-gold-bright">
                        {item.name}
                      </Link>
                      <p className="mt-1 text-xs text-ink-faint">SKU: {item.sku}</p>
                      <p className="mt-1 text-sm font-semibold text-gold-bright tabular-nums">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center rounded border border-border">
                      <button
                        onClick={() => decreaseQuantity(item.productId)}
                        className="flex h-9 w-9 items-center justify-center text-ink-muted hover:text-gold-bright"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-10 text-center text-sm text-white tabular-nums">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.productId)}
                        className="flex h-9 w-9 items-center justify-center text-ink-muted hover:text-gold-bright"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <p className="w-24 flex-shrink-0 text-right text-sm font-semibold text-white tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </p>

                    <button
                      onClick={() => removeItem(item.productId)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="flex-shrink-0 text-ink-faint transition-colors hover:text-status-danger"
                    >
                      <Trash2 size={16} />
                    </button>
                  </Card>
                ))}

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
                  <Link href="/products">
                    <Button variant="outline" size="sm">
                      Continue Shopping
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={clearCart}>
                    <Trash2 size={14} /> Clear Cart
                  </Button>
                </div>
              </div>

              <div>
                <Card className="sticky top-24 p-6">
                  <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-gold-bright">
                    Order Summary
                  </h2>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-ink-muted">
                      <span>Subtotal</span>
                      <span className="tabular-nums text-white">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-ink-muted">
                      <span>Shipping (est.)</span>
                      <span className="tabular-nums text-white">{formatPrice(shippingEstimate)}</span>
                    </div>
                    <div className="flex justify-between text-ink-muted">
                      <span>Tax (est.)</span>
                      <span className="tabular-nums text-white">{formatPrice(taxEstimate)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between border-t border-border-hairline pt-4">
                    <span className="text-sm font-semibold uppercase text-white">Total</span>
                    <span className="font-serif text-2xl font-semibold text-gold-bright tabular-nums">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-ink-faint">
                    Final shipping and tax are calculated at checkout based on your delivery address and chosen
                    shipping method.
                  </p>
                  <Button size="lg" className="mt-5 w-full" onClick={handleCheckout}>
                    <ShoppingBag size={16} /> Proceed to Checkout <ArrowRight size={16} />
                  </Button>
                </Card>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
