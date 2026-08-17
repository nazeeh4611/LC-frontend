import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Container } from "@/components/layout/Container";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="border-b border-border-hairline bg-bg-secondary/60">
      <Container className="flex items-center gap-2 py-3 text-xs text-ink-muted">
        <Link href="/" className="flex items-center gap-1 hover:text-gold-bright transition-colors">
          <Home size={12} />
          Home
        </Link>
        {items.map((item, i) => (
          <span key={item.label} className="flex items-center gap-2">
            <ChevronRight size={12} className="text-ink-faint" />
            {item.href && i !== items.length - 1 ? (
              <Link href={item.href} className="hover:text-gold-bright transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
          </span>
        ))}
      </Container>
    </div>
  );
}
