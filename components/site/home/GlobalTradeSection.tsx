import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { GlobalPresenceMap, RegionCard } from "@/components/site/GlobalPresenceMap";

export function GlobalTradeSection({ regionCards }: { regionCards: RegionCard[] }) {
  return (
    <section className="relative overflow-hidden border-t border-border-hairline bg-bg-secondary/40 py-20 md:py-28">
      <Container>
        <Reveal className="mb-14 max-w-2xl md:mb-16">
          <SectionLabel>Worldwide</SectionLabel>
          <h2 className="text-editorial font-bold uppercase text-white">
            Global <span className="text-gradient-gold">Reach.</span>
          </h2>
          <p className="mt-5 text-ink-muted leading-relaxed">
            Headquartered in India with active trade operations and emerging
            distribution reach across the Middle East, Africa, Southeast Asia and
            Europe.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <GlobalPresenceMap cards={regionCards} />
        </Reveal>

        <div className="mt-10">
          <Link
            href="/global-presence"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-bright"
          >
            View Global Presence <ArrowRight size={14} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
