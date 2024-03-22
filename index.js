import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello!");
});

app.listen(process.env.PORT);
