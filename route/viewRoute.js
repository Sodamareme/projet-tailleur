import { createView } from "../controller/viewController.js";
import express from 'express';
import { getToken } from '../middlewares/authMiddleware.js';



const viewRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: View
 *   description: API endpoints for managing post views
 */

/**
 * @swagger
 * /views/create/{postId}:
 *   get:
 *     summary: Create a view for a specific post
 *     tags: [View]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post to view
 *         schema:
 *           type: string
 *           example: "postId123"
 *     responses:
 *       200:
 *         description: View created successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *     url: /views/create/{postId}
 */
viewRouter.get("/create/:postId",getToken, createView);

export default viewRouter;