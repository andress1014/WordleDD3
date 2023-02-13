import { createToken } from "../../../helpers";
import { TokenType } from "../../auth/types/auth.type";
import { createUser } from "../repository/user.repository";
import { UserRegister } from "../types/user.type";
import { IUser } from "./iuser.interface";

export class UserDomain implements IUser {
  async register(user: UserRegister): Promise<string> {
    const newUser: any = await createUser(user);
    const dataUser: TokenType = {
      email: newUser.email,
      userId: newUser.id,
    };

    return createToken(dataUser);
  }
}
