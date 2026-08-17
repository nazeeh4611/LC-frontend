import { Bell, Search, Menu } from "lucide-react";

export function AdminTopbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border-hairline bg-bg px-4 md:px-6">
      <div className="flex items-center gap-4">
        <button className="text-ink-muted lg:hidden" aria-label="Open menu">
          <Menu size={20} />
        </button>
        <div className="hidden items-center gap-2 rounded border border-border bg-bg-elevated px-3 py-2 md:flex">
          <Search size={15} className="text-ink-faint" />
          <input
            placeholder="Search anything..."
            className="w-56 bg-transparent text-sm text-white placeholder:text-ink-faint focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-ink-muted hover:text-gold-bright" aria-label="Notifications">
          <Bell size={19} />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-bright text-[10px] font-semibold text-bg">
            5
          </span>
        </button>
        <div className="flex items-center gap-3 border-l border-border-hairline pl-5">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gold to-gold-bright" />
          <div className="hidden text-left leading-tight sm:block">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="flex items-center gap-1 text-xs text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
              Super Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
