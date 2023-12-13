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
        const comments = await dao.deleteCommnet(commentId)
        res.json(comments);
    };
    const createComment = async (req, res) => {
        const commentId = req.params.commentId;
        const comments = await dao.deleteCommnet(commentId)
        res.json(comments);
    };

    app.get('/api/recipes/:recipeId/comments', getRecipeComments);
    app.delete('/api/comments/:commentId', deleteComment);
    app.get('/api/comments', getComments);
    app.post('/api/comments', createComment);
} export default CommentsRoutes;
