import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => res.status(200).json({ name: "Peter Griffin" }));

export default router;
