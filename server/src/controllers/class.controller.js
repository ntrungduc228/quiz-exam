const classService = require("../services/class.service");
const { transErrorsVi } = require("../../lang/vi");

let getAllClasses = async (req, res) => {
  try {
    let data = await classService.getAllClasses();
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

let getClassById = async (req, res) => {
  const { classId } = req.query;
  if (!classId) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }

  try {
    let data = await classService.getClassById(classId);
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

let createNewClass = async (req, res) => {
  const { classId, name } = req.body;
  if (!classId || !name) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await classService.createNewClass(req.body);
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

let deleteClassById = async (req, res) => {
  const { classId } = req.body;
  if (!classId) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }

  try {
    let data = await classService.deleteClassById(classId);
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

let updateClassById = async (req, res) => {
  const { classId, newData } = req.body;
  if (!classId || !newData?.classId || !newData?.name) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }

  try {
    let data = await classService.updateClassById(req.body);
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
  getAllClasses,
  createNewClass,
  getClassById,
  deleteClassById,
  updateClassById,
};
