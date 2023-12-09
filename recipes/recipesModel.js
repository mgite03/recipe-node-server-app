import mongoose from "mongoose";
import schema from "./recipesSchema.js";
const model = mongoose.model("recipes", schema);
export default model;
