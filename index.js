import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blogRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();

mongoose.connect(process.env.MONGO_URI);

app.use("/api/v1/blogs", blogRouter);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
