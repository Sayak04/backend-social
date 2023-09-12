import express from 'express';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import followRoutes from './routes/followRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import likeRoutes from './routes/likeRoutes.js';

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
// - create post
app.use('/api/v1', postRoutes);
// -like and dislike post
app.use('/api/v1', likeRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})