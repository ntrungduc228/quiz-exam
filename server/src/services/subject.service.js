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
      let subjectExists = await db.Subject.findOne({
        where: {
          [Op.or]: [{ subjectId: data.subjectId }, { name: data.name }],
        },
      });

      if (subjectExists) {
        let existsCol =
          subjectExists.subjectId === data.subjectId
            ? "Mã môn học"
            : "Tên môn học";

        return resolve({
          success: false,
          message: transErrorsVi.instanceIsExits(existsCol),
        });
      }

      const newInstance = await db.Subject.create({
        subjectId: data.subjectId,
        name: data.name,
      });

      return resolve({
        message: transSuccessVi.createNew("môn học"),
        success: true,
        data: newInstance,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateSubjectById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let subjectExists = await db.Subject.findOne({
        where: {
          subjectId: data.subjectId,
        },
      });

      if (!subjectExists) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("môn học"),
        });
      }
      return resolve({
        success: true,
        message: transSuccessVi.updateInstance("môn học"),
      });
    } catch (error) {
      reject(error);
    }
  });
};

let deleteSubjectById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let subjectExists = await db.Subject.findOne({
        where: {
          subjectId: data.subjectId,
        },
      });

      if (!subjectExists) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("môn học"),
        });
      }

      await db.Subject.destroy({
        where: {
          subjectId: data.subjectId,
        },
      });

      return resolve({
        success: true,
        message: transSuccessVi.deleteInstance("môn học"),
        data: data.subjectId,
      });
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
