import express from 'express';
import { createComment, deleteComment, updateComment } from '../controller/commentController.js';
import { getToken } from '../middlewares/authMiddleware.js';
import { validateComment } from '../middlewares/validatorMiddleware.js';

const CommentRouter = express.Router();

/**
 * @swagger
 * /comment/create-comment:
 *   post:
 *     summary: Create a new comment on a post
 *     tags: 
 *       - Comment
 *     description: Allows authenticated users to create a comment on a specific post.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment.
 *               postId:
 *                 type: string
 *                 description: The ID of the post to comment on.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Comment added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Failed to retrieve post or user information.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Error while adding comment.
 */
CommentRouter.post('/create-comment', getToken, validateComment, createComment);

/**
 * @swagger
 * /comment/delete-comment/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: 
 *       - Comment
 *     description: Allows the comment's author or the post's author to delete a comment.
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Comment deleted successfully.
 *       401:
 *         description: You are not allowed to delete this comment.
 *       404:
 *         description: Comment or post not found.
 *       500:
 *         description: Error while deleting comment.
 */
CommentRouter.delete('/delete-comment/:commentId', getToken, deleteComment);

/**
 * @swagger
 * /comment/update-comment/{commentId}:
 *   put:
 *     summary: Update a comment
 *     tags: 
 *       - Comment
 *     description: Allows the comment's author to update the content of their comment.
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The updated content of the comment.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Comment updated successfully.
 *       400:
 *         description: Content is required.
 *       403:
 *         description: Unauthorized action.
 *       404:
 *         description: Comment not found.
 *       500:
 *         description: Error updating comment.
 */
CommentRouter.put('/update-comment/:commentId', getToken, updateComment);

export default CommentRouter;
