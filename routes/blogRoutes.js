import express from "express";
import mongoose from "mongoose";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.get("/", isLoggedIn, (req, res) => {
  res.status(200).json({ blogs: ["First Blog", "Second Blog"] });
});

export default router;
