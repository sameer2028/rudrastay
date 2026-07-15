import asyncio
from app.db.database import AsyncSessionLocal
from app.services.package import PackageService
from app.schemas.package import PackageCreate
from app.services.budget_trip import BudgetTripService
from app.schemas.budget_trip import BudgetTripCreate
from app.services.room import RoomService
from app.schemas.room import RoomCreate
from sqlalchemy import text

async def seed():
    async with AsyncSessionLocal() as db:
        # Clear existing data
        await db.execute(text("DELETE FROM rooms"))
        await db.execute(text("DELETE FROM packages"))
        await db.execute(text("DELETE FROM budget_trips"))
        await db.commit()

        room_service = RoomService(db)
        pkg_service = PackageService(db)
        bt_service = BudgetTripService(db)
        
        # Seed Rooms
        room1 = RoomCreate(
            name="Premium Doon Valley View Room",
            description="Experience the tranquility of Dehradun with panoramic views of the Doon Valley right from your private balcony. This room features plush bedding, modern amenities, and a serene atmosphere perfect for couples or solo travelers.",
            capacity=2,
            price_per_night=4500,
            amenities=["King Bed", "Private Balcony", "Valley View", "Free Wi-Fi", "Smart TV", "Mini Fridge"],
            images=["/images/room-deluxe.png", "/images/gallery/gallery-29.jpeg"],
            is_featured=True,
        )

        room2 = RoomCreate(
            name="Executive Pine Forest Suite",
            description="Enveloped by the lush pine forests of Dehradun, this spacious suite offers the ultimate luxury retreat. Wake up to the sounds of nature, enjoy premium room service, and relax in an expansive living area.",
            capacity=3,
            price_per_night=5000,
            amenities=["King Bed", "Forest View", "Living Area", "Bathtub", "Free Wi-Fi", "Smart TV", "Coffee Maker"],
            images=["/images/room-suite.png", "/images/gallery/gallery-24.jpeg"],
            is_featured=True,
        )

        await room_service.create(room1)
        await room_service.create(room2)

        # Seed Packages
        pkg1 = PackageCreate(
            name="Dehradun Heritage & Nature Trail",
            description="A premium 3-day getaway exploring the best of Dehradun. Visit the architectural marvel of the Forest Research Institute, the mystical Robber's Cave, and the sacred Tapkeshwar Temple. Includes luxury stay at Rudra Stay and guided tours.",
            duration_days=3,
            price=15000,
            images=["/images/gallery/gallery-14.jpeg", "/images/gallery/gallery-27.jpeg"],
            inclusions=["Luxury Accommodation", "Guided City Tour", "All Entry Passes", "Daily Breakfast & Dinner", "Private Cab for Sightseeing"],
            is_featured=True
        )
        
        pkg2 = PackageCreate(
            name="Mussoorie & Landour Weekend Escapade",
            description="Use Rudra Stay as your luxurious basecamp in Dehradun while exploring the Queen of Hills. This 4-day package includes day trips to Mussoorie's Mall Road, Kempty Falls, and the serene baked-goods haven of Landour.",
            duration_days=4,
            price=22000,
            images=["/images/gallery/gallery-28.jpeg"],
            inclusions=["Luxury Stay in Dehradun", "Round-trip to Mussoorie", "Guided Landour Heritage Walk", "Meals Included", "Welcome Drinks"],
            is_featured=False
        )
        
        await pkg_service.create(pkg1)
        await pkg_service.create(pkg2)

        # Seed Budget Trips
        bt1 = BudgetTripCreate(
            name="Doon Valley Backpacker's Trek",
            category="under-5000",
            description="Experience the adventurous side of Dehradun. Trek to Shikhar Fall, enjoy cafe hopping on Rajpur Road, and witness breathtaking sunsets. Ideal for solo travelers and young groups looking for affordable thrills.",
            price_estimate=4500,
            images=["/images/gallery/gallery-32.jpeg"],
            highlights=["Guided Shikhar Fall Trek", "Rajpur Road Cafe Tour", "Budget Accommodation", "Local Transport Pass"],
            is_featured=True
        )

        bt2 = BudgetTripCreate(
            name="Sahastradhara & Maldevta Adventure",
            category="under-5000",
            description="A quick, budget-friendly dash to the outskirts of Dehradun. Includes dipping in the famous sulphur springs of Sahastradhara and riverside camping/exploring in the pristine Maldevta valley.",
            price_estimate=3500,
            images=["/images/gallery/gallery-33.jpeg"],
            highlights=["Sahastradhara Entry", "Maldevta Riverside Visit", "Scooty Rental Included", "Budget Stay"],
            is_featured=False
        )
        
        await bt_service.create(bt1)
        await bt_service.create(bt2)
        
        await db.commit()
        
        print("Successfully seeded 2 Rooms, 2 Packages, and 2 Budget Trips for Dehradun!")

if __name__ == "__main__":
    asyncio.run(seed())
