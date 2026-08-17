import type { Metadata } from "next";
import { Briefcase, Users, TrendingUp, Globe2 } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { ImageFeature } from "@/components/site/ImageFeature";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { ApplyForm } from "@/components/site/ApplyForm";
import { Reveal } from "@/components/ui/Reveal";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore career opportunities at Louis CALTEN International LLP and apply to join our global automotive and energy trading team.",
  keywords: ["automotive trading company jobs", "careers Louis CALTEN", "export logistics jobs India UAE"],
  openGraph: { images: [{ url: siteImages.team }] },
};

const openRoles = [
  { title: "Sales & Business Development Executive", location: "Kerala, India", type: "Full-Time" },
  { title: "Export Documentation Specialist", location: "Kerala, India", type: "Full-Time" },
  { title: "Warehouse & Logistics Coordinator", location: "UAE", type: "Full-Time" },
  { title: "Product Manager – Battery Systems", location: "Kerala, India", type: "Full-Time" },
];

const culture = [
  { icon: Globe2, title: "Global Exposure", description: "Work with international partners across automotive and energy trade." },
  { icon: TrendingUp, title: "Growth Opportunities", description: "Continuous learning as we expand into new markets and product lines." },
  { icon: Users, title: "Collaborative Team", description: "A close-knit team spanning trading, operations and product functions." },
  { icon: Briefcase, title: "Meaningful Work", description: "Contribute to a growing international trading business from day one." },
];

export default function CareersPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Careers" }]} />
      <PageHero
        eyebrow="Join Us"
        title="Careers at Louis CALTEN"
        description="Build the future of automotive and energy trading with a team that values integrity, quality and global ambition."
        image={siteImages.team}
        imageAlt="Louis CALTEN International team collaborating"
      />

      <Section eyebrow="Life Here" title="Our Culture">
        <div className="grid grid-cols-1 divide-y divide-border-hairline border-y border-border-hairline sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {culture.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.title}
                delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                className="px-1 py-8 sm:px-6"
              >
                <Icon size={22} className="text-gold-bright" />
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{item.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <ImageFeature
        eyebrow="Where You'll Work"
        title="From Kerala to the Gulf, and everywhere our trade routes reach."
        description="Our teams operate across sourcing, logistics, product and export documentation — working shoulder to shoulder with manufacturers and buyers across our global network."
        image={siteImages.warehouse}
        imageAlt="Team coordinating logistics operations"
        className="border-t border-border-hairline"
      />

      <Section
        eyebrow="Opportunities"
        title="Open Positions"
        className="border-t border-border-hairline"
      >
        <div className="flex flex-col divide-y divide-border-hairline border-y border-border-hairline">
          {openRoles.map((role) => (
            <div
              key={role.title}
              className="flex flex-col gap-3 py-6 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-sm font-semibold text-white">{role.title}</h3>
                <p className="mt-1 text-xs text-ink-muted">{role.location}</p>
              </div>
              <Badge variant="gold">{role.type}</Badge>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Apply Now" title="Submit Your Application" className="border-t border-border-hairline">
        <div className="max-w-2xl">
          <ApplyForm />
        </div>
      </Section>
    </>
  );
}
