"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export default function ClientEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const providerId = searchParams.get("providerId") || "";

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      router.push(
        `/client/auth/otp?email=${encodeURIComponent(
          email.trim(),
        )}&providerId=${encodeURIComponent(providerId)}`,
      );
    }, 500);
  };

  return (
    <div className="client-email">
      <Navbar />

      <main className="client-email__main">
        <div className="client-email__container">
          <div className="client-email__card">
            <div className="client-email__icon">✦</div>

            <span className="client-email__eyebrow">Secure booking</span>

            <h1>Let&apos;s get you started</h1>

            <p className="client-email__description">
              Enter your email to continue securely with your booking.
              We&apos;ll send you a one-time verification code.
            </p>

            <form className="client-email__form" onSubmit={handleSubmit}>
              <label htmlFor="client-email">Email address</label>

              <input
                id="client-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending code..." : "Continue"}
              </button>
            </form>

            <p className="client-email__privacy">
              Your email will be used to securely identify your account and
              continue your booking.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
