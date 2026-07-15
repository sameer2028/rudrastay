const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'frontend/public/images/gallery');
const roomsDir = path.join(__dirname, 'frontend/public/images/rooms');
const heroDir = path.join(__dirname, 'frontend/public/images/hero');
const videosDir = path.join(__dirname, 'frontend/public/videos');

// Helper to rename files sequentially
function renameSequentially(dir, prefix) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => !f.startsWith('.'));
    files.forEach((file, index) => {
        const ext = path.extname(file);
        const oldPath = path.join(dir, file);
        const newPath = path.join(dir, `${prefix}-${index + 1}${ext}`);
        fs.renameSync(oldPath, newPath);
    });
}

// Rename gallery and videos
renameSequentially(galleryDir, 'gallery');
renameSequentially(videosDir, 'video');

// Take first 4 gallery images and move to rooms
const galleryFiles = fs.readdirSync(galleryDir).filter(f => !f.startsWith('.'));
for (let i = 0; i < Math.min(4, galleryFiles.length); i++) {
    const file = galleryFiles[i];
    const oldPath = path.join(galleryDir, file);
    const newPath = path.join(roomsDir, `room-${i + 1}${path.extname(file)}`);
    fs.renameSync(oldPath, newPath);
}

// Take 1 gallery image for hero
const remainingGallery = fs.readdirSync(galleryDir).filter(f => !f.startsWith('.'));
if (remainingGallery.length > 0) {
    const file = remainingGallery[0];
    const oldPath = path.join(galleryDir, file);
    const newPath = path.join(heroDir, `hero-bg${path.extname(file)}`);
    fs.renameSync(oldPath, newPath);
}

console.log("Renamed successfully.");
