import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  { label: "What's the Audit?", href: "#what-it-measures" },
  { label: "How It Works", href: "#process" },
  { label: "Results", href: "#testimonials" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "mailto:hello@ecrofmedia.com" },
];

export default function OiaFooter() {
  return (
    <footer className="bg-ink border-t border-white/8 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image
            src="/ecrof_logo_transparent.png"
            alt="Ecrof Media Company"
            width={52}
            height={52}
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="font-sans font-bold text-white text-base tracking-tight leading-tight">
              Ecrof
            </span>
            <span className="font-sans font-bold text-white text-base tracking-tight leading-tight">
              Media
            </span>
            <span className="font-sans text-white/40 text-[11px] tracking-tight leading-tight">
              Company
            </span>
          </div>
        </Link>

        <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3">
          {FOOTER_LINKS.map((link) => (
            link.href.startsWith("/") || link.href.startsWith("mailto") ? (
              <Link
                key={link.label}
                href={link.href}
                className="footer-link text-sm"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="footer-link text-sm"
              >
                {link.label}
              </a>
            )
          ))}
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-white/8">
        <p className="footer-legal text-center">
          &copy; {new Date().getFullYear()} Ecrof Media Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
