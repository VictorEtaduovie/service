"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import SearchBar from "@/components/SearchBar";

/* --------------------------
   Types
   -------------------------- */

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

/* --------------------------
   Mock Data
   Replace images with local
   /public paths for production
   -------------------------- */

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

/* --------------------------
   Page
   -------------------------- */

export default function SearchPage() {
  return (
    <div className="bg-light min-vh-100 text-dark search-page">
      <Navbar />

      <main className="container py-5">
        <PageHeader />

        <section className="mt-5">
          <SectorGrid sectors={MOCK_SECTORS} />
        </section>

        <section className="mt-5">
          <QuickAccess items={MOCK_POPULAR} />
        </section>

        <section className="mt-5">
          <AIServiceSuggest />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* --------------------------
   Header
   -------------------------- */

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

/* --------------------------
   Sector Grid
   -------------------------- */

function SectorGrid({ sectors }: { sectors: Sector[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggleSector(id: string) {
    setExpanded((current) => (current === id ? null : id));
  }

  return (
    <section>
      <h2 className="other_section_title mb-3">Sectors</h2>

      <div className="row g-3">
        {sectors.map((sector) => {
          const isExpanded = expanded === sector.id;

          return (
            <div key={sector.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div className="card h-100 border-0 shadow-sm sector-card">
                {/* IMAGE */}
                <div
                  className="position-relative sector-card__media overflow-hidden"
                  style={{
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                >
                  {sector.image ? (
                    <img
                      src={sector.image}
                      alt={sector.name}
                      style={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div
                      className="bg-secondary"
                      style={{
                        height: 200,
                      }}
                    />
                  )}

                  {/* OVERLAY */}
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3 sector-card__overlay">
                    <div className="d-flex align-items-center justify-content-between w-100 gap-2">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="sector-card__icon fs-3 bg-white rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm flex-shrink-0"
                          style={{
                            width: 44,
                            height: 44,
                          }}
                        >
                          {sector.icon}
                        </div>

                        <div className="text-white">
                          <div className="h6 mb-0">{sector.name}</div>

                          {sector.serviceCount ? (
                            <small>{sector.serviceCount} services</small>
                          ) : null}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-sm btn-light text-primary"
                        onClick={() => toggleSector(sector.id)}
                        aria-expanded={isExpanded}
                        aria-controls={`sector-${sector.id}-content`}
                      >
                        {isExpanded ? "Collapse" : "View"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* CARD BODY */}
                <div className="card-body">
                  {sector.description && (
                    <p className="text-muted small mb-2">
                      {sector.description}
                    </p>
                  )}

                  {isExpanded && (
                    <div
                      id={`sector-${sector.id}-content`}
                      className="mt-3 border-top pt-3"
                    >
                      {sector.categories && sector.categories.length > 0 ? (
                        <div className="row g-2">
                          {sector.categories.map((category) => (
                            <div key={category.id} className="col-12 col-sm-6">
                              <CategoryCard category={category} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <EmptySector />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* --------------------------
   Category Card
   -------------------------- */

function CategoryCard({ category }: { category: Category }) {
  const [openSubs, setOpenSubs] = useState<boolean>(false);

  const router = useRouter();

  function gotoSubSearch(sub: Subcategory) {
    router.push(`/search?service=${encodeURIComponent(sub.name)}`);
  }

  return (
    <div className="card border-0 bg-light p-2">
      <div className="d-flex align-items-start gap-2">
        <div className="fs-3">{category.icon ?? "🗂️"}</div>

        <div className="flex-grow-1">
          <div className="d-flex align-items-center justify-content-between gap-2">
            <h4 className="h6 mb-1">{category.name}</h4>

            {category.subcategories && category.subcategories.length > 0 && (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setOpenSubs((current) => !current)}
                aria-expanded={openSubs}
              >
                {openSubs ? "Hide" : "View"}
              </button>
            )}
          </div>

          {category.description && (
            <p className="small text-muted mb-1">{category.description}</p>
          )}

          {openSubs &&
            category.subcategories &&
            category.subcategories.length > 0 && (
              <ul className="list-unstyled mt-2 mb-0">
                {category.subcategories.map((sub) => (
                  <li
                    key={sub.id}
                    className="d-flex align-items-center justify-content-between bg-white rounded p-2 mb-2 shadow-sm gap-2"
                  >
                    <span className="small">{sub.name}</span>

                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => gotoSubSearch(sub)}
                    >
                      Explore
                    </button>
                  </li>
                ))}
              </ul>
            )}
        </div>
      </div>
    </div>
  );
}

/* --------------------------
   Empty Sector
   -------------------------- */

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

/* --------------------------
   Popular Services
   -------------------------- */

function QuickAccess({ items }: { items: PopularService[] }) {
  return (
    <section className="home_popular py-5">
      <h2 className="other_section_title mb-5 text-center">
        Popular Services Near You
      </h2>

      <div className="container-fluid px-0">
        {items.map((item, index) => {
          const reverse = index % 2 === 1;

          return (
            <div
              key={item.id}
              className={`py-5 ${reverse ? "bg-light" : "bg-white"}`}
            >
              <div
                className={`container row align-items-center mx-auto ${
                  reverse ? "flex-md-row-reverse" : ""
                }`}
              >
                {/* IMAGE SIDE */}

                <div className="col-12 col-md-6 mb-4 mb-md-0">
                  <div
                    className="position-relative overflow-hidden shadow"
                    style={{
                      borderRadius: "20px",
                    }}
                  >
                    {item.image ? (
                      <>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid w-100 quick-access-image"
                          style={{
                            objectFit: "cover",
                            minHeight: "350px",
                            display: "block",
                          }}
                        />

                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.05))",
                          }}
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      <div
                        className="quick-access-placeholder"
                        style={{
                          minHeight: "350px",
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* CONTENT SIDE */}

                <div className="col-12 col-md-6">
                  <div className="px-md-5">
                    <div
                      className="mb-3"
                      style={{
                        fontSize: "2.5rem",
                      }}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </div>

                    <h3 className="fw-bold mb-3 display-6">{item.name}</h3>

                    <p className="text-muted mb-4 fs-5">
                      Trusted professionals delivering reliable{" "}
                      {item.name.toLowerCase()} services in your area. Fast
                      response, verified providers, and guaranteed quality.
                    </p>

                    <div className="d-flex flex-wrap gap-3">
                      <a
                        href={`/search?query=${encodeURIComponent(item.name)}`}
                        className="btn btn-primary px-4 py-2"
                        style={{
                          borderRadius: "12px",
                        }}
                      >
                        Explore Service
                      </a>

                      <a
                        href={`/search?query=${encodeURIComponent(
                          item.name,
                        )}&filter=top`}
                        className="btn btn-outline-secondary px-4 py-2"
                        style={{
                          borderRadius: "12px",
                        }}
                      >
                        Top Providers
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* --------------------------
   AI Service Suggest
   -------------------------- */

function AIServiceSuggest() {
  const router = useRouter();

  const [aiOpen, setAiOpen] = useState<boolean>(false);

  const [aiInput, setAiInput] = useState<string>("");

  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  async function handleAiSuggest() {
    const query = aiInput.trim();

    if (!query) {
      setAiSuggestion(null);
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 350));

    type Candidate = {
      name: string;
      text: string;
    };

    const candidates: Candidate[] = [];

    MOCK_SECTORS.forEach((sector) => {
      candidates.push({
        name: sector.name,
        text: (sector.name + " " + (sector.description ?? "")).toLowerCase(),
      });

      sector.categories?.forEach((category) => {
        candidates.push({
          name: category.name,
          text: (
            category.name +
            " " +
            (category.description ?? "")
          ).toLowerCase(),
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

    const scores = candidates.map((candidate) => {
      let score = 0;

      for (const word of words) {
        if (candidate.text.includes(word)) {
          score += 1;
        }
      }

      return {
        candidate,
        score,
      };
    });

    scores.sort((a, b) => b.score - a.score);

    const best = scores[0];

    const suggestion = best && best.score > 0 ? best.candidate.name : query;

    setAiSuggestion(suggestion);
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

    if (!value) {
      return;
    }

    router.push(`/search?service=${encodeURIComponent(value)}`);
  }

  return (
    <div className="card p-3 shadow-sm">
      <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
        <div>
          <strong>Can’t find what you need?</strong>

          <div className="text-muted">
            Describe your problem and we'll suggest the best service category.
          </div>
        </div>

        <div>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              setAiOpen(true);
              setAiInput("");
              setAiSuggestion(null);
            }}
          >
            Describe your problem
          </button>
        </div>
      </div>

      {aiOpen && (
        <div
          className="browser_page__ai_modal"
          role="dialog"
          aria-modal="true"
          aria-label="AI service suggestion"
          style={{
            marginTop: 16,
          }}
        >
          <div className="browser_page__ai_modal_inner p-3 bg-white rounded shadow">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h4 className="mb-0">Describe your problem</h4>

              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>

            <textarea
              className="form-control mb-3"
              rows={4}
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="e.g., My kitchen sink is leaking and water is coming out from under the cabinet..."
              aria-label="Describe your problem"
            />

            <div className="d-flex gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAiSuggest}
                disabled={loading || !aiInput.trim()}
              >
                {loading ? "Suggesting…" : "Suggest"}
              </button>
            </div>

            {aiSuggestion && (
              <div className="browser_page__ai_result mt-3">
                <strong>Suggested category:</strong>

                <div className="mt-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={exploreSuggestion}
                  >
                    {aiSuggestion} — Explore
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
