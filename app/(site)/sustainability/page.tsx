import type { Metadata } from "next";
import { Leaf, BatteryCharging, Globe2, Lightbulb } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { ImageFeature } from "@/components/site/ImageFeature";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/site/CTASection";
import { Reveal } from "@/components/ui/Reveal";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "Louis CALTEN International LLP's approach to responsible sourcing, lithium battery energy solutions and environmental responsibility across our global supply chain.",
  keywords: [
    "sustainable automotive sourcing",
    "responsible lithium battery supply chain",
    "green energy storage solutions",
    "ethical global trading company",
  ],
  openGraph: { images: [{ url: siteImages.sustainability }] },
};

const pillars = [
  {
    icon: Leaf,
    title: "Responsible Sourcing",
    description:
      "We work with suppliers who share our commitment to ethical, quality-first manufacturing practices across our automotive and battery supply chains.",
  },
  {
    icon: BatteryCharging,
    title: "Energy Solutions",
    description:
      "Our lithium battery and energy storage products support the transition to electric mobility and more efficient energy use across industries.",
  },
  {
    icon: Globe2,
    title: "Environmental Responsibility",
    description:
      "We aim to minimize the environmental footprint of our operations and encourage responsible handling and lifecycle management of battery products.",
  },
  {
    icon: Lightbulb,
    title: "Future-Focused Technology",
    description:
      "We continually evaluate emerging automotive and energy technologies to keep our product range aligned with where the industry is heading.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Sustainability" }]} />
      <PageHero
        eyebrow="Responsibility"
        title="Sustainability"
        description="Building a more sustainable automotive and energy supply chain — one responsible sourcing decision at a time."
        image={siteImages.sustainability}
        imageAlt="Solar panels representing renewable energy commitment"
      />

      <ImageFeature
        eyebrow="Our Commitment"
        title="Energy that moves the world forward."
        description="From lithium battery lifecycle management to responsible sourcing partnerships, sustainability is engineered into how we operate — not added as an afterthought."
        image={siteImages.energy}
        imageAlt="EV charging infrastructure"
        reverse
      />

      <Section eyebrow="Our Approach" title="How We Think About Sustainability" className="border-t border-border-hairline">
        <div className="grid grid-cols-1 divide-y divide-border-hairline border-t border-border-hairline sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal
                key={pillar.title}
                delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                className="px-1 py-8 sm:px-8"
              >
                <Icon size={24} className="text-gold-bright" />
                <h3 className="mt-5 text-base font-semibold uppercase tracking-wide text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed">{pillar.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CTASection
        eyebrow="Grow With Us"
        title="Interested in our sustainability practices?"
        description="Reach out to learn more about our sourcing standards and responsible energy solutions."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
    </>
  );
}
