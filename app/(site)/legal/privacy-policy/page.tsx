import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/site/LegalPageTemplate";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPageTemplate
      title="Privacy Policy"
      lastUpdated="August 2026 (placeholder)"
      intro="Louis CALTEN International LLP ('we', 'us', 'our') respects your privacy. This policy explains what information we collect through our website, how we use it, and the choices you have. This is placeholder content and requires legal review before publication."
      sections={[
        {
          heading: "Information We Collect",
          paragraphs: [
            "We may collect information you provide directly, such as your name, company name, email address, phone number and shipping details when you submit a contact form, request a quote, apply for a job, or place an order.",
            "We may also collect limited technical information such as browser type and pages visited to help us improve the website.",
          ],
        },
        {
          heading: "How We Use Your Information",
          paragraphs: [
            "We use the information you provide to respond to inquiries, process quote requests and orders, manage customer accounts, and communicate with you about our products and services.",
          ],
        },
        {
          heading: "Sharing of Information",
          paragraphs: [
            "We do not sell your personal information. We may share information with trusted service providers such as payment processors and shipping partners solely to fulfill your requests and orders.",
          ],
        },
        {
          heading: "Data Security",
          paragraphs: [
            "We take reasonable measures to protect the information we hold, including secure transmission and access controls. No method of transmission over the internet is completely secure.",
          ],
        },
        {
          heading: "Your Choices",
          paragraphs: [
            "You may contact us at any time to ask about the information we hold about you, request corrections, or request deletion, subject to applicable law and legitimate business needs.",
          ],
        },
        {
          heading: "Contact Us",
          paragraphs: [
            "For questions about this policy, please contact info@louiscalteninternational.com.",
          ],
        },
      ]}
    />
  );
}
