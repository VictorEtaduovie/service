"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import SearchBar from "@/components/SearchBar";

type ServiceItem = {
  id: string;
  name: string;
  description: string;
  providers: string;
  priceFrom: string;
  icon: string;
};

type CategoryData = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  heroImage: string;
  providerCount: string;
  serviceCount: string;
  rating: string;
  subcategories: string[];
  services: ServiceItem[];
  popularSearches: string[];
};

const categories: Record<string, CategoryData> = {
  "home-services": {
    id: "home-services",
    name: "Home Services",
    eyebrow: "Everything your home needs",
    description:
      "Find trusted professionals for repairs, maintenance, installations and everyday home needs.",
    heroImage:
      "https://images.unsplash.com/photo-1505691723518-36a6b46a6a93?auto=format&fit=crop&w=1800&q=85",
    providerCount: "8,500+",
    serviceCount: "120+",
    rating: "4.8",
    subcategories: [
      "Plumbing",
      "Electrical",
      "AC & HVAC",
      "Carpentry",
      "Painting",
      "Appliance Repair",
      "Handyman",
      "Pest Control",
    ],
    popularSearches: [
      "Plumber",
      "Electrician",
      "AC Repair",
      "Carpenter",
      "Painter",
    ],
    services: [
      {
        id: "plumbing",
        name: "Plumbing",
        description:
          "Leaks, pipe repairs, installations and emergency plumbing.",
        providers: "1,200+ pros",
        priceFrom: "₦12,000",
        icon: "⌁",
      },
      {
        id: "electrical",
        name: "Electrical Services",
        description:
          "Wiring, electrical repairs, installations and diagnostics.",
        providers: "980+ pros",
        priceFrom: "₦10,000",
        icon: "ϟ",
      },
      {
        id: "ac-repair",
        name: "AC & HVAC",
        description: "AC repairs, servicing, installation and maintenance.",
        providers: "760+ pros",
        priceFrom: "₦15,000",
        icon: "❄",
      },
      {
        id: "carpentry",
        name: "Carpentry",
        description: "Furniture, woodwork, repairs and custom carpentry.",
        providers: "620+ pros",
        priceFrom: "₦18,000",
        icon: "⌂",
      },
      {
        id: "painting",
        name: "Painting",
        description: "Interior, exterior and decorative painting services.",
        providers: "540+ pros",
        priceFrom: "₦25,000",
        icon: "◒",
      },
      {
        id: "appliance-repair",
        name: "Appliance Repair",
        description: "Professional repairs for household appliances.",
        providers: "430+ pros",
        priceFrom: "₦10,000",
        icon: "◈",
      },
    ],
  },

  beauty: {
    id: "beauty",
    name: "Beauty & Personal Care",
    eyebrow: "Look your best",
    description:
      "Discover trusted beauty professionals, stylists, barbers and personal care specialists near you.",
    heroImage:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1800&q=85",
    providerCount: "6,700+",
    serviceCount: "95+",
    rating: "4.9",
    subcategories: [
      "Hair Styling",
      "Barbering",
      "Makeup",
      "Nails",
      "Skincare",
      "Spa",
      "Massage",
      "Bridal",
    ],
    popularSearches: [
      "Barber",
      "Makeup Artist",
      "Hair Stylist",
      "Nail Technician",
      "Massage",
    ],
    services: [
      {
        id: "hair-styling",
        name: "Hair Styling",
        description:
          "Professional hair styling, braiding, extensions and treatments.",
        providers: "1,500+ pros",
        priceFrom: "₦8,000",
        icon: "✦",
      },
      {
        id: "barbering",
        name: "Barbering",
        description:
          "Professional cuts, grooming, beard styling and treatment.",
        providers: "980+ pros",
        priceFrom: "₦5,000",
        icon: "✂",
      },
      {
        id: "makeup",
        name: "Makeup Artists",
        description:
          "Makeup for events, weddings, photoshoots and everyday looks.",
        providers: "820+ pros",
        priceFrom: "₦15,000",
        icon: "✧",
      },
      {
        id: "nails",
        name: "Nail Services",
        description: "Manicures, pedicures, nail art and premium nail care.",
        providers: "740+ pros",
        priceFrom: "₦7,000",
        icon: "♡",
      },
      {
        id: "massage",
        name: "Massage & Spa",
        description:
          "Wellness, massage and spa services from trusted specialists.",
        providers: "460+ pros",
        priceFrom: "₦15,000",
        icon: "◌",
      },
      {
        id: "bridal",
        name: "Bridal Beauty",
        description: "Complete bridal beauty packages and preparation.",
        providers: "310+ pros",
        priceFrom: "₦35,000",
        icon: "◇",
      },
    ],
  },

  health: {
    id: "health",
    name: "Health & Medical",
    eyebrow: "Trusted care, closer to you",
    description:
      "Connect with healthcare professionals and approved providers for a range of personal health needs.",
    heroImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=85",
    providerCount: "3,900+",
    serviceCount: "80+",
    rating: "4.9",
    subcategories: [
      "Doctors",
      "Pharmacy",
      "Dental",
      "Psychology",
      "Physiotherapy",
      "Nursing",
      "Laboratory",
      "Home Care",
    ],
    popularSearches: [
      "Doctor",
      "Dentist",
      "Pharmacist",
      "Physiotherapist",
      "Psychologist",
    ],
    services: [
      {
        id: "doctor",
        name: "Doctors",
        description: "Connect with qualified medical doctors and specialists.",
        providers: "1,100+ pros",
        priceFrom: "₦10,000",
        icon: "+",
      },
      {
        id: "dentist",
        name: "Dental Services",
        description:
          "Dental consultations, treatment and oral health services.",
        providers: "420+ pros",
        priceFrom: "₦12,000",
        icon: "D",
      },
      {
        id: "pharmacy",
        name: "Pharmacy",
        description: "Access pharmacy professionals and medication guidance.",
        providers: "370+ pros",
        priceFrom: "₦5,000",
        icon: "Rx",
      },
      {
        id: "psychology",
        name: "Psychology",
        description: "Connect with qualified psychology professionals.",
        providers: "260+ pros",
        priceFrom: "₦15,000",
        icon: "◉",
      },
      {
        id: "physiotherapy",
        name: "Physiotherapy",
        description: "Physical rehabilitation and mobility support.",
        providers: "230+ pros",
        priceFrom: "₦15,000",
        icon: "∿",
      },
      {
        id: "home-care",
        name: "Home Care",
        description: "Professional support and care services at home.",
        providers: "320+ pros",
        priceFrom: "₦10,000",
        icon: "⌂",
      },
    ],
  },

  tech: {
    id: "tech",
    name: "Tech & Repairs",
    eyebrow: "Technology support, simplified",
    description:
      "Find skilled technicians for devices, computers, networks, software and digital support.",
    heroImage:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1800&q=85",
    providerCount: "5,200+",
    serviceCount: "110+",
    rating: "4.8",
    subcategories: [
      "Phone Repair",
      "Laptop Repair",
      "Networking",
      "Software",
      "IT Support",
      "Security Systems",
      "Web Development",
      "Data Recovery",
    ],
    popularSearches: [
      "Phone Repair",
      "Laptop Repair",
      "Computer Technician",
      "IT Support",
      "Network Engineer",
    ],
    services: [
      {
        id: "phone-repair",
        name: "Phone Repair",
        description: "Screen, battery, charging and hardware repairs.",
        providers: "1,300+ pros",
        priceFrom: "₦7,000",
        icon: "▣",
      },
      {
        id: "laptop-repair",
        name: "Laptop Repair",
        description: "Professional hardware and software troubleshooting.",
        providers: "940+ pros",
        priceFrom: "₦10,000",
        icon: "▭",
      },
      {
        id: "it-support",
        name: "IT Support",
        description:
          "Technical support for homes, businesses and organizations.",
        providers: "620+ pros",
        priceFrom: "₦15,000",
        icon: "⌘",
      },
      {
        id: "networking",
        name: "Networking",
        description: "Network installation, configuration and maintenance.",
        providers: "480+ pros",
        priceFrom: "₦20,000",
        icon: "◌",
      },
      {
        id: "web-development",
        name: "Web Development",
        description: "Professional website and web application development.",
        providers: "850+ pros",
        priceFrom: "₦50,000",
        icon: "</>",
      },
      {
        id: "data-recovery",
        name: "Data Recovery",
        description: "Recover data from damaged, failed or corrupted devices.",
        providers: "190+ pros",
        priceFrom: "₦20,000",
        icon: "↻",
      },
    ],
  },

  auto: {
    id: "auto",
    name: "Automotive",
    eyebrow: "Keep your vehicle moving",
    description:
      "Find mechanics, auto electricians, detailers and vehicle specialists around you.",
    heroImage:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85",
    providerCount: "4,600+",
    serviceCount: "75+",
    rating: "4.8",
    subcategories: [
      "Mechanics",
      "Auto Electrical",
      "Car Detailing",
      "Diagnostics",
      "Tyres",
      "Car Wash",
      "AC Repair",
      "Body Work",
    ],
    popularSearches: [
      "Mechanic",
      "Car AC Repair",
      "Auto Electrician",
      "Car Wash",
      "Car Diagnostics",
    ],
    services: [
      {
        id: "mechanic",
        name: "Mechanics",
        description: "General vehicle repairs, maintenance and servicing.",
        providers: "1,200+ pros",
        priceFrom: "₦10,000",
        icon: "⚙",
      },
      {
        id: "auto-electrical",
        name: "Auto Electrical",
        description: "Electrical diagnostics, batteries and wiring.",
        providers: "720+ pros",
        priceFrom: "₦8,000",
        icon: "ϟ",
      },
      {
        id: "car-detailing",
        name: "Car Detailing",
        description: "Interior, exterior and premium vehicle detailing.",
        providers: "460+ pros",
        priceFrom: "₦12,000",
        icon: "✦",
      },
      {
        id: "diagnostics",
        name: "Car Diagnostics",
        description: "Computer diagnostics and fault detection.",
        providers: "390+ pros",
        priceFrom: "₦10,000",
        icon: "⌘",
      },
      {
        id: "car-wash",
        name: "Car Wash",
        description: "Professional washing and vehicle care services.",
        providers: "680+ pros",
        priceFrom: "₦4,000",
        icon: "◌",
      },
      {
        id: "ac-repair",
        name: "Car AC Repair",
        description: "Vehicle air conditioning diagnostics and repair.",
        providers: "280+ pros",
        priceFrom: "₦12,000",
        icon: "❄",
      },
    ],
  },

  cleaning: {
    id: "cleaning",
    name: "Cleaning Services",
    eyebrow: "A cleaner space, without the hassle",
    description:
      "Book trusted cleaners for homes, offices, move-ins, deep cleaning and more.",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1800&q=85",
    providerCount: "7,400+",
    serviceCount: "60+",
    rating: "4.8",
    subcategories: [
      "Home Cleaning",
      "Office Cleaning",
      "Deep Cleaning",
      "Laundry",
      "Move-in Cleaning",
      "Move-out Cleaning",
      "Carpet Cleaning",
      "Post-Construction",
    ],
    popularSearches: [
      "Home Cleaner",
      "Deep Cleaning",
      "Office Cleaning",
      "Laundry",
      "Carpet Cleaning",
    ],
    services: [
      {
        id: "home-cleaning",
        name: "Home Cleaning",
        description: "Reliable cleaning for apartments, homes and residences.",
        providers: "2,100+ pros",
        priceFrom: "₦8,000",
        icon: "⌂",
      },
      {
        id: "deep-cleaning",
        name: "Deep Cleaning",
        description: "Detailed cleaning for heavily used or neglected spaces.",
        providers: "1,000+ pros",
        priceFrom: "₦15,000",
        icon: "✦",
      },
      {
        id: "office-cleaning",
        name: "Office Cleaning",
        description: "Professional cleaning for businesses and workspaces.",
        providers: "680+ pros",
        priceFrom: "₦15,000",
        icon: "□",
      },
      {
        id: "laundry",
        name: "Laundry",
        description: "Washing, drying, ironing and garment care.",
        providers: "740+ pros",
        priceFrom: "₦5,000",
        icon: "◌",
      },
      {
        id: "carpet-cleaning",
        name: "Carpet Cleaning",
        description: "Professional carpet and upholstery cleaning.",
        providers: "320+ pros",
        priceFrom: "₦7,000",
        icon: "▤",
      },
      {
        id: "post-construction",
        name: "Post-Construction",
        description: "Detailed cleanup after construction or renovation work.",
        providers: "260+ pros",
        priceFrom: "₦25,000",
        icon: "⌂",
      },
    ],
  },

  moving: {
    id: "moving",
    name: "Moving & Delivery",
    eyebrow: "Move what matters",
    description:
      "Find trusted movers, delivery professionals and logistics providers for local jobs.",
    heroImage:
      "https://images.unsplash.com/photo-1600518464441-9154a6d6f7c9?auto=format&fit=crop&w=1800&q=85",
    providerCount: "3,300+",
    serviceCount: "45+",
    rating: "4.7",
    subcategories: [
      "House Moving",
      "Office Moving",
      "Local Delivery",
      "Furniture Moving",
      "Van Hire",
      "Courier",
      "Packing",
      "Storage",
    ],
    popularSearches: [
      "Movers",
      "Delivery",
      "Van Hire",
      "Furniture Moving",
      "Courier",
    ],
    services: [
      {
        id: "house-moving",
        name: "House Moving",
        description:
          "Professional relocation services for homes and apartments.",
        providers: "820+ pros",
        priceFrom: "₦25,000",
        icon: "⌂",
      },
      {
        id: "office-moving",
        name: "Office Moving",
        description: "Move offices and business equipment safely.",
        providers: "390+ pros",
        priceFrom: "₦45,000",
        icon: "□",
      },
      {
        id: "delivery",
        name: "Local Delivery",
        description: "Reliable same-day and scheduled local delivery.",
        providers: "1,100+ pros",
        priceFrom: "₦3,500",
        icon: "→",
      },
      {
        id: "furniture-moving",
        name: "Furniture Moving",
        description: "Move furniture safely around your city.",
        providers: "560+ pros",
        priceFrom: "₦12,000",
        icon: "□",
      },
      {
        id: "van-hire",
        name: "Van Hire",
        description: "Find vans and drivers for transport jobs.",
        providers: "280+ pros",
        priceFrom: "₦20,000",
        icon: "▣",
      },
      {
        id: "packing",
        name: "Packing Services",
        description: "Professional packing and preparation for moving.",
        providers: "220+ pros",
        priceFrom: "₦10,000",
        icon: "□",
      },
    ],
  },

  education: {
    id: "education",
    name: "Education & Tutoring",
    eyebrow: "Learn from the right person",
    description:
      "Connect with tutors, teachers and learning professionals for academic and skill development.",
    heroImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=85",
    providerCount: "4,100+",
    serviceCount: "70+",
    rating: "4.9",
    subcategories: [
      "Private Tutoring",
      "Exam Prep",
      "Languages",
      "Music",
      "Coding",
      "University Support",
      "Kids Learning",
      "Professional Skills",
    ],
    popularSearches: [
      "Math Tutor",
      "English Tutor",
      "Coding Tutor",
      "Music Teacher",
      "IELTS Tutor",
    ],
    services: [
      {
        id: "private-tutoring",
        name: "Private Tutoring",
        description: "One-on-one tutoring for school and academic subjects.",
        providers: "1,300+ pros",
        priceFrom: "₦5,000/hr",
        icon: "A",
      },
      {
        id: "exam-prep",
        name: "Exam Preparation",
        description: "Focused preparation for major examinations.",
        providers: "780+ pros",
        priceFrom: "₦7,000/hr",
        icon: "✓",
      },
      {
        id: "languages",
        name: "Language Learning",
        description: "Learn languages with experienced instructors.",
        providers: "440+ pros",
        priceFrom: "₦6,000/hr",
        icon: "文",
      },
      {
        id: "coding",
        name: "Coding & Programming",
        description: "Learn programming and modern technical skills.",
        providers: "580+ pros",
        priceFrom: "₦10,000/hr",
        icon: "</>",
      },
      {
        id: "music",
        name: "Music Lessons",
        description: "Learn instruments, vocals and music theory.",
        providers: "360+ pros",
        priceFrom: "₦7,000/hr",
        icon: "♪",
      },
      {
        id: "professional-skills",
        name: "Professional Skills",
        description: "Build practical skills for work and career growth.",
        providers: "310+ pros",
        priceFrom: "₦10,000/hr",
        icon: "↗",
      },
    ],
  },
};

export default function CategoryPage() {
  const params = useParams();
  const categoryId = String(params.categoryId);

  const category = categories[categoryId] ?? categories["home-services"];

  const revealRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elements = revealRef.current?.querySelectorAll(
      "[data-category-reveal]",
    );

    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("category-page__reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={revealRef} className="category-page">
      <Navbar />

      <main className="category-page__main">
        {/* ============================================================ */}
        {/* BREADCRUMB */}
        {/* ============================================================ */}

        <div className="category-page__topbar">
          <div className="container category-page__container">
            <Link href="/" className="category-page__back">
              ← Home
            </Link>

            <div className="category-page__breadcrumbs">
              <span>Home</span>
              <span>/</span>
              <span>Categories</span>
              <span>/</span>
              <strong>{category.name}</strong>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* HERO */}
        {/* ============================================================ */}

        <section className="category-page__hero">
          <div
            className="category-page__hero-image"
            style={{
              backgroundImage: `url("${category.heroImage}")`,
            }}
          />

          <div className="category-page__hero-overlay" />

          <div className="container category-page__container">
            <div className="category-page__hero-content">
              <span className="category-page__eyebrow">{category.eyebrow}</span>

              <h1>{category.name}</h1>

              <p>{category.description}</p>

              <div className="category-page__hero-stats">
                <div>
                  <strong>{category.providerCount}</strong>
                  <span>Professionals</span>
                </div>

                <div>
                  <strong>{category.serviceCount}</strong>
                  <span>Services</span>
                </div>

                <div>
                  <strong>★ {category.rating}</strong>
                  <span>Average rating</span>
                </div>
              </div>

              <div className="category-page__hero-search">
                <SearchBar />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* POPULAR SEARCHES */}
        {/* ============================================================ */}

        <section
          className="category-page__quick-search"
          data-category-reveal="fade-up"
        >
          <div className="container category-page__container">
            <div className="category-page__quick-search-inner">
              <span className="category-page__quick-search-label">
                Popular searches
              </span>

              <div className="category-page__quick-search-list">
                {category.popularSearches.map((item) => (
                  <Link
                    key={item}
                    href={`/search?query=${encodeURIComponent(item)}`}
                    className="category-page__quick-search-item"
                  >
                    {item}
                    <span>↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SUBCATEGORIES */}
        {/* ============================================================ */}

        <section
          className="category-page__subcategories"
          data-category-reveal="fade-up"
        >
          <div className="container category-page__container">
            <div className="category-page__section-header">
              <div>
                <span className="category-page__section-eyebrow">
                  Explore by specialty
                </span>

                <h2>Find exactly what you need</h2>

                <p>
                  Browse popular areas within {category.name.toLowerCase()}.
                </p>
              </div>

              <span className="category-page__section-count">
                {category.subcategories.length} specialties
              </span>
            </div>

            <div className="category-page__subcategory-grid">
              {category.subcategories.map((subcategory, index) => (
                <Link
                  key={subcategory}
                  href={`/services/${encodeURIComponent(
                    subcategory.toLowerCase().trim().replace(/\s+/g, "-"),
                  )}?category=${encodeURIComponent(
                    category.id,
                  )}&subcategory=${encodeURIComponent(subcategory)}`}
                  className="category-page__subcategory-card"
                  data-category-reveal="fade-up"
                  style={{
                    transitionDelay: `${index * 60}ms`,
                  }}
                >
                  <span className="category-page__subcategory-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3>{subcategory}</h3>
                    <span>Find professionals →</span>
                  </div>

                  <span className="category-page__subcategory-arrow">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SERVICES */}
        {/* ============================================================ */}

        <section
          className="category-page__services"
          data-category-reveal="fade-up"
        >
          <div className="container category-page__container">
            <div className="category-page__section-header">
              <div>
                <span className="category-page__section-eyebrow">
                  Popular services
                </span>

                <h2>Book {category.name.toLowerCase()}</h2>

                <p>Compare trusted professionals, prices and availability.</p>
              </div>

              <Link
                href={`/search?category=${category.id}`}
                className="category-page__view-all"
              >
                View all →
              </Link>
            </div>

            <div className="category-page__service-grid">
              {category.services.map((service, index) => (
                <article
                  key={service.id}
                  className="category-page__service-card"
                  data-category-reveal="zoom"
                  style={{
                    transitionDelay: `${index * 70}ms`,
                  }}
                >
                  <div className="category-page__service-top">
                    <span className="category-page__service-icon">
                      {service.icon}
                    </span>

                    <span className="category-page__service-arrow">↗</span>
                  </div>

                  <div className="category-page__service-body">
                    <h3>{service.name}</h3>

                    <p>{service.description}</p>

                    <div className="category-page__service-info">
                      <span>{service.providers}</span>

                      <span>
                        From <strong>{service.priceFrom}</strong>
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/services/${encodeURIComponent(
                      service.name.toLowerCase().trim().replace(/\s+/g, "-"),
                    )}?category=${encodeURIComponent(
                      category.id,
                    )}&service=${encodeURIComponent(service.name)}`}
                    className="category-page__service-link"
                  >
                    Find professionals
                    <span>→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* TRUST BAND */}
        {/* ============================================================ */}

        <section
          className="category-page__trust"
          data-category-reveal="fade-up"
        >
          <div className="container category-page__container">
            <div className="category-page__trust-heading">
              <span>Why book here</span>

              <h2>Built to make finding professionals easier.</h2>
            </div>

            <div className="category-page__trust-grid">
              <div className="category-page__trust-item">
                <span>✓</span>
                <div>
                  <strong>Verified professionals</strong>
                  <small>
                    Identity and professional information can be reviewed.
                  </small>
                </div>
              </div>

              <div className="category-page__trust-item">
                <span>★</span>
                <div>
                  <strong>Real client reviews</strong>
                  <small>
                    Compare ratings and previous customer experiences.
                  </small>
                </div>
              </div>

              <div className="category-page__trust-item">
                <span>⌖</span>
                <div>
                  <strong>Location-aware discovery</strong>
                  <small>Find professionals near your selected location.</small>
                </div>
              </div>

              <div className="category-page__trust-item">
                <span>₦</span>
                <div>
                  <strong>Secure booking</strong>
                  <small>Designed around safe payment and booking flows.</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FINAL CTA */}
        {/* ============================================================ */}

        <section className="category-page__cta" data-category-reveal="fade-up">
          <div className="category-page__cta-glow" />

          <div className="container category-page__container">
            <div className="category-page__cta-inner">
              <div>
                <span>Ready to get started?</span>

                <h2>Find the right professional for you.</h2>

                <p>
                  Search {category.name.toLowerCase()}, compare your options and
                  book with confidence.
                </p>
              </div>

              <Link
                href={`/search?category=${category.id}`}
                className="category-page__cta-button"
              >
                Explore professionals
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
