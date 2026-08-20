"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export default function ClientOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const providerId = searchParams.get("providerId") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [isVerifying, setIsVerifying] = useState(false);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];

    updatedOtp[index] = value.slice(-1);

    setOtp(updatedOtp);

    if (value && index < 5) {
      document.getElementById(`client-otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`client-otp-${index - 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) return;

    setIsVerifying(true);

    // Temporary testing data.
    // Later this will be checked against the backend/database.
    const registeredEmails = ["registered@example.com", "client@test.com"];

    const normalizedEmail = email.trim().toLowerCase();

    const isRegistered = registeredEmails.includes(normalizedEmail);

    setTimeout(() => {
      if (isRegistered) {
        localStorage.setItem("client_logged_in", "true");
        localStorage.setItem("client_email", normalizedEmail);

        router.push("/client/dashboard");
        return;
      }

      router.push(
        `/client/auth/complete-profile?email=${encodeURIComponent(
          normalizedEmail,
        )}&providerId=${encodeURIComponent(providerId)}`,
      );
    }, 600);
  };

  return (
    <div className="client-otp">
      <Navbar />

      <main className="client-otp__main">
        <div className="client-otp__container">
          <div className="client-otp__card">
            <div className="client-otp__icon">✉</div>

            <span className="client-otp__eyebrow">Email verification</span>

            <h1>Check your email</h1>

            <p className="client-otp__description">
              We sent a 6-digit verification code to
            </p>

            <strong className="client-otp__email">{email}</strong>

            <div className="client-otp__inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`client-otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(event) => handleChange(event.target.value, index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  autoFocus={index === 0}
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="client-otp__verify"
              disabled={otp.join("").length !== 6 || isVerifying}
              onClick={handleVerify}
            >
              {isVerifying ? "Verifying..." : "Verify & Continue"}
            </button>

            <button type="button" className="client-otp__resend">
              Resend code
            </button>

            <p className="client-otp__footer">
              Didn&apos;t receive it? Check your spam folder or request another
              code.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
