"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Multer storage configuration
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const folder = req.params.roomSlug ? 'rooms' : '';
        const destinationPath = path_1.default.join(__dirname, `../uploads/${folder}`);
        fs_1.default.mkdirSync(destinationPath, { recursive: true });
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const hotelId = req.params.id || req.body.id;
        const roomSlug = req.params.roomSlug;
        const extension = path_1.default.extname(file.originalname);
        const filename = roomSlug ? `${hotelId}-${roomSlug}${extension}` : `${hotelId}${extension}`;
        cb(null, filename);
    }
});
exports.upload = (0, multer_1.default)({ storage, limits: { fileSize: 10 * 1024 * 1024 } });
