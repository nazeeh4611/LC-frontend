import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/site/LegalPageTemplate";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiePolicyPage() {
  return (
    <LegalPageTemplate
      title="Cookie Policy"
      lastUpdated="August 2026 (placeholder)"
      intro="This policy explains how Louis CALTEN International LLP uses cookies and similar technologies on this website. This is placeholder content and requires legal review before publication."
      sections={[
        {
          heading: "What Are Cookies",
          paragraphs: [
            "Cookies are small text files stored on your device that help websites function properly and remember information about your visit.",
          ],
        },
        {
          heading: "How We Use Cookies",
          paragraphs: [
            "We may use essential cookies required for core website functionality, such as maintaining your session while browsing or completing a checkout flow.",
            "We may also use analytics cookies to help us understand how visitors use the website, so we can improve it over time.",
          ],
        },
        {
          heading: "Managing Cookies",
          paragraphs: [
            "Most browsers allow you to control cookies through their settings. Disabling certain cookies may affect the functionality of parts of this website.",
          ],
        },
      ]}
    />
  );
}
