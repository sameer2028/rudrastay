from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./rudrastay.db"
    DATABASE_URL_SYNC: str = "sqlite:///./rudrastay.db"

    # JWT
    JWT_SECRET_KEY: str = "your-super-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Cloudinary
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""

    # Resend
    RESEND_API_KEY: str = ""

    # Admin
    ADMIN_EMAIL: str = "admin@rudrastay.com"
    ADMIN_PASSWORD: str = "admin123"
    ADMIN_NOTIFICATION_EMAIL: str = "bookings@rudrastay.com"

    # CORS
    CORS_ORIGINS: str = "http://localhost:3000,https://rudrastay.com"

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": True,
    }


settings = Settings()
