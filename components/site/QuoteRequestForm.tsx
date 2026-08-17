"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/States";
import { submitQuoteRequest } from "@/services/quotes.service";

const productCategories = [
  "Automotive Parts",
  "EV Components",
  "Lithium Battery Systems",
  "Industrial Battery Solutions",
  "Energy Storage Systems",
  "Car Accessories",
  "Detailing Products",
  "OEM Solutions",
  "Other",
];

const countries = [
  "India",
  "United Arab Emirates",
  "Saudi Arabia",
  "Other Middle East",
  "Kenya",
  "Nigeria",
  "Other Africa",
  "Indonesia",
  "Vietnam",
  "Other Southeast Asia",
  "Germany",
  "United Kingdom",
  "Other Europe",
  "Other",
];

export function QuoteRequestForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await submitQuoteRequest(formData);

    if (result.success) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setFileName(null);
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-md border border-status-success/30 bg-status-success/5 p-12 text-center">
        <CheckCircle2 size={30} className="text-status-success" />
        <p className="text-lg font-medium text-white">Quote request received</p>
        <p className="max-w-md text-sm text-ink-muted">
          Thank you for your inquiry. Our trade team will review your requirements and respond
          with pricing and lead times shortly.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <fieldset className="space-y-5">
        <legend className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold-bright">
          Your Details
        </legend>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input name="fullName" label="Full Name" placeholder="John Doe" required />
          <Input name="companyName" label="Company Name" placeholder="Doe Enterprises" required />
          <Input name="email" type="email" label="Email" placeholder="john.doe@example.com" required />
          <Input name="phone" type="tel" label="Phone" placeholder="+91 00000 00000" required />
          <Select name="country" label="Country" required defaultValue="">
            <option value="" disabled>
              Select your country
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
          <Input name="shippingDestination" label="Shipping Destination" placeholder="Port / City, Country" required />
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold-bright">
          Order Requirements
        </legend>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Select name="productCategory" label="Product / Category" required defaultValue="">
            <option value="" disabled>
              Select a category
            </option>
            {productCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Input name="quantity" label="Quantity" placeholder="e.g. 500 units" required />
          <Input name="targetPrice" label="Target Price (optional)" placeholder="e.g. USD 12,000" />
          <Input name="requiredDeliveryDate" type="date" label="Required Delivery Date" />
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold-bright">
          Additional Information
        </legend>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wider text-ink-muted">Message</label>
          <textarea
            name="message"
            rows={5}
            placeholder="Share specifications, standards, packaging requirements or anything else relevant to your order..."
            className="w-full rounded border border-border bg-bg-elevated px-4 py-3 text-sm text-white placeholder:text-ink-faint transition-colors duration-200 focus-visible:outline-none focus-visible:border-gold-bright"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wider text-ink-muted">
            Attach Specification Sheet (optional)
          </label>
          <input
            type="file"
            name="attachment"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            className="w-full rounded border border-dashed border-border bg-bg-elevated px-4 py-3 text-sm text-ink-muted file:mr-4 file:rounded file:border-0 file:bg-gold-soft file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:text-gold-bright"
          />
          <p className="text-xs text-ink-faint">
            {fileName ? `Selected: ${fileName}` : "PDF, Word, Excel or image, up to 10MB."}
          </p>
        </div>
      </fieldset>

      {status === "error" && (
        <ErrorState title="Couldn't submit your request" message={errorMessage || "Please try again."} />
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Submitting..." : "Submit Quote Request"}
      </Button>
    </form>
  );
}
