"use client";

import { useState, useRef, useEffect } from "react";

interface Provider {
  id: number;
  name: string;
  rating: number;
  distance: number;
  price: number;
  img: string;
  services: string[];
}

export default function ProviderCard({ provider }: { provider: Provider }) {
  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (servicesRef.current) {
      setHasOverflow(
        servicesRef.current.scrollHeight >
          servicesRef.current.clientHeight
      );
    }
  }, []);

  return (
    <article className="home_featured_card">
      <div className="home_featured_card_media">
        <img
          src={provider.img}
          alt={provider.name}
          className="home_featured_card_image"
        />
      </div>

      <div className="home_featured_card_body">
        <div className="home_featured_card_head">
          <h3 className="home_featured_card_name">
            {provider.name}
          </h3>
          <div className="home_featured_card_price">
            From ${provider.price}
          </div>
        </div>

        <div className="home_featured_card_meta">
          ★ {provider.rating} • {provider.distance} km away
        </div>

        <div
          ref={servicesRef}
          className={`home_featured_card_services ${
            expanded ? "is-expanded" : ""
          }`}
        >
          {provider.services.map((service, index) => (
            <span
              key={index}
              className="home_featured_card_service"
            >
              {service}
            </span>
          ))}
        </div>

        {hasOverflow && (
          <button
            className="home_featured_viewmore"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "View less" : "View more"}
          </button>
        )}
      </div>
    </article>
  );
}