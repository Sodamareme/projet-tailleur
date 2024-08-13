import {UserBlocked} from '../controller/blockController.js';
import { getToken } from '../middlewares/authMiddleware.js';

import express from 'express';

const blockRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Block
 *   description: API endpoints for managing blocked users
 */

/**
 * @swagger
 * /block/{blockedUserId}:
 *   get:
 *     summary: Get blocked user details by ID
 *     tags: [Block]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: blockedUserId
 *         in: path
 *         required: true
 *         description: The ID of the blocked user
 *         schema:
 *           type: string
 *           example: "1234567890abcdef"
 *     responses:
 *       200:
 *         description: Successfully retrieved blocked user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: "1234567890abcdef"
 *                 username:
 *                   type: string
 *                   example: "blockeduser"
 *                 blockedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-12T14:48:00.000Z"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blocked user not found
 */
blockRouter.get('/:blockedUserId', getToken, UserBlocked);

export default blockRouter;
