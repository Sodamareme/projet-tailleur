/* // routes/notificationRoute.js
import express from 'express';
import { getNotifications } from '../controller/notificationController.js';
import { getToken } from '../middlewares/authMiddleware.js';

const NotificationRouter = express.Router();

NotificationRouter.get('/notifications', getToken, getNotifications);

export default NotificationRouter;
 */