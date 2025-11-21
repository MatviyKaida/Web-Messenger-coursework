import mongoose from "mongoose";
import dotenv from "dotenv"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB is running on host: ${conn.connection.host}`);
    }
    catch (err){
        console.log(`MongoDB connection error: ${err}`);
    }
}