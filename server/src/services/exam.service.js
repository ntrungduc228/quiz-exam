const db = require("../models");
const { transErrorsVi, transSuccessVi } = require("../../lang/vi");
const { Op, Sequelize } = require("sequelize");
const { STATE_EXAM, MINIMUM_QUESTION, LEVEL } = require("../utils/constants");
const { getShuffledArr } = require("../utils/helpers");
const moment = require("moment");

let getAllExams = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Exam.findAll({
        nest: true,
        raw: false,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.Subject,
            as: "examSubjectData",
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

let createNewExam = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let examExists = await db.Exam.findOne({
        where: {
          classId: data.classId,
          subjectId: data.subjectId,
          times: data.times,
        },
      });
      if (examExists) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsExits("bài thi"),
        });
      }

      let questionList = await db.Question.findAll({
        where: { subjectId: data.subjectId },
      });

      let numOfQues = { easy: 0, medium: 0, hard: 0 };
      questionList.forEach((item) => {
        if (item.level === LEVEL.easy) {
          numOfQues.easy++;
        }

        if (item.level === LEVEL.medium) {
          numOfQues.medium++;
        }

        if (item.level === LEVEL.hard) {
          numOfQues.hard++;
        }
      });

      if (!Object.values(numOfQues).every((item) => item >= MINIMUM_QUESTION)) {
        return resolve({
          success: false,
          message: `Cần có sẵn tổi thiểu ${MINIMUM_QUESTION} cho mỗi loại câu hỏi dễ, trung bình, khó của môn học ${data.subjectId} để tạo đề thi`,
        });
      }

      let mess = "";
      if (numOfQues.easy < data.numOfEasy) {
        mess += "dễ";
      }
      if (numOfQues.medium < data.numOfMedium) {
        mess += mess ? ", trung bình" : "trung bình";
      }
      if (numOfQues.hard < data.numOfHard) {
        mess += mess ? ", khó" : "khó";
      }
      if (mess) {
        return resolve({
          success: false,
          message: `Số câu hỏi ${mess} có sẵn không đủ để tạo đề thi này`,
        });
      }

      let examInstance = await db.Exam.create({
        classId: data.classId,
        subjectId: data.subjectId,
        times: data.times,
        teacherId: data.teacherId,
        timeExam: data.timeExam,
        dateExam: data.dateExam,
        numOfEasy: data.numOfEasy,
        numOfHard: data.numOfHard,
        numOfMedium: data.numOfMedium,
        state: STATE_EXAM.open,
      });

      return resolve({
        success: true,
        message: transSuccessVi.createNew("Bài thi"),
        data: examInstance,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let changeStateExam = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let examExists = await db.Exam.findOne({
        where: {
          classId: data.classId,
          subjectId: data.subjectId,
          times: data.times,
        },
      });
      if (!examExists) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("Bài thi"),
        });
      }

      let result = await db.Exam.update(
        {
          state: data?.newData?.state,
        },
        {
          where: {
            classId: data.classId,
            subjectId: data.subjectId,
            times: data.times,
          },
        }
      );

      if (result[0] === 1) {
        examInstance = await db.Exam.findOne({
          raw: false,
          nest: true,
          where: {
            classId: data.classId,
            subjectId: data.subjectId,
            times: data.times,
          },
        });

        return resolve({
          message: transSuccessVi.updateInstance("bài thi"),
          success: true,
          data: examInstance,
        });
      }

      return resolve({
        success: false,
        message: transErrorsVi.updateInstance("bài thi"),
      });

      return resolve({ data, success: true });
    } catch (error) {
      reject(error);
    }
  });
};

let deleteExam = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.Exam.destroy({
        where: {
          classId: data.classId,
          subjectId: data.subjectId,
          times: data.times,
        },
      });

      if (!result) {
        return resolve({
          success: false,
          message: transErrorsVi.deleteInstance("bài thi"),
        });
      }

      return resolve({
        success: true,
        message: transSuccessVi.deleteInstance("bài thi"),
        data: {
          classId: data.classId,
          subjectId: data.subjectId,
          times: data.times,
        },
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllExamsByClass = (classId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Exam.findAll({
        nest: true,
        raw: false,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          classId: classId,
          state: STATE_EXAM.open,
        },
        include: [
          {
            model: db.Subject,
            as: "examSubjectData",
            attributes: { exclude: ["createdAt", "updatedAt"] },
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

let doingExam = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let examExists = await db.Score.findOne({
        where: {
          studentId: data.studentId,
          subjectId: data.subjectId,
          times: data.times,
        },
      });

      if (examExists) {
        let answerList = await db.StudentExam.findAll({
          raw: false,
          nest: true,
          where: {
            subjectId: data.subjectId,
            times: data.times,
            studentId: data.studentId,
          },
          include: [
            {
              model: db.Question,
              as: "examDetailQuestionData",
              attributes: {
                exclude: ["createdAt", "updatedAt", "correctAnswer"],
              },
            },
          ],
          order: [["number", "ASC"]],
        });

        let questionList = answerList.map((item) => {
          return {
            ...item.examDetailQuestionData.dataValues,
            studentChoice: item.answer,
          };
        });

        examExists.timeRemain = +examExists.expiresAt.getTime();
        let res = {};
        res.info = examExists;
        res.questionList = questionList;
        return resolve({ data: res, success: true });
      }

      let examInstance = await db.Exam.findOne({
        raw: false,
        nest: true,
        where: {
          classId: data.classId,
          subjectId: data.subjectId,
          times: data.times,
        },
        include: [
          {
            model: db.Subject,
            as: "examSubjectData",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      if (!examInstance) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("bài thi"),
        });
      }

      // Create question list
      let res = {};
      let questionRes = [];
      // easy questions
      let questionList = await db.Question.findAll({
        where: { subjectId: data.subjectId, level: LEVEL.easy },
        order: Sequelize.literal("rand()"),
        limit: examInstance.numOfEasy,
        attributes: { exclude: ["createdAt", "updatedAt", "correctAnswer"] },
      });
      questionRes = [...questionRes, ...questionList];
      // medium questions
      questionList = await db.Question.findAll({
        where: { subjectId: data.subjectId, level: LEVEL.medium },
        order: Sequelize.literal("rand()"),
        limit: examInstance.numOfMedium,
        attributes: { exclude: ["createdAt", "updatedAt", "correctAnswer"] },
      });
      questionRes = [...questionRes, ...questionList];
      // hard questions
      questionList = await db.Question.findAll({
        where: { subjectId: data.subjectId, level: LEVEL.hard },
        order: Sequelize.literal("rand()"),
        limit: examInstance.numOfHard,
        attributes: { exclude: ["createdAt", "updatedAt", "correctAnswer"] },
      });
      questionRes = [...questionRes, ...questionList];

      res.questionList = getShuffledArr(questionRes);
      res.info = examInstance;

      // Create score instance
      let expiresAt = new Date();
      expiresAt = moment().add(examInstance.timeExam, "minutes").format();
      const scoreInstance = await db.Score.create({
        studentId: data.studentId,
        subjectId: data.subjectId,
        times: data.times,
        date: new Date(),
        score: -1,
        expiresAt: expiresAt,
      });

      // Create question answer by student
      let questionAnswer = res.questionList.map((item, index) => {
        return {
          studentId: data.studentId,
          questionId: item.questionId,
          subjectId: item.subjectId,
          answer: null,
          number: index + 1,
          times: data.times,
        };
      });
      await db.StudentExam.bulkCreate(questionAnswer);

      return resolve({ data: res, success: true });
    } catch (error) {
      reject(error);
    }
  });
};

let getResultByExam = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let scoreInstance = await db.Score.findOne({
        raw: false,
        nest: true,
        where: {
          studentId: data.studentId,
          subjectId: data.subjectId,
          times: data.times,
        },
        include: [
          {
            model: db.Subject,
            as: "scoreSubjectData",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      if (scoreInstance) {
        if (scoreInstance.score > -1) {
          return resolve({ data: scoreInstance, success: true });
        }
      }

      let answerList = await db.StudentExam.findAll({
        raw: false,
        nest: true,
        where: {
          studentId: data.studentId,
          subjectId: data.subjectId,
          times: data.times,
        },
        include: [
          {
            model: db.Question,
            as: "examDetailQuestionData",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      if (!answerList.length) {
        return resolve({
          success: false,
          message: "Dữ liệu không tìm thấy",
        });
      }

      let numOfRightAnswer = 0;
      numOfRightAnswer = answerList.reduce((total, item) => {
        return item.answer === item.examDetailQuestionData.correctAnswer
          ? total + 1
          : total;
      }, 0);

      let score = +Number(
        (10.0 / answerList.length) * numOfRightAnswer
      ).toFixed(2);

      await db.Score.update(
        { score },
        {
          where: {
            studentId: data.studentId,
            subjectId: data.subjectId,
            times: data.times,
          },
        }
      );

      await db.StudentExam.destroy({
        where: {
          studentId: data.studentId,
          subjectId: data.subjectId,
          times: data.times,
        },
      });

      let result = await db.Score.findOne({
        raw: false,
        nest: true,
        where: {
          studentId: data.studentId,
          subjectId: data.subjectId,
          times: data.times,
        },
        include: [
          {
            model: db.Subject,
            as: "scoreSubjectData",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      // let result = {};
      result.numOfQuestion = answerList.length;
      result.numOfRightAnswer = numOfRightAnswer;
      result.score = score;

      return resolve({ data: result, success: true });
    } catch (error) {
      reject(error);
    }
  });
};

let getExamsByStudent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let examInstances = await db.Score.findAll({
        where: {
          studentId: data.studentId,
          // score: -1,
        },
      });

      let results = [];
      let dataReturn = {};

      if (examInstances) {
        results = await Promise.all(
          examInstances.map(async (item) => {
            if (
              item.score === -1 &&
              item.expiresAt.getTime() < new Date().getTime()
            ) {
              let result = await getResultByExam(item);
              let resultItem = {
                ...item,
                ...result.data,
                keyField: item.subjectId.concat(data.classId + item.times),
              };

              // dataReturn[resultItem.keyField] = resultItem;

              return resultItem;
            }

            item.keyField = item.subjectId.concat(data.classId + item.times);
            item.timeRemain = +item.expiresAt.getTime();
            // dataReturn[item.keyField] = item;
            return item;
          })
        );

        results.forEach((item) => {
          dataReturn[item.keyField] = item;
        });
      }

      return resolve({ data: dataReturn, success: true });
    } catch (error) {
      reject(error);
    }
  });
};

let updateStudentAnswer = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.StudentExam.update(
        {
          answer: data.answer || null,
        },
        {
          where: {
            studentId: data.studentId,
            questionId: data.questionId,
            times: data.times,
            subjectId: data.subjectId,
          },
        }
      );

      let dataReturn = {
        studentId: data.studentId,
        questionId: data.questionId,
        times: data.times,
        subjectId: data.subjectId,
        studentChoice: data.answer,
      };
      if (result[0] === 1) {
        return resolve({
          success: true,
          data: dataReturn,
        });
      }
      return resolve({
        success: false,
        data: dataReturn,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllExams,
  createNewExam,
  deleteExam,
  changeStateExam,
  getAllExamsByClass,
  doingExam,
  getExamsByStudent,
  getResultByExam,
  updateStudentAnswer,
};
