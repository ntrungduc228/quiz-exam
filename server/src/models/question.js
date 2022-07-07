"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.belongsTo(models.Teacher, {
        foreignKey: "teacherId",
        targetKey: "teacherId",
        as: "questionTeacherData",
      });

      Question.belongsTo(models.Subject, {
        foreignKey: "subjectId",
        targetKey: "subjectId",
        as: "questionSubjectData",
      });

      Question.hasMany(models.StudentExam, {
        foreignKey: "questionId",
        as: "examDetailQuestionData",
      });
    }
  }
  Question.init(
    {
      questionId: { type: DataTypes.INTEGER, primaryKey: true },
      content: DataTypes.STRING,
      subjectId: DataTypes.STRING,
      answerA: DataTypes.STRING,
      answerB: DataTypes.STRING,
      answerC: DataTypes.STRING,
      answerD: DataTypes.STRING,
      correctAnswer: DataTypes.STRING,
      level: DataTypes.INTEGER,
      teacherId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
