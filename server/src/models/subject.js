"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subject.hasMany(models.Question, {
        foreignKey: "subjectId",
        as: "questionSubjectData",
      });

      Subject.hasMany(models.Exam, {
        foreignKey: "subjectId",
        as: "examSubjectData",
      });

      Subject.hasMany(models.Score, {
        foreignKey: "subjectId",
        as: "scoreSubjectData",
      });

      Subject.hasMany(models.StudentExam, {
        foreignKey: "subjectId",
        as: "examDetailSubjectData",
      });
    }
  }
  Subject.init(
    {
      subjectId: { type: DataTypes.STRING, primaryKey: true },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Subject",
    }
  );
  return Subject;
};
