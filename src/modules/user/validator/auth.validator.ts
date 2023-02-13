import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";

//*************** helpers ************************//
import { handleValidator } from "../../../helpers";

export const validateRegister = [
  check("name", "El nombre es requerido").exists().isLength({ min: 1 }),
  check("email", "El email es requerido").exists().isEmail().normalizeEmail(),
  check("password", "La contraseña es requerida").exists().isLength({ min: 1 }),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidator(req, res, next);
  },
];

