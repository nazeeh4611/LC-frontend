import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";

export function PlaceholderPage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Section eyebrow={eyebrow} title={title} description={description}>
      <div className="rounded-md border border-dashed border-border bg-bg-secondary/40 p-12 text-center">
        <Badge variant="gold" className="mb-4">
          Coming in a later phase
        </Badge>
        <p className="mx-auto max-w-md text-sm text-ink-muted">
          This page is part of the Phase 0 routing foundation. Full content and functionality
          will be built out in a subsequent phase.
        </p>
      </div>
    </Section>
  );
}
