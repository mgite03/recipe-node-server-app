import * as dao from "./commentsDao.js";

function CommentsRoutes(app) {    
    const getComments = async (req, res) => {
        const recipeId = req.params.recipeId;
        comments = await dao.getComments(recipeId)
        res.json(comments);
    };
    const deleteComment = async (req, res) => {
        const commentId = req.params.commentId;
        comments = await dao.deleteCommnet(commentId)
        res.json(comments);
    };
    const createComment = async (req, res) => {
        const commentId = req.params.commentId;
        comments = await dao.deleteCommnet(commentId)
        res.json(comments);
    };

    app.get('/api/recipes/:recipeId/comments', getComments);
    app.delete('/api/comments/:commentId', deleteComment);
    app.post('/api/comments', createComment);
} export default CommentsRoutes;
