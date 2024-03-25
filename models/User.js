import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
});

export default mongoose.model("User", userSchema);
