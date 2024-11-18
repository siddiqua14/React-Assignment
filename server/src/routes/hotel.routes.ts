import { Router } from 'express';
import { createHotel, getHotelByIdOrSlug, updateHotelById, getAllHotels, uploadImages, uploadRoomImages } from '../controllers/hotel.controller';
import { upload } from '../middleware/hotel.middleware';
import { createHotelValidation, updateHotelValidation, uploadRoomImagesValidation } from '../validations/hotel.validation';
import { validationErrorHandler } from '../middleware/validationErrorHandler';

import path from 'path';
import fs from 'fs';
import multer from 'multer';

const router = Router();

// Set up Multer storage for room images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const hotelId = req.params.id;
        const roomSlug = req.params.roomSlug;

        if (!hotelId || !roomSlug) {
            return cb(new Error('Hotel ID and Room Slug are required'), '');
        }

        // Define the destination folder for room images
        const destinationPath = path.join(__dirname, `../uploads/rooms`);

        // Ensure the directory exists
        fs.mkdirSync(destinationPath, { recursive: true });

        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const hotelId = req.params.id;
        const roomSlug = req.params.roomSlug;

        const extension = path.extname(file.originalname);
        const originalName = path.basename(file.originalname, extension);

        // Add roomSlug to the filename if it's a room image
        const filename = `${hotelId}-${roomSlug}-${originalName}${extension}`;
        cb(null, filename);
    }
});

// Hotel creation route with validation
router.post(
    '/hotel',
    createHotelValidation, // Validation middleware
    validationErrorHandler, // Handle validation errors
    createHotel             // Controller for creating hotel
);

// Get hotel by ID or slug
router.get('/hotel/:idOrSlug', getHotelByIdOrSlug);

// Endpoint to fetch all hotels
router.get('/hotels', getAllHotels)

// Update hotel by ID
router.put(
    '/hotel/:id',
    updateHotelValidation,  // Validation middleware for updates
    validationErrorHandler,  // Handle validation errors
    updateHotelById          // Controller for updating hotel
);

// Upload hotel images
router.post('/images/:id', upload.array('images', 10), uploadImages);

// Upload room images with validation
router.post(
    '/room/images/:id/:roomSlug',
    uploadRoomImagesValidation,  // Validation for room images
    validationErrorHandler,      // Handle validation errors
    upload.array('images', 10),   // Upload middleware
    uploadRoomImages             // Controller for uploading room images
);

//router.post('/hotel', createHotel);
//router.get('/hotel/:idOrSlug', getHotelByIdOrSlug);
//router.put('/hotel/:id', updateHotelById);
//router.post('/images/:id', upload.array('images', 10), uploadImages);
//router.post('/images/:id/:roomSlug', upload.array('images', 10), uploadRoomImages);
export default router;
