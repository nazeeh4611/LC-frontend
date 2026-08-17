import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function LoadingState({
  label = "Loading...",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 py-16 text-center", className)}>
      <Loader2 size={26} className="animate-spin text-gold-bright" />
      <p className="text-sm text-ink-muted">{label}</p>
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
  className,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 rounded-md border border-status-danger/30 bg-status-danger/5 py-16 text-center", className)}>
      <AlertTriangle size={26} className="text-status-danger" />
      <div>
        <p className="font-medium text-white">{title}</p>
        <p className="mt-1 text-sm text-ink-muted">{message}</p>
      </div>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry} className="mt-2">
          Try Again
        </Button>
      )}
    </div>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  message = "There's no content to display right now.",
  actionLabel,
  onAction,
  className,
}: {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-border bg-bg-secondary/40 py-16 text-center", className)}>
      <Inbox size={26} className="text-ink-faint" />
      <div>
        <p className="font-medium text-white">{title}</p>
        <p className="mt-1 text-sm text-ink-muted">{message}</p>
      </div>
      {actionLabel && onAction && (
        <Button size="sm" variant="outline" onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded bg-white/5", className)} />;
}
