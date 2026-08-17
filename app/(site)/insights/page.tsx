import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/layout/Section";
import { InsightsList } from "@/components/site/InsightsList";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Insights & News",
  description: "The latest news, announcements and industry insights from Louis CALTEN International LLP.",
  keywords: ["automotive industry news", "lithium battery industry insights", "global trade news"],
  openGraph: { images: [{ url: siteImages.globalTrade }] },
};

export default function InsightsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Insights" }]} />
      <PageHero
        eyebrow="Newsroom"
        title="Insights & News"
        description="Stay updated with the latest news, announcements and industry developments from Louis CALTEN International LLP."
        image={siteImages.globalTrade}
        imageAlt="Global trade and logistics network"
      />
      <Section eyebrow="Latest" title="All Articles">
        <InsightsList />
      </Section>
    </>
  );
}
