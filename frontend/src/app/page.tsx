import HeroSection from "@/components/sections/HeroSection";
import FeaturedRooms from "@/components/sections/FeaturedRooms";
import AboutPreview from "@/components/sections/AboutPreview";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import PackagesPreview from "@/components/sections/PackagesPreview";
import GalleryPreview from "@/components/sections/GalleryPreview";
import ReviewsSection from "@/components/sections/ReviewsSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedRooms />
      <AboutPreview />
      <AmenitiesSection />
      <PackagesPreview />
      <GalleryPreview />
      <ReviewsSection />
      <CTASection />
    </>
  );
}
