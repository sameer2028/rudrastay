import type { Metadata } from "next";
import { Leaf, Eye, Shield, Heart, Mountain, Map, TreePine, Camera } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Rudra Stay — our story, vision, and commitment to delivering world-class luxury hospitality in the heart of Dehradun.",
};

const VALUES = [
  {
    icon: Heart,
    title: "Warm Hospitality",
    description: "Every guest is treated like family, with personalized attention to make your stay truly special.",
  },
  {
    icon: Shield,
    title: "Uncompromised Quality",
    description: "From the linens on your bed to the food on your plate, we never cut corners on quality.",
  },
  {
    icon: Leaf,
    title: "Sustainable Luxury",
    description: "We believe luxury and sustainability go hand in hand. Our practices protect the beauty around us.",
  },
  {
    icon: Mountain,
    title: "Authentic Experiences",
    description: "We connect you with the real Dehradun — its culture, cuisine, and awe-inspiring landscapes.",
  },
];

const ATTRACTIONS = [
  { icon: Map, name: "Rishikesh", distance: "45 km", desc: "Adventure capital with rafting & yoga" },
  { icon: Mountain, name: "Kedarnath", distance: "250 km", desc: "Sacred Dehradun pilgrimage" },
  { icon: TreePine, name: "Valley of Flowers", distance: "300 km", desc: "UNESCO World Heritage Site" },
  { icon: Camera, name: "Mussoorie", distance: "34 km", desc: "Queen of the Hills" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-beige overflow-hidden">
        <div className="container-luxury">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
                Our Story
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-warm-brown mb-6">
                Where Luxury Meets the Mountains
              </h1>
              <p className="text-brown-light text-base md:text-lg leading-relaxed">
                Born from a deep love for the Doon Valley and a passion for exceptional hospitality,
                Rudra Stay was created to offer discerning travelers a sanctuary where they can
                reconnect with nature without compromising on comfort.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/images/gallery/gallery-29.jpeg"
                  alt="Rudra Stay Property"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <span className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
                Since 2024
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-brown mb-6">
                A Journey of Passion
              </h2>
              <div className="space-y-4 text-brown-light leading-relaxed">
                <p>
                  What started as a dream to share the magic of Dehradun with the world
                  has grown into one of the region&apos;s most beloved luxury retreats. Rudra Stay
                  was founded in 2024 by a family of mountain lovers who believed that the
                  Doon Valley deserved a hospitality experience as grand as the peaks themselves.
                </p>
                <p>
                  Over the years, we have welcomed thousands of guests from across India and
                  around the world, each leaving with memories that last a lifetime. Our
                  commitment to excellence, authentic experiences, and heartfelt service
                  remains the cornerstone of everything we do.
                </p>
                <p>
                  Today, Rudra Stay stands as a testament to what happens when you combine
                  passion with purpose — a place where every sunrise over the mountains
                  reminds you why life is beautiful.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding bg-beige">
        <div className="container-luxury">
          <SectionHeading
            subtitle="Our Vision"
            title="Why Choose Rudra Stay"
            description="We don't just offer rooms — we craft experiences that nourish the soul and create memories that last forever."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
                    <value.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-warm-brown mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-brown-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <SectionHeading
            subtitle="Explore"
            title="Nearby Attractions"
            description="Rudra Stay is your perfect basecamp for exploring the wonders of Dehradun."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ATTRACTIONS.map((place, index) => (
              <AnimatedSection key={place.name} delay={index * 0.1}>
                <div className="flex items-start gap-4 p-6 rounded-xl border border-gold-light/20 hover:border-gold/30 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <place.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-warm-brown mb-1">
                      {place.name}
                    </h4>
                    <p className="text-xs text-gold font-medium mb-1">
                      {place.distance} away
                    </p>
                    <p className="text-xs text-brown-light">{place.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
