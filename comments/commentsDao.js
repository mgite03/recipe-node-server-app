import model from "./commentsModel.js";
export const getComments = (repId) => model.find({ recipeId: repId});
export const createCommnet = (comment) => model.create(comment);
export const deleteCommnet = (commentId) => model.deleteOne({ id: commentId });