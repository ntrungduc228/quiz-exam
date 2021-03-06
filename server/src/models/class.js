"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Class.hasMany(models.Student, {
        foreignKey: "classId",
        as: "studentClassData",
      });

      Class.hasMany(models.Exam, {
        foreignKey: "classId",
        as: "examClassData",
      });
    }
  }
  Class.init(
    {
      classId: { type: DataTypes.STRING, primaryKey: true },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
