import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";

//*************** helpers ************************//
import { handleValidator } from "../../../helpers";

export const validateAuth = [
  check("email", "El correo es requerido").exists().isEmail().normalizeEmail(),
  check("password", "La contraseña es requerida").exists().isLength({ min: 1 }),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidator(req, res, next);
  },
];

