"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

// Temporary dummy data until the backend/database is connected.
// Add registered provider emails here for testing.
const REGISTERED_PROVIDER_EMAILS = [
  "registered@example.com",
  "provider@test.com",
];

export default function ProviderOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);

    if (value && index < 5) {
      const next = document.getElementById(
        `otp-${index + 1}`,
      ) as HTMLInputElement;

      next?.focus();
    }
  };

  const handleVerify = () => {
    // Temporary check until backend/database is connected.
    const normalizedEmail = email.trim().toLowerCase();

    const isRegistered = REGISTERED_PROVIDER_EMAILS.some(
      (registeredEmail) => registeredEmail.toLowerCase() === normalizedEmail,
    );

    if (isRegistered) {
      // Existing provider → go to provider login
      router.push(`/provider/login?email=${encodeURIComponent(email)}`);
    } else {
      // New provider → continue registration
      router.push(`/provider/register?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="provider-otp">
      <Navbar />

      <main className="provider-otp__main">
        <div className="provider-otp__container">
          <div className="provider-otp__card">
            <div className="provider-otp__icon">✉️</div>

            <div className="provider-otp__header">
              <span className="provider-otp__badge">Email Verification</span>

              <h1 className="provider-otp__title">Verify your email</h1>

              <p className="provider-otp__subtitle">
                We sent a 6-digit verification code to
              </p>

              <strong className="provider-otp__email">
                {email || "your email address"}
              </strong>
            </div>

            <div className="provider-otp__inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="provider-otp__input"
                />
              ))}
            </div>

            <button className="provider-otp__button" onClick={handleVerify}>
              Verify & Continue
            </button>

            <button className="provider-otp__resend" type="button">
              Resend Code
            </button>

            <p className="provider-otp__footer">
              Didn't receive the code? Check your spam folder or request a new
              code.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
