import model from "./recipesModel.js";

export const saveRecipe = (json) => model.create(json)
export const findUserRecipes = (id) => model.find({liked_user : id})