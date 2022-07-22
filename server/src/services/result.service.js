const db = require("../models");
const { transErrorsVi, transSuccessVi } = require("../../lang/vi");
const { Op } = require("sequelize");

let getListResultByStudentId = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resultList = await db.Score.findAll({
        raw: false,
        nest: true,
        where: {
          studentId: data.studentId,
        },
        attributes: { exclude: ["createdAt"] },
        include: [
          {
            model: db.Subject,
            as: "scoreSubjectData",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        order: [["date", "DESC"]],
      });

      return resolve({ data: resultList, success: true });
    } catch (error) {
      reject(error);
    }
  });
};

let getListResult = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resultList = await db.Score.findAll({
        raw: false,
        nest: true,

        attributes: { exclude: ["createdAt"] },
        include: [
          {
            model: db.Subject,
            as: "scoreSubjectData",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: db.Student,
            as: "scoreStudentData",
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
              {
                model: db.Class,
                as: "studentClassData",
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
          },
        ],
        order: [["date", "DESC"]],
      });

      return resolve({ data: resultList, success: true });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getListResultByStudentId,
  getListResult,
};
