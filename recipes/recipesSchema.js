import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    video_url: String,
    img_url: String,
    more_info_url: String, // Have to call recipes/get-more-info to fill this.
    liked_user: [Number],
    likes: Number,
    id: Number,
  },
  { collection: "recipes" }
);
export default recipeSchema;
