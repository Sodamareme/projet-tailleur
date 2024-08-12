// routes/likeRoute.js
import express from 'express';
import { likePost, dislikePost } from '../controller/likeController.js';
import { getToken } from '../middlewares/authMiddleware.js';


const LikeRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Like
 *   description: API endpoints for liking and disliking posts
 */

/**
 * @swagger
 * /likes/{postId}:
 *   get:
 *     summary: Like a post
 *     tags: [Like]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: The ID of the post to like
 *         schema:
 *           type: string
 *           example: "abcdef1234567890"
 *     responses:
 *       200:
 *         description: Post liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Post liked successfully"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
LikeRouter.get('/dislike/:postId', getToken, dislikePost);
/**
 * @swagger
 * /likes/dislike/{postId}:
 *   get:
 *     summary: Dislike a post
 *     tags: [Like]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: The ID of the post to dislike
 *         schema:
 *           type: string
 *           example: "abcdef1234567890"
 *     responses:
 *       200:
 *         description: Post disliked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Post disliked successfully"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
LikeRouter.get('/:postId', getToken, likePost);

export default LikeRouter;
