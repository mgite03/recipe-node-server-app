import mongoose from "mongoose";
import commentsSchema from "./commentsSchema";
const model = mongoose.model("comments", commentsSchema);
export default model;
