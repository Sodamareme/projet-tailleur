import express from 'express';
import { getToken } from '../middlewares/authMiddleware.js';
import { createMessage, getMessages } from '../controller/messageController.js';

const MessageRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Message
 *   description: API endpoints for sending and retrieving messages
 */

/**
 * @swagger
 * /messages/send-message:
 *   post:
 *     summary: Send a message
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiverId:
 *                 type: string
 *                 example: "receiverUserId"
 *               content:
 *                 type: string
 *                 example: "Hello, how are you?"
 *     responses:
 *       200:
 *         description: Mesure created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
MessageRouter.post('/send-message', getToken, createMessage);
/**
 * @swagger
 * /messages/all-messages-of-user:
 *   get:
 *     summary: Get all messages for the logged-in user
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all messages for the logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "messageId"
 *                   senderId:
 *                     type: string
 *                     example: "senderUserId"
 *                   receiverId:
 *                     type: string
 *                     example: "receiverUserId"
 *                   content:
 *                     type: string
 *                     example: "Hello, how are you?"
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-12T10:00:00Z"
 *       401:
 *         description: Unauthorized
 */
MessageRouter.get('/all-messages-of-user', getToken, getMessages);



export default MessageRouter;
