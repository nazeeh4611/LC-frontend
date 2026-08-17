import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/site/LegalPageTemplate";

export const metadata: Metadata = { title: "Refund / Cancellation Policy" };

export default function RefundPolicyPage() {
  return (
    <LegalPageTemplate
      title="Refund / Cancellation Policy"
      lastUpdated="August 2026 (placeholder)"
      intro="This policy outlines how order cancellations and refunds are generally handled. Specific terms may vary by order type (retail, wholesale, or export) and will be confirmed in your order agreement. This is placeholder content and requires legal review before publication."
      sections={[
        {
          heading: "Order Cancellations",
          paragraphs: [
            "Cancellation requests should be submitted as soon as possible after placing an order. Orders that have already entered production, packing or shipping may not be eligible for cancellation.",
          ],
        },
        {
          heading: "Refund Eligibility",
          paragraphs: [
            "Refunds may be issued for confirmed order cancellations, verified product defects, or shipment errors, subject to inspection and verification.",
            "Custom, OEM or bulk wholesale orders may be subject to different refund terms, which will be specified in the relevant order agreement.",
          ],
        },
        {
          heading: "Refund Processing",
          paragraphs: [
            "Approved refunds are processed to the original payment method within a reasonable timeframe. Processing times may vary depending on the payment gateway or bank.",
          ],
        },
        {
          heading: "Non-Refundable Items",
          paragraphs: [
            "Certain custom-manufactured or made-to-order products may not be eligible for refund once production has started.",
          ],
        },
      ]}
    />
  );
}
