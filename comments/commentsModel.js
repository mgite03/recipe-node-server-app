import mongoose from "mongoose";
import commentsSchema from "./commentsSchema.js";
const model = mongoose.model("comments", commentsSchema);
export default model;
