"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import SearchBar from "@/components/SearchBar";

// ─── TRUST STRIP ────────────────────────────────────────────────────────────

const trustItems = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
          fill="#1E3A8A"
          opacity=".15"
        />
        <path
          d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
          stroke="#1E3A8A"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="#2563EB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Verified Professionals",
    sub: "Every pro ID-checked & approved",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="6"
          width="18"
          height="13"
          rx="2"
          fill="#1E3A8A"
          opacity=".12"
        />
        <rect
          x="3"
          y="6"
          width="18"
          height="13"
          rx="2"
          stroke="#1E3A8A"
          strokeWidth="1.8"
        />
        <path d="M3 10h18" stroke="#2563EB" strokeWidth="1.8" />
        <circle cx="7.5" cy="14.5" r="1.5" fill="#2563EB" />
      </svg>
    ),
    label: "Secure Payments",
    sub: "Escrow-protected until job done",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#1E3A8A" opacity=".12" />
        <circle cx="12" cy="12" r="9" stroke="#1E3A8A" strokeWidth="1.8" />
        <path
          d="M12 7v5l3 3"
          stroke="#2563EB"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="1.5" fill="#1E3A8A" />
      </svg>
    ),
    label: "Live Tracking",
    sub: "Watch your pro arrive in real-time",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
          fill="#1E3A8A"
          opacity=".12"
        />
        <path
          d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
          stroke="#1E3A8A"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M8 10h8M8 13h5"
          stroke="#2563EB"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "24/7 Support",
    sub: "Help whenever you need it",
  },
];

export function TrustStrip() {
  return (
    <section className="trust-strip py-4 bg-white border-bottom">
      <div className="container">
        <div className="row g-0 justify-content-center">
          {trustItems.map((item, i) => (
            <div key={i} className="col-6 col-md-3">
              <div
                className={`trust-item d-flex align-items-center gap-3 px-4 py-3 h-100 ${
                  i < trustItems.length - 1 ? "trust-item--bordered" : ""
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="trust-icon flex-shrink-0">{item.icon}</div>

                <div>
                  <div className="trust-label">{item.label}</div>
                  <div className="trust-sub">{item.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const providers = [
    {
      id: 1,
      name: "Aisha Bello",
      rating: 4.9,
      distance: 1.2,
      price: 35,
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60",
      services: ["Plumbing", "AC Repair", "Water Heater"],
    },
    {
      id: 2,
      name: "John Okoye",
      rating: 4.8,
      distance: 2.4,
      price: 40,
      img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=800&q=60",
      services: ["Electrical", "Generator Repair", "Wiring", "Installation"],
    },
    {
      id: 3,
      name: "Grace N.",
      rating: 4.8,
      distance: 0.9,
      price: 30,
      img: "https://images.unsplash.com/photo-1540218559-7f2c9d9a03b1?w=800&q=60",
      services: ["Beauty Treatment", "Makeup", "Bridal"],
    },
    {
      id: 4,
      name: "Chinedu A.",
      rating: 4.7,
      distance: 3.1,
      price: 45,
      img: "https://images.unsplash.com/photo-1531123414780-fbd87b7c6a88?w=800&q=60",
      services: ["AC Servicing", "Duct Cleaning", "Maintenance"],
    },
    {
      id: 5,
      name: "Aisha Bello",
      rating: 4.9,
      distance: 1.2,
      price: 35,
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60",
      services: ["Plumbing", "AC Repair", "Water Heater"],
    },
    {
      id: 6,
      name: "John Okoye",
      rating: 4.8,
      distance: 2.4,
      price: 40,
      img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=800&q=60",
      services: ["Electrical", "Generator Repair", "Wiring", "Installation"],
    },
    {
      id: 7,
      name: "Grace N.",
      rating: 4.8,
      distance: 0.9,
      price: 30,
      img: "https://images.unsplash.com/photo-1540218559-7f2c9d9a03b1?w=800&q=60",
      services: ["Beauty Treatment", "Makeup", "Bridal"],
    },
    {
      id: 8,
      name: "Chinedu A.",
      rating: 4.7,
      distance: 3.1,
      price: 45,
      img: "https://images.unsplash.com/photo-1531123414780-fbd87b7c6a88?w=800&q=60",
      services: ["AC Servicing", "Duct Cleaning", "Maintenance"],
    },
  ];
  const revealRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elements = revealRef.current?.querySelectorAll("[data-home-reveal]");

    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("home-reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const [expandedProviders, setExpandedProviders] = useState<
    Record<number, boolean>
  >({});

  const toggleProvider = (id: number) => {
    setExpandedProviders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div ref={revealRef}>
      <main>
        <Navbar />

        {/* ================================================================ */}
        {/* HERO SECTION                                                     */}
        {/* ================================================================ */}

        <section className="position-relative min-vh-100 d-flex align-items-center justify-content-center">
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              objectFit: "cover",
              zIndex: -2,
            }}
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-hand-of-a-professional-worker-repairing-an-ac-unit-34444-large.mp4"
              type="video/mp4"
            />
          </video>

          {/* Cinematic Overlay */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background:
                "radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
              zIndex: -1,
            }}
          />

          <div className="container py-5 text-center">
            <div className="row justify-content-center">
              <div className="col-xl-9 col-lg-10">
                {/* Premium Badge */}
                <div
                  className="d-inline-flex align-items-center bg-white bg-opacity-10 px-3 py-2 rounded-pill mb-4 border border-white border-opacity-25 shadow-sm"
                  style={{
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span className="badge bg-primary rounded-pill me-2">
                    Lagos
                  </span>

                  <span className="text-white fw-medium small">
                    2,400+ Verified Pros available now
                  </span>
                </div>

                {/* Hero Heading */}
                <h1
                  className="display-1 fw-bold mb-4 text-white tracking-tighter"
                  style={{
                    lineHeight: "1",
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  Find Trusted Local
                  <br />
                  <span className="text-primary">Services Near You</span>
                </h1>

                {/* Hero Description */}
                <p
                  className="fs-5 text-white mb-5 mx-auto opacity-90"
                  style={{
                    maxWidth: "650px",
                    fontWeight: "400",
                  }}
                >
                  Book verified professionals for home, health, tech, and more.
                  Experience seamless booking with live tracking and secure
                  escrow.
                </p>

                {/* ====================================================== */}
                {/* SHARED SEARCH BAR                                      */}
                {/* ====================================================== */}
                {/*
                This is now the ONLY search component used by the homepage.

                The complete search implementation lives inside:
                  @/components/SearchBar

                The same component can therefore be used on:
                  /        -> <SearchBar />
                  /search  -> <SearchBar />

                No duplicate search CSS or duplicate autocomplete logic
                should be created on the search page.
              */}
                <SearchBar />
              </div>
            </div>
          </div>
        </section>

        {/* {/* ================================================================ */}
        {/* TRUST / PLATFORM PROMISE */}
        {/* ================================================================ */}

        <section
          className="home-trust-premium"
          aria-labelledby="home-trust-title"
        >
          <div className="home-trust-premium__glow" aria-hidden="true" />

          <div className="container home-trust-premium__container">
            <div
              className="home-trust-premium__intro"
              data-home-reveal="fade-up"
            >
              <span className="home-trust-premium__eyebrow">
                Built around trust
              </span>

              <h2 id="home-trust-title">
                A better way to book local services.
              </h2>

              <p>
                Everything you need to discover professionals, make confident
                decisions and stay in control from booking to completion.
              </p>
            </div>

            <div className="home-trust-premium__grid">
              {[
                {
                  key: "verified",
                  number: "01",
                  title: "Verified Professionals",
                  text: "Identity and professional information can be reviewed before providers become discoverable.",
                  icon: "✓",
                },
                {
                  key: "payment",
                  number: "02",
                  title: "Secure Payments",
                  text: "Your payment journey is designed around secure checkout and protected transactions.",
                  icon: "₦",
                },
                {
                  key: "tracking",
                  number: "03",
                  title: "Live Tracking",
                  text: "For eligible in-person services, see your provider's journey and arrival status in real time.",
                  icon: "⌖",
                },
                {
                  key: "support",
                  number: "04",
                  title: "24/7 Support",
                  text: "Help is available when something doesn't go according to plan.",
                  icon: "?",
                },
              ].map((item, index) => (
                <article
                  key={item.key}
                  className="home-trust-premium__card"
                  data-home-reveal="fade-up"
                  style={{
                    transitionDelay: `${index * 90}ms`,
                  }}
                >
                  <div className="home-trust-premium__card-top">
                    <span className="home-trust-premium__number">
                      {item.number}
                    </span>

                    <span className="home-trust-premium__icon">
                      {item.icon}
                    </span>
                  </div>

                  <div className="home-trust-premium__card-body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>

                  <span className="home-trust-premium__card-line" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* POPULAR SERVICES */}
        {/* ================================================================ */}

        <section
          className="home-services-premium"
          aria-labelledby="home-services-title"
        >
          <div className="container home-services-premium__container">
            <div
              className="home-services-premium__heading"
              data-home-reveal="fade-up"
            >
              <div>
                <span className="home-services-premium__eyebrow">
                  Explore the marketplace
                </span>

                <h2 id="home-services-title">
                  Services people are booking right now.
                </h2>

                <p>
                  Discover trusted professionals across the services that matter
                  most.
                </p>
              </div>

              <Link
                href="/categories"
                className="home-services-premium__heading-link"
              >
                Explore all services →
              </Link>
            </div>

            <div className="home-services-premium__grid">
              {[
                {
                  id: "home-services",
                  title: "Home Services",
                  description: "Repairs, maintenance and installations.",
                  image:
                    "https://images.unsplash.com/photo-1505691723518-36a6b46a6a93?w=1200&q=80",
                },
                {
                  id: "beauty",
                  title: "Beauty & Personal Care",
                  description: "Beauty, grooming and personal services.",
                  image:
                    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80",
                },
                {
                  id: "health",
                  title: "Health & Medical",
                  description: "Healthcare professionals and services.",
                  image:
                    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
                },
                {
                  id: "tech",
                  title: "Tech & Repairs",
                  description: "Technology support and device repairs.",
                  image:
                    "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&q=80",
                },
                {
                  id: "auto",
                  title: "Automotive",
                  description: "Mechanics, diagnostics and vehicle care.",
                  image:
                    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
                },
                {
                  id: "cleaning",
                  title: "Cleaning Services",
                  description: "Reliable cleaning for homes and businesses.",
                  image:
                    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80",
                },
                {
                  id: "moving",
                  title: "Moving & Delivery",
                  description: "Moving, logistics and local delivery.",
                  image:
                    "https://images.unsplash.com/photo-1600518464441-9154a6d6f7c9?w=1200&q=80",
                },
                {
                  id: "education",
                  title: "Education & Tutoring",
                  description: "Tutors and learning professionals.",
                  image:
                    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
                },
              ].map((category, index) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="home-services-premium__card"
                  data-home-reveal="zoom"
                  style={{
                    transitionDelay: `${index * 70}ms`,
                  }}
                >
                  <div
                    className="home-services-premium__image"
                    style={{
                      backgroundImage: `url(${category.image})`,
                    }}
                  />

                  <div className="home-services-premium__overlay" />

                  <div className="home-services-premium__content">
                    <span className="home-services-premium__arrow">↗</span>

                    <h3>{category.title}</h3>

                    <p>{category.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FEATURED PROVIDERS */}
        {/* ================================================================ */}

        <section
          className="home-providers-premium"
          aria-labelledby="home-providers-title"
        >
          <div className="container home-providers-premium__container">
            <div
              className="home-providers-premium__heading"
              data-home-reveal="fade-up"
            >
              <div>
                <span className="home-providers-premium__eyebrow">
                  Trusted in your area
                </span>

                <h2 id="home-providers-title">Professionals worth knowing.</h2>

                <p>
                  Explore highly rated providers and compare what matters before
                  you book.
                </p>
              </div>

              <Link
                href="/search"
                className="home-providers-premium__heading-link"
              >
                See all providers →
              </Link>
            </div>

            <div className="home-providers-premium__grid">
              {providers.slice(0, 4).map((provider, index) => (
                <article
                  key={provider.id}
                  className="home-providers-premium__card"
                  data-home-reveal="fade-up"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="home-providers-premium__media">
                    <img src={provider.img} alt={`${provider.name} profile`} />

                    <span className="home-providers-premium__online">
                      <i />
                      Available
                    </span>

                    <span className="home-providers-premium__rating">
                      ★ {provider.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="home-providers-premium__body">
                    <div className="home-providers-premium__name-row">
                      <div>
                        <h3>{provider.name}</h3>
                        <span>Verified Professional</span>
                      </div>

                      <strong>From ${provider.price}</strong>
                    </div>

                    <div className="home-providers-premium__location">
                      ⌖ {provider.distance} km away
                    </div>

                    <div className="home-providers-premium__tags">
                      {provider.services.slice(0, 3).map((service) => (
                        <span key={service}>{service}</span>
                      ))}
                    </div>

                    <Link
                      href={`/provider/provider-00${provider.id}`}
                      className="home-providers-premium__button"
                    >
                      View Profile
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* HOW IT WORKS — PREMIUM PARALLAX */}
        {/* ================================================================ */}

        <section className="home_how" aria-labelledby="how-it-works-title">
          <div className="home_how__backdrop" aria-hidden="true" />

          <div className="home_how__overlay" aria-hidden="true" />

          <div className="container home_how__inner">
            <header className="home_how__header" data-home-reveal="fade-up">
              <span className="home_how__eyebrow">Simple by design</span>

              <h2 id="how-it-works-title">
                Great service shouldn&apos;t be complicated.
              </h2>

              <p>
                Find the right professional, compare your options, and stay
                connected from booking to completion.
              </p>
            </header>

            <div className="home_how__grid" role="list">
              {/* STEP 01 */}
              <article
                className="home_how__step"
                role="listitem"
                data-home-reveal="fade-up"
                style={{ transitionDelay: "0ms" }}
              >
                <div className="home_how__step-top">
                  <span className="home_how__number">01</span>

                  <span className="home_how__icon">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="6.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />

                      <path
                        d="M16 16l4.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>

                <div className="home_how__step-body">
                  <span className="home_how__step-label">Discover</span>

                  <h3>Search</h3>

                  <p>
                    Tell us what you need. Search for a service, explore
                    categories, or describe the problem in your own words.
                  </p>
                </div>

                <span className="home_how__step-line" />
              </article>

              {/* STEP 02 */}
              <article
                className="home_how__step"
                role="listitem"
                data-home-reveal="fade-up"
                style={{ transitionDelay: "120ms" }}
              >
                <div className="home_how__step-top">
                  <span className="home_how__number">02</span>

                  <span className="home_how__icon">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 6h16M4 12h10M4 18h7"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />

                      <circle
                        cx="18"
                        cy="17"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                    </svg>
                  </span>
                </div>

                <div className="home_how__step-body">
                  <span className="home_how__step-label">Decide</span>

                  <h3>Compare</h3>

                  <p>
                    Compare ratings, pricing, verification, distance and
                    availability before choosing the professional that fits.
                  </p>
                </div>

                <span className="home_how__step-line" />
              </article>

              {/* STEP 03 */}
              <article
                className="home_how__step"
                role="listitem"
                data-home-reveal="fade-up"
                style={{ transitionDelay: "240ms" }}
              >
                <div className="home_how__step-top">
                  <span className="home_how__number">03</span>

                  <span className="home_how__icon">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 3v4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />

                      <path
                        d="M5.6 6.3l2.8 2"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />

                      <path
                        d="M18.4 6.3l-2.8 2"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />

                      <circle
                        cx="12"
                        cy="13"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />

                      <path
                        d="M12 10v3l2 1"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>

                <div className="home_how__step-body">
                  <span className="home_how__step-label">Complete</span>

                  <h3>Book &amp; Track</h3>

                  <p>
                    Confirm your booking, pay securely and, where applicable,
                    follow your provider&apos;s journey in real time.
                  </p>
                </div>

                <span className="home_how__step-line" />
              </article>
            </div>

            <div className="home_how__footer" data-home-reveal="fade-up">
              <span className="home_how__footer-dot" />

              <span>
                From discovery to completion, everything stays connected.
              </span>
            </div>
          </div>
        </section>
        {/* ================================================================ */}
        {/* WHY CHOOSE US */}
        {/* ================================================================ */}

        <section
          className="home-benefits-premium"
          aria-labelledby="home-benefits-title"
        >
          <div className="container home-benefits-premium__container">
            <div
              className="home-benefits-premium__copy"
              data-home-reveal="fade-left"
            >
              <span className="home-benefits-premium__eyebrow">
                Why people choose us
              </span>

              <h2 id="home-benefits-title">The confidence to book.</h2>

              <p>
                A modern service marketplace should do more than show you a list
                of names. It should help you make a good decision.
              </p>

              <Link href="/safety" className="home-benefits-premium__link">
                Learn about safety & trust →
              </Link>
            </div>

            <div className="home-benefits-premium__list">
              {[
                "Identity-verified providers",
                "Transparent pricing",
                "Location-aware discovery",
                "Secure payment experience",
                "Real-time booking updates",
                "Support and dispute resolution",
              ].map((item, index) => (
                <div
                  key={item}
                  className="home-benefits-premium__item"
                  data-home-reveal="fade-right"
                  style={{
                    transitionDelay: `${index * 70}ms`,
                  }}
                >
                  <span className="home-benefits-premium__check">✓</span>

                  <span>{item}</span>

                  <span className="home-benefits-premium__item-arrow">→</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* TESTIMONIALS */}
        {/* ================================================================ */}

        <section
          className="home-reviews-premium"
          aria-labelledby="home-reviews-title"
        >
          <div className="container home-reviews-premium__container">
            <div
              className="home-reviews-premium__heading"
              data-home-reveal="fade-up"
            >
              <span className="home-reviews-premium__eyebrow">
                Customer experiences
              </span>

              <h2 id="home-reviews-title">
                Good service leaves an impression.
              </h2>

              <p>
                Hear from people who used the platform to find professionals
                they could trust.
              </p>
            </div>

            <div className="home-reviews-premium__grid">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Home Owner",
                  image: "https://randomuser.me/api/portraits/women/44.jpg",
                  text: "I needed an emergency plumber late at night and found several verified professionals almost immediately. The live tracking made the entire experience feel incredibly safe.",
                },
                {
                  name: "Daniel Ade",
                  role: "Business Owner",
                  image: "https://randomuser.me/api/portraits/men/32.jpg",
                  text: "Being able to compare providers before booking changed everything. I could see ratings, availability and location instead of simply choosing a random number online.",
                },
              ].map((review, index) => (
                <article
                  key={review.name}
                  className="home-reviews-premium__card"
                  data-home-reveal="fade-up"
                  style={{
                    transitionDelay: `${index * 120}ms`,
                  }}
                >
                  <div className="home-reviews-premium__quote">“</div>

                  <p>{review.text}</p>

                  <div className="home-reviews-premium__user">
                    <img src={review.image} alt={review.name} />

                    <div>
                      <strong>{review.name}</strong>
                      <span>{review.role}</span>
                    </div>

                    <div className="home-reviews-premium__stars">★★★★★</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FINAL CTA */}
        {/* ================================================================ */}

        <section
          className="home-final-cta"
          aria-labelledby="home-final-cta-title"
        >
          <div className="home-final-cta__glow" />

          <div className="container home-final-cta__container">
            <div className="home-final-cta__content" data-home-reveal="fade-up">
              <span className="home-final-cta__eyebrow">
                Your next service starts here
              </span>

              <h2 id="home-final-cta-title">Find someone you can trust.</h2>

              <p>
                Search thousands of local professionals, compare your options
                and book with confidence.
              </p>

              <div className="home-final-cta__actions">
                <Link href="/search" className="home-final-cta__primary">
                  Find a Professional
                </Link>

                <Link href="/provider" className="home-final-cta__secondary">
                  Become a Provider
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* GET THE APP */}
        {/* ================================================================ */}

        <section className="home-app-premium" aria-labelledby="home-app-title">
          <div className="container home-app-premium__container">
            <div
              className="home-app-premium__copy"
              data-home-reveal="fade-left"
            >
              <span className="home-app-premium__eyebrow">
                Take it with you
              </span>

              <h2 id="home-app-title">Your services, wherever you are.</h2>

              <p>
                Discover providers, manage bookings, chat and track active jobs
                from your phone.
              </p>

              <div className="home-app-premium__badges">
                <a href="#" aria-label="Download on the App Store">
                  <img
                    src="/app-store-badge.png"
                    alt="Download on the App Store"
                  />
                </a>

                <a href="#" aria-label="Get it on Google Play">
                  <img
                    src="/google-play-badge.png"
                    alt="Get it on Google Play"
                  />
                </a>
              </div>
            </div>

            <div className="home-app-premium__visual" data-home-reveal="zoom">
              <div className="home-app-premium__phone">
                <div className="home-app-premium__phone-top">
                  <span>10:24</span>
                  <span>● ● ●</span>
                </div>

                <div className="home-app-premium__phone-card">
                  <span>Live booking</span>
                  <strong>Plumber on the way</strong>
                  <small>8 minutes away</small>
                </div>

                <div className="home-app-premium__phone-map">
                  <span className="home-app-premium__phone-route" />
                  <span className="home-app-premium__phone-user" />
                  <span className="home-app-premium__phone-provider">✓</span>
                </div>

                <div className="home-app-premium__phone-bottom">
                  <span>Message</span>
                  <strong>Track provider</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
