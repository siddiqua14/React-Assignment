import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import slugify from 'slugify';
import { Hotel } from '../models/hotel.types';

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
    const { id } = req.body;
    const hotelPath = path.join(dataPath, `${id}.json`);

    if (!fs.existsSync(hotelPath)) {
        return res.status(404).json({ message: 'Hotel not found' });
    }

    const hotelData = JSON.parse(fs.readFileSync(hotelPath, 'utf-8'));
    const imagePaths = (req.files as Express.Multer.File[]).map((file) => `http://${req.get('host')}/uploads/${file.filename}`);
    hotelData.images = hotelData.images ? [...hotelData.images, ...imagePaths] : imagePaths;

    fs.writeFileSync(hotelPath, JSON.stringify(hotelData, null, 2));
    res.status(200).json({ message: 'Images uploaded successfully', images: imagePaths });
};

// Controller for uploading room images
export const uploadRoomImages = (req: Request, res: Response): any => {
    const hotelId = req.params.id;
    const roomSlug = req.params.roomSlug;

    if (!hotelId || !roomSlug) {
        return res.status(400).json({ message: 'Hotel ID and Room Slug are required' });
    }

    const hotelPath = path.join(__dirname, `../data/${hotelId}.json`);
    if (!fs.existsSync(hotelPath)) {
        return res.status(404).json({ message: 'Hotel not found' });
    }

    const hotelData = JSON.parse(fs.readFileSync(hotelPath, 'utf-8'));
    const room = hotelData.rooms.find((r: any) => r.roomSlug === roomSlug);
    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }

    const imagePaths = (req.files as Express.Multer.File[]).map((file) => {
        return `http://${req.get('host')}/uploads/rooms/${file.filename}`;
    });

    room.roomImage = room.roomImage ? [...room.roomImage, ...imagePaths] : imagePaths;

    try {
        fs.writeFileSync(hotelPath, JSON.stringify(hotelData, null, 2));
        return res.status(200).json({ message: 'Room images uploaded successfully', images: imagePaths });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

