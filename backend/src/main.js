import express, { Router } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// app.use(Router());

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
    connectDB();
})