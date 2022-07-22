const examService = require("../services/exam.service");
const { transErrorsVi } = require("../../lang/vi");
const { STATE_EXAM } = require("../utils/constants");

let getAllExams = async (req, res) => {
  try {
    let data = await examService.getAllExams();
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

let createNewExam = async (req, res) => {
  const {
    classId,
    subjectId,
    times,
    teacherId,
    timeExam,
    dateExam,
    numOfEasy,
    numOfMedium,
    numOfHard,
  } = req.body;
  if (
    !classId ||
    !subjectId ||
    !times ||
    !teacherId ||
    !timeExam ||
    !dateExam ||
    !numOfEasy ||
    !numOfMedium ||
    !numOfHard
  ) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }

  try {
    let data = await examService.createNewExam(req.body);
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

let changeStateExam = async (req, res) => {
  const { classId, subjectId, times, newData } = req.body;
  if (
    !classId ||
    !subjectId ||
    !times ||
    !Object.values(STATE_EXAM).includes(newData?.state)
  ) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await examService.changeStateExam(req.body);
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

let deleteExam = async (req, res) => {
  console.log("req body", req.body);
  const { classId, subjectId, times } = req.body;
  if (!classId || !subjectId || !times) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await examService.deleteExam(req.body);
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

let getAllExamsByClass = async (req, res) => {
  const { classId } = req.query;
  if (!classId) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await examService.getAllExamsByClass(classId);
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

let doingExam = async (req, res) => {
  const { subjectId, times, classId, studentId } = req.body;
  if (!classId || !subjectId || !times || !studentId) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await examService.doingExam(req.body);
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

let getExamsByStudent = async (req, res) => {
  const { studentId, classId } = req.query;
  if (!studentId || !classId) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await examService.getExamsByStudent(req.query);
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

let getResultByExam = async (req, res) => {
  const { studentId, subjectId, times } = req.query;
  if (!studentId || !subjectId || !times) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await examService.getResultByExam(req.query);
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

let updateStudentAnswer = async (req, res) => {
  const { studentId, subjectId, questionId, times } = req.body;
  if (!studentId || !subjectId || !questionId || !times) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await examService.updateStudentAnswer(req.body);
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
  getAllExams,
  createNewExam,
  deleteExam,
  changeStateExam,
  getAllExamsByClass,
  doingExam,
  getExamsByStudent,
  updateStudentAnswer,
  getResultByExam,
};
