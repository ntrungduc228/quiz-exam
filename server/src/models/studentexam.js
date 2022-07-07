"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentExam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentExam.belongsTo(models.Student, {
        foreignKey: "studentId",
        targetKey: "studentId",
        as: "examDetailStudentData",
      });

      StudentExam.belongsTo(models.Question, {
        foreignKey: "questionId",
        targetKey: "questionId",
        as: "examDetailQuestionData",
      });

      StudentExam.belongsTo(models.Subject, {
        foreignKey: "subjectId",
        targetKey: "subjectId",
        as: "examDetailSubjectData",
      });
    }
  }
  StudentExam.init(
    {
      studentId: { type: DataTypes.STRING, primaryKey: true },
      questionId: { type: DataTypes.INTEGER, primaryKey: true },
      subjectId: { type: DataTypes.STRING, primaryKey: true },
      answer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StudentExam",
    }
  );
  return StudentExam;
};
