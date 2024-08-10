import express from 'express';
import { getToken } from '../middlewares/authMiddleware.js';
import { createMesure, getAllMesures, updateMesure, deleteMesure } from '../controller/mesureController.js';

const MesureRouter = express.Router();

MesureRouter.post('/create-mesure/:userId', getToken, createMesure);
MesureRouter.get('/get-mesure/:userId', getToken, getAllMesures);
MesureRouter.put('/update-mesure/:userId', getToken, updateMesure);
MesureRouter.delete('/delete-mesure/:userId', getToken, deleteMesure);

export default MesureRouter;