import type { Metadata } from "next";
import { Target, Compass, Gem, Handshake, TrendingUp, Award } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { ImageFeature } from "@/components/site/ImageFeature";
import { Section } from "@/components/layout/Section";
import { StatsStrip } from "@/components/site/StatsStrip";
import { GlobalPresenceMap } from "@/components/site/GlobalPresenceMap";
import { CTASection } from "@/components/site/CTASection";
import { Reveal } from "@/components/ui/Reveal";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Louis CALTEN International LLP, a global trading company specializing in automotive parts, accessories and lithium battery solutions across 50+ countries.",
  keywords: [
    "Louis CALTEN International LLP",
    "automotive parts trading company",
    "lithium battery global supplier",
    "B2B export company India UAE",
  ],
  openGraph: { images: [{ url: siteImages.team }] },
};

const values = [
  { icon: Gem, title: "Quality", description: "Every product we source and supply is tested and certified to meet international standards." },
  { icon: Handshake, title: "Integrity", description: "Transparent, ethical business practices across every trade relationship we build." },
  { icon: TrendingUp, title: "Innovation", description: "Driven by technology and forward-looking thinking across automotive and energy sectors." },
  { icon: Award, title: "Excellence", description: "Delivering beyond expectations for every partner, distributor and corporate buyer." },
];

const businessActivities = [
  { region: "India", role: "Headquarters", description: "Strategic HQ managing sourcing, production, lithium battery manufacturing and global supply chain operations." },
  { region: "UAE", role: "Trade & Operations Hub", description: "Key operational hub for EV components, battery supply and fast Gulf-region distribution." },
  { region: "Southeast Asia", role: "Sourcing Office", description: "Regional office supporting sourcing and market development across Southeast Asia." },
  { region: "Africa", role: "Emerging Markets", description: "Expanding our presence with strategic warehouse partnerships and low-lead-time distribution." },
];

const stats = [
  { value: "5+", label: "Years of Excellence" },
  { value: "1000+", label: "Global Clients" },
  { value: "50+", label: "Countries Served" },
  { value: "10000+", label: "Products" },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About Us" }]} />
      <PageHero
        eyebrow="About"
        title="Louis CALTEN International LLP"
        description="Louis CALTEN International LLP is a dynamic, multinational enterprise specializing in automotive parts manufacturing, sourcing and global trading operations across key international markets."
        image={siteImages.team}
        imageAlt="Louis CALTEN International LLP team at work"
      />

      <Section eyebrow="Who We Are" title="Company Overview">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <p className="text-ink-muted leading-relaxed">
            We drive international business development and global supply operations, connecting
            manufacturers, suppliers and clients across India, the UAE, Southeast Asia, Africa and
            other emerging markets. Our focus spans automotive spare parts, car accessories,
            automotive detailing products, EV components, lithium battery systems and industrial
            energy storage solutions.
          </p>
          <p className="text-ink-muted leading-relaxed">
            Committed to innovation, uncompromising quality and sustainability, we supply advanced
            automotive components and battery technologies that power industries and communities
            across the globe — serving distributors, garages, service centers and corporate buyers
            worldwide.
          </p>
        </div>
        <div className="mt-12">
          <StatsStrip stats={stats} bordered={false} />
        </div>
      </Section>

      <ImageFeature
        eyebrow="Why We Exist"
        title="Built on vision, driven by purpose."
        image={siteImages.automotive}
        imageAlt="Precision automotive engineering"
        className="border-t border-border-hairline"
      >
        <div className="mt-8 space-y-8">
          <div className="flex gap-4">
            <span className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold-soft">
              <Compass size={17} className="text-gold-bright" />
            </span>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Vision</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                To become a globally recognized leader in advanced automotive components, lithium
                battery solutions and sustainable energy technologies.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold-soft">
              <Target size={17} className="text-gold-bright" />
            </span>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Mission</h3>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink-muted">
                <li>Deliver world-class products and services</li>
                <li>Drive innovation and continuous improvement</li>
                <li>Expand global partnerships and strategic relationships</li>
                <li>Promote sustainability and environmental responsibility</li>
              </ul>
            </div>
          </div>
        </div>
      </ImageFeature>

      <Section eyebrow="What Drives Us" title="Our Values" className="border-t border-border-hairline">
        <div className="grid grid-cols-1 divide-y divide-border-hairline border-t border-border-hairline sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Reveal
                key={value.title}
                delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                className="px-1 py-8 sm:px-6"
              >
                <Icon size={22} className="text-gold-bright" />
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{value.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section
        eyebrow="Where We Operate"
        title="Business Activities"
        className="border-t border-border-hairline"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col divide-y divide-border-hairline">
            {businessActivities.map((activity) => (
              <div key={activity.region} className="flex items-start gap-4 py-5 first:pt-0">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gold-bright" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {activity.region}{" "}
                    <span className="ml-2 text-xs font-normal uppercase tracking-wider text-gold-bright">
                      {activity.role}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
          <GlobalPresenceMap />
        </div>
      </Section>

      <CTASection
        eyebrow="Work With Us"
        title="Partner with a trading company built on quality and reliability"
        description="Reach out to discuss wholesale supply, export orders or corporate distribution agreements."
        primaryLabel="Request a Quote"
        primaryHref="/request-a-quote"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
