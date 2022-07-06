const express = require("express");
const authController = require("../controllers/auth.controller");
const studentController = require("../controllers/student.controller");
const teacherController = require("../controllers/teacher.controller");
const classController = require("../controllers/class.controller");

const authMiddleware = require("../middlewares/auth");

let router = express.Router();
const { ROLES } = require("../utils/constants");

let verifyStudent = [
  authMiddleware.isAuthenticated,
  authMiddleware.verifyRoles(ROLES.student),
];

let verifyTeacher = [
  authMiddleware.isAuthenticated,
  authMiddleware.verifyRoles(ROLES.teacher),
];

let verifyAdmin = [
  authMiddleware.isAuthenticated,
  authMiddleware.verifyRoles(ROLES.admin),
];

let verifyTeacherOrAdmin = [
  authMiddleware.isAuthenticated,
  authMiddleware.verifyRoles(ROLES.admin, ROLES.teacher),
];

const initRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.json({ message: "Home page" });
  });

  router.post("/login", authController.login);
  router.post("/update-account", verifyAdmin, authController.updateAccount);
  router.post("/update-state", verifyAdmin, authController.updateState);

  router.get(
    "/class/get-all-classes",
    verifyTeacherOrAdmin,
    classController.getAllClasses
  );
  router.get(
    "/class/get-class-by-id",
    verifyTeacherOrAdmin,
    classController.getClassById
  );
  router.post(
    "/class/create-class",
    verifyAdmin,
    classController.createNewClass
  );
  router.post(
    "/class/update-class-by-id",
    verifyAdmin,
    classController.updateClassById
  );
  router.post(
    "/class/delete-class-by-id",
    verifyAdmin,
    classController.deleteClassById
  );

  router.get(
    "/student/get-all-students",
    verifyTeacherOrAdmin,
    studentController.getAllStudents
  );
  router.post(
    "/class/create-student",
    verifyAdmin,
    studentController.createNewStudent
  );
  router.post(
    "/class/update-student-by-id",
    verifyAdmin,
    studentController.updateStudentById
  );

  return app.use("/api", router);
};

module.exports = initRoutes;
