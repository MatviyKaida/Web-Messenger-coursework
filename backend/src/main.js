import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import profileRoutes from "./routes/profile.route.js";
import chatRoutes from "./routes/chat.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use("/api/profile", profileRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/chats", chatRoutes);

app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
    connectDB();
})