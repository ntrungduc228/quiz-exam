"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.Class, {
        foreignKey: "classId",
        targetKey: "classId",
        as: "studentClassData",
      });

      Student.belongsTo(models.Account, {
        foreignKey: "studentId",
        targetKey: "username",
        as: "studentAccountData",
      });
    }
  }
  Student.init(
    {
      studentId: { type: DataTypes.STRING, primaryKey: true },
      lastName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      phone: DataTypes.STRING,
      classId: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      birthday: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Student",
    }
  );
  return Student;
};
