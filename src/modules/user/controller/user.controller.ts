import { Request, Response, Router } from "express";

import { handleError, handleResponse } from "../../../helpers";

import { verifytoken } from "../../../middleware/verifyToken.middleware";
import { UserDomain } from "../domain/user.domain";
import { validateRegister } from "../validator/auth.validator";

export const UserControllers = Router();

UserControllers.post(
  "/register",
  validateRegister,
  async (req: Request, res: Response) => {
    const userDomain = new UserDomain();

    const result = await userDomain.register(req.body);
    handleResponse(res, 200, result);
  }
);
