import express from 'express';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import followRoutes from './routes/followRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(bodyParser.json());
dotenv.config();
connectDB();


// routes
// - login and register route
app.use('/api/v1', authRoutes);
// - follow and unfollow routes
app.use('/api/v1', followRoutes);
// - user route
app.use('/api/v1', userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})