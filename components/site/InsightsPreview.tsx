import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { articles } from "@/lib/articles";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export function InsightsPreview() {
  const [featured, ...rest] = articles.slice(0, 3);
  const supporting = rest;

  if (!featured) return null;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-6">
      {/* Featured article — large editorial treatment */}
      <Reveal>
        <Link
          href={`/insights/${featured.slug}`}
          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[3rem_1rem_3rem_1rem] border border-border bg-gradient-to-br from-bg-secondary via-bg-elevated to-bg p-8 shadow-elevated transition-colors hover:border-gold/30 md:p-12"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/[0.08] blur-3xl" />
          <div className="relative">
            <Badge variant="gold" className="w-fit rounded-full">
              {featured.category}
            </Badge>
            <h3 className="mt-6 max-w-lg text-editorial-sm font-semibold leading-tight text-white">
              {featured.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted md:text-base">
              {featured.excerpt}
            </p>
          </div>
          <div className="relative mt-10 flex items-center justify-between border-t border-border-hairline pt-6">
            <span className="flex items-center gap-1.5 text-xs text-ink-faint">
              <Calendar size={12} />
              {formatDate(featured.date)}
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold-bright transition-transform group-hover:translate-x-1">
              Read More <ArrowRight size={13} />
            </span>
          </div>
        </Link>
      </Reveal>

      {/* Supporting articles — compact editorial rows */}
      <div className="flex flex-col divide-y divide-border-hairline">
        {supporting.map((article, i) => (
          <Reveal key={article.slug} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="py-7 first:pt-0">
            <Link href={`/insights/${article.slug}`} className="group flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-bright">
                  {article.category}
                </p>
                <h4 className="mt-2 line-clamp-3 text-base font-semibold leading-snug text-white transition-colors group-hover:text-gold-bright">
                  {article.title}
                </h4>
                <span className="mt-3 flex items-center gap-1.5 text-xs text-ink-faint">
                  <Calendar size={12} />
                  {formatDate(article.date)}
                </span>
              </div>
              <ArrowUpRight
                size={18}
                className="mt-1 flex-shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-bright"
              />
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
