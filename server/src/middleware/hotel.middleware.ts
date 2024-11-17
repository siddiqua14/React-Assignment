import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Multer storage configuration

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = req.params.roomSlug ? 'rooms' : '';
        const destinationPath = path.join(__dirname, `../uploads/${folder}`);
        fs.mkdirSync(destinationPath, { recursive: true });
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const hotelId = req.params.id || req.body.id;
        const roomSlug = req.params.roomSlug;
        const extension = path.extname(file.originalname);
        const filename = roomSlug ? `${hotelId}-${roomSlug}${extension}` : `${hotelId}${extension}`;
        cb(null, filename);
    }
});

export const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });