import type { Metadata } from "next";
import {
  MessageSquare,
  FileText,
  Factory,
  ShieldCheck,
  ClipboardCheck,
  Ship,
  Globe2,
  Truck,
  Clock,
  FileCheck2,
} from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { ImageFeature } from "@/components/site/ImageFeature";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/site/CTASection";
import { Reveal } from "@/components/ui/Reveal";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Export & Trade",
  description:
    "Louis CALTEN International LLP's export and trade process — from inquiry to shipping — plus global sourcing and documentation support.",
  keywords: ["automotive parts export process", "global sourcing documentation", "wholesale export shipping"],
  openGraph: { images: [{ url: siteImages.globalTrade }] },
};

const processSteps = [
  { icon: MessageSquare, step: "01", title: "Inquiry", description: "We receive your product inquiry and requirements." },
  { icon: FileText, step: "02", title: "Quotation", description: "Best competitive quotation and pricing for your order." },
  { icon: Factory, step: "03", title: "Production / Procurement", description: "Timely sourcing and private-label production coordination." },
  { icon: ShieldCheck, step: "04", title: "Quality Check", description: "100% quality checking and testing before dispatch." },
  { icon: ClipboardCheck, step: "05", title: "Documentation", description: "Complete export documentation and compliance paperwork." },
  { icon: Ship, step: "06", title: "Shipping", description: "Global shipping and delivery coordination." },
];

const capabilities = [
  { icon: Globe2, title: "Global Sourcing", description: "Sourced across trusted manufacturers worldwide." },
  { icon: Truck, title: "Door-to-Port / Door-to-Door", description: "Flexible delivery terms tailored to buyer needs." },
  { icon: Clock, title: "Timely Delivery", description: "Reliable lead times across all major export markets." },
  { icon: FileCheck2, title: "Complete Documentation", description: "Export invoices, certificates and shipping paperwork." },
];

export default function ExportTradePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Export & Trade" }]} />
      <PageHero
        eyebrow="Trade"
        title="Export & Global Trade"
        description="Connecting global markets with quality products and a reliable supply chain — from first inquiry through to final delivery."
        image={siteImages.globalTrade}
        imageAlt="Container port supporting global export"
      />

      <Section eyebrow="How It Works" title="Our Export Process">
        <div className="grid grid-cols-1 divide-y divide-border-hairline border-y border-border-hairline sm:grid-cols-2 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {processSteps.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.step}
                delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                className="relative px-1 py-8 sm:px-6"
              >
                <span className="absolute right-1 top-6 font-serif text-4xl font-semibold text-gold/15 sm:right-6">
                  {item.step}
                </span>
                <Icon size={22} className="text-gold-bright" />
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-white">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[16rem] text-sm text-ink-muted leading-relaxed">{item.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <ImageFeature
        eyebrow="Built For Trade"
        title="Global sourcing, delivered reliably."
        description="Every order moves through a coordinated network of sourcing partners, warehouses and freight relationships — built for consistent lead times across our major export corridors."
        image={siteImages.warehouse}
        imageAlt="Warehouse coordinating global exports"
        reverse
        className="border-t border-border-hairline"
      >
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-3">
                <Icon size={18} className="mt-0.5 flex-shrink-0 text-gold-bright" />
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ImageFeature>

      <CTASection
        eyebrow="Start Trading With Us"
        title="Ready to place an export or wholesale order?"
        description="Share your product requirements, target quantity and destination — our trade team will respond with a quotation."
      />
    </>
  );
}
