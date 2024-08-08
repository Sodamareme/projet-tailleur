import express from 'express';
import { createPost } from '../controller/postController.js';
import { getToken } from '../middlewares/authMiddleware.js';
import { validatePost } from '../middlewares/validatorMiddleware.js';

const PostRouter = express.Router();

PostRouter.post('/create-post', getToken, validatePost, createPost);

export default PostRouter;