"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import services from "@/data/services.json";

export default function ServiceSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const router = useRouter();

  const createServiceSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleSearch = (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const search = value.toLowerCase();

    const matches = services.filter((service) => {
      return (
        service.name.toLowerCase().includes(search) ||
        service.category.toLowerCase().includes(search) ||
        service.keywords.some((keyword) =>
          keyword.toLowerCase().includes(search),
        )
      );
    });

    setResults(matches);
  };

  const selectService = (service) => {
    const serviceSlug = createServiceSlug(service.name);

    router.push(`/services/${serviceSlug}`);
  };

  return (
    <div className="w-100">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="form-control border-0 shadow-none fs-5 py-3"
        placeholder="Describe what you need..."
      />

      {results.length > 0 && (
        <div className="service-search-dropdown">
          {results.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => selectService(service)}
              className="service-search-item"
            >
              <strong>{service.name}</strong>
              <span>{service.category}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
