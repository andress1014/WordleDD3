import { UserModel } from "../../../models/User/User.model";

export const createUser = async (user: any) => {
  try {
    const newUser = await UserModel.create(user);
    return newUser;
  } catch (error) {
      throw new Error(
        "Error en crear usuario"
      );
  }

};
