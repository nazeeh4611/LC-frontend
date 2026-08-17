"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/States";
import { resetPassword } from "@/services/auth.service";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    const result = await resetPassword(token, String(form.get("password") ?? ""));
    if (result.success) {
      router.push("/login");
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-16">
      <Container className="max-w-md">
        <Card className="p-8">
          <h1 className="text-xl font-semibold text-white">Reset Password</h1>
          <p className="mt-1 text-sm text-ink-muted">Choose a new password for your account.</p>

          {!token ? (
            <ErrorState
              title="Invalid reset link"
              message="This password reset link is missing or invalid. Please request a new one."
              className="mt-6 py-8"
            />
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <Input
                name="password"
                type="password"
                label="New Password"
                placeholder="At least 8 characters"
                required
                minLength={8}
              />
              {status === "error" && <ErrorState message={errorMessage} className="py-6" />}
              <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
                {status === "submitting" ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}
        </Card>
      </Container>
    </section>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
