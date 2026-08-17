import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { ProductGallery } from "@/components/site/ProductGallery";
import { ProductPurchasePanel } from "@/components/site/ProductPurchasePanel";
import { RelatedProducts } from "@/components/site/RelatedProducts";
import { fetchProductBySlug } from "@/services/products.service";
import { Category } from "@/types";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const result = await fetchProductBySlug(params.slug);
  if (!result.success) return { title: "Product Not Found" };

  const { product } = result.data;
  const title = product.seoTitle || product.name;
  const description = product.seoDescription || product.shortDescription || product.description.slice(0, 160);
  const image = product.thumbnail || product.images?.[0]?.url;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const result = await fetchProductBySlug(params.slug);
  if (!result.success) notFound();

  const { product, related } = result.data;
  const categoryName = typeof product.category === "object" ? (product.category as Category).name : undefined;
  const categorySlug = typeof product.category === "object" ? (product.category as Category).slug : undefined;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.shortDescription || product.description,
    image: product.images?.map((i) => i.url),
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    ...(product.isQuoteOnly
      ? {}
      : {
          offers: {
            "@type": "Offer",
            priceCurrency: product.currency,
            price: product.price,
            availability:
              product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Products", item: "/products" },
      ...(categoryName
        ? [{ "@type": "ListItem", position: 3, name: categoryName, item: `/products?category=${categorySlug}` }]
        : []),
      { "@type": "ListItem", position: categoryName ? 4 : 3, name: product.name },
    ],
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Breadcrumbs
        items={[
          { label: "Products", href: "/products" },
          ...(categoryName ? [{ label: categoryName, href: `/products?category=${categorySlug}` }] : []),
          { label: product.name },
        ]}
      />

      <section className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <ProductGallery images={product.images} name={product.name} />
            <ProductPurchasePanel product={product} />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-4 text-lg font-semibold text-white">Description</h2>
              <p className="text-sm leading-relaxed text-ink-muted">{product.description}</p>

              {Object.keys(product.specifications ?? {}).length > 0 && (
                <div className="mt-10">
                  <h2 className="mb-4 text-lg font-semibold text-white">Specifications</h2>
                  <div className="overflow-hidden rounded-md border border-border">
                    {Object.entries(product.specifications).map(([key, value], i) => (
                      <div
                        key={key}
                        className={`flex justify-between px-4 py-3 text-sm ${i % 2 === 0 ? "bg-bg-elevated" : ""}`}
                      >
                        <span className="text-ink-muted">{key}</span>
                        <span className="text-white">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.applications?.length > 0 && (
                <div className="mt-10">
                  <h2 className="mb-4 text-lg font-semibold text-white">Applications</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app) => (
                      <Badge key={app} variant="gold">
                        {app}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {product.compatibleVehicles?.length > 0 && (
                <div className="mt-10">
                  <h2 className="mb-4 text-lg font-semibold text-white">Compatibility</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.compatibleVehicles.map((v) => (
                      <Badge key={v} variant="neutral">
                        {v}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {product.documents?.length > 0 && (
                <div className="mt-10">
                  <h2 className="mb-4 text-lg font-semibold text-white">Documents</h2>
                  <div className="space-y-2">
                    {product.documents.map((doc) => (
                      <a
                        key={doc.url}
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded border border-border-hairline bg-bg-elevated px-4 py-2.5 text-sm text-gold-bright hover:border-gold-bright"
                      >
                        {doc.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="rounded-md border border-border-hairline bg-bg-secondary/40 p-5 text-sm text-ink-muted">
                <p className="mb-2 font-medium text-white">Need bulk pricing?</p>
                <p>
                  This product supports wholesale and corporate purchase orders. Use the &quot;Request a
                  Quote&quot; option for volume pricing and export documentation.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <Section eyebrow="You May Also Like" title="Related Products" className="border-t border-border-hairline bg-bg-secondary/40">
          <RelatedProducts products={related} />
        </Section>
      )}
    </>
  );
}
