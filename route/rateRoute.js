import express from 'express';
import { createRate, getRates } from '../controller/rateController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { getToken } from '../middlewares/authMiddleware.js';


const RateRouter = express.Router();

RateRouter.post('/rate', getToken, createRate);
RateRouter.get('/', getRates);

export default RateRouter;

