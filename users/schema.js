import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    accountType: {
      type: String,
      required: true,
      enum: ["User", "Admin"],
      default: "User",
    },
    id: Number,
    likes: [String],
    follows: [String],
    followers: [String],
  },
  { collection: "users" }
);
export default userSchema;
