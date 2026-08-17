import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  containerClassName?: string;
}

export function Section({
  className,
  containerClassName,
  eyebrow,
  title,
  description,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-14 md:py-20", className)} {...props}>
      <Container className={containerClassName}>
        {(eyebrow || title || description) && (
          <div className="mb-10 max-w-2xl">
            {eyebrow && (
              <p className="mb-3 text-eyebrow font-semibold uppercase text-gold-bright">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-display-md font-semibold text-white md:text-display-lg">
                {title}
              </h2>
            )}
            {description && <p className="mt-4 text-ink-muted">{description}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
