import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Cog, BatteryCharging, Globe2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { siteImages } from "@/lib/images";

const verticals = [
  {
    index: "01",
    icon: Cog,
    title: "Automotive Solutions",
    description: "Auto parts manufacturing and trading, EV components, and OEM & customized manufacturing for global distributors.",
    href: "/business/automotive-solutions",
    image: siteImages.automotiveWorkshop,
  },
  {
    index: "02",
    icon: BatteryCharging,
    title: "Energy Solutions",
    description: "Lithium battery manufacturing and supply, industrial battery solutions, and renewable energy storage systems.",
    href: "/business/energy-solutions",
    image: siteImages.industrialBattery,
  },
  {
    index: "03",
    icon: Globe2,
    title: "Global Trading",
    description: "International import and export, global sourcing networks, and end-to-end distribution and supply chain management.",
    href: "/business/global-trading",
    image: siteImages.containerPort,
  },
];

export function BusinessVerticals() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Container>
        <Reveal className="mb-16 max-w-2xl md:mb-20">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="text-editorial font-bold uppercase text-white">
            Built Around
            <br />
            Global Supply.
          </h2>
        </Reveal>

        <div>
          {verticals.map((vertical, i) => {
            const Icon = vertical.icon;
            const offset = i % 2 === 1 ? "md:ml-[6%]" : "";
            return (
              <Reveal key={vertical.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <Link
                  href={vertical.href}
                  className={`group relative flex flex-col gap-6 border-t border-border-hairline py-10 transition-colors hover:border-gold/30 md:flex-row md:items-center md:gap-8 md:py-12 ${offset} ${
                    i === verticals.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="font-serif text-sm text-gold-bright/70">{vertical.index}</span>

                  <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-border sm:h-24 sm:w-36">
                    <Image
                      src={vertical.image}
                      alt={vertical.title}
                      fill
                      sizes="144px"
                      className="object-cover transition-transform duration-500 ease-premium group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-1.5 left-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 bg-bg/80 backdrop-blur-sm">
                      <Icon size={14} className="text-gold-bright" />
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-editorial-sm font-semibold uppercase text-white transition-transform duration-500 ease-premium group-hover:translate-x-2">
                      {vertical.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted md:text-base">
                      {vertical.description}
                    </p>
                  </div>

                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-border text-white transition-all duration-500 ease-premium group-hover:border-gold-bright group-hover:bg-gold-bright group-hover:text-bg">
                    <ArrowUpRight size={20} className="transition-transform duration-500 ease-premium group-hover:rotate-45" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
