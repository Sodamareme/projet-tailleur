import express from 'express';
import { createRate, allRates, updateRate, deleteRate } from '../controller/rateController.js';
import { getToken } from '../middlewares/authMiddleware.js';
import { validateRate } from '../middlewares/validatorMiddleware.js';



const RateRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rate
 *   description: API endpoints for managing rates
 */

/**
 * @swagger
 * /rates/create-rate:
 *   post:
 *     summary: Create a new rate
 *     tags: [Rate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rateValue:
 *                 type: number
 *                 example: 4.5
 *               rateDescription:
 *                 type: string
 *                 example: "Excellent service"
 *               ratedEntityId:
 *                 type: string
 *                 example: "entityId123"
 *     responses:
 *       201:
 *         description: Rate created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *     url: /rates/create-rate
 */

RateRouter.post('/create-rate', getToken, validateRate, createRate);

/**
 * @swagger
 * /rates:
 *   get:
 *     summary: Get all rates
 *     tags: [Rate]
 *     responses:
 *       200:
 *         description: List of rates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "rateId123"
 *                   rateValue:
 *                     type: number
 *                     example: 4.5
 *                   rateDescription:
 *                     type: string
 *                     example: "Excellent service"
 *                   ratedEntityId:
 *                     type: string
 *                     example: "entityId123"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-12T10:00:00Z"
 *       400:
 *         description: Bad request
 *     url: /rates
 */
RateRouter.get('/', allRates);

/**
 * @swagger
 * /rates/{id}:
 *   put:
 *     summary: Update an existing rate
 *     tags: [Rate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the rate to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rateValue:
 *                 type: number
 *                 example: 5.0
 *               rateDescription:
 *                 type: string
 *                 example: "Outstanding service"
 *     responses:
 *       200:
 *         description: Rate updated successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *     url: /rates/{id}
 */
RateRouter.put('/:id', getToken, validateRate, updateRate);
/**
 * @swagger
 * /rates/{id}:
 *   delete:
 *     summary: Delete a rate
 *     tags: [Rate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the rate to delete
 *     responses:
 *       200:
 *         description: Rate deleted successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *     url: /rates/{id}
 */
RateRouter.delete('/:id', getToken, deleteRate);

export default RateRouter;
