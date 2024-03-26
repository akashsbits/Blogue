import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  // user: { type: Schema.Types.ObjectId, ref: "User" },
  googleId: String,
});

export default mongoose.model("Blog", blogSchema);
