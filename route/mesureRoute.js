import express from 'express';
import { getToken } from '../middlewares/authMiddleware.js';
import { createMesure, getAllMesures, updateMesure, deleteMesure } from '../controller/mesureController.js';

const MesureRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mesure
 *   description: API endpoints for managing measurements
 */

/**
 * @swagger
 * /mesures/create-mesure/{userId}:
 *   post:
 *     summary: Create a new measurement
 *     tags: [Mesure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user creating the measurement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: "Chest"
 *               value:
 *                 type: number
 *                 example: 92
 *     responses:
 *       201:
 *         description: Measurement created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

MesureRouter.post('/create-mesure/:userId', getToken, createMesure);
/**
 * @swagger
 * /mesures/get-mesure/{userId}:
 *   get:
 *     summary: Get all measurements for a user
 *     tags: [Mesure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve measurements for
 *     responses:
 *       200:
 *         description: List of measurements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "measurementId"
 *                   type:
 *                     type: string
 *                     example: "Chest"
 *                   value:
 *                     type: number
 *                     example: 92
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-12T10:00:00Z"
 *       401:
 *         description: Unauthorized
 */
MesureRouter.get('/get-mesure/:userId', getToken, getAllMesures);
/**
 * @swagger
 * /mesures/update-mesure/{userId}:
 *   put:
 *     summary: Update a measurement
 *     tags: [Mesure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user updating the measurement
 *       - in: query
 *         name: mesureId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the measurement to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: "Chest"
 *               value:
 *                 type: number
 *                 example: 95
 *     responses:
 *       200:
 *         description: Measurement updated successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
MesureRouter.put('/update-mesure/:userId', getToken, updateMesure);
/**
 * @swagger
 * /mesures/delete-mesure/{userId}:
 *   delete:
 *     summary: Delete a measurement
 *     tags: [Mesure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user deleting the measurement
 *       - in: query
 *         name: mesureId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the measurement to delete
 *     responses:
 *       200:
 *         description: Measurement deleted successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
MesureRouter.delete('/delete-mesure/:userId', getToken, deleteMesure);
export default MesureRouter;