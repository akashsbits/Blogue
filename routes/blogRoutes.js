import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { getAllBlogs, getABlog, addABlog } from "../controllers/blog.js";

const router = express.Router();

router.get("/", isLoggedIn, getAllBlogs);

router.get("/:id", isLoggedIn, getABlog);

router.post("/", isLoggedIn, addABlog);

export default router;
