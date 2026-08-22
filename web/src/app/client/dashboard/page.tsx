"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

/* =========================================================
   TYPES
========================================================= */

type BookingStatus =
  | "requested"
  | "accepted"
  | "confirmed"
  | "on-the-way"
  | "in-progress"
  | "completed";

type Booking = {
  id: string;
  service: string;
  provider: string;
  providerImage: string;
  providerTitle: string;
  date: string;
  time: string;
  location: string;
  amount: number;
  status: BookingStatus;
  progress: number;
  rating?: number;
};

type Provider = {
  id: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  distance: string;
  price: number;
  online: boolean;
  verified: boolean;
  specialty: string;
};

type MessagePreview = {
  id: string;
  name: string;
  image: string;
  message: string;
  time: string;
  unread: number;
  online: boolean;
};

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "booking" | "payment" | "message" | "system";
  unread: boolean;
};

/* =========================================================
   MOCK DATA
   Replace with API data later.
========================================================= */

const activeBooking: Booking = {
  id: "APPT-002",
  service: "Emergency Plumbing",
  provider: "Daniel Okoro",
  providerImage:
    "https://professions.ng/wp-content/uploads/2024/10/How-to-Build-a-Career-as-a-Professional-Plumber-in-Nigeria2.jpeg",
  providerTitle: "Professional Plumber",
  date: "Today",
  time: "10:30 AM",
  location: "Ikeja, Lagos",
  amount: 15000,
  status: "on-the-way",
  progress: 72,
};

const upcomingBookings: Booking[] = [
  {
    id: "APPT-008",
    service: "Deep Home Cleaning",
    provider: "Grace Williams",
    providerImage: "https://randomuser.me/api/portraits/women/44.jpg",
    providerTitle: "Professional Cleaner",
    date: "Tomorrow",
    time: "2:00 PM",
    location: "Lekki, Lagos",
    amount: 22000,
    status: "confirmed",
    progress: 45,
  },
  {
    id: "APPT-011",
    service: "Laptop Repair",
    provider: "Michael Adeyemi",
    providerImage: "https://randomuser.me/api/portraits/men/32.jpg",
    providerTitle: "IT & Hardware Specialist",
    date: "Aug 25",
    time: "11:00 AM",
    location: "Yaba, Lagos",
    amount: 18000,
    status: "accepted",
    progress: 30,
  },
];

const recentBookings: Booking[] = [
  {
    id: "APPT-001",
    service: "AC Servicing",
    provider: "Samuel Johnson",
    providerImage: "https://randomuser.me/api/portraits/men/45.jpg",
    providerTitle: "HVAC Specialist",
    date: "Aug 15",
    time: "3:00 PM",
    location: "Surulere, Lagos",
    amount: 18000,
    status: "completed",
    progress: 100,
    rating: 5,
  },
  {
    id: "APPT-003",
    service: "Electrical Installation",
    provider: "Victor Martins",
    providerImage: "https://randomuser.me/api/portraits/men/52.jpg",
    providerTitle: "Licensed Electrician",
    date: "Aug 11",
    time: "12:30 PM",
    location: "Maryland, Lagos",
    amount: 25000,
    status: "completed",
    progress: 100,
    rating: 4,
  },
  {
    id: "APPT-004",
    service: "Barbering",
    provider: "James Bello",
    providerImage: "https://randomuser.me/api/portraits/men/11.jpg",
    providerTitle: "Master Barber",
    date: "Aug 06",
    time: "5:00 PM",
    location: "Ikeja, Lagos",
    amount: 5000,
    status: "completed",
    progress: 100,
    rating: 5,
  },
];

const recommendedProviders: Provider[] = [
  {
    id: "provider-001",
    name: "Daniel Okoro",
    title: "Professional Plumber",
    image:
      "https://professions.ng/wp-content/uploads/2024/10/How-to-Build-a-Career-as-a-Professional-Plumber-in-Nigeria2.jpeg",
    rating: 4.9,
    reviews: 126,
    distance: "1.2 km",
    price: 15000,
    online: true,
    verified: true,
    specialty: "Residential plumbing",
  },
  {
    id: "provider-002",
    name: "Grace Williams",
    title: "Professional Cleaner",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    reviews: 151,
    distance: "2.1 km",
    price: 12000,
    online: true,
    verified: true,
    specialty: "Deep cleaning",
  },
  {
    id: "provider-003",
    name: "Michael Adeyemi",
    title: "IT Specialist",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviews: 94,
    distance: "2.8 km",
    price: 10000,
    online: false,
    verified: true,
    specialty: "Computer repairs",
  },
];

const messages: MessagePreview[] = [
  {
    id: "m1",
    name: "Daniel Okoro",
    image:
      "https://professions.ng/wp-content/uploads/2024/10/How-to-Build-a-Career-as-a-Professional-Plumber-in-Nigeria2.jpeg",
    message: "I'm about 8 minutes away.",
    time: "2m",
    unread: 2,
    online: true,
  },
  {
    id: "m2",
    name: "Grace Williams",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    message: "Your cleaning appointment is confirmed.",
    time: "1h",
    unread: 1,
    online: true,
  },
  {
    id: "m3",
    name: "Michael Adeyemi",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    message: "I'll bring the replacement SSD.",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
];

const notifications: Notification[] = [
  {
    id: "n1",
    title: "Provider is on the way",
    message: "Daniel Okoro is heading to your location.",
    time: "2 minutes ago",
    type: "booking",
    unread: true,
  },
  {
    id: "n2",
    title: "Booking confirmed",
    message: "Your cleaning appointment has been confirmed.",
    time: "1 hour ago",
    type: "booking",
    unread: true,
  },
  {
    id: "n3",
    title: "Payment received",
    message: "Your payment for AC servicing was processed.",
    time: "Yesterday",
    type: "payment",
    unread: false,
  },
  {
    id: "n4",
    title: "New message",
    message: "Michael sent you a message.",
    time: "Yesterday",
    type: "message",
    unread: false,
  },
];

/* =========================================================
   HELPERS
========================================================= */

const statusLabel: Record<BookingStatus, string> = {
  requested: "Requested",
  accepted: "Accepted",
  confirmed: "Confirmed",
  "on-the-way": "On the way",
  "in-progress": "In progress",
  completed: "Completed",
};

const statusDescription: Record<BookingStatus, string> = {
  requested: "Waiting for the provider to respond.",
  accepted: "The provider accepted your request.",
  confirmed: "Your booking has been confirmed.",
  "on-the-way": "Your provider is heading to you.",
  "in-progress": "Your service is currently in progress.",
  completed: "This service has been completed.",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

/* =========================================================
   ICON
========================================================= */

function Icon({
  name,
  size = 20,
}: {
  name:
    | "grid"
    | "calendar"
    | "message"
    | "bell"
    | "heart"
    | "wallet"
    | "user"
    | "settings"
    | "help"
    | "logout"
    | "search"
    | "location"
    | "arrow"
    | "chevron"
    | "plus"
    | "star"
    | "check"
    | "clock"
    | "shield"
    | "menu"
    | "close"
    | "more";
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "grid":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );

    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M7 3v4M17 3v4M3 10h18" />
        </svg>
      );

    case "message":
      return (
        <svg {...common}>
          <path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-3a3 3 0 0 1-1-3V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3z" />
        </svg>
      );

    case "bell":
      return (
        <svg {...common}>
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      );

    case "heart":
      return (
        <svg {...common}>
          <path d="M20.8 8.6c0 5.5-8.8 10.2-8.8 10.2S3.2 14.1 3.2 8.6A4.6 4.6 0 0 1 12 5.8a4.6 4.6 0 0 1 8.8 2.8z" />
        </svg>
      );

    case "wallet":
      return (
        <svg {...common}>
          <path d="M4 6h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          <path d="M2 6V5a2 2 0 0 1 2-2h13" />
          <path d="M16 13h5" />
        </svg>
      );

    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );

    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2.4v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1A1.7 1.7 0 0 0 8.4 15a1.7 1.7 0 0 0-1.6-1H6v-2h.8a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L8 9l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h2.4v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L20 8l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v2h-.2a1.7 1.7 0 0 0-1.8 2z" />
        </svg>
      );

    case "help":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.6 9a2.5 2.5 0 0 1 4.8 1c0 1.8-2.4 2-2.4 4" />
          <path d="M12 17.5h.01" />
        </svg>
      );

    case "logout":
      return (
        <svg {...common}>
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
          <path d="M20 4h1v16h-1" />
        </svg>
      );

    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l4.5 4.5" />
        </svg>
      );

    case "location":
      return (
        <svg {...common}>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h13" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      );

    case "chevron":
      return (
        <svg {...common}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );

    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );

    case "star":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3z" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 4.5 6.3v5.1c0 4.5 3.2 8.6 7.5 9.6 4.3-1 7.5-5.1 7.5-9.6V6.3L12 3z" />
          <path d="m8.7 12 2.1 2.1 4.5-4.5" />
        </svg>
      );

    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );

    case "close":
      return (
        <svg {...common}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );

    case "more":
      return (
        <svg {...common}>
          <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

/* =========================================================
   PAGE
========================================================= */

export default function ClientDashboardPage() {
  const revealRef = useRef<HTMLDivElement | null>(null);

  const [activeSection, setActiveSection] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [bookingTab, setBookingTab] = useState<"upcoming" | "recent">(
    "upcoming",
  );
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const root = revealRef.current;
    if (!root) return;

    const elements = root.querySelectorAll("[data-client-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("client-dashboard__reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -45px 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const unreadNotifications = notifications.filter(
    (item) => item.unread,
  ).length;
  const unreadMessages = messages.reduce((sum, item) => sum + item.unread, 0);

  const bookingData =
    bookingTab === "upcoming" ? upcomingBookings : recentBookings;

  const filteredProviders = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return recommendedProviders;

    return recommendedProviders.filter((provider) =>
      `${provider.name} ${provider.title} ${provider.specialty}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  const navigate = (section: string) => {
    setActiveSection(section);
    setMobileNavOpen(false);

    const element = document.getElementById(`client-${section}`);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      ref={revealRef}
      className={`client-dashboard ${
        mobileNavOpen ? "client-dashboard--menu-open" : ""
      }`}
    >
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}

      <aside className="client-dashboard__sidebar">
        <Link href="/" className="client-dashboard__brand">
          <span className="client-dashboard__brand-mark">S</span>

          <span>
            <strong>ServiceHub</strong>
            <small>Client</small>
          </span>
        </Link>

        <div className="client-dashboard__sidebar-profile">
          <div className="client-dashboard__avatar client-dashboard__avatar--large">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Victor Client"
            />
          </div>

          <div>
            <strong>Victor Etaduovie</strong>
            <span>Client account</span>
          </div>
        </div>

        <nav className="client-dashboard__nav">
          <span className="client-dashboard__nav-label">Workspace</span>

          <button
            type="button"
            className={
              activeSection === "overview"
                ? "client-dashboard__nav-item client-dashboard__nav-item--active"
                : "client-dashboard__nav-item"
            }
            onClick={() => navigate("overview")}
          >
            <Icon name="grid" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            className={
              activeSection === "bookings"
                ? "client-dashboard__nav-item client-dashboard__nav-item--active"
                : "client-dashboard__nav-item"
            }
            onClick={() => navigate("bookings")}
          >
            <Icon name="calendar" />
            <span>My Bookings</span>
            <em>{upcomingBookings.length}</em>
          </button>

          <button
            type="button"
            className="client-dashboard__nav-item"
            onClick={() => navigate("messages")}
          >
            <Icon name="message" />
            <span>Messages</span>
            {unreadMessages > 0 && <em>{unreadMessages}</em>}
          </button>

          <button
            type="button"
            className="client-dashboard__nav-item"
            onClick={() => navigate("saved")}
          >
            <Icon name="heart" />
            <span>Saved Providers</span>
          </button>

          <span className="client-dashboard__nav-label">Account</span>

          <button
            type="button"
            className="client-dashboard__nav-item"
            onClick={() => navigate("payments")}
          >
            <Icon name="wallet" />
            <span>Payments</span>
          </button>

          <button
            type="button"
            className="client-dashboard__nav-item"
            onClick={() => navigate("profile")}
          >
            <Icon name="user" />
            <span>My Profile</span>
          </button>

          <button
            type="button"
            className="client-dashboard__nav-item"
            onClick={() => navigate("settings")}
          >
            <Icon name="settings" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="client-dashboard__sidebar-bottom">
          <Link href="/help" className="client-dashboard__nav-item">
            <Icon name="help" />
            <span>Help Center</span>
          </Link>

          <button type="button" className="client-dashboard__nav-item">
            <Icon name="logout" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          MOBILE OVERLAY / MENU
      ====================================================== */}

      <div
        className="client-dashboard__mobile-overlay"
        onClick={() => setMobileNavOpen(false)}
      />

      <aside className="client-dashboard__mobile-sidebar">
        <div className="client-dashboard__mobile-sidebar-header">
          <Link href="/" className="client-dashboard__brand">
            <span className="client-dashboard__brand-mark">S</span>

            <span>
              <strong>ServiceHub</strong>
              <small>Client</small>
            </span>
          </Link>

          <button
            type="button"
            className="client-dashboard__icon-button"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close menu"
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="client-dashboard__sidebar-profile">
          <div className="client-dashboard__avatar client-dashboard__avatar--large">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Victor Client"
            />
          </div>

          <div>
            <strong>Victor Etaduovie</strong>
            <span>Client account</span>
          </div>
        </div>

        <nav className="client-dashboard__nav">
          {[
            ["overview", "Overview", "grid"],
            ["bookings", "My Bookings", "calendar"],
            ["messages", "Messages", "message"],
            ["saved", "Saved Providers", "heart"],
            ["payments", "Payments", "wallet"],
            ["profile", "My Profile", "user"],
            ["settings", "Settings", "settings"],
          ].map(([id, label, icon]) => (
            <button
              key={id}
              type="button"
              className={
                activeSection === id
                  ? "client-dashboard__nav-item client-dashboard__nav-item--active"
                  : "client-dashboard__nav-item"
              }
              onClick={() => navigate(id)}
            >
              <Icon
                name={
                  icon as
                    | "grid"
                    | "calendar"
                    | "message"
                    | "heart"
                    | "wallet"
                    | "user"
                    | "settings"
                }
              />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="client-dashboard__main">
        {/* HEADER */}

        <header className="client-dashboard__topbar">
          <div className="client-dashboard__topbar-left">
            <button
              type="button"
              className="client-dashboard__menu-button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Icon name="menu" />
            </button>

            <div>
              <span className="client-dashboard__topbar-eyebrow">
                Client dashboard
              </span>

              <h1>Good morning, Victor.</h1>
            </div>
          </div>

          <div className="client-dashboard__topbar-actions">
            <div className="client-dashboard__quick-search">
              <Icon name="search" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Find a provider..."
              />
            </div>

            <div className="client-dashboard__notification-wrap">
              <button
                type="button"
                className="client-dashboard__icon-button"
                onClick={() => setNotificationOpen((current) => !current)}
                aria-label="Notifications"
              >
                <Icon name="bell" />

                {unreadNotifications > 0 && (
                  <span className="client-dashboard__notification-dot">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {notificationOpen && (
                <div className="client-dashboard__notification-panel">
                  <div className="client-dashboard__popover-header">
                    <div>
                      <strong>Notifications</strong>
                      <span>{unreadNotifications} unread</span>
                    </div>

                    <button type="button">Mark all read</button>
                  </div>

                  <div className="client-dashboard__notification-list">
                    {notifications.map((notification) => (
                      <article
                        key={notification.id}
                        className={
                          notification.unread
                            ? "client-dashboard__notification client-dashboard__notification--unread"
                            : "client-dashboard__notification"
                        }
                      >
                        <span className="client-dashboard__notification-icon">
                          {notification.type === "booking" && (
                            <Icon name="calendar" size={16} />
                          )}
                          {notification.type === "payment" && (
                            <Icon name="wallet" size={16} />
                          )}
                          {notification.type === "message" && (
                            <Icon name="message" size={16} />
                          )}
                          {notification.type === "system" && (
                            <Icon name="shield" size={16} />
                          )}
                        </span>

                        <div>
                          <strong>{notification.title}</strong>
                          <p>{notification.message}</p>
                          <small>{notification.time}</small>
                        </div>
                      </article>
                    ))}
                  </div>

                  <Link
                    href="/client/notifications"
                    className="client-dashboard__popover-footer"
                  >
                    View all notifications
                    <Icon name="arrow" size={15} />
                  </Link>
                </div>
              )}
            </div>

            <div className="client-dashboard__profile-wrap">
              <button
                type="button"
                className="client-dashboard__topbar-profile"
                onClick={() => setProfileOpen((current) => !current)}
              >
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Victor Etaduovie"
                />

                <span>
                  <strong>Victor</strong>
                  <small>Client</small>
                </span>

                <Icon name="chevron" size={14} />
              </button>

              {profileOpen && (
                <div className="client-dashboard__profile-menu">
                  <Link href="/client/profile">
                    <Icon name="user" size={16} />
                    My profile
                  </Link>

                  <Link href="/client/settings">
                    <Icon name="settings" size={16} />
                    Settings
                  </Link>

                  <button type="button">
                    <Icon name="logout" size={16} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="client-dashboard__content">
          {/* =====================================================
              WELCOME / SEARCH HERO
          ====================================================== */}

          <section
            id="client-overview"
            className="client-dashboard__welcome"
            data-client-reveal
          >
            <div className="client-dashboard__welcome-glow" />

            <div className="client-dashboard__welcome-content">
              <span className="client-dashboard__welcome-kicker">
                Your service workspace
              </span>

              <h2>Everything you need, in one place.</h2>

              <p>
                Discover professionals, manage bookings and stay connected
                throughout every service.
              </p>

              <div className="client-dashboard__welcome-actions">
                <Link
                  href="/search"
                  className="client-dashboard__primary-button"
                >
                  Find a service
                  <Icon name="arrow" size={17} />
                </Link>

                <button
                  type="button"
                  className="client-dashboard__ghost-button"
                  onClick={() => navigate("bookings")}
                >
                  View bookings
                </button>
              </div>
            </div>

            <div className="client-dashboard__welcome-stat">
              <span>Active service</span>

              <strong>{activeBooking.service}</strong>

              <div>
                <span className="client-dashboard__live-dot" />
                {statusLabel[activeBooking.status]}
              </div>
            </div>
          </section>

          {/* =====================================================
              KPI ROW
          ====================================================== */}

          <section className="client-dashboard__stats-grid">
            {[
              {
                label: "Active booking",
                value: "1",
                caption: "Currently in progress",
                icon: "calendar",
              },
              {
                label: "Upcoming",
                value: `${upcomingBookings.length}`,
                caption: "Appointments scheduled",
                icon: "clock",
              },
              {
                label: "Completed",
                value: "12",
                caption: "Services completed",
                icon: "check",
              },
              {
                label: "Saved providers",
                value: "8",
                caption: "Professionals you follow",
                icon: "heart",
              },
            ].map((stat, index) => (
              <article
                key={stat.label}
                className="client-dashboard__stat-card"
                data-client-reveal
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="client-dashboard__stat-icon">
                  <Icon
                    name={stat.icon as "calendar" | "clock" | "check" | "heart"}
                    size={17}
                  />
                </div>

                <div>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                  <small>{stat.caption}</small>
                </div>
              </article>
            ))}
          </section>

          {/* =====================================================
              ACTIVE BOOKING
          ====================================================== */}

          <section
            id="client-bookings"
            className="client-dashboard__active-layout"
          >
            <article
              className="client-dashboard__active-card"
              data-client-reveal
            >
              <div className="client-dashboard__section-header">
                <div>
                  <span className="client-dashboard__section-kicker">
                    Live service
                  </span>

                  <h2>Track your current booking</h2>
                </div>

                <span className="client-dashboard__live-status">
                  <i />
                  Live
                </span>
              </div>

              <div className="client-dashboard__active-main">
                <div className="client-dashboard__provider-inline">
                  <div className="client-dashboard__avatar client-dashboard__avatar--medium">
                    <img
                      src={activeBooking.providerImage}
                      alt={activeBooking.provider}
                    />

                    <span className="client-dashboard__online-badge" />
                  </div>

                  <div>
                    <strong>{activeBooking.provider}</strong>

                    <span>{activeBooking.providerTitle}</span>

                    <div>
                      <span>
                        <Icon name="star" size={11} />
                        4.9
                      </span>

                      <span>126 reviews</span>
                    </div>
                  </div>
                </div>

                <div className="client-dashboard__active-meta">
                  <div>
                    <span>Service</span>
                    <strong>{activeBooking.service}</strong>
                  </div>

                  <div>
                    <span>Appointment</span>
                    <strong>
                      {activeBooking.date} · {activeBooking.time}
                    </strong>
                  </div>

                  <div>
                    <span>Location</span>
                    <strong>{activeBooking.location}</strong>
                  </div>
                </div>
              </div>

              <div className="client-dashboard__progress">
                <div className="client-dashboard__progress-heading">
                  <div>
                    <span>{statusLabel[activeBooking.status]}</span>
                    <strong>{statusDescription[activeBooking.status]}</strong>
                  </div>

                  <strong>{activeBooking.progress}%</strong>
                </div>

                <div className="client-dashboard__progress-track">
                  <span style={{ width: `${activeBooking.progress}%` }} />
                </div>

                <div className="client-dashboard__timeline">
                  {[
                    ["Request", true],
                    ["Accepted", true],
                    ["Confirmed", true],
                    ["On the way", true],
                    ["In progress", false],
                    ["Completed", false],
                  ].map(([label, done], index) => (
                    <div
                      key={label as string}
                      className={
                        done
                          ? "client-dashboard__timeline-step client-dashboard__timeline-step--done"
                          : index === 4
                            ? "client-dashboard__timeline-step client-dashboard__timeline-step--current"
                            : "client-dashboard__timeline-step"
                      }
                    >
                      <span>{done ? "✓" : index === 4 ? "•" : index + 1}</span>
                      <small>{label as string}</small>
                    </div>
                  ))}
                </div>
              </div>

              <div className="client-dashboard__active-actions">
                <Link
                  href={`/client/bookings/${activeBooking.id}`}
                  className="client-dashboard__primary-button"
                >
                  Open booking
                  <Icon name="arrow" size={16} />
                </Link>

                <Link
                  href={`/client/messages/${activeBooking.provider}`}
                  className="client-dashboard__secondary-button"
                >
                  <Icon name="message" size={16} />
                  Message
                </Link>

                <button
                  type="button"
                  className="client-dashboard__secondary-button"
                >
                  <Icon name="more" size={17} />
                </button>
              </div>
            </article>

            {/* LIVE ETA */}
            <aside
              className="client-dashboard__eta-card"
              data-client-reveal
              style={{ transitionDelay: "100ms" }}
            >
              <div className="client-dashboard__eta-top">
                <span>Provider location</span>

                <Icon name="location" size={17} />
              </div>

              <div className="client-dashboard__fake-map">
                <div className="client-dashboard__map-grid" />

                <div className="client-dashboard__map-route" />

                <span className="client-dashboard__map-home">
                  <Icon name="location" size={15} />
                </span>

                <span className="client-dashboard__map-provider">
                  <img
                    src={activeBooking.providerImage}
                    alt={activeBooking.provider}
                  />
                </span>

                <div className="client-dashboard__eta-bubble">
                  <strong>8 min</strong>
                  <span>estimated arrival</span>
                </div>
              </div>

              <div className="client-dashboard__eta-details">
                <div>
                  <span>Distance</span>
                  <strong>1.2 km</strong>
                </div>

                <div>
                  <span>Arrival</span>
                  <strong>10:38 AM</strong>
                </div>
              </div>

              <button type="button" className="client-dashboard__map-button">
                View live tracking
                <Icon name="arrow" size={15} />
              </button>
            </aside>
          </section>

          {/* =====================================================
              BOOKINGS
          ====================================================== */}

          <section className="client-dashboard__section-block">
            <div className="client-dashboard__section-header">
              <div>
                <span className="client-dashboard__section-kicker">
                  Service history
                </span>

                <h2>Your bookings</h2>
              </div>

              <Link
                href="/client/bookings"
                className="client-dashboard__text-link"
              >
                View all
                <Icon name="arrow" size={14} />
              </Link>
            </div>

            <div className="client-dashboard__booking-tabs">
              <button
                type="button"
                className={
                  bookingTab === "upcoming"
                    ? "client-dashboard__booking-tab client-dashboard__booking-tab--active"
                    : "client-dashboard__booking-tab"
                }
                onClick={() => setBookingTab("upcoming")}
              >
                Upcoming
                <span>{upcomingBookings.length}</span>
              </button>

              <button
                type="button"
                className={
                  bookingTab === "recent"
                    ? "client-dashboard__booking-tab client-dashboard__booking-tab--active"
                    : "client-dashboard__booking-tab"
                }
                onClick={() => setBookingTab("recent")}
              >
                Recent
                <span>{recentBookings.length}</span>
              </button>
            </div>

            <div
              key={bookingTab}
              className="client-dashboard__booking-list client-dashboard__booking-list--switching"
            >
              {bookingData.map((booking, index) => (
                <article
                  key={`${bookingTab}-${booking.id}`}
                  className="client-dashboard__booking-card client-dashboard__booking-card--tab-enter"
                  style={{
                    animationDelay: `${index * 70}ms`,
                  }}
                >
                  <div className="client-dashboard__booking-provider">
                    <div className="client-dashboard__avatar client-dashboard__avatar--medium">
                      <img src={booking.providerImage} alt={booking.provider} />

                      {booking.status !== "completed" && (
                        <span className="client-dashboard__online-badge" />
                      )}
                    </div>

                    <div>
                      <span className="client-dashboard__booking-service">
                        {booking.service}
                      </span>

                      <strong>{booking.provider}</strong>

                      <small>{booking.providerTitle}</small>
                    </div>
                  </div>

                  <div className="client-dashboard__booking-details">
                    <div>
                      <span>Date</span>
                      <strong>{booking.date}</strong>
                    </div>

                    <div>
                      <span>Time</span>
                      <strong>{booking.time}</strong>
                    </div>

                    <div>
                      <span>Location</span>
                      <strong>{booking.location}</strong>
                    </div>

                    <div>
                      <span>Amount</span>
                      <strong>{formatCurrency(booking.amount)}</strong>
                    </div>
                  </div>

                  <div className="client-dashboard__booking-end">
                    <span
                      className={`client-dashboard__status-pill client-dashboard__status-pill--${booking.status}`}
                    >
                      {statusLabel[booking.status]}
                    </span>

                    <Link
                      href={`/client/bookings/${booking.id}`}
                      className="client-dashboard__booking-action"
                    >
                      View
                      <Icon name="arrow" size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* =====================================================
              TWO-COLUMN SUPPORT AREA
          ====================================================== */}

          <section
            className="client-dashboard__two-column"
            id="client-messages"
          >
            {/* MESSAGES */}

            <article className="client-dashboard__panel" data-client-reveal>
              <div className="client-dashboard__section-header">
                <div>
                  <span className="client-dashboard__section-kicker">
                    Communication
                  </span>

                  <h2>Recent messages</h2>
                </div>

                <Link
                  href="/client/messages"
                  className="client-dashboard__text-link"
                >
                  Open inbox
                  <Icon name="arrow" size={14} />
                </Link>
              </div>

              <div className="client-dashboard__message-list">
                {messages.map((item) => (
                  <Link
                    key={item.id}
                    href={`/client/messages/${item.id}`}
                    className="client-dashboard__message-item"
                  >
                    <div className="client-dashboard__message-avatar">
                      <img src={item.image} alt={item.name} />

                      {item.online && (
                        <span className="client-dashboard__online-badge" />
                      )}
                    </div>

                    <div className="client-dashboard__message-content">
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.time}</span>
                      </div>

                      <p>{item.message}</p>
                    </div>

                    {item.unread > 0 && (
                      <span className="client-dashboard__message-unread">
                        {item.unread}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </article>

            {/* PAYMENT */}

            <article
              id="client-payments"
              className="client-dashboard__panel client-dashboard__payment-panel"
              data-client-reveal
              style={{ transitionDelay: "100ms" }}
            >
              <div className="client-dashboard__section-header">
                <div>
                  <span className="client-dashboard__section-kicker">
                    Payments
                  </span>

                  <h2>Payment overview</h2>
                </div>

                <Icon name="wallet" size={19} />
              </div>

              <div className="client-dashboard__wallet-card">
                <div>
                  <span>Total spent</span>
                  <strong>₦186,500</strong>
                </div>

                <span className="client-dashboard__wallet-chip">
                  This month
                </span>
              </div>

              <div className="client-dashboard__payment-stats">
                <div>
                  <span>Completed</span>
                  <strong>₦154,000</strong>
                </div>

                <div>
                  <span>Pending</span>
                  <strong>₦32,500</strong>
                </div>
              </div>

              <Link
                href="/client/payments"
                className="client-dashboard__outline-button"
              >
                View payment history
                <Icon name="arrow" size={15} />
              </Link>
            </article>
          </section>

          {/* =====================================================
              RECOMMENDED PROVIDERS
          ====================================================== */}

          <section
            id="client-saved"
            className="client-dashboard__section-block"
          >
            <div className="client-dashboard__section-header">
              <div>
                <span className="client-dashboard__section-kicker">
                  Discover
                </span>

                <h2>Professionals you may like</h2>

                <p className="client-dashboard__section-description">
                  Based on your services, location and previous bookings.
                </p>
              </div>

              <Link href="/search" className="client-dashboard__text-link">
                Explore marketplace
                <Icon name="arrow" size={14} />
              </Link>
            </div>

            <div className="client-dashboard__provider-grid">
              {filteredProviders.map((provider, index) => (
                <article
                  key={provider.id}
                  className="client-dashboard__provider-card"
                  data-client-reveal
                  style={{
                    transitionDelay: `${index * 90}ms`,
                  }}
                >
                  <div className="client-dashboard__provider-image">
                    <img src={provider.image} alt={provider.name} />

                    {provider.online && (
                      <span className="client-dashboard__provider-online">
                        <i />
                        Online
                      </span>
                    )}

                    <button
                      type="button"
                      className="client-dashboard__provider-save"
                      aria-label={`Save ${provider.name}`}
                    >
                      <Icon name="heart" size={15} />
                    </button>

                    <span className="client-dashboard__provider-rating">
                      <Icon name="star" size={11} />
                      {provider.rating}
                    </span>
                  </div>

                  <div className="client-dashboard__provider-body">
                    <div className="client-dashboard__provider-title-row">
                      <div>
                        <strong>{provider.name}</strong>

                        {provider.verified && (
                          <span className="client-dashboard__provider-verified">
                            <Icon name="check" size={10} />
                            Verified
                          </span>
                        )}
                      </div>

                      <span>{provider.distance}</span>
                    </div>

                    <p>{provider.title}</p>

                    <div className="client-dashboard__provider-meta">
                      <span>{provider.specialty}</span>
                      <strong>From {formatCurrency(provider.price)}</strong>
                    </div>

                    <Link
                      href={`/provider/${provider.id}`}
                      className="client-dashboard__provider-button"
                    >
                      View profile
                      <Icon name="arrow" size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* =====================================================
              REVIEWS / ACCOUNT
          ====================================================== */}

          <section
            id="client-profile"
            className="client-dashboard__account-grid"
          >
            <article
              className="client-dashboard__profile-card"
              data-client-reveal
            >
              <div className="client-dashboard__profile-cover" />

              <div className="client-dashboard__profile-body">
                <div className="client-dashboard__profile-avatar">
                  <img
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    alt="Victor Etaduovie"
                  />
                </div>

                <div className="client-dashboard__profile-info">
                  <span className="client-dashboard__section-kicker">
                    Your profile
                  </span>

                  <h2>Victor Etaduovie</h2>

                  <p>
                    Keep your personal information, service preferences and
                    contact details up to date.
                  </p>

                  <div className="client-dashboard__profile-tags">
                    <span>
                      <Icon name="shield" size={12} />
                      Verified email
                    </span>

                    <span>
                      <Icon name="location" size={12} />
                      Lagos, Nigeria
                    </span>
                  </div>

                  <Link
                    href="/client/profile"
                    className="client-dashboard__outline-button"
                  >
                    Manage profile
                    <Icon name="arrow" size={15} />
                  </Link>
                </div>
              </div>
            </article>

            <article
              id="client-settings"
              className="client-dashboard__review-card"
              data-client-reveal
              style={{ transitionDelay: "100ms" }}
            >
              <span className="client-dashboard__section-kicker">
                Your voice matters
              </span>

              <h2>2 reviews waiting</h2>

              <p>
                Share your experience and help other clients choose
                professionals with confidence.
              </p>

              <div className="client-dashboard__review-preview">
                {recentBookings.slice(0, 2).map((booking) => (
                  <div key={booking.id}>
                    <div className="client-dashboard__avatar">
                      <img src={booking.providerImage} alt={booking.provider} />
                    </div>

                    <div>
                      <strong>{booking.provider}</strong>
                      <span>{booking.service}</span>
                    </div>

                    <button type="button">
                      <Icon name="star" size={14} />
                      Review
                    </button>
                  </div>
                ))}
              </div>

              <Link
                href="/client/reviews"
                className="client-dashboard__outline-button"
              >
                Review history
                <Icon name="arrow" size={15} />
              </Link>
            </article>
          </section>
        </div>
      </main>

      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
      ====================================================== */}

      <nav className="client-dashboard__mobile-bottom-nav">
        <button
          type="button"
          className={
            activeSection === "overview"
              ? "client-dashboard__mobile-nav-item client-dashboard__mobile-nav-item--active"
              : "client-dashboard__mobile-nav-item"
          }
          onClick={() => navigate("overview")}
        >
          <Icon name="grid" size={19} />
          <span>Home</span>
        </button>

        <button
          type="button"
          className={
            activeSection === "bookings"
              ? "client-dashboard__mobile-nav-item client-dashboard__mobile-nav-item--active"
              : "client-dashboard__mobile-nav-item"
          }
          onClick={() => navigate("bookings")}
        >
          <Icon name="calendar" size={19} />
          <span>Bookings</span>
        </button>

        <Link
          href="/search"
          className="client-dashboard__mobile-nav-center"
          aria-label="Find a service"
        >
          <span>
            <Icon name="plus" size={21} />
          </span>
        </Link>

        <button
          type="button"
          className="client-dashboard__mobile-nav-item"
          onClick={() => navigate("messages")}
        >
          <Icon name="message" size={19} />
          <span>Messages</span>

          {unreadMessages > 0 && <em>{unreadMessages}</em>}
        </button>

        <button
          type="button"
          className="client-dashboard__mobile-nav-item"
          onClick={() => navigate("profile")}
        >
          <Icon name="user" size={19} />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}
