import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { siteImages } from "@/lib/images";

const points = [
  "Engine components & drivetrain parts",
  "EV & hybrid component sourcing",
  "OEM and customized manufacturing",
  "Rigorous multi-point quality testing",
];

export function AutomotiveSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-4">
        {/* Real automotive photography, curved full-bleed panel */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[3.5rem_1rem_3.5rem_1rem] border border-border shadow-elevated">
            <Image
              src="/38.png"
              alt="Precision-engineered automotive engine components"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 ease-premium hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            {/* secondary inset image */}
            <div className="absolute right-5 top-5 h-24 w-24 overflow-hidden rounded-2xl border border-gold/30 shadow-elevated sm:h-28 sm:w-28">
              <Image
                 src="/16.jpg"
                alt="Brake component detail"
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-border bg-bg/80 px-5 py-4 backdrop-blur-sm">
              <p className="font-serif text-2xl font-semibold text-gold-bright">15+</p>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted">Years Manufacturing Experience</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={1} className="relative order-1 lg:order-2 lg:pl-10">
          <SectionLabel>Automotive</SectionLabel>
          <h2 className="text-editorial font-bold uppercase leading-[0.98] text-white">
            Premium
            <br />
            <span className="text-gradient-gold">Components</span>
          </h2>
          <p className="mt-6 max-w-lg text-ink-muted leading-relaxed">
            From precision-machined engine parts to EV drivetrain components, every
            product in our automotive range is sourced, tested and certified to
            international standards before it reaches your warehouse.
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
            href="/business/automotive-solutions"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-bright transition-transform hover:translate-x-1"
          >
            Explore Automotive <ArrowRight size={16} />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
