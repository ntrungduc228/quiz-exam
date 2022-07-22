const db = require("../models");
const { transErrorsVi, transSuccessVi } = require("../../lang/vi");
const { Op } = require("sequelize");

let getAllQuestions = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Question.findAll({
        nest: true,
        raw: false,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.Subject,
            as: "questionSubjectData",
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

let createNewQuestion = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let questionExists = await db.Question.findOne({
        where: {
          content: data.content,
        },
      });

      if (questionExists) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsExits("Câu hỏi"),
        });
      }

      let newInstance = await db.Question.create({
        content: data.content,
        subjectId: data.subjectId,
        answerA: data.answerA,
        answerB: data.answerB,
        answerC: data.answerC,
        answerD: data.answerD,
        correctAnswer: data.correctAnswer,
        level: data.level,
        teacherId: data.teacherId,
      });
      newInstance = await db.Question.findOne({
        where: { content: data.content },
      });

      return resolve({
        message: transSuccessVi.createNew("câu hỏi"),
        success: true,
        data: { ...newInstance, questionSubjectData: data.questionSubjectData },
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateQuestionById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let questionExists = await db.Question.findOne({
        where: {
          [Op.or]: [
            { questionId: data.questionId },
            { content: data?.newData.content },
          ],
        },
      });

      if (!questionExists) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsNotExits("Câu hỏi"),
        });
      } else if (
        questionExists.content === data?.newData.content &&
        questionExists.questionId !== data.questionId
      ) {
        return resolve({
          success: false,
          message: transErrorsVi.instanceIsExits("Câu hỏi"),
        });
      }

      let result = await db.Question.update(
        {
          content: data?.newData?.content,
          subjectId: data?.newData?.subjectId,
          answerA: data?.newData?.answerA,
          answerB: data?.newData?.answerB,
          answerC: data?.newData?.answerC,
          answerD: data?.newData?.answerD,
          correctAnswer: data?.newData?.correctAnswer,
          level: data?.newData?.level,
          teacherId: data?.newData?.teacherId,
        },
        { where: { questionId: data.questionId } }
      );

      if (result[0] === 1) {
        questionInstance = await db.Question.findOne({
          where: { questionId: data.questionId },
        });

        return resolve({
          message: transSuccessVi.updateInstance("câu hỏi"),
          success: true,
          data: {
            ...questionInstance,
            questionSubjectData: data?.newData.questionSubjectData,
          },
        });
      }

      return resolve({
        success: false,
        message: transErrorsVi.updateInstance("câu hỏi"),
      });
    } catch (error) {
      reject(error);
    }
  });
};

let deleteQuestionById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.Question.destroy({
        where: {
          questionId: id,
        },
      });

      if (!result) {
        return resolve({
          success: false,
          message: transErrorsVi.deleteInstance("câu hỏi"),
        });
      }

      return resolve({
        success: true,
        message: transSuccessVi.deleteInstance("câu hỏi"),
        data: +id,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllQuestions,
  createNewQuestion,
  updateQuestionById,
  deleteQuestionById,
};
