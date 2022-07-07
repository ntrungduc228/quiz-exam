"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Exams", {
      classId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "Classes",
          key: "classId",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      subjectId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Subjects",
          key: "subjectId",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      times: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      teacherId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Teachers",
          key: "teacherId",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      timeExam: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dateExam: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      numOfEasy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      numOfMedium: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      numOfHard: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      state: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("Exams");
  },
};
