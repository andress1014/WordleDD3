import { Op, Sequelize } from "sequelize";
import { DictionaryModel } from "../../../models/Dictionary/Dictionary.model";
import { UserModel } from "../../../models/User/User.model";

export const findIStatistics = async (userId: number) => {
  try {
    let statisticsInfo = {
      total: 0,
      winnier: 0,
      bestPLayer: [],
    };
    let total: any = await DictionaryModel.count({ where: { userId } });
    let winnier: any = await DictionaryModel.count({
      where: { userId, winnier: true },
    });
    let bestPLayer: any = await UserModel.findAll({
      order: [["wins", "DESC"]],
      attributes: ["name", "wins"],
      limit: 10,
    });
   
 
    statisticsInfo.total = total;
    statisticsInfo.winnier = winnier;
    statisticsInfo.bestPLayer = bestPLayer;
    return statisticsInfo;
  } catch (error) {
    console.log(error);
  }
};
