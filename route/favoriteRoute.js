import express from 'express';
import { addToFavorites, removeFromFavorites } from '../controller/favoriteController.js';
import { getToken } from '../middlewares/authMiddleware.js';

const FavoriteRouter = express.Router();

FavoriteRouter.post('/add/:id', getToken, addToFavorites);
FavoriteRouter.post('/remove', getToken, removeFromFavorites);

export default FavoriteRouter;
