import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/site/CTASection";
import { articles } from "@/lib/articles";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article Not Found" };
  return { title: article.title, description: article.excerpt };
}

export default function ArticleDetailPage({ params }: PageProps) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  return (
    <>
      <Breadcrumbs items={[{ label: "Insights", href: "/insights" }, { label: article.title }]} />

      <article className="py-16 md:py-20">
        <Container className="max-w-3xl">
          <Badge variant="gold">{article.category}</Badge>
          <h1 className="mt-5 text-display-md font-semibold text-white md:text-display-lg">
            {article.title}
          </h1>
          <div className="mt-5 flex items-center gap-2 text-sm text-ink-muted">
            <Calendar size={14} />
            {new Date(article.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          <div className="mt-10 space-y-6 border-t border-border-hairline pt-10">
            {article.content.map((paragraph, i) => (
              <p key={i} className="text-ink-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </article>

      <CTASection
        eyebrow="Stay In Touch"
        title="Want updates like this in your inbox?"
        description="Reach out to our team to stay informed on our latest news and trade opportunities."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
    </>
  );
}
