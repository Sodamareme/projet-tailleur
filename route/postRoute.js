import express from 'express';
import { createPost,getAllPosts,updatePost,deletePost,sharePost,disableShareButton,reportPost } from '../controller/postController.js';
import { getToken } from '../middlewares/authMiddleware.js';
import {validatePost} from '../middlewares/validatorMiddleware.js';

const PostRouter = express.Router();

PostRouter.post('/create-post', getToken, validatePost, createPost);
PostRouter.get('/posts', getToken, getAllPosts); // by SMT pour eviter de retourner tout le temps dans le cloud
PostRouter.put('/update-post/:id', getToken, validatePost, updatePost);
PostRouter.delete('/delete-post/:id', getToken, deletePost);    
PostRouter.post('/share-post/:id',getToken, sharePost);   
PostRouter.put('/desable-share/:id',getToken, disableShareButton);  
PostRouter.post('/report-post/:id', getToken, reportPost); 





export default PostRouter;