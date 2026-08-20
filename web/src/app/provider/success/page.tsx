"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export default function ProviderSuccessPage() {
  return (
    <div className="provider-success">
      <Navbar />

      <main className="provider-success__main">
        <div className="provider-success__container">
          <div className="provider-success__card">
            <div className="provider-success__icon" aria-hidden="true">
              ✓
            </div>

            <h1 className="provider-success__title">Registration Successful</h1>

            <p className="provider-success__message">
              Thank you for registering as a service provider. Your application
              has been successfully submitted and a confirmation email has been
              sent to you.
            </p>

            <p className="provider-success__notice-text">
              We will review your application and get back to you within
              <strong> three working days.</strong>
            </p>

            <div className="provider-success__actions">
              <Link href="/" className="provider-success__primary-button">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
