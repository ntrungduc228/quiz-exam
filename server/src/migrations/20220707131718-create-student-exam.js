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
      answer: {
        allowNull: false,
        type: Sequelize.STRING,
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
