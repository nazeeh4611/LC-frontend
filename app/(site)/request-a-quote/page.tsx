import type { Metadata } from "next";
import { Phone, Mail, Clock, ShieldCheck, Truck, Award } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { QuoteRequestForm } from "@/components/site/QuoteRequestForm";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Submit a wholesale or export RFQ to Louis CALTEN International LLP for automotive parts, EV components and lithium battery systems.",
  openGraph: { images: [{ url: siteImages.automotive }] },
};

const whyChooseUs = [
  { icon: Award, label: "Premium Quality Products" },
  { icon: ShieldCheck, label: "Competitive Pricing" },
  { icon: Truck, label: "Timely Global Delivery" },
  { icon: Clock, label: "24/7 Customer Support" },
];

export default function RequestAQuotePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Request a Quote" }]} />
      <PageHero
        eyebrow="Get A Quote"
        title="Request a Quote"
        description="Tell us what you need — product category, quantity, and shipping destination — and our trade team will respond with pricing and lead times."
        image={siteImages.automotive}
        imageAlt="Automotive components ready for export"
      />

      <section className="py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <Card className="p-7 lg:col-span-3">
            <QuoteRequestForm />
          </Card>

          <div className="space-y-6 lg:col-span-2">
            <Card className="p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-bright">
                Direct Contact
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gold-bright" />
                  <span className="text-sm text-white">+91 89906 07390</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gold-bright" />
                  <span className="text-sm text-white">info@louiscalteninternational.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-gold-bright" />
                  <span className="text-sm text-white">Mon – Sat, 9:00 AM – 6:30 PM IST</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-bright">
                Why Choose Us
              </p>
              <ul className="space-y-3">
                {whyChooseUs.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border border-gold/30 bg-gold-soft">
                        <Icon size={14} className="text-gold-bright" />
                      </span>
                      <span className="text-sm text-white">{item.label}</span>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
