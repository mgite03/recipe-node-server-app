import model from "./commentsModel.js";
export const getRecipeComments = (repId) => {
    console.log("Repicie Id called in getRecipeComments" + repId)
    return model.find({ recipeId: repId})
};
export const getComments = () => model.find();
export const createComment = (comment) => model.create(comment);
export const deleteComment = (commentId) => model.deleteOne({ id: commentId });
export const getHighestId = async () => model.findOne().sort({ id: -1 }).exec();