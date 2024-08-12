import express from 'express';
import { addToFavorites } from '../controller/favoriteController.js';
import { getToken } from '../middlewares/authMiddleware.js';

const FavoriteRouter = express.Router();

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
 *               postId:
 *                 type: string
 *                 description: The ID of the post to be added or removed from favorites.
 *                 example: "64d789f9e0324d45a87ab123"
 *     responses:
 *       200:
 *         description: Successfully added or removed the post from favorites.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post added to favorites successfully"
 *                 status:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Failed to add or remove the post from favorites.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to add to favorites"
 *                 error:
 *                   type: object
 *                 status:
 *                   type: boolean
 *                   example: false
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
