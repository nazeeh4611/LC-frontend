"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log for our own visibility only -- digest is a safe, non-sensitive
    // reference id; the raw error message/stack is intentionally never
    // rendered to the user below.
    // eslint-disable-next-line no-console
    console.error("Unhandled application error", error.digest ?? error.message);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-bg font-sans antialiased">
        <div className="flex min-h-screen items-center justify-center">
          <Container className="flex flex-col items-center py-24 text-center">
            <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-status-danger/30 bg-status-danger/10">
              <AlertTriangle size={28} className="text-status-danger" />
            </span>
            <p className="text-eyebrow font-semibold uppercase tracking-widest text-gold-bright">
              Something Went Wrong
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-white">We hit an unexpected error</h1>
            <p className="mt-4 max-w-md text-sm text-ink-muted">
              Our team has been notified. Please try again, or head back to the homepage.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={reset}>
                Try Again
              </Button>
              <Link href="/">
                <Button size="lg" variant="outline">
                  Back to Home
                </Button>
              </Link>
            </div>
          </Container>
        </div>
      </body>
    </html>
  );
}
