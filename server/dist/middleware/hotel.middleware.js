"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Configure storage for hotel images
const hotelImageStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Define the destination folder for hotel images
        const destinationPath = path_1.default.join(__dirname, '../../uploads/hotels');
        // Ensure the directory exists
        fs_1.default.mkdirSync(destinationPath, { recursive: true });
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const { id } = req.params;
        const extension = path_1.default.extname(file.originalname);
        const filename = `${id}-${Date.now()}${extension}`;
        cb(null, filename);
    }
});
// Create multer upload instance for hotel images
exports.upload = (0, multer_1.default)({ storage: hotelImageStorage });
