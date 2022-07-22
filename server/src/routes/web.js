const express = require("express");
const authController = require("../controllers/auth.controller");
const studentController = require("../controllers/student.controller");
const teacherController = require("../controllers/teacher.controller");
const classController = require("../controllers/class.controller");
const subjectController = require("../controllers/subject.controller");
const questionController = require("../controllers/question.controller");
const examController = require("../controllers/exam.controller");
const resultController = require("../controllers/result.controller");
const homeController = require("../controllers/home.controller");

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

  router.get(
    "/dashboard/teacher",
    verifyTeacher,
    homeController.getDashBoardTeacher
  );

  router.get("/dashboard/admin", verifyAdmin, homeController.getDashBoardAdmin);

  router.post("/login", authController.login);
  router.post("/account/forget-password", authController.forgetPassword);
  router.put(
    "/account/change-password",
    authMiddleware.isAuthenticated,
    authController.changePassword
  );
  router.put(
    "/account/update-profile-info",
    authMiddleware.isAuthenticated,
    authController.updateProfileInfo
  );
  router.post("/update-account", verifyAdmin, authController.updateAccount);
  router.put("/update-state", verifyAdmin, authController.updateState);
  router.put(
    "/account/verify-reset-account",
    authMiddleware.isAuthenticated,
    authController.verifyResetAccount
  );

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
  router.put(
    "/class/update-class-by-id",
    verifyAdmin,
    classController.updateClassById
  );
  router.delete(
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
    "/student/create-student",
    verifyAdmin,
    studentController.createNewStudent
  );
  router.put(
    "/student/update-student-by-id",
    verifyAdmin,
    studentController.updateStudentById
  );

  router.get(
    "/teacher/get-all-teachers",
    verifyTeacherOrAdmin,
    teacherController.getAllTeachers
  );
  router.post(
    "/teacher/create-teacher",
    verifyAdmin,
    teacherController.createNewTeacher
  );
  router.put(
    "/teacher/update-teacher-by-id",
    verifyAdmin,
    teacherController.updateTeacherById
  );

  router.get(
    "/subject/get-all-subjects",
    authMiddleware.isAuthenticated,
    subjectController.getAllSubjects
  );
  router.post(
    "/subject/create-subject",
    verifyTeacher,
    subjectController.createNewSubject
  );
  router.put(
    "/subject/update-subject-by-id",
    verifyTeacher,
    subjectController.updateSubjectById
  );
  router.delete(
    "/subject/delete-subject-by-id",
    verifyTeacher,
    subjectController.deleteSubjectById
  );

  router.get(
    "/question/get-all-questions",
    verifyTeacherOrAdmin,
    questionController.getAllQuestions
  );
  router.post(
    "/question/create-question",
    verifyTeacher,
    questionController.createNewQuestion
  );
  router.put(
    "/question/update-question-by-id",
    verifyTeacher,
    questionController.updateQuestionById
  );
  router.delete(
    "/question/delete-question-by-id",
    verifyTeacher,
    questionController.deleteQuestionById
  );

  router.get(
    "/exam/get-all-exams",
    authMiddleware.isAuthenticated,
    examController.getAllExams
  );
  router.post("/exam/create-exam", verifyTeacher, examController.createNewExam);
  router.put(
    "/exam/change-state-exam",
    verifyTeacher,
    examController.changeStateExam
  );
  router.delete("/exam/delete-exam", verifyTeacher, examController.deleteExam);
  router.get(
    "/exam/get-exams-by-class",
    authMiddleware.isAuthenticated,
    examController.getAllExamsByClass
  );
  router.post("/exam/doing-exam", verifyStudent, examController.doingExam);
  router.get(
    "/exam/get-exams-by-student",
    verifyStudent,
    examController.getExamsByStudent
  );
  router.put(
    "/exam/update-student-answer",
    verifyStudent,
    examController.updateStudentAnswer
  );
  router.get(
    "/exam/get-result-by-exam",
    verifyStudent,
    examController.getResultByExam
  );

  router.get(
    "/result/get-all-result-by-student",
    verifyStudent,
    resultController.getListResultByStudentId
  );

  router.get(
    "/result/get-all-results",
    verifyTeacherOrAdmin,
    resultController.getListResult
  );

  return app.use("/api", router);
};

module.exports = initRoutes;
