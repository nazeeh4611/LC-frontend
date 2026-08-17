import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/site/LegalPageTemplate";

export const metadata: Metadata = { title: "Shipping Policy" };

export default function ShippingPolicyPage() {
  return (
    <LegalPageTemplate
      title="Shipping Policy"
      lastUpdated="August 2026 (placeholder)"
      intro="This policy describes how orders are shipped, including delivery timelines and carrier information. Specific shipping terms are confirmed at the time of order based on destination and product type. This is placeholder content and requires legal review before publication."
      sections={[
        {
          heading: "Delivery Partners",
          paragraphs: [
            "We work with established international carriers including DHL, FedEx, Aramex, UPS and DTDC International to fulfill domestic and export shipments.",
          ],
        },
        {
          heading: "Delivery Timelines",
          paragraphs: [
            "Estimated delivery timelines vary by destination, shipping method and product type. Standard, express and priority shipping options are typically available and will be confirmed at checkout or in your order quotation.",
          ],
        },
        {
          heading: "International Shipping & Customs",
          paragraphs: [
            "For international and export orders, the buyer is generally responsible for import duties, taxes and customs clearance unless otherwise agreed in writing.",
            "Export documentation, including commercial invoices and certificates of origin, will be provided as applicable.",
          ],
        },
        {
          heading: "Tracking",
          paragraphs: [
            "Once an order is shipped, tracking information will be shared with the customer where available.",
          ],
        },
      ]}
    />
  );
}
