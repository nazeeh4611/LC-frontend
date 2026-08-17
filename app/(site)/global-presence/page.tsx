import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { ImageFeature } from "@/components/site/ImageFeature";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { GlobalPresenceMap } from "@/components/site/GlobalPresenceMap";
import { CTASection } from "@/components/site/CTASection";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Global Presence",
  description:
    "Louis CALTEN International LLP's business activities and export markets across India, UAE, the Middle East, Africa, Southeast Asia and Europe.",
  keywords: ["global automotive exporter", "international trade markets", "export presence India UAE Africa"],
  openGraph: { images: [{ url: siteImages.globalTrade }] },
};

const regions = [
  { name: "India", role: "Headquarters", status: "Active", description: "Strategic HQ managing sourcing, production, lithium battery manufacturing and global supply chain operations." },
  { name: "UAE", role: "Trade & Operations Hub", status: "Active", description: "Key operational hub for battery supply, EV components and fast Gulf-region distribution." },
  { name: "Middle East", role: "Export Market", status: "Active", description: "Growing export relationships with distributors and wholesale buyers across the region." },
  { name: "Africa", role: "Emerging Market", status: "Expanding", description: "Expanding our presence with strategic distribution partnerships and improving lead times." },
  { name: "Southeast Asia", role: "Sourcing & Export", status: "Active", description: "Regional sourcing office supporting product availability and market development." },
  { name: "Europe", role: "Export Market", status: "Emerging", description: "Early-stage export relationships as we expand into European automotive markets." },
];

export default function GlobalPresencePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Global Presence" }]} />
      <PageHero
        eyebrow="Worldwide"
        title="Our Global Presence"
        description="From our headquarters in India to trade and distribution activity across the Middle East, Africa, Southeast Asia and Europe, Louis CALTEN International LLP connects manufacturers and buyers across borders."
        image={siteImages.globalTrade}
        imageAlt="Aerial view of a global shipping port"
      />

      <Section eyebrow="Reach" title="Where We Operate">
        <GlobalPresenceMap />
      </Section>

      <ImageFeature
        eyebrow="On The Ground"
        title="Supply chains built on real relationships."
        description="Behind every shipment is a network of warehouses, distributors and trade partners we've built over years — coordinated end-to-end so products move reliably across borders."
        image={siteImages.warehouse}
        imageAlt="Warehouse and logistics operations"
        reverse
        className="border-t border-border-hairline"
      />

      <Section
        eyebrow="Regions"
        title="Business Activity By Region"
        className="border-t border-border-hairline"
      >
        <div className="grid grid-cols-1 divide-y divide-border-hairline border-y border-border-hairline sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
          {regions.map((region) => (
            <div key={region.name} className="px-1 py-8 sm:px-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                  {region.name}
                </h3>
                <Badge variant={region.status === "Active" ? "success" : "warning"}>
                  {region.status}
                </Badge>
              </div>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gold-bright">
                {region.role}
              </p>
              <p className="mt-3 text-sm text-ink-muted leading-relaxed">{region.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Markets" title="Export Markets We Serve" className="border-t border-border-hairline">
        <div className="flex flex-wrap gap-3">
          {["India", "UAE", "Saudi Arabia", "Middle East", "East Africa", "West Africa", "Southeast Asia", "Europe"].map(
            (market) => (
              <Badge key={market} variant="gold" className="px-4 py-2 text-sm">
                {market}
              </Badge>
            )
          )}
        </div>
      </Section>

      <CTASection
        eyebrow="Let's Connect"
        title="Looking to source or distribute in your region?"
        description="Reach out to our trade team to discuss export opportunities and distribution partnerships."
      />
    </>
  );
}
