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
