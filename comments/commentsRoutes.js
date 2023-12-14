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
        const highest_id = await dao.getHighestId();
        let new_id;
        if (highest_id === null) {
          new_id = 0;
        } else {
          new_id = highest_id.id + 1;
        }
        const comment = { ...req.body, id: new_id};
        const response = await dao.createComment(comment)
        res.json(response);
    };

    app.get('/api/comments/:recipeId', getRecipeComments);
    app.delete('/api/comments/:commentId', deleteComment);
    app.get('/api/comments', getComments);
    app.post('/api/comments', createComment);
} export default CommentsRoutes;
