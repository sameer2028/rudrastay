export const SITE_CONFIG = {
  name: "Rudra Stay",
  tagline: "Luxury Stay & Travel",
  description:
    "Experience luxury in the heart of Uttarakhand. Premium accommodations, curated tour packages, and unforgettable mountain experiences.",
  url: "https://rudrastay.com",
  email: "info@rudrastay.com",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  address: "Near Badrinath Highway, Uttarakhand, India",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3442.5!2d79.5!3d30.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDI0JzAwLjAiTiA3OcKwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1",
  social: {
    instagram: "https://instagram.com/rudrastay",
    facebook: "https://facebook.com/rudrastay",
    twitter: "https://twitter.com/rudrastay",
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Rooms", href: "/rooms" },
  { label: "Gallery", href: "/gallery" },
  { label: "Packages", href: "/packages" },
  { label: "Budget Trips", href: "/budget-trips" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export const AMENITY_ICONS: Record<string, string> = {
  "Wi-Fi": "wifi",
  "Air Conditioning": "snowflake",
  "Room Service": "concierge-bell",
  "Parking": "car",
  "Restaurant": "utensils",
  "Spa": "sparkles",
  "Pool": "waves",
  "Gym": "dumbbell",
  "Laundry": "shirt",
  "TV": "tv",
  "Hot Water": "flame",
  "Mountain View": "mountain",
  "Balcony": "door-open",
  "Fireplace": "flame",
  "Kitchen": "chef-hat",
  "Pet Friendly": "paw-print",
};

export const BUDGET_CATEGORIES = [
  { label: "Under ₹10K", value: "under-10k" },
  { label: "₹10K–20K", value: "10k-20k" },
  { label: "₹20K+", value: "20k-plus" },
  { label: "Family Trips", value: "family" },
  { label: "Honeymoon", value: "honeymoon" },
  { label: "Luxury", value: "luxury" },
  { label: "Backpacking", value: "backpacking" },
];

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
