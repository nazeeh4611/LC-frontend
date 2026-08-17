import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { siteImages } from "@/lib/images";

const heroStats = [
  { value: "50+", label: "Countries Served" },
  { value: "1,000+", label: "Global Clients" },
  { value: "10,000+", label: "Products" },
  { value: "5+", label: "Years of Excellence" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient">
      {/* Ambient depth layers */}
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="pointer-events-none absolute -left-40 top-[-10%] h-[560px] w-[560px] rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-gold/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-[-15%] h-[420px] w-[420px] rounded-[55%_45%_40%_60%/45%_55%_45%_55%] bg-navy-900/60 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(227,192,113,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(227,192,113,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gold-line" />

      <Container className="relative grid grid-cols-1 gap-16 pb-16 pt-24 md:pb-24 md:pt-32 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-10 lg:pt-36">
        <div className="max-w-2xl">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-eyebrow font-semibold uppercase text-gold-bright">
              <span className="h-px w-10 bg-gold-bright/60" />
              Global Automotive &amp; Energy Supply
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="text-hero font-bold uppercase text-white">
              Premium
              <br />
              Automotive &amp;{" "}
              <span className="text-gradient-gold">Energy</span>
              <br />
              Solutions
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-muted">
              We source, manufacture and export premium automotive components and
              lithium battery systems &mdash; supplying distributors, OEMs and
              corporate buyers across five continents.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link href="/products">
                <Button size="lg">
                  Explore Products <ArrowRight size={16} />
                </Button>
              </Link>
              <Link
                href="/request-a-quote"
                className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:text-gold-bright"
              >
                Request a Quote
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          {/* Editorial stats — directly on the page, not boxed cards */}
          <Reveal delay={3} className="mt-14 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-border-hairline pt-8 sm:grid-cols-4 lg:hidden">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-stat font-serif font-semibold text-white tabular-nums">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-ink-muted">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Real photography — curved full-bleed panel with floating stat chips */}
        <Reveal delay={2} className="relative hidden lg:block">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-lg">
            <div className="absolute inset-0 overflow-hidden rounded-[4.5rem_1.5rem_4.5rem_1.5rem] border border-border shadow-elevated">
              <Image
                src="/1.png"
                alt="Automotive manufacturing and lithium battery production facility"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-gold-bright/10 via-transparent to-transparent" />
            </div>
            <div className="pointer-events-none absolute inset-6 rounded-[4.5rem_1.5rem_4.5rem_1.5rem] border border-dashed border-gold/20" />

            {/* Floating stat chips */}
            <div className="absolute -right-6 top-8 animate-float rounded-2xl border border-border bg-bg/90 px-5 py-3 text-right shadow-elevated backdrop-blur-sm">
              {/* <p className="font-serif text-2xl font-semibold text-gold-bright">50+</p>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted">Countries</p> */}
            </div>
            <div
              className="absolute -left-6 bottom-28 animate-float rounded-2xl border border-border bg-bg/90 px-5 py-3 shadow-elevated backdrop-blur-sm"
              style={{ animationDelay: "1.4s" }}
            >
              {/* <p className="font-serif text-2xl font-semibold text-gold-bright">10,000+</p>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted">Products</p> */}
            </div>

            {/* Corner preview card — secondary product image, like a mini gallery */}
            <Link
              href="/business/energy-solutions"
              className="group absolute -bottom-8 -right-6 hidden w-40 overflow-hidden rounded-2xl border border-border bg-bg shadow-elevated sm:block"
            >
              <div className="relative aspect-[4/3]">
                <Image
                                  src="/3.png"

                  alt="Lithium battery energy storage"
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-500 ease-premium group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-gold-bright">
                Energy Solutions
              </p>
            </Link>
          </div>
        </Reveal>
      </Container>

      {/* Editorial stats line — huge numbers, no cards, no borders around each item */}
      <div className="relative hidden border-t border-border-hairline lg:block">
        <Container className="grid grid-cols-2 divide-x divide-y divide-border-hairline sm:grid-cols-4 sm:divide-y-0">
          {heroStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="px-1 py-8 sm:px-8"
            >
              <p className="text-stat font-serif font-semibold text-white tabular-nums">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-ink-muted">{stat.label}</p>
            </Reveal>
          ))}
        </Container>
      </div>
    </section>
  );
}
