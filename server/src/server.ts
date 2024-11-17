// src/server.ts
import express from 'express';
import hotelRoutes from './routes/hotel.routes';

const app = express();

app.use(express.json());
app.use('/api', hotelRoutes);

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