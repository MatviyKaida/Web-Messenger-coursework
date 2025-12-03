import express from "express";
import { createChat, deleteChat, getChatList } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createMessage, getMesssagesList } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/createChat/:username", protectRoute, createChat);

router.delete("/deleteChat/:username", protectRoute, deleteChat);

router.get("/getChatList", protectRoute, getChatList);

router.post("/messages/:chatID/createMessage", protectRoute, createMessage);
router.get ("/messages/:chatID/getMessages", protectRoute, getMesssagesList)

export default router;