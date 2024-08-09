import express from 'express';
import { createRate, allRates, updateRate, deleteRate } from '../controller/rateController.js';
import { getToken } from '../middlewares/authMiddleware.js';
import { validateRate } from '../middlewares/validatorMiddleware.js';

const RateRouter = express.Router();

RateRouter.post('/create-rate', getToken, validateRate, createRate);
RateRouter.get('/', allRates);
RateRouter.put('/:id', getToken, validateRate, updateRate);
RateRouter.delete('/:id', getToken, deleteRate);

export default RateRouter;
