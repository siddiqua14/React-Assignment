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
        const destinationPath = path_1.default.join(__dirname, `../uploads/rooms`);
        // Ensure the directory exists
        fs_1.default.mkdirSync(destinationPath, { recursive: true });
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const hotelId = req.params.id;
        const roomSlug = req.params.roomSlug;
        const extension = path_1.default.extname(file.originalname);
        const originalName = path_1.default.basename(file.originalname, extension);
        // Add roomSlug to the filename if it's a room image
        const filename = `${hotelId}-${roomSlug}-${originalName}${extension}`;
        cb(null, filename);
    }
});
// Hotel creation route with validation
router.post('/hotel', hotel_validation_1.createHotelValidation, // Validation middleware
validationErrorHandler_1.validationErrorHandler, // Handle validation errors
hotel_controller_1.createHotel // Controller for creating hotel
);
// Get hotel by ID or slug
router.get('/hotel/:idOrSlug', hotel_controller_1.getHotelByIdOrSlug);
// Update hotel by ID
router.put('/hotel/:id', hotel_validation_1.updateHotelValidation, // Validation middleware for updates
validationErrorHandler_1.validationErrorHandler, // Handle validation errors
hotel_controller_1.updateHotelById // Controller for updating hotel
);
// Upload hotel images
router.post('/images/:id', hotel_middleware_1.upload.array('images', 10), hotel_controller_1.uploadImages);
// Upload room images with validation
router.post('/room/images/:id/:roomSlug', hotel_validation_1.uploadRoomImagesValidation, // Validation for room images
validationErrorHandler_1.validationErrorHandler, // Handle validation errors
hotel_middleware_1.upload.array('images', 10), // Upload middleware
hotel_controller_1.uploadRoomImages // Controller for uploading room images
);
//router.post('/hotel', createHotel);
//router.get('/hotel/:idOrSlug', getHotelByIdOrSlug);
//router.put('/hotel/:id', updateHotelById);
//router.post('/images/:id', upload.array('images', 10), uploadImages);
//router.post('/images/:id/:roomSlug', upload.array('images', 10), uploadRoomImages);
exports.default = router;
