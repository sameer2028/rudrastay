import cloudinary
import cloudinary.uploader
from fastapi import UploadFile, HTTPException
import uuid

from app.core.config import settings

# Initialize cloudinary
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)


class CloudinaryService:
    @staticmethod
    async def upload_image(file: UploadFile, folder: str = "rudrastay") -> str:
        """
        Uploads an image to Cloudinary and returns the secure URL.
        """
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image.")

        try:
            # Read file content
            content = await file.read()

            # Upload to Cloudinary
            response = cloudinary.uploader.upload(
                content,
                folder=folder,
                public_id=f"{uuid.uuid4()}",
                resource_type="image",
            )
            return response.get("secure_url")
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Image upload failed: {str(e)}"
            )
        finally:
            await file.seek(0)  # Reset file pointer just in case

    @staticmethod
    async def upload_video(file: UploadFile, folder: str = "rudrastay") -> str:
        """
        Uploads a video to Cloudinary and returns the secure URL.
        """
        if not file.content_type.startswith("video/"):
            raise HTTPException(status_code=400, detail="File must be a video.")

        try:
            content = await file.read()
            response = cloudinary.uploader.upload(
                content,
                folder=folder,
                public_id=f"{uuid.uuid4()}",
                resource_type="video",
                eager=[{"audio_codec": "none"}]
            )
            
            eager_list = response.get("eager", [])
            if eager_list:
                return eager_list[0].get("secure_url")
                
            return response.get("secure_url")
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Video upload failed: {str(e)}"
            )
        finally:
            await file.seek(0)
