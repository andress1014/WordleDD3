import { Request, Response, Router } from "express";

import { handleError, handleResponse } from "../../../helpers";

import { verifytoken } from "../../../middleware/verifyToken.middleware";
import { PlayWordleDomain } from "../domain/playWordle.domain";
import {validatePlayWordle} from "../validator/playWordle.validator"; 

export const PlayWordleControllers = Router();

PlayWordleControllers.post(
  "/play",
  verifytoken,
  validatePlayWordle,
  async (req: Request, res: Response) => {
    const playWordleDomain = new PlayWordleDomain();
    const result = await playWordleDomain.play(req.body);

    handleResponse(res, 200, result);
  }
);
