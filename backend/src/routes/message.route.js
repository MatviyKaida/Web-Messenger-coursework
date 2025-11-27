import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/createMessage", protectRoute, createMessage);

export default router;