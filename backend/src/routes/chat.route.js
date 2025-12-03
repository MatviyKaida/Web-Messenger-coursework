import express from "express";
import { createChat, deleteChat, getChatList } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/createChat/:username", protectRoute, createChat);

router.delete("/deleteChat/:username", protectRoute, deleteChat);

router.get("/getChatList", protectRoute, getChatList);

router.post("/messages/createMessage/:chatID", protectRoute, createMessage);

export default router;