import express from 'express';
import { getToken } from '../middlewares/authMiddleware.js';
import { newRecharge, recharging } from '../controller/rechargeController.js';

const RechargeRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recharge
 *   description: API pour gérer les rechargements
 */

/**
 * @swagger
 * /recharge/new-recharge:
 *   post:
 *     summary: Connecte un utilisateur
 *     tags: [Recharge]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 description: |
 *                   Le montant de rechargement
 *     responses:
 *       200:
 *         description: Rechargement réussi avec succès
 *       401:
 *         description: Vous n'êtes pas authentifié
 */
RechargeRouter.post('/new-recharge', getToken, newRecharge);

/**
 * @swagger
 * /recharge/recharging:
 *   post:
 *     summary: Connecte un utilisateur
 *     tags: [Recharge]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 description: |
 *                   Le montant de rechargement
 *     responses:
 *       200:
 *         description: Rechargement réussi avec succès
 *       401:
 *         description: Vous n'êtes pas authentifié
 */
RechargeRouter.post('/recharging', getToken, recharging);

export default RechargeRouter;