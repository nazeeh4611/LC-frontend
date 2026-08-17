import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cog, BatteryCharging, Globe2 } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/site/CTASection";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Business",
  description:
    "Explore Louis CALTEN International LLP's three core business verticals: Automotive Solutions, Energy Solutions and Global Trading.",
  keywords: ["automotive and energy trading company", "B2B supply verticals", "global trading business"],
  openGraph: { images: [{ url: siteImages.team }] },
};

const verticals = [
  {
    icon: Cog,
    title: "Automotive Solutions",
    description: "Auto parts, EV components, car accessories, detailing products and OEM manufacturing.",
    href: "/business/automotive-solutions",
  },
  {
    icon: BatteryCharging,
    title: "Energy Solutions",
    description: "Lithium battery manufacturing, industrial battery systems and renewable energy storage.",
    href: "/business/energy-solutions",
  },
  {
    icon: Globe2,
    title: "Global Trading",
    description: "International import & export, global sourcing, distribution and wholesale trading.",
    href: "/business/global-trading",
  },
];

export default function BusinessPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Business" }]} />
      <PageHero
        eyebrow="Our Business"
        title="Three Verticals, One Global Trading Company"
        description="Louis CALTEN International LLP operates across automotive components, energy storage technologies and international trade — serving distributors, garages and corporate buyers worldwide."
        image={siteImages.team}
        imageAlt="Louis CALTEN International team collaborating"
      />
      <Section eyebrow="Explore" title="Business Verticals">
        <div className="flex flex-col divide-y divide-border-hairline border-y border-border-hairline">
          {verticals.map((vertical, index) => {
            const Icon = vertical.icon;
            return (
              <Link
                key={vertical.title}
                href={vertical.href}
                className="group grid grid-cols-1 items-center gap-6 py-9 transition-colors hover:bg-white/[0.02] sm:grid-cols-[auto_1fr_auto] sm:gap-10"
              >
                <span className="font-serif text-4xl font-semibold text-ink-faint transition-colors group-hover:text-gold-bright/60 sm:text-5xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex items-start gap-5">
                  <span className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded border border-gold/30 bg-gold-soft">
                    <Icon size={19} className="text-gold-bright" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold uppercase tracking-wide text-white">
                      {vertical.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
                      {vertical.description}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 justify-self-start text-xs font-semibold uppercase tracking-wider text-gold-bright transition-transform group-hover:translate-x-1 sm:justify-self-end">
                  Learn More <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>
      <CTASection
        title="Not sure which solution fits your business?"
        description="Tell us about your requirements and we'll point you to the right team."
      />
    </>
  );
}
