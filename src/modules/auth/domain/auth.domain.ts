import bcrypt from "bcrypt";

//***************** types **************//
import { AuthType, TokenType } from "../types/auth.type";
import { ResponseAuthType } from "../types/responseAuth.type";
//***************** interfaces **************//
import { IAuth } from "./Iauth.interface";
//***************** models **************//
import { UserModel } from "../../../models/User/User.model";
import { createToken } from "../../../helpers";

/**
 * @typedef {object} AuthDomain
 * @property {function} login - Función que valida el usuario y genera el token
 * @property {function} validateUser - Función que valida el usuario
 * @property {function} validatePassword - Función que valida la contraseña
 * @property {function} generateToken - Función que genera el token
 */
export class AuthDomain implements IAuth {
  async login(auth: AuthType): Promise<any> {
    return this.validateUser(auth);
  }


  async validateUser(auth: AuthType): Promise<any> {
    const { email, password } = auth;

    const findUser: any = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (findUser) {
      return this.validatePassword(password, findUser);
    } else {
      return { message: "Usuario no encontrado" };
    }
  }
   async validatePassword(
    password: string,
    findUser: any
  ): Promise<any> {
    const match = await bcrypt.compare(password, findUser.password);
    const dataUser: TokenType = {
      email: findUser.email,
      userId: findUser.id,
    };
    if (match) {
      return createToken(dataUser);
    } else {
      return { message: "Contraseña incorrecta" };
    }
  }
}
