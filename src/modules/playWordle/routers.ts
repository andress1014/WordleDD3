import express from "express";
import { verifytoken } from "../../middleware/verifyToken.middleware";

import { PlayWordleControllers } from "./controller/playWordle.controller";

export const PlayWordleRouter = express.Router();

PlayWordleRouter.use(verifytoken, PlayWordleControllers);
