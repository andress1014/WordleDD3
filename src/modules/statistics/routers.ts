import express from "express";
import { verifytoken } from "../../middleware/verifyToken.middleware";

import { StatisticsControllers } from "./controller/statistics.controller";

export const StatisticsRouter = express.Router();

StatisticsRouter.use(verifytoken, StatisticsControllers);
