"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-beige">
        <div className="container-luxury text-center">
          <AnimatedSection>
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
              Get in Touch
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-brown mb-4">
              Contact Us
            </h1>
            <p className="text-brown-light max-w-2xl mx-auto">
              Have a question or ready to book? Reach out and our team will get back to you promptly.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatedSection direction="left">
                <div>
                  <h2 className="font-display text-2xl font-bold text-warm-brown mb-6">
                    Let&apos;s Connect
                  </h2>
                  <p className="text-brown-light text-sm leading-relaxed mb-8">
                    Whether you have questions about our rooms, need help planning your trip, or
                    want to make a special request — we&apos;re here to help.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-warm-brown text-sm mb-1">Address</h4>
                        <p className="text-sm text-brown-light">{SITE_CONFIG.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-warm-brown text-sm mb-1">Phone</h4>
                        <a href={`tel:${SITE_CONFIG.phone}`} className="text-sm text-brown-light hover:text-gold transition-colors">
                          {SITE_CONFIG.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-warm-brown text-sm mb-1">Email</h4>
                        <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm text-brown-light hover:text-gold transition-colors">
                          {SITE_CONFIG.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white text-sm font-semibold uppercase tracking-wider rounded hover:bg-green-700 transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="right">
                <div className="bg-cream rounded-xl p-8 md:p-10 shadow-sm">
                  <h3 className="font-display text-xl font-semibold text-warm-brown mb-6">
                    Send Us a Message
                  </h3>

                  {submitted && (
                    <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <p className="text-sm text-success">Message sent successfully! We'll get back to you soon.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-warm-brown mb-2 uppercase tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-gold-light/30 rounded-lg text-sm text-warm-brown placeholder-brown-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-warm-brown mb-2 uppercase tracking-wider">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-gold-light/30 rounded-lg text-sm text-warm-brown placeholder-brown-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-warm-brown mb-2 uppercase tracking-wider">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gold-light/30 rounded-lg text-sm text-warm-brown placeholder-brown-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-warm-brown mb-2 uppercase tracking-wider">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gold-light/30 rounded-lg text-sm text-warm-brown placeholder-brown-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                        placeholder="Tell us about your plans..."
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full">
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Google Maps */}
          <div className="mt-16">
            <AnimatedSection>
              <div className="rounded-xl overflow-hidden shadow-md h-[400px]">
                <iframe
                  src={SITE_CONFIG.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rudra Stay Location"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
