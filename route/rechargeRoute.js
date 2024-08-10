import express from 'express';
import { getToken } from '../middlewares/authMiddleware.js';
import { newRecharge, recharging } from '../controller/rechargeController.js';

const RechargeRouter = express.Router();

RechargeRouter.post('/new-recharge', getToken, newRecharge);
RechargeRouter.post('/recharging', getToken, recharging);

export default RechargeRouter;