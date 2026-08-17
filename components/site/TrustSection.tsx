import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

const certifications = ["IEC Certified", "GST Registered", "LLP Registered"];
const deliveryPartners = ["DHL", "FedEx", "Aramex", "UPS", "DTDC International"];
const paymentPartners = ["Visa", "Mastercard", "American Express", "UPI", "Razorpay", "Stripe", "PayU"];

function LogoRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
      {items.map((item) => (
        <span key={item} className="text-sm font-medium tracking-wide text-ink-muted transition-colors hover:text-white">
          {item}
        </span>
      ))}
    </div>
  );
}

export function TrustSection() {
  return (
    <section className="border-y border-border-hairline bg-bg-secondary py-14 md:py-16">
      <Container className="flex flex-col gap-10 md:flex-row md:gap-16">
        <Reveal className="flex items-start gap-3 md:w-56 md:flex-shrink-0">
          <ShieldCheck size={18} className="mt-0.5 flex-shrink-0 text-gold-bright" />
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-bright">
            Certified &amp; Trusted Worldwide
          </p>
        </Reveal>
        <div className="flex flex-1 flex-col gap-8 divide-y divide-border-hairline md:flex-row md:gap-10 md:divide-x md:divide-y-0">
          <Reveal delay={1} className="md:flex-1 md:pl-0">
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
              Certifications
            </h3>
            <LogoRow items={certifications} />
          </Reveal>
          <Reveal delay={2} className="pt-8 md:flex-1 md:pl-10 md:pt-0">
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
              Delivery Partners
            </h3>
            <LogoRow items={deliveryPartners} />
          </Reveal>
          <Reveal delay={3} className="pt-8 md:flex-1 md:pl-10 md:pt-0">
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
              We Accept
            </h3>
            <LogoRow items={paymentPartners} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
