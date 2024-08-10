import express from 'express';
import { createMessage, getMessages } from '../controller/messageController.js';
import { getToken } from '../middlewares/authMiddleware.js';

const MessageRouter = express.Router();

MessageRouter.post('/send-message', getToken, createMessage);
MessageRouter.post('/all-messages-of-user', getToken, getMessages);

export default MessageRouter;
