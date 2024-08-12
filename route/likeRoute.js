import express from 'express';
import { likePost, dislikePost } from '../controller/likeController.js';
import { getToken } from '../middlewares/authMiddleware.js';

const LikeRouter = express.Router();

/**
 * @swagger
 * /Reaction/like/{postId}:
 *   get:
 *     summary: Like a post
 *     tags: 
 *       - Reaction
 *     description: Adds a like to a post. If the user has already liked the post, the like will be removed.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to like.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully liked or unliked the post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 liked:
 *                   type: boolean
 *       400:
 *         description: Invalid request or missing post ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized, user ID is required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /Reaction/dislike/{postId}:
 *   get:
 *     summary: Dislike a post
 *     tags: 
 *       - Reaction
 *     description: Adds a dislike to a post. If the user has already disliked the post, the dislike will be removed.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to dislike.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully disliked or undisliked the post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 disliked:
 *                   type: boolean
 *       400:
 *         description: Invalid request or missing post ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized, user ID is required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

LikeRouter.get('/like/:postId', getToken, likePost);
LikeRouter.get('/dislike/:postId', getToken, dislikePost);

export default LikeRouter;
