"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 5000;
// Enable CORS for requests from frontend
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use(express_1.default.json()); // Add this to parse JSON bodies
// Helper function to get hotel file path
const getHotelFilePath = (idOrSlug) => {
    return path_1.default.join(__dirname, 'data', `${idOrSlug}.json`);
};
// GET route to fetch hotel by ID or slug
app.get('/api/hotel/:idOrSlug', async (req, res) => {
    try {
        const { idOrSlug } = req.params;
        const filePath = getHotelFilePath(idOrSlug);
        // Check if file exists with ID
        if (fs_1.default.existsSync(filePath)) {
            const hotelData = fs_1.default.readFileSync(filePath, 'utf-8');
            const hotel = JSON.parse(hotelData);
            return res.status(200).json(hotel);
        }
        // If not found by ID, search in all files for matching slug
        const dataDir = path_1.default.join(__dirname, 'data');
        if (fs_1.default.existsSync(dataDir)) {
            const files = fs_1.default.readdirSync(dataDir);
            for (const file of files) {
                if (file.endsWith('.json')) {
                    const fileContent = fs_1.default.readFileSync(path_1.default.join(dataDir, file), 'utf-8');
                    const hotel = JSON.parse(fileContent);
                    if (hotel.slug === idOrSlug) {
                        return res.status(200).json(hotel);
                    }
                }
            }
        }
        return res.status(404).json({ message: 'Hotel not found' });
    }
    catch (error) {
        console.error('Error fetching hotel:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// GET route to fetch all hotels
app.get('/api/hotel', async (_req, res) => {
    try {
        const dataDir = path_1.default.join(__dirname, 'data');
        if (!fs_1.default.existsSync(dataDir)) {
            return res.status(200).json({ hotels: [] });
        }
        const files = fs_1.default.readdirSync(dataDir);
        const hotels = files
            .filter(file => file.endsWith('.json'))
            .map(file => {
            const hotelData = fs_1.default.readFileSync(path_1.default.join(dataDir, file), 'utf-8');
            return JSON.parse(hotelData);
        });
        return res.status(200).json({ hotels });
    }
    catch (error) {
        console.error('Error fetching hotels:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
