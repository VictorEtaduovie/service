"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../../components/Navbar"; // adjust if path differs
import { useRouter } from "next/navigation";
import SiteFooter from "../../components/SiteFooter"; // adjust if path differs

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

/* --------------------------
   Mock data
   Replace images with local /public paths for production
   -------------------------- */
const MOCK_SECTORS: Sector[] = [
  {
    id: "home-property",
    name: "Home & Property",
    description: "Repairs, maintenance and improvements",
    icon: "🏠",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=example",
    serviceCount: 1240,
    categories: [
      {
        id: "plumbing",
        name: "Plumbing",
        description: "Leaks, pipes, heaters",
        icon: "🚰",
        subcategories: [
          { id: "leak-repair", name: "Leak Repair" },
          { id: "drain-cleaning", name: "Drain Cleaning" },
          { id: "water-heater", name: "Water Heater Repair" },
        ],
      },
      { id: "electrical", name: "Electrical", description: "Wiring, sockets, panels", icon: "💡" },
      { id: "cleaning", name: "Cleaning", description: "House and deep cleaning", icon: "🧹" },
      { id: "carpentry", name: "Carpentry", description: "Woodwork & installations", icon: "🔨" },
    ],
  },
  { id: "health-wellness", name: "Health & Wellness", description: "Fitness, therapy and wellbeing", icon: "💚", serviceCount: 420 },
  { id: "beauty", name: "Beauty & Personal Care", description: "Salon and grooming services", icon: "💄", serviceCount: 890 },
  { id: "automotive", name: "Automotive", description: "Repair, maintenance and detailing", icon: "🚗", serviceCount: 530 },
  { id: "technology", name: "Technology & Repairs", description: "Device repair and IT support", icon: "🖥️" },
  { id: "business", name: "Business Services", description: "Accounting, consulting and admin", icon: "📈" },
  { id: "education", name: "Education & Tutoring", description: "Private tutors and classes", icon: "📚" },
  { id: "events", name: "Events & Creative", description: "Photography, design and entertainment", icon: "🎨" },
  { id: "logistics", name: "Logistics & Delivery", description: "Courier and moving services", icon: "📦" },
  { id: "legal-financial", name: "Legal & Financial", description: "Advisory and legal services", icon: "⚖️" },
];

const MOCK_POPULAR = [
  { id: "ac-repair", name: "AC Repair", icon: "❄️", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=example" },
  { id: "plumber", name: "Plumber", icon: "🔧", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=example" },
  { id: "electrician", name: "Electrician", icon: "💡", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=example" },
  { id: "cleaner", name: "Home Cleaning", icon: "🧼", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=example" },
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
   Header + Search
   -------------------------- */
function PageHeader() {
  return (
    <section className="text-center">
      <h1 className="fw-bold display-6">Browse All Services</h1>
      <p className="text-muted">Explore services by sector and category.</p>

      <div className="mt-4">
        <CentralizedSearch />
      </div>
    </section>
  );
}

function CentralizedSearch() {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const dataPool = useMemo(() => {
    const names: string[] = [];
    MOCK_SECTORS.forEach((s) => {
      names.push(s.name);
      s.categories?.forEach((c) => names.push(c.name));
    });
    names.push("John Doe - Electrician", "Jane Smith - Plumber");
    return names;
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = dataPool.filter((n) => n.toLowerCase().includes(q.toLowerCase())).slice(0, 6);
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [query, dataPool]);

  function onSelectSuggestion(value: string) {
    setQuery(value);
    setShowSuggestions(false);
    window.location.href = `/search?query=${encodeURIComponent(value)}`;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    window.location.href = `/search?query=${encodeURIComponent(q)}`;
  }

  return (
    <div className="mx-auto position-relative" style={{ maxWidth: 820 }} ref={containerRef}>
      <form onSubmit={onSubmit}>
        <div id="homepage-search" className="pt-2" style={{ top: "100px" }}>
          <div className="search-wrapper mx-auto" style={{ maxWidth: "800px" }}>
            <div className="search-input-group d-flex align-items-center shadow-lg border-0 p-2 bg-white" style={{ borderRadius: "20px" }}>
              <div className="d-flex align-items-center flex-grow-1 px-4">
                <span className="fs-4 me-2">🔍</span>
                <input
                  type="text"
                  className="form-control border-0 shadow-none fs-5 py-3"
                  placeholder="What service do you need? (e.g., Plumber, AC Repair)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(suggestions.length > 0)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  aria-label="Search services"
                  aria-autocomplete="list"
                  aria-expanded={showSuggestions}
                />
              </div>

              <button type="submit" className="btn-search px-5 py-3 fs-5 text-white border-0 shadow-sm" style={{ background: "var(--primary-gradient)", borderRadius: "14px" }}>
                Search
              </button>
            </div>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <ul
              className="list-group mt-2 shadow position-absolute"
              style={{
                zIndex: 2000,
                left: 0,
                right: 0,
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: 800,
              }}
              role="listbox"
            >
              {suggestions.map((s) => (
                <li key={s} className="list-group-item list-group-item-action" onMouseDown={() => onSelectSuggestion(s)} role="option" style={{ cursor: "pointer" }}>
                  🔎 {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
}

/* --------------------------
   Sectors grid with image cards (not clickable at card level)
   -------------------------- */
function SectorGrid({ sectors }: { sectors: Sector[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section>
      <h2 className="other_section_title mb-3">Sectors</h2>

      <div className="row g-3">
        {sectors.map((s) => (
          <div key={s.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <div className="card h-100 border-0 shadow-sm sector-card">
              <div className="position-relative sector-card__media overflow-hidden" style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                {s.image ? (
                  <img src={s.image} alt={s.name} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
                ) : (
                  <div className="bg-secondary" style={{ height: 200 }} />
                )}

                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3 sector-card__overlay">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex align-items-center gap-2">
                      <div className="sector-card__icon fs-3 bg-white rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm" style={{ width: 44, height: 44 }}>
                        {s.icon}
                      </div>
                      <div className="text-white">
                        <div className="h6 mb-0">{s.name}</div>
                        {s.serviceCount ? <small>{s.serviceCount} services</small> : null}
                      </div>
                    </div>
                    <button className="btn btn-sm btn-light text-primary" onClick={() => setExpanded((cur) => (cur === s.id ? null : s.id))} aria-expanded={expanded === s.id} aria-controls={`sector-${s.id}-content`}>
                      {expanded === s.id ? "Collapse" : "View"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <p className="text-muted small mb-2">{s.description}</p>

                {expanded === s.id && (
                  <div id={`sector-${s.id}-content`} className="mt-3 border-top pt-3">
                    {s.categories && s.categories.length > 0 ? (
                      <div className="row g-2">
                        {s.categories.map((c) => (
                          <div key={c.id} className="col-12 col-sm-6">
                            <CategoryCard category={c} />
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
        ))}
      </div>
    </section>
  );
}

/* --------------------------
   Category card
   -------------------------- */
function CategoryCard({ category }: { category: Category; sectorId?: string }) {
  const [openSubs, setOpenSubs] = useState<boolean>(false);

  function gotoSubSearch(sub: Subcategory) {
    window.location.href = `/search?service=${encodeURIComponent(sub.name)}`;
  }

  return (
    <div className="card border-0 bg-light p-2">
      <div className="d-flex align-items-start gap-2">
        <div className="fs-3">{category.icon ?? "🗂️"}</div>

        <div className="flex-grow-1">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="h6 mb-1">{category.name}</h4>

            {category.subcategories && category.subcategories.length > 0 && (
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setOpenSubs((s) => !s)} aria-expanded={openSubs}>
                {openSubs ? "Hide" : "View"}
              </button>
            )}
          </div>

          <p className="small text-muted mb-1">{category.description}</p>

          {openSubs && category.subcategories && (
            <ul className="list-unstyled mt-2 mb-0">
              {category.subcategories.map((sub) => (
                <li key={sub.id} className="d-flex align-items-center justify-content-between bg-white rounded p-2 mb-2 shadow-sm">
                  <span className="small">{sub.name}</span>
                  <button className="btn btn-sm btn-primary" onClick={() => gotoSubSearch(sub)}>
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
   Empty sector
   -------------------------- */
function EmptySector() {
  return (
    <div className="text-center py-4">
      <h5 className="mb-2">Services coming soon</h5>
      <p className="small text-muted">We are expanding this sector in your area.</p>
      <button className="btn btn-primary mt-2">Request a Service</button>
    </div>
  );
}

/* --------------------------
   Popular Services - alternating layout (image left/right)
   -------------------------- */
function QuickAccess({
  items,
}: {
  items: { id: string; name: string; icon?: string; image?: string }[];
}) {
  return (
    <section className="home_popular py-5">
      <h2 className="other_section_title mb-5 text-center">
        Popular Services Near You
      </h2>

      <div className="container-fluid px-0">
        {items.map((it, index) => {
          const reverse = index % 2 === 1;

          return (
            <div
              key={it.id}
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
                    {it.image ? (
                      <>
                        <img
                          src={it.image}
                          alt={it.name}
                          className="img-fluid w-100"
                          style={{
                            height: "420px",
                            objectFit: "cover",
                          }}
                        />
                        {/* Gradient Overlay */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.05))",
                          }}
                        />
                      </>
                    ) : (
                      <div
                        style={{
                          height: 420,
                          background: "#f5f7fa",
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
                    >
                      {it.icon}
                    </div>

                    <h3 className="fw-bold mb-3 display-6">
                      {it.name}
                    </h3>

                    <p className="text-muted mb-4 fs-5">
                      Trusted professionals delivering reliable{" "}
                      {it.name.toLowerCase()} services in your area.
                      Fast response, verified providers, and guaranteed quality.
                    </p>

                    <div className="d-flex flex-wrap gap-3">
                      <a
                        href={`/search?query=${encodeURIComponent(
                          it.name
                        )}`}
                        className="btn btn-primary px-4 py-2"
                        style={{
                          borderRadius: "12px",
                        }}
                      >
                        Explore Service
                      </a>

                      <a
                        href={`/search?query=${encodeURIComponent(
                          it.name
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
   AI Suggest Component
   -------------------------- */
function AIServiceSuggest() {
  const router = useRouter();
  const [aiOpen, setAiOpen] = useState<boolean>(false);
  const [aiInput, setAiInput] = useState<string>("");
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleAiSuggest() {
    const q = aiInput.trim();
    if (!q) {
      setAiSuggestion(null);
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 350));

    type Candidate = { name: string; text: string };
    const candidates: Candidate[] = [];

    MOCK_SECTORS.forEach((sec) => {
      candidates.push({ name: sec.name, text: (sec.name + " " + (sec.description ?? "")).toLowerCase() });
      sec.categories?.forEach((cat) => {
        candidates.push({ name: cat.name, text: (cat.name + " " + (cat.description ?? "")).toLowerCase() });
      });
    });

    const words = q.toLowerCase().split(/\W+/).filter(Boolean);
    const scores = candidates.map((c) => {
      let score = 0;
      for (const w of words) if (c.text.includes(w)) score += 1;
      return { c, score };
    });

    scores.sort((a, b) => b.score - a.score);
    const best = scores[0];
    let suggestion: string | null = null;
    if (best && best.score > 0) suggestion = best.c.name;
    else suggestion = q;

    setAiSuggestion(suggestion);
    setLoading(false);
  }

  return (
    <div className="card p-3 shadow-sm">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <strong>Can’t find what you need?</strong>
          <div className="text-muted">Describe your problem and we'll suggest the best service category.</div>
        </div>
        <div>
          <button
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
        <div className="browser_page__ai_modal" role="dialog" aria-modal="true" aria-label="AI service suggestion" style={{ marginTop: 16 }}>
          <div className="browser_page__ai_modal_inner p-3 bg-white rounded shadow">
            <h4>Describe your problem</h4>

            <textarea className="form-control mb-3" rows={4} value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="e.g., My kitchen sink is leaking and water is coming out from under the cabinet..." aria-label="Describe your problem" />

            <div className="d-flex gap-2 justify-content-end">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setAiOpen(false);
                  setAiInput("");
                  setAiSuggestion(null);
                }}
                type="button"
              >
                Close
              </button>

              <button className="btn btn-primary" onClick={async () => await handleAiSuggest()} disabled={loading || !aiInput.trim()} type="button">
                {loading ? "Suggesting…" : "Suggest"}
              </button>
            </div>

            {aiSuggestion && (
              <div className="browser_page__ai_result mt-3">
                <strong>Suggested category:</strong>
                <div className="mt-2">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      const param = aiSuggestion ? encodeURIComponent(aiSuggestion) : encodeURIComponent(aiInput.trim());
                      router.push(`/search?service=${param}`);
                    }}
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