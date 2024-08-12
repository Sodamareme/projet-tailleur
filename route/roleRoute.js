import express from 'express';
import { saveRole } from '../controller/roleController.js';

const RoleRouter = express.Router();

/**
 * @swagger
 * /role/save:
 *   post:
 *     summary: Créer un nouveau rôle
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *                 description: Le nom du rôle
 *     responses:
 *       200:
 *         description: Rôle créé avec succès
 *       400:
 *         description: Requête invalide
 */
RoleRouter.post('/save', saveRole);

export default RoleRouter;
