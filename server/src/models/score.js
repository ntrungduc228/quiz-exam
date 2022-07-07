"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Score.belongsTo(models.Subject, {
        foreignKey: "subjectId",
        targetKey: "subjectId",
        as: "scoreSubjectData",
      });

      Score.belongsTo(models.Student, {
        foreignKey: "studentId",
        targetKey: "studentId",
        as: "scoreStudentData",
      });
    }
  }
  Score.init(
    {
      studentId: { type: DataTypes.STRING, primaryKey: true },
      subjectId: { type: DataTypes.STRING, primaryKey: true },
      times: { type: DataTypes.INTEGER, primaryKey: true },
      date: DataTypes.DATEONLY,
      score: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Score",
    }
  );
  return Score;
};
