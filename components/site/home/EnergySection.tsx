import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { siteImages } from "@/lib/images";

const points = [
  "Lithium battery manufacturing & supply",
  "Industrial & EV battery solutions",
  "Renewable energy storage systems",
  "Safety-certified cell chemistry",
];

export function EnergySection() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient py-20 md:py-28">
      <div className="pointer-events-none absolute -right-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-[55%_45%_40%_60%/45%_55%_45%_55%] bg-gold/[0.07] blur-3xl" />
      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-4">
        <Reveal className="relative lg:pr-10">
          <SectionLabel>Energy &amp; Lithium</SectionLabel>
          <h2 className="text-editorial font-bold uppercase leading-[0.98] text-white">
            Powering The
            <br />
            Next Generation
            <br />
            <span className="text-gradient-gold">Of Mobility.</span>
          </h2>
          <p className="mt-6 max-w-lg text-ink-muted leading-relaxed">
            Our lithium battery and energy storage systems support the shift toward
            electric mobility and resilient power &mdash; manufactured, tested and
            exported to distributors and industrial partners worldwide.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-ink-muted md:text-base">
                <span className="h-px w-6 flex-shrink-0 bg-gold-bright/60" />
                {point}
              </li>
            ))}
          </ul>
          <Link
            href="/business/energy-solutions"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-bright transition-transform hover:translate-x-1"
          >
            Explore Energy Solutions <ArrowRight size={16} />
          </Link>
        </Reveal>

        {/* Real battery / energy photography */}
        <Reveal delay={1} className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[1rem_3.5rem_1rem_3.5rem] border border-border shadow-elevated">
            <Image
             src="/1.png"
              alt="Lithium battery cells and energy storage systems"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 ease-premium hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-gold-bright/10 via-transparent to-transparent" />
            {/* secondary inset image */}
            <div className="absolute right-5 top-5 h-24 w-24 overflow-hidden rounded-2xl border border-gold/30 shadow-elevated sm:h-28 sm:w-28">
              <Image
                src="/16.jpg"
                alt="Industrial lithium battery pack"
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-border bg-bg/80 px-5 py-4 backdrop-blur-sm">
              <p className="font-serif text-2xl font-semibold text-gold-bright">IEC</p>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted">Certified Cell Safety Standards</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
