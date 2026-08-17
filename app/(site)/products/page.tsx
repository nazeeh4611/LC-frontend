import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/site/ProductGrid";
import { siteImages } from "@/lib/images";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description:
    "High quality automotive parts, EV components, lithium battery systems and industrial energy solutions from Louis CALTEN International LLP.",
  keywords: ["automotive parts catalog", "lithium battery products", "EV components wholesale", "industrial energy solutions"],
  openGraph: { images: [{ url: siteImages.automotive }] },
};

export default function ProductsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Products" }]} />
      <PageHero
        eyebrow="Our Products"
        title="High Quality Products For Every Industry"
        description="Explore our range of automotive parts, lithium battery systems, EV components and industrial energy solutions. We are here for you."
        image={siteImages.automotive}
        imageAlt="Precision automotive components"
      />
      <section className="py-16 md:py-20">
        <Container>
          <ProductGrid />
        </Container>
      </section>
    </>
  );
}
