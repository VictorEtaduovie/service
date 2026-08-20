"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

const journeySteps = [
  {
    number: "01",
    eyebrow: "Discover",
    title: "Tell us what you need.",
    description:
      "Search naturally for a service, explore categories, or describe what you need in your own words.",
    visual: "search",
  },
  {
    number: "02",
    eyebrow: "Compare",
    title: "Find the right professional.",
    description:
      "Compare nearby providers using ratings, verification, pricing, availability and distance.",
    visual: "compare",
  },
  {
    number: "03",
    eyebrow: "Book",
    title: "Choose when it happens.",
    description:
      "Book instantly or schedule a service for later. Add notes, photos and the details your provider needs.",
    visual: "book",
  },
  {
    number: "04",
    eyebrow: "Track",
    title: "Know where your provider is.",
    description:
      "For eligible in-person jobs, follow your provider on the map and see their arrival status in real time.",
    visual: "track",
  },
  {
    number: "05",
    eyebrow: "Complete",
    title: "Finish with confidence.",
    description:
      "Confirm completion, review the experience and keep your service history in one place.",
    visual: "complete",
  },
];

const providerSteps = [
  "Create your professional profile",
  "Add your services and specializations",
  "Complete verification",
  "Set your availability and service area",
  "Receive and manage bookings",
];

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [providerActive, setProviderActive] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const interval = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % journeySteps.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="how-it-works-page">
      <Navbar />

      <main className="how-it-works-page__main">
        {/* ===================================================== */}
        {/* HERO */}
        {/* ===================================================== */}

        <section className="how-it-works-page__hero">
          <div className="how-it-works-page__hero-grid" />

          <div className="how-it-works-page__hero-orb how-it-works-page__hero-orb--one" />
          <div className="how-it-works-page__hero-orb how-it-works-page__hero-orb--two" />

          <div className="how-it-works-page__container">
            <div
              className={`how-it-works-page__hero-content ${
                isVisible ? "how-it-works-page__hero-content--visible" : ""
              }`}
            >
              <span className="how-it-works-page__eyebrow">How it works</span>

              <h1 className="how-it-works-page__hero-title">
                From “I need help”
                <span>to “it’s handled.”</span>
              </h1>

              <p className="how-it-works-page__hero-description">
                Discover trusted local professionals, compare your options, book
                with confidence and stay connected from start to finish.
              </p>

              <div className="how-it-works-page__hero-actions">
                <Link
                  href="/search"
                  className="how-it-works-page__primary-button"
                >
                  Find a Service
                </Link>

                <a href="#journey" className="how-it-works-page__hero-link">
                  See how it works
                  <span>↓</span>
                </a>
              </div>

              <div className="how-it-works-page__hero-trust">
                <span>
                  <i />
                  Verified professionals
                </span>

                <span>
                  <i />
                  Secure bookings
                </span>

                <span>
                  <i />
                  Real-time tracking
                </span>
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="how-it-works-page__hero-visual">
              <div className="how-it-works-page__hero-phone">
                <div className="how-it-works-page__phone-top">
                  <span>Nearby professionals</span>
                  <span>⌖ Lagos</span>
                </div>

                <div className="how-it-works-page__phone-search">
                  <span>⌕</span>
                  <span>AC repair</span>
                  <span>×</span>
                </div>

                <div className="how-it-works-page__phone-map">
                  <div className="how-it-works-page__map-road how-it-works-page__map-road--one" />
                  <div className="how-it-works-page__map-road how-it-works-page__map-road--two" />

                  <div className="how-it-works-page__map-pin how-it-works-page__map-pin--one">
                    <span />
                  </div>

                  <div className="how-it-works-page__map-pin how-it-works-page__map-pin--two">
                    <span />
                  </div>

                  <div className="how-it-works-page__map-pin how-it-works-page__map-pin--three">
                    <span />
                  </div>
                </div>

                <div className="how-it-works-page__phone-provider">
                  <div className="how-it-works-page__phone-avatar">✓</div>

                  <div>
                    <strong>Verified AC Specialist</strong>
                    <span>4.9 ★ · 1.2 km away</span>
                  </div>

                  <span className="how-it-works-page__phone-arrow">→</span>
                </div>
              </div>

              <div className="how-it-works-page__floating-card how-it-works-page__floating-card--top">
                <span className="how-it-works-page__floating-icon">✓</span>

                <div>
                  <small>Verified</small>
                  <strong>Identity confirmed</strong>
                </div>
              </div>

              <div className="how-it-works-page__floating-card how-it-works-page__floating-card--bottom">
                <span className="how-it-works-page__floating-icon">↗</span>

                <div>
                  <small>Live</small>
                  <strong>Provider en route</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* JOURNEY */}
        {/* ===================================================== */}

        <section id="journey" className="how-it-works-page__journey">
          <div className="how-it-works-page__container">
            <div className="how-it-works-page__section-heading">
              <span className="how-it-works-page__section-kicker">
                Your journey
              </span>

              <h2 className="how-it-works-page__section-title">
                Every step designed to feel simple.
              </h2>

              <p>
                We take the complexity out of finding and managing local
                services.
              </p>
            </div>

            <div className="how-it-works-page__journey-layout">
              <div className="how-it-works-page__journey-navigation">
                {journeySteps.map((step, index) => (
                  <button
                    key={step.number}
                    type="button"
                    className={`how-it-works-page__journey-nav ${
                      activeStep === index
                        ? "how-it-works-page__journey-nav--active"
                        : ""
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <span>{step.number}</span>

                    <div>
                      <small>{step.eyebrow}</small>
                      <strong>{step.title}</strong>
                    </div>

                    <b>→</b>
                  </button>
                ))}
              </div>

              <div className="how-it-works-page__journey-visual">
                <div className="how-it-works-page__journey-progress">
                  <span
                    style={{
                      width: `${
                        ((activeStep + 1) / journeySteps.length) * 100
                      }%`,
                    }}
                  />
                </div>

                <div className="how-it-works-page__journey-stage">
                  <div
                    key={journeySteps[activeStep].visual}
                    className="how-it-works-page__journey-stage-content"
                  >
                    <span className="how-it-works-page__journey-number">
                      {journeySteps[activeStep].number}
                    </span>

                    <span className="how-it-works-page__journey-eyebrow">
                      {journeySteps[activeStep].eyebrow}
                    </span>

                    <h3>{journeySteps[activeStep].title}</h3>

                    <p>{journeySteps[activeStep].description}</p>

                    <div
                      className={`how-it-works-page__journey-mockup how-it-works-page__journey-mockup--${journeySteps[activeStep].visual}`}
                    >
                      {journeySteps[activeStep].visual === "search" && (
                        <>
                          <div className="how-it-works-page__mockup-search">
                            <span>⌕</span>
                            <span>Find an AC repair specialist</span>
                          </div>

                          <div className="how-it-works-page__mockup-suggestions">
                            <span>AC Repair</span>
                            <span>HVAC Specialist</span>
                            <span>Air Conditioner Maintenance</span>
                          </div>
                        </>
                      )}

                      {journeySteps[activeStep].visual === "compare" && (
                        <div className="how-it-works-page__mockup-provider-list">
                          {[1, 2, 3].map((item) => (
                            <div
                              key={item}
                              className="how-it-works-page__mockup-provider"
                            >
                              <div className="how-it-works-page__mockup-avatar">
                                {item === 1 ? "✓" : "P"}
                              </div>

                              <div>
                                <strong>
                                  {item === 1
                                    ? "Verified Professional"
                                    : "Local Specialist"}
                                </strong>
                                <span>
                                  4.{8 + item} ★ · {item}.2 km
                                </span>
                              </div>

                              <b>₦{item === 1 ? "18k" : "20k"}</b>
                            </div>
                          ))}
                        </div>
                      )}

                      {journeySteps[activeStep].visual === "book" && (
                        <div className="how-it-works-page__mockup-booking">
                          <div>
                            <span>Service</span>
                            <strong>AC Repair</strong>
                          </div>

                          <div>
                            <span>Date</span>
                            <strong>Tomorrow · 10:00 AM</strong>
                          </div>

                          <div>
                            <span>Location</span>
                            <strong>Lagos, Nigeria</strong>
                          </div>

                          <div className="how-it-works-page__mockup-booking-total">
                            <span>Estimated total</span>
                            <strong>₦18,000</strong>
                          </div>
                        </div>
                      )}

                      {journeySteps[activeStep].visual === "track" && (
                        <div className="how-it-works-page__mockup-track">
                          <div className="how-it-works-page__track-map">
                            <div className="how-it-works-page__track-route" />
                            <div className="how-it-works-page__track-client">
                              <span />
                            </div>
                            <div className="how-it-works-page__track-provider">
                              <span>✓</span>
                            </div>
                          </div>

                          <div className="how-it-works-page__track-info">
                            <span>Provider is on the way</span>
                            <strong>8 min away</strong>
                          </div>
                        </div>
                      )}

                      {journeySteps[activeStep].visual === "complete" && (
                        <div className="how-it-works-page__mockup-complete">
                          <div className="how-it-works-page__complete-check">
                            ✓
                          </div>

                          <strong>Service completed</strong>

                          <span>Rate your experience</span>

                          <div className="how-it-works-page__complete-stars">
                            ★ ★ ★ ★ ★
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* TRUST / PAYMENT */}
        {/* ===================================================== */}

        <section className="how-it-works-page__trust">
          <div className="how-it-works-page__container">
            <div className="how-it-works-page__trust-grid">
              <div className="how-it-works-page__trust-copy">
                <span className="how-it-works-page__section-kicker">
                  Built around confidence
                </span>

                <h2 className="how-it-works-page__section-title">
                  You should know who you&apos;re booking.
                </h2>

                <p>
                  Trust isn't something we add after the experience.
                  Verification, reviews, secure payments and clear booking
                  information are part of the experience from the beginning.
                </p>
              </div>

              <div className="how-it-works-page__trust-cards">
                <div className="how-it-works-page__trust-card">
                  <span>✓</span>
                  <div>
                    <strong>Identity verification</strong>
                    <p>
                      Provider identities can be verified before they become
                      discoverable.
                    </p>
                  </div>
                </div>

                <div className="how-it-works-page__trust-card">
                  <span>₦</span>
                  <div>
                    <strong>Secure payments</strong>
                    <p>
                      Payment is handled through a secure checkout experience.
                    </p>
                  </div>
                </div>

                <div className="how-it-works-page__trust-card">
                  <span>★</span>
                  <div>
                    <strong>Reviews that matter</strong>
                    <p>
                      Ratings and completed jobs help people make informed
                      decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* PROVIDER FLOW */}
        {/* ===================================================== */}

        <section className="how-it-works-page__provider">
          <div className="how-it-works-page__container">
            <div className="how-it-works-page__provider-card">
              <div className="how-it-works-page__provider-heading">
                <span className="how-it-works-page__section-kicker">
                  For professionals
                </span>

                <h2 className="how-it-works-page__section-title">
                  Your skills deserve to be discovered.
                </h2>

                <p>
                  Build a professional presence, connect with customers and
                  manage your service business from one place.
                </p>

                <Link
                  href="/provider/start"
                  className="how-it-works-page__primary-button"
                >
                  Become a Provider
                </Link>
              </div>

              <div className="how-it-works-page__provider-flow">
                <div className="how-it-works-page__provider-progress">
                  <span
                    style={{
                      width: `${
                        ((providerActive + 1) / providerSteps.length) * 100
                      }%`,
                    }}
                  />
                </div>

                {providerSteps.map((step, index) => (
                  <button
                    type="button"
                    key={step}
                    className={`how-it-works-page__provider-step ${
                      providerActive === index
                        ? "how-it-works-page__provider-step--active"
                        : ""
                    }`}
                    onClick={() => setProviderActive(index)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>

                    <strong>{step}</strong>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* FINAL CTA */}
        {/* ===================================================== */}

        <section className="how-it-works-page__cta">
          <div className="how-it-works-page__cta-glow" />

          <div className="how-it-works-page__container">
            <div className="how-it-works-page__cta-content">
              <span className="how-it-works-page__section-kicker">
                Ready when you are
              </span>

              <h2>The right service is closer than you think.</h2>

              <p>
                Search for a professional, compare your options and get started
                today.
              </p>

              <Link href="/search" className="how-it-works-page__cta-button">
                Start Exploring
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
