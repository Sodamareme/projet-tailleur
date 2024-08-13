import express from 'express';
import { createPost, getAllPosts, updatePost, deletePost, sharePost, disableShareButton, reportPost } from '../controller/postController.js';
import { getToken } from '../middlewares/authMiddleware.js';
import { validatePost } from '../middlewares/validatorMiddleware.js';

const PostRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: API pour gérer les publications
 */

/**
 * @swagger
 * /post/create-post:
 *   post:
 *     summary: Créer une nouvelle publication
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 content: string
 *                 description: Titre de la publication
 *               description:
 *                 type: string
 *                 description: Contenu de la publication
 *             required:
 *               - content
 *               - description
 *     responses:
 *       201:
 *         description: Publication créée avec succès
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non autorisé
 */
PostRouter.post('/create-post', getToken, validatePost, createPost);

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Obtenir toutes les publications
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des publications
 *       401:
 *         description: Non autorisé
 */
PostRouter.get('/', getToken, getAllPosts);

/**
 * @swagger
 * /post/update-post/{id}:
 *   put:
 *     summary: Mettre à jour une publication
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la publication à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titre de la publication
 *               content:
 *                 type: string
 *                 description: Contenu de la publication
 *     responses:
 *       200:
 *         description: Publication mise à jour avec succès
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Publication non trouvée
 */
PostRouter.put('/update-post/:id', getToken, validatePost, updatePost);

/**
 * @swagger
 * /post/delete-post/{id}:
 *   delete:
 *     summary: Supprimer une publication
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la publication à supprimer
 *     responses:
 *       200:
 *         description: Publication supprimée avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Publication non trouvée
 */
PostRouter.delete('/delete-post/:id', getToken, deletePost);

/**
 * @swagger
 * /post/share-post/{id}:
 *   post:
 *     summary: Partager une publication
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la publication à partager
 *     responses:
 *       200:
 *         description: Publication partagée avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Publication non trouvée
 */
PostRouter.post('/share-post/:id', getToken, sharePost);

/**
 * @swagger
 * /post/disable-share/{id}:
 *   put:
 *     summary: Désactiver le partage d'une publication
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la publication pour désactiver le partage
 *     responses:
 *       200:
 *         description: Partage désactivé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Publication non trouvée
 */
PostRouter.put('/disable-share/:id', getToken, disableShareButton);

/**
 * @swagger
 * /post/report-post/{postId}:
 *   post:
 *     summary: Signaler une publication
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la publication à signaler
 *     responses:
 *       200:
 *         description: Publication signalée avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Publication non trouvée
 */
PostRouter.post('/report-post/:postId', getToken, reportPost);

export default PostRouter;
