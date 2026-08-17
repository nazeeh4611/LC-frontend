"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/States";
import { forgotPassword } from "@/services/auth.service";

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    const result = await forgotPassword(String(form.get("email") ?? ""));
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-16">
      <Container className="max-w-md">
        <Card className="p-8">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 text-center">
              <CheckCircle2 size={28} className="text-status-success" />
              <p className="font-medium text-white">Check your email</p>
              <p className="text-sm text-ink-muted">
                If an account exists for that email, we&apos;ve sent a password reset link.
              </p>
              <Link href="/login" className="text-sm text-gold-bright hover:underline">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-white">Forgot Password</h1>
              <p className="mt-1 text-sm text-ink-muted">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <Input name="email" type="email" label="Email" placeholder="you@example.com" required />
                {status === "error" && <ErrorState message={errorMessage} className="py-6" />}
                <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </>
          )}
        </Card>
      </Container>
    </section>
  );
}
