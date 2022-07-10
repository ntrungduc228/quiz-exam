const db = require("../models");
const { transErrorsVi, transSuccessVi } = require("../../lang/vi");
const { Op } = require("sequelize");
const { STATE_EXAM } = require("../utils/constants");

let getAllExams = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Exam.findAll({
        nest: true,
        raw: false,
        attributes: { exclude: ["createdAt", "updatedAt"] },

        order: [["updatedAt", "DESC"]],
      });

      return resolve({ data, success: true });
    } catch (error) {
      reject(error);
    }
  });
};

let createNewExam = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let examExists = await db.Exam.findOne({
        where: {
          classId: data.classId,
          subjectId: data.subjectId,
          times: data.times,
        },
      });
      if (examExists) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsExits("bài thi"),
        });
      }

      let examInstance = await db.Exam.create({
        classId: data.classId,
        subjectId: data.subjectId,
        times: data.times,
        teacherId: data.teacherId,
        timeExam: data.timeExam,
        dateExam: data.dateExam,
        numOfEasy: data.numOfEasy,
        numOfHard: data.numOfHard,
        numOfMedium: data.numOfMedium,
        state: STATE_EXAM.open,
      });

      return resolve({
        success: true,
        message: transSuccessVi.createNew("Bài thi"),
        data: examInstance,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let changeStateExam = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let examExists = await db.Exam.findOne({
        where: {
          classId: data.classId,
          subjectId: data.subjectId,
          times: data.times,
        },
      });
      if (!examExists) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("Bài thi"),
        });
      }

      let result = await db.Exam.update(
        {
          state: data?.newData?.state,
        },
        {
          where: {
            classId: data.classId,
            subjectId: data.subjectId,
            times: data.times,
          },
        }
      );

      if (result[0] === 1) {
        examInstance = await db.Exam.findOne({
          raw: false,
          nest: true,
          where: {
            classId: data.classId,
            subjectId: data.subjectId,
            times: data.times,
          },
        });

        return resolve({
          message: transSuccessVi.updateInstance("bài thi"),
          success: true,
          data: examInstance,
        });
      }

      return resolve({
        success: false,
        message: transErrorsVi.updateInstance("bài thi"),
      });

      return resolve({ data, success: true });
    } catch (error) {
      reject(error);
    }
  });
};

let deleteExam = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.Exam.destroy({
        where: {
          classId: data.classId,
          subjectId: data.subjectId,
          times: data.times,
        },
      });

      if (!result) {
        return resolve({
          success: false,
          message: transErrorsVi.deleteInstance("bài thi"),
        });
      }

      return resolve({
        success: true,
        message: transSuccessVi.deleteInstance("bài thi"),
        data: {
          classId: data.classId,
          subjectId: data.subjectId,
          times: data.times,
        },
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllExams,
  createNewExam,
  deleteExam,
  changeStateExam,
};
