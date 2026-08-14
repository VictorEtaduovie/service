"use client";

import React, { useEffect, useRef, useState } from "react";
import ServiceSearch from "@/components/ServiceSearch";

export default function SearchBar() {
  const searchWrapRef = useRef<HTMLDivElement | null>(null);
  const [isSearchSticky, setIsSearchSticky] = useState(false);

  useEffect(() => {
    if (!searchWrapRef.current) return;

    const navbarOffset = 76;

    // Remember the original position of the search
    const searchTop =
      searchWrapRef.current.getBoundingClientRect().top + window.scrollY;

    const onScroll = () => {
      setIsSearchSticky(window.scrollY >= searchTop - navbarOffset);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      id="homepage-search"
      ref={searchWrapRef}
      className={`pt-2 ${isSearchSticky ? "search-sticky" : ""}`}
    >
      <div className="search-wrapper mx-auto" style={{ maxWidth: "800px" }}>
        <div className="search-input-group d-flex align-items-center shadow-lg border-0 p-2 bg-white position-relative">
          <div
            className="d-flex align-items-center flex-grow-1 px-4"
            style={{
              width: "100%",
              minWidth: 0,
            }}
          >
            <span className="fs-4 me-2">🔍</span>

            <div
              style={{
                width: "100%",
                minWidth: 0,
              }}
            >
              <ServiceSearch />
            </div>
          </div>

          <button
            className="btn-search px-5 py-3 fs-5 text-white border-0 shadow-sm"
            style={{
              background: "var(--primary-gradient)",
              borderRadius: "14px",
            }}
          >
            Search
          </button>
        </div>

        {/* Location Indicator */}
        <div className="mt-3">
          <span className="badge bg-white text-dark px-3 py-2 rounded-pill shadow-sm border">
            <span className="text-success me-1">●</span>
            Showing services near Lagos, Nigeria
          </span>
        </div>
      </div>
    </div>
  );
}
