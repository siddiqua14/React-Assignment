"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRoomImagesValidation = exports.updateHotelValidation = exports.createHotelValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createHotelValidation = [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('description').isString().withMessage('Description must be a string'),
    (0, express_validator_1.body)('guestCount').isInt({ min: 1 }).withMessage('Guest count must be at least 1'),
    (0, express_validator_1.body)('bedroomCount').isInt({ min: 1 }).withMessage('Bedroom count must be at least 1'),
    (0, express_validator_1.body)('bathroomCount').isInt({ min: 1 }).withMessage('Bathroom count must be at least 1'),
    (0, express_validator_1.body)('amenities').isArray().withMessage('Amenities must be an array'),
    (0, express_validator_1.body)('host').notEmpty().withMessage('Host name is required'),
    (0, express_validator_1.body)('address').notEmpty().withMessage('Address is required'),
    (0, express_validator_1.body)('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
    (0, express_validator_1.body)('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
    (0, express_validator_1.body)('rooms').isArray().withMessage('Rooms must be an array'),
    (0, express_validator_1.body)('rooms.*.roomTitle').notEmpty().withMessage('Each room must have a title'),
    (0, express_validator_1.body)('rooms.*.bedroomCount').isInt({ min: 1 }).withMessage('Each room must have at least 1 bedroom')
];
exports.updateHotelValidation = [
    (0, express_validator_1.body)('title').optional().notEmpty().withMessage('Title must not be empty when provided'),
    (0, express_validator_1.body)('description').optional().isString().withMessage('Description must be a string'),
    (0, express_validator_1.body)('guestCount').optional().isInt({ min: 1 }).withMessage('Guest count must be at least 1'),
    (0, express_validator_1.body)('bedroomCount').optional().isInt({ min: 1 }).withMessage('Bedroom count must be at least 1'),
    (0, express_validator_1.body)('bathroomCount').optional().isInt({ min: 1 }).withMessage('Bathroom count must be at least 1'),
    (0, express_validator_1.body)('amenities').optional().isArray().withMessage('Amenities must be an array'),
    (0, express_validator_1.body)('host').optional().notEmpty().withMessage('Host name is required'),
    (0, express_validator_1.body)('address').optional().notEmpty().withMessage('Address is required'),
    (0, express_validator_1.body)('latitude').optional().isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
    (0, express_validator_1.body)('longitude').optional().isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180')
];
exports.uploadRoomImagesValidation = [
    (0, express_validator_1.param)('id').notEmpty().withMessage('Hotel ID is required'),
    (0, express_validator_1.param)('roomSlug').notEmpty().withMessage('Room slug is required')
];
