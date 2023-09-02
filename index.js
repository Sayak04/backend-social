import express from 'express';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(bodyParser.json());
dotenv.config();
connectDB();


// routes
app.use('/api/v1', authRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})