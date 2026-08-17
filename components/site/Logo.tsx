import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 group", className)}>
      <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold/50 bg-gradient-to-br from-gold/20 to-transparent">
        <span className="font-serif text-lg font-semibold text-gold-bright">LC</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg tracking-wide text-white group-hover:text-gold-bright transition-colors">
          LOUIS CALTEN
        </span>
        <span className="text-[10px] tracking-[0.25em] text-ink-muted">
          INTERNATIONAL LLP
        </span>
      </span>
    </Link>
  );
}
