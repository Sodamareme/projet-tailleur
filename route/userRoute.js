import express from 'express';
import { createUser, login } from '../controller/userController.js';

const UserRouter = express.Router();

UserRouter.post('/create', createUser);
UserRouter.post('/login', login);

export default UserRouter;