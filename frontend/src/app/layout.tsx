import type { Metadata } from "next";
import { Playfair_Display, Inter, Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QueryProvider from "@/providers/QueryProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-price",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rudrastays.in"),
  title: {
    default: "Rudra Stay — Luxury Stay & Travel in Dehradun",
    template: "%s | Rudra Stay",
  },
  description:
    "Experience luxury in the heart of Dehradun. Premium accommodations, curated tour packages, and unforgettable mountain experiences at Rudra Stay.",
  keywords: [
    "Rudra Stay",
    "luxury hotel Dehradun",
    "hotel booking",
    "Dehradun stays",
    "mountain resort",
    "tour packages Dehradun",
    "budget trips India",
  ],
  openGraph: {
    title: "Rudra Stay — Luxury Stay & Travel in Dehradun",
    description:
      "Premium accommodations and curated tour packages in Dehradun.",
    url: "https://rudrastay.com",
    siteName: "Rudra Stay",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudra Stay — Luxury Stay & Travel",
    description:
      "Experience luxury in the heart of Dehradun.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${outfit.variable}`}
    >
      <body>
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
