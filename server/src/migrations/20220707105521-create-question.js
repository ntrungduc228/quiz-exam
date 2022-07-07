"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Questions", {
      questionId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      subjectId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "Subjects",
          key: "subjectId",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      answerA: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      answerB: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      answerC: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      answerD: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      correctAnswer: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      level: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      teacherId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "Teachers",
          key: "teacherId",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Questions");
  },
};
