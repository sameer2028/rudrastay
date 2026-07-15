"use client";

import { useState } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import { useGallery } from "@/hooks/useGallery";
import { Loader2 } from "lucide-react";

export default function GalleryPage() {
  const { data: galleryItems, isLoading, error } = useGallery();
  const GALLERY_PHOTOS = galleryItems?.filter(item => item.type === "photo") || [];
  const GALLERY_VIDEOS = galleryItems?.filter(item => item.type === "video") || [];

  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-beige">
        <div className="container-luxury text-center">
          <AnimatedSection>
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
              Visual Journey
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-brown mb-4">
              Our Gallery
            </h1>
            <p className="text-brown-light max-w-2xl mx-auto">
              Explore the beauty of Rudra Stay through our collection of {GALLERY_PHOTOS.length} photos and {GALLERY_VIDEOS.length} videos.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Tabs */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="flex justify-center gap-4 mb-12">
            {(["photos", "videos"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 text-sm font-medium uppercase tracking-wider rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gold text-white shadow-gold"
                    : "bg-beige text-brown-light hover:bg-gold-light/30"
                }`}
              >
                {tab === "photos" ? `Photos (${GALLERY_PHOTOS.length})` : `Videos (${GALLERY_VIDEOS.length})`}
              </button>
            ))}
          </div>

          {activeTab === "photos" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {GALLERY_PHOTOS.map((photo, index) => (
                <AnimatedSection key={index} delay={index * 0.03}>
                  <div
                    onClick={() => setLightboxIndex(index)}
                    className="relative rounded-lg overflow-hidden cursor-pointer group aspect-[4/3]"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || ""}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-300 flex items-end">
                      <p className="p-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY_VIDEOS.map((video, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div
                    onClick={() => setPlayingVideo(index)}
                    className="relative rounded-xl overflow-hidden cursor-pointer group aspect-video shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <video
                      src={video.url}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/50 transition-all duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-7 h-7 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/80 to-transparent">
                      <p className="text-white text-sm font-medium">
                        {video.caption}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Photo Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[80] bg-charcoal/95 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={GALLERY_PHOTOS[lightboxIndex].url}
            alt={GALLERY_PHOTOS[lightboxIndex].caption || ""}
            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-8 text-white/60 text-sm">
            {GALLERY_PHOTOS[lightboxIndex].caption} — {lightboxIndex + 1} / {GALLERY_PHOTOS.length}
          </p>
          {/* Nav arrows */}
          <button
            className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % GALLERY_PHOTOS.length);
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Video Lightbox */}
      {playingVideo !== null && (
        <div
          className="fixed inset-0 z-[80] bg-charcoal/95 flex items-center justify-center p-4"
          onClick={() => setPlayingVideo(null)}
        >
          <button
            onClick={() => setPlayingVideo(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={GALLERY_VIDEOS[playingVideo].url}
              controls
              autoPlay
              className="w-full h-full object-contain bg-black"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="absolute bottom-8 text-white/60 text-sm">
            {GALLERY_VIDEOS[playingVideo].caption} — Video {playingVideo + 1} / {GALLERY_VIDEOS.length}
          </p>
          {/* Nav arrows */}
          <button
            className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setPlayingVideo((playingVideo - 1 + GALLERY_VIDEOS.length) % GALLERY_VIDEOS.length);
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setPlayingVideo((playingVideo + 1) % GALLERY_VIDEOS.length);
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      <CTASection />
    </>
  );
}
