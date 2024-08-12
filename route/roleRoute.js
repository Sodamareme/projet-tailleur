import express from 'express';
import { saveRole } from '../controller/roleController.js';

const RoleRouter = express.Router();

/**
 * @swagger
 * /role/save:
 *   post:
 *     summary: Create a new role
 *     description: This endpoint allows you to create a new role in the system.
 *     tags:
 *       - Role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Admin"
 *               description:
 *                 type: string
 *                 example: "Administrator role with full access"
 *     responses:
 *       201:
 *         description: Role added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role added successfully"
 *                 role:
 *                   $ref: '#/components/schemas/Role'
 *                 status:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Error while adding role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error while adding role"
 *                 error:
 *                   type: string
 *                 status:
 *                   type: boolean
 *                   example: false
 */
RoleRouter.post('/save', saveRole);

export default RoleRouter;
