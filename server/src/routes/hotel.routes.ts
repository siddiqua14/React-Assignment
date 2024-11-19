import { Router } from 'express';
import { createHotel, getHotelByIdOrSlug, updateHotelById, getAllHotels, uploadImages, uploadRoomImages } from '../controllers/hotel.controller';
import { upload , roomUpload } from '../middleware/hotel.middleware';
import { createHotelValidation, updateHotelValidation, uploadRoomImagesValidation } from '../validations/hotel.validation';
import { validationErrorHandler } from '../middleware/validationErrorHandler';

import path from 'path';
import fs from 'fs';
import multer from 'multer';

const router = Router();


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
router.post('/images/:id/:roomSlug', roomUpload.array('images', 10), uploadRoomImages);

export default router;
