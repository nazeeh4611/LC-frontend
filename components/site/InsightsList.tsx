"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/States";
import { articles, categories } from "@/lib/articles";
import { cn } from "@/lib/utils";

export function InsightsList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = category === "All" || article.category === category;
      const matchesQuery =
        query.trim() === "" ||
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-sm border px-3.5 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors",
                category === cat
                  ? "border-gold/50 bg-gold-soft text-gold-bright"
                  : "border-border text-ink-muted hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded border border-border bg-bg-elevated px-3 py-2 md:w-72">
          <Search size={15} className="text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-transparent text-sm text-white placeholder:text-ink-faint focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No articles found" message="Try a different search term or category." />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <Card key={article.slug} className="flex flex-col p-6">
              <Badge variant="gold" className="w-fit">
                {article.category}
              </Badge>
              <h3 className="mt-4 line-clamp-3 text-base font-semibold leading-snug text-white">
                {article.title}
              </h3>
              <p className="mt-3 flex-1 text-sm text-ink-muted line-clamp-3">{article.excerpt}</p>
              <div className="mt-5 flex items-center justify-between border-t border-border-hairline pt-4">
                <span className="flex items-center gap-1.5 text-xs text-ink-faint">
                  <Calendar size={12} />
                  {new Date(article.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <Link
                  href={`/insights/${article.slug}`}
                  className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold-bright"
                >
                  Read More <ArrowRight size={13} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
