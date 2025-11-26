import express from "express";
import { createChat } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/createChat/:username", protectRoute, createChat);

export default router;