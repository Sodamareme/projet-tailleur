import { createView } from "../controller/viewController.js";
import express from 'express';
import { getToken } from '../middlewares/authMiddleware.js';



const viewRouter = express.Router();

viewRouter.get("/create/:postId",getToken, createView);

export default viewRouter;