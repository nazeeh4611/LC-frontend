"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, ShoppingCart, User } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/site/Logo";
import { TopBar } from "@/components/site/TopBar";
import { Button } from "@/components/ui/Button";
import { mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useScrolled } from "@/hooks/useScrolled";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const { user } = useAuth();
  const scrolled = useScrolled(16);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <TopBar />
      <div
        className={cn(
          "border-b transition-all duration-300 ease-premium",
          scrolled
            ? "border-border-hairline bg-bg/90 shadow-card backdrop-blur-md"
            : "border-transparent bg-bg/60 backdrop-blur-sm"
        )}
      >
        <Container
          className={cn(
            "flex items-center justify-between transition-all duration-300 ease-premium",
            scrolled ? "h-16" : "h-20"
          )}
        >
          <Logo />

          <nav className="hidden items-center lg:flex">
            {mainNav.map((link) => (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-gold-bright xl:px-4"
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} />}
                </Link>
                {link.children && (
                  <div
                    className={cn(
                      "invisible absolute left-0 top-full min-w-[240px] translate-y-1 rounded-2xl border border-border bg-bg-secondary p-2 opacity-0 shadow-elevated",
                      "transition-all duration-200 ease-premium group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                    )}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-4 py-3 text-sm text-ink-muted transition-colors hover:bg-white/5 hover:text-gold-bright"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <Link
              href="/cart"
              className="relative text-ink-muted transition-colors hover:text-gold-bright"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold-bright text-[10px] font-semibold text-bg">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <Link
              href={user ? "/account" : "/login"}
              className="flex items-center gap-1.5 text-ink-muted transition-colors hover:text-gold-bright"
            >
              <User size={19} />
              {user && <span className="text-xs font-medium text-white">{user.name.split(" ")[0]}</span>}
            </Link>
            <Link href="/request-a-quote">
              <Button size="sm">Get a Quote</Button>
            </Link>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <Link href="/cart" className="relative text-white" aria-label="Cart">
              <ShoppingCart size={21} />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold-bright text-[10px] font-semibold text-bg">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <button
              className="text-white"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "grid overflow-hidden border-b border-border-hairline bg-bg transition-[grid-template-rows] duration-300 ease-premium lg:hidden",
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-b-0"
        )}
      >
        <div className="min-h-0">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2.5 text-sm text-ink-muted hover:text-gold-bright"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 flex flex-col gap-1 border-l border-border-hairline pl-4">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="py-2 text-xs text-ink-faint hover:text-gold-bright"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href={user ? "/account" : "/login"}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-sm text-ink-muted hover:text-gold-bright"
            >
              {user ? "My Account" : "Login / Register"}
            </Link>
            <Link href="/request-a-quote" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="mt-3 w-full">
                Get a Quote
              </Button>
            </Link>
          </Container>
        </div>
      </div>
    </header>
  );
}
