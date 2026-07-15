import asyncio
from sqlalchemy.future import select
from app.db.database import async_session_maker
from app.models.contact_message import ContactMessage

async def main():
    async with async_session_maker() as session:
        result = await session.execute(select(ContactMessage))
        messages = result.scalars().all()
        for m in messages:
            print(f"[{m.id}] {m.name}: {m.message}")

if __name__ == "__main__":
    asyncio.run(main())
