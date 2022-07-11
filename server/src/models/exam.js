"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exam.belongsTo(models.Class, {
        foreignKey: "classId",
        targetKey: "classId",
        as: "examClassData",
      });

      Exam.belongsTo(models.Subject, {
        foreignKey: "subjectId",
        targetKey: "subjectId",
        as: "examSubjectData",
      });

      Exam.belongsTo(models.Teacher, {
        foreignKey: "teacherId",
        targetKey: "teacherId",
        as: "examTeacherData",
      });
    }
  }
  Exam.init(
    {
      classId: { type: DataTypes.STRING, primaryKey: true },
      subjectId: { type: DataTypes.STRING, primaryKey: true },
      times: { type: DataTypes.INTEGER, primaryKey: true },
      teacherId: DataTypes.STRING,
      timeExam: DataTypes.INTEGER,
      dateExam: DataTypes.DATEONLY,
      numOfEasy: DataTypes.INTEGER,
      numOfMedium: DataTypes.INTEGER,
      numOfHard: DataTypes.INTEGER,
      state: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Exam",
    }
  );
  return Exam;
};
