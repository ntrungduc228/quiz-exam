const teacherService = require("../services/teacher.service");
const { transErrorsVi } = require("../../lang/vi");

let getAllTeachers = async (req, res) => {
  try {
    let data = await teacherService.getAllTeachers();
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
let createNewTeacher = async (req, res) => {
  const { teacherId, lastName, firstName, phone, gender, email } = req.body;
  if (
    !teacherId ||
    !lastName ||
    !firstName ||
    !phone ||
    !email ||
    (gender != true && gender != false)
  ) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }

  try {
    let data = await teacherService.createNewTeacher(req.body);
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

let updateTeacherById = async (req, res) => {
  const { teacherId, newData } = req.body;

  if (
    !teacherId ||
    !newData?.lastName ||
    !newData?.firstName ||
    !newData?.phone ||
    (newData?.gender != true && newData?.gender != false)
  ) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await teacherService.updateTeacherById(req.body);
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

module.exports = { getAllTeachers, createNewTeacher, updateTeacherById };
