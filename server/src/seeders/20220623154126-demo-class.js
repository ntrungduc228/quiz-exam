"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Classes",
      [
        {
          classId: "D19CQCN03",
          name: "Công nghệ thông tin 3 khóa 2019",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          classId: "D19CQCN01",
          name: "Công nghệ thông tin 1 khóa 2019",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Classes", null, {});
  },
};
