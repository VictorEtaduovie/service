"use client";

import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Navbar from "../components/Navbar";
import ProviderCard from "@/components/ProviderCard";
import SiteFooter from '@/components/SiteFooter';
// ─── TRUST STRIP ────────────────────────────────────────────────────────────

const trustItems = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="#1E3A8A" opacity=".15"/>
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" stroke="#1E3A8A" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Verified Professionals",
    sub: "Every pro ID-checked & approved",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="13" rx="2" fill="#1E3A8A" opacity=".12"/>
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="#1E3A8A" strokeWidth="1.8"/>
        <path d="M3 10h18" stroke="#2563EB" strokeWidth="1.8"/>
        <circle cx="7.5" cy="14.5" r="1.5" fill="#2563EB"/>
      </svg>
    ),
    label: "Secure Payments",
    sub: "Escrow-protected until job done",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#1E3A8A" opacity=".12"/>
        <circle cx="12" cy="12" r="9" stroke="#1E3A8A" strokeWidth="1.8"/>
        <path d="M12 7v5l3 3" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="1.5" fill="#1E3A8A"/>
      </svg>
    ),
    label: "Live Tracking",
    sub: "Watch your pro arrive in real-time",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" fill="#1E3A8A" opacity=".12"/>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#1E3A8A" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M8 10h8M8 13h5" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round"/>
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
  
  return (
    <main>
      <Navbar />

      {/* HERO SECTION WITH VIDEO BACKGROUND */}
      <section className="position-relative min-vh-100 d-flex align-items-center justify-content-center overflow-hidden">
        {/* Background Video Layer */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ objectFit: "cover", zIndex: -2 }}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-hand-of-a-professional-worker-repairing-an-ac-unit-34444-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Dark/Glass Overlay for Contrast */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
            zIndex: -1,
          }}
        />

        <div className="container py-5 text-center">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-10">

              {/* Premium Badge */}
              <div className="d-inline-flex align-items-center bg-white bg-opacity-10 px-3 py-2 rounded-pill mb-4 border border-white border-opacity-25 shadow-sm" style={{ backdropFilter: "blur(10px)" }}>
                <span className="badge bg-primary rounded-pill me-2">Lagos</span>
                <span className="text-white fw-medium small">2,400+ Verified Pros available now</span>
              </div>

              <h1 className="display-1 fw-bold mb-4 text-white tracking-tighter" style={{ lineHeight: "1", textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
                Find Trusted Local <br />
                <span className="text-primary">Services Near You</span>
              </h1>

              <p className="fs-5 text-white mb-5 mx-auto opacity-90" style={{ maxWidth: "650px", fontWeight: "400" }}>
                Book verified professionals for home, health, tech, and more.
                Experience seamless booking with live tracking and secure escrow.
              </p>

              {/* CENTRALIZED STICKY SEARCH */}
              <div id="homepage-search" className=" pt-2" style={{ top: "100px" }}>
                <div className="search-wrapper mx-auto" style={{ maxWidth: "800px" }}>
                  <div className="search-input-group d-flex align-items-center shadow-lg border-0 p-2 bg-white" style={{ borderRadius: "20px" }}>
                    <div className="d-flex align-items-center flex-grow-1 px-4">
                      <span className="fs-4 me-2">🔍</span>
                      <input
                        type="text"
                        className="form-control border-0 shadow-none fs-5 py-3"
                        placeholder="What service do you need? (e.g., Plumber, AC Repair)"
                      />
                    </div>
                    <button className="btn-search px-5 py-3 fs-5 text-white border-0 shadow-sm" style={{ background: "var(--primary-gradient)", borderRadius: "14px" }}>
                      Search
                    </button>
                  </div>

                  {/* Location Indicator */}
                  <div className="mt-3">
                    <span className="badge bg-white text-dark px-3 py-2 rounded-pill shadow-sm border">
                      <span className="text-success me-1">●</span> Showing services near Lagos, Nigeria
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section
  className="home_trust bg-white border-bottom"
  style={{ padding: "50px 0" }}   // slightly taller
>
  <div
    className="container"
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "24px",
    }}
  >
    {/* ITEM */}
    {[
      {
        title: "Verified Professionals",
        icon: (
          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" />
        ),
      },
      {
        title: "Secure Payments",
        icon: (
          <rect x="5" y="8" width="14" height="10" rx="2" stroke="white" strokeWidth="2" />
        ),
      },
      {
        title: "Live Tracking",
        icon: (
          <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="2" />
        ),
      },
      {
        title: "24/7 Support",
        icon: (
          <path d="M21 15H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="2" />
        ),
      },
    ].map((item, index) => (
      <div
        key={index}
        style={{
          textAlign: "center",
          padding: "28px 20px",
          borderRadius: "var(--radius-lg)",
          border: "1px solid #e5e7eb",
          background: "#fff",
          boxShadow: "var(--shadow-subtle)",
          transition: "all 0.3s ease",
        }}
      >
        {/* ICON */}
        <div
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 18px",
            borderRadius: "20px",
            background: "var(--primary-gradient)", // 🔥 gradient like buttons
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--shadow-hover)",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            {item.icon}
          </svg>
        </div>

        <h5 className="fw-bold mb-0">{item.title}</h5>
      </div>
    ))}
  </div>
</section>
{/* ============================= */}
{/* POPULAR CATEGORIES (fixed full-viewport bg, clear) */}
{/* ============================= */}
<section className="home_popular" aria-labelledby="popular-services-title">
  <div
    className="home_popular__bg"
    aria-hidden
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1505691723518-36a6b46a6a93?w=1800&q=60&auto=format&fit=crop')",
    }}
  />

  <div className="container home_popular__inner">
    <div className="home_section_header">
      <h2 id="popular-services-title" className="home_section_title">Popular Services</h2>
      <p className="home_section_sub">Browse our most-requested categories</p>
    </div>

    <div className="home_popular__grid" role="list">
      {[
        { id: "home-services", title: "Home Services", img: "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=1200&q=60" },
        { id: "beauty", title: "Beauty & Personal Care", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=60" },
        { id: "health", title: "Health & Medical", img: "https://images.unsplash.com/photo-1580281657521-1b18f2c9f7b9?w=1200&q=60" },
        { id: "tech", title: "Tech & Repairs", img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&q=60" },
        { id: "auto", title: "Automotive", img: "https://images.unsplash.com/photo-1549921296-3a2f3c39d23d?w=1200&q=60" },
        { id: "cleaning", title: "Cleaning Services", img: "https://images.unsplash.com/photo-1556228720-9b0b2f7e0b42?w=1200&q=60" },
        { id: "moving", title: "Moving & Delivery", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=60" },
        { id: "tutoring", title: "Education & Tutoring", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=60" },
      ].map((cat) => (
        <a
          key={cat.id}
          href={`/categories/${encodeURIComponent(cat.id)}`}
          role="listitem"
          className="home_popular__item"
          aria-label={cat.title}
        >
          <div
            className="home_popular__item_media"
            style={{ backgroundImage: `url(${cat.img})` }}
            role="img"
            aria-hidden
          />
          <div className="home_popular__item_title">{cat.title}</div>
        </a>
      ))}
    </div>

    <div className="home_popular__actions">
      <a href="/categories" className="home_popular__cta" aria-label="View all categories">
        View All Categories
      </a>
    </div>
  </div>
</section>

{/* ============================= */}
{/* FEATURED PROVIDERS (keep as-is) */}
{/* ============================= */}
{/* ============================= */}
{/* FEATURED PROVIDERS (with service tags) */}
{/* ============================= */}
<section className="home_featured" aria-labelledby="featured-providers-title">
  <div className="container home_featured_container">

    <div className="home_section_header">
      <h2 id="featured-providers-title" className="home_section_title">
        Top Rated Providers Near You
      </h2>
      <p className="home_section_sub">
        Trusted professionals delivering quality service in your area
      </p>
    </div>

    <div className="home_featured_grid">
      
      {[
        {
          id: 1,
          name: "Aisha Bello",
          rating: 4.9,
          distance: 1.2,
          price: 35,
          img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60",
          services: ["Plumbing", "AC Repair", "Water Heater"]
        },
        {
          id: 2,
          name: "John Okoye",
          rating: 4.8,
          distance: 2.4,
          price: 40,
          img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=800&q=60",
          services: ["Electrical", "Generator Repair", "Wiring", "Installation"]
        },
        {
          id: 3,
          name: "Grace N.",
          rating: 4.8,
          distance: 0.9,
          price: 30,
          img: "https://images.unsplash.com/photo-1540218559-7f2c9d9a03b1?w=800&q=60",
          services: ["Beauty Treatment", "Makeup", "Bridal"]
        },
        {
          id: 4,
          name: "Chinedu A.",
          rating: 4.7,
          distance: 3.1,
          price: 45,
          img: "https://images.unsplash.com/photo-1531123414780-fbd87b7c6a88?w=800&q=60",
          services: ["AC Servicing", "Duct Cleaning", "Maintenance"]
        },
        {
          id: 5,
          name: "Aisha Bello",
          rating: 4.9,
          distance: 1.2,
          price: 35,
          img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60",
          services: ["Plumbing", "AC Repair", "Water Heater"]
        },
        {
          id: 6,
          name: "John Okoye",
          rating: 4.8,
          distance: 2.4,
          price: 40,
          img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=800&q=60",
          services: ["Electrical", "Generator Repair", "Wiring", "Installation"]
        },
        {
          id: 7,
          name: "Grace N.",
          rating: 4.8,
          distance: 0.9,
          price: 30,
          img: "https://images.unsplash.com/photo-1540218559-7f2c9d9a03b1?w=800&q=60",
          services: ["Beauty Treatment", "Makeup", "Bridal"]
        },
        {
          id: 8,
          name: "Chinedu A.",
          rating: 4.7,
          distance: 3.1,
          price: 45,
          img: "https://images.unsplash.com/photo-1531123414780-fbd87b7c6a88?w=800&q=60",
          services: ["AC Servicing", "Duct Cleaning", "Maintenance"]
        },
      ].map((provider) => (
        <article key={provider.id} className="home_featured_card" aria-labelledby={`provider-${provider.id}`}>
          <div className="home_featured_card_media">
            <img
              src={provider.img}
              alt={`${provider.name} profile`}
              className="home_featured_card_image"
              width={320}
              height={220}
            />
          </div>

          <div className="home_featured_card_body">
            <div className="home_featured_card_head">
              <h3 id={`provider-${provider.id}`} className="home_featured_card_name">
                {provider.name}
              </h3>

              <div className="home_featured_card_price">
                From ${provider.price}
              </div>
            </div>

            <div className="home_featured_card_meta">
              <div className="home_featured_card_rating" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="home_featured__star" aria-hidden>
                  <path d="M12 17.3l-6.16 3.24 1.18-6.88L2 9.76l6.92-1.01L12 2l3.08 6.75L22 9.76l-5.02 3.9 1.18 6.88z" fill="#F59E0B"/>
                </svg>
                <span className="home_featured__rating_value">{provider.rating.toFixed(1)}</span>
              </div>

              <div className="home_featured__distance">{provider.distance} km away</div>
            </div>

            {/* SERVICES TAGS - allowed to wrap into two rows */}
            {(() => {
  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (servicesRef.current) {
      setHasOverflow(
        servicesRef.current.scrollHeight >
        servicesRef.current.clientHeight
      );
    }
  }, []);

  return (
    <>
      <div
        ref={servicesRef}
        className={`home_featured_card_services ${
          expanded ? "is-expanded" : ""
        }`}
      >
        {provider.services.map((s, idx) => (
          <span key={idx} className="home_featured_card_service">
            {s}
          </span>
        ))}
      </div>

      {hasOverflow && (
        <button
          className="home_featured_viewmore"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "View less" : "View more"}
        </button>
      )}
    </>
  );
})()}

          </div>
        </article>
      ))}
    </div>
    <div className="home_featured_footer">
      <a href="/providers" className="home_featured_more_btn">
        View More Providers
      </a>
    </div>

  </div>
</section>
{/* ============================= */}
{/* HOW IT WORKS */}
{/* ============================= */}
<section className="home_how" aria-labelledby="how-it-works-title">
  <div className="container home_how__inner">
    <header className="home_section_header">
      <h2 id="how-it-works-title" className="home_section_title">How It Works</h2>
      <p className="home_section_sub">Simple steps to find, book and track verified local pros.</p>
    </header>

    <div className="home_how__grid" role="list">
      <article className="home_how__step" role="listitem" aria-labelledby="how-step-1">
        <div className="home_how__icon" aria-hidden>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M3 12h18M3 6h12M3 18h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="home_how__body">
          <h3 id="how-step-1" className="home_how__title">Search</h3>
          <p className="home_how__desc">Tell us what service you need — location, time and brief details.</p>
        </div>
        <div className="home_how__badge" aria-hidden>1</div>
      </article>

      <article className="home_how__step" role="listitem" aria-labelledby="how-step-2">
        <div className="home_how__icon" aria-hidden>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3 6 6 .9-4.5 4 .9 6L12 16.5 6.6 19.9 7.5 13 3 9l6-.9L12 2z" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="home_how__body">
          <h3 id="how-step-2" className="home_how__title">Compare</h3>
          <p className="home_how__desc">View ratings, prices and availability — pick the best fit.</p>
        </div>
        <div className="home_how__badge" aria-hidden>2</div>
      </article>

      <article className="home_how__step" role="listitem" aria-labelledby="how-step-3">
        <div className="home_how__icon" aria-hidden>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v6M21 12h-6M12 22v-6M3 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="home_how__body">
          <h3 id="how-step-3" className="home_how__title">Book &amp; Track</h3>
          <p className="home_how__desc">Confirm booking, pay securely and track your provider in real time.</p>
        </div>
        <div className="home_how__badge" aria-hidden>3</div>
      </article>
    </div>
  </div>
</section>
{/* ============================= */}
{/* WHY CHOOSE US */}
{/* ============================= */}
<section className="home_why">
  <div className="container">

    <header className="home_section_header center">
      <h2 className="home_section_title">
        Why Choose YourPlatformName
      </h2>
      <p className="home_section_sub">
        Built with trust, transparency, and technology at its core.
      </p>
    </header>

    <div className="home_why__grid">

      {[
        "Identity-verified providers",
        "Transparent pricing with no hidden fees",
        "Real-time map tracking",
        "In-app chat and secure payments",
        "Dedicated dispute resolution support"
      ].map((item, index) => (
        <div key={index} className="home_why_card">
          <div className="home_why_icon">✓</div>
          <div className="home_why_text">{item}</div>
        </div>
      ))}

    </div>

  </div>
</section>

{/* ============================= */}
{/* TESTIMONIALS */}
{/* ============================= */}
<section className="home_testimonials">
  <div className="container home_testimonials__inner">

    <header className="home_section_header center">
      <h2 className="home_section_title">
        What Customers Are Saying
      </h2>
      <p className="home_section_sub">
        Real experiences from customers who use YourPlatformName daily.
      </p>
    </header>

    <div className="home_testimonials__grid">

      <article className="home_testimonial_card">
        <div className="home_testimonial_user">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Sarah Johnson"
            className="home_testimonial_avatar"
          />
          <div>
            <h4 className="home_testimonial_name">Sarah Johnson</h4>
            <div className="home_testimonial_role">Home Owner</div>
          </div>
        </div>

        <p className="home_testimonial_text">
          “I needed an emergency plumber late at night and within 8 minutes I had three verified professionals to choose from. The pricing was transparent, and I could track the provider live on the map. The entire experience felt safe, modern, and extremely convenient.”
        </p>

        <div className="home_testimonial_rating">
          ★★★★★
        </div>
      </article>


      <article className="home_testimonial_card">
        <div className="home_testimonial_user">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Daniel Ade"
            className="home_testimonial_avatar"
          />
          <div>
            <h4 className="home_testimonial_name">Daniel Ade</h4>
            <div className="home_testimonial_role">Business Owner</div>
          </div>
        </div>

        <p className="home_testimonial_text">
          “The real-time tracking feature completely changed how I book services. I could see exactly when the technician would arrive, chat with them directly in-app, and pay securely without handling cash. This platform is setting a new standard for service marketplaces.”
        </p>

        <div className="home_testimonial_rating">
          ★★★★★
        </div>
      </article>

    </div>
    <div className="home_testimonials_actions">
      <a href="/reviews" className="home_testimonials_cta">Read more reviews</a>
    </div>

  </div>
</section>
{/* ============================= */}
{/* CALL TO ACTION */}
{/* ============================= */}
<section className="home_cta" aria-labelledby="cta-title">
  <div className="container home_cta__inner">

    <div className="home_cta__content">
      <h2 id="cta-title" className="home_cta__headline">Need a service today?</h2>
      <p className="home_cta__sub">
        Book a verified professional in minutes — fast, secure, and reliable.
      </p>

      <div className="home_cta__actions" role="region" aria-label="Primary actions">
        <Link href="/search" className="home_cta__btn home_cta__btn--primary" aria-label="Find a Professional">
          Find a Professional
        </Link>

        <Link href="/provider/onboarding" className="home_cta__btn home_cta__btn--secondary" aria-label="Become a Provider">
          Become a Provider
        </Link>
      </div>

      
    </div>

    <div className="home_cta__media" role="img" aria-hidden>
      {/* Replace this with your chosen illustration/photo (hero pro image) */}
      <img
        src="https://images.unsplash.com/photo-1556761175-129418cb2dfe?w=1200&q=80&auto=format&fit=crop"
        alt="Service professional illustration"
        className="home_cta__image"
      />
    </div>

  </div>
</section>
{/* ============================= */}
{/* DOWNLOAD APP SECTION */}
{/* ============================= */}
<section
  className="home_download home_download--border-only"
  aria-labelledby="download-title"
>
  <div className="container home_download__inner">

    <header className="home_section_header center">
      <h2 id="download-title" className="home_section_title">
        Get the App
      </h2>
      <p className="home_section_sub">
        Book services faster, track providers in real time, and manage everything from your phone.
      </p>
    </header>

    <div className="home_download__badges">
      <a href="#" className="home_download__badge">
        <img src="/app-store-badge.png" alt="Download on the App Store" />
      </a>

      <a href="#" className="home_download__badge">
        <img src="/google-play-badge.png" alt="Get it on Google Play" />
      </a>
    </div>

  </div>
</section>
<SiteFooter />

   
    </main>
  );
}
