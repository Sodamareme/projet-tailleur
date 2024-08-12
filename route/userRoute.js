import express from 'express';
import { createUser, login, follow, unfollow, becomeTaillor } from '../controller/userController.js';
import { getToken } from '../middlewares/authMiddleware.js';
const UserRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API pour gérer les utilisateurs
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: |
 *                   L'adresse e-mail de l'utilisateur. 
 *                   Doit être unique et au format valide.
 *               password:
 *                 type: string
 *                 description: |
 *                   Le mot de passe de l'utilisateur. 
 *                   Doit contenir au moins 8 caractères avec une combinaison de lettres majuscules, minuscules, chiffres, et symboles.
 *               confirmPassword:
 *                 type: string
 *                 description: |
 *                   Confirmation du mot de passe. 
 *                   Doit correspondre au mot de passe.
 *               lastname:
 *                 type: string
 *                 description: |
 *                   Le nom de famille de l'utilisateur.
 *               firstname:
 *                 type: string
 *                 description: |
 *                   Le prénom de l'utilisateur.
 *               phoneNumber:
 *                 type: string
 *                 description: |
 *                   Le numéro de téléphone de l'utilisateur. 
 *                   Doit être unique et au format valide.
 *               address:
 *                 type: string
 *                 description: |
 *                   L'adresse de l'utilisateur.
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [SIMPLE, TAILOR]
 *                   description: |
 *                     Le rôle de l'utilisateur. Peut être "SIMPLE", "TAILOR", ou les deux.
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur de validation ou utilisateur déjà existant
 */
UserRouter.post('/create', createUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Connecte un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: |
 *                   Le nom d'utilisateur utilisé lors de l'inscription.
 *               password:
 *                 type: string
 *                 description: |
 *                   Le mot de passe associé au compte utilisateur.
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Nom d'utilisateur ou mot de passe incorrect
 */
UserRouter.post('/login', login);

/**
 * @swagger
 * /user/follow:
 *   post:
 *     summary: Suivre un autre utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetUserId:
 *                 type: string
 *                 description: |
 *                   L'identifiant de l'utilisateur que vous souhaitez suivre. 
 *                   Cet ID doit être valide et exister dans la base de données.
 *     responses:
 *       200:
 *         description: Suivi avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur cible non trouvé
 */
UserRouter.post('/follow', getToken, follow);

/**
 * @swagger
 * /user/unfollow:
 *   post:
 *     summary: Ne plus suivre un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetUserId:
 *                 type: string
 *                 description: |
 *                   L'identifiant de l'utilisateur que vous souhaitez ne plus suivre. 
 *                   Cet ID doit être valide et exister dans la base de données.
 *     responses:
 *       200:
 *         description: Ne suit plus avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur cible non trouvé
 */
UserRouter.post('/unfollow', getToken, unfollow);

/**
 * @swagger
 * /user/become-taillor:
 *   post:
 *     summary: Devenir tailleur
 *     tags: [Users]
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
 *                 description: |
 *                   Informations sur le tailleur, incluant son expérience et ses compétences.
 *                 properties:
 *                   experience:
 *                     type: string
 *                     description: |
 *                       Nombre d'années d'expérience en couture.
 *                   skills:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: |
 *                       Une liste des compétences du tailleur. 
 *                       Chaque compétence doit être un mot ou une phrase décrivant une aptitude spécifique en couture.
 *     responses:
 *       200:
 *         description: Statut de tailleur attribué avec succès
 *       401:
 *         description: Non autorisé
 *       400:
 *         description: Données invalides
 */
UserRouter.post('/become-taillor', getToken, becomeTaillor);

export default UserRouter;
