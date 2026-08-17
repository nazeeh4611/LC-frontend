import { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Large asymmetric image + editorial text block. The image is never a plain
 * rectangle in a card — it's a full-bleed curved panel that anchors the
 * section, with copy living directly on the page background beside it.
 */
export function ImageFeature({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  reverse = false,
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-14 md:py-20", className)}>
      <Container>
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16",
            reverse && "lg:[&>*:first-child]:order-2"
          )}
        >
          <Reveal className="relative">
            <div
              className={cn(
                "relative aspect-[6/5] w-full overflow-hidden border border-border shadow-elevated",
                reverse
                  ? "rounded-[1.25rem_4.5rem_1.25rem_4.5rem]"
                  : "rounded-[4.5rem_1.25rem_4.5rem_1.25rem]"
              )}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-premium hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div
              className={cn(
                "pointer-events-none absolute -bottom-6 h-28 w-28 rounded-full border border-gold/25 md:h-36 md:w-36",
                reverse ? "-right-6" : "-left-6"
              )}
            />
          </Reveal>

          <Reveal className="reveal-delay-1">
            {eyebrow && (
              <p className="mb-3 flex items-center gap-3 text-eyebrow font-semibold uppercase text-gold-bright">
                <span className="h-px w-6 bg-gold-bright/60" />
                {eyebrow}
              </p>
            )}
            <h2 className="text-editorial-sm font-semibold text-white">{title}</h2>
            {description && (
              <p className="mt-5 max-w-xl leading-relaxed text-ink-muted">{description}</p>
            )}
            {children}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
