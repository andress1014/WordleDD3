import express from "express";
import { AuthController } from "./controller/auth.controller";

export const AuthRouter = express.Router();

AuthRouter.use(AuthController);