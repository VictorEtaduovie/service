"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top border-bottom py-3">
      <div className="container">
        {/* Logo */}
        <Link
          href="/"
          className="navbar-brand fw-bolder fs-4 tracking-tighter"
          style={{ color: "var(--color-primary)" }}
        >
          YourPlatformName
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link
                href="/search"
                className={`nav-link fw-medium ${
                  pathname.startsWith("/search") ? "active text-primary fw-bold" : ""
                }`}
              >
                Browse Services
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/how-it-works"
                className={`nav-link fw-medium ${
                  isActive("/how-it-works") ? "active text-primary fw-bold" : ""
                }`}
              >
                How It Works
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/auth/signup"
                className={`nav-link fw-medium ${
                  pathname.startsWith("/auth/signup") ? "active text-primary fw-bold" : ""
                }`}
              >
                Become a Provider
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/pricing"
                className={`nav-link fw-medium ${
                  isActive("/pricing") ? "active text-primary fw-bold" : ""
                }`}
              >
                Pricing
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/help"
                className={`nav-link fw-medium ${
                  isActive("/help") ? "active text-primary fw-bold" : ""
                }`}
              >
                Help
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link
              href="/auth/login"
              className={`text-decoration-none fw-bold ${
                pathname.startsWith("/auth/login")
                  ? "text-primary"
                  : "text-dark"
              } me-2`}
            >
              Sign In
            </Link>

            <Link
              href="/auth/signup"
              className="btn btn-primary px-4 py-2 fw-bold shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}