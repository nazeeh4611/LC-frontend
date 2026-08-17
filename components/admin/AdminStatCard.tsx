import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export function AdminStatCard({
  label,
  value,
  changePct,
  icon: Icon,
}: {
  label: string;
  value: string;
  changePct?: number | null;
  icon: LucideIcon;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-muted">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-white tabular-nums">{value}</p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded border border-gold/30 bg-gold-soft text-gold-bright">
            <Icon size={18} />
          </span>
        </div>
        {changePct !== undefined && changePct !== null && (
          <p className={`mt-3 text-xs ${changePct >= 0 ? "text-status-success" : "text-status-danger"}`}>
            {changePct >= 0 ? "↑" : "↓"} {Math.abs(changePct)}% from previous period
          </p>
        )}
      </CardContent>
    </Card>
  );
}
