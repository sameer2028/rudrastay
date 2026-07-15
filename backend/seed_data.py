import asyncio
from app.db.database import AsyncSessionLocal
from app.services.package import PackageService
from app.schemas.package import PackageCreate
from app.services.budget_trip import BudgetTripService
from app.schemas.budget_trip import BudgetTripCreate
from sqlalchemy import text

async def seed():
    async with AsyncSessionLocal() as db:
        # Clear existing data
        await db.execute(text("DELETE FROM packages"))
        await db.execute(text("DELETE FROM budget_trips"))
        await db.commit()

        pkg_service = PackageService(db)
        bt_service = BudgetTripService(db)
        
        # Seed Packages
        pkg1 = PackageCreate(
            name="Himalayan Luxury Escape",
            description="A premium 5-day getaway featuring 5-star accommodations, private guided treks, spa treatments, and exclusive dining experiences overlooking the majestic peaks. Perfect for couples seeking a blend of adventure and utmost comfort.",
            duration_days=5,
            price=35000,
            images=["/images/gallery/gallery-27.jpeg", "/images/gallery/gallery-28.jpeg"],
            inclusions=["5-Star Accommodation", "Private Helicopter Tour", "Daily Spa Sessions", "All Gourmet Meals Included", "Private Chauffeur"],
            is_featured=True
        )
        
        pkg2 = PackageCreate(
            name="Spiritual Journey & Yoga Retreat",
            description="Immerse yourself in a 7-day curated spiritual journey. Includes daily private yoga sessions by the Ganges, VIP access to local temples, meditation workshops, and organic Ayurvedic meals.",
            duration_days=7,
            price=28000,
            images=["/images/gallery/gallery-31.jpeg"],
            inclusions=["Luxury Ashram Stay", "Private Yoga Instructor", "VIP Temple Darshan", "Ayurvedic Meals", "Airport Transfers"],
            is_featured=False
        )
        
        await pkg_service.create(pkg1)
        await pkg_service.create(pkg2)

        # Seed Budget Trips
        bt1 = BudgetTripCreate(
            name="Backpacker's Rishikesh Weekend",
            category="under-5000",
            description="Experience the thrill of Rishikesh without breaking the bank. Stay in a vibrant hostel, enjoy white-water rafting, and explore the local cafes. Ideal for solo travelers and young groups.",
            price_estimate=4500,
            images=["/images/gallery/gallery-32.jpeg"],
            highlights=["Hostel Accommodation", "16km River Rafting", "Guided Waterfall Trek", "Scooty Rental Included"],
            is_featured=True
        )

        bt2 = BudgetTripCreate(
            name="Auli Snow Adventure Express",
            category="under-10000",
            description="A quick, budget-friendly dash to the snowy slopes of Auli. Includes shared transport from Rishikesh, cozy homestay accommodation, and basic skiing lessons.",
            price_estimate=9500,
            images=["/images/gallery/gallery-33.jpeg"],
            highlights=["Shared Transport from Rishikesh", "Cozy Homestay", "Skiing Equipment Rental", "Local Guide"],
            is_featured=False
        )
        
        await bt_service.create(bt1)
        await bt_service.create(bt2)
        
        await db.commit()
        
        print("Successfully seeded 2 Packages and 2 Budget Trips!")

if __name__ == "__main__":
    asyncio.run(seed())
