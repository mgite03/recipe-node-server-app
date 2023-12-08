import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    url: String,
    liked_user: [String],
    comments: [String],
    user_who_commented: [String],
    likes: number,
    id: Number,
  },
  { collection: "users" }
);
export default recipeSchema;
