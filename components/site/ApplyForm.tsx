"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/States";
import { submitCareerApplication } from "@/services/careers.service";

const positions = [
  "Sales & Business Development Executive",
  "Export Documentation Specialist",
  "Warehouse & Logistics Coordinator",
  "Product Manager – Battery Systems",
  "General Application",
];

export function ApplyForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await submitCareerApplication(formData);

    if (result.success) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-md border border-status-success/30 bg-status-success/5 p-10 text-center">
        <CheckCircle2 size={28} className="text-status-success" />
        <p className="font-medium text-white">Application received</p>
        <p className="max-w-sm text-sm text-ink-muted">
          Thank you for your interest in joining Louis CALTEN International LLP. Our team will
          review your application and reach out if there&apos;s a fit.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Submit Another Application
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input name="fullName" label="Full Name" placeholder="John Doe" required />
        <Input name="email" type="email" label="Email" placeholder="john.doe@example.com" required />
        <Input name="phone" type="tel" label="Phone" placeholder="+91 00000 00000" required />
        <Select name="positionAppliedFor" label="Position" required defaultValue="">
          <option value="" disabled>
            Select a position
          </option>
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-wider text-ink-muted">Cover Message</label>
        <textarea
          name="coverMessage"
          rows={5}
          placeholder="Tell us why you'd be a great fit..."
          className="w-full rounded border border-border bg-bg-elevated px-4 py-3 text-sm text-white placeholder:text-ink-faint transition-colors duration-200 focus-visible:outline-none focus-visible:border-gold-bright"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-wider text-ink-muted">Resume / CV</label>
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          className="w-full rounded border border-dashed border-border bg-bg-elevated px-4 py-3 text-sm text-ink-muted file:mr-4 file:rounded file:border-0 file:bg-gold-soft file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:text-gold-bright"
        />
        <p className="text-xs text-ink-faint">PDF or Word document, up to 5MB.</p>
      </div>

      {status === "error" && (
        <ErrorState
          title="Couldn't submit application"
          message={errorMessage || "Please try again."}
          className="py-8"
        />
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
