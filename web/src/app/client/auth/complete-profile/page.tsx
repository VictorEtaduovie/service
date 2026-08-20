"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

function CompleteProfileForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const providerId = searchParams.get("providerId") || "";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    // Temporary testing data
    localStorage.setItem("client_logged_in", "true");
    localStorage.setItem("client_email", email);
    localStorage.setItem("client_name", fullName.trim());
    localStorage.setItem("client_phone", phone.trim());

    setTimeout(() => {
      router.push(`/book/${providerId}`);
    }, 600);
  };

  return (
    <div className="client-complete-profile">
      <Navbar />

      <main className="client-complete-profile__main">
        <div className="client-complete-profile__container">
          <div className="client-complete-profile__header">
            <span className="client-complete-profile__eyebrow">
              Almost there
            </span>

            <h1>Complete your profile</h1>

            <p>Just a few details and you can continue with your booking.</p>
          </div>

          <div className="client-complete-profile__card">
            <div className="client-complete-profile__progress">
              <span className="client-complete-profile__progress-active" />
            </div>

            <div className="client-complete-profile__section-heading">
              <div>
                <span>Account details</span>
                <h2>Your information</h2>
              </div>

              <small>2 of 2</small>
            </div>

            <form
              className="client-complete-profile__form"
              onSubmit={handleSubmit}
            >
              <div className="client-complete-profile__field">
                <label htmlFor="client-profile-email">Email address</label>

                <input
                  id="client-profile-email"
                  type="email"
                  value={email}
                  readOnly
                  className="client-complete-profile__readonly"
                />

                <small>Your verified email address</small>
              </div>

              <div className="client-complete-profile__field">
                <label htmlFor="client-profile-name">Full name</label>

                <input
                  id="client-profile-name"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="client-complete-profile__field">
                <label htmlFor="client-profile-phone">Phone number</label>

                <div className="client-complete-profile__phone">
                  <select defaultValue="+234" aria-label="Country code">
                    <option value="+234">NG +234</option>
                    <option value="+1">US +1</option>
                    <option value="+44">GB +44</option>
                    <option value="+233">GH +233</option>
                  </select>

                  <input
                    id="client-profile-phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="801 234 5678"
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className="client-complete-profile__field">
                <label htmlFor="client-profile-location">Location</label>

                <input
                  id="client-profile-location"
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="e.g. Ikeja, Lagos"
                  autoComplete="address-level2"
                />

                <small>This helps us show relevant local providers.</small>
              </div>

              <button
                type="submit"
                className="client-complete-profile__submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Saving your profile..."
                  : "Continue to Booking"}
              </button>
            </form>

            <p className="client-complete-profile__privacy">
              Your information is used to create your client profile and
              complete your booking securely.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export default function CompleteProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="client-complete-profile">
          <Navbar />

          <main className="client-complete-profile__main">
            <div className="client-complete-profile__container">
              <div className="client-complete-profile__card">
                <p style={{ margin: 0, textAlign: "center" }}>Loading...</p>
              </div>
            </div>
          </main>

          <SiteFooter />
        </div>
      }
    >
      <CompleteProfileForm />
    </Suspense>
  );
}
