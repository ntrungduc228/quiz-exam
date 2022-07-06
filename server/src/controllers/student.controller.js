const studentService = require("../services/student.service");
const { transErrorsVi } = require("../../lang/vi");

let getAllStudents = async (req, res) => {
  try {
    let data = await studentService.getAllStudents();
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

let createNewStudent = async (req, res) => {
  const {
    studentId,
    lastName,
    firstName,
    phone,
    classId,
    gender,
    birthday,
    email,
  } = req.body;

  if (
    !studentId ||
    !lastName ||
    !firstName ||
    !phone ||
    !classId ||
    !birthday ||
    !email ||
    (gender != true && gender != false)
  ) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }

  try {
    let data = await studentService.createNewStudent(req.body);
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

let updateStudentById = async (req, res) => {
  const { studentId, newData } = req.body;

  if (
    !studentId ||
    !newData?.lastName ||
    !newData?.firstName ||
    !newData?.phone ||
    !newData?.classId ||
    !newData?.birthday ||
    (newData?.gender != true && newData?.gender != false)
  ) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await studentService.updateStudentById(req.body);
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

module.exports = { getAllStudents, createNewStudent, updateStudentById };
