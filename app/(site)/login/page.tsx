"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/States";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const result = await login(String(form.get("email") ?? ""), String(form.get("password") ?? ""));

    if (result.ok) {
      router.push(searchParams.get("redirect") || "/account");
    } else {
      setStatus("error");
      setErrorMessage(result.message || "Invalid email or password.");
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-16">
      <Container className="max-w-md">
        <Card className="p-8">
          <h1 className="text-xl font-semibold text-white">Sign In</h1>
          <p className="mt-1 text-sm text-ink-muted">Access your account and order history.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <Input name="email" type="email" label="Email" placeholder="you@example.com" required />
            <Input name="password" type="password" label="Password" placeholder="••••••••" required />

            {status === "error" && <ErrorState message={errorMessage} className="py-6" />}

            <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
              {status === "submitting" ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-5 flex justify-between text-xs text-ink-muted">
            <Link href="/forgot-password" className="hover:text-gold-bright">
              Forgot password?
            </Link>
            <Link href="/register" className="hover:text-gold-bright">
              Create an account
            </Link>
          </div>
        </Card>
      </Container>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
