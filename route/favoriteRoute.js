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
 * /favorite/add-delete-favorite:
 *   post:
 *     summary: Add or remove a post from the user's favorites.
 *     tags: [Favorites]
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
 *         description: Successfully added or removed favorite the post from favorites
 *               postId:
 *                 type: string
 *                 description: The ID of the post to be added or removed from favorites.
 *                 example: "64d789f9e0324d45a87ab123"
 *  
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: User or post not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
FavoriteRouter.post('/add-delete-favorite', getToken, addToFavorites);

export default FavoriteRouter;
