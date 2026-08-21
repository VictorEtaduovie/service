"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

const platformValues = [
  {
    icon: "◎",
    title: "Trust comes first",
    description:
      "We are building a marketplace where clients can confidently discover professionals whose identity, qualifications and reputation can be verified.",
  },
  {
    icon: "⌖",
    title: "Local by design",
    description:
      "Our platform is built around location intelligence, helping people discover the right professionals nearby and making local services easier to access.",
  },
  {
    icon: "✦",
    title: "Technology that simplifies",
    description:
      "From smart search to real-time tracking, we use technology to remove unnecessary friction from finding and booking services.",
  },
  {
    icon: "↗",
    title: "Better opportunities",
    description:
      "We help skilled professionals become more discoverable, build trusted reputations and connect with customers who need their expertise.",
  },
];

const platformHighlights = [
  "Verified service providers",
  "Location-based discovery",
  "Real-time booking updates",
  "Secure payment experience",
  "Ratings and reviews",
  "Dedicated client and provider tools",
];

export default function AboutPage() {
  const revealRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = revealRef.current;

    if (!root) return;

    const elements = root.querySelectorAll("[data-about-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("about-page__reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page" ref={revealRef}>
      <Navbar />

      <main className="about-page__main">
        {/* HERO */}
        <section className="about-page__hero" data-about-reveal="fade-up">
          <div className="about-page__hero-glow about-page__hero-glow--one" />
          <div className="about-page__hero-glow about-page__hero-glow--two" />

          <div className="about-page__container">
            <div className="about-page__hero-content">
              <span className="about-page__eyebrow">About our platform</span>

              <h1 className="about-page__hero-title">
                Making local services
                <span> easier to find, trust and book.</span>
              </h1>

              <p className="about-page__hero-description">
                We are building a modern marketplace that connects people with
                trusted local professionals through better discovery,
                transparent choices and a simpler booking experience.
              </p>

              <div className="about-page__hero-actions">
                <Link href="/search" className="about-page__primary-button">
                  Find a Service
                </Link>

                <Link
                  href="/provider/start"
                  className="about-page__secondary-button"
                >
                  Become a Provider
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="about-page__intro" data-about-reveal="fade-up">
          <div className="about-page__container">
            <div className="about-page__intro-grid">
              <div className="about-page__intro-heading">
                <span className="about-page__section-kicker">Why we exist</span>

                <h2 className="about-page__section-title">
                  Finding a reliable professional should not feel difficult.
                </h2>
              </div>

              <div className="about-page__intro-copy">
                <p>
                  Every day, people need services they can trust — from home
                  repairs and personal care to technology, education, healthcare
                  and professional services.
                </p>

                <p>
                  At the same time, skilled professionals often struggle to
                  reach the right customers and prove the quality of the work
                  they provide.
                </p>

                <p>
                  We are creating one connected platform that brings both sides
                  together in a way that is local, transparent and designed for
                  real-world service experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PLATFORM STORY */}
        <section className="about-page__story" data-about-reveal="fade-up">
          <div className="about-page__container">
            <div className="about-page__story-card">
              <div className="about-page__story-content">
                <span className="about-page__section-kicker">The platform</span>

                <h2 className="about-page__section-title">
                  More than a directory.
                </h2>

                <p>
                  We are building a full service marketplace — not simply a
                  place where providers list their names.
                </p>

                <p>
                  Clients can discover nearby professionals, compare options,
                  book services, communicate directly and follow active jobs in
                  real time.
                </p>

                <p>
                  Providers get tools to manage their services, availability,
                  bookings, earnings, reputation and professional profile from
                  one place.
                </p>

                <Link href="/how-it-works" className="about-page__inline-link">
                  See how it works →
                </Link>
              </div>

              <div className="about-page__story-visual">
                <div className="about-page__visual-main">
                  <div className="about-page__visual-top">
                    <span>LOCAL SERVICE MARKETPLACE</span>
                    <span>LIVE</span>
                  </div>

                  <div className="about-page__visual-route">
                    <div className="about-page__visual-route-line" />

                    <div className="about-page__visual-marker about-page__visual-marker--start">
                      <span />
                    </div>

                    <div className="about-page__visual-marker about-page__visual-marker--end">
                      <span />
                    </div>
                  </div>

                  <div className="about-page__visual-bottom">
                    <div>
                      <small>Provider</small>
                      <strong>Verified Professional</strong>
                    </div>

                    <div>
                      <small>Status</small>
                      <strong>On the way</strong>
                    </div>
                  </div>
                </div>

                <div className="about-page__visual-floating about-page__visual-floating--top">
                  <span className="about-page__visual-floating-icon">✓</span>

                  <div>
                    <small>Identity</small>
                    <strong>Verified</strong>
                  </div>
                </div>

                <div className="about-page__visual-floating about-page__visual-floating--bottom">
                  <span className="about-page__visual-floating-icon">★</span>

                  <div>
                    <small>Reputation</small>
                    <strong>Trusted ratings</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="about-page__values" data-about-reveal="fade-up">
          <div className="about-page__container">
            <div className="about-page__section-heading">
              <span className="about-page__section-kicker">What guides us</span>

              <h2 className="about-page__section-title">
                Built around people, trust and useful technology.
              </h2>

              <p>
                Every part of the product is designed to make the service
                experience better for both clients and professionals.
              </p>
            </div>

            <div className="about-page__value-grid">
              {platformValues.map((value, index) => (
                <article
                  className="about-page__value-card"
                  key={value.title}
                  data-about-reveal="fade-up"
                  style={{
                    transitionDelay: `${index * 80}ms`,
                  }}
                >
                  <div className="about-page__value-icon">{value.icon}</div>

                  <h3>{value.title}</h3>

                  <p>{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PLATFORM CAPABILITIES */}
        <section
          className="about-page__capabilities"
          data-about-reveal="fade-up"
        >
          <div className="about-page__container">
            <div className="about-page__capabilities-grid">
              <div
                className="about-page__capabilities-copy"
                data-about-reveal="fade-left"
              >
                <span className="about-page__section-kicker">
                  What we're building
                </span>

                <h2 className="about-page__section-title">
                  A complete service experience from discovery to completion.
                </h2>

                <p>
                  Our platform combines marketplace discovery, verification,
                  booking, communication, payments and location intelligence
                  into one connected experience.
                </p>

                <Link href="/how-it-works" className="about-page__inline-link">
                  Explore the experience →
                </Link>
              </div>

              <div className="about-page__capability-list">
                {platformHighlights.map((highlight, index) => (
                  <div
                    className="about-page__capability-item"
                    key={highlight}
                    data-about-reveal="fade-right"
                    style={{
                      transitionDelay: `${index * 70}ms`,
                    }}
                  >
                    <span className="about-page__capability-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>{highlight}</span>

                    <span className="about-page__capability-arrow">→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section className="about-page__trust" data-about-reveal="fade-up">
          <div className="about-page__container">
            <div className="about-page__trust-card">
              <div>
                <span className="about-page__section-kicker">
                  A marketplace built for trust
                </span>

                <h2>Better information leads to better decisions.</h2>

                <p>
                  Verification, reviews, clear service information and
                  transparent booking experiences help clients make informed
                  choices while giving professionals the opportunity to build
                  lasting reputations.
                </p>
              </div>

              <div className="about-page__trust-stat">
                <strong>01</strong>
                <span>Trust is part of the product, not an afterthought.</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-page__cta" data-about-reveal="fade-up">
          <div className="about-page__container">
            <div className="about-page__cta-card">
              <span className="about-page__cta-kicker">Get started</span>

              <h2>Find the right professional for what you need.</h2>

              <p>
                Discover trusted local services or join the marketplace as a
                professional.
              </p>

              <div className="about-page__cta-actions">
                <Link href="/search" className="about-page__cta-primary">
                  Explore Services
                </Link>

                <Link
                  href="/provider/start"
                  className="about-page__cta-secondary"
                >
                  Join as a Provider
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
