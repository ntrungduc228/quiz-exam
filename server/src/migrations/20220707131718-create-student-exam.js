"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StudentExams", {
      studentId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
          model: "Students",
          key: "studentId",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      questionId: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Questions",
          key: "questionId",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      subjectId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
          model: "Subjects",
          key: "subjectId",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      times: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      answer: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      number: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("StudentExams");
  },
};
