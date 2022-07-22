const db = require("../models");

let getDashBoardAdmin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let students = new Promise(async (resolve) => {
        let data = await db.Student.findAll();
        resolve({ students: data });
      });

      let subjects = new Promise(async (resolve) => {
        let data = await db.Subject.findAll();
        resolve({ subjects: data });
      });

      let questions = new Promise(async (resolve) => {
        let data = await db.Question.findAll();
        resolve({ questions: data });
      });

      let classes = new Promise(async (resolve) => {
        let data = await db.Class.findAll();
        resolve({ classes: data });
      });

      let exams = new Promise(async (resolve) => {
        let data = await db.Exam.findAll();
        resolve({ exams: data });
      });

      let scores = new Promise(async (resolve) => {
        let data = await db.Score.findAll();
        resolve({ scores: data });
      });

      let teachers = new Promise(async (resolve) => {
        let data = await db.Teacher.findAll();
        resolve({ teachers: data });
      });

      Promise.all([
        students,
        subjects,
        questions,
        classes,
        exams,
        scores,
        teachers,
      ]).then((values) => {
        let result = {};
        result.students = values[0].students.length;
        result.subjects = values[1].subjects.length;
        result.questions = values[2].questions.length;
        result.classes = values[3].classes.length;
        result.exams = values[4].exams.length;
        result.scores = values[5].scores.length;
        result.teachers = values[6].teachers.length;

        return resolve({ data: result, success: true });
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getDashBoardTeacher = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let students = new Promise(async (resolve) => {
        let data = await db.Student.findAll();
        resolve({ students: data });
      });

      let subjects = new Promise(async (resolve) => {
        let data = await db.Subject.findAll();
        resolve({ subjects: data });
      });

      let questions = new Promise(async (resolve) => {
        let data = await db.Question.findAll();
        resolve({ questions: data });
      });

      let classes = new Promise(async (resolve) => {
        let data = await db.Class.findAll();
        resolve({ classes: data });
      });

      let exams = new Promise(async (resolve) => {
        let data = await db.Exam.findAll();
        resolve({ exams: data });
      });

      let scores = new Promise(async (resolve) => {
        let data = await db.Score.findAll();
        resolve({ scores: data });
      });

      Promise.all([students, subjects, questions, classes, exams, scores]).then(
        (values) => {
          let result = {};
          result.students = values[0].students.length;
          result.subjects = values[1].subjects.length;
          result.questions = values[2].questions.length;
          result.classes = values[3].classes.length;
          result.exams = values[4].exams.length;
          result.scores = values[5].scores.length;

          return resolve({ data: result, success: true });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getDashBoardAdmin,
  getDashBoardTeacher,
};
