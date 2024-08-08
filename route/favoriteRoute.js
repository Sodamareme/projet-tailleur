import express from 'express';
import { addToFavorites } from '../controller/favoriteController.js';
import { getToken } from '../middlewares/authMiddleware.js';

const FavoriteRouter = express.Router();

FavoriteRouter.post('/add-delete-favorite', getToken, addToFavorites);

export default FavoriteRouter;
