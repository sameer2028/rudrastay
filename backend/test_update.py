import asyncio
from httpx import AsyncClient

async def test_update():
    async with AsyncClient(base_url="http://localhost:8000/api/v1") as client:
        # We don't have an admin token, but the endpoint might be protected.
        # Let's check auth.py or rooms.py
        # Actually, in rooms.py: admin=Depends(get_current_admin)
        # I can't easily bypass it without a token.
        pass

if __name__ == "__main__":
    asyncio.run(test_update())
