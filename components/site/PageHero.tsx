import { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
  meta,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  /** Optional short label/value pairs shown in the side panel, e.g. { label: "Est.", value: "2019" } */
  meta?: { label: string; value: string }[];
  /** Optional large editorial image — rendered as an asymmetric curved panel, never a plain rectangle. */
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border-hairline bg-navy-gradient",
        className
      )}
    >
      <div className="absolute inset-0 bg-radial-fade" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(227,192,113,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(227,192,113,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gold-line" />

      <Container
        className={cn(
          "relative grid grid-cols-1 gap-12 py-16 md:py-20",
          image ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10" : "lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16"
        )}
      >
        <div className={image ? "lg:py-4" : undefined}>
          <p className="mb-3 flex items-center gap-3 text-eyebrow font-semibold uppercase text-gold-bright">
            <span className="h-px w-6 bg-gold-bright/60" />
            {eyebrow}
          </p>
          <h1 className="max-w-3xl text-display-md font-bold uppercase leading-[1.1] text-white md:text-display-lg">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-ink-muted leading-relaxed">{description}</p>
          )}
          {children}

          {meta && meta.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-border-hairline pt-7">
              {meta.map((m) => (
                <div key={m.label}>
                  <p className="font-serif text-2xl font-semibold text-gold-bright tabular-nums">
                    {m.value}
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-ink-muted">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {image && (
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[4.5rem_1.25rem_4.5rem_1.25rem] border border-border shadow-elevated md:aspect-[5/4.5] lg:aspect-[4/5]">
              <Image
                src={image}
                alt={imageAlt ?? title}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-gold-radial opacity-40" />
            </div>
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full border border-gold/25 opacity-70 md:h-40 md:w-40" />
            <div className="pointer-events-none absolute -right-4 -top-4 hidden h-24 w-24 rounded-full bg-gold/[0.12] blur-2xl md:block" />
          </div>
        )}
      </Container>
    </section>
  );
}
