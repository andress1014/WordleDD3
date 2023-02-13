import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { DictionaryAttributes } from "./dictionary.type";

import { connection } from "../../config/postgres/postgres-sequelize";
import { UserModel } from "../User/User.model";

const Dictionary = (sequelize: Sequelize): ModelDefined<DictionaryAttributes, DictionaryAttributes> => {
    return sequelize.define(
        "dictionary",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            word: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            tries: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            }, 
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            winnier: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            timestamps: true,
            tableName: "dictionary",
        }
    );
};

export const DictionaryModel = Dictionary(connection);

DictionaryModel.belongsTo(UserModel, { foreignKey: "userId" });