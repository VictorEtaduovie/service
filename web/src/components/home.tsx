import React from 'react';

export const Hero = () => {
  return (
    <section className="hero-gradient-bg py-5 py-md-5 border-bottom">
      <div className="container py-5">
        <div className="row justify-content-center text-center">
          <div className="col-xl-9">
            {/* Title with strategic emphasis */}
            <h1 className="display-3 fw-800 tracking-tight mb-3">
              Find trusted local services — <span className="text-primary">fast</span>
            </h1>
            
            {/* Subtitle with optimized line-height */}
            <p className="lead text-secondary mb-5 px-md-5">
              Book verified professionals for home, health, tech and more — on demand or scheduled.
            </p>

            {/* Premium Search Logic */}
            <div className="search-wrapper mb-4">
              <div className="search-input-group d-flex align-items-center">
                <div className="ps-3 text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  className="form-control form-control-lg border-0 shadow-none" 
                  placeholder="What service do you need? (e.g., “Plumber”, “Phone repair”, “Home nurse”)"
                />
                <button className="btn btn-search ms-2">
                  Search services
                </button>
              </div>
            </div>

            {/* CTAs & Trust Bullets */}
            <div className="d-flex flex-column align-items-center gap-4">
              <a href="/provider/onboarding" className="btn btn-link text-primary fw-bold text-decoration-none p-0">
                Become a provider <span className="ms-1">→</span>
              </a>

              <div className="d-flex flex-wrap justify-content-center gap-4 mt-2">
                <div className="value-bullet">
                  <span className="text-success">✔</span> Verified providers with secure payments
                </div>
                <div className="value-bullet">
                  <span className="text-success">✔</span> Live tracking & real-time chat
                </div>
                <div className="value-bullet">
                  <span className="text-success">✔</span> Easy booking, trusted reviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};