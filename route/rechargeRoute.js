import express from 'express';
import { getToken } from '../middlewares/authMiddleware.js';
import { newRecharge, recharging } from '../controller/rechargeController.js';

const RechargeRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recharge
 *   description: API endpoints for managing recharges
 */

/**
 * @swagger
 * /recharges/new-recharge:
 *   post:
 *     summary: Create a new recharge
 *     tags: [Recharge]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "userId123"
 *               amount:
 *                 type: number
 *                 example: 50.00
 *               description:
 *                 type: string
 *                 example: "Monthly subscription"
 *     responses:
 *       201:
 *         description: Recharge created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *     url: /recharges/new-recharge
 */
RechargeRouter.post('/new-recharge', getToken, newRecharge);

/**
 * @swagger
 * /recharges/recharging:
 *   post:
 *     summary: Process a recharge
 *     tags: [Recharge]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "userId123"
 *               amount:
 *                 type: number
 *                 example: 20.00
 *               paymentMethod:
 *                 type: string
 *                 example: "credit_card"
 *     responses:
 *       200:
 *         description: Recharge processed successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *     url: /recharges/recharging
 */
RechargeRouter.post('/recharging', getToken, recharging);

export default RechargeRouter;