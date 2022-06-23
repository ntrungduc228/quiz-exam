"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Teacher.belongsTo(models.Account, {
        foreignKey: "teacherId",
        targetKey: "username",
        as: "teacherAccountData",
      });
    }
  }
  Teacher.init(
    {
      teacherId: { type: DataTypes.STRING, primaryKey: true },
      lastName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      phone: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Teacher",
    }
  );
  return Teacher;
};
