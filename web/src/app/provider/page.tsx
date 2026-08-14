"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export default function BecomeProviderStartPage() {
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Temporary UI flow until backend is connected
    router.push(`/provider/otp?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="provider-start">
      <Navbar />

      <main className="provider-start__main">
        <section className="provider-start__hero">
          <div className="provider-start__container">
            <div className="provider-start__grid">
              <div className="provider-start__copy">
                <span className="provider-start__badge">
                  Provider Onboarding
                </span>

                <h1 className="provider-start__title">
                  Get started as a service provider
                </h1>

                <p className="provider-start__subtitle">
                  Enter your email to begin the verification process. We will
                  send a one-time code to confirm your account and continue
                  setup.
                </p>

                <div
                  className="provider-start__steps"
                  aria-label="Onboarding steps"
                >
                  <div className="provider-start__step">
                    <span className="provider-start__step-number">1</span>
                    <div>
                      <div className="provider-start__step-title">
                        Submit your email
                      </div>
                      <div className="provider-start__step-text">
                        Start the registration flow with your email address.
                      </div>
                    </div>
                  </div>

                  <div className="provider-start__step">
                    <span className="provider-start__step-number">2</span>
                    <div>
                      <div className="provider-start__step-title">
                        Verify with OTP
                      </div>
                      <div className="provider-start__step-text">
                        We send a code to confirm that the email belongs to you.
                      </div>
                    </div>
                  </div>

                  <div className="provider-start__step">
                    <span className="provider-start__step-number">3</span>
                    <div>
                      <div className="provider-start__step-title">
                        Complete your profile
                      </div>
                      <div className="provider-start__step-text">
                        Add your services, location and verification details.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="provider-start__card">
                <div className="provider-start__card-top">
                  <div className="provider-start__card-kicker">Step 1 of 3</div>

                  <h2 className="provider-start__card-title">
                    Enter your email
                  </h2>

                  <p className="provider-start__card-subtitle">
                    Use the email you want linked to your provider profile.
                  </p>
                </div>

                <form className="provider-start__form" onSubmit={handleSubmit}>
                  <label
                    className="provider-start__label"
                    htmlFor="provider-email"
                  >
                    Email address
                  </label>

                  <input
                    id="provider-email"
                    type="email"
                    className="provider-start__input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <button type="submit" className="provider-start__button">
                    Send OTP
                  </button>

                  <p className="provider-start__help">
                    We will only use this email for account verification and
                    onboarding.
                  </p>
                </form>

                <div className="provider-start__card-footer">
                  <span className="provider-start__card-footer-text">
                    Already started?
                  </span>

                  <Link href="/signin" className="provider-start__link">
                    Sign in instead
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
