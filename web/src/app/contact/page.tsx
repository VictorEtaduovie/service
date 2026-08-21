"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

const contactTopics = [
  "Booking & Scheduling",
  "Payment & Refund",
  "Account & Login",
  "Provider Registration",
  "Verification & Safety",
  "Technical Issue",
  "General Question",
];

export default function ContactPage() {
  const revealRef = useRef<HTMLDivElement | null>(null);

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const root = revealRef.current;

    if (!root) return;

    const elements = root.querySelectorAll("[data-contact-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("contact-page__reveal-visible");
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Temporary frontend-only submission.
    // Backend support ticket creation will be connected later.
    setFormSubmitted(true);
  };

  return (
    <div className="contact-page" ref={revealRef}>
      <Navbar />

      <main className="contact-page__main">
        {/* HERO */}
        <section className="contact-page__hero" data-contact-reveal="fade-up">
          <div className="contact-page__container">
            <div className="contact-page__hero-content">
              <span className="contact-page__eyebrow">Contact Support</span>

              <h1 className="contact-page__title">We're here to help.</h1>

              <p className="contact-page__subtitle">
                Tell us what you need help with and our support team will get
                back to you as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT CONTENT */}
        <section
          className="contact-page__support"
          data-contact-reveal="fade-up"
        >
          <div className="contact-page__container">
            <div className="contact-page__layout">
              {/* LEFT SIDE */}
              <div
                className="contact-page__information"
                data-contact-reveal="fade-left"
              >
                <div className="contact-page__information-header">
                  <span className="contact-page__section-kicker">
                    Support options
                  </span>

                  <h2 className="contact-page__section-title">
                    How can we assist you?
                  </h2>

                  <p className="contact-page__section-description">
                    For the fastest answer, choose the topic that best matches
                    your question.
                  </p>
                </div>

                <div className="contact-page__support-options">
                  <Link
                    href="/help"
                    className="contact-page__support-option"
                    data-contact-reveal="fade-up"
                    style={{ transitionDelay: "80ms" }}
                  >
                    <div className="contact-page__support-option-icon">?</div>

                    <div>
                      <h3>Help Center</h3>
                      <p>
                        Find answers to common questions about the platform.
                      </p>
                      <span>Visit Help Center →</span>
                    </div>
                  </Link>

                  <div
                    className="contact-page__support-option"
                    data-contact-reveal="fade-up"
                    style={{ transitionDelay: "160ms" }}
                  >
                    <div className="contact-page__support-option-icon">✉</div>

                    <div>
                      <h3>Email Support</h3>
                      <p>
                        Send us a message and our support team will review your
                        request.
                      </p>
                      <span>support@example.com</span>
                    </div>
                  </div>

                  <div
                    className="contact-page__support-option"
                    data-contact-reveal="fade-up"
                    style={{ transitionDelay: "240ms" }}
                  >
                    <div className="contact-page__support-option-icon">🕘</div>

                    <div>
                      <h3>Support Hours</h3>
                      <p>
                        Our support team is available to assist with your
                        questions.
                      </p>
                      <span>Monday – Friday · 9:00 AM – 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FORM */}
              <div
                className="contact-page__form-card"
                data-contact-reveal="fade-right"
              >
                {!formSubmitted ? (
                  <>
                    <div className="contact-page__form-header">
                      <span className="contact-page__form-kicker">
                        Send a message
                      </span>

                      <h2>Tell us what happened</h2>

                      <p>
                        Provide a few details and we'll direct your request to
                        the right team.
                      </p>
                    </div>

                    <form
                      className="contact-page__form"
                      onSubmit={handleSubmit}
                    >
                      <div className="contact-page__form-grid">
                        <div className="contact-page__field">
                          <label htmlFor="contact-name">Full name</label>

                          <input
                            id="contact-name"
                            type="text"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>

                        <div className="contact-page__field">
                          <label htmlFor="contact-email">Email address</label>

                          <input
                            id="contact-email"
                            type="email"
                            placeholder="you@example.com"
                            required
                          />
                        </div>

                        <div className="contact-page__field contact-page__field--full">
                          <label htmlFor="contact-topic">
                            What do you need help with?
                          </label>

                          <select id="contact-topic" defaultValue="" required>
                            <option value="" disabled>
                              Select a topic
                            </option>

                            {contactTopics.map((topic) => (
                              <option key={topic} value={topic}>
                                {topic}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="contact-page__field contact-page__field--full">
                          <label htmlFor="contact-message">Message</label>

                          <textarea
                            id="contact-message"
                            rows={6}
                            placeholder="Tell us how we can help..."
                            required
                          />
                        </div>
                      </div>

                      <div className="contact-page__form-footer">
                        <p>
                          Please don't include passwords or other sensitive
                          account information.
                        </p>

                        <button type="submit">Send Message</button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="contact-page__success">
                    <div
                      className="contact-page__success-icon"
                      aria-hidden="true"
                    >
                      ✓
                    </div>

                    <span className="contact-page__success-badge">
                      Message Received
                    </span>

                    <h2>Thanks for reaching out.</h2>

                    <p>
                      Your message has been received successfully. Our support
                      team will review it and get back to you as soon as
                      possible.
                    </p>

                    <Link href="/help" className="contact-page__success-link">
                      Return to Help Center
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="contact-page__bottom" data-contact-reveal="fade-up">
          <div className="contact-page__container">
            <div className="contact-page__bottom-card">
              <div>
                <span className="contact-page__bottom-kicker">
                  Need an answer right away?
                </span>

                <h2>Check the Help Center first.</h2>

                <p>
                  You may find the answer you're looking for without needing to
                  contact support.
                </p>
              </div>

              <Link href="/help" className="contact-page__bottom-button">
                Open Help Center
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
