import express from 'express';
import { verifytoken } from '../../middleware/verifyToken.middleware';


import {UserControllers} from "./controller/user.controller";

export const UserRouter = express.Router();

UserRouter.use( UserControllers);