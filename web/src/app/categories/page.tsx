"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import SearchBar from "@/components/SearchBar";

type Service = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  services: Service[];
  providerImage: string;
  providerName: string;
  providerRole: string;
  providerRating: string;
};

const categories: Category[] = [
  {
    id: "home-services",
    name: "Home Services",
    description:
      "Repairs, maintenance, installations and everyday services for your home.",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a6b46a6a93?auto=format&fit=crop&w=1600&q=85",
    services: [
      { id: "plumbing", name: "Plumbing" },
      { id: "electrical", name: "Electrical Services" },
      { id: "ac-repair", name: "AC & HVAC" },
      { id: "carpentry", name: "Carpentry" },
      { id: "painting", name: "Painting" },
      { id: "appliance-repair", name: "Appliance Repair" },
      { id: "handyman", name: "Handyman" },
      { id: "pest-control", name: "Pest Control" },
    ],
    providerImage: "https://randomuser.me/api/portraits/men/32.jpg",
    providerName: "Michael Adeyemi",
    providerRole: "Licensed Plumbing Specialist",
    providerRating: "4.8",
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    description:
      "Beauty, grooming, wellness and personal care professionals near you.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=85",
    services: [
      { id: "hair-styling", name: "Hair Styling" },
      { id: "barbering", name: "Barbering" },
      { id: "makeup", name: "Makeup Artists" },
      { id: "nails", name: "Nail Services" },
      { id: "skincare", name: "Skincare" },
      { id: "massage", name: "Massage & Spa" },
      { id: "bridal", name: "Bridal Beauty" },
    ],
    providerImage: "https://randomuser.me/api/portraits/women/44.jpg",
    providerName: "Grace Williams",
    providerRole: "Beauty & Wellness Professional",
    providerRating: "4.9",
  },
  {
    id: "health",
    name: "Health & Medical",
    description:
      "Connect with healthcare professionals and approved service providers.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85",
    services: [
      { id: "doctors", name: "Doctors" },
      { id: "dentist", name: "Dental Services" },
      { id: "pharmacy", name: "Pharmacy" },
      { id: "psychology", name: "Psychology" },
      { id: "physiotherapy", name: "Physiotherapy" },
      { id: "nursing", name: "Nursing" },
      { id: "laboratory", name: "Laboratory Services" },
      { id: "home-care", name: "Home Care" },
    ],
    providerImage: "https://randomuser.me/api/portraits/women/65.jpg",
    providerName: "Dr. Sarah Johnson",
    providerRole: "Healthcare Professional",
    providerRating: "4.9",
  },
  {
    id: "tech",
    name: "Tech & Repairs",
    description:
      "Device repairs, IT support, networking, software and digital services.",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=85",
    services: [
      { id: "phone-repair", name: "Phone Repair" },
      { id: "laptop-repair", name: "Laptop Repair" },
      { id: "it-support", name: "IT Support" },
      { id: "networking", name: "Networking" },
      { id: "web-development", name: "Web Development" },
      { id: "data-recovery", name: "Data Recovery" },
      { id: "cybersecurity", name: "Cybersecurity" },
    ],
    providerImage: "https://randomuser.me/api/portraits/men/45.jpg",
    providerName: "Samuel Johnson",
    providerRole: "IT & Systems Specialist",
    providerRating: "4.8",
  },
  {
    id: "auto",
    name: "Automotive",
    description: "Mechanics, diagnostics, electrical work and vehicle care.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
    services: [
      { id: "mechanics", name: "Mechanics" },
      { id: "auto-electrical", name: "Auto Electrical" },
      { id: "car-detailing", name: "Car Detailing" },
      { id: "diagnostics", name: "Car Diagnostics" },
      { id: "car-wash", name: "Car Wash" },
      { id: "car-ac-repair", name: "Car AC Repair" },
      { id: "body-work", name: "Body Work" },
    ],
    providerImage: "https://randomuser.me/api/portraits/men/52.jpg",
    providerName: "Victor Martins",
    providerRole: "Automotive Specialist",
    providerRating: "4.7",
  },
  {
    id: "cleaning",
    name: "Cleaning Services",
    description:
      "Reliable cleaning for homes, offices, businesses and special projects.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=85",
    services: [
      { id: "home-cleaning", name: "Home Cleaning" },
      { id: "deep-cleaning", name: "Deep Cleaning" },
      { id: "office-cleaning", name: "Office Cleaning" },
      { id: "laundry", name: "Laundry" },
      { id: "carpet-cleaning", name: "Carpet Cleaning" },
      { id: "move-in-cleaning", name: "Move-in Cleaning" },
      { id: "post-construction", name: "Post-Construction Cleaning" },
    ],
    providerImage: "https://randomuser.me/api/portraits/women/68.jpg",
    providerName: "Aisha Bello",
    providerRole: "Professional Cleaning Specialist",
    providerRating: "4.9",
  },
  {
    id: "moving",
    name: "Moving & Delivery",
    description:
      "Moving, delivery, transport and local logistics professionals.",
    image:
      "https://images.unsplash.com/photo-1600518464441-9154a6d6f7c9?auto=format&fit=crop&w=1600&q=85",
    services: [
      { id: "house-moving", name: "House Moving" },
      { id: "office-moving", name: "Office Moving" },
      { id: "delivery", name: "Local Delivery" },
      { id: "furniture-moving", name: "Furniture Moving" },
      { id: "van-hire", name: "Van Hire" },
      { id: "courier", name: "Courier Services" },
      { id: "packing", name: "Packing Services" },
    ],
    providerImage: "https://randomuser.me/api/portraits/men/18.jpg",
    providerName: "David Okafor",
    providerRole: "Logistics & Moving Professional",
    providerRating: "4.8",
  },
  {
    id: "education",
    name: "Education & Tutoring",
    description: "Tutors, teachers, coaches and learning professionals.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=85",
    services: [
      { id: "private-tutoring", name: "Private Tutoring" },
      { id: "exam-prep", name: "Exam Preparation" },
      { id: "languages", name: "Language Learning" },
      { id: "music", name: "Music Lessons" },
      { id: "coding", name: "Coding & Programming" },
      { id: "professional-skills", name: "Professional Skills" },
    ],
    providerImage: "https://randomuser.me/api/portraits/women/49.jpg",
    providerName: "Mary Adams",
    providerRole: "Professional Tutor",
    providerRating: "4.9",
  },
  {
    id: "business",
    name: "Business Services",
    description:
      "Professional support for businesses, entrepreneurs and organizations.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
    services: [
      { id: "accounting", name: "Accounting" },
      { id: "legal", name: "Legal Services" },
      { id: "consulting", name: "Business Consulting" },
      { id: "marketing", name: "Marketing" },
      { id: "graphic-design", name: "Graphic Design" },
      { id: "virtual-assistant", name: "Virtual Assistance" },
    ],
    providerImage: "https://randomuser.me/api/portraits/men/11.jpg",
    providerName: "Daniel Ade",
    providerRole: "Business Consultant",
    providerRating: "4.8",
  },
  {
    id: "events",
    name: "Events & Entertainment",
    description: "Photographers, planners, caterers and event professionals.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=85",
    services: [
      { id: "photography", name: "Photography" },
      { id: "videography", name: "Videography" },
      { id: "event-planning", name: "Event Planning" },
      { id: "catering", name: "Catering" },
      { id: "dj", name: "DJ Services" },
      { id: "decoration", name: "Event Decoration" },
    ],
    providerImage: "https://randomuser.me/api/portraits/women/29.jpg",
    providerName: "Sarah Adams",
    providerRole: "Event Professional",
    providerRating: "4.8",
  },
  {
    id: "agriculture",
    name: "Agriculture",
    description:
      "Farm services, agricultural professionals and specialist support.",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=85",
    services: [
      { id: "farm-management", name: "Farm Management" },
      { id: "land-preparation", name: "Land Preparation" },
      { id: "irrigation", name: "Irrigation Services" },
      { id: "livestock", name: "Livestock Services" },
      { id: "agricultural-consulting", name: "Agricultural Consulting" },
    ],
    providerImage: "https://randomuser.me/api/portraits/men/67.jpg",
    providerName: "Joseph Ade",
    providerRole: "Agricultural Specialist",
    providerRating: "4.7",
  },
];

const popularServices = [
  {
    id: "plumbing",
    name: "Plumbing",
    category: "Home Services",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "physiotherapy",
    name: "Physiotherapy",
    category: "Health & Medical",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "hair-styling",
    name: "Hair Styling",
    category: "Beauty & Personal Care",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "phone-repair",
    name: "Phone Repair",
    category: "Tech & Repairs",
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "car-wash",
    name: "Car Wash",
    category: "Automotive",
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7cf7cf81?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "home-cleaning",
    name: "Home Cleaning",
    category: "Cleaning Services",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80",
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function CategoriesPage() {
  const revealRef = useRef<HTMLDivElement | null>(null);
  const [categoryQuery, setCategoryQuery] = useState("");

  useEffect(() => {
    const elements = revealRef.current?.querySelectorAll(
      "[data-categories-reveal]",
    );

    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("categories-page__reveal-visible");

          observer.unobserve(entry.target);
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

  const filteredCategories = useMemo(() => {
    const query = categoryQuery.trim().toLowerCase();

    if (!query) return categories;

    return categories.filter((category) => {
      return (
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query) ||
        category.services.some((service) =>
          service.name.toLowerCase().includes(query),
        )
      );
    });
  }, [categoryQuery]);

  const featuredCategories = filteredCategories.slice(0, 6);

  return (
    <div className="categories-page" ref={revealRef}>
      <Navbar />

      <main className="categories-page__main">
        {/* ============================================================ */}
        {/* HERO */}
        {/* ============================================================ */}

        <section
          className="categories-page__hero"
          data-categories-reveal="fade-up"
        >
          <div className="categories-page__hero-backdrop" />

          <div className="categories-page__hero-overlay" />

          <div className="container categories-page__container">
            <div className="categories-page__hero-content">
              <span className="categories-page__eyebrow">
                Explore the marketplace
              </span>

              <h1 className="categories-page__title">
                Find the right service.
                <span> Find someone you can trust.</span>
              </h1>

              <p className="categories-page__subtitle">
                Explore trusted professionals across home, health, beauty,
                technology, education, automotive and more.
              </p>

              <div className="categories-page__hero-search ">
                <SearchBar />
              </div>

              <div className="categories-page__hero-meta">
                <span>
                  <strong>50+</strong> service categories
                </span>

                <span className="categories-page__hero-dot">•</span>

                <span>Trusted local professionals</span>

                <span className="categories-page__hero-dot">•</span>

                <span>Search by what you need</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FEATURED CATEGORIES */}
        {/* ============================================================ */}

        <section
          className="categories-page__featured"
          data-categories-reveal="fade-up"
        >
          <div className="container categories-page__container">
            <div className="categories-page__section-heading">
              <div>
                <span className="categories-page__eyebrow">
                  Explore popular categories
                </span>

                <h2>Services people use every day.</h2>

                <p>
                  Start with a category or search for exactly what you need.
                </p>
              </div>

              <span className="categories-page__section-count">
                {filteredCategories.length} categories
              </span>
            </div>

            <div className="categories-page__featured-grid">
              {featuredCategories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className={`categories-page__featured-card ${
                    index === 0 ? "categories-page__featured-card--large" : ""
                  }`}
                  data-categories-reveal="zoom"
                  style={{
                    transitionDelay: `${index * 80}ms`,
                  }}
                >
                  <div
                    className="categories-page__featured-image"
                    style={{
                      backgroundImage: `url("${category.image}")`,
                    }}
                  />

                  <div className="categories-page__featured-overlay" />

                  <div className="categories-page__featured-content">
                    <span className="categories-page__featured-arrow">↗</span>

                    <span className="categories-page__featured-label">
                      {category.services.length}+ services
                    </span>

                    <h3>{category.name}</h3>

                    <p>{category.description}</p>

                    <span className="categories-page__featured-link">
                      Explore category
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* POPULAR SERVICES */}
        {/* ============================================================ */}

        <section
          className="categories-page__popular"
          data-categories-reveal="fade-up"
        >
          <div className="container categories-page__container">
            <div className="categories-page__section-heading categories-page__section-heading--split">
              <div>
                <span className="categories-page__eyebrow">
                  Popular right now
                </span>

                <h2>Start with a service.</h2>

                <p>
                  Go directly to professionals who offer the service you need.
                </p>
              </div>

              <Link href="/search" className="categories-page__heading-link">
                Search all services →
              </Link>
            </div>

            <div className="categories-page__popular-grid">
              {popularServices.map((service, index) => (
                <Link
                  key={service.id}
                  href={`/services/${slugify(
                    service.name,
                  )}?category=${encodeURIComponent(
                    service.category,
                  )}&service=${encodeURIComponent(service.name)}`}
                  className="categories-page__popular-card"
                  data-categories-reveal="fade-up"
                  style={{
                    transitionDelay: `${index * 70}ms`,
                  }}
                >
                  <div
                    className="categories-page__popular-image"
                    style={{
                      backgroundImage: `url("${service.image}")`,
                    }}
                  />

                  <div className="categories-page__popular-overlay" />

                  <div className="categories-page__popular-content">
                    <span>{service.category}</span>

                    <h3>{service.name}</h3>

                    <strong>Find professionals →</strong>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* COMPLETE DIRECTORY */}
        {/* ============================================================ */}

        <section
          className="categories-page__directory"
          data-categories-reveal="fade-up"
        >
          <div className="container categories-page__container">
            <div className="categories-page__directory-heading">
              <div>
                <span className="categories-page__eyebrow">
                  Full marketplace
                </span>

                <h2>Browse every service category.</h2>

                <p>
                  Explore the marketplace by category and jump directly into the
                  services available.
                </p>
              </div>

              <div className="categories-page__directory-search">
                <span>⌕</span>

                <input
                  type="search"
                  value={categoryQuery}
                  onChange={(event) => setCategoryQuery(event.target.value)}
                  placeholder="Filter categories..."
                  aria-label="Filter categories"
                />

                {categoryQuery && (
                  <button
                    type="button"
                    onClick={() => setCategoryQuery("")}
                    aria-label="Clear category filter"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="categories-page__directory-grid">
              {filteredCategories.map((category, index) => (
                <article
                  key={category.id}
                  className="categories-page__directory-card"
                  data-categories-reveal="fade-up"
                  style={{
                    transitionDelay: `${index * 55}ms`,
                  }}
                >
                  <div className="categories-page__directory-card-top">
                    <div>
                      <span className="categories-page__directory-kicker">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3>{category.name}</h3>
                    </div>

                    <Link
                      href={`/categories/${category.id}`}
                      className="categories-page__directory-arrow"
                      aria-label={`Explore ${category.name}`}
                    >
                      ↗
                    </Link>
                  </div>

                  <p>{category.description}</p>

                  <div className="categories-page__service-list">
                    {category.services.slice(0, 6).map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}?category=${encodeURIComponent(
                          category.id,
                        )}&service=${encodeURIComponent(service.name)}`}
                        className="categories-page__service-item"
                      >
                        <span>{service.name}</span>
                        <span>→</span>
                      </Link>
                    ))}
                  </div>

                  {category.services.length > 6 && (
                    <Link
                      href={`/categories/${category.id}`}
                      className="categories-page__directory-footer"
                    >
                      View all {category.services.length} services
                      <span>→</span>
                    </Link>
                  )}
                </article>
              ))}
            </div>

            {filteredCategories.length === 0 && (
              <div className="categories-page__empty">
                <span>⌕</span>
                <h3>No matching categories</h3>
                <p>
                  Try a different category or use the main service search above.
                </p>

                <button type="button" onClick={() => setCategoryQuery("")}>
                  Clear search
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* TRUST STRIP */}
        {/* ============================================================ */}

        <section
          className="categories-page__trust"
          data-categories-reveal="fade-up"
        >
          <div className="container categories-page__container">
            <div className="categories-page__trust-heading">
              <span className="categories-page__eyebrow">
                Built around trust
              </span>

              <h2>A better way to discover local professionals.</h2>
            </div>

            <div className="categories-page__trust-grid">
              <div className="categories-page__trust-item">
                <span>✓</span>

                <div>
                  <strong>Verified professionals</strong>
                  <small>Review provider identity and credentials.</small>
                </div>
              </div>

              <div className="categories-page__trust-item">
                <span>★</span>

                <div>
                  <strong>Real ratings & reviews</strong>
                  <small>Compare providers before you book.</small>
                </div>
              </div>

              <div className="categories-page__trust-item">
                <span>⌖</span>

                <div>
                  <strong>Location-aware discovery</strong>
                  <small>Find professionals around your location.</small>
                </div>
              </div>

              <div className="categories-page__trust-item">
                <span>₦</span>

                <div>
                  <strong>Secure booking experience</strong>
                  <small>Stay protected throughout your booking.</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CTA */}
        {/* ============================================================ */}

        <section
          className="categories-page__cta"
          data-categories-reveal="fade-up"
        >
          <div className="categories-page__cta-glow" />

          <div className="container categories-page__container">
            <div className="categories-page__cta-inner">
              <div>
                <span>Can't find exactly what you need?</span>

                <h2>Describe the service in your own words.</h2>

                <p>
                  Use the marketplace search to tell us what you need and
                  discover the right professionals.
                </p>
              </div>

              <Link href="/search" className="categories-page__cta-button">
                Search for a service
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
