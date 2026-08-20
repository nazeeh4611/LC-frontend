import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, Facebook, Linkedin, Instagram } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/site/ContactForm";
import { CTASection } from "@/components/site/CTASection";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Louis CALTEN International LLP for automotive parts, battery solutions, and wholesale trading inquiries.",
  keywords: ["contact automotive parts supplier", "wholesale trading inquiry", "Louis CALTEN contact"],
  openGraph: { images: [{ url: siteImages.team }] },
};

const contactDetails = [
  { icon: Mail, label: "Email", value: "info@louiscalteninternational.com" },
  { icon: Phone, label: "India HQ", value: "+91 97315 16756" },
  { icon: Phone, label: "Indonesia Office", value: "+62 878 7596 6662" },
  { icon: Phone, label: "UAE Operations", value: "+971 55 532 9798" },
  { icon: Clock, label: "Business Hours", value: "Mon – Sat, 9:00 AM – 6:30 PM IST" },
];

const officeLocations = [
  {
    title: "India Headquarters",
    name: "LOUIS CALTEN INTERNATIONAL LLP",
    address: "No. 155/4, 80 Feet Road, KHB Colony, Koramangala 5th Block, Bangalore – 560034, Karnataka, India",
    phone: "+91-9731516756",
  },
  {
    title: "Indonesia Office",
    name: "Louis Calten Internasional",
    address: "Puri Botanical Blok I9 No. 5, Jl. Joglo Raya, Kelurahan Joglo, Kecamatan Kembangan, Jakarta Barat – 11640, Indonesia",
    phone: "+62 878 75966662",
  },
  {
    title: "United Arab Emirates Operations",
    name: "LOUIS CALTEN INTERNATIONAL LLP",
    address: "Strategic business operations supporting international trade across the UAE",
    phone: "+971 55 532 9798",
  },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact Us" }]} />
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        description="We're here to help with your automotive and energy sourcing needs. Reach out and our team will respond promptly."
        image={siteImages.team}
        imageAlt="Louis CALTEN International team ready to assist"
      />

      <Section eyebrow="Reach Us" title="Contact Information">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            {contactDetails.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.label} className="flex items-center gap-4 p-5">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded border border-gold/30 bg-gold-soft">
                    <Icon size={18} className="text-gold-bright" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-ink-muted">{item.label}</p>
                    <p className="text-sm font-medium text-white">{item.value}</p>
                  </div>
                </Card>
              );
            })}

            <Card className="p-5">
              <p className="mb-3 text-xs uppercase tracking-wider text-ink-muted">Follow Us</p>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded border border-border text-ink-muted transition-colors hover:border-gold-bright hover:text-gold-bright">
                  <Facebook size={15} />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded border border-border text-ink-muted transition-colors hover:border-gold-bright hover:text-gold-bright">
                  <Linkedin size={15} />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded border border-border text-ink-muted transition-colors hover:border-gold-bright hover:text-gold-bright">
                  <Instagram size={15} />
                </span>
              </div>
            </Card>

            <div className="relative aspect-video w-full overflow-hidden rounded-[2.5rem_0.75rem_2.5rem_0.75rem] border border-border">
              <Image
                src={siteImages.warehouse}
                alt="Louis CALTEN International logistics operations"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <p className="absolute bottom-4 left-5 text-xs uppercase tracking-wider text-white/90">
                Bangalore, India — Headquarters
              </p>
            </div>
          </div>

          <Card className="p-7 lg:col-span-3">
            <h3 className="mb-6 text-base font-semibold text-white">Send Us a Message</h3>
            <ContactForm />
          </Card>
        </div>
      </Section>

      <Section eyebrow="Our Offices" title="Global Presence">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {officeLocations.map((office) => (
            <Card key={office.title} className="p-6">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded border border-gold/30 bg-gold-soft">
                <MapPin size={18} className="text-gold-bright" />
              </span>
              <h4 className="mb-1 text-sm font-semibold text-white">{office.title}</h4>
              <p className="mb-3 text-xs uppercase tracking-wider text-ink-muted">{office.name}</p>
              <p className="mb-3 text-sm text-ink-muted">{office.address}</p>
              <p className="text-sm font-medium text-white">{office.phone}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Need Pricing?"
        title="Looking for a formal quotation instead?"
        description="Use our Request a Quote form to share detailed product and shipping requirements."
        primaryLabel="Request a Quote"
        primaryHref="/request-a-quote"
      />
    </>
  );
}