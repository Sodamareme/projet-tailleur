import express from 'express';
import { saveRole } from '../controller/roleController.js';

const RoleRouter = express.Router();

RoleRouter.post('/save', saveRole);

export default RoleRouter;