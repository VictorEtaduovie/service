"use client";

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site_footer" aria-labelledby="footer-heading">
      <div className="container site_footer__inner">
        <h2 id="footer-heading" className="visually-hidden">
          Site footer
        </h2>

        <div className="site_footer__grid">
          <nav className="site_footer__col" aria-label="Browse services">
            <h3 className="site_footer__title">Browse Services</h3>
            <ul className="site_footer__list">
              <li>
                <Link href="/categories">Categories</Link>
              </li>
              <li>
                <Link href="/providers">Popular Providers</Link>
              </li>
            </ul>
          </nav>

          <nav className="site_footer__col" aria-label="Get started">
            <h3 className="site_footer__title">Get Started</h3>
            <ul className="site_footer__list">
              <li>
                <Link href="/how-it-works">How It Works</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/provider">Become a Provider</Link>
              </li>
            </ul>
          </nav>

          <nav className="site_footer__col" aria-label="Support">
            <h3 className="site_footer__title">Support</h3>
            <ul className="site_footer__list">
              <li>
                <Link href="/help">Help Center</Link>
              </li>
              <li>
                <Link href="/contact">Contact Support</Link>
              </li>
              <li>
                <Link href="/safety">Safety</Link>
              </li>
            </ul>
          </nav>

          <nav className="site_footer__col" aria-label="Company">
            <h3 className="site_footer__title">Company</h3>
            <ul className="site_footer__list">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="site_footer__bottom">
          <div className="site_footer__legal">
            <Link href="/terms" className="site_footer__legal_link">
              Terms of Service
            </Link>
            <span className="site_footer__sep" aria-hidden>
              ·
            </span>
            <Link href="/privacy" className="site_footer__legal_link">
              Privacy Policy
            </Link>
          </div>

          <div className="site_footer__copyright">
            © {new Date().getFullYear()} YourPlatformName. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
