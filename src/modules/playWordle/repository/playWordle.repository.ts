import { Model } from "sequelize";
import { handleError } from "../../../helpers";
import { DictionaryModel } from "../../../models/Dictionary/Dictionary.model";
import { UserModel } from "../../../models/User/User.model";

export const findWord = async (word: string, email: string) => {
  try {
    let data = await DictionaryModel.findOne({
      where: {
        word: word,
      },
      include: [
        {
          model: UserModel,
          where: {
            email,
          },
        },
      ],
    });
    return data
  } catch (error) {
    throw new Error(
      "Error al buscar la palabra, por favor intente de nuevo mas tarde"
    );
  }
};

export const registerWord = async (word: string, userId: number) => {
  try {
    const newDirectory: any = await DictionaryModel.create({
      word,
      userId: userId,
    });
    return newDirectory;
  } catch (error) {
    throw new Error(
      "Error al registrar la palabra, por favor intente de nuevo mas tarde"
    );
  }
};

export const addTries = async (userId: number, word: string) => {
  try {
    const findTries: any = await DictionaryModel.findOne({
      where: {
        userId: userId,
        word: word,
      },
    }).then((res: any) => {
      if (res) {
        if (res.tries < 5 && res.status === true) {
          res.update({
            tries: res.tries + 1,
          });
          return true;
        } else {
          res.update({
            status: false,
          });
          return false;
        }
      }
    });
   
    return findTries;
  } catch (error) {
    throw new Error(
      "Error al agregar intentos, por favor intente de nuevo mas tarde"
    );
  }
};

export const findWorkActive = async (userId: number) => {
  try {
    const findActive: any = await DictionaryModel.findOne({
      where: {
        userId: userId,
        status: true,
      },
    });
    return findActive;
  } catch (error) {
    throw new Error(
      "Error al buscar la palabra activa, por favor intente de nuevo mas tarde"
    );
  }
};

export const winnier = async (userId: number, word: string) => {
  try {
    const findActive: any = await DictionaryModel.findOne({
      where: {
        userId: userId,
        word: word,
      },
    });
    if (findActive) {
      findActive.update({
        status: false,
        winnier: true,
      });
    }
  } catch (error) {
    throw new Error("Error al actualizar el estado de la palabra");
  }
};

export const loseUser = async (userId: number, word: string) => {
  try {
    const findActive: any = await DictionaryModel.findOne({
      where: {
        userId: userId,
        word: word,
      },
    });
    if (findActive) {
      findActive.update({
        status: false,
      });
    }
  } catch (error) {
    throw new Error("Error al actualizar el estado de la palabra");
    
  }
};
