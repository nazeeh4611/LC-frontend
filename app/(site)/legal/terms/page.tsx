import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/site/LegalPageTemplate";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <LegalPageTemplate
      title="Terms & Conditions"
      lastUpdated="August 2026 (placeholder)"
      intro="These Terms & Conditions govern your use of the Louis CALTEN International LLP website and the purchase of products through it. This is placeholder content and requires legal review before publication."
      sections={[
        {
          heading: "Use of Website",
          paragraphs: [
            "By accessing this website, you agree to use it only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use of, this website by any third party.",
          ],
        },
        {
          heading: "Orders & Quotations",
          paragraphs: [
            "Quotations provided through this website or in response to an RFQ are subject to confirmation and do not constitute a binding offer until formally accepted by both parties in writing.",
            "Product availability, pricing and lead times are subject to change without notice unless confirmed in a formal order agreement.",
          ],
        },
        {
          heading: "Intellectual Property",
          paragraphs: [
            "All content on this website, including text, graphics, logos and images, is the property of Louis CALTEN International LLP or its licensors and may not be reproduced without permission.",
          ],
        },
        {
          heading: "Limitation of Liability",
          paragraphs: [
            "To the extent permitted by law, Louis CALTEN International LLP shall not be liable for any indirect, incidental or consequential damages arising from the use of this website.",
          ],
        },
        {
          heading: "Governing Law",
          paragraphs: [
            "These terms shall be governed by the laws applicable in India, without regard to conflict of law principles. Final governing law and jurisdiction to be confirmed by legal counsel.",
          ],
        },
      ]}
    />
  );
}
