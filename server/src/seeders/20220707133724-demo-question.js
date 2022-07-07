"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Questions",
      [
        {
          content:
            "để một máy tính truyền dữ liệu cho một số máy khác trong mạng, ta dùng loại địa chỉ",
          subjectId: "mmtcb",
          answerA: "Broadcast",
          answerB: "Broadband",
          answerC: "multicast",
          answerD: "multiple access",
          correctAnswer: "C",
          level: "0",
          teacherId: "gv02",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content:
            "While you are in the building, please wear your identification badge at all times so that you are ....... as a company employee.",
          subjectId: "avcb",
          answerA: "recognize",
          answerB: "recognizing",
          answerC: "recognizable",
          answerD: "recognizably",
          correctAnswer: "C",
          level: "1",
          teacherId: "gv02",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Questions", null, {});
  },
};
