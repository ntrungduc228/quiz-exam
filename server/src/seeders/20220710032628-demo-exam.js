"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Exams",
      [
        {
          classId: "D19CQCN03",
          subjectId: "mmtcb",
          times: 1,
          teacherId: "gv02",
          timeExam: 30,
          dateExam: new Date(),
          numOfEasy: 3,
          numOfMedium: 3,
          numOfHard: 3,
          state: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          classId: "D19CQCN03",
          subjectId: "avcb",
          times: 1,
          teacherId: "gv02",
          timeExam: 30,
          dateExam: new Date(),
          numOfEasy: 3,
          numOfMedium: 3,
          numOfHard: 3,
          state: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Exams", null, {});
  },
};
