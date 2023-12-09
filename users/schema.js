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
      enum: ["Casual", "Professional"],
      default: "Casual",
    },
    id: Number,
    likes: [Number],
    follows: [Number],
    followers: [Number],
  },
  { collection: "users" }
);
export default userSchema;
