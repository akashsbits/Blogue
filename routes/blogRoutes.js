import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { getAllBlogs, getABlog, addABlog } from "../controllers/blog.js";
import clearCache from "../middlewares/clearCache.js";

const router = express.Router();

router.get("/", isLoggedIn, getAllBlogs);

router.get("/:id", isLoggedIn, getABlog);

router.post("/", isLoggedIn, clearCache, addABlog);

export default router;
