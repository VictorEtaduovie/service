"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import SearchBar from "@/components/SearchBar";
import { createPortal } from "react-dom";

/* =========================================================
   TYPES
========================================================= */

type Subcategory = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  subcategories?: Subcategory[];
};

type Sector = {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  image?: string;
  serviceCount?: number;
  categories?: Category[];
};

type PopularService = {
  id: string;
  name: string;
  icon?: string;
  image?: string;
};

/* =========================================================
   MOCK DATA
========================================================= */

const MOCK_SECTORS: Sector[] = [
  {
    id: "home-property",
    name: "Home & Property",
    description: "Repairs, maintenance and improvements",
    icon: "🏠",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    serviceCount: 1240,
    categories: [
      {
        id: "plumbing",
        name: "Plumbing",
        description: "Leaks, pipes, heaters",
        icon: "🚰",
        subcategories: [
          {
            id: "leak-repair",
            name: "Leak Repair",
          },
          {
            id: "drain-cleaning",
            name: "Drain Cleaning",
          },
          {
            id: "water-heater",
            name: "Water Heater Repair",
          },
        ],
      },
      {
        id: "electrical",
        name: "Electrical",
        description: "Wiring, sockets, panels",
        icon: "💡",
      },
      {
        id: "cleaning",
        name: "Cleaning",
        description: "House and deep cleaning",
        icon: "🧹",
      },
      {
        id: "carpentry",
        name: "Carpentry",
        description: "Woodwork & installations",
        icon: "🔨",
      },
    ],
  },

  {
    id: "health-wellness",
    name: "Health & Wellness",
    description: "Fitness, therapy and wellbeing",
    icon: "💚",
    serviceCount: 420,
  },

  {
    id: "beauty",
    name: "Beauty & Personal Care",
    description: "Salon and grooming services",
    icon: "💄",
    serviceCount: 890,
  },

  {
    id: "automotive",
    name: "Automotive",
    description: "Repair, maintenance and detailing",
    icon: "🚗",
    serviceCount: 530,
  },

  {
    id: "technology",
    name: "Technology & Repairs",
    description: "Device repair and IT support",
    icon: "🖥️",
  },

  {
    id: "business",
    name: "Business Services",
    description: "Accounting, consulting and admin",
    icon: "📈",
  },

  {
    id: "education",
    name: "Education & Tutoring",
    description: "Private tutors and classes",
    icon: "📚",
  },

  {
    id: "events",
    name: "Events & Creative",
    description: "Photography, design and entertainment",
    icon: "🎨",
  },

  {
    id: "logistics",
    name: "Logistics & Delivery",
    description: "Courier and moving services",
    icon: "📦",
  },

  {
    id: "legal-financial",
    name: "Legal & Financial",
    description: "Advisory and legal services",
    icon: "⚖️",
  },
];

const MOCK_POPULAR: PopularService[] = [
  {
    id: "ac-repair",
    name: "AC Repair",
    icon: "❄️",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "plumber",
    name: "Plumber",
    icon: "🔧",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "electrician",
    name: "Electrician",
    icon: "💡",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "cleaner",
    name: "Home Cleaning",
    icon: "🧼",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function SearchPage() {
  const revealRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elements = revealRef.current?.querySelectorAll(
      "[data-search-reveal]",
    );

    if (!elements || elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("search-reveal-visible");
            observer.unobserve(entry.target);
          }
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
    <div className="bg-light min-vh-100 text-dark search-page">
      <Navbar />

      <main ref={revealRef} className="container py-5">
        {/* =====================================================
            HERO / HEADER — KEEPING YOUR EXISTING SEARCH EXPERIENCE
        ====================================================== */}

        <PageHeader />

        {/* =====================================================
            SECTORS
        ====================================================== */}

        <section className="mt-5">
          <SectorGrid sectors={MOCK_SECTORS} />
        </section>

        {/* =====================================================
            POPULAR SERVICES
        ====================================================== */}

        <section className="mt-5">
          <QuickAccess items={MOCK_POPULAR} />
        </section>

        {/* =====================================================
            AI SERVICE ASSISTANT
        ====================================================== */}

        <section className="mt-5">
          <AIServiceSuggest />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function PageHeader() {
  return (
    <section className="text-center">
      <h1 className="fw-bold display-6">Browse All Services</h1>

      <p className="text-muted">Explore services by sector and category.</p>

      <div className="browse-search-container mt-4">
        <SearchBar />
      </div>
    </section>
  );
}

/* =========================================================
   SECTOR GRID
========================================================= */

function SectorGrid({ sectors }: { sectors: Sector[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggleSector(id: string) {
    setExpanded((current) => (current === id ? null : id));
  }

  return (
    <section className="search-sectors" aria-labelledby="search-sectors-title">
      <div className="search-sectors__heading" data-search-reveal="fade-up">
        <div>
          <span className="search-sectors__eyebrow">
            Explore the marketplace
          </span>

          <h2 id="search-sectors-title">
            Find the service category that fits your need.
          </h2>

          <p>
            Browse by sector, explore categories, and discover the professionals
            you need.
          </p>
        </div>

        <span className="search-sectors__count">{sectors.length} sectors</span>
      </div>

      <div className="search-sectors__grid">
        {sectors.map((sector, index) => {
          const isExpanded = expanded === sector.id;

          return (
            <article
              key={sector.id}
              className={`search-sector-card ${
                isExpanded ? "search-sector-card--expanded" : ""
              }`}
              data-search-reveal="zoom"
              style={{
                transitionDelay: `${index * 65}ms`,
              }}
            >
              {/* VISUAL AREA */}

              <button
                type="button"
                className="search-sector-card__visual"
                onClick={() => toggleSector(sector.id)}
                aria-expanded={isExpanded}
                aria-controls={`sector-panel-${sector.id}`}
              >
                {sector.image ? (
                  <img src={sector.image} alt="" />
                ) : (
                  <div className="search-sector-card__fallback">
                    {sector.icon}
                  </div>
                )}

                <div className="search-sector-card__image-overlay" />

                <div className="search-sector-card__top">
                  <span className="search-sector-card__icon">
                    {sector.icon}
                  </span>

                  {sector.serviceCount ? (
                    <span className="search-sector-card__count">
                      {sector.serviceCount.toLocaleString()}+
                    </span>
                  ) : null}
                </div>

                <div className="search-sector-card__bottom">
                  <div>
                    <h3>{sector.name}</h3>

                    <p>{sector.description}</p>
                  </div>

                  <span className="search-sector-card__arrow">
                    {isExpanded ? "−" : "↗"}
                  </span>
                </div>
              </button>

              {/* EXPANDED CATEGORY AREA */}

              <div
                id={`sector-panel-${sector.id}`}
                className="search-sector-card__panel"
                hidden={!isExpanded}
              >
                {sector.categories && sector.categories.length > 0 ? (
                  <div className="search-sector-card__categories">
                    {sector.categories.map((category) => (
                      <CategoryCard key={category.id} category={category} />
                    ))}
                  </div>
                ) : (
                  <EmptySector />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* =========================================================
   CATEGORY CARD
========================================================= */

function CategoryCard({ category }: { category: Category }) {
  const [openSubs, setOpenSubs] = useState(false);

  const router = useRouter();

  function gotoSubSearch(sub: Subcategory) {
    router.push(`/search?service=${encodeURIComponent(sub.name)}`);
  }

  return (
    <div className="search-category-card">
      <div className="search-category-card__top">
        <span className="search-category-card__icon">
          {category.icon ?? "◈"}
        </span>

        <div className="search-category-card__content">
          <div className="search-category-card__title-row">
            <h4>{category.name}</h4>

            {category.subcategories && category.subcategories.length > 0 ? (
              <button
                type="button"
                className="search-category-card__toggle"
                onClick={() => setOpenSubs((current) => !current)}
                aria-expanded={openSubs}
              >
                {openSubs ? "Hide" : "Explore"}
              </button>
            ) : null}
          </div>

          {category.description ? <p>{category.description}</p> : null}
        </div>
      </div>

      {openSubs &&
      category.subcategories &&
      category.subcategories.length > 0 ? (
        <div className="search-category-card__subs">
          {category.subcategories.map((sub) => (
            <button
              key={sub.id}
              type="button"
              className="search-category-card__sub"
              onClick={() => gotoSubSearch(sub)}
            >
              <span>{sub.name}</span>

              <span>→</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* =========================================================
   EMPTY SECTOR
========================================================= */

function EmptySector() {
  const router = useRouter();

  return (
    <div className="text-center py-4">
      <h5 className="mb-2">Services coming soon</h5>

      <p className="small text-muted">
        We are expanding this sector in your area.
      </p>

      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={() => router.push("/search?request=service")}
      >
        Request a Service
      </button>
    </div>
  );
}

/* =========================================================
   POPULAR SERVICES
========================================================= */

function QuickAccess({ items }: { items: PopularService[] }) {
  return (
    <section className="search-popular" aria-labelledby="search-popular-title">
      <div className="search-popular__heading" data-search-reveal="fade-up">
        <div>
          <span className="search-popular__eyebrow">Popular right now</span>

          <h2 id="search-popular-title">Services people are searching for.</h2>

          <p>
            Jump straight into some of the most requested services on the
            marketplace.
          </p>
        </div>
      </div>

      <div className="search-popular__list">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="search-popular__item"
            data-search-reveal="fade-up"
            style={{
              transitionDelay: `${index * 110}ms`,
            }}
          >
            <div className="search-popular__visual">
              {item.image ? <img src={item.image} alt={item.name} /> : null}

              <div className="search-popular__visual-overlay" />

              <span className="search-popular__service-icon">{item.icon}</span>
            </div>

            <div className="search-popular__body">
              <span className="search-popular__label">Popular service</span>

              <h3>{item.name}</h3>

              <p>
                Find trusted professionals offering {item.name.toLowerCase()}{" "}
                services near you.
              </p>

              <div className="search-popular__actions">
                <Link
                  href={`/search?query=${encodeURIComponent(item.name)}`}
                  className="search-popular__primary"
                >
                  Explore service
                </Link>

                <Link
                  href={`/search?query=${encodeURIComponent(
                    item.name,
                  )}&filter=top`}
                  className="search-popular__secondary"
                >
                  Top providers
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   AI SERVICE SUGGEST
========================================================= */

function AIServiceSuggest() {
  const router = useRouter();

  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAiSuggest() {
    const query = aiInput.trim();

    if (!query) return;

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 350));

    const candidates: {
      name: string;
      text: string;
    }[] = [];

    MOCK_SECTORS.forEach((sector) => {
      candidates.push({
        name: sector.name,
        text: `${sector.name} ${sector.description ?? ""}`.toLowerCase(),
      });

      sector.categories?.forEach((category) => {
        candidates.push({
          name: category.name,
          text: `${category.name} ${category.description ?? ""}`.toLowerCase(),
        });

        category.subcategories?.forEach((subcategory) => {
          candidates.push({
            name: subcategory.name,
            text: subcategory.name.toLowerCase(),
          });
        });
      });
    });

    const words = query.toLowerCase().split(/\W+/).filter(Boolean);

    const best = candidates
      .map((candidate) => ({
        candidate,
        score: words.reduce(
          (score, word) => (candidate.text.includes(word) ? score + 1 : score),
          0,
        ),
      }))
      .sort((a, b) => b.score - a.score)[0];

    setAiSuggestion(best && best.score > 0 ? best.candidate.name : query);

    setLoading(false);
  }

  function closeModal() {
    setAiOpen(false);
    setAiInput("");
    setAiSuggestion(null);
    setLoading(false);
  }

  function exploreSuggestion() {
    const value = aiSuggestion || aiInput.trim();

    if (!value) return;

    closeModal();

    router.push(`/search?service=${encodeURIComponent(value)}`);
  }

  return (
    <>
      {/* =====================================================
          AI CTA — NO INPUT HERE
      ====================================================== */}

      <section
        className="search-ai"
        aria-labelledby="search-ai-title"
        data-search-reveal="fade-up"
      >
        <div className="search-ai__glow" />

        <div className="search-ai__content">
          <div className="search-ai__icon" aria-hidden="true">
            ✦
          </div>

          <div className="search-ai__copy">
            <span className="search-ai__eyebrow">
              Can't find exactly what you need?
            </span>

            <h2 id="search-ai-title">Describe it in your own words.</h2>

            <p>
              Tell us what you're trying to get done and we'll suggest the
              closest service category.
            </p>
          </div>

          <button
            type="button"
            className="search-ai__button"
            onClick={() => setAiOpen(true)}
          >
            Describe your problem
            <span>→</span>
          </button>
        </div>
      </section>

      {/* =====================================================
          ACTUAL POP-UP — COMPLETELY SEPARATE FROM THE SECTION
      ====================================================== */}

      {aiOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              className="search-ai-popup"
              role="dialog"
              aria-modal="true"
              aria-labelledby="search-ai-popup-title"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  closeModal();
                }
              }}
            >
              <div className="search-ai-popup__card">
                <div className="search-ai-popup__header">
                  <div className="search-ai-popup__identity">
                    <div className="search-ai-popup__icon">✦</div>

                    <div>
                      <span>Service Assistant</span>

                      <h2 id="search-ai-popup-title">
                        What do you need help with?
                      </h2>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="search-ai-popup__close"
                    onClick={closeModal}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                <div className="search-ai-popup__body">
                  <p>
                    Describe the service you need as naturally as you would
                    explain it to a professional.
                  </p>

                  <textarea
                    value={aiInput}
                    onChange={(event) => setAiInput(event.target.value)}
                    placeholder="e.g. My kitchen sink is leaking and water is coming out from underneath..."
                    autoFocus
                  />

                  <div className="search-ai-popup__actions">
                    <button
                      type="button"
                      className="search-ai-popup__cancel"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="search-ai-popup__submit"
                      onClick={handleAiSuggest}
                      disabled={loading || !aiInput.trim()}
                    >
                      {loading ? "Finding service..." : "Find Service"}
                      {!loading && <span>→</span>}
                    </button>
                  </div>

                  {aiSuggestion && (
                    <div className="search-ai-popup__result">
                      <span>Suggested service</span>

                      <div>
                        <strong>{aiSuggestion}</strong>

                        <button type="button" onClick={exploreSuggestion}>
                          Explore →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
