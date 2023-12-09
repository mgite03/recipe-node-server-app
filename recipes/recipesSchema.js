import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    url: String,
    liked_user: [String],
    likes: Number,
    id: Number,
  },
  { collection: "users" }
);
export default recipeSchema;
