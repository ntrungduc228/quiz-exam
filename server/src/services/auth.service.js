const db = require("../models");
const { transErrorsVi, transSuccessVi, transMailVi } = require("../../lang/vi");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { generateToken } = require("../utils/jwt");
const { ROLES, STATE } = require("../utils/constants");
const { v4: uuidv4 } = require("uuid");
const emailService = require("./email.service");

let salt = bcrypt.genSaltSync(10);

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

        if (!bcrypt.compareSync(password, account.password)) {
          return resolve({
            success: false,
            message: transErrorsVi.signin_failed,
          });
        }
      }

      if (account.state === STATE.needConfirm) {
      }

      if (!account.state === STATE.active) {
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
      if (account.state === STATE.needConfirm) {
        user.state = account.state;
      }

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

let updateAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let account = await db.Account.findOne({
        where: {
          username: data.username,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!account) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("Tài khoản"),
        });
      } else {
        account = await db.Account.findOne({
          where: {
            [Op.and]: [
              { email: data?.newData.email },
              { [Op.not]: [{ username: data.username }] },
            ],
          },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
      }

      if (
        account?.email === data?.newData?.email &&
        account?.username !== data.username
      ) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsExits("Email"),
        });
      }

      let result = await db.Account.update(
        {
          email: data?.newData.email,
          state: data?.newData.state,
        },
        { where: { username: data.username } }
      );

      if (result[0] == 1) {
        account = await db.Account.findOne({
          where: { username: data.username },
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        });
      }

      return resolve({
        success: true,
        message: transSuccessVi.updateInstance("Tài khoản"),
        data: account,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateState = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!Object.values(STATE).includes(data.newData.state)) {
        return resolve({
          success: false,
          message: transErrorsVi.invalid_value,
        });
      }

      let account = await db.Account.findOne({
        where: {
          username: data.username,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!account) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("Tài khoản"),
        });
      }

      let result = await db.Account.update(
        {
          state: data?.newData.state,
        },
        { where: { username: data.username } }
      );

      if (result[0] == 1) {
        account = await db.Account.findOne({
          where: { username: data.username },
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        });
      }

      return resolve({
        success: true,
        message: transSuccessVi.updateInstance("Tài khoản"),
        data: account,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let verifyResetAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let account = await db.Account.findOne({
        where: {
          username: data.username,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!account) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("Tài khoản"),
        });
      }

      let result = await db.Account.update(
        {
          state: STATE.active,
          password: bcrypt.hashSync(data.password, salt),
        },
        { where: { username: data.username } }
      );

      if (result[0] == 1) {
        account = await db.Account.findOne({
          where: { username: data.username },
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        });
      }

      return resolve({
        success: true,
        message: transSuccessVi.updateInstance("Tài khoản"),
        data: account,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let forgetPassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let account = await db.Account.findOne({
        where: {
          email: data.email,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!account) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("Tài khoản"),
        });
      }

      let newPassword = uuidv4().slice(0, 6);
      let result = await db.Account.update(
        {
          state: STATE.needConfirm,
          password: bcrypt.hashSync(newPassword, salt),
        },
        { where: { email: data.email } }
      );

      // if (result[0] == 1) {
      //   account = await db.Account.findOne({
      //     where: { email: data.email },
      //     attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      //   });
      // }

      let REACT_APP_URL = process.env.REACT_APP_URL;
      let link = `${REACT_APP_URL}/signin`;
      emailService
        .sendMail(
          data.email,
          transMailVi.subject_send_reset_password,
          transMailVi.template_reset_password(
            account.username,
            newPassword,
            link
          )
        )
        .then((success) => {
          return resolve({
            message: transSuccessVi.send_reset_password_success,
            success: true,
          });
        });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  login,
  isRole,
  updateAccount,
  updateState,
  verifyResetAccount,
  forgetPassword,
};
