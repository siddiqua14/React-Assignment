import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import slugify from 'slugify';
import { Hotel } from '../models/hotel.types';
import { validationResult } from 'express-validator';

const dataPath = path.resolve(__dirname, '../data');
// Helper to construct file path
const getHotelFilePath = (id: string): string => {
    return path.join(dataPath, `${id}.json`);
};

// Controller function for creating a hotel
export const createHotel = (req: Request, res: Response): void => {
    const { title } = req.body;

    const newHotel: Hotel = {
        ...req.body,
        id: new Date().getTime().toString(),
        slug: slugify(title, { lower: true }),
        rooms: req.body.rooms || []
    };

    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath, { recursive: true });
    }

    fs.writeFileSync(`${dataPath}/${newHotel.id}.json`, JSON.stringify(newHotel, null, 2));
    res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel });
};
// Helper to get hotel by slug
const getHotelBySlug = (slug: string): Hotel | null => {
    const files = fs.readdirSync(dataPath);
    for (const file of files) {
        const hotelData = fs.readFileSync(path.join(dataPath, file), 'utf-8');
        const hotel: Hotel = JSON.parse(hotelData);
        if (hotel.slug === slug) {
            return hotel;
        }
    }
    return null;
};
// Controller function to get hotel by ID or slug
export const getHotelByIdOrSlug = (req: Request, res: Response): any => {
    const { idOrSlug } = req.params;

    // Attempt to fetch hotel by numeric ID first
    const filePath = getHotelFilePath(idOrSlug);
    if (fs.existsSync(filePath)) {
        try {
            const hotelData = fs.readFileSync(filePath, 'utf-8');
            const hotel = JSON.parse(hotelData);
            return res.status(200).json(hotel);
        } catch (error) {
            console.error('Error reading hotel data by ID:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // If no file was found by ID, attempt to fetch by slug
    const hotel = getHotelBySlug(idOrSlug);
    if (hotel) {
        return res.status(200).json(hotel);
    }
    return res.status(404).json({ message: 'Hotel not found' });
};
// Updated function to handle both slug and hotelId
export const getHotelBySlugAndId = (req: Request, res: Response): any => {
    const { slug, hotelId } = req.params;

    // Attempt to fetch hotel by numeric hotelId first
    const filePath = getHotelFilePath(hotelId);
    if (fs.existsSync(filePath)) {
        try {
            const hotelData = fs.readFileSync(filePath, 'utf-8');
            const hotel = JSON.parse(hotelData);
            return res.status(200).json(hotel);
        } catch (error) {
            console.error('Error reading hotel data by ID:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // If no file was found by hotelId, attempt to fetch by slug
    const hotel = getHotelBySlug(slug);
    if (hotel) {
        return res.status(200).json(hotel);
    }

    // If no hotel is found by either hotelId or slug
    return res.status(404).json({ message: 'Hotel not found' });
};

// Controller function to get all hotels
export const getAllHotels = (req: Request, res: Response): any => {
    try {
        const files = fs.readdirSync(dataPath);
        const allHotels: Hotel[] = [];

        files.forEach((file) => {
            if (file.endsWith('.json')) {
                try {
                    const filePath = path.join(dataPath, file);
                    const hotelData = fs.readFileSync(filePath, 'utf-8');
                    const hotel = JSON.parse(hotelData);
                    allHotels.push(hotel);
                } catch (error) {
                    console.error(`Error reading file ${file}:`, error);
                }
            }
        });

        return res.status(200).json(allHotels);
    } catch (error) {
        console.error('Error reading hotel data:', error);
        return res.status(500).json({ 
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const updateHotelById = (req: Request, res: Response): any => {
    const { id } = req.params;
    const filePath = path.join(dataPath, `${id}.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Hotel not found' });
    }

    const hotel = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const { title } = req.body;

    const updatedHotel: Hotel = {
        ...hotel,
        ...req.body,
        slug: title ? slugify(title, { lower: true }) : hotel.slug
    };

    fs.writeFileSync(filePath, JSON.stringify(updatedHotel, null, 2));
    res.status(200).json({ message: 'Hotel updated successfully', hotel: updatedHotel });
};

export const uploadImages = (req: Request, res: Response): any => {
    const { id } = req.params;  // Changed from req.body to req.params to match route
    const hotelPath = path.join(dataPath, `${id}.json`);

    if (!fs.existsSync(hotelPath)) {
        return res.status(404).json({ message: 'Hotel not found' });
    }

    const hotelData = JSON.parse(fs.readFileSync(hotelPath, 'utf-8'));
    const imagePaths = (req.files as Express.Multer.File[]).map((file) => 
        `http://${req.get('host')}/uploads/hotels/${file.filename}`  // Updated path to include 'hotels' directory
    );
    
    hotelData.images = hotelData.images ? [...hotelData.images, ...imagePaths] : imagePaths;

    fs.writeFileSync(hotelPath, JSON.stringify(hotelData, null, 2));
    res.status(200).json({ message: 'Images uploaded successfully', images: imagePaths });
};

export const uploadRoomImages = (req: Request, res: Response): any => {
    const { id: hotelId, roomSlug } = req.params; // Extract hotel ID and roomSlug from params
    const hotelPath = path.join(dataPath, `${hotelId}.json`); // Path to hotel data JSON file

    // Check if hotel exists
    if (!fs.existsSync(hotelPath)) {
        return res.status(404).json({ message: 'Hotel not found' });
    }

    const hotelData = JSON.parse(fs.readFileSync(hotelPath, 'utf-8')); // Read hotel data
    const room = hotelData.rooms.find((r: any) => r.roomSlug === roomSlug); // Find room by roomSlug

    // Check if room exists
    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }

    // Map uploaded files to their URL paths
    const imagePaths = (req.files as Express.Multer.File[]).map((file) =>
        `http://${req.get('host')}/uploads/rooms/${file.filename}`
    );

    // Add new images to the room's existing images
    room.roomImages = room.roomImages ? [...room.roomImages, ...imagePaths] : imagePaths;

    // Save updated hotel data
    fs.writeFileSync(hotelPath, JSON.stringify(hotelData, null, 2));

    // Respond with success and uploaded images
    res.status(200).json({
        message: 'Room images uploaded successfully',
        images: imagePaths,
    });
};



