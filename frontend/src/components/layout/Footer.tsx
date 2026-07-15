"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";

const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-charcoal text-white/80">
      {/* Main Footer */}
      <div className="container-luxury section-padding pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center font-display text-lg font-bold text-gold">
                R
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  {SITE_CONFIG.name}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light">
                  {SITE_CONFIG.tagline}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/60 mb-6">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: SITE_CONFIG.social.instagram },
                { icon: Facebook, href: SITE_CONFIG.social.facebook },
                { icon: Twitter, href: SITE_CONFIG.social.twitter },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-gold" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
                <span className="text-sm text-white/50">{SITE_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-sm text-white/50 hover:text-gold transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-sm text-white/50 hover:text-gold transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Plan Your Stay
            </h4>
            <p className="text-sm text-white/50 mb-6">
              Ready to experience luxury in the mountains? Browse our rooms and
              book your perfect getaway.
            </p>
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-white text-sm font-medium uppercase tracking-wider rounded hover:bg-gold-dark transition-all duration-300 shadow-gold"
            >
              Explore Rooms
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-luxury py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/30">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
