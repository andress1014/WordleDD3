import { Request, Response, Router } from "express";
//***************** domains **************//
import { AuthDomain } from "../domain/auth.domain";
import { IAuth } from "../domain/Iauth.interface";
//****************helpers****************//
import { handleError, handleResponse, AppError } from "../../../helpers";
import { validateAuth } from "../validator/auth.validator";

export const AuthController = Router();

AuthController.post(
  "/login",
  validateAuth,
  async (req: Request, res: Response) => {
    let authDomain: IAuth = new AuthDomain();
    let result = await authDomain.login(req.body);
    handleResponse(res, 200, result);
  }
);


