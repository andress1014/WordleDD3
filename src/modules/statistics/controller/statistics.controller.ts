import { Request, Response, Router } from "express";

import { handleError, handleResponse } from "../../../helpers";

import { verifytoken } from "../../../middleware/verifyToken.middleware";
import { StatisticsDomain } from "../domain/statistics.domain";

export const StatisticsControllers = Router();

StatisticsControllers.get('/user', verifytoken, async (req: Request, res: Response) => {
    const statisticsDomain = new StatisticsDomain();

    const result = await statisticsDomain.statistics(req.body.user.userId);
    
    handleResponse(res, 200, result);
});