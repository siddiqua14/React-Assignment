"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const hotel_routes_1 = __importDefault(require("./routes/hotel.routes"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:3000', // Adjust this to match your frontend URL
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
//app.use(cors({ origin: "http://localhost:3000" }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
/*
app.get("/api/home", (req, res) => {
    res.json({ message: "hello world" });
}); */
app.use('/api', hotel_routes_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app; // Export the app for use in tests
