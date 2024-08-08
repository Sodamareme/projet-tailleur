// import express from "express";
// import { getToken } from "../middlewares/authMiddleware.js";
// import { createComment } from "../controller/commentController.js";

// const CommentRouter=express.Router();

// CommentRouter.post ('/create-comment', getToken, createComment);

// // export default CommentRouter;
// import express from 'express';
// import { createComment, deleteComment, updateComment } from '../controller/commentController.js';
// //import authMiddleware from '../middlewares/authMiddleware.js';
// import { getToken } from "../middlewares/authMiddleware.js";
// import validateComment from '../middlewares/validatorMiddleware.js';

// const CommentRouter = express.Router();

// CommentRouter.post('/create-comment', authMiddleware, validateComment, createComment);
// CommentRouter.delete('/delete-comment/:commentId', authMiddleware, deleteComment);
// CommentRouter.put('/update-comment/:commentId', authMiddleware, validateComment, updateComment);

// export default CommentRouter;
import express from 'express';
import { createComment, deleteComment, updateComment } from '../controller/commentController.js';
import { getToken } from '../middlewares/authMiddleware.js';
import { validateComment } from '../middlewares/validatorMiddleware.js';

const CommentRouter = express.Router();

CommentRouter.post('/create-comment', getToken, validateComment, createComment);
CommentRouter.delete('/delete-comment/:commentId', getToken, deleteComment);
CommentRouter.put('/update-comment/:commentId', getToken, validateComment, updateComment); 

export default CommentRouter;



