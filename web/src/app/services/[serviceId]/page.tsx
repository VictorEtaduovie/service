"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import services from "@/data/services.json";

type SortOption =
  | "nearest"
  | "top-rated"
  | "online"
  | "certified"
  | "verified"
  | "price";

type ServiceRecord = {
  id: string | number;
  name: string;
  category: string;
  keywords: string[];
};

type Provider = {
  id: string;
  name: string;
  serviceIds: string[];
  title: string;
  specialty: string;
  rating: number;
  reviews: number;
  distanceKm: number;
  startingPrice: number;
  online: boolean;
  verified: boolean;
  certified: boolean;
  completedJobs: number;
  responseTime: string;
  location: string;
  image: string;
};

const dummyProviders: Provider[] = [
  {
    id: "provider-001",
    name: "Daniel Okoro",
    serviceIds: ["1", "plumbing", "plumber"],
    title: "Professional Plumber",
    specialty: "Residential plumbing & repairs",
    rating: 4.9,
    reviews: 126,
    distanceKm: 1.2,
    startingPrice: 15000,
    online: true,
    verified: true,
    certified: true,
    completedJobs: 184,
    responseTime: "5 min",
    location: "Ikeja, Lagos",
    image:
      "https://professions.ng/wp-content/uploads/2024/10/How-to-Build-a-Career-as-a-Professional-Plumber-in-Nigeria2.jpeg",
  },
  {
    id: "provider-002",
    name: "Michael Adeyemi",
    serviceIds: ["1", "plumbing", "plumber"],
    title: "Licensed Plumbing Specialist",
    specialty: "Pipes, leaks & water systems",
    rating: 4.8,
    reviews: 94,
    distanceKm: 2.4,
    startingPrice: 12000,
    online: false,
    verified: true,
    certified: true,
    completedJobs: 143,
    responseTime: "12 min",
    location: "Yaba, Lagos",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "provider-003",
    name: "Samuel Johnson",
    serviceIds: ["1", "plumbing", "plumber"],
    title: "Emergency Plumber",
    specialty: "Emergency plumbing & maintenance",
    rating: 4.7,
    reviews: 81,
    distanceKm: 3.1,
    startingPrice: 10000,
    online: true,
    verified: true,
    certified: false,
    completedJobs: 118,
    responseTime: "7 min",
    location: "Surulere, Lagos",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: "provider-004",
    name: "Victor Martins",
    serviceIds: ["1", "plumbing", "plumber"],
    title: "Plumbing & Maintenance Pro",
    specialty: "Home plumbing & maintenance",
    rating: 4.6,
    reviews: 67,
    distanceKm: 4.8,
    startingPrice: 9000,
    online: true,
    verified: false,
    certified: false,
    completedJobs: 96,
    responseTime: "9 min",
    location: "Maryland, Lagos",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    id: "provider-005",
    name: "Grace Williams",
    serviceIds: ["1", "plumbing", "plumber"],
    title: "Professional Plumber",
    specialty: "Bathroom fittings & installations",
    rating: 4.9,
    reviews: 151,
    distanceKm: 5.6,
    startingPrice: 14000,
    online: false,
    verified: true,
    certified: true,
    completedJobs: 211,
    responseTime: "10 min",
    location: "Lekki, Lagos",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const sortOptions: {
  id: SortOption;
  label: string;
  icon: string;
}[] = [
  { id: "nearest", label: "Nearest", icon: "⌖" },
  { id: "top-rated", label: "Top Rated", icon: "★" },
  { id: "online", label: "Online", icon: "●" },
  { id: "certified", label: "Certified", icon: "✓" },
  { id: "verified", label: "Verified", icon: "◉" },
  { id: "price", label: "Lowest Price", icon: "₦" },
];

const locationSuggestions = [
  "Ikeja, Lagos",
  "Lekki, Lagos",
  "Yaba, Lagos",
  "Surulere, Lagos",
  "Victoria Island, Lagos",
  "Maryland, Lagos",
  "Ajah, Lagos",
];

/* ===================================================== */
/* HELPERS */
/* ===================================================== */

const createSlug = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const normalizeValue = (value: string) => {
  return createSlug(value);
};

export default function ServiceProvidersPage() {
  const params = useParams();

  /*
   * This route parameter can now be:
   *
   * /services/1
   * /services/plumbing
   * /services/physiotherapy
   * /services/ac-repair
   * /services/electrical-services
   */
  const serviceParam = String(params.serviceId || "").trim();

  const [sort, setSort] = useState<SortOption>("nearest");
  const [location, setLocation] = useState("Lagos, Nigeria");
  const [locationQuery, setLocationQuery] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showCertifiedOnly, setShowCertifiedOnly] = useState(false);

  /* =================================================== */
  /* RESOLVE SERVICE FROM ID / NAME / SLUG */
  /* =================================================== */

  const service = useMemo<ServiceRecord | null>(() => {
    const records = services as ServiceRecord[];

    const normalizedParam = normalizeValue(serviceParam);

    return (
      records.find((item) => String(item.id) === serviceParam) ||
      records.find((item) => normalizeValue(item.name) === normalizedParam) ||
      records.find(
        (item) => normalizeValue(item.category) === normalizedParam,
      ) ||
      null
    );
  }, [serviceParam]);

  /*
   * Even if the service is not yet in services.json,
   * don't immediately break the page.
   *
   * This gives the UI a usable service name from the URL.
   */
  const resolvedServiceName = useMemo(() => {
    if (service) {
      return service.name;
    }

    if (!serviceParam) {
      return "Service";
    }

    return serviceParam
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }, [service, serviceParam]);

  /*
   * Canonical slug used to match providers.
   */
  const resolvedServiceSlug = createSlug(resolvedServiceName);

  /* =================================================== */
  /* PROVIDER FILTERING */
  /* =================================================== */

  const providerResults = useMemo(() => {
    let results = dummyProviders.filter((provider) => {
      return provider.serviceIds.some((serviceId) => {
        const normalizedProviderService = normalizeValue(serviceId);

        return (
          normalizedProviderService === serviceParam ||
          normalizedProviderService === resolvedServiceSlug ||
          normalizedProviderService === normalizeValue(resolvedServiceName)
        );
      });
    });

    /*
     * If the service isn't in the provider test data,
     * still allow the page to render without crashing.
     *
     * Later the backend/database will provide the real
     * matching providers.
     */
    if (showOnlineOnly) {
      results = results.filter((provider) => provider.online);
    }

    if (showVerifiedOnly) {
      results = results.filter((provider) => provider.verified);
    }

    if (showCertifiedOnly) {
      results = results.filter((provider) => provider.certified);
    }

    const sorted = [...results];

    switch (sort) {
      case "nearest":
        return sorted.sort((a, b) => a.distanceKm - b.distanceKm);

      case "top-rated":
        return sorted.sort((a, b) => {
          if (b.rating !== a.rating) {
            return b.rating - a.rating;
          }

          return b.reviews - a.reviews;
        });

      case "online":
        return sorted.sort((a, b) => {
          if (a.online !== b.online) {
            return a.online ? -1 : 1;
          }

          return a.distanceKm - b.distanceKm;
        });

      case "certified":
        return sorted.sort((a, b) => {
          if (a.certified !== b.certified) {
            return a.certified ? -1 : 1;
          }

          return b.rating - a.rating;
        });

      case "verified":
        return sorted.sort((a, b) => {
          if (a.verified !== b.verified) {
            return a.verified ? -1 : 1;
          }

          return b.rating - a.rating;
        });

      case "price":
        return sorted.sort((a, b) => a.startingPrice - b.startingPrice);

      default:
        return sorted;
    }
  }, [
    serviceParam,
    resolvedServiceName,
    resolvedServiceSlug,
    sort,
    showOnlineOnly,
    showVerifiedOnly,
    showCertifiedOnly,
  ]);

  const filteredLocationSuggestions = locationSuggestions.filter((item) =>
    item.toLowerCase().includes(locationQuery.toLowerCase()),
  );

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

  const activeSort = sortOptions.find((item) => item.id === sort);

  return (
    <div className="service-results">
      <Navbar />

      <main className="service-results__main">
        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="service-results__hero">
          <div className="service-results__container">
            <div className="service-results__breadcrumbs">
              <Link href="/">Home</Link>
              <span>›</span>

              <Link href="/categories">Services</Link>

              <span>›</span>

              <strong>{resolvedServiceName}</strong>
            </div>

            <div className="service-results__hero-content">
              <div className="service-results__hero-copy">
                <span className="service-results__eyebrow">
                  Local professionals
                </span>

                <h1 className="service-results__title">
                  {resolvedServiceName}
                  <span> professionals near you</span>
                </h1>

                <p className="service-results__description">
                  Compare trusted {resolvedServiceName.toLowerCase()}{" "}
                  professionals by distance, rating, availability and
                  verification.
                </p>
              </div>

              {/* ================================================= */}
              {/* LOCATION */}
              {/* ================================================= */}

              <div className="service-results__location-wrap">
                <button
                  type="button"
                  className="service-results__location"
                  onClick={() => setLocationOpen((current) => !current)}
                >
                  <span className="service-results__location-pin">⌖</span>

                  <span className="service-results__location-content">
                    <small>Searching near</small>

                    <strong>{location}</strong>
                  </span>

                  <span className="service-results__location-arrow">↓</span>
                </button>

                {locationOpen && (
                  <div className="service-results__location-popover">
                    <div className="service-results__location-search">
                      <span>⌕</span>

                      <input
                        autoFocus
                        type="text"
                        value={locationQuery}
                        onChange={(event) =>
                          setLocationQuery(event.target.value)
                        }
                        placeholder="Search a location"
                      />
                    </div>

                    <button
                      type="button"
                      className="service-results__current-location"
                      onClick={() => {
                        setLocation("Current location");

                        setLocationOpen(false);
                      }}
                    >
                      <span>◎</span>

                      <div>
                        <strong>Use my current location</strong>

                        <small>Use your device location</small>
                      </div>
                    </button>

                    <div className="service-results__location-suggestions">
                      {filteredLocationSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => {
                            setLocation(suggestion);

                            setLocationOpen(false);
                            setLocationQuery("");
                          }}
                        >
                          <span>⌖</span>
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* RESULTS */}
        {/* ================================================= */}

        <section className="service-results__content">
          <div className="service-results__container">
            <div className="service-results__toolbar">
              <div className="service-results__result-summary">
                <strong>
                  {providerResults.length} {resolvedServiceName.toLowerCase()}{" "}
                  {providerResults.length === 1
                    ? "professional"
                    : "professionals"}
                </strong>

                <span>
                  {activeSort?.label} near {location}
                </span>
              </div>

              <button
                type="button"
                className="service-results__mobile-filter-toggle"
                onClick={() =>
                  document
                    .getElementById("service-results-filters")
                    ?.classList.toggle("service-results__filters--mobile-open")
                }
              >
                Filters
              </button>
            </div>

            {/* ================================================= */}
            {/* SORT */}
            {/* ================================================= */}

            <div className="service-results__sort-bar">
              <div className="service-results__sort-heading">
                <strong>Browse by</strong>

                <span>Choose how you want to compare providers</span>
              </div>

              <div className="service-results__sort-options">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`service-results__sort-option ${
                      sort === option.id
                        ? "service-results__sort-option--active"
                        : ""
                    }`}
                    onClick={() => setSort(option.id)}
                  >
                    <span>{option.icon}</span>

                    <strong>{option.label}</strong>
                  </button>
                ))}
              </div>
            </div>

            {/* ================================================= */}
            {/* MAIN LAYOUT */}
            {/* ================================================= */}

            <div className="service-results__layout">
              {/* FILTERS */}

              <aside
                id="service-results-filters"
                className="service-results__filters"
              >
                <div className="service-results__filter-card">
                  <div className="service-results__filter-header">
                    <div>
                      <strong>Refine results</strong>

                      <span>More control over your search</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowOnlineOnly(false);
                        setShowVerifiedOnly(false);
                        setShowCertifiedOnly(false);
                      }}
                    >
                      Clear
                    </button>
                  </div>

                  <div className="service-results__filter-group">
                    <span className="service-results__filter-title">
                      Status
                    </span>

                    <label className="service-results__check">
                      <input
                        type="checkbox"
                        checked={showOnlineOnly}
                        onChange={(event) =>
                          setShowOnlineOnly(event.target.checked)
                        }
                      />

                      <span className="service-results__check-box" />

                      <span>Online now</span>
                    </label>
                  </div>

                  <div className="service-results__filter-group">
                    <span className="service-results__filter-title">
                      Trust & credentials
                    </span>

                    <label className="service-results__check">
                      <input
                        type="checkbox"
                        checked={showVerifiedOnly}
                        onChange={(event) =>
                          setShowVerifiedOnly(event.target.checked)
                        }
                      />

                      <span className="service-results__check-box" />

                      <span>Identity verified</span>
                    </label>

                    <label className="service-results__check">
                      <input
                        type="checkbox"
                        checked={showCertifiedOnly}
                        onChange={(event) =>
                          setShowCertifiedOnly(event.target.checked)
                        }
                      />

                      <span className="service-results__check-box" />

                      <span>Certified professional</span>
                    </label>
                  </div>

                  <div className="service-results__filter-group">
                    <span className="service-results__filter-title">
                      Distance
                    </span>

                    <select defaultValue="25">
                      <option value="5">Within 5 km</option>

                      <option value="10">Within 10 km</option>

                      <option value="25">Within 25 km</option>

                      <option value="50">Within 50 km</option>
                    </select>
                  </div>
                </div>
              </aside>

              {/* ================================================= */}
              {/* PROVIDERS */}
              {/* ================================================= */}

              <div className="service-results__providers">
                {providerResults.length === 0 ? (
                  <div className="service-results__no-results">
                    <div className="service-results__no-results-icon">⌖</div>

                    <h2>No matching professionals</h2>

                    <p>
                      We don't have dummy providers registered for{" "}
                      <strong>{resolvedServiceName}</strong> yet.
                      <br />
                      The page is ready for the real provider data from your
                      backend.
                    </p>
                  </div>
                ) : (
                  providerResults.map((provider) => (
                    <article
                      key={provider.id}
                      className="service-results__provider-card"
                    >
                      {/* IMAGE */}

                      <div className="service-results__provider-photo-wrap">
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="service-results__provider-photo"
                        />

                        {provider.online && (
                          <span className="service-results__provider-online">
                            Online
                          </span>
                        )}
                      </div>

                      {/* INFO */}

                      <div className="service-results__provider-info">
                        <div className="service-results__provider-name-row">
                          <h2>{provider.name}</h2>

                          {provider.verified && (
                            <span className="service-results__verified">
                              ✓ Verified
                            </span>
                          )}
                        </div>

                        <p className="service-results__provider-title">
                          {provider.title}
                        </p>

                        <p className="service-results__provider-specialty">
                          {provider.specialty}
                        </p>

                        <div className="service-results__provider-meta">
                          <span>
                            <b>★</b> {provider.rating}
                          </span>

                          <span>{provider.reviews} reviews</span>

                          <span>{provider.distanceKm} km away</span>
                        </div>

                        <div className="service-results__provider-badges">
                          {provider.certified && <span>Certified</span>}

                          {provider.verified && <span>Identity Verified</span>}

                          <span>{provider.completedJobs}+ jobs</span>
                        </div>

                        <div className="service-results__provider-location">
                          <span>⌖</span>

                          {provider.location}
                        </div>
                      </div>

                      {/* ACTIONS */}

                      <div className="service-results__provider-action">
                        <div className="service-results__provider-price">
                          <small>Starting from</small>

                          <strong>{formatPrice(provider.startingPrice)}</strong>

                          <span>Responds in {provider.responseTime}</span>
                        </div>

                        <div className="service-results__provider-buttons">
                          <Link
                            href={`/provider/${provider.id}`}
                            className="service-results__view-button"
                          >
                            View Profile
                          </Link>

                          <Link
                            href={`/client/auth/email?providerId=${provider.id}`}
                            className="service-results__book-button"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
