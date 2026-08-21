"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

type ChatMessage = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

const helpCategories = [
  {
    icon: "🔐",
    title: "Account & Login",
    description: "Sign-in, verification, passwords and account access.",
  },
  {
    icon: "📅",
    title: "Bookings",
    description: "Learn about booking, rescheduling, cancellations and status.",
  },
  {
    icon: "💳",
    title: "Payments",
    description: "Payments, refunds, invoices and transaction questions.",
  },
  {
    icon: "📍",
    title: "Tracking",
    description: "Live provider tracking, locations and arrival updates.",
  },
  {
    icon: "🛡️",
    title: "Safety & Verification",
    description: "Provider verification, trust badges and safety information.",
  },
  {
    icon: "👤",
    title: "Provider Support",
    description: "Registration, services, documents and provider accounts.",
  },
];

const popularQuestions = [
  "How do I book a service?",
  "How can I cancel a booking?",
  "How does provider verification work?",
  "How do I become a service provider?",
  "How do I track my provider?",
  "What happens after I submit my provider registration?",
];

const faqAnswers: Record<string, string> = {
  "How do I book a service?":
    "To book a service, search for what you need or browse a service category. Select a professional to view their profile, ratings, reviews, location, verification details and pricing. When you are ready, select Book Now. If you are already registered as a client, you can continue to booking. If you are new, you will first verify your email and complete the short client profile setup.",

  "How can I cancel a booking?":
    "You can cancel a booking from your client account by opening the relevant booking and selecting the cancellation option. Cancellation availability and any applicable terms may depend on the booking status and the service provider's cancellation policy.",

  "How does provider verification work?":
    "Providers go through an onboarding and verification process. Depending on the service, they may provide identity information, identification documents, professional credentials, licensing information and other relevant details. Submitted information can then be reviewed before the provider is fully approved on the marketplace.",

  "How do I become a service provider?":
    "Select Become a Provider and enter your email address to begin. We will send a one-time verification code to your email. After verification, you will complete your provider registration, including personal information, professional services, specializations, education, identity documents and other relevant details.",

  "How do I track my provider?":
    "For services that support live tracking, you can follow your provider's journey after a booking has been confirmed and the provider is on the way. The platform can show the provider's current status and location information as the booking progresses.",

  "What happens after I submit my provider registration?":
    "After you submit your provider registration, your application is received for review. A confirmation email is sent to the email address associated with your application. The platform will then review your submitted information and you will be contacted with an update within three working days.",
};

export default function HelpPage() {
  const revealRef = useRef<HTMLDivElement | null>(null);

  /* Chat references */
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I'm your platform assistant. Ask me anything about bookings, providers, payments, verification or getting started.",
    },
  ]);

  /* ===================================================== */
  /* SCROLL REVEAL */
  /* ===================================================== */

  useEffect(() => {
    const root = revealRef.current;

    if (!root) return;

    const elements = root.querySelectorAll("[data-help-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("help-page__reveal-visible");

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

  /* ===================================================== */
  /* AUTO-SCROLL CHAT TO BOTTOM */
  /* ===================================================== */

  useEffect(() => {
    const container = messagesRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [chatMessages]);

  /* ===================================================== */
  /* CLEAN UP TYPEWRITER */
  /* ===================================================== */

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, []);

  /* ===================================================== */
  /* TYPEWRITER EFFECT */
  /* ===================================================== */

  const typeBotMessage = (messageId: number, fullText: string) => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    let currentIndex = 0;

    typingTimerRef.current = setInterval(() => {
      currentIndex += 1;

      setChatMessages((previous) =>
        previous.map((chatMessage) =>
          chatMessage.id === messageId
            ? {
                ...chatMessage,
                text: fullText.slice(0, currentIndex),
              }
            : chatMessage,
        ),
      );

      const container = messagesRef.current;

      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "auto",
        });
      }

      if (currentIndex >= fullText.length) {
        if (typingTimerRef.current) {
          clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
        }
      }
    }, 18);
  };

  /* ===================================================== */
  /* FAQ QUESTION CLICK */
  /* ===================================================== */

  const handlePopularQuestionClick = (question: string) => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    const answer =
      faqAnswers[question] ??
      "I can help with that. Please contact support for more information.";

    const userMessageId = Date.now();
    const botMessageId = userMessageId + 1;

    const userMessage: ChatMessage = {
      id: userMessageId,
      sender: "user",
      text: question,
    };

    const botMessage: ChatMessage = {
      id: botMessageId,
      sender: "bot",
      text: "",
    };

    setChatOpen(true);

    setChatMessages((previous) => [...previous, userMessage, botMessage]);

    /*
     * Give React a moment to render the new messages
     * before starting the typewriter.
     */
    window.setTimeout(() => {
      typeBotMessage(botMessageId, answer);
    }, 180);

    /*
     * Move the conversation into view.
     */
    window.setTimeout(() => {
      messagesRef.current?.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 120);
  };

  /* ===================================================== */
  /* MANUAL CHAT */
  /* ===================================================== */

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    const userMessageId = Date.now();
    const botMessageId = userMessageId + 1;

    const userMessage: ChatMessage = {
      id: userMessageId,
      sender: "user",
      text: trimmedMessage,
    };

    const botMessage: ChatMessage = {
      id: botMessageId,
      sender: "bot",
      text: "",
    };

    setChatMessages((previous) => [...previous, userMessage, botMessage]);

    setMessage("");

    /*
     * Manual/free-text questions still use the temporary
     * generic response, but it is typed out naturally.
     */
    const response =
      "Thanks for your question. The AI assistant is currently being prepared. Please use the Help Center resources or contact support for assistance.";

    window.setTimeout(() => {
      typeBotMessage(botMessageId, response);
    }, 180);
  };

  const filteredQuestions = popularQuestions.filter((question) =>
    question.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="help-page" ref={revealRef}>
      <Navbar />

      <main className="help-page__main">
        {/* ===================================================== */}
        {/* HERO */}
        {/* ===================================================== */}

        <section className="help-page__hero" data-help-reveal="fade-up">
          <div className="help-page__container">
            <div className="help-page__hero-content">
              <span className="help-page__eyebrow">Help Center</span>

              <h1 className="help-page__title">How can we help?</h1>

              <p className="help-page__subtitle">
                Find answers about bookings, providers, payments, verification
                and everything else you need to use the platform.
              </p>

              <div className="help-page__search">
                <span className="help-page__search-icon" aria-hidden="true">
                  ⌕
                </span>

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search for help..."
                  aria-label="Search Help Center"
                />

                <button type="button">Search</button>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* CATEGORIES */}
        {/* ===================================================== */}

        <section className="help-page__categories" data-help-reveal="fade-up">
          <div className="help-page__container">
            <div className="help-page__section-heading">
              <div>
                <span className="help-page__section-kicker">
                  Browse support
                </span>

                <h2 className="help-page__section-title">
                  What can we help you with?
                </h2>
              </div>
            </div>

            <div className="help-page__category-grid">
              {helpCategories.map((category, index) => (
                <Link
                  href="#"
                  className="help-page__category-card"
                  key={category.title}
                  data-help-reveal="fade-up"
                  style={{
                    transitionDelay: `${index * 80}ms`,
                  }}
                  onClick={(event) => event.preventDefault()}
                >
                  <div className="help-page__category-icon">
                    {category.icon}
                  </div>

                  <div className="help-page__category-content">
                    <h3>{category.title}</h3>

                    <p>{category.description}</p>

                    <span className="help-page__category-link">
                      Explore help <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* QUESTIONS */}
        {/* ===================================================== */}

        <section className="help-page__questions" data-help-reveal="fade-up">
          <div className="help-page__container">
            <div className="help-page__questions-layout">
              <div
                className="help-page__questions-intro"
                data-help-reveal="fade-left"
              >
                <span className="help-page__section-kicker">Quick answers</span>

                <h2 className="help-page__section-title">Popular questions</h2>

                <p>
                  Start here for answers to some of the most common questions
                  from clients and service providers.
                </p>
              </div>

              <div className="help-page__question-list">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((question, index) => (
                    <button
                      type="button"
                      className="help-page__question"
                      key={question}
                      data-help-reveal="fade-right"
                      style={{
                        transitionDelay: `${index * 70}ms`,
                      }}
                      onClick={() => handlePopularQuestionClick(question)}
                    >
                      <span>{question}</span>

                      <span aria-hidden="true">→</span>
                    </button>
                  ))
                ) : (
                  <div className="help-page__no-results">
                    No matching questions found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* SUPPORT */}
        {/* ===================================================== */}

        <section className="help-page__support" data-help-reveal="fade-up">
          <div className="help-page__container">
            <div className="help-page__support-card">
              <div>
                <span className="help-page__support-kicker">
                  Still need help?
                </span>

                <h2>We're here for you.</h2>

                <p>
                  Can't find what you're looking for? Reach out to our support
                  team and we'll help you get the right answer.
                </p>
              </div>

              <Link href="/contact" className="help-page__support-button">
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ===================================================== */}
      {/* AI ASSISTANT */}
      {/* No reveal here */}
      {/* ===================================================== */}

      <div
        className={`help-page__assistant ${
          chatOpen ? "help-page__assistant--open" : ""
        }`}
      >
        {chatOpen && (
          <div className="help-page__assistant-window">
            <div className="help-page__assistant-header">
              <div>
                <span className="help-page__assistant-status">
                  AI Help Assistant
                </span>

                <strong>Platform Assistant</strong>
              </div>

              <button
                type="button"
                onClick={() => setChatOpen(false)}
                aria-label="Close assistant"
              >
                ×
              </button>
            </div>

            <div ref={messagesRef} className="help-page__assistant-messages">
              {chatMessages.map((chatMessage) => (
                <div
                  key={chatMessage.id}
                  className={`help-page__assistant-message ${
                    chatMessage.sender === "user"
                      ? "help-page__assistant-message--user"
                      : "help-page__assistant-message--bot"
                  }`}
                >
                  {chatMessage.text}

                  {chatMessage.sender === "bot" && chatMessage.text === "" && (
                    <span className="help-page__assistant-typing">
                      <i />
                      <i />
                      <i />
                    </span>
                  )}
                </div>
              ))}
            </div>

            <form
              className="help-page__assistant-form"
              onSubmit={handleChatSubmit}
            >
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask a question..."
                aria-label="Ask the AI assistant"
              />

              <button type="submit">→</button>
            </form>
          </div>
        )}

        <button
          type="button"
          className="help-page__assistant-button"
          onClick={() => setChatOpen((current) => !current)}
          aria-label="Open AI help assistant"
        >
          <span aria-hidden="true">✦</span>

          {!chatOpen && <span>Ask our AI assistant</span>}
        </button>
      </div>

      <SiteFooter />
    </div>
  );
}
