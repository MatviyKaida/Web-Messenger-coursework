import express from "express";
import { createChat, deleteChat, getChatList } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/createChat/:username", protectRoute, createChat);

router.delete("/deleteChat/:username", protectRoute, deleteChat);

router.get("/getChatList", protectRoute, getChatList);

export default router;