import { AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/layout/Container";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export function LegalPageTemplate({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Breadcrumbs items={[{ label: title }]} />
      <PageHero eyebrow="Legal" title={title} description={`Last updated: ${lastUpdated}`} />

      <section className="py-16 md:py-20">
        <Container className="max-w-3xl">
          <div className="mb-10 flex gap-3 rounded-md border border-gold/30 bg-gold-soft p-5">
            <AlertTriangle size={18} className="mt-0.5 flex-shrink-0 text-gold-bright" />
            <p className="text-sm text-ink-muted">
              This page contains placeholder legal content prepared for development purposes.{" "}
              <span className="font-medium text-white">
                It must be reviewed and approved by Louis CALTEN International LLP&apos;s legal
                counsel before publication.
              </span>
            </p>
          </div>

          <p className="text-ink-muted leading-relaxed">{intro}</p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="mb-3 text-lg font-semibold text-white">{section.heading}</h2>
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i} className="text-sm text-ink-muted leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
