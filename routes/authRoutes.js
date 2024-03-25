import express from "express";
import { getAuthTokens, getAuthUrl, logout } from "../controllers/auth.js";

const router = express.Router();

router.get("/google/callback", getAuthTokens);

router.get("/google/login", getAuthUrl);

router.get("/logout", logout);

export default router;
