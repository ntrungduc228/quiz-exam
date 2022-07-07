const questionService = require("../services/question.service");
const { transErrorsVi } = require("../../lang/vi");

let getAllQuestions = async (req, res) => {
  try {
    let data = await questionService.getAllQuestions();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: transErrorsVi.server_error,
      error: error,
    });
  }
};

let createNewQuestion = async (req, res) => {
  const {
    content,
    subjectId,
    answerA,
    answerB,
    answerC,
    answerD,
    correctAnswer,
    level,
    teacherId,
  } = req.body;
  if (
    !content ||
    !subjectId ||
    !answerA ||
    !answerB ||
    !answerC ||
    !answerD ||
    !correctAnswer ||
    !level ||
    !teacherId
  ) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }

  try {
    let data = await questionService.createNewQuestion(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: transErrorsVi.server_error,
      error: error,
    });
  }
};

let updateQuestionById = async (req, res) => {
  const { questionId, newData } = req.body;
  if (
    (!questionId,
    !newData?.content ||
      !newData?.subjectId ||
      !newData?.answerA ||
      !newData?.answerB ||
      !newData?.answerC ||
      !newData?.answerD ||
      !newData?.correctAnswer ||
      (!newData?.level && newData?.level !== 0) ||
      !newData?.teacherId)
  ) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }

  try {
    let data = await questionService.updateQuestionById(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: transErrorsVi.server_error,
      error: error,
    });
  }
};

let deleteQuestionById = async (req, res) => {
  const { questionId } = req.body;
  if (!questionId) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await questionService.deleteQuestionById(questionId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: transErrorsVi.server_error,
      error: error,
    });
  }
};

module.exports = {
  getAllQuestions,
  createNewQuestion,
  updateQuestionById,
  deleteQuestionById,
};
