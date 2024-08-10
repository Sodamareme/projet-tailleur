import {UserBlocked} from '../controller/blockController.js';
import { getToken } from '../middlewares/authMiddleware.js';

import express from 'express';

const blockRouter = express.Router();

blockRouter.get('/:blockedUserId',getToken, UserBlocked);

export default blockRouter;
