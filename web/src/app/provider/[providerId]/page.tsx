"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

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
  services: string[];
  specialties: string[];
};

const providers: ProviderProfile[] = [
  {
    id: "provider-001",
    name: "Daniel Okoro",
    title: "Professional Plumber",
    image:
      "https://professions.ng/wp-content/uploads/2024/10/How-to-Build-a-Career-as-a-Professional-Plumber-in-Nigeria2.jpeg",
    coverImage:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1600&q=80",
    online: true,
    verified: true,
    certified: true,
    rating: 4.9,
    reviews: 126,
    completedJobs: 184,
    responseTime: "Usually within 5 minutes",
    experience: "8+ years experience",
    location: "Ikeja, Lagos",
    distanceKm: 1.2,
    about:
      "Professional plumber specializing in residential plumbing, repairs, installations and water-system maintenance. I focus on reliable workmanship, clear communication and getting the job done properly the first time.",
    startingPrice: 15000,
    services: [
      "Pipe Repairs",
      "Leak Detection",
      "Bathroom Plumbing",
      "Water System Installation",
      "Emergency Plumbing",
    ],
    specialties: [
      "Residential Plumbing",
      "Emergency Repairs",
      "Water Systems",
      "Bathroom Installation",
    ],
  },
  {
    id: "provider-002",
    name: "Michael Adeyemi",
    title: "Licensed Plumbing Specialist",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
    online: false,
    verified: true,
    certified: true,
    rating: 4.8,
    reviews: 94,
    completedJobs: 143,
    responseTime: "Usually within 12 minutes",
    experience: "7+ years experience",
    location: "Yaba, Lagos",
    distanceKm: 2.4,
    about:
      "Licensed plumbing specialist providing pipework, water systems, leak repairs and home plumbing maintenance.",
    startingPrice: 12000,
    services: [
      "Pipe Repairs",
      "Water Systems",
      "Leak Repairs",
      "Home Plumbing",
    ],
    specialties: ["Pipe & Water Systems", "Residential Plumbing"],
  },
];

const reviewData = [
  {
    name: "Chinedu A.",
    rating: 5,
    date: "2 weeks ago",
    text: "Daniel arrived quickly, identified the problem and fixed it without wasting time. Very professional.",
  },
  {
    name: "Sarah O.",
    rating: 5,
    date: "1 month ago",
    text: "Excellent service. Communication was clear and the work was completed exactly as discussed.",
  },
  {
    name: "Emeka K.",
    rating: 4,
    date: "2 months ago",
    text: "Very good experience. He was punctual and explained what needed to be repaired.",
  },
];

export default function ProviderProfilePage() {
  const params = useParams();
  const providerId = String(params.providerId);

  const provider =
    providers.find((item) => item.id === providerId) ?? providers[0];

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="provider-profile">
      <main className="provider-profile__main">
        {/* BACK / BREADCRUMB */}
        <div className="provider-profile__topbar">
          <div className="provider-profile__container">
            <Link href="/services/1" className="provider-profile__back">
              ← Back to results
            </Link>

            <span className="provider-profile__breadcrumb">
              Home / Services / Provider Profile
            </span>
          </div>
        </div>

        {/* HERO / PROFILE HEADER */}
        <section className="provider-profile__hero">
          <div className="provider-profile__container">
            <div
              className="provider-profile__cover"
              style={{
                backgroundImage: `url("${provider.coverImage}")`,
              }}
            >
              <div className="provider-profile__cover-overlay" />
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
                    aria-label="Online"
                  />
                )}
              </div>

              <div className="provider-profile__identity-main">
                <div className="provider-profile__name-row">
                  <h1>{provider.name}</h1>

                  {provider.verified && (
                    <span className="provider-profile__verified">
                      ✓ Verified
                    </span>
                  )}
                </div>

                <p className="provider-profile__title">{provider.title}</p>

                <div className="provider-profile__meta">
                  <span>
                    <b>★</b> {provider.rating}
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
                    {provider.online ? "Online now" : "Offline"}
                  </span>

                  {provider.certified && (
                    <span className="provider-profile__certified">
                      Certified professional
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="provider-profile__content">
          <div className="provider-profile__container">
            <div className="provider-profile__layout">
              {/* MAIN COLUMN */}
              <div className="provider-profile__main-column">
                {/* ABOUT */}
                <section className="provider-profile__section">
                  <div className="provider-profile__section-heading">
                    <span>About</span>
                    <h2>About this professional</h2>
                  </div>

                  <p className="provider-profile__about">{provider.about}</p>
                </section>

                {/* SERVICES */}
                <section className="provider-profile__section">
                  <div className="provider-profile__section-heading">
                    <span>Services</span>
                    <h2>What I offer</h2>
                  </div>

                  <div className="provider-profile__service-grid">
                    {provider.services.map((service) => (
                      <div key={service} className="provider-profile__service">
                        <span>✓</span>
                        <strong>{service}</strong>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SPECIALTIES */}
                <section className="provider-profile__section">
                  <div className="provider-profile__section-heading">
                    <span>Expertise</span>
                    <h2>Areas of specialization</h2>
                  </div>

                  <div className="provider-profile__specialties">
                    {provider.specialties.map((specialty) => (
                      <span key={specialty}>{specialty}</span>
                    ))}
                  </div>
                </section>

                {/* TRUST */}
                <section className="provider-profile__section">
                  <div className="provider-profile__section-heading">
                    <span>Professional history</span>
                    <h2>Why clients choose me</h2>
                  </div>

                  <div className="provider-profile__stats">
                    <div>
                      <strong>{provider.completedJobs}+</strong>
                      <span>Completed jobs</span>
                    </div>

                    <div>
                      <strong>{provider.experience}</strong>
                      <span>Professional experience</span>
                    </div>

                    <div>
                      <strong>{provider.responseTime}</strong>
                      <span>Response time</span>
                    </div>
                  </div>
                </section>

                {/* REVIEWS */}
                <section className="provider-profile__section">
                  <div className="provider-profile__section-heading">
                    <span>Reviews</span>

                    <div className="provider-profile__review-heading">
                      <h2>Client experiences</h2>

                      <span>
                        ★ {provider.rating} · {provider.reviews} reviews
                      </span>
                    </div>
                  </div>

                  <div className="provider-profile__reviews">
                    {reviewData.map((review) => (
                      <article
                        key={`${review.name}-${review.date}`}
                        className="provider-profile__review"
                      >
                        <div className="provider-profile__review-top">
                          <div>
                            <strong>{review.name}</strong>
                            <span>{review.date}</span>
                          </div>

                          <span className="provider-profile__review-stars">
                            {"★".repeat(review.rating)}
                          </span>
                        </div>

                        <p>{review.text}</p>
                      </article>
                    ))}
                  </div>
                </section>
              </div>

              {/* SIDEBAR */}
              <aside className="provider-profile__sidebar">
                <div className="provider-profile__booking-card">
                  <div className="provider-profile__booking-price">
                    <small>Services starting from</small>
                    <strong>{formatPrice(provider.startingPrice)}</strong>
                  </div>

                  <div className="provider-profile__booking-status">
                    <span>● {provider.online ? "Online now" : "Offline"}</span>

                    <small>
                      Responds {provider.responseTime.toLowerCase()}
                    </small>
                  </div>

                  <button
                    type="button"
                    className="provider-profile__book-button"
                    onClick={() => {
                      const clientLoggedIn =
                        localStorage.getItem("client_logged_in") === "true";

                      if (clientLoggedIn) {
                        window.location.href = `/book/${provider.id}`;
                      } else {
                        window.location.href = `/client/auth/email?providerId=${provider.id}`;
                      }
                    }}
                  >
                    Book Now
                  </button>

                  <button
                    type="button"
                    className="provider-profile__message-button"
                  >
                    Message Provider
                  </button>

                  <p className="provider-profile__secure-note">
                    Secure booking · No payment until checkout
                  </p>
                </div>

                <div className="provider-profile__trust-card">
                  <div>
                    <span>✓</span>
                    <div>
                      <strong>Identity verified</strong>
                      <small>Identity documents reviewed</small>
                    </div>
                  </div>

                  {provider.certified && (
                    <div>
                      <span>◆</span>
                      <div>
                        <strong>Certified</strong>
                        <small>Professional credentials verified</small>
                      </div>
                    </div>
                  )}

                  <div>
                    <span>★</span>
                    <div>
                      <strong>Trusted rating</strong>
                      <small>Based on completed client reviews</small>
                    </div>
                  </div>
                </div>

                <div className="provider-profile__location-card">
                  <span className="provider-profile__location-icon">⌖</span>

                  <div>
                    <small>Based in</small>
                    <strong>{provider.location}</strong>
                    <span>
                      {provider.distanceKm} km from your selected location
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
