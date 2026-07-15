import asyncio
from app.db.database import AsyncSessionLocal
from app.models.room import Room
from app.models.package import Package
from app.models.budget_trip import BudgetTrip

async def seed_data():
    async with AsyncSessionLocal() as db:
        from sqlalchemy import select
        # Seed Budget Trips
        result = await db.execute(select(BudgetTrip).limit(1))
        if not result.scalar_one_or_none():
            print("Seeding Budget Trips...")
            trips = [
                BudgetTrip(
                    name="Haridwar Express",
                    slug="haridwar-express",
                    description="A quick spiritual getaway to Haridwar.",
                    price_estimate=5500.0,
                    category="under-10k",
                    images=["/images/gallery/gallery-4.jpeg"],
                    highlights=["1 Night Stay", "Ganga Aarti", "Temple Tour"],
                    is_featured=True
                ),
                BudgetTrip(
                    name="Mussoorie Escape",
                    slug="mussoorie-escape",
                    description="A refreshing trip to the Queen of Hills.",
                    price_estimate=12000.0,
                    category="10k-20k",
                    images=["/images/gallery/gallery-30.jpeg"],
                    highlights=["3 Nights Stay", "Mall Road", "Nature Walk"],
                    is_featured=True
                )
            ]
            db.add_all(trips)

        # Check if rooms exist
        result = await db.execute(select(Room).limit(1))
        if not result.scalar_one_or_none():
            print("Seeding Rooms...")
            rooms = [
            Room(
                name="Himalayan Suite",
                slug="himalayan-suite",
                description="Experience the ultimate luxury with panoramic mountain views.",
                price_per_night=5000.0,
                capacity=3,
                images=["/images/rooms/room-1.jpeg", "/images/rooms/room-2.jpeg"],
                amenities=["Mountain View", "Balcony", "Bathtub", "Free WiFi", "King Size Bed", "400 sq.ft"],
                is_featured=True,
                is_available=True
            ),
            Room(
                name="Premium Valley View",
                slug="premium-valley-view",
                description="Wake up to the serene valley views from your private balcony.",
                price_per_night=4000.0,
                capacity=2,
                images=["/images/rooms/room-2.jpeg", "/images/rooms/room-3.jpeg"],
                amenities=["Valley View", "Balcony", "Free WiFi", "TV", "Queen Size Bed", "350 sq.ft"],
                is_featured=True,
                is_available=True
            ),
            Room(
                name="Cozy Deluxe",
                slug="cozy-deluxe",
                description="Perfect for couples seeking a warm and comfortable stay.",
                price_per_night=3000.0,
                capacity=2,
                images=["/images/rooms/room-3.jpeg"],
                amenities=["Free WiFi", "TV", "Room Service", "Queen Size Bed", "300 sq.ft"],
                is_featured=False,
                is_available=True
            )
        ]
        
        # Check if packages exist
        result = await db.execute(select(Package).limit(1))
        if not result.scalar_one_or_none():
            print("Seeding Packages...")
            packages = [
                Package(
                    name="Weekend Escape",
                    slug="weekend-escape",
                    description="A quick getaway to rejuvenate your senses in the mountains.",
                    price=12000.0,
                    duration_days=3,
                    images=["/images/gallery/gallery-2.jpeg"],
                    inclusions=["Accommodation", "Breakfast & Dinner", "Local Sightseeing"],
                    is_featured=True
                )
            ]
            db.add_all(packages)
            
        # Check if reviews exist
        from app.models.review import Review
        result = await db.execute(select(Review).limit(1))
        if not result.scalar_one_or_none():
            print("Seeding Reviews...")
            reviews = [
                Review(
                    guest_name="Priya Sharma",
                    guest_location="Delhi",
                    rating=5,
                    content="An absolutely magical experience! The mountain views from our suite were breathtaking.",
                    is_featured=True
                ),
                Review(
                    guest_name="Rajesh Mehra",
                    guest_location="Mumbai",
                    rating=5,
                    content="Rudra Stay exceeded every expectation. The blend of luxury and natural beauty is unmatched.",
                    is_featured=True
                )
            ]
            db.add_all(reviews)

        # Check if gallery items exist
        from app.models.gallery import GalleryItem
        result = await db.execute(select(GalleryItem).limit(1))
        if not result.scalar_one_or_none():
            print("Seeding Gallery...")
            gallery_items = [
                GalleryItem(
                    caption="Luxury Bedroom",
                    type="photo",
                    url="/images/rooms/room-1.jpeg"
                ),
                GalleryItem(
                    caption="Mountain View Balcony",
                    type="photo",
                    url="/images/gallery/gallery-2.jpeg"
                ),
                GalleryItem(
                    caption="River Rafting",
                    type="photo",
                    url="/images/rooms/room-4.jpeg"
                ),
                GalleryItem(
                    caption="Dining Area",
                    type="photo",
                    url="/images/gallery/gallery-33.jpeg"
                )
            ]
            db.add_all(gallery_items)

        await db.commit()
        print("Seed complete!")

if __name__ == "__main__":
    asyncio.run(seed_data())
