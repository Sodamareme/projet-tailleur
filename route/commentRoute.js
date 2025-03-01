import express from 'express';
import { createComment, deleteComment, updateComment } from '../controller/commentController.js';
import { getToken } from '../middlewares/authMiddleware.js';
import { validateComment } from '../middlewares/validatorMiddleware.js';

const CommentRouter = express.Router();

CommentRouter.post('/create-comment', getToken, validateComment, createComment);
CommentRouter.delete('/delete-comment/:commentId', getToken, deleteComment);
CommentRouter.put('/update-comment/:commentId', getToken, updateComment);
CommentRouter.post('/create-comment', getToken, validateComment, createComment);
CommentRouter.delete('/delete-comment/:commentId', getToken, deleteComment);
CommentRouter.put('/update-comment/:commentId', getToken, updateComment);

export default CommentRouter;
