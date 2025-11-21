import express from "express";
import {signup, login, logout} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/api/auth", signup);

router.get("/api/login", login);

router.get("/api/logout", logout);
