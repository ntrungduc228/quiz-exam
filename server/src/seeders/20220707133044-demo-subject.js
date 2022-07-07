"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Subjects",
      [
        {
          subjectId: "mmtcb",
          name: "Mạng máy tính",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: "avcb",
          name: "Anh văn căn bản",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Subjects", null, {});
  },
};
