import model from "./commentsModel.js";
export const getRecipeComments = (repId) => model.find({ recipeId: repId});
export const getComments = () => model.find();
export const createCommnet = (comment) => model.create(comment);
export const deleteCommnet = (commentId) => model.deleteOne({ id: commentId });