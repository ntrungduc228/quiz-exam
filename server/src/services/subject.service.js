const db = require("../models");
const { transErrorsVi, transSuccessVi } = require("../../lang/vi");
const { Op } = require("sequelize");

let getAllSubjects = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Subject.findAll({
        nest: true,
        raw: false,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.Question,
            as: "questionSubjectData",
          },
        ],
        order: [["updatedAt", "DESC"]],
      });

      return resolve({ data, success: true });
    } catch (error) {
      reject(error);
    }
  });
};

let createNewSubject = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

let updateSubjectById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

let deleteSubjectById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllSubjects,
  createNewSubject,
  updateSubjectById,
  deleteSubjectById,
};
