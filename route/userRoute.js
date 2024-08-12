import express from 'express';
import { createUser, login, follow, unfollow, becomeTaillor } from '../controller/userController.js';
import { getToken } from '../middlewares/authMiddleware.js';

const UserRouter = express.Router();
/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Créer un utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Requête invalide
 */
UserRouter.post('/create', createUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants incorrects
 */
UserRouter.post('/login', login);

/**
 * @swagger
 * /user/follow:
 *   post:
 *     summary: Suivre un autre utilisateur
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIdToFollow:
 *                 type: string
 *                 example: "5f8d0d55b54764421b7156c7"
 *     responses:
 *       200:
 *         description: Utilisateur suivi avec succès
 *       400:
 *         description: Requête invalide
 */

UserRouter.post('/follow', getToken, follow);

/**
 * @swagger
 * /user/unfollow:
 *   post:
 *     summary: Ne plus suivre un utilisateur
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIdToUnfollow:
 *                 type: string
 *                 example: "5f8d0d55b54764421b7156c7"
 *     responses:
 *       200:
 *         description: Utilisateur non suivi avec succès
 *       400:
 *         description: Requête invalide
 */
UserRouter.post('/unfollow', getToken, unfollow);

/**
 * @swagger
 * /user/become-taillor:
 *   post:
 *     summary: Devenir tailleur
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tailleurDetails:
 *                 type: object
 *                 properties:
 *                   experienceYears:
 *                     type: integer
 *                     example: 5
 *                   specialization:
 *                     type: string
 *                     example: "Couture traditionnelle"
 *     responses:
 *       200:
 *         description: L'utilisateur est maintenant tailleur
 *       400:
 *         description: Requête invalide
 */
UserRouter.post('/become-taillor', getToken, becomeTaillor);


export default UserRouter;
