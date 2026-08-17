import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Product } from "@/types";

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(price);
}

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
      {products.map((product) => (
        <Link key={product._id} href={`/products/${product.slug}`}>
          <Card className="group flex flex-col overflow-hidden">
            <div className="relative aspect-square overflow-hidden bg-bg-elevated">
              {product.thumbnail ?? product.images?.[0]?.url ? (
                <Image
                  src={product.thumbnail ?? product.images[0].url}
                  alt={product.name}
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-ink-faint">No image</div>
              )}
            </div>
            <div className="p-4">
              <p className="line-clamp-2 text-xs font-medium text-white group-hover:text-gold-bright">
                {product.name}
              </p>
              <div className="mt-2">
                {product.isQuoteOnly ? (
                  <Badge variant="gold" className="text-[10px]">Quote Only</Badge>
                ) : (
                  <span className="text-sm font-semibold text-gold-bright tabular-nums">
                    {formatPrice(product.price ?? 0, product.currency)}
                  </span>
                )}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
