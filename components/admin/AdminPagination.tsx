import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AdminPagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => onChange(Math.max(1, page - 1))}>
        <ChevronLeft size={14} />
      </Button>
      <span className="px-3 text-sm text-ink-muted">
        Page {page} of {totalPages}
      </span>
      <Button
        size="sm"
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => onChange(Math.min(totalPages, page + 1))}
      >
        <ChevronRight size={14} />
      </Button>
    </div>
  );
}
