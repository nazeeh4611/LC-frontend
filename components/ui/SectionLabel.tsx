import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  light,
  className,
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-4 flex items-center gap-3 text-eyebrow font-semibold uppercase",
        light ? "text-gold-bright" : "text-gold-bright",
        className
      )}
    >
      <span className="h-px w-8 bg-gold-bright/60" />
      {children}
    </p>
  );
}
