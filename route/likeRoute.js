// routes/likeRoute.js
import express from 'express';
import { likePost, dislikePost } from '../controller/likeController.js';
import { getToken } from '../middlewares/authMiddleware.js';

const LikeRouter = express.Router();

LikeRouter.get('/:postId', getToken, likePost);
LikeRouter.get('/dislike/:postId', getToken, dislikePost);

export default LikeRouter;
