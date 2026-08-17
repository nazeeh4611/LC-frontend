import Link from "next/link";
import { Compass } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-navy-gradient">
      <Container className="flex flex-col items-center py-24 text-center">
        <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold-soft">
          <Compass size={28} className="text-gold-bright" />
        </span>
        <p className="text-eyebrow font-semibold uppercase tracking-widest text-gold-bright">Error 404</p>
        <h1 className="mt-3 text-display-md font-semibold text-white md:text-display-lg">Page Not Found</h1>
        <p className="mt-4 max-w-md text-sm text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on
          track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button size="lg">Back to Home</Button>
          </Link>
          <Link href="/products">
            <Button size="lg" variant="outline">
              Browse Products
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
