"use client";

import { FormEvent, useState } from "react";
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

export default function HelpPage() {
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

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
    };

    const botMessage: ChatMessage = {
      id: Date.now() + 1,
      sender: "bot",
      text: "Thanks for your question. The AI assistant is currently being prepared. Please use the Help Center resources or contact support for assistance.",
    };

    setChatMessages((previous) => [...previous, userMessage, botMessage]);

    setMessage("");
  };

  const filteredQuestions = popularQuestions.filter((question) =>
    question.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="help-page">
      <Navbar />

      <main className="help-page__main">
        {/* HERO */}
        <section className="help-page__hero">
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

        {/* CATEGORIES */}
        <section className="help-page__categories">
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
              {helpCategories.map((category) => (
                <Link
                  href="#"
                  className="help-page__category-card"
                  key={category.title}
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

        {/* POPULAR QUESTIONS */}
        <section className="help-page__questions">
          <div className="help-page__container">
            <div className="help-page__questions-layout">
              <div className="help-page__questions-intro">
                <span className="help-page__section-kicker">Quick answers</span>

                <h2 className="help-page__section-title">Popular questions</h2>

                <p>
                  Start here for answers to some of the most common questions
                  from clients and service providers.
                </p>
              </div>

              <div className="help-page__question-list">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((question) => (
                    <button
                      type="button"
                      className="help-page__question"
                      key={question}
                      onClick={() => setChatOpen(true)}
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

        {/* SUPPORT */}
        <section className="help-page__support">
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

      {/* AI ASSISTANT */}
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

            <div className="help-page__assistant-messages">
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
