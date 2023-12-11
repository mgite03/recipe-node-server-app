import "dotenv/config";
import cors from "cors";
import Users from "./users/routes.js";
import RecipeRoutes from "./recipes/recipesRoutes.js";
import CommentsRoutes from "./comments/commentsRoutes.js";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/recipe";

try {
  mongoose.connect(CONNECTION_STRING);
  console.log("mongoose connected");
} catch (err) {
  console.log("not connected");
}
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_END_URL,
  })
 );


const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

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
