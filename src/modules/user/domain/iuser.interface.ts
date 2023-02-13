import { UserRegister } from "../types/user.type";

export interface IUser {
  register(user: UserRegister): Promise<string>;
}
