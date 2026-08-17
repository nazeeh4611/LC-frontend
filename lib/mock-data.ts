import { Category, Product } from "@/types";
import { siteImages } from "@/lib/images";

/**
 * TEMPORARY MOCK DATA
 * --------------------
 * Structured exactly like the real backend Product/Category model so it can
 * be swapped for live API data with zero changes to any component. Used only
 * as a fallback (see services/products.service.ts and
 * services/categories.service.ts) when the backend API is unreachable.
 */

function iso(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

export const mockCategories: Category[] = [
  {
    _id: "cat-automotive-parts",
    name: "Automotive Parts",
    slug: "automotive-parts",
    description: "Engine, brake, suspension and drivetrain components for passenger and commercial vehicles.",
    icon: "cog",
    displayOrder: 1,
    active: true,
  },
  {
    _id: "cat-ev-components",
    name: "EV Components",
    slug: "ev-components",
    description: "Motors, chargers and control systems supporting the electric vehicle segment.",
    icon: "zap",
    displayOrder: 2,
    active: true,
  },
  {
    _id: "cat-lithium-batteries",
    name: "Lithium Batteries",
    slug: "lithium-batteries",
    description: "Lithium battery cells, packs and starter batteries for automotive and portable use.",
    icon: "battery-charging",
    displayOrder: 3,
    active: true,
  },
  {
    _id: "cat-energy-solutions",
    name: "Industrial Energy Solutions",
    slug: "energy-solutions",
    description: "Containerized energy storage, inverters and UPS systems for industrial and renewable applications.",
    icon: "sun",
    displayOrder: 4,
    active: true,
  },
  {
    _id: "cat-car-accessories",
    name: "Car Accessories",
    slug: "car-accessories",
    description: "Detailing, lighting and interior accessories for personal and commercial vehicles.",
    icon: "sparkles",
    displayOrder: 5,
    active: true,
  },
];

function categoryFor(slug: string): Category {
  return mockCategories.find((c) => c.slug === slug)!;
}

function img(url: string, alt: string) {
  return { url, alt };
}

export const mockProducts: Product[] = [
  // ── Automotive Parts ─────────────────────────────────────────────
  {
    _id: "prod-01",
    name: "Performance Brake Disc Rotor Set",
    slug: "performance-brake-disc-rotor-set",
    sku: "LC-BRK-1042",
    category: categoryFor("automotive-parts"),
    subcategory: "Brake Systems",
    brand: "Louis CALTEN",
    shortDescription: "Ventilated front brake disc set engineered for consistent stopping power under heavy load.",
    description:
      "Precision-machined ventilated brake disc rotors built for passenger and light commercial vehicles. Manufactured from high-carbon cast iron with anti-corrosion coating and balanced for vibration-free braking. Tested to international quality and safety standards before every shipment.",
    price: 128,
    compareAtPrice: 155,
    currency: "USD",
    stock: 420,
    lowStockThreshold: 40,
    minimumOrderQuantity: 20,
    images: [img(siteImages.brakeDisc, "Ventilated brake disc rotor"), img(siteImages.automotiveParts, "Brake rotor detail")],
    thumbnail: siteImages.brakeDisc,
    specifications: { Material: "High-carbon cast iron", Diameter: "300mm", Type: "Ventilated", Coating: "Anti-corrosion black" },
    applications: ["Passenger Vehicles", "Commercial Vehicles"],
    compatibleVehicles: ["Toyota Hilux", "Nissan Navara", "Ford Ranger"],
    documents: [{ label: "Product Datasheet (PDF)", url: "/documents/brake-disc-datasheet.pdf" }],
    tags: ["brakes", "aftermarket", "bestseller"],
    featured: true,
    bestseller: true,
    active: true,
    isQuoteOnly: false,
    createdAt: iso(60),
    updatedAt: iso(3),
  },
  // ── EV Components ────────────────────────────────────────────────
  {
    _id: "prod-08",
    name: "EV Onboard Charger Module",
    slug: "ev-onboard-charger-module",
    sku: "LC-OBC-6110",
    category: categoryFor("ev-components"),
    subcategory: "Charging Systems",
    brand: "Louis CALTEN",
    shortDescription: "Compact onboard AC charger module with integrated thermal management.",
    description:
      "A compact onboard charger module converting AC input to regulated DC for EV battery packs, with integrated thermal management and CAN-bus communication for platform integration.",
    price: 640,
    currency: "USD",
    stock: 45,
    lowStockThreshold: 10,
    minimumOrderQuantity: 5,
    images: [img(siteImages.evCharging, "EV onboard charger module"), img("/21.png", "Battery technology comparison for EV platforms")],
    thumbnail: siteImages.evCharging,
    specifications: { Input: "AC 90-264V", Output: "3.3kW / 6.6kW variants", Communication: "CAN-bus" },
    applications: ["Electric Vehicles"],
    compatibleVehicles: ["EV platform integration (project-based)"],
    documents: [],
    tags: ["ev", "charging"],
    featured: false,
    bestseller: false,
    active: true,
    isQuoteOnly: false,
    createdAt: iso(65),
    updatedAt: iso(15),
  },
  // ── Lithium Batteries ────────────────────────────────────────────
  {
    _id: "prod-13",
    name: "LC Sodium Buck 12V VRLA Starter Battery",
    slug: "lc-sodium-buck-12v-vrla-starter-battery",
    sku: "LC-BAT-1210",
    category: categoryFor("lithium-batteries"),
    subcategory: "Starter Batteries",
    brand: "Louis CALTEN",
    shortDescription: "Sealed, non-spillable 12V VRLA battery built for wide-temperature automotive and industrial use.",
    description:
      "The LC Sodium Buck is our flagship valve-regulated lead-acid (VRLA) battery — sealed, maintenance-free and non-spillable, engineered for reliable performance from -20°C to 60°C. Backed by a 10-year design life and manufactured to international safety standards for automotive starter and industrial standby applications.",
    price: 118,
    compareAtPrice: 139,
    currency: "USD",
    stock: 620,
    lowStockThreshold: 60,
    minimumOrderQuantity: 10,
    images: [
      img("/1.png", "LC Sodium Buck 12V 10Ah VRLA battery — Gold Series"),
      img("/10.jpg", "LC Sodium Buck 12V VRLA battery — Performance Red Series"),
      img("/16.jpg", "LC Sodium Buck 12V VRLA battery — Eco Green Series"),
    ],
    thumbnail: "/1.png",
    specifications: {
      "Nominal Voltage": "12V",
      Capacity: "10Ah @ 20HR",
      Type: "Valve Regulated Lead Acid (VRLA)",
      "Operating Temperature": "-20°C to 60°C",
      "Design Life": "10 Years",
      Casing: "Sealed, non-spillable, maintenance-free",
    },
    applications: ["Automotive Starter Power", "Industrial Standby", "Backup Power"],
    compatibleVehicles: ["Universal 12V fitment"],
    documents: [{ label: "Product Datasheet (PDF)", url: "/documents/lc-sodium-buck-datasheet.pdf" }],
    tags: ["battery", "lithium", "vrla", "bestseller"],
    featured: true,
    bestseller: true,
    active: true,
    isQuoteOnly: false,
    createdAt: iso(90),
    updatedAt: iso(18),
  },
  // ── Industrial Energy Solutions ──────────────────────────────────
  {
    _id: "prod-16",
    name: "Solar-Ready Hybrid Inverter Unit",
    slug: "solar-ready-hybrid-inverter-unit",
    sku: "LC-INV-8120",
    category: categoryFor("energy-solutions"),
    subcategory: "Power Conversion",
    brand: "Louis CALTEN",
    shortDescription: "Hybrid inverter supporting solar input, battery storage and grid backup.",
    description:
      "A hybrid inverter system supporting solar PV input, lithium battery storage and seamless grid backup switching — suited for commercial rooftop installations and off-grid industrial sites across our export markets.",
    price: 980,
    currency: "USD",
    stock: 40,
    lowStockThreshold: 8,
    minimumOrderQuantity: 2,
    images: [img(siteImages.solarField, "Solar installation with hybrid inverter"), img("/16.jpg", "LC Sodium Buck battery — Eco Green Series for renewable storage")],
    thumbnail: siteImages.solarField,
    specifications: { "Rated Power": "10kW / 20kW variants", Input: "Solar PV + Grid + Battery", Efficiency: "97.5%" },
    applications: ["Renewable Integration", "Energy Storage"],
    compatibleVehicles: [],
    documents: [],
    tags: ["energy", "solar", "inverter"],
    featured: false,
    bestseller: false,
    active: true,
    isQuoteOnly: false,
    createdAt: iso(70),
    updatedAt: iso(12),
  },
  // ── Car Accessories ──────────────────────────────────────────────
  {
    _id: "prod-18",
    name: "Premium Interior Detailing Kit",
    slug: "premium-interior-detailing-kit",
    sku: "LC-ACC-9010",
    category: categoryFor("car-accessories"),
    subcategory: "Detailing",
    brand: "Louis CALTEN",
    shortDescription: "Complete interior care kit for dashboards, upholstery and leather trim.",
    description:
      "A complete interior detailing kit including dashboard cleaner, upholstery shampoo, leather conditioner and applicator pads — packaged for retail and professional detailing businesses.",
    price: 34,
    currency: "USD",
    stock: 1200,
    lowStockThreshold: 150,
    minimumOrderQuantity: 50,
    images: [img(siteImages.carAccessories, "Interior detailing kit"), img(siteImages.automotiveWorkshop, "Car interior being detailed")],
    thumbnail: siteImages.carAccessories,
    specifications: { Includes: "Cleaner, shampoo, conditioner, applicators", Suitable: "Leather, fabric, plastic trim" },
    applications: ["Auto Detailing Businesses", "Retail"],
    compatibleVehicles: ["Universal fitment"],
    documents: [],
    tags: ["accessories", "detailing", "retail"],
    featured: false,
    bestseller: true,
    active: true,
    isQuoteOnly: false,
    createdAt: iso(38),
    updatedAt: iso(8),
  },
];

// ── Query helpers (replicate the backend's filter / sort / paginate logic) ──

export interface MockProductQuery {
  search?: string;
  category?: string; // category _id
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  availability?: string; // in_stock | out_of_stock
  type?: string; // featured | bestseller | quote_only
  sort?: string;
  page?: string;
  limit?: string;
}

export function queryMockProducts(params: MockProductQuery = {}) {
  let items = [...mockProducts];

  if (params.search) {
    const q = params.search.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (params.category) {
    items = items.filter((p) => (typeof p.category === "object" ? p.category._id : p.category) === params.category);
  }

  if (params.brand) {
    items = items.filter((p) => p.brand?.toLowerCase() === params.brand?.toLowerCase());
  }

  if (params.minPrice) {
    const min = Number(params.minPrice);
    items = items.filter((p) => (p.price ?? 0) >= min);
  }

  if (params.maxPrice) {
    const max = Number(params.maxPrice);
    items = items.filter((p) => (p.price ?? 0) <= max);
  }

  if (params.availability === "in_stock") {
    items = items.filter((p) => p.stock > 0);
  } else if (params.availability === "out_of_stock") {
    items = items.filter((p) => p.stock === 0);
  }

  if (params.type === "featured") {
    items = items.filter((p) => p.featured);
  } else if (params.type === "bestseller") {
    items = items.filter((p) => p.bestseller);
  } else if (params.type === "quote_only") {
    items = items.filter((p) => p.isQuoteOnly);
  }

  switch (params.sort) {
    case "price_asc":
      items.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      break;
    case "price_desc":
      items.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      break;
    case "name_asc":
      items.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "bestseller":
    case "popularity":
      items.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
      break;
    case "newest":
    default:
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
  }

  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.max(1, Number(params.limit) || 12);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const pageItems = items.slice(start, start + limit);

  return {
    items: pageItems,
    pagination: { page, limit, total, totalPages },
  };
}

export function findMockProductBySlug(slug: string) {
  const product = mockProducts.find((p) => p.slug === slug);
  if (!product) return null;
  const categoryId = typeof product.category === "object" ? product.category._id : product.category;
  const related = mockProducts
    .filter((p) => p.slug !== slug && (typeof p.category === "object" ? p.category._id : p.category) === categoryId)
    .slice(0, 4);
  return { product, related };
}

export function searchMockSuggestions(q: string) {
  const query = q.toLowerCase();
  return mockProducts.filter((p) => p.name.toLowerCase().includes(query) || p.tags.some((t) => t.includes(query))).slice(0, 6);
}
