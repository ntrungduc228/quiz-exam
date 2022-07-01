const db = require("../models");
const { transErrorsVi, transSuccessVi, transMailVi } = require("../../lang/vi");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const emailService = require("./email.service");

let salt = bcrypt.genSaltSync(10);

let getAllStudents = () => {
  return new Promise(async (resolve, reject) => {
    console.log("fsd", db.Student.associations);
    try {
      let data = await db.Student.findAll({
        nest: true,
        raw: false,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.Account,
            as: "studentAccountData",
            attributes: ["email", "state"],
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

let createNewStudent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let studentExists = await db.Student.findOne({
        where: {
          [Op.or]: [{ studentId: data.studentId }, { phone: data.phone }],
        },
      });

      let existsCol = "";
      if (studentExists) {
        existsCol =
          studentExists.studentId === data.studentId ? "Mã sinh viên" : "";
        if (studentExists.phone === data.phone) {
          existsCol += existsCol ? ", số điện thoại" : "Số điện thoại";
        }
      }

      let accountExists = await db.Account.findOne({
        where: {
          [Op.or]: [{ email: data.email }, { username: data.studentId }],
        },
      });
      if (accountExists) {
        if (accountExists?.email === data.email) {
          existsCol += existsCol ? ", email" : "Email";
        }
        if (accountExists?.username === data.studentId) {
          existsCol += existsCol ? ", username" : "Username";
        }
      }

      let classExists = await db.Class.findOne({
        where: { classId: data.classId },
      });
      if (!classExists) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("lớp học"),
        });
      }

      if (existsCol) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsExits(existsCol),
        });
      }

      let password = uuidv4().slice(0, 6);
      const accountInstance = await db.Account.create({
        username: data.studentId,
        password: bcrypt.hashSync(password, salt),
        email: data.email,
        role: 2,
        state: 2,
      });

      const newInstance = await db.Student.create({
        studentId: data.studentId,
        lastName: data.lastName,
        firstName: data.firstName,
        phone: data.phone,
        classId: data.classId,
        gender: data.gender,
        birthday: data.birthday,
      });

      let REACT_APP_URL = process.env.REACT_APP_URL;
      let link = `${REACT_APP_URL}/signin`;
      emailService
        .sendMail(
          data.email,
          transMailVi.subject,
          transMailVi.template(data.studentId, password, link)
        )
        .then((success) => {
          return resolve({
            message: transSuccessVi.createNew("sinh viên"),
            success: true,
            data: {
              // studentId: newInstance.studentId,
              // lastName: newInstance.lastName,
              // firstName: newInstance.firstName,
              // phone: newInstance.phone,
              // classId: newInstance.classId,
              // gender: newInstance.gender,
              // birthday: newInstance.birthday,
              ...newInstance.dataValues,
              studentAccountData: {
                email: accountInstance.email,
                state: accountInstance.state,
              },
            },
          });
        })
        .catch(function (err) {
          console.log("err sign up", err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

let updateStudentById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let studentInstance = await db.Student.findOne({
        where: {
          [Op.or]: [
            { studentId: data.studentId },
            { phone: data?.newData?.phone },
          ],
        },
      });
      if (!studentInstance) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("sinh viên"),
        });
      }
      if (
        studentInstance.phone === data?.newData?.phone &&
        studentInstance.studentId !== data.studentId
      ) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsExits("Số điện thoại"),
        });
      }

      let result = await db.Student.update(
        {
          lastName: data?.newData.lastName,
          firstName: data?.newData.firstName,
          phone: data?.newData.phone,
          classId: data?.newData.classId,
          gender: data?.newData.gender,
          birthday: data?.newData.birthday,
        },
        { where: { studentId: data.studentId } }
      );

      if (result[0] == 1) {
        studentInstance = await db.Student.findOne({
          where: {
            studentId: data.studentId,
          },
          raw: false,
          nest: true,
          include: [
            {
              model: db.Account,
              as: "studentAccountData",
              attributes: ["email", "state"],
            },
          ],
        });

        return resolve({
          success: true,
          message: transSuccessVi.updateInstance("sinh viên"),
          data: studentInstance,
        });
      }

      return resolve({
        success: false,
        message: transErrorsVi.updateInstance("sinh viên"),
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllStudents,
  createNewStudent,
  updateStudentById,
};
