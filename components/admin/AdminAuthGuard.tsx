"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { LoadingState } from "@/components/ui/States";

const STAFF_ROLES = [
  "super_admin",
  "admin",
  "manager",
  "product_manager",
  "order_manager",
  "content_manager",
  "support_staff",
];

export function AdminAuthGuard({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, user, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <LoadingState label="Checking access..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <LoadingState label="Redirecting to login..." />
      </div>
    );
  }

  if (!STAFF_ROLES.includes(user.role)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-status-danger/30 bg-status-danger/10">
          <ShieldAlert size={28} className="text-status-danger" />
        </span>
        <div>
          <h1 className="text-xl font-semibold text-white">Access Restricted</h1>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">
            Your account doesn&apos;t have permission to view the admin panel. If you believe this is a
            mistake, contact your administrator.
          </p>
        </div>
        <Button onClick={() => router.replace("/")}>Return to Site</Button>
      </div>
    );
  }

  return <>{children}</>;
}
