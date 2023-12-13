import * as dao from "./commentsDao.js";

function CommentsRoutes(app) {    
    const getRecipeComments = async (req, res) => {
        const recipeId = req.params.recipeId;
        const comments = await dao.getRecipeComments(recipeId)
        res.json(comments);
    };
    const getComments = async (req, res) => {
        const comments = await dao.getComments()
        console.log(comments)
        res.json(comments)
    };
    const deleteComment = async (req, res) => {
        const commentId = req.params.commentId;
        const response = await dao.deleteComment(commentId)
        res.json(response);
    };
    const createComment = async (req, res) => {
        const new_id = await dao.getHighestId();
        const comment = { ...req.body, id: new_id.id + 1 };
        const response = await dao.createComment(comment)
        res.json(response);
    };

    app.get('/api/comments/:recipeId', getRecipeComments);
    app.delete('/api/comments/:commentId', deleteComment);
    app.get('/api/comments', getComments);
    app.post('/api/comments', createComment);
} export default CommentsRoutes;
