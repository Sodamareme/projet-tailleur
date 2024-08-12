import express from 'express';
import { addToFavorites } from '../controller/favoriteController.js';
import { getToken } from '../middlewares/authMiddleware.js';

const FavoriteRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favorite
 *   description: API endpoints for managing user favorites
 */

/**
 * @swagger
 * /favorites/add-delete-favorite:
 *   post:
 *     summary: Add or remove a favorite item
 *     tags: [Favorite]
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
 *                 example: "1234567890abcdef"
 *               itemId:
 *                 type: string
 *                 example: "abcdef1234567890"
 *               action:
 *                 type: string
 *                 enum: [add, remove]
 *                 example: "add"
 *     responses:
 *       200:
 *         description: Successfully added or removed favorite
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Favorite added successfully"
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request, invalid input
 */
FavoriteRouter.post('/add-delete-favorite', getToken, addToFavorites);

export default FavoriteRouter;
