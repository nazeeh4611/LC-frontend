import type { Metadata } from "next";
import { Globe2, Ship, Warehouse, Route, FileCheck2, Handshake } from "lucide-react";
import {
  BusinessVerticalTemplate,
  type BusinessVerticalContent,
} from "@/components/site/BusinessVerticalTemplate";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Global Trading",
  description:
    "International import & export, global sourcing, and distribution & supply chain services from Louis CALTEN International LLP.",
  keywords: [
    "global trading company",
    "international import export services",
    "wholesale supply chain B2B",
    "global sourcing agent automotive",
    "export documentation services",
  ],
  openGraph: { images: [{ url: siteImages.globalTrade }] },
};

const content: BusinessVerticalContent = {
  eyebrow: "Business",
  title: "Global Trading",
  heroDescription:
    "Connecting global markets through reliable import, export, sourcing and distribution operations across our key trading regions.",
  heroImage: siteImages.globalTrade,
  featureImage: siteImages.warehouse,
  overview:
    "Our global trading division manages the sourcing, import, export and distribution of automotive and energy products across international markets. We work with manufacturers and buyers across India, the UAE, the Middle East, Africa, Southeast Asia and Europe to build efficient, reliable supply chains.",
  services: [
    { icon: Globe2, title: "International Import & Export", description: "End-to-end handling of cross-border trade documentation and logistics." },
    { icon: Warehouse, title: "Global Sourcing", description: "Sourcing quality products from vetted manufacturers and suppliers worldwide." },
    { icon: Route, title: "Distribution & Supply Chain", description: "Coordinated distribution networks supporting timely regional delivery." },
    { icon: Ship, title: "Wholesale Trading", description: "Bulk wholesale supply arrangements for distributors and corporate buyers." },
    { icon: FileCheck2, title: "Export Documentation", description: "Complete export documentation support including invoices and certificates." },
    { icon: Handshake, title: "Corporate Supply Agreements", description: "Structured supply agreements for garages, dealers and distributors." },
  ],
  applications: ["Wholesale Distribution", "Corporate Procurement", "Cross-Border Trade", "Bulk Export Orders"],
  industries: [
    "International Wholesale Buyers",
    "Import/Export Traders",
    "Automotive Distributors",
    "Corporate Procurement Teams",
    "Regional Distribution Partners",
    "Retail Buyers",
  ],
  categorySlugs: ["automotive-parts", "lithium-batteries"],
};

export default function GlobalTradingPage() {
  return <BusinessVerticalTemplate content={content} />;
}
