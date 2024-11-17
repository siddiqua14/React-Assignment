"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRoomImages = exports.uploadImages = exports.updateHotelById = exports.getHotelByIdOrSlug = exports.createHotel = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const slugify_1 = __importDefault(require("slugify"));
const dataPath = path_1.default.resolve(__dirname, '../data');
// Helper to construct file path
const getHotelFilePath = (id) => {
    return path_1.default.join(dataPath, `${id}.json`);
};
// Controller function for creating a hotel
const createHotel = (req, res) => {
    const { title } = req.body;
    const newHotel = Object.assign(Object.assign({}, req.body), { id: new Date().getTime().toString(), slug: (0, slugify_1.default)(title, { lower: true }), rooms: req.body.rooms || [] });
    if (!fs_1.default.existsSync(dataPath)) {
        fs_1.default.mkdirSync(dataPath, { recursive: true });
    }
    fs_1.default.writeFileSync(`${dataPath}/${newHotel.id}.json`, JSON.stringify(newHotel, null, 2));
    res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel });
};
exports.createHotel = createHotel;
// Helper to get hotel by slug
const getHotelBySlug = (slug) => {
    const files = fs_1.default.readdirSync(dataPath);
    for (const file of files) {
        const hotelData = fs_1.default.readFileSync(path_1.default.join(dataPath, file), 'utf-8');
        const hotel = JSON.parse(hotelData);
        if (hotel.slug === slug) {
            return hotel;
        }
    }
    return null;
};
// Controller function to get hotel by ID or slug
const getHotelByIdOrSlug = (req, res) => {
    const { idOrSlug } = req.params;
    // Attempt to fetch hotel by numeric ID first
    const filePath = getHotelFilePath(idOrSlug);
    if (fs_1.default.existsSync(filePath)) {
        try {
            const hotelData = fs_1.default.readFileSync(filePath, 'utf-8');
            const hotel = JSON.parse(hotelData);
            return res.status(200).json(hotel);
        }
        catch (error) {
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
exports.getHotelByIdOrSlug = getHotelByIdOrSlug;
const updateHotelById = (req, res) => {
    const { id } = req.params;
    const filePath = path_1.default.join(dataPath, `${id}.json`);
    if (!fs_1.default.existsSync(filePath)) {
        return res.status(404).json({ message: 'Hotel not found' });
    }
    const hotel = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
    const { title } = req.body;
    const updatedHotel = Object.assign(Object.assign(Object.assign({}, hotel), req.body), { slug: title ? (0, slugify_1.default)(title, { lower: true }) : hotel.slug });
    fs_1.default.writeFileSync(filePath, JSON.stringify(updatedHotel, null, 2));
    res.status(200).json({ message: 'Hotel updated successfully', hotel: updatedHotel });
};
exports.updateHotelById = updateHotelById;
const uploadImages = (req, res) => {
    const { id } = req.body;
    const hotelPath = path_1.default.join(dataPath, `${id}.json`);
    if (!fs_1.default.existsSync(hotelPath)) {
        return res.status(404).json({ message: 'Hotel not found' });
    }
    const hotelData = JSON.parse(fs_1.default.readFileSync(hotelPath, 'utf-8'));
    const imagePaths = req.files.map((file) => `http://${req.get('host')}/uploads/${file.filename}`);
    hotelData.images = hotelData.images ? [...hotelData.images, ...imagePaths] : imagePaths;
    fs_1.default.writeFileSync(hotelPath, JSON.stringify(hotelData, null, 2));
    res.status(200).json({ message: 'Images uploaded successfully', images: imagePaths });
};
exports.uploadImages = uploadImages;
// Controller for uploading room images
const uploadRoomImages = (req, res) => {
    const hotelId = req.params.id;
    const roomSlug = req.params.roomSlug;
    if (!hotelId || !roomSlug) {
        return res.status(400).json({ message: 'Hotel ID and Room Slug are required' });
    }
    const hotelPath = path_1.default.join(__dirname, `../data/${hotelId}.json`);
    if (!fs_1.default.existsSync(hotelPath)) {
        return res.status(404).json({ message: 'Hotel not found' });
    }
    const hotelData = JSON.parse(fs_1.default.readFileSync(hotelPath, 'utf-8'));
    const room = hotelData.rooms.find((r) => r.roomSlug === roomSlug);
    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }
    const imagePaths = req.files.map((file) => {
        return `http://${req.get('host')}/uploads/rooms/${file.filename}`;
    });
    room.roomImage = room.roomImage ? [...room.roomImage, ...imagePaths] : imagePaths;
    try {
        fs_1.default.writeFileSync(hotelPath, JSON.stringify(hotelData, null, 2));
        return res.status(200).json({ message: 'Room images uploaded successfully', images: imagePaths });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.uploadRoomImages = uploadRoomImages;
