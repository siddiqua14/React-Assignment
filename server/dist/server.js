"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const hotel_routes_1 = __importDefault(require("./routes/hotel.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', hotel_routes_1.default);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
/*
// src/app.ts
import express from 'express';
import hotelRoutes from './routes/hotel.routes';
import path from 'path';
//export default app;


const app = express();
app.use(express.json());
app.use('/api', hotelRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app; // Export the app for use in tests
*/ 
