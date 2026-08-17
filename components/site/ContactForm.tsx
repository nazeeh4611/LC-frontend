"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/States";
import { submitContactRequest } from "@/services/contact.service";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
    };

    const result = await submitContactRequest(payload);

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
        <p className="font-medium text-white">Message sent</p>
        <p className="max-w-sm text-sm text-ink-muted">
          Thank you for reaching out. Our team will get back to you as soon as possible.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input name="fullName" label="Your Name" placeholder="John Doe" required />
        <Input name="email" type="email" label="Your Email" placeholder="john.doe@example.com" required />
        <Input name="phone" type="tel" label="Phone Number" placeholder="+91 00000 00000" />
        <Input name="subject" label="Subject" placeholder="How can we help?" required />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-wider text-ink-muted">Your Message</label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us about your requirements..."
          className="w-full rounded border border-border bg-bg-elevated px-4 py-3 text-sm text-white placeholder:text-ink-faint transition-colors duration-200 focus-visible:outline-none focus-visible:border-gold-bright"
        />
      </div>

      {status === "error" && (
        <ErrorState title="Couldn't send message" message={errorMessage || "Please try again."} className="py-8" />
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
