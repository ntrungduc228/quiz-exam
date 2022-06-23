"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.hasOne(models.Student, {
        foreignKey: "studentId",
        as: "studentAccountData",
      });

      Account.hasOne(models.Teacher, {
        foreignKey: "teacherId",
        as: "teacherAccountData",
      });
    }
  }
  Account.init(
    {
      username: { type: DataTypes.STRING, primaryKey: true },
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.INTEGER,
      state: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Account",
    }
  );
  return Account;
};
