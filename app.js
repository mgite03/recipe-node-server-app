import "dotenv/config";
import cors from "cors";
import Users from "./users/routes.js";
import RecipeRoutes from "./recipes/recipesRoutes.js";
import CommentsRoutes from "./comments/commentsRoutes.js";
import express from "express";
import mongoose from "mongoose";
try {
  mongoose.connect("mongodb://127.0.0.1:27017/recipe");
  console.log("mongoose connected");
} catch (err) {
  console.log("not connected");
}
const app = express();
app.use(cors());
app.use(express.json());
Users(app);
RecipeRoutes(app);
CommentsRoutes(app);
try {
  app.listen(process.env.PORT || 4000);
  console.log("Server started");
} catch (e) {
  console.log(e);
  throw e;
}
