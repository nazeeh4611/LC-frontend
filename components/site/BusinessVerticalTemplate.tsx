import { LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/layout/Section";
import { ImageFeature } from "@/components/site/ImageFeature";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/site/CTASection";
import { CategoryProductShowcase } from "@/components/site/CategoryProductShowcase";
import { Reveal } from "@/components/ui/Reveal";

export interface BusinessService {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface BusinessVerticalContent {
  eyebrow: string;
  title: string;
  heroDescription: string;
  overview: string;
  services: BusinessService[];
  applications: string[];
  industries: string[];
  /** Full-bleed hero image for this vertical */
  heroImage: string;
  /** Secondary image used lower on the page for the editorial split section */
  featureImage: string;
  /** Category slug(s) whose products should be showcased on this page */
  categorySlugs?: string[];
}

export function BusinessVerticalTemplate({ content }: { content: BusinessVerticalContent }) {
  const {
    eyebrow,
    title,
    heroDescription,
    overview,
    services,
    applications,
    industries,
    heroImage,
    featureImage,
    categorySlugs,
  } = content;

  return (
    <>
      <Breadcrumbs items={[{ label: "Business", href: "/business" }, { label: title }]} />
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={heroDescription}
        image={heroImage}
        imageAlt={`${title} — Louis CALTEN International LLP`}
      />

      <ImageFeature
        eyebrow="Overview"
        title="What We Offer"
        description={overview}
        image={featureImage}
        imageAlt={`${title} operations`}
      />

      <Section
        eyebrow="Capabilities"
        title="Our Services"
        className="border-t border-border-hairline"
      >
        <div className="flex flex-col divide-y divide-border-hairline border-y border-border-hairline">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal
                key={service.title}
                delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                className="group grid grid-cols-1 items-center gap-6 py-8 transition-colors hover:bg-white/[0.02] sm:grid-cols-[auto_1fr_auto] sm:gap-10"
              >
                <span className="font-serif text-4xl font-semibold text-ink-faint transition-colors group-hover:text-gold-bright/60 sm:text-5xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold uppercase tracking-wide text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
                    {service.description}
                  </p>
                </div>
                <Icon size={22} className="hidden text-gold-bright/70 sm:block" />
              </Reveal>
            );
          })}
        </div>
      </Section>

      {categorySlugs?.map((slug) => (
        <CategoryProductShowcase
          key={slug}
          categorySlug={slug}
          eyebrow="Catalogue"
          title="Featured Products"
        />
      ))}

      <Section eyebrow="Where It's Used" title="Applications">
        <div className="flex flex-wrap gap-3">
          {applications.map((application) => (
            <Badge key={application} variant="gold" className="px-4 py-2 text-sm">
              {application}
            </Badge>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Who We Serve"
        title="Industries Served"
        className="border-t border-border-hairline"
      >
        <div className="flex flex-wrap gap-x-10 gap-y-4">
          {industries.map((industry) => (
            <span
              key={industry}
              className="relative pl-5 text-sm text-white before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-gold-bright"
            >
              {industry}
            </span>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Let's Talk"
        title={`Interested in our ${title.toLowerCase()}?`}
        description="Share your requirements and our team will get back to you with pricing and lead times."
      />
    </>
  );
}
