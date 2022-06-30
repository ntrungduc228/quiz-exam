"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Students",
      [
        {
          studentId: "n19dccn040",
          lastName: "Nguyễn Trung",
          firstName: "Đức",
          phone: "0967727720",
          classId: "D19CQCN03",
          gender: true,
          birthday: "2001-08-22",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          studentId: "n19dccn223",
          lastName: "Nguyễn Thị Khánh",
          firstName: "Vi",
          phone: "0932312807",
          classId: "D19CQCN03",
          gender: false,
          birthday: "2001-04-29",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Students", null, {});
  },
};
