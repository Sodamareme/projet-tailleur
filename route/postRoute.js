import express from 'express';
import { createPost } from '../controller/postController.js';
import { getToken } from '../middlewares/authMiddleware.js';

const PostRouter = express.Router();

PostRouter.post('/create-post', getToken, createPost);

export default PostRouter;