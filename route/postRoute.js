import express from 'express';
import { createPost,getAllPosts,updatePost,deletePost,sharePost,disableShareButton,reportPost } from '../controller/postController.js';
import { getToken } from '../middlewares/authMiddleware.js';
import {validatePost} from '../middlewares/validatorMiddleware.js';
const PostRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: API endpoints for managing posts
 */

/**
 * @swagger
 * /posts/create-post:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Post Title"
 *               content:
 *                 type: string
 *                 example: "This is the content of the post."
 *               authorId:
 *                 type: string
 *                 example: "userId123"
 *     responses:
 *       201:
 *         description: Post created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
PostRouter.post('/create-post', getToken, validatePost, createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "postId123"
 *                   title:
 *                     type: string
 *                     example: "New Post Title"
 *                   content:
 *                     type: string
 *                     example: "This is the content of the post."
 *                   authorId:
 *                     type: string
 *                     example: "userId123"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-12T10:00:00Z"
 *       401:
 *         description: Unauthorized
 */
PostRouter.get('/posts', getToken, getAllPosts);

/**
 * @swagger
 * /posts/update-post/{id}:
 *   put:
 *     summary: Update an existing post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Post Title"
 *               content:
 *                 type: string
 *                 example: "This is the updated content of the post."
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
PostRouter.put('/update-post/:id', getToken, validatePost, updatePost);

/**
 * @swagger
 * /posts/delete-post/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
PostRouter.delete('/delete-post/:id', getToken, deletePost);    

/**
 * @swagger
 * /posts/share-post/{id}:
 *   post:
 *     summary: Share a post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to share
 *     responses:
 *       200:
 *         description: Post shared successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
PostRouter.post('/share-post/:id',getToken, sharePost);   

/**
 * @swagger
 * /posts/disable-share/{id}:
 *   put:
 *     summary: Disable sharing of a post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to disable sharing
 *     responses:
 *       200:
 *         description: Sharing disabled for post
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
PostRouter.put('/desable-share/:id',getToken, disableShareButton);  

/**
 * @swagger
 * /posts/report-post/{postId}:
 *   post:
 *     summary: Report a post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to report
 *     responses:
 *       200:
 *         description: Post reported successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
PostRouter.post('/report-post/:postId', getToken, reportPost); 


export default PostRouter;