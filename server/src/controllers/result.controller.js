const resultService = require("../services/result.service");
const { transErrorsVi } = require("../../lang/vi");

let getListResultByStudentId = async (req, res) => {
  const { studentId } = req.query;
  console.log("req", req.query);
  if (!studentId) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }

  try {
    let data = await resultService.getListResultByStudentId(req.query);
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

let getListResult = async (req, res) => {
  try {
    let data = await resultService.getListResult();
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
  getListResultByStudentId,
  getListResult,
};
