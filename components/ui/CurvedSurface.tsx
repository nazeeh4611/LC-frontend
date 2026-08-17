import { cn } from "@/lib/utils";

/**
 * Soft organic glow used behind large editorial sections to add depth
 * without resorting to bordered boxes. Purely decorative, aria-hidden.
 */
export function CurvedSurface({
  className,
  variant = "gold",
}: {
  className?: string;
  variant?: "gold" | "navy";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-[45%_55%_60%_40%/50%_45%_55%_50%] blur-3xl",
        variant === "gold" ? "bg-gold/[0.12]" : "bg-navy/40",
        className
      )}
    />
  );
}
