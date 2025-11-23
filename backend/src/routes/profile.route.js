import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { updateUserProfile } from "../controllers/profile.controller.js";

const router = express.Router();

router.put("/updateProfile", protectRoute, updateUserProfile);

export default router;