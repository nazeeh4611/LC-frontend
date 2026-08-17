import type { Metadata } from "next";
import { Cog, Wrench, Sparkles, Zap, Settings2, Car } from "lucide-react";
import {
  BusinessVerticalTemplate,
  type BusinessVerticalContent,
} from "@/components/site/BusinessVerticalTemplate";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Automotive Solutions",
  description:
    "Auto parts, EV components, car accessories, detailing products and OEM manufacturing from Louis CALTEN International LLP — global automotive sourcing and wholesale supply.",
  keywords: [
    "automotive spare parts supplier",
    "auto parts wholesale export",
    "EV components sourcing",
    "car accessories trading company",
    "OEM automotive manufacturing",
  ],
  openGraph: { images: [{ url: siteImages.automotive }] },
};

const content: BusinessVerticalContent = {
  eyebrow: "Business",
  title: "Automotive Solutions",
  heroDescription:
    "High-quality automotive parts, components and accessories sourced, traded and supplied to distributors, garages and service centers worldwide.",
  heroImage: siteImages.automotive,
  featureImage: siteImages.warehouse,
  overview:
    "Our automotive solutions division covers the full range of spare parts and accessories that keep vehicles running — from engine components to detailing products. We work with vetted manufacturers and suppliers to bring reliable, quality-tested parts to distributors, retailers and service centers across our export markets.",
  services: [
    { icon: Cog, title: "Auto Parts Manufacturing & Trading", description: "Sourcing and trading of engine, brake, suspension and drivetrain components." },
    { icon: Zap, title: "EV Components", description: "Components and parts supporting the growing electric vehicle segment." },
    { icon: Settings2, title: "OEM & Customized Manufacturing", description: "Custom-specification manufacturing arrangements for corporate buyers." },
    { icon: Sparkles, title: "Detailing Products", description: "Automotive care, cleaning and detailing products for retail and professional use." },
    { icon: Car, title: "Car Accessories", description: "A wide range of accessories for personal and commercial vehicles." },
    { icon: Wrench, title: "Aftermarket Parts Supply", description: "Reliable aftermarket parts supply for garages and repair networks." },
  ],
  applications: ["Passenger Vehicles", "Commercial Vehicles", "Electric Vehicles", "Two-Wheelers", "Fleet Maintenance"],
  industries: [
    "Automotive Distributors",
    "Garages & Service Centers",
    "Car Accessory Retailers",
    "Auto Detailing Businesses",
    "Fleet Operators",
    "OEM & Aftermarket Buyers",
  ],
  categorySlugs: ["automotive-parts", "car-accessories"],
};

export default function AutomotiveSolutionsPage() {
  return <BusinessVerticalTemplate content={content} />;
}
