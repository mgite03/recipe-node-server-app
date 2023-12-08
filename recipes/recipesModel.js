import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("recipes", schema);
export default model;
