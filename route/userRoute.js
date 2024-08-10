import express from 'express';
import { createUser, login, follow, unfollow, becomeTaillor } from '../controller/userController.js';
import { getToken } from '../middlewares/authMiddleware.js';
const UserRouter = express.Router();

UserRouter.post('/create', createUser);
UserRouter.post('/login', login);
UserRouter.post('/follow', getToken, follow);
UserRouter.post('/unfollow', getToken, unfollow);
UserRouter.post('/become-taillor', getToken, becomeTaillor);

export default UserRouter;