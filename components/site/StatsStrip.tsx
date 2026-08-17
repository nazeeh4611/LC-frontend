import { cn } from "@/lib/utils";

export interface StatItem {
  value: string;
  label: string;
}

export function StatsStrip({
  stats,
  className,
  bordered = true,
}: {
  stats: StatItem[];
  className?: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 divide-x divide-y divide-border-hairline sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-6",
        bordered && "border-t border-border-hairline",
        className
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="px-1 py-6 sm:px-6">
          <p className="font-serif text-3xl font-semibold text-gold-bright tabular-nums md:text-4xl">
            {stat.value}
          </p>
          <p className="mt-1.5 text-xs uppercase tracking-wider text-ink-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
