const db = require("../models");
const { transErrorsVi, transSuccessVi } = require("../../lang/vi");

const { generateToken } = require("../utils/jwt");
const { ROLES, STATE } = require("../utils/constants");
const account = require("../models/account");

let login = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let account = await db.Account.findOne({ where: { username } });
      if (!account) {
        return resolve({
          success: false,
          message: transErrorsVi.signin_failed,
        });
      } else {
        if (account.state === STATE.lock) {
          return resolve({
            success: false,
            message: transErrorsVi.account_not_active,
          });
        }

        if (password !== account.password) {
          return resolve({
            success: false,
            message: transErrorsVi.signin_failed,
          });
        }
      }

      if (
        !account.state === STATE.active &&
        !account.state === STATE.needConfirm
      ) {
        return resolve({
          success: false,
          message: transErrorsVi.signin_failed,
        });
      }

      let user = {};
      if (account.role === ROLES.admin || account.role === ROLES.teacher) {
        user = await db.Teacher.findOne({
          where: { teacherId: account.username },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        user.userId = user.teacherId;
      } else if (account.role === ROLES.student) {
        user = await db.Student.findOne({
          where: { studentId: account.username },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        user.userId = user.studentId;
      }

      let token = await generateToken({ username: account.username });
      user.role = account.role;
      user.accessToken = token;

      return resolve({
        success: true,
        data: user,
        message: transSuccessVi.loginSuccess,
      });
    } catch (error) {
      console.log("error", error);
      reject({ message: transErrorsVi.server_error });
    }
  });
};

let isRole = (username, roles) => {
  return new Promise(async (resolve, reject) => {
    try {
      let account = await db.Account.findOne({
        where: { username },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!account) {
        return resolve(false);
      }

      if (!roles.includes(account.role)) {
        return resolve(false);
      }

      resolve(true);
    } catch (error) {
      console.log("error", error);
      reject({ error });
    }
  });
};

module.exports = { login, isRole };
