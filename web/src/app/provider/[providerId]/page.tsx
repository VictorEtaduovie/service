"use client";

import Link from "next/link";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";

type Service = {
  name: string;
  description: string;
  startingPrice: number;
  duration: string;
};

type Review = {
  name: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
};

type ProviderProfile = {
  id: string;
  name: string;
  title: string;
  image: string;
  coverImage: string;
  online: boolean;
  verified: boolean;
  certified: boolean;
  rating: number;
  reviews: number;
  completedJobs: number;
  responseTime: string;
  experience: string;
  location: string;
  distanceKm: number;
  about: string;
  startingPrice: number;
  availability: string;
  languages: string[];
  specialties: string[];
  services: Service[];
  portfolio: string[];
  reviewsData: Review[];
};

const providers: ProviderProfile[] = [
  {
    id: "provider-001",
    name: "Daniel Okoro",
    title: "Professional Plumber",
    image:
      "https://professions.ng/wp-content/uploads/2024/10/How-to-Build-a-Career-as-a-Professional-Plumber-in-Nigeria2.jpeg",
    coverImage:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1800&q=85",
    online: true,
    verified: true,
    certified: true,
    rating: 4.9,
    reviews: 126,
    completedJobs: 184,
    responseTime: "Usually within 5 minutes",
    experience: "8+ years",
    location: "Ikeja, Lagos",
    distanceKm: 1.2,
    availability: "Available today",
    about:
      "I am a professional plumber focused on dependable residential plumbing, repairs, installations and water-system maintenance. I believe in clear communication, quality workmanship and solving problems properly the first time.",
    startingPrice: 15000,
    languages: ["English", "Pidgin"],
    specialties: [
      "Residential Plumbing",
      "Emergency Repairs",
      "Water Systems",
      "Bathroom Installation",
    ],
    services: [
      {
        name: "Pipe Repairs",
        description: "Repair leaking, damaged or blocked pipes.",
        startingPrice: 15000,
        duration: "1–2 hrs",
      },
      {
        name: "Leak Detection",
        description: "Identify and repair hidden water leaks.",
        startingPrice: 12000,
        duration: "1 hr",
      },
      {
        name: "Bathroom Plumbing",
        description: "Repairs and installation for bathroom systems.",
        startingPrice: 18000,
        duration: "2–4 hrs",
      },
      {
        name: "Water System Installation",
        description: "Professional installation and maintenance.",
        startingPrice: 25000,
        duration: "3–6 hrs",
      },
      {
        name: "Emergency Plumbing",
        description: "Urgent plumbing problems and breakdowns.",
        startingPrice: 20000,
        duration: "Priority",
      },
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    ],
    reviewsData: [
      {
        name: "Chinedu A.",
        initials: "CA",
        rating: 5,
        date: "2 weeks ago",
        text: "Daniel arrived quickly, understood the problem immediately and fixed it properly. Very professional from start to finish.",
      },
      {
        name: "Sarah O.",
        initials: "SO",
        rating: 5,
        date: "1 month ago",
        text: "Excellent service. Communication was clear, pricing was fair and the work was completed exactly as discussed.",
      },
      {
        name: "Emeka K.",
        initials: "EK",
        rating: 4,
        date: "2 months ago",
        text: "Very good experience. He was punctual, explained what needed to be repaired and cleaned up afterwards.",
      },
    ],
  },
  {
    id: "provider-002",
    name: "Michael Adeyemi",
    title: "Licensed Plumbing Specialist",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=85",
    online: false,
    verified: true,
    certified: true,
    rating: 4.8,
    reviews: 94,
    completedJobs: 143,
    responseTime: "Usually within 12 minutes",
    experience: "7+ years",
    location: "Yaba, Lagos",
    distanceKm: 2.4,
    availability: "Available tomorrow",
    about:
      "Licensed plumbing specialist providing pipework, water systems, leak repairs and home plumbing maintenance with a strong focus on safe, reliable installations.",
    startingPrice: 12000,
    languages: ["English"],
    specialties: ["Pipe & Water Systems", "Residential Plumbing"],
    services: [
      {
        name: "Pipe Repairs",
        description: "Reliable pipe repair and replacement.",
        startingPrice: 12000,
        duration: "1–2 hrs",
      },
      {
        name: "Water Systems",
        description: "Installation and maintenance of water systems.",
        startingPrice: 20000,
        duration: "2–4 hrs",
      },
      {
        name: "Leak Repairs",
        description: "Locate and resolve water leaks.",
        startingPrice: 11000,
        duration: "1 hr",
      },
      {
        name: "Home Plumbing",
        description: "General plumbing maintenance for homes.",
        startingPrice: 15000,
        duration: "1–3 hrs",
      },
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=80",
    ],
    reviewsData: [],
  },
];

const ratingBreakdown = [
  { stars: 5, percentage: 92 },
  { stars: 4, percentage: 6 },
  { stars: 3, percentage: 1 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 0 },
];

export default function ProviderProfilePage() {
  const params = useParams();
  const revealRef = useRef<HTMLElement | null>(null);

  const providerId = String(params.providerId);
  const [selectedPortfolioImage, setSelectedPortfolioImage] = useState<
    string | null
  >(null);

  const provider =
    providers.find((item) => item.id === providerId) ?? providers[0];

  useEffect(() => {
    const root = revealRef.current;

    if (!root) return;

    const elements = root.querySelectorAll("[data-provider-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("provider-profile__reveal--visible");

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

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

  const handleBooking = () => {
    const clientLoggedIn = localStorage.getItem("client_logged_in") === "true";

    if (clientLoggedIn) {
      window.location.href = `/book/${provider.id}`;
      return;
    }

    window.location.href = `/client/auth/email?providerId=${provider.id}`;
  };

  return (
    <div className="provider-profile">
      <main ref={revealRef} className="provider-profile__main">
        {/* ================================================= */}
        {/* TOP BAR */}
        {/* ================================================= */}

        <div className="provider-profile__topbar">
          <div className="provider-profile__container">
            <Link href="/services/1" className="provider-profile__back">
              <span>←</span>
              <span>Back to results</span>
            </Link>

            <div className="provider-profile__breadcrumbs">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/categories">Services</Link>
              <span>/</span>
              <span>Provider</span>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* PROFILE HERO */}
        {/* ================================================= */}

        <section className="provider-profile__hero">
          <div className="provider-profile__container">
            <div
              className="provider-profile__cover"
              style={{
                backgroundImage: `url("${provider.coverImage}")`,
              }}
            >
              <div className="provider-profile__cover-overlay" />

              <div className="provider-profile__cover-label">
                <span>Professional profile</span>
              </div>
            </div>

            <div className="provider-profile__identity">
              <div className="provider-profile__avatar-wrap">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="provider-profile__avatar"
                />

                {provider.online && (
                  <span
                    className="provider-profile__online-dot"
                    aria-label="Online now"
                    title="Online now"
                  />
                )}
              </div>

              <div className="provider-profile__identity-content">
                <div className="provider-profile__identity-heading">
                  <div>
                    <div className="provider-profile__name-row">
                      <h1>{provider.name}</h1>

                      {provider.verified && (
                        <span className="provider-profile__verified">
                          <span>✓</span>
                          Identity verified
                        </span>
                      )}
                    </div>

                    <p className="provider-profile__title">{provider.title}</p>
                  </div>

                  <div className="provider-profile__identity-actions">
                    <button type="button" aria-label="Share provider profile">
                      ↗
                    </button>

                    <button type="button" aria-label="Save provider">
                      ♡
                    </button>
                  </div>
                </div>

                <div className="provider-profile__meta">
                  <span>
                    <b>★</b>
                    {provider.rating}
                  </span>

                  <span>{provider.reviews} reviews</span>

                  <span>{provider.distanceKm} km away</span>

                  <span>{provider.location}</span>
                </div>

                <div className="provider-profile__status-row">
                  <span
                    className={`provider-profile__status ${
                      provider.online
                        ? "provider-profile__status--online"
                        : "provider-profile__status--offline"
                    }`}
                  >
                    <i />
                    {provider.online ? "Online now" : "Currently offline"}
                  </span>

                  {provider.certified && (
                    <span className="provider-profile__certified">
                      ✓ Certified professional
                    </span>
                  )}

                  <span className="provider-profile__availability">
                    {provider.availability}
                  </span>
                </div>
              </div>
            </div>

            {/* PROFILE QUICK NAV */}
            <nav className="provider-profile__quick-nav">
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#reviews">Reviews</a>
            </nav>
          </div>
        </section>

        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <section className="provider-profile__content">
          <div className="provider-profile__container">
            <div className="provider-profile__layout">
              {/* =========================================== */}
              {/* MAIN COLUMN */}
              {/* =========================================== */}

              <div className="provider-profile__main-column">
                {/* ABOUT */}
                <section
                  id="about"
                  className="provider-profile__section provider-profile__section--intro"
                  data-provider-reveal
                >
                  <div className="provider-profile__section-heading">
                    <div>
                      <span>About</span>
                      <h2>Meet {provider.name.split(" ")[0]}</h2>
                    </div>
                  </div>

                  <p className="provider-profile__about">{provider.about}</p>

                  <div className="provider-profile__intro-facts">
                    <div>
                      <span>Experience</span>
                      <strong>{provider.experience}</strong>
                    </div>

                    <div>
                      <span>Response</span>
                      <strong>{provider.responseTime}</strong>
                    </div>

                    <div>
                      <span>Languages</span>
                      <strong>{provider.languages.join(" · ")}</strong>
                    </div>
                  </div>
                </section>

                {/* SERVICES */}
                <section
                  id="services"
                  className="provider-profile__section"
                  data-provider-reveal
                >
                  <div className="provider-profile__section-heading">
                    <div>
                      <span>Services</span>
                      <h2>What I offer</h2>
                    </div>

                    <span className="provider-profile__section-count">
                      {provider.services.length} services
                    </span>
                  </div>

                  <div className="provider-profile__service-list">
                    {provider.services.map((service) => (
                      <article
                        key={service.name}
                        className="provider-profile__service-card"
                      >
                        <div className="provider-profile__service-icon">✓</div>

                        <div className="provider-profile__service-content">
                          <h3>{service.name}</h3>

                          <p>{service.description}</p>

                          <div className="provider-profile__service-meta">
                            <span>{service.duration}</span>
                            <span>
                              From{" "}
                              <strong>
                                {formatPrice(service.startingPrice)}
                              </strong>
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleBooking}
                          className="provider-profile__service-action"
                        >
                          Book
                        </button>
                      </article>
                    ))}
                  </div>
                </section>

                {/* SPECIALTIES */}
                <section
                  className="provider-profile__section"
                  data-provider-reveal
                >
                  <div className="provider-profile__section-heading">
                    <div>
                      <span>Expertise</span>
                      <h2>Areas of specialization</h2>
                    </div>
                  </div>

                  <div className="provider-profile__specialties">
                    {provider.specialties.map((specialty) => (
                      <span key={specialty}>{specialty}</span>
                    ))}
                  </div>
                </section>

                {/* PORTFOLIO */}
                <section
                  id="portfolio"
                  className="provider-profile__section"
                  data-provider-reveal
                >
                  <div className="provider-profile__section-heading">
                    <div>
                      <span>Portfolio</span>
                      <h2>Recent work</h2>
                    </div>

                    <span className="provider-profile__section-count">
                      {provider.portfolio.length} projects
                    </span>
                  </div>

                  <div className="provider-profile__portfolio">
                    {provider.portfolio.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        className={`provider-profile__portfolio-item provider-profile__portfolio-item--${index + 1}`}
                        onClick={() => setSelectedPortfolioImage(image)}
                        aria-label={`View portfolio project ${index + 1}`}
                      >
                        <img
                          src={image}
                          alt={`Portfolio project ${index + 1}`}
                          loading="lazy"
                        />

                        <span className="provider-profile__portfolio-view">
                          ⤢
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* PERFORMANCE */}
                <section
                  className="provider-profile__section"
                  data-provider-reveal
                >
                  <div className="provider-profile__section-heading">
                    <div>
                      <span>Performance</span>
                      <h2>Track record</h2>
                    </div>
                  </div>

                  <div className="provider-profile__stats">
                    <div className="provider-profile__stat">
                      <span className="provider-profile__stat-icon">★</span>
                      <strong>{provider.rating}</strong>
                      <small>Average rating</small>
                    </div>

                    <div className="provider-profile__stat">
                      <span className="provider-profile__stat-icon">✓</span>
                      <strong>{provider.completedJobs}+</strong>
                      <small>Completed jobs</small>
                    </div>

                    <div className="provider-profile__stat">
                      <span className="provider-profile__stat-icon">↗</span>
                      <strong>{provider.responseTime}</strong>
                      <small>Average response</small>
                    </div>

                    <div className="provider-profile__stat">
                      <span className="provider-profile__stat-icon">◉</span>
                      <strong>{provider.distanceKm} km</strong>
                      <small>From your location</small>
                    </div>
                  </div>
                </section>

                {/* REVIEWS */}
                <section
                  id="reviews"
                  className="provider-profile__section"
                  data-provider-reveal
                >
                  <div className="provider-profile__section-heading">
                    <div>
                      <span>Reviews</span>
                      <h2>What clients are saying</h2>
                    </div>
                  </div>

                  <div className="provider-profile__rating-summary">
                    <div className="provider-profile__rating-score">
                      <strong>{provider.rating}</strong>

                      <div className="provider-profile__rating-stars">
                        ★★★★★
                      </div>

                      <span>Based on {provider.reviews} reviews</span>
                    </div>

                    <div className="provider-profile__rating-breakdown">
                      {ratingBreakdown.map((item) => (
                        <div
                          key={item.stars}
                          className="provider-profile__rating-row"
                        >
                          <span>{item.stars}</span>

                          <div>
                            <i
                              style={{
                                width: `${item.percentage}%`,
                              }}
                            />
                          </div>

                          <small>{item.percentage}%</small>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="provider-profile__reviews">
                    {provider.reviewsData.length > 0 ? (
                      provider.reviewsData.map((review) => (
                        <article
                          key={`${review.name}-${review.date}`}
                          className="provider-profile__review"
                        >
                          <div className="provider-profile__review-top">
                            <div className="provider-profile__review-author">
                              <span>{review.initials}</span>

                              <div>
                                <strong>{review.name}</strong>

                                <small>Verified booking · {review.date}</small>
                              </div>
                            </div>

                            <div className="provider-profile__review-rating">
                              {"★".repeat(review.rating)}
                            </div>
                          </div>

                          <p>{review.text}</p>
                        </article>
                      ))
                    ) : (
                      <div className="provider-profile__review-empty">
                        Reviews from completed bookings will appear here.
                      </div>
                    )}
                  </div>

                  {provider.reviews > 3 && (
                    <button
                      type="button"
                      className="provider-profile__reviews-more"
                    >
                      View all {provider.reviews} reviews
                    </button>
                  )}
                </section>
              </div>

              {/* =========================================== */}
              {/* SIDEBAR */}
              {/* =========================================== */}

              <aside className="provider-profile__sidebar">
                <div
                  className="provider-profile__booking-card"
                  data-provider-reveal
                >
                  <div className="provider-profile__booking-label">
                    Book this professional
                  </div>

                  <div className="provider-profile__booking-price">
                    <small>Services starting from</small>
                    <strong>{formatPrice(provider.startingPrice)}</strong>
                  </div>

                  <div className="provider-profile__booking-status">
                    <div>
                      <span
                        className={
                          provider.online
                            ? "provider-profile__booking-online"
                            : "provider-profile__booking-offline"
                        }
                      >
                        <i />
                        {provider.online ? "Online now" : "Currently offline"}
                      </span>

                      <small>{provider.responseTime}</small>
                    </div>

                    <span className="provider-profile__booking-arrow">→</span>
                  </div>

                  <button
                    type="button"
                    className="provider-profile__book-button"
                    onClick={handleBooking}
                  >
                    Book Now
                  </button>

                  <button
                    type="button"
                    className="provider-profile__message-button"
                  >
                    Message Provider
                  </button>

                  <div className="provider-profile__secure-note">
                    <span>✓</span>
                    Secure booking · Protected payment
                  </div>
                </div>

                {/* TRUST */}
                <div
                  className="provider-profile__trust-card"
                  data-provider-reveal
                >
                  <div className="provider-profile__trust-card-heading">
                    <span>Trust & verification</span>
                    <strong>Why trust this profile</strong>
                  </div>

                  <div className="provider-profile__trust-item">
                    <span>✓</span>

                    <div>
                      <strong>Identity verified</strong>
                      <small>Identity documents have been reviewed.</small>
                    </div>
                  </div>

                  {provider.certified && (
                    <div className="provider-profile__trust-item">
                      <span>◆</span>

                      <div>
                        <strong>Certified professional</strong>
                        <small>Professional credentials verified.</small>
                      </div>
                    </div>
                  )}

                  <div className="provider-profile__trust-item">
                    <span>★</span>

                    <div>
                      <strong>Strong reputation</strong>
                      <small>Based on completed client bookings.</small>
                    </div>
                  </div>
                </div>

                {/* LOCATION */}
                <div
                  className="provider-profile__location-card"
                  data-provider-reveal
                >
                  <div className="provider-profile__location-header">
                    <span>Location</span>
                    <strong>Service area</strong>
                  </div>

                  <div className="provider-profile__mini-map">
                    <div className="provider-profile__mini-map-grid" />

                    <span className="provider-profile__mini-map-pulse" />

                    <span className="provider-profile__mini-map-pin">⌖</span>
                  </div>

                  <div className="provider-profile__location-info">
                    <span>Based in</span>
                    <strong>{provider.location}</strong>
                    <small>
                      {provider.distanceKm} km from your selected location
                    </small>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* MOBILE BOOKING BAR */}
        {/* ================================================= */}

        <div className="provider-profile__mobile-booking">
          <div>
            <small>Starting from</small>
            <strong>{formatPrice(provider.startingPrice)}</strong>
          </div>

          <button type="button" onClick={handleBooking}>
            Book Now
          </button>
        </div>
        {selectedPortfolioImage && (
          <div
            className="provider-profile__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio image preview"
            onClick={() => setSelectedPortfolioImage(null)}
          >
            <button
              type="button"
              className="provider-profile__lightbox-close"
              onClick={() => setSelectedPortfolioImage(null)}
              aria-label="Close image"
            >
              ×
            </button>

            <div
              className="provider-profile__lightbox-content"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selectedPortfolioImage}
                alt="Portfolio project preview"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
