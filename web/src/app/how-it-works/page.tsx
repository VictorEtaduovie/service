"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";

type Step = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  highlights: string[];
};

const CLIENT_STEPS: Step[] = [
  {
    id: "search",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M21 21l-4.35-4.35" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="11" r="6" stroke="#1E3A8A" strokeWidth="1.6" />
      </svg>
    ),
    title: "Search",
    description: "Type the service you need. Browse categories or describe your problem to get smart suggestions.",
    highlights: ["Smart search suggestions", "Location-based results", "AI-assisted matching"],
  },
  {
    id: "compare",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 6h18" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 12h12" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 18h6" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Compare",
    description: "View verified professionals near you. Compare ratings, reviews, pricing, and availability.",
    highlights: ["Distance shown in real-time", "Transparent pricing", "Verified badges"],
  },
  {
    id: "book",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 7v10a2 2 0 0 0 2 2h12" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 7v10a2 2 0 0 1-2 2H7" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 3h8v4H8z" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Book",
    description: "Choose your provider and confirm your booking. Secure payments and instant confirmation.",
    highlights: ["OTP-secured account creation", "Safe checkout", "Instant booking confirmation"],
  },
  {
    id: "track",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 6v6l4 2" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" stroke="#1E3A8A" strokeWidth="1.6" />
      </svg>
    ),
    title: "Track & Review",
    description: "Track your provider on the map in real time. Chat directly. After completion, rate your experience.",
    highlights: ["Live map tracking", "In-app messaging", "Ratings & reviews"],
  },
];

const PROVIDER_STEPS: Step[] = [
  {
    id: "signup",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2v6" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 10h12" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 20h10" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Sign Up",
    description: "Create your account, select your services, upload documents, and verify your identity.",
    highlights: ["Service selection", "ID & certification upload", "Approval process"],
  },
  {
    id: "online",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 12h18" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6v12" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Become Available",
    description: "Turn on availability and receive job requests from nearby clients.",
    highlights: ["Set availability", "Define service area radius", "Manage pricing"],
  },
  {
    id: "accept",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 12h14" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 6l6 6-6 6" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Accept Jobs",
    description: "Review incoming requests, accept jobs, and navigate to the client using real-time maps.",
    highlights: ["Distance visibility", "Estimated earnings preview", "Live route tracking"],
  },
  {
    id: "complete",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M20 6L9 17l-5-5" stroke="#1E3A8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Finish & Earn",
    description: "Mark the job as completed and receive payment securely to your wallet.",
    highlights: ["Secure payments", "Earnings dashboard"],
  },
];

export default function HowItWorksPage(){
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  function toggleFaq(id: string) {
    setOpenFaq((cur) => (cur === id ? null : id));
  }

  return (
    <div className="how-page bg-white text-dark">
      <Navbar />

      {/* HERO */}
      <header className="how-hero">
        <div className="how-hero__inner container-wide">
          <div className="how-hero__copy">
            <h1 className="how-hero__title">How It Works</h1>
            <p className="how-hero__subtitle">Book trusted professionals in minutes — simple, secure, and transparent.</p>

            <div className="how-hero__ctas">
              <Link href="/search" className="btn btn-primary btn-lg me-3">Find a Service</Link>
              <Link href="/provider/onboarding" className="btn btn-outline-primary btn-lg">Become a Provider</Link>
            </div>
          </div>

          <div className="how-hero__visual how-hero__inner_example" aria-hidden>
            <div className="how-hero__card card-elevated">
              <div className="how-hero__example">
                <div className="example-step">
                  <div className="example-step__icon">🔎</div>
                  <div>
                    <div className="fw-bold">Search</div>
                    <div className="text-muted small">Plumber • AC Repair • Electrician</div>
                  </div>
                </div>

                <div className="example-result mt-3">
                  <div className="example-result__row">
                    <div className="example-thumb" />
                    <div className="example-meta">
                      <div className="fw-semibold">John Doe — Electrician</div>
                      <div className="small text-muted">4.9 • 2.4km • From ₦3,500</div>
                    </div>
                    <div className="ms-auto"><button className="btn btn-sm btn-primary">Book</button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="container section-pad" id="how-it-works-main">
        {/* A — Clients */}
        <section aria-labelledby="clients-title" className="mb-5 how-clients__section">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 id="clients-title" className="other_section_title">How It Works for Clients</h2>
            <div className="text-muted small">4 easy steps to get help</div>
          </div>

          <div className="row g-4 how-clients__steps">
            {CLIENT_STEPS.map((step) => (
              <div key={step.id} className="col-12 col-md-6 col-lg-3">
                <article className="card-elevated p-4 h-100 step-card how-clients__step" aria-labelledby={`step-${step.id}-title`}>
                  <div className="step-card__icon" aria-hidden>
                    <div className="icon-circle">{step.icon}</div>
                  </div>

                  <h3 id={`step-${step.id}-title`} className="h5 mt-3 mb-2">{step.title}</h3>
                  <p className="text-muted small mb-3">{step.description}</p>

                  <ul className="list-unstyled d-flex flex-column gap-2 mt-auto">
                    {step.highlights.map((h) => (
                      <li key={h} className="badge bg-light border text-muted p-2 how-clients__highlight" style={{ borderRadius: 10 }}>
                        {h}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </section>

        {/* B — Providers */}
        <section aria-labelledby="providers-title" className="mt-5 how-providers__section">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 id="providers-title" className="other_section_title">How It Works for Providers</h2>
            <div className="text-muted small">4 steps to start earning</div>
          </div>

          <div className="row g-4 how-providers__steps">
            {PROVIDER_STEPS.map((step) => (
              <div key={step.id} className="col-12 col-md-6 col-lg-3">
                <article className="card-elevated p-4 h-100 step-card how-providers__step" aria-labelledby={`provider-step-${step.id}-title`}>
                  <div className="step-card__icon" aria-hidden>
                    <div className="icon-circle how-providers__icon">{step.icon}</div>
                  </div>

                  <h3 id={`provider-step-${step.id}-title`} className="h5 mt-3 mb-2">{step.title}</h3>
                  <p className="text-muted small mb-3">{step.description}</p>

                  <ul className="list-unstyled d-flex flex-column gap-2 mt-auto">
                    {step.highlights.map((h) => (
                      <li key={h} className="badge bg-light border text-muted p-2 how-providers__highlight" style={{ borderRadius: 10 }}>
                        {h}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </section>

        {/* C — Trust & Safety */}
        <section aria-labelledby="safety-title" className="mt-5 how-safety__section">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 id="safety-title" className="other_section_title">Your Safety Comes First</h2>
            <div className="text-muted small">Trust & protection across the platform</div>
          </div>

          <div className="row g-4 how-safety__blocks">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="card-elevated p-4 how-safety__block">
                <div className="d-flex gap-3 align-items-start">
                  <div className="bg-soft rounded p-2">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 2l3 6 6 .5-4.5 4 1 6-5-3-5 3 1-6L3 8.5 9 8 12 2z" stroke="#1E3A8A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="fw-semibold">Identity verification for providers</div>
                    <div className="small text-muted">Verified IDs and document checks help keep the platform safe.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card-elevated p-4 how-safety__block">
                <div className="d-flex gap-3 align-items-start">
                  <div className="bg-soft rounded p-2">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 3v4" stroke="#1E3A8A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 7h14" stroke="#1E3A8A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 11h14v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6z" stroke="#1E3A8A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="fw-semibold">Secure payment processing</div>
                    <div className="small text-muted">PCI-compliant payment handling and payment holds protect both parties.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card-elevated p-4 how-safety__block">
                <div className="d-flex gap-3 align-items-start">
                  <div className="bg-soft rounded p-2">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M4 7h16" stroke="#1E3A8A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 12h16" stroke="#1E3A8A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 17h16" stroke="#1E3A8A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="fw-semibold">Transparent ratings & reviews</div>
                    <div className="small text-muted">Honest reviews and rating history help you choose the right provider.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card-elevated p-4 how-safety__block">
                <div className="d-flex gap-3 align-items-start">
                  <div className="bg-soft rounded p-2">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M21 6l-9 6-9-6" stroke="#1E3A8A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12l-9 6-9-6" stroke="#1E3A8A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="fw-semibold">Dedicated dispute resolution</div>
                    <div className="small text-muted">Our support team investigates and resolves issues fairly and promptly.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* D — FAQ Preview */}
        <section aria-labelledby="faq-title" className="mt-5 how-faq__section">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 id="faq-title" className="other_section_title">Frequently Asked Questions</h2>
            <div className="text-muted small">Top questions from new users</div>
          </div>

          <div className="row g-4 how-faq__list">
            {[
              { id: "faq-verified", q: "How are providers verified?", a: "Providers undergo identity verification and document checks, including ID and certification uploads. We also run background checks for high-risk categories." },
              { id: "faq-payment", q: "How does payment work?", a: "Payments are processed securely through our payment gateway. Funds are held until the job is marked complete, then released to the provider." },
              { id: "faq-unsatisfied", q: "What if I’m not satisfied with a service?", a: "Open a dispute via the Help Center. Our support team will investigate, mediate, and if necessary issue a refund under our guarantee." },
              { id: "faq-provider-pay", q: "How do providers receive payments?", a: "Providers receive payouts to their connected bank account or in-app wallet according to their payout schedule. Earnings are visible in the dashboard." },
            ].map((f) => {
              const open = openFaq === f.id;
              return (
                <div key={f.id} className="col-12 col-md-6">
                  <div className="card-elevated p-3 how-faq__item">
                    <button
                      className="d-flex w-100 align-items-start gap-3 bg-transparent border-0 p-0 text-start"
                      onClick={() => toggleFaq(f.id)}
                      aria-expanded={open}
                      aria-controls={`${f.id}-panel`}
                    >
                      <div className="how-faq__icon bg-soft rounded p-2 me-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M12 2a10 10 0 1 0 0 20" stroke="#1E3A8A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      <div className="flex-grow-1">
                        <div className="fw-semibold">{f.q}</div>
                        <div id={`${f.id}-panel`} className="text-muted small mt-2" style={{ display: open ? "block" : "none" }}>
                          {f.a}
                        </div>
                      </div>

                      <div className="ms-3">
                        <span className="text-muted">{open ? "−" : "+"}</span>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-center">
            <Link href="/help" className="btn btn-outline-primary px-4">View Full Help Center</Link>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-5 how-cta__section">
          <div className="card-elevated p-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 how-cta__inner">
            <div>
              <h3 className="mb-1 fw-bold">Ready to Get Started?</h3>
              <p className="mb-0 text-muted">Find trusted professionals near you or start earning as a provider.</p>
            </div>

            <div className="d-flex gap-3">
              <Link href="/search" className="btn btn-primary px-4">Find a Service</Link>
              <Link href="/provider/onboarding" className="btn btn-outline-primary px-4">Become a Provider</Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      
    </div>
  );
}