const db = require("../models");
const { transErrorsVi, transSuccessVi } = require("../../lang/vi");
const { Op } = require("sequelize");

let getAllClasses = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Class.findAll({
        nest: true,
        raw: false,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.Student,
            as: "studentClassData",
            // attributes: ["studentId", "valueVi"],
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

let getClassById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let classInstance = await db.Class.findOne({
        raw: false,
        nest: true,
        where: {
          classId: id,
        },
        include: [
          {
            model: db.Student,
            as: "studentClassData",
          },
        ],
      });

      if (!classInstance) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("lớp học"),
        });
      }

      return resolve({
        success: true,
        data: classInstance,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let createNewClass = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let classExists = await db.Class.findOne({
        where: {
          [Op.or]: [{ classId: data.classId }, { name: data.name }],
        },
      });

      if (classExists) {
        let existsCol =
          classExists.classId === data.classId ? "Mã lớp" : "Tên lớp";

        return resolve({
          success: false,
          message: transErrorsVi.instanceIsExits(existsCol),
        });
      }
      const newInstance = await db.Class.create({
        classId: data.classId,
        name: data.name,
      });

      return resolve({
        message: transSuccessVi.createNew("lớp học"),
        success: true,
        data: newInstance,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateClassById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let classInstance = await db.Class.findOne({
        raw: false,
        nest: true,
        where: {
          classId: data.classId,
        },
        include: [
          {
            model: db.Student,
            as: "studentClassData",
          },
        ],
      });

      if (!classInstance) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("lớp học"),
        });
      }

      if (classInstance?.studentClassData.length > 0) {
        return resolve({
          success: false,
          message: transErrorsVi.updateInstance("lớp học"),
        });
      }

      let obj = {};
      if (data?.newData.classId != classInstance.classId) {
        obj.classId = data?.newData.classId;
      }
      if (data?.newData.name != classInstance.name) {
        obj.name = data?.newData.name;
      }
      let classExists = await db.Class.findOne({
        where: {
          [Op.or]: [
            { classId: data?.newData.classId },
            { name: data?.newData.name },
          ],
        },
      });

      if (classExists && classExists.classId != data.classId) {
        let existsCol =
          classExists.classId === data?.newData.classId ? "Mã lớp" : "Tên lớp";

        return resolve({
          success: false,
          message: transErrorsVi.instanceIsExits(existsCol),
        });
      }

      let result = await db.Class.update(
        { classId: data?.newData.classId, name: data?.newData.name },
        {
          where: {
            classId: data.classId,
          },
        }
      );

      if (result[0] === 1) {
        classInstance = await db.Class.findOne({
          raw: false,
          nest: true,
          where: {
            classId: data?.newData.classId,
          },
          include: [
            {
              model: db.Student,
              as: "studentClassData",
            },
          ],
        });

        return resolve({
          message: transSuccessVi.updateInstance("lớp học"),
          success: true,
          data: classInstance,
        });
      }

      return resolve({
        success: false,
        message: transErrorsVi.updateInstance("lớp học"),
      });
    } catch (error) {
      reject(error);
    }
  });
};

let deleteClassById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let classInstance = await db.Class.findOne({
        raw: false,
        nest: true,
        where: {
          classId: id,
        },
        include: [
          {
            model: db.Student,
            as: "studentClassData",
          },
        ],
      });

      if (!classInstance) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("lớp học"),
        });
      }

      if (classInstance?.studentClassData.length > 0) {
        return resolve({
          success: false,
          message: transErrorsVi.deleteInstance("lớp học"),
        });
      }

      let result = await db.Class.destroy({
        where: {
          classId: id,
        },
      });

      if (!result) {
        return resolve({
          success: false,
          message: transErrorsVi.deleteInstance("lớp học"),
        });
      }

      return resolve({
        success: true,
        message: transSuccessVi.deleteInstance("lớp học"),
        data: classInstance,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllClasses,
  createNewClass,
  getClassById,
  updateClassById,
  deleteClassById,
};
