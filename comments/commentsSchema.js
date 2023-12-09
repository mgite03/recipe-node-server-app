import mongoose from "mongoose";
const commentsSchema = new mongoose.Schema(
  {
    username: String,
    createTime: Date,
    description: String,
    recipeId: Number,
    likes: Number,
    id: Number,
  },
  { collection: "comments" }
);
export default commentsSchema;
