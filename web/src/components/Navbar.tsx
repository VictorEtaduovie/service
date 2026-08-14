"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top border-bottom py-3">
      <div className="container">
        {/* Logo */}
        <Link
          href="/"
          className="navbar-brand fw-bolder fs-4 tracking-tighter"
          style={{ color: "var(--color-primary)" }}
          onClick={closeMenu}
        >
          YourPlatformName
        </Link>

        {/* Mobile Hamburger / X */}
        <button
          className={`navbar-toggler custom-navbar-toggler ${
            isOpen ? "is-open" : ""
          }`}
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation */}
        <div
          className={`navbar-collapse mobile-nav-menu ${
            isOpen ? "is-open" : ""
          }`}
          id="navContent"
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link
                href="/search"
                onClick={closeMenu}
                className={`nav-link fw-medium ${
                  pathname.startsWith("/search")
                    ? "active text-primary fw-bold"
                    : ""
                }`}
              >
                Browse Services
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/how-it-works"
                onClick={closeMenu}
                className={`nav-link fw-medium ${
                  isActive("/how-it-works") ? "active text-primary fw-bold" : ""
                }`}
              >
                How It Works
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/provider"
                onClick={closeMenu}
                className={`nav-link fw-medium ${
                  pathname.startsWith("/provider")
                    ? "active text-primary fw-bold"
                    : ""
                }`}
              >
                Become a Provider
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/pricing"
                onClick={closeMenu}
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
                onClick={closeMenu}
                className={`nav-link fw-medium ${
                  isActive("/help") ? "active text-primary fw-bold" : ""
                }`}
              >
                Help
              </Link>
            </li>
          </ul>

          {/* Auth buttons */}
          <div className="d-flex align-items-center gap-3 navbar-auth-actions">
            <Link
              href="/auth/login"
              onClick={closeMenu}
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
              onClick={closeMenu}
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
