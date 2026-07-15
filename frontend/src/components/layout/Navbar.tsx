"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navBg = isHome && !isScrolled
    ? "bg-transparent"
    : "bg-cream/95 backdrop-blur-md shadow-md";

  const textColor = isHome && !isScrolled
    ? "text-white"
    : "text-warm-brown";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          navBg
        )}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className={cn(
                "w-10 h-10 rounded-full border-2 flex items-center justify-center font-display text-lg font-bold transition-all duration-300",
                isHome && !isScrolled
                  ? "border-gold-light text-gold-light group-hover:bg-gold-light/20"
                  : "border-gold text-gold group-hover:bg-gold/10"
              )}>
                R
              </div>
              <div>
                <h1 className={cn(
                  "font-display text-lg sm:text-xl font-bold tracking-wide transition-colors duration-300",
                  textColor
                )}>
                  {SITE_CONFIG.name}
                </h1>
                <p className={cn(
                  "hidden sm:block text-[10px] uppercase tracking-[0.3em] transition-colors duration-300",
                  isHome && !isScrolled ? "text-gold-light" : "text-gold"
                )}>
                  {SITE_CONFIG.tagline}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:text-gold py-2",
                    textColor,
                    pathname === link.href && "text-gold"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="/rooms"
                className={cn(
                  "hidden md:inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded transition-all duration-300",
                  isHome && !isScrolled
                    ? "bg-white/15 backdrop-blur-sm text-white border border-white/30 hover:bg-white/25"
                    : "bg-gold text-white hover:bg-gold-dark shadow-gold"
                )}
              >
                Book Now
              </Link>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className={cn(
                  "hidden sm:flex items-center gap-2 text-sm transition-colors duration-300",
                  textColor
                )}
              >
                <Phone className="w-4 h-4 text-gold" />
              </a>

              <button
                onClick={() => setIsMobileOpen(true)}
                className={cn("lg:hidden p-2 transition-colors duration-300", textColor)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[60]"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[85%] max-w-sm h-full bg-cream z-[70] shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-gold-light/30">
                  <span className="font-display text-xl font-bold text-warm-brown">
                    {SITE_CONFIG.name}
                  </span>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 text-warm-brown hover:text-gold transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "block px-8 py-4 text-base font-medium tracking-wide transition-all duration-200",
                          pathname === link.href
                            ? "text-gold bg-gold/5 border-r-2 border-gold"
                            : "text-warm-brown hover:text-gold hover:bg-gold/5"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 border-t border-gold-light/30 space-y-4">
                  <Link
                    href="/rooms"
                    className="btn-primary w-full text-center text-sm"
                  >
                    Book Now
                  </Link>
                  <div className="flex items-center gap-3 text-sm text-brown-light">
                    <Phone className="w-4 h-4 text-gold" />
                    <a href={`tel:${SITE_CONFIG.phone}`}>{SITE_CONFIG.phone}</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
