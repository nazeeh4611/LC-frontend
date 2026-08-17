import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection({
  eyebrow = "Get Started",
  title,
  description,
  primaryLabel = "Request a Quote",
  primaryHref = "/request-a-quote",
  secondaryLabel,
  secondaryHref,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="py-4 md:py-6">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[3.5rem_1.25rem_3.5rem_1.25rem] border border-border bg-navy-gradient px-8 py-16 shadow-elevated md:rounded-[5rem_1.5rem_5rem_1.5rem] md:px-16 md:py-20">
          <div className="absolute inset-0 bg-radial-fade" />
          <div className="pointer-events-none absolute -left-20 bottom-[-20%] h-72 w-72 rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-gold/[0.1] blur-3xl" />
          <div className="pointer-events-none absolute -right-16 top-[-30%] h-64 w-64 rounded-[55%_45%_40%_60%/45%_55%_45%_55%] bg-gold/[0.08] blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="mb-3 text-eyebrow font-semibold uppercase text-gold-bright">{eyebrow}</p>
              <h2 className="text-editorial-sm font-semibold text-white">{title}</h2>
              {description && <p className="mt-4 text-ink-muted leading-relaxed">{description}</p>}
            </div>
            <div className="flex flex-shrink-0 flex-wrap gap-4">
              <Link href={primaryHref}>
                <Button size="lg">
                  {primaryLabel} <ArrowRight size={16} />
                </Button>
              </Link>
              {secondaryLabel && secondaryHref && (
                <Link href={secondaryHref}>
                  <Button size="lg" variant="outline">
                    {secondaryLabel}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
