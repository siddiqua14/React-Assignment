import { body, param } from 'express-validator';

export const createHotelValidation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').isString().withMessage('Description must be a string'),
    body('guestCount').isInt({ min: 1 }).withMessage('Guest count must be at least 1'),
    body('bedroomCount').isInt({ min: 1 }).withMessage('Bedroom count must be at least 1'),
    body('bathroomCount').isInt({ min: 1 }).withMessage('Bathroom count must be at least 1'),
    body('amenities').isArray().withMessage('Amenities must be an array'),
    body('host').notEmpty().withMessage('Host name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
    body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
    body('rooms').isArray().withMessage('Rooms must be an array'),
    body('rooms.*.roomTitle').notEmpty().withMessage('Each room must have a title'),
    body('rooms.*.bedroomCount').isInt({ min: 1 }).withMessage('Each room must have at least 1 bedroom')
];

export const updateHotelValidation = [
    body('title').optional().notEmpty().withMessage('Title must not be empty when provided'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('guestCount').optional().isInt({ min: 1 }).withMessage('Guest count must be at least 1'),
    body('bedroomCount').optional().isInt({ min: 1 }).withMessage('Bedroom count must be at least 1'),
    body('bathroomCount').optional().isInt({ min: 1 }).withMessage('Bathroom count must be at least 1'),
    body('amenities').optional().isArray().withMessage('Amenities must be an array'),
    body('host').optional().notEmpty().withMessage('Host name is required'),
    body('address').optional().notEmpty().withMessage('Address is required'),
    body('latitude').optional().isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
    body('longitude').optional().isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180')
];

export const uploadRoomImagesValidation = [
    param('id').notEmpty().withMessage('Hotel ID is required'),
    param('roomSlug').notEmpty().withMessage('Room slug is required')
];
