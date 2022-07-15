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
  const { classId } = req.body;
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

let getExamsByStudentId = async (req, res) => {
  const { studentId } = req.body;
  if (!studentId) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await examService.getExamsByStudentId(req.body);
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
  getExamsByStudentId,
};
