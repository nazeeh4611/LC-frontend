import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/site/Logo";
import { footerLinks } from "@/lib/navigation";

const deliveryPartners = ["DHL", "FedEx", "Aramex", "UPS", "DTDC"];
const paymentPartners = ["Visa", "Mastercard", "Amex", "UPI", "Razorpay", "Stripe", "PayU"];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-bright">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border-hairline bg-bg-secondary">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[140%] -translate-x-1/2 rounded-[50%] bg-bg blur-2xl" />
      <div className="pointer-events-none absolute right-[-10%] top-0 h-72 w-72 rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-gold/[0.04] blur-3xl" />
      <Container className="relative grid grid-cols-1 gap-10 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
            A trusted global supplier of premium automotive parts, lithium battery systems and
            international trading solutions, serving distributors, garages and corporate buyers
            worldwide.
          </p>
        </div>

        <FooterColumn title="Quick Links" links={footerLinks.quickLinks} />
        <FooterColumn title="Business" links={footerLinks.business} />
        <FooterColumn title="Company" links={footerLinks.company} />
      </Container>

      <div className="hairline" />

      <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-faint">
          <span>Delivery Partners:</span>
          {deliveryPartners.map((p) => (
            <span key={p} className="text-ink-muted">
              {p}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-faint">
          <span>We Accept:</span>
          {paymentPartners.map((p) => (
            <span key={p} className="text-ink-muted">
              {p}
            </span>
          ))}
        </div>
      </Container>

      <div className="hairline" />

      <Container className="flex flex-col gap-3 py-6 text-xs text-ink-faint md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} Louis CALTEN International LLP. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          {footerLinks.legal.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gold-bright transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
