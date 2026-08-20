"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export default function ProviderLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Temporary frontend-only login until backend authentication is connected.
    if (!password) return;

    router.push("/provider/home");
  };

  return (
    <div className="provider-login">
      <Navbar />

      <main className="provider-login__main">
        <div className="provider-login__container">
          <div className="provider-login__card">
            <div className="provider-login__icon" aria-hidden="true">
              🔐
            </div>

            <div className="provider-login__header">
              <span className="provider-login__badge">Provider Account</span>

              <h1 className="provider-login__title">Welcome back</h1>

              <p className="provider-login__subtitle">
                Sign in to continue to your provider dashboard.
              </p>
            </div>

            <form className="provider-login__form" onSubmit={handleLogin}>
              <div className="provider-login__field">
                <label
                  htmlFor="provider-login-email"
                  className="provider-login__label"
                >
                  Email address
                </label>

                <input
                  id="provider-login-email"
                  type="email"
                  className="provider-login__input provider-login__input--readonly"
                  value={email}
                  readOnly
                  aria-readonly="true"
                />
              </div>

              <div className="provider-login__field">
                <div className="provider-login__label-row">
                  <label
                    htmlFor="provider-login-password"
                    className="provider-login__label"
                  >
                    Password
                  </label>

                  <Link
                    href="/provider/forgot-password"
                    className="provider-login__forgot"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="provider-login__password-wrap">
                  <input
                    id="provider-login-password"
                    type={showPassword ? "text" : "password"}
                    className="provider-login__input provider-login__password-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="provider-login__password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button type="submit" className="provider-login__button">
                Sign in
              </button>
            </form>

            <div className="provider-login__footer">
              <span className="provider-login__footer-text">
                Need a provider account?
              </span>

              <Link href="/provider/start" className="provider-login__link">
                Get started
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
