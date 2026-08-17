import type { MetadataRoute } from "next";
import { fetchProducts } from "@/services/products.service";
import { articles } from "@/lib/articles";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const STATIC_ROUTES = [
  "",
  "/about",
  "/business",
  "/business/automotive-solutions",
  "/business/energy-solutions",
  "/business/global-trading",
  "/products",
  "/global-presence",
  "/export-trade",
  "/sustainability",
  "/careers",
  "/insights",
  "/contact",
  "/request-a-quote",
  "/legal/privacy-policy",
  "/legal/terms",
  "/legal/refund-policy",
  "/legal/shipping-policy",
  "/legal/cookie-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/insights/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // Product slugs are fetched live so new catalog items show up without a
  // redeploy. If the API isn't reachable at build/request time, the
  // sitemap still returns the static + article entries above rather than
  // failing entirely.
  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const result = await fetchProducts({ limit: "100" });
    if (result.success) {
      productEntries = result.data.items.map((product) => ({
        url: `${SITE_URL}/products/${product.slug}`,
        lastModified: new Date(product.updatedAt),
        changeFrequency: "weekly",
        priority: 0.6,
      }));
    }
  } catch {
    // API unreachable -- fall through with static + article entries only.
  }

  return [...staticEntries, ...articleEntries, ...productEntries];
}
