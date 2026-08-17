import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/site/home/Hero";
import { BusinessVerticals } from "@/components/site/home/BusinessVerticals";
import { AutomotiveSection } from "@/components/site/home/AutomotiveSection";
import { EnergySection } from "@/components/site/home/EnergySection";
import { BatteryShowcase } from "@/components/site/home/BatteryShowcase";
import { GlobalTradeSection } from "@/components/site/home/GlobalTradeSection";
import { FacilitiesGallery } from "@/components/site/home/FacilitiesGallery";
import { TrustSection } from "@/components/site/TrustSection";
import { FeaturedProducts } from "@/components/site/FeaturedProducts";
import { WhyChooseUsSection } from "@/components/site/WhyChooseUsSection";
import { InsightsPreview } from "@/components/site/InsightsPreview";
import { CTASection } from "@/components/site/CTASection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const regionCards = [
  {
    region: "India",
    role: "Headquarters",
    description:
      "Strategic HQ managing sourcing, production, lithium battery manufacturing and global supply chain operations.",
  },
  {
    region: "UAE",
    role: "Trade & Operations Hub",
    description:
      "Key operational hub for EV components, battery supply and fast Gulf-region distribution.",
  },
  {
    region: "Africa",
    role: "Emerging Markets",
    description:
      "Expanding our presence with strategic warehouse partnerships and improving lead times.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <BusinessVerticals />

      <AutomotiveSection />

      <EnergySection />

      <BatteryShowcase />

      <FeaturedProducts />

      <WhyChooseUsSection />

      <FacilitiesGallery />

      <GlobalTradeSection regionCards={regionCards} />

      <TrustSection />

      {/* Insights */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal className="mb-14 max-w-2xl md:mb-16">
            <SectionLabel>Newsroom</SectionLabel>
            <h2 className="text-editorial font-bold uppercase text-white">
              Insights <span className="text-gradient-gold">&amp; News.</span>
            </h2>
          </Reveal>
          <InsightsPreview />
          <div className="mt-12 text-center">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-bright"
            >
              View All News <ArrowRight size={14} />
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        eyebrow="Build The Future With Us"
        title="Ready to source premium automotive parts and battery solutions?"
        description="Tell us what you need and our trade team will respond with pricing, lead times and shipping options."
        primaryLabel="Request a Quote"
        primaryHref="/request-a-quote"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
