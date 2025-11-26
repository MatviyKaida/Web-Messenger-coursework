import express from "express";
import { createChat, deleteChat } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/createChat/:username", protectRoute, createChat);

router.delete("/deleteChat/:username", protectRoute, deleteChat);

export default router;