// src/app.ts
import express from 'express';
import hotelRoutes from './routes/hotel.routes';
import path from 'path';
import cors from "cors";
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Adjust this to match your frontend URL
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
//app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', hotelRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app; // Export the app for use in tests

