"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  { label: "What's the Audit?", href: "#what-it-measures" },
  { label: "How It Works", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Results", href: "#testimonials" },
];

export default function OiaNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 no-underline flex-shrink-0">
          <Image
            src="/ecrof_logo_transparent.png"
            alt="Ecrof Media"
            width={36}
            height={36}
            className="object-contain"
            priority
          />
          <span className="font-sans font-extrabold text-base sm:text-lg tracking-tighter text-white">
            Ecrof Media
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="OIA navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans font-medium text-sm text-white/60 no-underline px-3 py-1.5 rounded-md transition-colors duration-150 ease-in-out whitespace-nowrap hover:text-white hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <a href="#pricing" className="btn-primary text-xs sm:text-sm px-3 py-2 sm:px-[1.875rem] sm:py-[0.875rem]">
            Start Your Audit
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="lg:hidden bg-none border border-white/20 rounded-md p-1.5 cursor-pointer text-white leading-none"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 5H16M2 9H16M2 13H16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-ink px-4 sm:px-6 pb-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-sans font-medium text-base text-white/70 no-underline py-3 border-b border-white/10"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4">
            <a
              href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full justify-center text-sm"
            >
              Start Your Audit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
