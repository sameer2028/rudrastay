from fastapi import APIRouter, Depends, UploadFile, File, Form
from app.core.dependencies import get_current_admin
from app.services.cloudinary_service import CloudinaryService

router = APIRouter(prefix="/upload", tags=["Upload"])

@router.post("/image", status_code=201)
async def upload_image(
    file: UploadFile = File(...),
    folder: str = Form("rudrastay/images"),
    admin=Depends(get_current_admin),
):
    """
    Upload an image to Cloudinary. Returns the public URL.
    Requires Admin privileges.
    """
    url = await CloudinaryService.upload_image(file, folder=folder)
    return {
        "success": True,
        "message": "Image uploaded successfully",
        "url": url,
    }


@router.post("/video", status_code=201)
async def upload_video(
    file: UploadFile = File(...),
    folder: str = Form("rudrastay/videos"),
    admin=Depends(get_current_admin),
):
    """
    Upload a video to Cloudinary. Returns the public URL.
    Requires Admin privileges.
    """
    url = await CloudinaryService.upload_video(file, folder=folder)
    return {
        "success": True,
        "message": "Video uploaded successfully",
        "url": url,
    }
