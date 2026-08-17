"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/site/Logo";
import { adminNav } from "@/lib/admin-navigation";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-border-hairline bg-bg-secondary lg:flex">
      <div className="border-b border-border-hairline px-6 py-6">
        <Logo />
        <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-ink-faint">Admin Panel</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {adminNav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded px-3 py-2.5 text-sm transition-colors duration-150",
                    active
                      ? "bg-gold-soft text-gold-bright border border-gold/30"
                      : "text-ink-muted hover:bg-white/5 hover:text-white border border-transparent"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={17} />
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="rounded-full bg-gold-bright px-2 py-0.5 text-[10px] font-semibold text-bg">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
