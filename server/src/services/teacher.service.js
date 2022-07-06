const db = require("../models");
const { transErrorsVi, transSuccessVi, transMailVi } = require("../../lang/vi");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const emailService = require("./email.service");

let salt = bcrypt.genSaltSync(10);

let getAllTeachers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Teacher.findAll({
        nest: true,
        raw: false,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.Account,
            as: "teacherAccountData",
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

let createNewTeacher = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let teacherExists = await db.Teacher.findOne({
        where: {
          [Op.or]: [{ teacherId: data.teacherId }, { phone: data.phone }],
        },
      });

      let existsCol = "";
      if (teacherExists) {
        existsCol +=
          teacherExists.teacherId === data.teacherId ? "Mã giảng viên" : "";
        if (teacherExists.phone === data.phone) {
          existsCol += existsCol ? ", số điện thoại" : "Số điện thoại";
        }
      }

      let accountExists = await db.Account.findOne({
        where: {
          [Op.or]: [{ email: data.email }, { username: data.teacherId }],
        },
      });
      if (accountExists) {
        if (accountExists?.email === data.email) {
          existsCol += existsCol ? ", email" : "Email";
        }
      }

      if (existsCol) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsExits(existsCol),
        });
      }

      let password = uuidv4().slice(0, 6);
      const accountInstance = await db.Account.create({
        username: data.teacherId,
        password: bcrypt.hashSync(password, salt),
        email: data.email,
        role: 2,
        state: 2,
      });

      const newInstance = await db.Teacher.create({
        teacherId: data.teacherId,
        lastName: data.lastName,
        firstName: data.firstName,
        phone: data.phone,
        gender: data.gender,
      });

      let REACT_APP_URL = process.env.REACT_APP_URL;
      let link = `${REACT_APP_URL}/signin`;
      emailService
        .sendMail(
          data.email,
          transMailVi.subject,
          transMailVi.template(data.teacherId, password, link)
        )
        .then((success) => {
          return resolve({
            message: transSuccessVi.createNew("giảng viên"),
            success: true,
            data: {
              ...newInstance.dataValues,
              teacherAccountData: {
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

let updateTeacherById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let teacherInstance = await db.Teacher.findOne({
        where: {
          [Op.or]: [
            { teacherId: data.teacherId },
            { phone: data?.newData?.phone },
          ],
        },
      });
      if (!teacherInstance) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("giảng viên"),
        });
      }
      if (
        teacherInstance.phone === data?.newData?.phone &&
        teacherInstance.teacherId !== data.teacherId
      ) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsExits("Số điện thoại"),
        });
      }

      let result = await db.Teacher.update(
        {
          lastName: data?.newData.lastName,
          firstName: data?.newData.firstName,
          phone: data?.newData.phone,
          gender: data?.newData.gender,
        },
        { where: { teacherId: data.teacherId } }
      );

      if (result[0] == 1) {
        teacherInstance = await db.Teacher.findOne({
          where: {
            teacherId: data.teacherId,
          },
          raw: false,
          nest: true,
          include: [
            {
              model: db.Account,
              as: "teacherAccountData",
              attributes: ["email", "state"],
            },
          ],
        });

        return resolve({
          success: true,
          message: transSuccessVi.updateInstance("giảng viên"),
          data: teacherInstance,
        });
      }

      return resolve({
        success: false,
        message: transErrorsVi.updateInstance("giảng viên"),
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllTeachers,
  createNewTeacher,
  updateTeacherById,
};
