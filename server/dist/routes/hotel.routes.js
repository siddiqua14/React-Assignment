"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotel_controller_1 = require("../controllers/hotel.controller");
const hotel_middleware_1 = require("../middleware/hotel.middleware");
const hotel_validation_1 = require("../validations/hotel.validation");
const validationErrorHandler_1 = require("../middleware/validationErrorHandler");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
// Set up Multer storage for room images
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const hotelId = req.params.id;
        const roomSlug = req.params.roomSlug;
        if (!hotelId || !roomSlug) {
            return cb(new Error('Hotel ID and Room Slug are required'), '');
        }
        // Define the destination folder for room images
        const destinationPath = path_1.default.resolve(__dirname, '../uploads/rooms');
        // Ensure the directory exists, or create it if it doesn't
        fs_1.default.mkdirSync(destinationPath, { recursive: true });
        // Use the defined folder
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const hotelId = req.params.id;
        const roomSlug = req.params.roomSlug;
        const extension = path_1.default.extname(file.originalname);
        const originalName = path_1.default.basename(file.originalname, extension);
        // Add roomSlug to the filename for clarity
        const filename = `${hotelId}-${roomSlug}-${originalName}${extension}`;
        cb(null, filename); // Store with the specified filename
    }
});
// Hotel creation route with validation
router.post('/hotel', hotel_validation_1.createHotelValidation, // Validation middleware
validationErrorHandler_1.validationErrorHandler, // Handle validation errors
hotel_controller_1.createHotel // Controller for creating hotel
);
// Get hotel by ID or slug
router.get('/hotel/:idOrSlug', hotel_controller_1.getHotelByIdOrSlug);
// Endpoint to fetch all hotels
router.get('/hotels', hotel_controller_1.getAllHotels);
// Update hotel by ID
router.put('/hotel/:id', hotel_validation_1.updateHotelValidation, // Validation middleware for updates
validationErrorHandler_1.validationErrorHandler, // Handle validation errors
hotel_controller_1.updateHotelById // Controller for updating hotel
);
// Upload hotel images
router.post('/images/:id', hotel_middleware_1.upload.array('images', 10), hotel_controller_1.uploadImages);
router.post('/images/:id/:roomSlug', hotel_middleware_1.upload.array('images', 10), hotel_controller_1.uploadRoomImages);
exports.default = router;
