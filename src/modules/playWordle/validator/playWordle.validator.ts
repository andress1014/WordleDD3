import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";

import { handleValidator } from "../../../helpers";


export const validatePlayWordle = [
    check("word", "the word is required").exists()
    .isLength({ min: 5 }).withMessage("El campo word debe tener 5 caracteres").isLength({ max: 5 }).withMessage("El campo word debe tener 5 caracteres"),
    (req: Request, res: Response, next: NextFunction) => {
        handleValidator(req, res, next);
    }
]