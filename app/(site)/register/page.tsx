"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/States";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const result = await register({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      phone: String(form.get("phone") ?? "") || undefined,
      companyName: String(form.get("companyName") ?? "") || undefined,
    });

    if (result.ok) {
      router.push("/account");
    } else {
      setStatus("error");
      setErrorMessage(result.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-16">
      <Container className="max-w-md">
        <Card className="p-8">
          <h1 className="text-xl font-semibold text-white">Create an Account</h1>
          <p className="mt-1 text-sm text-ink-muted">Register for faster checkout and order tracking.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <Input name="name" label="Full Name" placeholder="John Doe" required />
            <Input name="email" type="email" label="Email" placeholder="you@example.com" required />
            <Input name="companyName" label="Company Name (optional)" placeholder="Doe Enterprises" />
            <Input name="phone" type="tel" label="Phone (optional)" placeholder="+91 00000 00000" />
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="At least 8 characters"
              required
              minLength={8}
            />

            {status === "error" && <ErrorState message={errorMessage} className="py-6" />}

            <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
              {status === "submitting" ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-ink-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-gold-bright hover:underline">
              Sign in
            </Link>
          </p>
        </Card>
      </Container>
    </section>
  );
}
