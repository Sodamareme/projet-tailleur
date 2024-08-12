import express from 'express';
import { getToken } from '../middlewares/authMiddleware.js';
import { createMesure, getAllMesures, updateMesure, deleteMesure } from '../controller/mesureController.js';

const MesureRouter = express.Router();

/**
 * @swagger
 * /create-mesure/{userId}:
 *   post:
 *     summary: Create a new mesure for a user
 *     tags: [Mesures]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to create the mesure for
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gender:
 *                 type: string
 *               shoulder:
 *                 type: number
 *               chest:
 *                 type: number
 *               waist:
 *                 type: number
 *               hips:
 *                 type: number
 *               sleeveLength:
 *                 type: number
 *               neck:
 *                 type: number
 *               bust:
 *                 type: number
 *               inseam:
 *                 type: number
 *     responses:
 *       200:
 *         description: Mesure created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 mesure:
 *                   $ref: '#/components/schemas/Mesure'
 *                 status:
 *                   type: boolean
 */
MesureRouter.post('/create-mesure/:userId', getToken, createMesure);

/**
 * @swagger
 * /get-mesure/{userId}:
 *   get:
 *     summary: Get all mesures for a user
 *     tags: [Mesures]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve mesures for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All mesures retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 mesures:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Mesure'
 *                 status:
 *                   type: boolean
 *       500:
 *         description: Error retrieving mesures
 */
MesureRouter.get('/get-mesure/:userId', getToken, getAllMesures);

/**
 * @swagger
 * /update-mesure/{userId}:
 *   put:
 *     summary: Update a mesure for a user
 *     tags: [Mesures]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to update the mesure for
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shoulder:
 *                 type: number
 *               chest:
 *                 type: number
 *               waist:
 *                 type: number
 *               hips:
 *                 type: number
 *               sleeveLength:
 *                 type: number
 *               neck:
 *                 type: number
 *               bust:
 *                 type: number
 *               inseam:
 *                 type: number
 *     responses:
 *       200:
 *         description: Mesure updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 mesure:
 *                   $ref: '#/components/schemas/Mesure'
 *                 status:
 *                   type: boolean
 */
MesureRouter.put('/update-mesure/:userId', getToken, updateMesure);

/**
 * @swagger
 * /delete-mesure/{userId}:
 *   delete:
 *     summary: Delete a mesure for a user
 *     tags: [Mesures]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to delete the mesure for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mesure deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: boolean
 */
MesureRouter.delete('/delete-mesure/:userId', getToken, deleteMesure);

export default MesureRouter;
