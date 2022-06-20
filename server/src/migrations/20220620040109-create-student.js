"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Students", {
      studentId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "Accounts",
          key: "username",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      classId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Classes",
          key: "classId",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      gender: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.dropTable("Students");
  },
};
