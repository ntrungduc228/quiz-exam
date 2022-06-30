"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Accounts",
      [
        {
          username: "n19dccn040",
          password: "123123",
          email: "n19dccn040@student.ptithcm.edu.vn",
          role: 2,
          state: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "n19dccn223",
          password: "123123",
          email: "n19dccn223@student.ptithcm.edu.vn",
          role: 2,
          state: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Accounts", null, {});
  },
};
