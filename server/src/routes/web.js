const express = require("express");
const authController = require("../controllers/auth.controller");
const studentController = require("../controllers/student.controller");
const teacherController = require("../controllers/teacher.controller");
const classController = require("../controllers/class.controller");
const subjectController = require("../controllers/subject.controller");
const questionController = require("../controllers/question.controller");
const examController = require("../controllers/exam.controller");

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
    "/student/create-student",
    verifyAdmin,
    studentController.createNewStudent
  );
  router.post(
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
  router.post(
    "/teacher/update-teacher-by-id",
    verifyAdmin,
    teacherController.updateTeacherById
  );

  router.get(
    "/subject/get-all-subjects",
    verifyTeacherOrAdmin,
    subjectController.getAllSubjects
  );
  router.post(
    "/subject/create-subject",
    verifyTeacher,
    subjectController.createNewSubject
  );
  router.post(
    "/subject/update-subject-by-id",
    verifyTeacher,
    subjectController.updateSubjectById
  );
  router.post(
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
  router.post(
    "/question/update-question-by-id",
    verifyTeacher,
    questionController.updateQuestionById
  );
  router.post(
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
  router.post(
    "/exam/change-state-exam",
    verifyTeacher,
    examController.changeStateExam
  );
  router.post("/exam/delete-exam", verifyTeacher, examController.deleteExam);
  router.post(
    "/exam/get-exams-by-class",
    authMiddleware.isAuthenticated,
    examController.getAllExamsByClass
  );
  router.post("/exam/doing-exam", verifyStudent, examController.doingExam);
  router.post(
    "/exam/get-exam-by-student",
    verifyStudent,
    examController.getExamsByStudentId
  );

  return app.use("/api", router);
};

module.exports = initRoutes;
