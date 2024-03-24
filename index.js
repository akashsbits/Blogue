import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import verifyToken from "./services/verify-token.js";
import authRouter from "./routes/authRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();

mongoose.connect(process.env.MONGO_URI);

app.use(cookieParser());
app.use(async (req, res, next) => {
  try {
    if (req.query.id_token) {
      // Returns id_token payload
      req.user = await verifyToken(req.query.id_token);

      // Send cookie to the client-side containing id_token
      res.status(200).cookie("id_token", req.query.id_token);
    } else if (req.cookies.id_token) {
      req.user = await verifyToken(req.cookies.id_token);
    } else {
      console.log("id_token not found");
    }
  } catch (err) {
    res.status(401).json({ error: "Invalid id_token" });
  }
  return next();
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blogs", blogRouter);
// Check APIs health
app.use("/api/v1/health", (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    timestamp: Date.now(),
  };

  res.status(200).json(data);
});
// Catch 404 error
app.use((req, res) => res.status(404).json({ error: "Not found" }));

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
