import express from 'express';
import { createComment, deleteComment, updateComment } from '../controller/commentController.js';
import { getToken } from '../middlewares/authMiddleware.js';
import { validateComment } from '../middlewares/validatorMiddleware.js';


const CommentRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: API endpoints for managing comments
 */


/**
 * @swagger
 * /comment/create-comment:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "This is a comment"
 *               postId:
 *                 type: string
 *                 example: "66b29454860c85ac4c41886c"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */
CommentRouter.post('/create-comment', getToken, validateComment, createComment);

/**
 * @swagger
 * /comment/delete-comment/{commentId}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: The ID of the comment to delete
 *         schema:
 *           type: string
 *           example: "1234567890abcdef"
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
CommentRouter.delete('/delete-comment/:commentId', getToken, deleteComment);

/**
 * @swagger
 * /comment/update-comment/{commentId}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: The ID of the comment to update
 *         schema:
 *           type: string
 *           example: "1234567890abcdef"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Updated comment text"
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
CommentRouter.put('/update-comment/:commentId', getToken, updateComment);

export default CommentRouter;


