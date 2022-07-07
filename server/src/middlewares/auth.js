const jwtHepler = require("../utils/jwt");
const authService = require("../services/auth.service");
const { ROLE } = require("../utils/constants");

let isAuthenticated = async (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
        errToken: true,
      });
    }

    let check = await jwtHepler.verifyToken(token);
    if (!check.success) {
      return res.status(401).json(check);
    }
    req.username = check.decoded.username || "";

    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};

const verifyRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req?.username) return res.sendStatus(401);
      const rolesArray = [...allowedRoles];

      const result = await authService.isRole(req.username, rolesArray);
      if (result) {
        next();
      } else {
        return res
          .status(401)
          .json({ message: "You don't have permission", success: false });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error !!!", success: false });
    }
  };
};

let isStudent = async (req, res, next) => {
  let response = await authService.isRole(req.username, ROLE.student);
  if (!response) {
    return res
      .status(401)
      .json({ success: false, message: "Required student role" });
  }
  next();
};
let isAdmin = async (req, res, next) => {
  let response = await authService.isRole(req.username, ROLE.admin);
  if (!response) {
    return res
      .status(401)
      .json({ success: false, message: "Required admin role" });
  }
  next();
};
let isTeacher = async (req, res, next) => {
  let response = await authService.isRole(req.username, ROLE.teacher);
  if (!response) {
    return res
      .status(401)
      .json({ success: false, message: "Required teacher role" });
  }
  next();
};

module.exports = {
  isAuthenticated,
  verifyRoles,
  isStudent,
  isAdmin,
  isTeacher,
};
