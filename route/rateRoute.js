import express from 'express';
import { createRate, allRates, updateRate, deleteRate } from '../controller/rateController.js';
import { getToken } from '../middlewares/authMiddleware.js';
import { validateRate } from '../middlewares/validatorMiddleware.js';

const RateRouter = express.Router();

/**
 * @swagger
 * /rate/create-rate:
 *   post:
 *     summary: Create a new rate for a post.
 *     tags: [Rates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stars
 *               - postId
 *             properties:
 *               stars:
 *                 type: integer
 *                 description: Number of stars (1-5).
 *                 example: 4
 *               description:
 *                 type: string
 *                 description: Optional description of the rating. Required if stars are 2 or less.
 *                 example: "Great post!"
 *               postId:
 *                 type: string
 *                 description: The ID of the post being rated.
 *                 example: "64d789f9e0324d45a87ab123"
 *     responses:
 *       201:
 *         description: Rate created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post rated successfully"
 *       400:
 *         description: Bad request, including errors like rating your own post or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You cannot rate your own post"
 *       404:
 *         description: Post not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post not found"
 */
RateRouter.post('/create-rate', getToken, validateRate, createRate);

/**
 * @swagger
 * /rate/:
 *   get:
 *     summary: Get all rates.
 *     tags: [Rates]
 *     responses:
 *       200:
 *         description: A list of all rates.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   stars:
 *                     type: integer
 *                     example: 4
 *                   description:
 *                     type: string
 *                     example: "Great post!"
 *                   user:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         example: "john_doe"
 *                   post:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "Amazing Tailoring Tips"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
RateRouter.get('/', allRates);

/**
 * @swagger
 * /rate/{id}:
 *   put:
 *     summary: Update a rate.
 *     tags: [Rates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the rate to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stars:
 *                 type: integer
 *                 description: Updated number of stars (1-5).
 *                 example: 3
 *               description:
 *                 type: string
 *                 description: Updated description of the rating.
 *                 example: "Good post."
 *     responses:
 *       200:
 *         description: Rate updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rate updated successfully"
 *       400:
 *         description: Bad request, including trying to update a rate that doesn't belong to the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You are not authorized to update this rate"
 *       404:
 *         description: Rate not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rate not found"
 */
RateRouter.put('/:id', getToken, validateRate, updateRate);

/**
 * @swagger
 * /rate/{id}:
 *   delete:
 *     summary: Delete a rate.
 *     tags: [Rates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the rate to delete.
 *     responses:
 *       200:
 *         description: Rate deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rate deleted successfully"
 *       400:
 *         description: Bad request, including trying to delete a rate that doesn't belong to the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You are not authorized to delete this rate"
 *       404:
 *         description: Rate not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rate not found"
 */
RateRouter.delete('/:id', getToken, deleteRate);

export default RateRouter;
