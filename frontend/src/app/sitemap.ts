import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://rudrastays.in";

  // Base static routes
  const routes = [
    "",
    "/about",
    "/contact",
    "/rooms",
    "/packages",
    "/budget-trips",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" as const : "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  try {
    // Dynamic Routes (Rooms)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
    
    // Fetch rooms (ignoring cache so it builds fresh if we use ISR)
    const roomsRes = await fetch(`${apiUrl}/rooms/featured`, { next: { revalidate: 3600 } });
    if (roomsRes.ok) {
      const roomsData = await roomsRes.json();
      if (roomsData.data) {
        const roomRoutes = roomsData.data.map((room: any) => ({
          url: `${baseUrl}/rooms/${room.id}`,
          lastModified: new Date(room.updated_at || new Date()),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }));
        routes.push(...roomRoutes);
      }
    }

    // Fetch packages
    const packagesRes = await fetch(`${apiUrl}/packages/featured`, { next: { revalidate: 3600 } });
    if (packagesRes.ok) {
      const packagesData = await packagesRes.json();
      if (packagesData.data) {
        const packageRoutes = packagesData.data.map((pkg: any) => ({
          url: `${baseUrl}/packages/${pkg.id}`,
          lastModified: new Date(pkg.updated_at || new Date()),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }));
        routes.push(...packageRoutes);
      }
    }
  } catch (error) {
    console.warn("Could not fetch dynamic routes for sitemap. Using static routes only.");
  }

  return routes;
}
