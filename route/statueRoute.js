import express from 'express';
import { createStatue, deleteStatue, deleteAllStatues } from '../controller/statueController.js';
import { getToken } from '../middlewares/authMiddleware.js';

const StatueRouter = express.Router();

StatueRouter.post('/create-statue', getToken, createStatue);
StatueRouter.delete('/delete-statue/:id', getToken, deleteStatue);
StatueRouter.delete('/delete-all-statues', getToken, deleteAllStatues);

export default StatueRouter;
