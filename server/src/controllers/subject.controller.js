const subjectService = require("../services/subject.service");
const { transErrorsVi } = require("../../lang/vi");

let getAllSubjects = async (req, res) => {
  try {
    let data = await subjectService.getAllSubjects();
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

let createNewSubject = async (req, res) => {
  const { subjectId, name } = req.body;
  if (!subjectId || !name) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }

  try {
    let data = await subjectService.createNewSubject(req.body);
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

let updateSubjectById = async (req, res) => {
  const { classId, newData } = req.body;
  if (!classId || !newData?.subjectId || !newData?.name) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await subjectService.updateSubjectById(req.body);
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

let deleteSubjectById = async (req, res) => {
  const { subjectId } = req.body;
  if (!subjectId) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await subjectService.deleteSubjectById(subjectId);
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
  getAllSubjects,
  createNewSubject,
  updateSubjectById,
  deleteSubjectById,
};
