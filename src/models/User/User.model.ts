import { DataTypes, ModelDefined, Sequelize, UUIDV4 } from "sequelize";
import { UserAttributes } from "./user.type";
import bcrypt from "bcrypt";

import { connection } from "../../config/postgres/postgres-sequelize";

const User = (
  sequelize: Sequelize
): ModelDefined<UserAttributes, UserAttributes> => {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      games: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      wins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      tableName: "user",
      hooks: {
        beforeCreate: async (user: any) => {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(user.password, salt);
          user.password = hash;
        },

        beforeBulkUpdate: async (user: any) => {
          if (user.attributes.password !== undefined) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.attributes.password, salt);
            user.attributes.password = hash;
          }
        },
      },
    }
  );
};
export const UserModel = User(connection);
