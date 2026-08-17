import { ShieldCheck, Truck, BadgeCheck, Headphones } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Assured Sourcing",
    description:
      "Every component and battery system is tested and certified to meet international quality and safety standards before it ships.",
  },
  {
    icon: Truck,
    title: "Reliable Global Logistics",
    description:
      "Established freight partnerships across DHL, FedEx, Aramex, UPS and DTDC keep lead times predictable, wherever your business is based.",
  },
  {
    icon: BadgeCheck,
    title: "Trade-Ready Documentation",
    description:
      "Export documentation, quality checks and customs paperwork are handled end-to-end so shipments clear borders without delay.",
  },
  {
    icon: Headphones,
    title: "Dedicated Trade Support",
    description:
      "A named point of contact manages your account from first enquiry through to delivery and after-sales support, 24/7.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient py-20 md:py-28">
      <div className="absolute inset-0 bg-radial-fade opacity-60" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-gold/[0.06] blur-3xl" />
      <Container className="relative">
        <Reveal className="max-w-3xl">
          <SectionLabel>The Calten Standard</SectionLabel>
          <h2 className="text-editorial font-bold uppercase text-white">
            Quality Is
            <br />
            Not <span className="text-gradient-gold">Optional.</span>
          </h2>
        </Reveal>

        <div className="mt-16 border-t border-border-hairline">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const offset = i % 2 === 1 ? "md:ml-[12%]" : "";
            return (
              <Reveal
                key={feature.title}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                className={`flex flex-col gap-5 border-b border-border-hairline py-9 md:flex-row md:items-center md:gap-10 ${offset}`}
              >
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[45%_55%_60%_40%/50%_45%_55%_50%] border border-gold/25 bg-gold-soft">
                  <Icon size={22} className="text-gold-bright" />
                </span>
                <div>
                  <h3 className="text-base font-semibold uppercase tracking-wide text-white md:text-lg">
                    {feature.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
