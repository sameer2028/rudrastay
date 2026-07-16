export const SITE_CONFIG = {
  name: "Rudra Stay",
  tagline: "Luxury Stay & Travel",
  description:
    "Experience luxury in the heart of Dehradun. Premium accommodations, curated tour packages, and unforgettable mountain experiences.",
  url: "https://rudrastay.com",
  email: "rudrastay844@gmail.com",
  phone: "+91 84455 49059",
  whatsapp: "+918445549059",
  address: "Second Floor, Khasra No. 25, Bhandar Gaon, Post Office Bhangwantpur, Dehradun – 248009, Police Station Kothal Gate, Uttarakhand.",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Khasra+No.+25,+Bhandar+Gaon,+Bhangwantpur,+Dehradun,+Uttarakhand+248009&t=&z=14&ie=UTF8&iwloc=&output=embed",
  social: {
    instagram: "https://www.instagram.com/rudrastay.in",
    facebook: "https://www.facebook.com/rudrastay.in",
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Rooms", href: "/rooms" },
  { label: "Gallery", href: "/gallery" },
  // { label: "Packages", href: "/packages" },
  // { label: "Budget Trips", href: "/budget-trips" },
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
