import { Request, Response, NextFunction } from 'express';

//*********************** helpers *****************************//
import { handleError, HttpCode, verifyToken } from '../helpers';

export enum MessageError {
  ERROR_TOKEN_AUTHORIZATION = "You don't have permissions for the request",
}

/**
 * Valida la existencia de un token de usuario valido
 * @param req Request de la petición
 * @param res Respuesta de la petición
 * @param next Funcion para dar continuidad con la aplicación
 */
export const verifytoken = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'];
  //Token para pruebas en postman
  const token = bearerHeader ? bearerHeader.split(' ')[1] : null;
  if (token) {
    const tokenDecoded: any = verifyToken(token);
    
    req.body.user ={
     userToken: token,
     userEmail: tokenDecoded.user.email,
     userId: tokenDecoded.user.userId
    }
    next();
  } else {
    handleError(res, HttpCode.FORBIDDEN, MessageError.ERROR_TOKEN_AUTHORIZATION);
  }
};
