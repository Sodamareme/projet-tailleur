import express from 'express';
import { createRate, allRates } from '../controller/rateController.js';
import { getToken } from '../middlewares/authMiddleware.js';


const RateRouter = express.Router();

RateRouter.post('/create-rate', getToken, createRate);
RateRouter.get('/', allRates);

export default RateRouter;

