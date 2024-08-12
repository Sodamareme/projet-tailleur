import express from 'express';
import { createStatue, deleteStatue, deleteAllStatues } from '../controller/statueController.js';
import { getToken } from '../middlewares/authMiddleware.js';

const StatueRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Statue
 *   description: API endpoints for managing statues
 */

/**
 * @swagger
 * /statues/create-statue:
 *   post:
 *     summary: Create a new statue
 *     tags: [Statue]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Statue of Liberty"
 *               description:
 *                 type: string
 *                 example: "A symbol of freedom"
 *               location:
 *                 type: string
 *                 example: "New York"
 *     responses:
 *       201:
 *         description: Statue created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *     url: /statues/create-statue
 */
StatueRouter.post('/create-statue', getToken, createStatue);

/**
 * @swagger
 * /statues/delete-statue/{id}:
 *   delete:
 *     summary: Delete a statue by ID
 *     tags: [Statue]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the statue to delete
 *         schema:
 *           type: string
 *           example: "statueId123"
 *     responses:
 *       200:
 *         description: Statue deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Statue not found
 *     url: /statues/delete-statue/{id}
 */
StatueRouter.delete('/delete-statue/:id', getToken, deleteStatue);

/**
 * @swagger
 * /statues/delete-all-statues:
 *   delete:
 *     summary: Delete all statues
 *     tags: [Statue]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All statues deleted successfully
 *       401:
 *         description: Unauthorized
 *     url: /statues/delete-all-statues
 */
StatueRouter.delete('/delete-all-statues', getToken, deleteAllStatues);

export default StatueRouter;
                                      