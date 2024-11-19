import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure storage for hotel images
const hotelImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the destination folder for hotel images
        const destinationPath = path.join(__dirname, '../../uploads/hotels');
        
        // Ensure the directory exists
        fs.mkdirSync(destinationPath, { recursive: true });
        
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const { id } = req.params;
        const extension = path.extname(file.originalname);
        const filename = `${id}-${Date.now()}${extension}`;
        cb(null, filename);
    }
});
// Create multer upload instance for hotel images
export const upload = multer({ storage: hotelImageStorage });

const roomImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const hotelId = req.params.id;
        const roomSlug = req.params.roomSlug;

        if (!hotelId || !roomSlug) {
            return cb(new Error('Hotel ID and Room Slug are required'), '');
        }

        // Define the destination folder for room images under 'uploads/hotels'
        const destinationPath = path.resolve(__dirname, '../uploads/rooms'); // Use same folder as hotel images

        // Ensure the directory exists, or create it if it doesn't
        fs.mkdirSync(destinationPath, { recursive: true });

        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const hotelId = req.params.id;
        const roomSlug = req.params.roomSlug;

        const extension = path.extname(file.originalname);
        const originalName = path.basename(file.originalname, extension);

        // Add roomSlug to the filename for clarity
        const filename = `${hotelId}-${roomSlug}-${originalName}${extension}`;
        cb(null, filename); // Store with the specified filename
    }
});

// Create multer upload instance for room images
export const roomUpload = multer({ storage: roomImageStorage });