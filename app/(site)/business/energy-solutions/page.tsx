import type { Metadata } from "next";
import { BatteryCharging, Factory, Sun, BatteryFull, Gauge, Recycle } from "lucide-react";
import {
  BusinessVerticalTemplate,
  type BusinessVerticalContent,
} from "@/components/site/BusinessVerticalTemplate";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Energy Solutions",
  description:
    "Lithium battery manufacturing, industrial battery systems and renewable energy storage solutions from Louis CALTEN International LLP.",
  keywords: [
    "lithium battery manufacturer",
    "industrial battery systems supplier",
    "EV battery packs export",
    "renewable energy storage solutions",
    "battery energy storage systems",
  ],
  openGraph: { images: [{ url: siteImages.energy }] },
};

const content: BusinessVerticalContent = {
  eyebrow: "Business",
  title: "Energy Solutions",
  heroDescription:
    "Lithium battery systems, industrial battery solutions and energy storage technologies engineered for reliability, safety and performance.",
  heroImage: siteImages.energy,
  featureImage: siteImages.sustainability,
  overview:
    "Our energy solutions division supplies lithium battery systems and industrial energy storage products to power electric vehicles, industrial equipment and renewable energy installations. We supply and trade battery technologies built to meet the growing global demand for efficient, long-life energy storage.",
  services: [
    { icon: BatteryCharging, title: "Lithium Battery Manufacturing & Supply", description: "High-density lithium battery systems for automotive and industrial use." },
    { icon: Factory, title: "Industrial Battery Systems", description: "Battery solutions engineered for industrial equipment and machinery." },
    { icon: Sun, title: "Renewable Energy Storage Systems", description: "Storage systems supporting solar and other renewable energy installations." },
    { icon: BatteryFull, title: "EV Battery Systems", description: "Battery systems and packs supporting the electric vehicle segment." },
    { icon: Gauge, title: "Energy Storage", description: "Scalable storage solutions for commercial and industrial applications." },
    { icon: Recycle, title: "Battery Life-Cycle Support", description: "Guidance on safe handling, storage and lifecycle management of battery systems." },
  ],
  applications: ["Electric Vehicles", "Industrial Equipment", "Marine", "Energy Storage", "Agriculture"],
  industries: [
    "EV Manufacturers",
    "Industrial Equipment Operators",
    "Renewable Energy Installers",
    "Battery Distributors",
    "Energy Storage Integrators",
    "Corporate Buyers",
  ],
  categorySlugs: ["lithium-batteries", "energy-solutions", "ev-components"],
};

export default function EnergySolutionsPage() {
  return <BusinessVerticalTemplate content={content} />;
}
